import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from '@/components/community/header';
import Container from '@/components/community/container';
import ArticleList from '@/components/community/artice-list';


const CommunityMyCommunityView: React.FC = () => {
  return (
    <Box>
      <Header />
      <Container>
        <ArticleList />
      </Container>
    </Box>
  );
};

export default CommunityMyCommunityView;