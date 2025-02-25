import { Card, Badge, Box, HStack, Image, Stack, Flex } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { RiArrowRightLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import paths from "@/configs/paths";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "@/components/ui/file-button";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiUpload } from "react-icons/hi";
import { toaster } from "@/components/ui/toaster";
import axios from "axios";
import { useState } from "react";
import { Global } from "@emotion/react";

interface CardListProps {
  wsList: {
    workspaceSeq: number;
    name: string;
    thumbnail: string;
    state: string;
    originTitle: string;
    originSinger: string;
  }[];
  fetchWsList: () => void;
}

export default function CardList({ wsList, fetchWsList }: CardListProps) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [selectedWorkspaceSeq, setSelectedWorkspaceSeq] = useState<
    number | null
  >(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleCardClick = (workspaceSeq: number) => {
    navigate(paths.workspace.detail(workspaceSeq));
  };

  const handleWsDelete = (workspaceSeq: number) => {
    console.log(
      "안녕, 난 handleWsDelete. 정말 워크스페이스 삭제할거야?",
      workspaceSeq
    );
    setSelectedWorkspaceSeq(workspaceSeq); // 삭제할 workspaceSeq를 상태로 설정
  };

  const handleWsDeleteApi = async () => {
    console.log(
      "안녕, 난 handleWsDeleteApi. 삭제할 workspaceSeq :",
      selectedWorkspaceSeq
    );
    try {
      await axios.post(
        `${API_URL}/api/workspaces/${selectedWorkspaceSeq}/state`,
        { state: "INACTIVE" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      setSelectedWorkspaceSeq(null); // 상태 초기화
      fetchWsList(); // 목록 새로고침

      toaster.create({
        description: "워크스페이스가 성공적으로 삭제되었습니다.",
        type: "success",
      });
    } catch (error) {
      console.error("Error updating workspace state:", error);
      // alert("워크스페이스 삭제에 실패했습니다.");
      toaster.create({
        description: "워크스페이스 삭제에 실패했습니다.",
        type: "error",
      });
    }
  };

  const handleFileChange = (event: { files: File[] }) => {
    const selectedFile = event.acceptedFiles[0];
    if (selectedFile) {
      setFiles(selectedFile);
      console.log("selectedFile :", selectedFile);
    }
  };

  const handleChangeThumbnail = async (workspaceSeq: number) => {
    console.log("안녕, 난 handleChangeThumbnail. 대표 이미지 변경해볼게");
    console.log("file :", files);

    if (!files) {
      toaster.create({
        description: "파일을 업로드 해주세요.",
        type: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", files);

    try {
      await axios.post(
        `${API_URL}/api/workspaces/${workspaceSeq}/thumbnail`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      fetchWsList(); // 목록 새로고침

      toaster.create({
        description: "대표 이미지가 성공적으로 등록되었습니다.",
        type: "success",
      });
    } catch (error) {
      console.error("Error updating workspace state:", error);
      toaster.create({
        description: "대표 이미지 등록에 실패했습니다.",
        type: "error",
      });
    }
  };

  return (
    <>
      {/* Global 스타일 적용 */}
      <Global
        styles={{
          "html, body": {
            backgroundColor: "#02001F",
            color: "black",
            fontFamily: "MiceGothic",
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
        {wsList.map((ws) => (
          <Card.Root
            key={ws.workspaceSeq}
            flexDirection="row"
            overflow="hidden"
            // maxW="xl"
            width="100%"
          >
            <Box position="relative">
              <Stack
                width="200px"
                height="150px"
                justifyContent="center"
                background="black"
              >
                <Image
                  objectFit="contain"
                  // maxW="200px"
                  // width="200px"
                  // height="150px"
                  src={
                    ws.thumbnail ||
                    "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                  }
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60";
                  }}
                  alt="Thumbnail"
                  background="white"
                />
              </Stack>

              <PopoverRoot>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    position="absolute"
                    bottom="4px"
                    right="4px"
                    // size="xs"
                    height={6}
                    p="2"
                    // colorScheme="blue"
                    fontFamily="MiceGothic"
                    fontSize={11}
                    color="white"
                    background="rgba(0, 0, 0, 0.4)"
                  >
                    <HiUpload size="xs" /> 대표 이미지 변경
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
                      대표 이미지 변경
                    </PopoverTitle>

                    {/* 파일 업로드 */}
                    <FileUploadRoot
                      accept={["image/*"]}
                      onFileChange={handleFileChange}
                    >
                      <FileUploadTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          fontFamily="MiceGothic"
                          fontSize={11}
                          mt={4}
                        >
                          <HiUpload /> 파일 업로드
                        </Button>
                      </FileUploadTrigger>
                      <FileUploadList />
                    </FileUploadRoot>

                    <Button
                      size="sm"
                      variant="outline"
                      fontFamily="MiceGothic"
                      fontSize={11}
                      mt={4}
                      onClick={() => handleChangeThumbnail(ws.workspaceSeq)}
                    >
                      변경하기
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            </Box>

            <Box width="100%">
              <Flex justifyContent="space-between">
                <Stack>
                  <Card.Body>
                    <Card.Title mb="3">{ws.name || "워크스페이스"}</Card.Title>
                    {/* <Card.Description>
                    Caffè latte is a coffee beverage of Italian origin made with espresso
                    and steamed milk.
                  </Card.Description> */}
                    <HStack gap="4">
                      <Badge>{ws.originTitle || "원곡명"}</Badge>
                      <Badge>{ws.originSinger || "원곡자"}</Badge>
                      <Badge>{ws.state || "공개여부"}</Badge>
                    </HStack>
                  </Card.Body>
                </Stack>
                <Card.Footer>
                  <Button
                    bg="blue.100" // 검은 배경
                    color="black" // 텍스트 색상
                    border="1.5px solid" // 테두리 두께
                    borderColor="blue.500" // 보라색 테두리
                    borderRadius={13} // 모서리 둥글게
                    _hover={{ bg: "blue.700" }} // 호버 효과
                    _active={{ bg: "blue.800" }} // 클릭 효과
                    paddingX="4"
                    paddingY="2"
                    width="60px"
                    height="40px"
                    fontWeight="bold"
                    onClick={() => handleCardClick(ws.workspaceSeq)}
                  >
                    <RiArrowRightLine />
                  </Button>

                  <HStack wrap="wrap" gap="4">
                    <DialogRoot
                      role="alertdialog"
                      key={"center"}
                      placement={"center"}
                      motionPreset="slide-in-bottom"
                    >
                      <DialogTrigger
                        asChild
                        onClick={() => handleWsDelete(ws.workspaceSeq)}
                      >
                        <Button
                          bg="purple.100" // 검은 배경
                          color="black" // 텍스트 색상
                          border="1.5px solid" // 테두리 두께
                          borderColor="purple.500" // 보라색 테두리
                          borderRadius={13} // 모서리 둥글게
                          _hover={{ bg: "purple.700" }} // 호버 효과
                          _active={{ bg: "purple.800" }} // 클릭 효과
                          paddingX="4"
                          paddingY="2"
                          width="60px"
                          height="40px"
                          fontWeight="bold"
                        >
                          삭제
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>워크스페이스 삭제</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                          <p>정말 워크스페이스를 삭제하시겠습니까?</p>
                          <p>삭제된 워크스페이스는 복구가 불가능합니다.</p>
                        </DialogBody>
                        <DialogFooter>
                          <DialogActionTrigger asChild>
                            <Button variant="outline">취소</Button>
                          </DialogActionTrigger>
                          <Button
                            colorPalette="red"
                            onClick={handleWsDeleteApi}
                          >
                            삭제
                          </Button>
                        </DialogFooter>
                        <DialogCloseTrigger />
                      </DialogContent>
                    </DialogRoot>
                  </HStack>
                </Card.Footer>
              </Flex>
            </Box>
          </Card.Root>
        ))}
      </Stack>
    </>
  );
}
