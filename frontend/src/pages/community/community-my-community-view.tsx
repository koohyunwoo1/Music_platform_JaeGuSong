import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from '@/components/community/header';
import Container from '@/components/community/container';

const CommunityMyCommunityView: React.FC = () => {
  return (
    <Box>
      <Header />
      <Container></Container>
    </Box>
  );
};

export default CommunityMyCommunityView;