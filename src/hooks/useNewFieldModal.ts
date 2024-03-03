import { create } from "zustand";

interface NewFieldModalState {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useNewFieldModal = create<NewFieldModalState>((set) => ({
  isOpen: true,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export default useNewFieldModal;
