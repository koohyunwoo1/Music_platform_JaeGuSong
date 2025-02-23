import { Box, Image, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import SessionBox from "@/sections/workspace/sessionBox";
import { useParams } from "react-router-dom";
import WsHeader from "@/sections/workspace/wsHeader";
import WsFooter from "@/sections/workspace/wsFooter";

interface Sound {
  soundSeq: number;
  startPoint: number;
  endPoint: number;
  // 필요한 다른 필드도 추가할 수 있습니다.
}

export default function WsDetailView() {
  const [wsDetails, setWsDetails] = useState<{
    name: string;
    originTitle: string;
    originSinger: string;
    role: string;
    state: string; // 추가된 state 필드
    sounds: Sound[];
    thumbnail: string;
  }>({
    name: "",
    originTitle: "",
    originSinger: "",
    role: "",
    state: "", // 기본값 설정
    sounds: [], // 세션 데이터를 초기 상태로 설정
    thumbnail: "",
  });

  // API URL 설정
  const API_URL = import.meta.env.VITE_API_URL;

  const { workspaceSeq } = useParams<{ workspaceSeq: string }>();
  const workspaceSeqNumber = workspaceSeq
    ? parseInt(workspaceSeq, 10)
    : undefined;

  useEffect(() => {
    const fetchWorkspaceDetail = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/workspaces/${workspaceSeq}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );
        console.log("Workspace Details:", response.data);
        setWsDetails(response.data);
        // setSessions(response.data.sounds || []); // 세션 목록 초기화
      } catch (error) {
        console.error("Error fetching workspace details:", error);
      }
    };

    if (workspaceSeq) {
      fetchWorkspaceDetail();
    }
  }, [workspaceSeq, API_URL]);

  // 세션 삭제 시 호출되는 핸들러 함수
  const handleSessionDelete = (sessionId: number) => {
    setWsDetails((prevDetails) => ({
      ...prevDetails,
      sounds: prevDetails.sounds.filter(
        (session) => session.soundSeq !== sessionId
      ),
    }));
  };

  return (
    <Stack padding={4} color="white" borderRadius="md" height="100%">
      <WsHeader wsDetails={wsDetails} workspaceSeq={workspaceSeqNumber} />

      <Image src={wsDetails.thumbnail} />
      {/* <Image src="https://file-bucket-l.s3.ap-northeast-2.amazonaws.com/"/> */}

      <Box flex="1" overflowY="auto">
        <SessionBox
          workspaceSeq={workspaceSeqNumber}
          sessions={wsDetails.sounds}
          onSessionDelete={handleSessionDelete}
        />
      </Box>

      <WsFooter wsDetails={wsDetails} workspaceSeq={workspaceSeqNumber} />
    </Stack>
  );
}
