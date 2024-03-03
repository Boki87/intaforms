import { create } from "zustand";

interface NewFormModalState {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useNewFormModal = create<NewFormModalState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export default useNewFormModal;
