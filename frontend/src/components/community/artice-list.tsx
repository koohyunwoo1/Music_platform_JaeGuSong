import React, { useEffect } from 'react';
import { Separator, Stack, Box } from '@chakra-ui/react';
import ArticleItems from './articleItems';
import useAuthStore from "@/stores/authStore";
import useCommunityMain from '@/hooks/community/useCommunityMain';

const ArticleList: React.FC = () => {
  const authStorage = localStorage.getItem("auth-storage");
  let artistSeq: number | null = null;

  // 예시
  let boardSeq = 17;

  if (authStorage) {
    try {
      const parsedData = JSON.parse(authStorage);
      artistSeq = parsedData?.state?.artistSeq || null;
    } catch (error) {
      console.error("Failed to parse auth-storage:", error);
    }
  }''

  const {
    myFeedArticleItems,
    getArticleList
  } = useCommunityMain();

  useEffect(() => {
    if (artistSeq != null) {
      getArticleList(artistSeq)
    }
  }, [artistSeq]);

  useEffect(() => {
  }, [myFeedArticleItems])
  
  return (
    
    <Box                
        height="800px"
        overflowY="auto"
    >
      {/* {myFeedArticleItems ? (
        myFeedArticleItems.map((myFeedArticleItem, index) => (
          <Separator
            key={index}  // 각 item에 고유한 key 지정
            size="xs" 
            borderColor="#c5e4f3"
          > */}
            <ArticleItems boardSeq={boardSeq} />
         {/* </Separator>
        ))
      ) : (
        <p>게시물이 없습니다.</p>  // 게시물이 없을 때 메시지 표시
      )}  */}
    </Box>
  );
};

export default ArticleList;