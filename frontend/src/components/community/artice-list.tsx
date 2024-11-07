import React, { useEffect } from 'react';
import { Separator, Stack } from '@chakra-ui/react';
import ArticleItems from './articleItems';
import useCommunityMain from '@/hooks/community/useCommunityMain';

const ArticleList: React.FC = () => {
  const {
    myFeedArticleItems,
    getArticleList
  } = useCommunityMain();
  

  // useEffect(() => {
  //   console.log('바보양')
  //   getMyInfo();
  // }, []);

  // useEffect(() => {
  //   if (getMySeq) { 
  //     console.log('나 하나다다다다다다다다ㅏㅏ다', getMySeq)
  //       getArticleList();
  //   }
  // }, [getMySeq]);

  // useEffect(() => {
  //   getMyInfo();
  // }, []);
  
  // useEffect(() => {
  //   if (getMySeq !== 0) { // getMySeq가 업데이트된 후
  //     getArticleList();
  //   }
  // }, [getMySeq]);

  // useEffect(() => {
  //   const fetchUserInfoAndArticles = async () => {
  //     await getMyInfo(); // 완료된 후에
  //     getArticleList(); // 게시물 가져오기
  //   };
  
  //   fetchUserInfoAndArticles();
  // }, []);
  
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
          <ArticleItems article={myFeedArticleItem} />
        </Separator>
      ))}
    </Stack>
  );
};

export default ArticleList;