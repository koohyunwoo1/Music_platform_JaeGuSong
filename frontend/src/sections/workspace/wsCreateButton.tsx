import { useState } from "react";
import axios from "axios";
import { Button, Input, Stack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function WsCreateButton({ artistSeq, onWorkspaceCreated }) {
  // export default function WsCreateButton({ artistSeq }) {
  const [workspaceName, setWorkspaceName] = useState("");
  const [originTitle, setOriginTitle] = useState("");
  const [originSinger, setOriginSinger] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleCreateWorkspace = async () => {
    try {
      const storedToken = localStorage.getItem("jwtToken");
      const response = await axios.post(
        `${API_URL}/api/artists/${artistSeq}/workspaces`,
        {
          name: workspaceName,
          originSinger,
          originTitle,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      toaster.create({
        description: "워크스페이스가 성공적으로 생성되었습니다.",
        type: "success",
      });

      // 생성 성공 시 부모 컴포넌트로 workspaceId 전달
      onWorkspaceCreated(response.data);
    } catch (error) {
      console.error("Error creating workspace:", error);
      toaster.create({
        description: "워크스페이스 생성에 실패했습니다.",
        type: "error",
      });
    }
  };

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          fontFamily="MiceGothic"
          fontSize={13}
        >
          워크스페이스 생성
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <PopoverTitle
            fontWeight="medium"
            fontFamily="MiceGothic"
            fontSize={13}
            marginBottom={3}
          >
            워크스페이스 생성
          </PopoverTitle>
          <Stack gap={2}>
            <Input
              placeholder="워크스페이스 이름을 입력해주세요."
              size="sm"
              fontFamily="MiceGothic"
              fontSize={11}
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
            <Input
              placeholder="작업할 곡의 원곡명을 입력해주세요."
              size="sm"
              fontFamily="MiceGothic"
              fontSize={11}
              value={originTitle}
              onChange={(e) => setOriginTitle(e.target.value)}
            />
            <Input
              placeholder="작업할 곡의 원곡자를 입력해주세요."
              size="sm"
              fontFamily="MiceGothic"
              fontSize={11}
              value={originSinger}
              onChange={(e) => setOriginSinger(e.target.value)}
            />
          </Stack>
          <Button
            size="sm"
            variant="outline"
            fontFamily="MiceGothic"
            fontSize={11}
            mt={4}
            onClick={handleCreateWorkspace}
          >
            생성하기
          </Button>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}
