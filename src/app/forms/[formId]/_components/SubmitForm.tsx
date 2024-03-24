"use client";

import { useEffect, useMemo, useState } from "react";
import { TPage } from "../../../../../db/schema/pages";
import SubmitPage from "./SubmitPage";
import { FormFieldInstance } from "@/components/FormFields/Field";
import useSubmitForm from "@/hooks/useSubmitForm";
import { formSubmissions } from "../../../../../db/schema/formSubmissions";
import db from "../../../../../db";

type Props = {
  formName: string;
  pages: TPage[];
};

const SubmitForm: React.FC<Props> = ({ formName, pages }) => {
  const submitForm = useSubmitForm();
  const [activePageId, setActivePageId] = useState<number>(0);
  const [pagesState, setPagesState] = useState<TPage[]>([]);
  const activePage = useMemo(
    () => pages[activePageId],
    [pagesState, activePageId],
  );

  const showPrev = activePageId !== 0;
  const showNext = activePageId !== pages.length - 1;

  const onPrevHandler = () => {
    if (activePageId === 0) return;
    setActivePageId((prev) => prev - 1);
  };

  const onNextHandler = () => {
    if (activePageId === pages.length - 1) return;
    setActivePageId((prev) => prev + 1);
  };

  const onFinishHandler = async () => {
    // console.log("Finish", { submitValues: submitForm.values, pages });

    const pagesWithSubmitValues = pages.map((page) => {
      const fields = JSON.parse(page.fields || "[]") as FormFieldInstance[];
      const fieldsWithValues = fields.map((field) => {
        return {
          ...field,
          value: submitForm.values[field.id],
        };
      });

      return {
        ...page,
        fields: JSON.stringify(fieldsWithValues),
      };
    });

    console.log("Finish", { pagesWithSubmitValues });
    const formId = pagesWithSubmitValues[0].formId;
    try {
      const newSubmission = await db
        .insert(formSubmissions)
        .values({
          formId,
          values: JSON.stringify(pagesWithSubmitValues),
        })
        .returning();
      console.log({ newSubmission });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setPagesState(pages);
  }, [pages]);
  return (
    <div className="w-full h-screen bg-gray-100 pt-5">
      <div className="max-w-2xl mx-auto bg-white p-5 rounded-lg">
        <span>{formName}</span>
        <SubmitPage
          title={activePage?.title || ""}
          fields={JSON.parse(activePage?.fields || "[]") as FormFieldInstance[]}
          onPrev={showPrev ? onPrevHandler : undefined}
          onNext={showNext ? onNextHandler : undefined}
          onFinish={onFinishHandler}
        />
      </div>
    </div>
  );
};

export default SubmitForm;
