import { Text, Stack, Flex } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

interface WsHeaderProps {
  wsDetails: {
    name: string;
    originTitle: string;
    originSinger: string;
    state: string;
  }[]; // 필요에 따라 각 워크스페이스의 데이터 필드를 수정
}

export default function WsHeader({ wsDetails }: WsHeaderProps) {
  return (
    <Stack>
      <Flex justifyContent="space-between">
        <Stack>
          <Text>{wsDetails.name || "제목 없음"}</Text>
          <Text>
            {wsDetails.originTitle || "제목 없음"} -{" "}
            {wsDetails.originSinger || "아티스트 없음"}
          </Text>

          <Text fontSize="sm" color="gray.400">
            최종 저장일시: 2024-10-24 23:10
          </Text>
        </Stack>
        <Flex>
          <Button>저장</Button>
          <Button>공유</Button>
        </Flex>
      </Flex>
    </Stack>
  );
}
