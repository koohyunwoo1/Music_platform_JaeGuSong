import { Card, Heading, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import paths from "@/configs/paths";

interface CardListProps {
  wsList: { id: number; name: string; creator: string }[]; // 필요에 따라 각 워크스페이스의 데이터 필드를 수정
}

export default function CardList({ wsList }: CardListProps) {
  const navigate = useNavigate();

  const handleCardClick = (workspaceId: number) => {
    navigate(`${paths.workspace.list}/${workspaceId}`);
  };

  return (
    <Stack
    // maxH="500px" // 컴포넌트 최대 높이 설정
    // overflowY="auto" // 세로 스크롤 활성화
    // spacing={4} // 카드 사이 여백
    // p={4} // 카드 리스트 내부 여백
    >
      {wsList.map((ws) => (
        <Card.Root
          key={ws.id}
          size="sm"
          onClick={() => handleCardClick(ws.id)}
          cursor="pointer"
        >
          <Card.Header>
            <Heading size="md">{ws.name}</Heading>
          </Card.Header>
          <Card.Body color="fg.muted">{ws.creator}의 워크스페이스</Card.Body>
        </Card.Root>
      ))}
    </Stack>
  );
}
