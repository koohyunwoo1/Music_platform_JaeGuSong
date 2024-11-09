import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import SessionBox from "@/sections/workspace/sessionBox";
import { useParams } from "react-router-dom";
import WsHeader from "@/sections/workspace/wsHeader";
import WsFooter from "@/sections/workspace/wsFooter";

export default function WsDetailView() {
  // const [wsDetails, setWsDetails] = useState([]);
  const [wsDetails, setWsDetails] = useState<{
    name?: string;
    originTitle?: string;
    originSinger?: string;
  }>({});

  // API URL 설정
  const API_URL = import.meta.env.VITE_API_URL;

  const { workspaceSeq } = useParams<{ workspaceSeq: string }>();

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
      } catch (error) {
        console.error("Error fetching workspace details:", error);
      }
    };

    if (workspaceSeq) {
      fetchWorkspaceDetail();
    }
  }, [workspaceSeq, API_URL]);

  return (
    <Stack padding={4} color="white" borderRadius="md">
      <WsHeader wsDetails={wsDetails} workspaceSeq={workspaceSeq} />

      <SessionBox sessions={wsDetails.sounds || []} />

      <WsFooter wsDetails={wsDetails} workspaceSeq={workspaceSeq} />
    </Stack>
  );
}
