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
import { useEffect } from "react";
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
  formComponent: formComponent,
  propertiesComponent: ProperitesComponent,
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

  return <div>{label && <Label>{label}</Label>}</div>;
}

type propertiesFormSchemaType = z.infer<typeof properitesSchema>;
function ProperitesComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const element = fieldInstance as CustomFormFieldInstance;
  const { updateField, fields, activePage } = useEditForm();

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
            extraProps: form.getValues(),
          };
        }
        return f;
      });
      await updatePage(activePage, {
        fields: JSON.stringify(newFields),
      });
    },
    1000,
    [form.watch()],
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
