import { create } from "zustand";

interface FormSubtmiState {
  values: Record<string, string>;
  setValues: (payload: Record<string, string>) => void;
}

const useSubmitForm = create<FormSubtmiState>((set) => ({
  values: {},
  setValues: (payload: Record<string, string>) => set({ values: payload }),
}));

export default useSubmitForm;
