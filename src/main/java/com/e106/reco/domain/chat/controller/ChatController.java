package com.e106.reco.domain.chat.controller;

import com.e106.reco.domain.chat.dto.RoomResponse;
import com.e106.reco.domain.chat.entity.Chat;
import com.e106.reco.domain.chat.entity.ChatArtist;
import com.e106.reco.domain.chat.repository.ChatRepository;
import com.e106.reco.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chats")
public class ChatController {
    private final ChatService chatService;
    private final ChatRepository chatRepository;

//    @PostMapping("/group")
//    public Long createGroupChatRoom(@RequestBody RoomRequest roomRequest) {
//        return chatService.createGroupChatRoom(roomRequest);
//    }
//    @PostMapping("/single")
//    public Long createSingleChatRoom(@RequestBody RoomRequest roomRequest) {
//        return chatService.createSingleChatRoom(roomRequest);
//    }
//    @PostMapping("/invite/{roomSeq}/{artistSeq}")
//    private void invite(@PathVariable("roomSeq") Long roomSeq, @PathVariable("artistSeq") Long artistSeq) {
//        chatService.invite(roomSeq, artistSeq);
////        return
//    }
//    @DeleteMapping("/leave/{roomSeq}/{artistSeq}")
//    private void leave(@PathVariable("roomSeq") Long roomSeq, @PathVariable("artistSeq") Long artistSeq) {
//        chatService.leave(roomSeq, artistSeq);
////        return
//    }

//    @PostMapping("/webflux")
//    public Mono<Chat> postMsg(@RequestBody Chat chat) {
//        return chatService.sendMsg(chat);
//    }
//
//
//    @GetMapping(value = "/webflux/artistInfo/{roomSeq}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//    public Flux<ChatArtist> getArtistInfo(@PathVariable("roomSeq") Long roomSeq) {
//        return chatService.getArtistInfo(roomSeq);
//    }





//    @GetMapping(value = "/artists/{roomSeq}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//    public Flux<Chat> getArtists(@PathVariable("roomSeq")String groupSeq) {
//        return chatService.findByPk(groupSeq);
//    }
    @GetMapping(value = "/webflux/{roomSeq}/{artistSeq}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Chat> getMsg(@PathVariable("artistSeq")Long artistSeq, @PathVariable("roomSeq")Long roomSeq) {
        return chatService.getMsg(artistSeq, roomSeq);
    }

    @GetMapping(value = "/webflux/{artistSeq}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public  Flux<RoomResponse> getChatRooms(@PathVariable("artistSeq")Long artistSeq) {
        return chatService.getChatRooms(artistSeq);
    }


//    @GetMapping(value = "/sender/{sender}/receiver/{receiver}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//    public Flux<Chat> getMsg(@PathVariable("sender") String sender, @PathVariable("receiver") String receiver) {
//        return chatRepository.mFindByGroupSeqAfterJoin(sender, receiver)
//                .subscribeOn(Schedulers.boundedElastic());
//    }
}
