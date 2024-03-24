"use client";

// import NewFieldModal from "@/components/NewFieldModal";
import { useEffect, useMemo, useRef, useState } from "react";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import useEditForm from "@/hooks/useEditForm";
import useNewFieldModal from "@/hooks/useNewFieldModal";
import { FaPlus } from "react-icons/fa";
import { FormFieldInstance, FormFields } from "@/components/FormFields/Field";
import { idGenerator } from "../../../../../../utils";
import { updatePage } from "@/app/actions/pages";
import ConfirmDialog from "@/components/ConfirmDialog";

const PageContent: React.FC = () => {
  // const newFieldModal = useNewFieldModal();
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<string | null>(null);

  const prevFields = useRef<FormFieldInstance[]>([]);
  const {
    activePage: activePageId,
    pages,
    setFields,
    addField,
    removeField,
    fields,
    setActiveField,
    activeField,
    setPages,
  } = useEditForm();

  const activePage = pages.find((page) => page.id === activePageId);

  const onAddFieldHandler = async () => {
    const newField = {
      id: idGenerator(),
      type: "Input",
      orderIndex: 0,
      extraProps: {
        label: "First Name",
        placeholder: "John",
        description: "Enter your first name",
        required: true,
      },
    };

    addField(newField as FormFieldInstance);
  };

  const onDelteFieldHandler = (id: string) => {
    setFieldToDelete(id);
    setShowConfirm(true);
  };

  const deleteField = async () => {
    if (!fieldToDelete) return;
    removeField(fieldToDelete);
    setActiveField(null);
    setFieldToDelete(null);
    setShowConfirm(false);
  };

  useEffect(() => {
    if (activePage) {
      const fieldsRes = activePage.fields
        ? (JSON.parse(activePage.fields) as FormFieldInstance[])
        : [];
      setFields(fieldsRes);
    }
  }, [activePage]);

  useEffect(() => {
    if (fields.length === 0) return;
    if (prevFields.current.length !== fields.length) {
      // console.log("field added or removed, update db");
      updatePage(activePageId, {
        fields: JSON.stringify(fields),
      });
      prevFields.current = [...fields];
    }
  }, [fields]);

  return (
    <div className="w-full h-full p-10 relative">
      <div className="border border-gray-400 border-dashed rounded-lg w-full max-w-3xl mx-auto min-h-full bg-white p-10 flex flex-col gap-3">
        {fields.map((field) => {
          const DesignComponent = FormFields[field.type].designComponent;
          return (
            <DesignComponent
              onClick={() => setActiveField(field)}
              onDelete={() => onDelteFieldHandler(field.id)}
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

      <ConfirmDialog
        message="Are you sure you want to delete this field?"
        isOpen={showConfirm}
        onConfirm={deleteField}
        onCancel={() => {
          setShowConfirm(false);
        }}
      />
    </div>
  );
};

export default PageContent;
