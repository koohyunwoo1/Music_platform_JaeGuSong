import { create } from "zustand";

interface HeaderState {
    openUserHeader: boolean;
    setOpenUserHeader: () => void; 
}


const useHeaderStore = create<HeaderState>((set) => ({
    openUserHeader: false,
    setOpenUserHeader: () => set(state => ({ openUserHeader: !state.openUserHeader })),
}));

export default useHeaderStore;
