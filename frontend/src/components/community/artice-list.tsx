import React, { useEffect } from 'react';
import { Separator, Stack  } from '@chakra-ui/react';
import ArticleItems from './articleItems';
import useCommunityMain from '@/hooks/community/useCommunityMain';
const ArticleList: React.FC = () => {
  const {
    myFeedArticleItems,
    getArticleList
  } = useCommunityMain();

  
  //게시물이 새로 생성될 때마다 목록 요청
  useEffect(() => {
    getArticleList();
  }, [myFeedArticleItems]);
  
  // useEffect(() => {
  //   getArticleList();
  // }, [])

  return (
    <Stack 
      marginTop="10px"
    >
      {myFeedArticleItems.map((myFeedArticleItem) => (
        <Separator
          // key={article.board_seq}
          // size="xs" 
          // borderColor="#c5e4f3"
        >
          {/* <ArticleItems article={myFeedArticleItem} /> */}
        </Separator>
      ))}
    </Stack>
  );
};

export default ArticleList;