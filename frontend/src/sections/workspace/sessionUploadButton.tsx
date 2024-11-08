import { useState } from "react";
import axios from "axios";
import { Button, Text } from "@chakra-ui/react";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "@/components/ui/file-button";
import { HiUpload } from "react-icons/hi";
import { toaster } from "@/components/ui/toaster";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SessionUploadButton({ artistSeq, onWorkspaceCreated }) {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState({
    file: "", // 파일 업로드 오류 메시지
  });
  const API_URL = import.meta.env.VITE_API_URL;

  const handleFileChange = (fileList: File[]) => {
    //   setFiles(fileList);
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     file: "", // 파일 선택 시 오류 메시지 초기화
    //   }));
    // };
    // 유효성 검사: 파일의 MIME 타입이 audio인지 확인
    const validFiles = fileList.filter((file) => file.type.startsWith("audio"));
    if (validFiles.length !== fileList.length) {
      setErrors({ file: "오직 음원 파일만 업로드 가능합니다." });
    } else {
      setErrors({ file: "" });
    }
    setFiles(validFiles);
  };

  const handleCreateSession = async () => {
    if (files.length === 0) {
      setErrors({ file: "파일을 업로드해주세요." });
      return;
    }

    const formData = new FormData();
    formData.append("session", files[0]); // 첫 번째 파일만 업로드

    try {
      const storedToken = localStorage.getItem("jwtToken");
      const response = await axios.post(
        `${API_URL}/api/workspaces/${artistSeq}/session`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      toaster.create({
        description: "세션이 성공적으로 추가되었습니다.",
        type: "success",
      });

      onWorkspaceCreated(); // 세션 추가 후 목록을 다시 로드
    } catch (error) {
      console.error("Error adding session:", error);
      toaster.create({
        description: "세션 추가에 실패했습니다.",
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
          color="white"
        >
          세션 추가
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
            세션 추가
          </PopoverTitle>
          <FileUploadRoot onFileChange={handleFileChange}>
            <FileUploadTrigger asChild>
              <Button variant="outline" size="sm">
                <HiUpload /> 파일 업로드
              </Button>
            </FileUploadTrigger>
            <FileUploadList />
          </FileUploadRoot>
          {errors.file && (
            <Text color="red.500" fontSize="xs">
              {errors.file}
            </Text>
          )}
          <Button
            size="sm"
            variant="outline"
            fontFamily="MiceGothic"
            fontSize={11}
            mt={4}
            onClick={handleCreateSession}
          >
            추가하기
          </Button>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}
