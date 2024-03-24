import { create } from "zustand";
import { TPage } from "../../db/schema/pages";
import { FormFieldInstance } from "../components/FormFields/Field";

interface FormEditState {
  pages: TPage[];
  setPages: (data: TPage[]) => void;
  activePage: number;
  setActivePage: (payload: number) => void;
  fields: FormFieldInstance[];
  setFields: (payload: FormFieldInstance[]) => void;
  activeField: FormFieldInstance | null;
  setActiveField: (payload: FormFieldInstance | null) => void;
  addField: (payload: FormFieldInstance) => void;
  updateField: (id: string, payload: FormFieldInstance) => void;
  removeField: (id: string) => void;
}

const useEditForm = create<FormEditState>((set) => ({
  pages: [],
  setPages: (payload: TPage[]) => set({ pages: payload }),
  activePage: 0,
  setActivePage: (payload: number) => set({ activePage: payload }),
  fields: [],
  setFields: (payload: FormFieldInstance[]) => set({ fields: payload }),
  activeField: null,
  setActiveField: (payload: FormFieldInstance | null) =>
    set({ activeField: payload }),
  addField: (payload: FormFieldInstance) => {
    set((state) => {
      const newFields = [...state.fields, payload];
      const newPages = [...useEditForm.getState().pages];
      newPages.forEach((page) => {
        if (page.id === state.activePage) {
          page.fields = JSON.stringify(newFields);
        }
      });
      return { fields: newFields, pages: newPages };
    });
  },
  updateField: (id: string, payload: FormFieldInstance) => {
    set((state) => {
      const newFields = state.fields.map((field) => {
        if (field.id === id) {
          return payload;
        }
        return field;
      });

      const newPages = [...useEditForm.getState().pages];
      newPages.forEach((page) => {
        if (page.id === state.activePage) {
          page.fields = JSON.stringify(newFields);
        }
      });

      return { fields: newFields };
    });
  },
  removeField: (id: string) => {
    set((state) => {
      const newFields = state.fields.filter((field) => field.id !== id);
      const newPages = [...useEditForm.getState().pages];
      newPages.forEach((page) => {
        if (page.id === state.activePage) {
          page.fields = JSON.stringify(newFields);
        }
      });
      return { fields: newFields, pages: newPages };
    });
  },
}));

export default useEditForm;
