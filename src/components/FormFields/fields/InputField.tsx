import { Label } from "@/components/ui/label";
import { FieldsType, FormField, FormFieldInstance } from "../Field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const type: FieldsType = "Input";

const extraProps = {
  label: "Input Field",
  description: "Description",
  required: false,
  placeholder: "Placeholder",
};

export const InputFieldElement: FormField = {
  type,
  designComponent: DesignComponent,
  formComponent: formComponent,
  propertiesComponent: () => null,
};

type CustomFormFieldInstance = FormFieldInstance & {
  extraProps: typeof extraProps;
};

function DesignComponent({
  fieldInstance,
  onClick,
  isActive,
}: {
  fieldInstance: FormFieldInstance;
  onClick?: () => void;
  isActive?: boolean;
}) {
  const element = fieldInstance as CustomFormFieldInstance;

  const { label, description, required, placeholder } = element.extraProps;

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-5 rounded-lg hover:bg-gray-50 cursor-pointer",
        isActive ? "bg-gray-50 ring-2 ring-black ring-offset-2" : null,
      )}
    >
      <Label>
        {label} {required && "*"}
      </Label>
      {description && <p className="text-sm text-gray-500">{description}</p>}
      <Input readOnly disabled placeholder={placeholder} />
    </div>
  );
}

function formComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const element = fieldInstance as CustomFormFieldInstance;
  const { label, description, required, placeholder } = element.extraProps;

  return <div></div>;
}
