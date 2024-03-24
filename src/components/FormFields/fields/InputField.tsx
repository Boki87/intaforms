import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  FieldsType,
  FormField as TFormField,
  FormFieldInstance,
} from "../Field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useEditForm from "@/hooks/useEditForm";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";
import { updatePage } from "@/app/actions/pages";
import { MdDragIndicator } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";

const type: FieldsType = "Input";

const extraProps = {
  label: "Input Field",
  description: "Description",
  required: false,
  placeholder: "Placeholder",
};

const properitesSchema = z.object({
  label: z.string().min(2).max(50),
  description: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
});

export const InputFieldElement: TFormField = {
  type,
  designComponent: DesignComponent,
  formComponent: FormComponent,
  propertiesComponent: ProperitesComponent,
  validate: (formField: FormFieldInstance, currentVal: string): boolean => {
    const element = formField as CustomFormFieldInstance;
    if (element.extraProps.required) {
      // if required check if length is greater than 0
      return currentVal?.length > 0;
    }
    // if not required, return true for any value
    return true;
  },
};

type CustomFormFieldInstance = FormFieldInstance & {
  extraProps: typeof extraProps;
};

function DesignComponent({
  fieldInstance,
  onClick,
  onDelete,
  isActive,
}: {
  fieldInstance: FormFieldInstance;
  onClick?: () => void;
  onDelete?: () => void;
  isActive?: boolean;
}) {
  const element = fieldInstance as CustomFormFieldInstance;

  const { label, description, required, placeholder } = element.extraProps;

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-5 rounded-lg hover:bg-gray-50 cursor-pointer flex gap-2",
        isActive ? "bg-gray-50 ring-2 ring-black ring-offset-2" : null,
      )}
    >
      <div>
        <div className="p-2">
          <MdDragIndicator />
        </div>
      </div>
      <div className="flex-grow relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-3 right-0 text-gray-600"
          onClick={onDelete}
        >
          <FaTrash />
        </Button>

        <Label>
          {label} {required && "*"}
        </Label>
        {description && <p className="text-sm text-gray-500">{description}</p>}
        <Input readOnly disabled placeholder={placeholder} />
      </div>
    </div>
  );
}

function FormComponent({
  fieldInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  fieldInstance: FormFieldInstance;
  submitValue?: (key: string, value: string) => void;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = fieldInstance as CustomFormFieldInstance;
  const { label, description, required, placeholder } = element.extraProps;

  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Input
        className={cn(error && "border-red-500")}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = InputFieldElement.validate(element, e.target.value);
          setError(!valid);
          // if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
        value={value}
      />
      {description && (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            error && "text-red-500",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof properitesSchema>;
function ProperitesComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const element = fieldInstance as CustomFormFieldInstance;
  const { updateField, fields, activePage } = useEditForm();

  const [trackedProps, setTrackedProps] = useState({ ...element.extraProps });

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(properitesSchema),
    mode: "onChange",
    defaultValues: {
      label: element.extraProps.label,
      description: element.extraProps.description,
      required: element.extraProps.required,
      placeholder: element.extraProps.placeholder,
    },
  });

  function applyChanges(values: propertiesFormSchemaType) {
    updateField(element.id, {
      ...element,
      extraProps: values,
    });

    setTrackedProps(values);
  }

  useEffect(() => {
    form.reset(element.extraProps);
  }, [element]);

  useDebounceEffect(
    async () => {
      const newFields = fields.map((f) => {
        if (f.id === element.id) {
          return {
            ...f,
            extraProps: trackedProps,
          };
        }
        return f;
      });
      await updatePage(activePage, {
        fields: JSON.stringify(newFields),
      });
    },
    1000,

    [trackedProps],
  );

  return (
    <div className="p-5">
      <Form {...form}>
        <form
          onChange={form.handleSubmit(applyChanges)}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.currentTarget.blur();
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    The label of the field. <br /> It will be displayed above
                    the field
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.currentTarget.blur();
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    The description of the field. <br /> It will be displayed
                    below the label
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placeholder</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.currentTarget.blur();
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    The placeholder of the field. <br /> It will be displayed
                    inside the input
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="required"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel>Is Required</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Is this field required to be filled out?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
