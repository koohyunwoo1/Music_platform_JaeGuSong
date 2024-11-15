import { IconButton, Flex, Stack, Image } from "@chakra-ui/react";
import { useWsDetailStore } from "@/stores/wsDetailStore";

interface PlayProps {
  // isPlaying: boolean;
  // onPlayPause: () => void;
  // onStop: () => void;
  mode: "individual" | "all";
}

export default function Play({
  // isPlaying,
  // onPlayPause,
  // onStop,
  mode,
}: PlayProps) {
  // const playAll = useWsDetailStore((state) => state.playAll);
  // const pauseAll = useWsDetailStore((state) => state.pauseAll);
  // const stopAll = useWsDetailStore((state) => state.stopAll);
  const { isPlaying, playAll, pauseAll, stopAll } = useWsDetailStore();

  const handlePlayPause = () => {
    if (mode === "all") {
      if (isPlaying) {
        pauseAll(); // 전체 일시정지
      } else {
        playAll(); // 전체 재생
      }
    } else {
      // onPlayPause(); // 개별 세션 재생/일시정지
    }
  };

  const handleStop = () => {
    if (mode === "all") {
      stopAll();
    } else {
      // onStop();
    }
  };

  return (
    <Stack
      direction="row"
      bg="gray.800"
      padding="6"
      borderRadius="15px"
      border="0.5px solid rgba(255, 255, 255, 0.2)"
      gap="4"
      justifyContent="center"
      alignItems="center"
      background="rgba(0, 0, 0, 0.3)"
    >
      <Flex gap="4" justifyContent="center">
        <IconButton
          bg="blackAlpha.900" // 검은 배경
          border="2px solid" // 테두리 두께
          borderColor="teal.700" // 보라색 테두리
          borderRadius="md" // 모서리 둥글게
          _hover={{ bg: "teal.700" }} // 호버 효과
          _active={{ bg: "teal.800" }} // 클릭 효과
          aria-label={isPlaying ? "일시정지" : "재생"}
          colorScheme="teal"
          color="white"
          onClick={handlePlayPause}
          width="46px"
          height="46px"
          padding="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={
              isPlaying
                ? "/assets/workspace/pauseButton.png"
                : "/assets/workspace/playButton.png"
            }
            alt={isPlaying ? "일시정지" : "재생"}
            boxSize="20px"
          />
        </IconButton>

        <IconButton
          bg="blackAlpha.900" // 검은 배경
          border="2px solid" // 테두리 두께
          borderColor="red.700" // 보라색 테두리
          borderRadius="md" // 모서리 둥글게
          _hover={{ bg: "red.700" }} // 호버 효과
          _active={{ bg: "red.800" }} // 클릭 효과
          aria-label="정지"
          colorScheme="red"
          color="white"
          onClick={handleStop}
          width="46px"
          height="46px"
          padding="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="/assets/workspace/stopButton.png"
            alt="정지"
            boxSize="20px"
          />
        </IconButton>
      </Flex>
    </Stack>
  );
}
