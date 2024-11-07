import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Button, Input as ChakraInput, Textarea } from '@chakra-ui/react';
import Modal from '@/components/common/Modal';
import CommunityButton from '@/components/community/community-button';
import UseCommunityCrew from '@/hooks/community/useCommunityCrew';
import useMyCrew from '@/hooks/setting/useMyCrew';
import useMyInfo from '@/hooks/setting/useMyInfo';
import { UserInfo } from '@/hooks/setting/useMyInfo';
import { MakeCrewInputFields } from '@/configs/community/makeCrew';
import MyInfo from '@/components/setting/myInfo';

interface Crew {
  id: number;
}

const MyPageView: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [ crewsInfo, setCrewsInfo ] = useState<Crew[]>([]);

  const [ myInfo, setMyInfo ] = useState<UserInfo | null>(null);
  const {
    openMakeCrewModal,
    makeCrewFormData,
    handleMakeCrewModal,
    handleChange,
    makeCrew,
    setMakeCrewFormData,
  } = UseCommunityCrew();

  const { getMyCrews } = useMyCrew();

  const formData = new FormData();

  // 파일 선택을 위한 상태 추가
  const [file, setFile] = useState<File | null>(null);

  // 파일 선택 시 호출되는 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      setMakeCrewFormData({
        ...makeCrewFormData,
        profileImage: selectedFile,
      });
    }
  };

  // 크루 생성 함수 수정
  const handleMakeCrew = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 파일이 선택된 경우 FormData에 추가
    if (file) {
      formData.append('profileImage', file);
    }

    makeCrew(makeCrewFormData); // makeCrew 함수에 FormData 전달
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedToken = localStorage.getItem('jwtToken');
      if (storedToken) {
        try {
          console.log('토큰토큰', storedToken)
          const response = await axios.get(`${API_URL}/api/user`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          console.log('저장할거양ㅇㅇㅇ', response.data)
          setMyInfo(response.data)
          setCrewsInfo(response.data.crews);
        } catch (error) {
          console.warn('Error during API request:', error);
        }
      } else {
        console.warn('No stored token found');
      }
    };

    fetchUserInfo(); // 유저 정보 가져오기
  }, []); // 의존성 추가

  useEffect(() => {
    if (crewsInfo) {
      getMyCrews(crewsInfo);
    }
  }, [crewsInfo]);

  return (
    <>
      <Box display="flex" flexDirection="row" gap="10px">
        <Box>내 크루</Box>
        <CommunityButton title="크루 만들기" onClick={handleMakeCrewModal} />
      </Box>
      <Box>내 정보 불러오기</Box>
      {openMakeCrewModal && (
        <Modal isOpen={openMakeCrewModal} onClose={handleMakeCrewModal}>
          <Box
            width="500px"
            height="550px"
            marginTop="60px"
            padding="20px"
            borderRadius="md"
            bg="white"
            color="black"
          >
            <Text textStyle="xl" color="black">
              크루 생성
            </Text>
            <Box marginTop="50px">
              <form onSubmit={handleMakeCrew}>
              {/* <form> */}
                <Box display="flex" alignItems="center" mb="4">
                  <Text as="label" fontWeight="medium" width="150px">
                    크루명
                  </Text>
                  <ChakraInput
                    type="text"
                    name="nickname"
                    value={makeCrewFormData.nickname}
                    onChange={handleChange}
                    placeholder="크루 이름을 입력하세요"
                  />
                </Box>
                <Box display="flex" alignItems="center" mb="4">
                  <Text as="label" fontWeight="medium" width="150px">
                    (선택)크루 설명
                  </Text>
                  <Textarea
                    name="content"
                    value={makeCrewFormData.content}
                    onChange={handleChange}
                    placeholder="크루 설명을 입력하세요"
                    height="200px"
                  />
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                  <Box display="flex" alignItems="center" mb="4">
                    <Text as="label" fontWeight="medium" width="100px">
                      지역
                    </Text>
                    <select
                      name="region"
                      onChange={handleChange}
                      value={makeCrewFormData.region}
                    >
                      <option>선택</option>
                      {MakeCrewInputFields[2].options?.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Box>
                  <Box display="flex" alignItems="center" mb="4">
                    <Text as="label" fontWeight="medium" width="100px">
                      장르
                    </Text>
                    <select
                      name="genre"
                      onChange={handleChange}
                      value={makeCrewFormData.genre}
                    >
                      <option>선택</option>
                      {MakeCrewInputFields[3].options?.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mb="4">
                  <Text as="label" fontWeight="medium" width="150px">
                    프로필 이미지
                  </Text>
                  <input
                    type="file"
                    name="profileImage"
                    onChange={handleFileChange}
                    style={{ color: 'black' }}
                  />
                </Box>
                <Box display="flex" justifyContent="center" alignContent="center" gap="10px" marginTop="50px">
                  <Button type="submit">생성</Button>
                  <Button onClick={handleMakeCrewModal}>취소</Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Modal>
      )}
      <MyInfo  myInfo={myInfo}/>
    </>
  );
};

export default MyPageView;
