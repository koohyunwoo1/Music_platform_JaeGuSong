import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

interface OtherHeaderProps {
    otherUserNickname: string;
    otherUserProfileImage: string;
  }

const OtherHeader: React.FC<OtherHeaderProps>  = ({ otherUserNickname, otherUserProfileImage }) => {

  return (
    <Box
      position="fixed"
      top="0"
      left="250px"
      width="calc(100% - 250px)"
      padding="4"
      boxShadow="md" // 그림자 추가
      zIndex={10} // 헤더가 항상 상단에 오도록 설정
    >
      <Box
        height="70px"
      >
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
            <img src={`https://file-bucket-l.s3.ap-northeast-2.amazonaws.com/${otherUserProfileImage}`} alt={`${otherUserProfileImage}`}></img>
          </Box>            
          <Text
            textStyle="3xl"
            fontWeight="bold"
            color="white"
            marginTop="10px"
            noOfLines={1}
          >
            {otherUserNickname}
          </Text>
          <Text
            textStyle="xl"
            color="whiteAlpha.800"
            marginTop="5px"
            noOfLines={1}
          >
            님의 피드
          </Text>
          <Button
            border="solid 2px #9000FF"
            borderRadius="15px"
            height="30px"
            width="80px"
            _hover={{
              color: "#9000ff",
              border: "solid 2px white",
            }}
          >
            팔로우
          </Button>
        </Box>          
      </Box>        
      <Box 
        marginTop="20px"
        marginRight="20px"
        display="flex"
        justifyContent="flex-end"
        gap="5px"
      >
      </Box>        
    </Box>
  );
};

export default OtherHeader;