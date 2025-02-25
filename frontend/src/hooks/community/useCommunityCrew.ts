import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import paths from "@/configs/paths";
import axios from "axios";
import { MakeCrewFormData } from "@/configs/community/makeCrew";
import useCrewSeqStore from '@/stores/crewSeqStore';
import useHeaderStore from "@/stores/headerStore";
import { toaster } from "@/components/ui/toaster"

interface WantCrewJoinUser {
    userSeq: number
};


const UseCommunityCrew = () => {
    const [ openCrewFollowModal, setopenCrewFollowModal ] = useState<boolean>(false);
    const [ openCrewJoinModal, setopenCrewJoinModal ] = useState<boolean>(false);
    const [ openCrewWithdrawModal, setopenCrewWithdrawModal ] = useState<boolean>(false);
    const [ openCrewMembersModal, setOpenCrewMembersModal ] = useState<boolean>(false);
    const [ openCrewApproveModal, setOpenCrewApproveModal ] = useState<boolean>(false);
    const [ openMakeCrewModal, setMakeCrewModal ] = useState<boolean>(false);
    const [ crewName, setCrewName ] = useState<string>('');
    const [ crewNameSeq, setCrewNameSeq ] = useState<string>('');
    const [ crewManagerName, setCrewManagerName ] = useState<string>('');
    const [ crewProfileImage, setCrewProfileImage ] = useState<string>('');
    const [ crewMakeDate, setCrewMakeDate ] = useState<string>('');
    const [ crewMembers, setCrewMembers ] = useState<any[]>([]);
    const [ myCrewsSeq, setMyCrewsSeq ] = useState<any[]>([]);
    const [ myName, setMyName ] = useState<string>('');
    const getCrewSeq = useCrewSeqStore((state) => state.getCrewSeqStore);
    const { openUserHeader } = useHeaderStore(state => state);
    const [joinApplyUsers, setJoinApplyUsers] = useState<JoinApplyUserData[]>([]);


    const [ makeCrewFormData, setMakeCrewFormData ] = useState<MakeCrewFormData>({
        birth: new Date().toISOString().split('T')[0],
        nickname: '',
        region: '',
        genre: '',
        content: '',
        profileImage: null as File | null,
    });

    const API_URL =import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const location = useLocation();
    const hasDetailWord = location.pathname.includes('detail');

    const goCrewFollow = async () => {
        setopenCrewFollowModal((prev) => !prev);
        // 팔로우 요청 api 연결
        // const response = await axios.post(

        // )
    };
    
    const goJoinCrew = async () => {
        setopenCrewJoinModal((prev) => !prev);
        // 크루 가입 요청 api 연결
        const storedToken = localStorage.getItem('jwtToken');
        // 예시
        const crewSeq =  id
        try {
            const response = await axios.post(
                `${API_URL}/api/crew/join`,
                {
                    "crewSeq": crewSeq,
                },
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                }
            )
            toaster.create({
                description: "가입 신청이 완료되었습니다.",
                type: "info"
            })
        } catch(error) {
            console.warn(error)
        }
    };

    const handleCrewApproveModal = async ({ userSeq }: WantCrewJoinUser): Promise<void> => {
        // 크루장이 가입 요청 승인
        const storedToken = localStorage.getItem('jwtToken');
        try {
            const response = await axios.patch(
                `${API_URL}/api/crew/accept`,
                {
                    "userSeq": userSeq,
                    "crewSeq": id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    },
                }
            )
            setJoinApplyUsers((prev) =>
                prev.filter((user) => user.seq !== userSeq) // 거절된 사용자를 목록에서 제거
            );
            toaster.create({
                description: "가입 신청을 승인했습니다.",
                type: "info"
            })
        } catch(error) {
            console.warn(error)
        }
    };

    const handleCrewDeclineModal = async ({ userSeq }: WantCrewJoinUser): Promise<void> => {
        // 크루장이 가입 요청 거절
        const storedToken = localStorage.getItem('jwtToken');

        try {
            const response = await axios.delete(
                `${API_URL}/api/crew/decline`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                    data: {
                        "userSeq": userSeq,
                        "crewSeq": id,
                    },
                })
            setJoinApplyUsers((prev) =>
                prev.filter((user) => user.seq !== userSeq) // 거절된 사용자를 목록에서 제거
            );
            toaster.create({
                description: "가입 신청을 거절습니다.",
                type: "error"
            })
        } catch(error) {
            console.warn(error);
        }
    };
    const goWithdrawCrew = async () => {
        setopenCrewWithdrawModal((prev) => !prev);
        const storedToken = localStorage.getItem('jwtToken');
        // 크루 탈퇴 api 연결
        try {
            const response = await axios.delete(
                `${API_URL}/api/crew/leave`,
                {
                    data: {
                        "crewSeq" : crewNameSeq,
                    },
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    },
                }
            )
            toaster.create({
                description: "크루를 탈퇴했습니다.",
                type: "error"
            })
            navigate(paths.community.main)
        } catch(error) {
            console.warn(error)
        }
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
            setMakeCrewModal((prev) => !prev);
        } catch(error) {
            console.warn(error)
        }
    };

    const getCrewInfo = async () => {
        const storedToken = localStorage.getItem('jwtToken');
        let crewSeq = 0;
        // 임시

        if ( id === undefined ) {
            crewSeq = getCrewSeq;
        } else {
            if (hasDetailWord) {
                crewSeq = getCrewSeq
            } else {
            crewSeq =  parseInt(id)
            }    
        }
        try {
          const response = await axios.get(
              `${API_URL}/api/crew/${crewSeq}`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`
              },
            })
            setCrewNameSeq(response.data.crewSeq)
            setCrewName(response.data.nickname)
            setCrewManagerName(response.data.manager.nickname)
            setCrewMakeDate(response.data.birth)
            setCrewMembers(response.data.crews)
            setCrewProfileImage(response.data.profileImage)
          } catch(error) {
            console.warn(error)
          }
    }

    const preGetCrewInfo = async () => {
        const storedToken = localStorage.getItem('jwtToken');
        try {
          const response = await axios.get(
              `${API_URL}/api/user`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`
              },
            })
            setMyCrewsSeq(response.data.crews)
            setMyName(response.data.nickname)
        } catch(error) {
            console.warn(error)
        }
        getCrewInfo()
    }
    

    return {
        openCrewFollowModal,
        openCrewJoinModal,
        openCrewWithdrawModal,
        openCrewMembersModal,
        openMakeCrewModal,
        openCrewApproveModal,
        makeCrewFormData,
        crewNameSeq,
        crewName,
        crewManagerName,
        crewProfileImage,
        crewMakeDate,
        crewMembers,
        myCrewsSeq,
        myName,
        joinApplyUsers,
        goCrewFollow,
        goJoinCrew,
        goWithdrawCrew,
        setopenCrewFollowModal,
        setopenCrewJoinModal,
        setopenCrewWithdrawModal,
        setOpenCrewApproveModal,
        handleCrewFollowModal,
        handleCrewJoinModal,
        handleCrewApproveModal,
        handleCrewDeclineModal,
        handleCrewWithdrawModal,
        handleCrewMembers,
        handleMakeCrewModal,
        handleChange,
        makeCrew,
        setMakeCrewFormData,
        preGetCrewInfo,
        getCrewInfo,
        setJoinApplyUsers,
    }
};

export default UseCommunityCrew;