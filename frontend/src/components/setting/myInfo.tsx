import React, { useEffect, useState } from 'react';
import useMyInfo from '@/hooks/setting/useMyInfo';
import { UserInfo } from '@/hooks/setting/useMyInfo';
import { Input, Box, Button } from '@chakra-ui/react';

const regions = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '제주', '경기도 남부', '경기도 북부', '강원도 남부', '강원도 북부', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도']
const genders = ['남성', '여성', '기타']
const positions = ['보컬', '베이스', '드럼', '일렉트릭기타', '어쿠스틱기타', '건반', '관악기', '현악기', '키보드']
const genres = ['락', '발라드', '인디', '댄스', '클래식', '재즈', '오케스트라', '랩', '기타']

const MyInfo: React.FC<{ myInfo: UserInfo }> = ({ myInfo }) => {
    const { updateMyInfo, handleChange, createOrUpdateMyInfo } = useMyInfo();
    const [modifiedInfo, setModifiedInfo] = useState<UserInfo>(myInfo);


    useEffect(() => {
      setModifiedInfo(myInfo); // 초기 값 설정
  }, [myInfo]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createOrUpdateMyInfo(modifiedInfo); // 변경된 값 포함한 전체 정보 전송
  };


  return (
    <Box>
    {modifiedInfo ? (
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="row" marginTop="20px">
          <div>
            <label>별명</label>
            <Input
              type="text"
              name="nickname"
              placeholder={modifiedInfo.nickname}
              onChange={handleChange}
              color="white"
              width="300px"
              marginLeft="10px"
            />
          </div>
          <Box marginLeft="30px">
            <label>이름</label>
            <Input
              type="text"
              name="name"
              value={modifiedInfo.name}
              onChange={handleChange}
              color="white"
              width="300px"
              disabled
              marginLeft="10px"
            />
          </Box>
        </Box>
        <div style={{ marginTop: "10px"}}>
          <label>아이디</label>
          <Input
            type="email"
            name="email"
            value={modifiedInfo.email}
            onChange={handleChange}
            color="white"
            width="300px"
            marginLeft="10px"
            disabled
          />
        </div>
        <Box 
          display="flex" 
          flexDirection="row" 
          marginTop="10px"
        >
          <Box>
            <Box display="flex" flexDirection="row">
              <label>지역</label>
              <Box
                width="70px"
                marginLeft="10px"
              >
                <select 
                  name='region'
                  value={modifiedInfo.region}
                  onChange={handleChange}
                  style={{ color: 'black', background: 'white', borderColor: 'black', padding: '0.5rem' }}
                >
                  <option>전라남도</option>
                  {regions.map((region, index) => {
                    if (region !== myInfo.region) {
                        return <option key={index} value={region}>{region}</option>;
                    }
                  })}
                </select>
              </Box>
            </Box>
          </Box>
          <Box marginLeft="100px">
            <label>성별</label>
            <select 
              name='gender'
              value={modifiedInfo.gender}
              onChange={handleChange}
              style={{ color: 'black', background: 'white', borderColor: 'black', padding: '0.5rem',  marginLeft:"10px" }}
            >
              <option>남성</option>
              {genders.map((gender, index) => {
                if (gender !== myInfo.region) {
                  return <option key={index} value={gender}>{gender}</option>;
                }
              })}
            </select>
          </Box>
        </Box>      
        <Box display="flex" flexDirection="row" marginTop= "10px">
          <Box>
            <label>포지션</label>
              <select 
                name='position'
                value={modifiedInfo.position}
                onChange={handleChange}
                style={{ color: 'black', background: 'white', borderColor: 'black', padding: '0.5rem',  marginLeft:"10px"}}
              >
                <option>건반</option>
                {positions.map((position, index) => {
                  if (position !== myInfo.region) {
                    return <option key={index} value={position}>{position}</option>;
                  }
                })}
              </select>
            </Box>
            <Box  marginLeft="30px">
              <label>장르</label>
                <select 
                  name='genre'
                  value={modifiedInfo.genre}
                  onChange={handleChange}
                  style={{ color: 'black', background: 'white', borderColor: 'black', padding: '0.5rem',  marginLeft:"10px"}}
                >
                  <option>건반</option>
                  {genres.map((genre, index) => {
                    if (genre !== myInfo.region) {
                      return <option key={index} value={genre}>{genre}</option>;
                    }
                  })}
                </select>
            </Box>
          </Box>

          <div style={{ marginTop: "10px"}}>
            <label>생일</label>
            <Input
              type="date"
              name="birth"
                onChange={handleChange}
                value={modifiedInfo.bitrh}
              background="white"
              color="black"
              width="300px"
              defaultValue={myInfo.bitrh}
                marginLeft="10px"
              />
          </div>

          <div style={{ marginTop: "10px"}}>
            <label>프로필 이미지</label>
            <Input
              type="file"
              name="profileImage"
              marginLeft="10px"
              onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  if (file) {
                      // setFormData(prevData => ({ ...prevData, profileImage: file }));
                      // setChangedFields(prev => ({ ...prev, profileImage: true }));
                  }
              }}
              background="white"
              color="black"
              width="300px"
            />
          </div>
          <Button type="submit">수정</Button>
        </form>
    ) : null}
  </Box>
  );
};

export default MyInfo;