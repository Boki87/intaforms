"use client";

import { PropsWithChildren, useEffect } from "react";
import { TForm, forms } from "../../db/schema";
import useForm from "@/hooks/useForm";

type Props = {
  formData: TForm;
};

const FormDataProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  formData,
}) => {
  const formDataProvider = useForm();

  useEffect(() => {
    formDataProvider.setFormData(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);
  return <>{children}</>;
};

export default FormDataProvider;
