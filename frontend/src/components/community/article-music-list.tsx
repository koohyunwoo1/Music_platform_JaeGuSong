import React, { useEffect } from 'react';
import { Box, Button, Flex } from "@chakra-ui/react"
import axios from 'axios';
import useCommunityMusic from '@/hooks/community/useCommunityMusic';
import useAuthStore from "@/stores/authStore";

const ArticleMusicList: React.FC = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const {
      goMusicFeedDetail
    } = useCommunityMusic();
    
    useEffect(() => {
      const getMusicFeedList = async () => {
        const authStorage = localStorage.getItem("auth-storage");
        const storedToken = localStorage.getItem('jwtToken');
        let artistSeq: number | null = null;

        if (authStorage) {
          try {
            const parsedData = JSON.parse(authStorage);
            artistSeq = parsedData?.state?.artistSeq || null;
          } catch (error) {
            console.error("Failed to parse auth-storage:", error);
          }
        }
        try {
          const response = await axios.get(
            `${API_URL}/api/workspaces/artists/${artistSeq}`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`
              },
            }
          )
          console.log('dsfsfsafsa', response.data)
        } catch(error) {
          console.warn(error);
        }
      }
    }, []);
  return (
    <Box                
        height="800px"
        overflowY="auto"
        css={{
            '&::-webkit-scrollbar': {
                width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: '#e3f2f9',
                borderRadius: '20px',
            },
            '&::-webkit-scrollbar-track': {
                background: '#02001F',
                borderRadius: '20px',
            },
        }}
    >
    <Flex
    wrap="wrap" 
    margin="60px 200px"
    gap="30px"

>
    {/* {musicArticles.map((article) => (
        <Button
            key={article.board_seq}
            size="xs"
            variant="outline" 
            borderColor="#c5e4f3"
            width="300px"
            height="350px"
            color="white"
            onClick={() => goMusicFeedDetail(article)}
        >
            {article.title}
        </Button>
    ))} */}
</Flex>
</Box>
  );

};

export default ArticleMusicList;