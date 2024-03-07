"use client";

// import NewFieldModal from "@/components/NewFieldModal";
import { useEffect } from "react";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import useEditForm from "@/hooks/useEditForm";
import useNewFieldModal from "@/hooks/useNewFieldModal";
import { FaPlus } from "react-icons/fa";
import { FormFieldInstance, FormFields } from "@/components/FormFields/Field";
import { idGenerator } from "../../../../../../utils";

const PageContent: React.FC = () => {
  const newFieldModal = useNewFieldModal();
  const {
    activePage: activePageId,
    pages,
    setFields,
    addField,
    fields,
    setActiveField,
    activeField,
  } = useEditForm();
  const activePage = pages.find((page) => page.id === activePageId);

  const onAddFieldHandler = async () => {
    addField({
      id: idGenerator(),
      type: "Input",
      orderIndex: 0,
      extraProps: {
        label: "First Name",
        placeholder: "John",
        description: "Enter your first name",
        required: true,
      },
    });
  };

  useEffect(() => {
    if (activePage) {
      const fields = activePage.fields
        ? (JSON.parse(activePage.fields) as FormFieldInstance[])
        : [];
      setFields(fields);
    }
  }, [activePage]);

  return (
    <div className="w-full h-full p-10 relative">
      <div className="border border-gray-400 border-dashed rounded-lg w-full max-w-3xl mx-auto min-h-full bg-white p-10 flex flex-col gap-3">
        {fields.map((field) => {
          const DesignComponent = FormFields[field.type].designComponent;
          return (
            <DesignComponent
              onClick={() => setActiveField(field)}
              isActive={field.id === activeField?.id}
              fieldInstance={field}
              key={field.id}
            />
          );
        })}
      </div>
      <TooltipWrapper message="Add a new field">
        <Button
          onClick={onAddFieldHandler}
          className="rounded-full absolute bottom-5 right-5 w-14 h-14"
          size="icon"
        >
          <FaPlus />
        </Button>
      </TooltipWrapper>
    </div>
  );
};

export default PageContent;
