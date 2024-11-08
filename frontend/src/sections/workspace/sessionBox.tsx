import Session from "@/components/workspace/session";
import { Stack } from "@chakra-ui/react";

interface SessionBoxProps {
  sessions: {
    soundSeq: number;
    startPoint: number;
    endPoint: number;
    type: string;
    url: string;
  }[];
}

export default function SessionBox({ sessions }: SessionBoxProps) {
  return (
    <Stack>
      {sessions.map((session) => (
        <Session
          key={session.soundSeq}
          sessionId={session.soundSeq.toString()}
          url={session.url}
          type={session.type} // title이나 다른 정보를 필요하면 추가
        />
      ))}
    </Stack>
  );
}
