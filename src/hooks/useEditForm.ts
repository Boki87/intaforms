import { create } from "zustand";
import { TPage, TPageWithFields } from "../../db/schema/pages";
import { TFormField } from "../../db/schema";

interface FormEditState {
  pages: TPageWithFields[];
  setPages: (data: TPageWithFields[]) => void;
  activePage: number;
  setActivePage: (payload: number) => void;
  fields: TFormField[];
}

const useEditForm = create<FormEditState>((set) => ({
  pages: [],
  setPages: (payload: TPageWithFields[]) => set({ pages: payload }),
  activePage: 0,
  setActivePage: (payload: number) => set({ activePage: payload }),
  fields: [],
}));

export default useEditForm;
