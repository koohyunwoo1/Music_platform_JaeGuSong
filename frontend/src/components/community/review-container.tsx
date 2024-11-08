import React from 'react';
import { Box, Stack, Separator, Text } from "@chakra-ui/react"

interface ReviewContainerProps {
  comments: any[];
  commentsLength: number;
}

const Reviewcontainer: React.FC<ReviewContainerProps> = ({ comments, commentsLength }) => {
  return (
    <Box marginBottom="500px">
    <Stack>
      <Separator size="xs" marginTop="20px" />
      <Text marginLeft="5px">댓글</Text>
      <Separator size="xs" />
      {commentsLength === 0 ? (
        <Box>댓글이 없습니다.</Box>
        ) : (
          comments.map((comment, index) => (
            <Box key={index}>{comment}</Box>
          ))
      )}
    </Stack>
    </Box>
  );
};

export default Reviewcontainer;