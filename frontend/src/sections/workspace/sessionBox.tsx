import Session from "@/components/workspace/session";
import { Stack } from "@chakra-ui/react";
import { Global } from "@emotion/react";

interface SessionBoxProps {
  sessions: {
    soundSeq: number;
    startPoint: number;
    endPoint: number;
    type: string;
    url: string;
  };
  workspaceSeq: number;
  onSessionDelete: (sessionId: number) => void;
  role: string;
}

// export default function SessionBox({ sessions, workspaceSeq, onDeleteSession }: SessionBoxProps) {
export default function SessionBox({
  sessions,
  workspaceSeq,
  onSessionDelete,
  role,
}: SessionBoxProps) {
  return (
    <>
      {/* Global 스타일 적용 */}
      <Global
        styles={{
          "html, body": {
            backgroundColor: "#02001F",
            color: "white",
            fontFamily: "Arial, sans-serif",
            margin: 0,
            padding: 0,
          },
          /* 스크롤바 스타일 */
          "::-webkit-scrollbar": {
            width: "10px",
            height: "8px",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            borderRadius: "5px",
          },
          "::-webkit-scrollbar-track": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        }}
      />
      <Stack marginRight={3}>
        {sessions.map((session) => (
          <Session
            key={session.soundSeq}
            sessionId={session.soundSeq.toString()}
            url={session.url}
            type={session.type}
            startPoint={session.startPoint}
            endPoint={session.endPoint}
            workspaceSeq={workspaceSeq}
            // onSessionDelete={onSessionDelete}
            onSessionDelete={role === "MASTER" ? onSessionDelete : undefined}
            role={role}
          />
        ))}
      </Stack>
    </>
  );
}
