import { InputFieldElement } from "./fields/InputField";

export type FieldsType = "Input";

export type SubtmiFunction = (key: string, value: string) => void;

export type FormField = {
  type: FieldsType;

  designComponent: React.FC<{
    fieldInstance: FormFieldInstance;
    onClick?: (val?: any) => void;
    onDelete?: (val?: any) => void;
    isActive?: boolean;
  }>;

  formComponent: React.FC<{
    fieldInstance: FormFieldInstance;
    submitValue?: SubtmiFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;

  propertiesComponent: React.FC<{
    fieldInstance: FormFieldInstance;
  }>;

  validate: (formField: FormFieldInstance, currentVal: string) => boolean;
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
