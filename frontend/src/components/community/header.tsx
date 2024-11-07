import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text } from '@chakra-ui/react';
import CommunityButton from './community-button';
import { useNavigate } from 'react-router-dom';
import paths from '@/configs/paths';
import useAuth from '@/hooks/auth/useAuth';
import useSearch from '@/hooks/navbar/useSearch';

const Header: React.FC =  () => {
  const API_URL =import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [ myNickname, setMyNickname ] = useState<string>('');
  const [ mySeq, setMySeq ] = useState<Number>(0);
  // const { openSearchModal } = useSearch();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedToken = localStorage.getItem('jwtToken');
      if (storedToken) {
        try {
          const response = await axios.get(
            `${API_URL}/api/user`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`
              },
              withCredentials: true,
            }
          );
          console.log('Response:', response.data);
          setMyNickname(response.data.nickname)
          setMySeq(response.data.seq)
        } catch (error) {
          console.warn('Error during API request:', error);
        }
      } else {
        console.warn('No stored token found');
      }
    };
  
    fetchUserInfo(); // 유저 정보 가져오기
  // }, [API_URL, getStoredToken, navigate, token]); // 필요한 의존성 추가
  }, []); // 필요한 의존성 추가
  

  const goCreateArticle = () => {
      navigate(paths.community.create);
  }
  return (
    <Box
        position="fixed"
        top="0"
        left="250px"
        width="calc(100% - 250px)" 
        padding="4"
    >
      <Box
        height="70px"
      >
        <Box 
          display="flex" 
          flexDirection="row" 
          alignItems="center"
          gap="5px"
        >
          <img></img>
          <Text textStyle="3xl" marginTop="15px">{myNickname}</Text>
          <Text textStyle="xl" marginTop="15px">님의 피드</Text>
        </Box>          
      </Box>        
      <Box 
        marginTop="20px"
        display="flex"
        justifyContent="flex-end"
        gap="5px"
      >
        <CommunityButton 
          title='글쓰기'
          onClick={goCreateArticle}
          />
        <CommunityButton
          title='음원피드 올리기'
          onClick={goCreateArticle}
        />
      </Box>        
    </Box>
  );
};

export default Header;