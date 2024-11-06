import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { MakeCrewFormData } from "@/configs/community/makeCrew";


const UseCommunityCrew = () => {
    const [ isCrewFollow, setIsCrewFollow ] = useState<boolean>(false);
    const [ isjoinCrew, setIsJoinCrew ] = useState<boolean>(false);
    const [ withdrawCrew, setWithDrawCrew ] = useState<boolean>(false);
    const [ openCrewFollowModal, setopenCrewFollowModal ] = useState<boolean>(false);
    const [ openCrewJoinModal, setopenCrewJoinModal ] = useState<boolean>(false);
    const [ openCrewWithdrawModal, setopenCrewWithdrawModal ] = useState<boolean>(false);
    const [ openCrewMembersModal, setOpenCrewMembersModal ] = useState<boolean>(false);
    const [ openMakeCrewModal, setMakeCrewModal ] = useState<boolean>(false);

    const [ makeCrewFormData, setMakeCrewFormData ] = useState<MakeCrewFormData>({
        birth: new Date().toISOString().split('T')[0],
        nickname: '',
        region: '',
        genre: '',
        content: '',
        profileImage: null as File | null,
    });
    const [file, setFile] = useState<File | null>(null);

    const API_URL =import.meta.env.VITE_API_URL;

    const goCrewFollow = async () => {
        setopenCrewFollowModal((prev) => !prev);
        // 팔로우 요청 api 연결
        // const response = await axios.post(

        // )
    };
    
    const goJoinCrew = async () => {
        setopenCrewJoinModal((prev) => !prev);
        // 크루 가입 요청 api 연결
        // try {
        //     const response = await axios.post(
        //         `${API_URL}/api/crew`,
        //         {
        //             "crewSeq": crewSeq,
        //         },
        //         {
        //             headers: {
        //                 access: `${token}`
        //             }
        //         }
        //     )
        // } catch(error) {
        //     console.warn(error)
        // }
    };
    
    const goWithdrawCrew = () => {
        setopenCrewWithdrawModal((prev) => !prev);
        // 크루 탈퇴 api 연결
        // try {
        //     const response = await axios.delete(
        //         `${API_URL}/api/crew/leave`,
        //         {
        //             "phone": phone,
        //         },
        //         {
        //             headers: {
        //                 access: `${token}`
        //             }
        //         }
        //     )
        // } catch(error) {
        //     console.warn(error)
        // }
    };
    
    const handleCrewFollowModal = () => {
        setopenCrewFollowModal((prev) => !prev)
    };

    const handleCrewJoinModal = () => {
        setopenCrewJoinModal((prev) => !prev)
    };

    const handleCrewWithdrawModal = () => {
        setopenCrewWithdrawModal((prev) => !prev)
    };

    const handleCrewMembers = () => {
        setOpenCrewMembersModal((prev) => !prev);
    }
    
    useEffect(() => {

    }, [openCrewMembersModal])

    const handleMakeCrewModal = () => {
        setMakeCrewModal((prev) => !prev);
    }
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMakeCrewFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
        
    const makeCrew = async (makeCrewFormData: MakeCrewFormData) => {
        const storedToken = localStorage.getItem('jwtToken');
        console.log('formdata 확인', makeCrewFormData)
        
        const formData = new FormData();

        const createDto = {
            birth: makeCrewFormData.birth,
            nickname: makeCrewFormData.nickname,
            region: makeCrewFormData.region,
            genre: makeCrewFormData.genre,
            content: makeCrewFormData.content
        };

        formData.append(
            "createDto",
            new Blob([JSON.stringify(createDto)], { type: "application/json", })
        );

        if (makeCrewFormData.profileImage) {
            formData.append("profile", makeCrewFormData.profileImage);
        }
     

        try {
            console.log('formData', formData)
            const response = await axios.post(
                `${API_URL}/api/crew`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            console.log('크루생성완료')
            setMakeCrewModal((prev) => !prev);
        } catch(error) {
            console.warn(error)
        }
    };

    const getCrewInfo = async () => {
        const storedToken = localStorage.getItem('jwtToken');
        console.log('으아앙악', storedToken)
        try {
          const response = await axios.get(
              `${API_URL}/api/user`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`
              },
              withCredentials: true,
            })
            console.log(response.data)
          } catch(error) {
            console.warn(error)
          }

    }
    

    return {
        isCrewFollow,
        isjoinCrew,
        withdrawCrew,
        openCrewFollowModal,
        openCrewJoinModal,
        openCrewWithdrawModal,
        openCrewMembersModal,
        openMakeCrewModal,
        makeCrewFormData,
        goCrewFollow,
        goJoinCrew,
        goWithdrawCrew,
        setopenCrewFollowModal,
        setopenCrewJoinModal,
        setopenCrewWithdrawModal,
        handleCrewFollowModal,
        handleCrewJoinModal,
        handleCrewWithdrawModal,
        handleCrewMembers,
        handleMakeCrewModal,
        handleChange,
        makeCrew,
        setMakeCrewFormData,
        getCrewInfo
        
    }
}

export default UseCommunityCrew;