import { create } from "zustand";
import { TForm } from "../../db/schema";

interface FormState {
  form: TForm | null;
  setFormData: (data: TForm) => void;
}

const useFormState = create<FormState>((set) => ({
  form: null,
  setFormData: (payload: TForm) => set({ form: payload }),
}));

export default useFormState;
