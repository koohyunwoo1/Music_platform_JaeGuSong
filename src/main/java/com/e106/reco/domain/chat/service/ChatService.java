package com.e106.reco.domain.chat.service;

import com.e106.reco.domain.artist.crew.entity.CrewUser;
import com.e106.reco.domain.artist.crew.entity.CrewUserState;
import com.e106.reco.domain.artist.crew.repository.CrewUserRepository;
import com.e106.reco.domain.artist.entity.Artist;
import com.e106.reco.domain.artist.entity.Position;
import com.e106.reco.domain.artist.user.dto.CustomUserDetails;
import com.e106.reco.domain.board.repository.ArtistRepository;
import com.e106.reco.domain.chat.dto.RoomRequest;
import com.e106.reco.domain.chat.entity.Chat;
import com.e106.reco.domain.chat.entity.ChatArtist;
import com.e106.reco.domain.chat.entity.ChatRoom;
import com.e106.reco.domain.chat.entity.Room;
import com.e106.reco.domain.chat.entity.RoomState;
import com.e106.reco.domain.chat.repository.ChatArtistRepository;
import com.e106.reco.domain.chat.repository.ChatRepository;
import com.e106.reco.domain.chat.repository.ChatRoomRepository;
import com.e106.reco.domain.chat.repository.RoomRepository;
import com.e106.reco.global.error.exception.BusinessException;
import com.e106.reco.global.util.AuthUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.e106.reco.global.error.errorcode.ArtistErrorCode.ARTIST_NOT_FOUND;
import static com.e106.reco.global.error.errorcode.ChatErrorCode.ARTIST_NOT_IN_CHAT;
import static com.e106.reco.global.error.errorcode.ChatErrorCode.CHAT_GRANT_FAIL;
import static com.e106.reco.global.error.errorcode.ChatErrorCode.CHAT_NOT_ALLOW_GROUP_CHAT;
import static com.e106.reco.global.error.errorcode.ChatErrorCode.ROOM_NOT_FOUND;
import static com.e106.reco.global.error.errorcode.ChatErrorCode.SINGLE_CHAT_ONLY_ONE_RECEIVER;
import static com.e106.reco.global.error.errorcode.CrewErrorCode.CREW_USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional
public class ChatService {
    private final RoomRepository roomRepository;
    private final ArtistRepository artistRepository;
    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final CrewUserRepository crewUserRepository;
    private final ChatArtistRepository chatArtistRepository;

//    public Flux<Chat> getMsg(Long artistSeq, String roomSeq){
//        chatArtistRepository.c
//        return chatRepository.mFindByGroupSeqAfterJoin(roomSeq, )
//            .subscribeOn(Schedulers.boundedElastic());
//    }


    public Flux<ChatArtist> getArtistInfo(String roomSeq) {
//        List<Long> artists = chatRoomRepository.artistSeqFindByRoomSeq(Long.parseLong(roomSeq));

        return Flux.empty();
    }


    public void leave(Long roomSeq, Long artistSeq) {
        CustomUserDetails customUserDetails = AuthUtil.getCustomUserDetails();
        Artist artist = artistRepository.findBySeq(artistSeq).orElseThrow(()->new BusinessException(ARTIST_NOT_FOUND));
        artistCertification(customUserDetails.getSeq(), artist);

        ChatRoom chatRoom = chatRoomRepository.findByPk(ChatRoom.PK.builder().roomSeq(roomSeq).artistSeq(artistSeq).build())
                .orElseThrow(() -> new BusinessException(ROOM_NOT_FOUND));

        if(chatRoom.getState() == RoomState.INACTIVE)
            throw new BusinessException(ARTIST_NOT_IN_CHAT);
        chatRoom.leaveChatRoom();
    }
    public void invite(Long roomSeq, Long artistSeq){
        CustomUserDetails customUserDetails = AuthUtil.getCustomUserDetails();

        Room room = roomRepository.findBySeq(roomSeq).orElseThrow(() -> new BusinessException(ROOM_NOT_FOUND));

        Artist artist = artistRepository.findBySeq(artistSeq)
                .orElseThrow(() -> new BusinessException(ARTIST_NOT_FOUND));

//        if(chatRoom.getState() == RoomState.PERSONAL) //TODO : 유저의 joinTime 병경

        if(artist.getPosition().equals(Position.CREW)) throw new BusinessException(CHAT_NOT_ALLOW_GROUP_CHAT);

        if(chatRoomRepository.countByRoom(room)==2) {
            List<Long> receivers = chatRoomRepository.artistSeqFindByRoomSeq(roomSeq);
            Long newRoomSeq = createGroupChatRoom(RoomRequest.builder()
                    .senderSeq(customUserDetails.getSeq())
                    .receiversSeq(receivers)
                    .build());
            room = roomRepository.findBySeq(newRoomSeq)
                    .orElseThrow(() -> new BusinessException(ROOM_NOT_FOUND));
        }

        ChatRoom chatRoom = chatRoomRepository.findByPk(ChatRoom.PK.builder().roomSeq(room.getSeq()).artistSeq(artistSeq).build())
                .orElse(ChatRoom.builder().room(room)
                                        .artist(artist)
                                        .pk(ChatRoom.PK.builder().roomSeq(room.getSeq()).artistSeq(artistSeq).build())
                        .build());
        chatRoom.joinChatRoom();
        chatRoomRepository.save(chatRoom);
    }
    public Mono<Chat> sendMsg(Chat chat){
       Artist artist = artistRepository.findBySeq(Long.parseLong(chat.getArtistSeq()))
            .orElseThrow(()->new BusinessException(ARTIST_NOT_FOUND));
       AuthUtil.getWebfluxCustomUserDetails()
                .subscribe(user -> artistCertification(user.getSeq(), artist));
        chat.setCreatedAt(LocalDateTime.now());
        return chatRepository.save(chat);
    }
    public Long createSingleChatRoom(RoomRequest roomRequest) {
        CustomUserDetails user = AuthUtil.getCustomUserDetails();

        if(roomRequest.getReceiversSeq()==null || roomRequest.getReceiversSeq().size()!=1) throw new BusinessException(SINGLE_CHAT_ONLY_ONE_RECEIVER);


        Artist sender = artistRepository.findBySeq(roomRequest.getSenderSeq())
                        .orElseThrow(()-> new BusinessException(ARTIST_NOT_FOUND));
        artistCertification(user.getSeq(), sender);
        Artist receiver = artistRepository.findBySeq(roomRequest.getReceiversSeq().getFirst())
                        .orElseThrow(()-> new BusinessException(ARTIST_NOT_FOUND));

        Room room = chatRoomRepository.findPersonalChatRoomBetweenArtists(roomRequest.getSenderSeq(), roomRequest.getReceiversSeq().getFirst())
                .orElse(roomRepository.save(Room.builder().build()));

        chatRoomRepository.save(ChatRoom.builder()
                        .artist(sender)
                        .room(room)
                        .joinAt(LocalDateTime.now())
                        .pk(ChatRoom.PK.builder().roomSeq(room.getSeq()).artistSeq(sender.getSeq()).build())
                        .state(RoomState.PERSONAL)
                        .build());
        chatRoomRepository.save(ChatRoom.builder()
                        .artist(receiver)
                        .room(room)
                        .joinAt(LocalDateTime.now())
                        .pk(ChatRoom.PK.builder().roomSeq(room.getSeq()).artistSeq(receiver.getSeq()).build())
                        .state(RoomState.PERSONAL)
                        .build());
        return room.getSeq();
    }
    public Long createGroupChatRoom(RoomRequest roomRequest){
        CustomUserDetails user = AuthUtil.getCustomUserDetails();

        Artist sender = artistRepository.findBySeq(roomRequest.getSenderSeq())
                .orElseThrow(() -> new BusinessException(ARTIST_NOT_FOUND));
        artistCertification(user.getSeq(), sender);

        Room room = roomRepository.save(Room.builder().build());

        List<ChatRoom> chatRooms = new ArrayList<>(Arrays.asList(
                ChatRoom.builder()
                .artist(sender)
                .room(room)
                .joinAt(LocalDateTime.now())
                .pk(ChatRoom.PK.builder().roomSeq(room.getSeq()).artistSeq(sender.getSeq()).build())
                .state(RoomState.ACTIVE)
                .build()));
        for(Long receiver : roomRequest.getReceiversSeq()){
            Artist artist = artistRepository.findBySeq(receiver)
                    .orElseThrow(()->new BusinessException(ARTIST_NOT_FOUND));
            if(artist.getPosition().equals(Position.CREW)) throw new BusinessException(CHAT_NOT_ALLOW_GROUP_CHAT);
            chatRooms.add(ChatRoom.builder()
                            .artist(artist)
                            .room(room)
                            .joinAt(LocalDateTime.now())
                            .pk(ChatRoom.PK.builder().roomSeq(room.getSeq()).artistSeq(artist.getSeq()).build())
                            .state(RoomState.ACTIVE)
                            .build());
        }
        chatRoomRepository.saveAll(chatRooms);
        return room.getSeq();
    }

    private void artistCertification(Long userSeq, Artist artist) {
        if( artist.getPosition() == Position.CREW ) {
            CrewUser crewUser = crewUserRepository.findCrewUserByPk(CrewUser.PK.builder()
                            .crewSeq(artist.getSeq())
                            .userSeq(userSeq)
                            .build())
                    .orElseThrow(()-> new BusinessException(CREW_USER_NOT_FOUND));

            if(crewUser.getState() != CrewUserState.ALL && crewUser.getState() != CrewUserState.CHAT)
                throw new BusinessException(CHAT_GRANT_FAIL);
        } else if(!artist.getSeq().equals(userSeq)) throw new BusinessException(CHAT_GRANT_FAIL);
    }
}
