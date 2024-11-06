import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { CreateArticleData, CreateArticleFields } from '@/configs/community/createArticleForm';
import { Box, Button, Input as ChakraInput, Textarea } from '@chakra-ui/react';

const Input: React.FC = () => {
    const [previewFile, setPreviewFile] = useState<string | null>(null);
    const API_URL = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState<CreateArticleData>({
        title: '',
        content: '',
        attachmentFile: '',
        static: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;

        if (name === 'Images' && files) {
            const file = files[0];
            setFormData((prevFormData) => ({ ...prevFormData, Images: file }));
            const previewUrl = URL.createObjectURL(file);
            setPreviewFile(previewUrl);
        } else {
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const storedToken = localStorage.getItem('jwtToken');
    
        const formDataToSubmit = new FormData();
    
        // title이 비어있지 않으면 formDataToSubmit에 추가
        if (formData.title) {
            formDataToSubmit.append("title", formData.title);
        }
        // static이 비어있지 않으면 formDataToSubmit에 추가 (PUBLIC 또는 PRIVATE 값으로 변환)
        if (formData.static) {
            formDataToSubmit.append("state", formData.static === '공개' ? 'PUBLIC' : 'PRIVATE');
        }
        // content가 비어있지 않으면 formDataToSubmit에 추가
        if (formData.content) {
            formDataToSubmit.append("content", formData.content);
        }
        // attachmentFile이 File 인스턴스인지 확인 후 추가
        if (formData.attachmentFile instanceof File) {
            formDataToSubmit.append("attachmentFile", formData.attachmentFile);
        }
    
        try {
            console.log('토큰:', storedToken);
            console.log('띠용', formDataToSubmit);
            const response = await axios.post(
                `${API_URL}/api/boards`,
                formDataToSubmit,
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error('게시물 작성 중 오류 발생:', error);
        }
    };
    
    

    return (
        <Box width="100%" maxW="md" mx="auto">
            <form onSubmit={handleSubmit}>
                {CreateArticleFields.map((field, index) => (
                    <Box key={index} mb={4}>
                        <label>{field.label}</label>
                        {field.type === 'select' ? (
                            <select
                                name={field.name}
                                onChange={handleChange}
                                value={field.name !== 'Images' ? (formData[field.name as keyof CreateArticleData] as string || '') : undefined}
                                style={{ color: 'black' }}
                            >
                                <option value='' style={{ color: 'black' }}>선택</option>
                                {field.options?.map((option, idx) => (
                                    <option key={idx} value={option} style={{ color: 'black' }}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === 'textarea' ? (
                            <Textarea
                                name={field.name}
                                value={formData[field.name as keyof CreateArticleData] as string || ''}
                                onChange={handleChange}
                                placeholder={field.name === 'content' ? '내용을 입력해주세요' : ''}
                                color="white"
                                size="lg"
                                resize="vertical"
                                height="180px" 
                            />
                        ) : (
                            <ChakraInput
                                type={field.type}
                                name={field.name}
                                value={field.name !== 'Images' ? (formData[field.name as keyof CreateArticleData] as string || '') : undefined}
                                onChange={handleChange}
                                placeholder={field.name === 'title' ? '제목을 입력해주세요.' : ''}
                                accept={field.type === 'file' ? 'image/*' : undefined}
                                size="lg"
                            />
                        )}
                    </Box>
                ))}
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
