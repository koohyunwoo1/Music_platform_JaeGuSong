import { create } from 'zustand';

interface UserInfoProps {
    seq: number;
    email: string;
    name: string;
    gender: string;
    birth: string;
    nickname: string;
    position: string;
    region: number;
    crews?: any[];
    profileImage?: File | string | null;
}

const useAuthStore = create<{
    userInfo: UserInfoProps | null;
    setUserInfo: (info: UserInfoProps) => void;
}>((set) => ({
    userInfo: null,
    setUserInfo: (info: UserInfoProps) => set({ userInfo: info})
}));

export default useAuthStore;