import React, { useEffect } from 'react';
import { Separator, Stack } from '@chakra-ui/react';
import ArticleItems from './articleItems';
import useAuthStore from "@/stores/authStore";
import useCommunityMain from '@/hooks/community/useCommunityMain';

const ArticleList: React.FC = () => {
  const artistSeq = useAuthStore((state) => state.artistSeq);

  const {
    myFeedArticleItems,
    getArticleList
  } = useCommunityMain();

  useEffect(() => {
    getArticleList(artistSeq)
  }, []);

  useEffect(() => {

  }, [myFeedArticleItems])
  


  
  return (
    <Stack 
      marginTop="10px"
    >
      {/* {myFeedArticleItems ? (
        myFeedArticleItems.map((myFeedArticleItem, index) => (
          <Separator
            key={index}  // 각 item에 고유한 key 지정
            size="xs" 
            borderColor="#c5e4f3"
          >
            <ArticleItems article={myFeedArticleItem} />
          </Separator>
        ))
      ) : (
        <p>게시물이 없습니다.</p>  // 게시물이 없을 때 메시지 표시
      )} */}
    </Stack>
  );
};

export default ArticleList;