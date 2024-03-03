import { create } from "zustand";

interface FormRenameState {
  isOpen: boolean;
  formId: number | null;
  formName?: string;
  onClose: () => void;
  onOpen: ({ id, name }: { id: number; name: string }) => void;
}

const useFormRenameModal = create<FormRenameState>((set) => ({
  isOpen: false,
  formId: null,
  formName: "",
  onClose: () => set({ isOpen: false, formId: null, formName: "" }),
  onOpen: ({ id, name }: { id: number; name: string }) =>
    set({ isOpen: true, formId: id, formName: name }),
}));

export default useFormRenameModal;
