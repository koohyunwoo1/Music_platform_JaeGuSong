import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { SigninFormData, SigninInputFields } from '@/configs/auth/formInputDatas';
import { Box, Button, Input as ChakraInput } from '@chakra-ui/react';
import paths from '@/configs/paths';
import axios, { AxiosError, AxiosResponse} from 'axios';
import UseSingnin from '@/hooks/auth/useSignin';

const Input: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [ formData, setFormData] = useState<SigninFormData>({
    userId: '',
    password: ''
  });
  const {
    setSignined
  } = UseSingnin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value}))
  };

  // dto 정보 받는 api 요청
  const handleResponseDto = async (response: AxiosResponse) => {
    try {
      const accessToken = response.headers['authorization'];
    const dtoResponse = await axios.get(
        `${API_URL}/api/user`,
      {
        headers: {
          Authorization: `${accessToken}`
        },
        withCredentials: true,
      })
      setSignined(true);
      navigate(paths.community.main)
    } catch(error) {
      console.warn(error)
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSubmit.append(key, value instanceof File ? value : String(value));
    })

    // 백한테 로그인 정보 보내기
    try {
      console.log('로그인할거야', formData)
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        null,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                email: formData.userId,
                password: formData.password
            },
            // withCredentials: true,
        }
      );
      console.log(response)
      const token = response.headers.authorization.split(' ')[1];
      localStorage.setItem('jwtToken', token);
    await handleResponseDto(response)  
    } catch (error) {
      const axiosError = error as AxiosError;
      console.warn(error)
      console.log('error')
      if (axiosError.response) {
          // 에러 응답이 있을 경우
          console.error('로그인 에러는:', axiosError.response.data);
          console.error('상태 코드:', axiosError.response.status);
      } else if (axiosError.request) {
          // 요청이 서버로 전송되지 않은 경우
          console.error('요청이 서버로 전송되지 않았습니다:', axiosError.request);
      } else {
          // 기타 오류
          console.error('설정 오류:', axiosError.message);
      }
  }
};

    return (
      <Box width="100%" maxW="md" mx="auto">
        <form onSubmit={handleSubmit}>
          {SigninInputFields.map((field, index) => (
            <Box key={index} mb={4}>
              <label>{field.label}</label>
              <ChakraInput
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof SigninFormData] as string || ''}
                onChange={handleChange}
                placeholder={field.name === 'userId' ? '아이디를 입력해주세요' : '비밀번호를 입력해주세요.'}
                style={{ color: 'white' }}
              ></ChakraInput>
            </Box>
          ))}
          <Button type='submit'>로그인</Button>
        </form>
      </Box>
    );
};

export default Input;