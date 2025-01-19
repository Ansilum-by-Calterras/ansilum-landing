import { create } from "zustand";

interface ToggleStore {
    isOpen: boolean;
    setIsOpen: (open: boolean | false) => void;
}

export const useToggleStore = create<ToggleStore>((set) => ({
    isOpen: false,
    setIsOpen: (open: boolean | false) => {
        set({ isOpen: open });
    },
}));
