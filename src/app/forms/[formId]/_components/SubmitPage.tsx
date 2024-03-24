"use client";

import { FormFieldInstance, FormFields } from "@/components/FormFields/Field";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useSubmitForm from "@/hooks/useSubmitForm";
import { useCallback, useEffect, useState } from "react";

type Props = {
  title: string;
  fields: FormFieldInstance[];
  onPrev?: () => void;
  onNext?: () => void;
  onFinish?: () => void;
};

const SubmitPage: React.FC<Props> = ({
  title,
  fields,
  onPrev,
  onNext,
  onFinish,
}) => {
  const [fieldsState, setFieldsState] = useState<FormFieldInstance[]>([]);

  const submitForm = useSubmitForm();
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const onSubmitHandler = useCallback(() => {
    let isValidFlag = true;
    for (const field of fieldsState) {
      const actualValue = submitForm.values[field.id];
      const isValid = FormFields[field.type].validate(field, actualValue);
      if (!isValid) {
        setFieldErrors((prev) => ({ ...prev, [field.id]: true }));
        isValidFlag = false;
      }
    }
    if (!isValidFlag) return;
    onNext?.();
  }, [submitForm.values, fieldsState, onNext]);

  const onSubmiValueHandler = (key: string, value: string) => {
    submitForm.setValues({ ...submitForm.values, [key]: value });
  };

  const validateForm = () => {
    for (const field of fieldsState) {
      const actualValue = submitForm.values[field.id];
      const isValid = FormFields[field.type].validate(field, actualValue);
      if (!isValid) {
        setFieldErrors((prev) => ({ ...prev, [field.id]: true }));
      }
      if (Object.keys(fieldErrors).length > 0) {
        return false;
      }
      return true;
    }
  };

  useEffect(() => {
    setFieldsState(fields);
    setFieldErrors({});
  }, [fields]);

  return (
    <div>
      Page: {title} <br />
      {fieldsState.map((field) => {
        const FieldFormComponent = FormFields[field.type].formComponent;

        return (
          <FieldFormComponent
            fieldInstance={field}
            submitValue={(key, value) => onSubmiValueHandler(key, value)}
            isInvalid={fieldErrors[field.id]}
            defaultValue={submitForm.values[field.id]}
            key={field.id}
          />
        );
      })}
      <div className="mt-5 flex justify-center">
        {onPrev && (
          <>
            <Button
              onClick={onPrev}
              className={!onNext ? "" : "rounded-r-none"}
            >
              Prev
            </Button>
            <Separator orientation="vertical" />
          </>
        )}
        {!!onNext ? (
          <Button
            onClick={onSubmitHandler}
            className={!onPrev ? "" : "rounded-l-none"}
          >
            Next
          </Button>
        ) : (
          <Button onClick={onFinish}>Finish</Button>
        )}
      </div>
    </div>
  );
};

export default SubmitPage;
