import React, { useState, ChangeEvent } from "react";
import { Box, Button, Input as ChakraInput, Textarea } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import paths from "@/configs/paths";

const Input: React.FC = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const authStorage = localStorage.getItem("auth-storage");
  let artistSeq: number | null = null;

  if (authStorage) {
    try {
      const parsedData = JSON.parse(authStorage);
      artistSeq = parsedData?.state?.artistSeq || null;
    } catch (error) {
      console.error("Failed to parse auth-storage:", error);
    }
  }

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    attachmentFile: null as File | null,
    static: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, files } = e.target as HTMLInputElement;

    if (type === "file" && files) {
      const selectedFile = files[0]; // 첫 번째 파일을 가져옵니다.
      setFormData((prevFormData) => ({
        ...prevFormData,
        attachmentFile: selectedFile, // 파일을 formData의 attachmentFile 상태에 저장
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value, // 텍스트 값 처리
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("jwtToken");

    const formDataToSubmit = new FormData();

    // if (formData.attachmentFile) {
    //     console.log('파일 추가 시도');
    //     formDataToSubmit.append('files', formData.attachmentFile);
    // }

    const boardRequestDto = {
      artistSeq: artistSeq,
      title: formData.title,
      state: "공개",
      content: formData.content,
    };

    formDataToSubmit.append(
      "boardRequestDto",
      new Blob([JSON.stringify(boardRequestDto)], { type: "application/json" })
    );

    if (formData.attachmentFile) {
      console.log("파일 추가 시도");
      formDataToSubmit.append("files", formData.attachmentFile);
      console.log("성공?");
    }
    // if(formData.attachmentFile!=null)
    //     formData.attachmentFile.forEach(file=>formDataToSubmit.append('files', file))

    console.log("formDataToSubmit", formDataToSubmit);
    // console.log('boared', boardRequestDto)

    try {
      // console.log(formDataToSubmit)
      // formDataToSubmit.forEach((value, key) => {
      //     console.log(key, '=>', value);
      // });
      formDataToSubmit.forEach((value, key) => {
        if (value instanceof Blob && value.type === "application/json") {
          const reader = new FileReader();
          reader.onload = () => {
            const jsonContent = reader.result;
            console.log(key, "=>", jsonContent); // JSON 내용 출력
          };
          reader.readAsText(value); // Blob을 텍스트로 읽기
        } else {
          console.log(key, "=>", value); // 파일이나 일반 텍스트일 경우 그대로 출력
        }
      });
      const response = await axios.post(
        `${API_URL}/api/boards`,
        formDataToSubmit,
        // boardRequestDto,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      navigate(paths.community.myCommunity);
    } catch (error) {
      console.error("Error while submitting form:", error);
    }
  };

  return (
    <Box width="100%" maxW="md" mx="auto">
      <form onSubmit={handleSubmit}>
        <Box mb={4}>
          <label>제목</label>
          <ChakraInput
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력해주세요."
            size="lg"
          />
        </Box>

        <Box mb={4}>
          <label>내용</label>
          <Textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="내용을 입력해주세요."
            size="lg"
            resize="vertical"
          />
        </Box>

        <Box mb={4}>
          <label>파일 첨부</label>
          <ChakraInput
            type="file"
            name="attachmentFile" // name을 attachmentFile로 수정
            onChange={handleChange}
            accept="audio/*, image/*"
          />
        </Box>

        <Button
          type="submit"
          border="solid 2px #9000FF"
          borderRadius="15px"
          height="30px"
          width="auto"
        >
          제출
        </Button>
      </form>
    </Box>
  );
};

export default Input;
