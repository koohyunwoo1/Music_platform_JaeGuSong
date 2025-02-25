import React, { useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import useCrewSeqStore from "@/stores/crewSeqStore";
import paths from "@/configs/paths";
import CommunityButton from "./community-button";
import Modal from "../common/Modal";
import UseCommunityCrew from "@/hooks/community/useCommunityCrew";
import CrewMemeberListModal from "./crew-member-list-modal";
import CrewJoinApplyModal from "./crew-join-apply-modal";
import useCommon from "@/hooks/common/common";

interface CrewHeaderProps {
  checkBoardSeq: number;
}

const CrewHeader: React.FC<CrewHeaderProps> = ({checkBoardSeq}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const setGetCrewSeqStore = useCrewSeqStore((state) => state.setGetCrewSeqStore);
  const getCrewSeqStore = useCrewSeqStore((state) => state.getCrewSeqStore);
  
  const {
    openCrewFollowModal,
    openCrewJoinModal,
    openCrewWithdrawModal,
    openCrewMembersModal,
    openCrewApproveModal,
    crewNameSeq,
    crewName,
    crewManagerName,
    crewProfileImage,
    crewMakeDate,
    crewMembers,
    myCrewsSeq,
    myName,
    goCrewFollow,
    goJoinCrew,
    goWithdrawCrew,
    setOpenCrewApproveModal,
    handleCrewFollowModal,
    handleCrewJoinModal,
    handleCrewWithdrawModal,
    handleCrewMembers,
    preGetCrewInfo,
    getCrewInfo
  } = UseCommunityCrew();
  const { storeMySeq, getMySeq } = useCommon();
  
  useEffect(() => {
    if (!myCrewsSeq || !crewNameSeq) {
      preGetCrewInfo();
    } else {
      getCrewInfo();
    }
    getMySeq()
  }, [myCrewsSeq, crewNameSeq, getCrewSeqStore, id, storeMySeq]);
  
  useEffect(() => {
    console.log('피드장', checkBoardSeq, storeMySeq)
  }, [storeMySeq])
  
  useEffect(() => {
    if (id) {
      setGetCrewSeqStore(Number(id));
    }
  }, [id, setGetCrewSeqStore]);

  const goCreateArticle = () => {
    navigate(paths.community.create);
  };

  return (
    <>
      <Box
        position="fixed"
        top="0"
        left="250px"
        width="calc(100% - 250px)"
        padding="4"
        boxShadow="md" // 그림자 추가
        zIndex={10} // 헤더가 항상 상단에 오도록 설정
      >
        <Box height="70px">
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap="15px" 
          >
            <Box
              width="70px"
              height="70px"
              borderRadius="full" // 프로필 이미지를 원형으로
              overflow="hidden"
              border="2px solid #fff" // 테두리 추가
              boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" 
            >
              <img
                src={`https://file-bucket-l.s3.ap-northeast-2.amazonaws.com/${crewProfileImage}`}
                alt={`${crewProfileImage}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              ></img>
            </Box>
            <Text textStyle="3xl" marginRight="10px" marginTop="15px">
              {crewName}
            </Text>
            <Box marginTop="15px">
              <CommunityButton title="팔로우" onClick={handleCrewFollowModal} />
              {!myCrewsSeq.includes(crewNameSeq) && (
                <CommunityButton
                  title="가입요청"
                  onClick={handleCrewJoinModal}
                />
              )}
              <Button variant="ghost" color="white" onClick={handleCrewMembers}>
                크루원 보기
              </Button>
              {myName === crewManagerName && (
                <Button
                  // onClick={handleCrewApproveModal}
                  onClick={() => {
                    setOpenCrewApproveModal(true);
                  }}
                  variant="ghost"
                  color="white"
                >
                  가입 요청 확인하기
                </Button>
              )}
            </Box>
          </Box>
          <Box marginTop="10px">
            <Text>크루장: {crewManagerName}</Text>
            <Text>개설일: {crewMakeDate}</Text>
          </Box>
        </Box>
        <Box
          height="20px"
          display="flex"
          marginTop="20px"
          justifyContent="flex-end"
          gap="5px"
        >
          {checkBoardSeq === parseInt(storeMySeq) && (
            <Box marginRight="3px" display="flex" gap="7px">
              <CommunityButton title="글쓰기" onClick={goCreateArticle} />
              <CommunityButton
                title="음원피드 올리기"
                onClick={goCreateArticle}
              />
            </Box>
          )}
          {myCrewsSeq.includes(crewNameSeq) && (
            <Box marginRight="20px">
              <CommunityButton
                title="탈퇴하기"
                onClick={handleCrewWithdrawModal}
              />
            </Box>
          )}
        </Box>
      </Box>
      {openCrewFollowModal && (
        <Modal isOpen={openCrewFollowModal} onClose={handleCrewFollowModal}>
          <Box padding="5px 20px">
            <Text color="black" margin="40px">
              팔로우하시겠습니까?
            </Text>
            <Box
              margin="10px"
              display="flex"
              justifyContent="center"
              gap="10px"
            >
              <CommunityButton title="예" onClick={goCrewFollow} />
              <CommunityButton title="아니요" onClick={handleCrewFollowModal} />
            </Box>
          </Box>
        </Modal>
      )}
      {openCrewJoinModal && (
        <Modal isOpen={openCrewJoinModal} onClose={handleCrewJoinModal}>
          <Box padding="5px 20px">
            <Text color="black" margin="40px">
              가입하시겠습니까?
            </Text>
            <Box
              margin="10px"
              display="flex"
              justifyContent="center"
              gap="10px"
            >
              <CommunityButton title="예" onClick={goJoinCrew} />
              <CommunityButton title="아니요" onClick={handleCrewJoinModal} />
            </Box>
          </Box>
        </Modal>
      )}

      {openCrewWithdrawModal && (
        <Modal isOpen={openCrewWithdrawModal} onClose={handleCrewWithdrawModal}>
          <Box padding="5px 20px">
            <Text color="black" margin="40px">
              탈퇴하시겠습니까?
            </Text>
            <Box
              margin="10px"
              display="flex"
              justifyContent="center"
              gap="10px"
            >
              <CommunityButton title="예" onClick={goWithdrawCrew} />
              <CommunityButton
                title="아니요"
                onClick={handleCrewWithdrawModal}
              />
            </Box>
          </Box>
        </Modal>
      )}
      {openCrewMembersModal && (
        <CrewMemeberListModal
          isOpen={openCrewMembersModal}
          onClose={handleCrewMembers}
        />
      )}
      {openCrewApproveModal && (
        <Modal
          isOpen={openCrewApproveModal}
          onClose={() => setOpenCrewApproveModal(false)}
        >
          <Box padding="5px 20px">
            <Text color="black" margin="40px">
              가입 신청 유저 목록
            </Text>
            <CrewJoinApplyModal />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CrewHeader;
