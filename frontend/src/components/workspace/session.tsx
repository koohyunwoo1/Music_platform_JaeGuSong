import { Box, Stack, Text, Flex, Card } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import ToggleOptions from "./toggleOptions";
import CursorMarker from "./cursorMarker";
import { Checkbox } from "../ui/checkbox";
import Play from "@/sections/workspace/play";
import { useWsDetailStore } from "@/stores/wsDetailStore";

interface SessionProps {
  sessionId: string;
  url: string;
  type: string;
  startPoint: number;
  endPoint: number;
}

export default function Session({
  sessionId,
  url,
  type,
  startPoint,
  endPoint,
}: SessionProps) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [cursor1, setCursor1] = useState(startPoint); // 시작 커서 위치
  const [cursor2, setCursor2] = useState(endPoint); // 종료 커서 위치
  const addSession = useWsDetailStore((state) => state.addSession);
  const removeSession = useWsDetailStore((state) => state.removeSession);
  const toggleSession = useWsDetailStore((state) => state.toggleSession);

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#FFFFFF",
      progressColor: "lightgrey",
      cursorColor: "green",
      barWidth: 1,
      barHeight: 0.8,
      barGap: 0.5,
      cursorWidth: 2,
      height: 100,
    });

    wavesurferRef.current.load(url);

    wavesurferRef.current.on("ready", () => {
      const audioDuration = wavesurferRef.current?.getDuration() || 0;
      setDuration(audioDuration);
      setCursor2(endPoint || audioDuration); // 종료 커서를 오디오 길이로 설정
    });

    wavesurferRef.current.on("audioprocess", () => {
      const currentTime = wavesurferRef.current?.getCurrentTime() || 0;
      setCurrentTime(currentTime);
    });

    wavesurferRef.current.on("seek", () => {
      const newTime = wavesurferRef.current?.getCurrentTime() || 0;
      setCurrentTime(newTime);
    });

    const updateCurrentTimeOnClick = () => {
      const newTime = wavesurferRef.current?.getCurrentTime() || 0;
      setCurrentTime(newTime);
    };
    waveformRef.current.addEventListener("click", updateCurrentTimeOnClick);

    addSession(sessionId, wavesurferRef.current);

    return () => {
      removeSession(sessionId);
      wavesurferRef.current?.destroy();
      waveformRef.current?.removeEventListener(
        "click",
        updateCurrentTimeOnClick
      );
    };
  }, [sessionId, addSession, removeSession, url, startPoint, endPoint]);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play(cursor1, cursor2);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.stop();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Card.Root bg="transparent" color="white" padding="2" borderColor="grey">
      <Flex gap={3}>
        <Checkbox onChange={() => toggleSession(sessionId)} />
        <Stack justifyContent="center">
          <ToggleOptions />
          <Text fontFamily="MiceGothic" fontSize={11}>
            세션 타입 : {type}
          </Text>
        </Stack>

        <Box width="100%">
          <Box
            ref={waveformRef}
            width="100%"
            height="100px"
            position="relative"
          >
            <CursorMarker
              position={cursor1}
              color="green"
              duration={duration}
            />
            <CursorMarker position={cursor2} color="red" duration={duration} />
          </Box>

          <Flex justifyContent="space-between">
            <Text fontSize={10}>{formatTime(currentTime)}</Text>
            <Text fontSize={10}>{formatTime(duration)}</Text>
          </Flex>
        </Box>

        <Play
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onStop={handleStop}
          mode="individual"
        />
      </Flex>
    </Card.Root>
  );
}
