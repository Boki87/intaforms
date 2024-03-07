import { InputFieldElement } from "./fields/InputField";

export type FieldsType = "Input";

export type FormField = {
  type: FieldsType;

  designComponent: React.FC<{
    fieldInstance: FormFieldInstance;
    onClick?: (val?: any) => void;
    isActive?: boolean;
  }>;

  formComponent: React.FC<{
    fieldInstance: FormFieldInstance;
    submitValue: (value: any) => void;
  }>;

  propertiesComponent: React.FC<{
    fieldInstance: FormFieldInstance;
  }>;
};

export type FormFieldInstance = {
  id: string;
  type: FieldsType;
  orderIndex: number;
  extraProps: Record<string, any>;
};

type FormFieldType = {
  [key in FieldsType]: FormField;
};

export const FormFields: FormFieldType = {
  Input: InputFieldElement,
};
