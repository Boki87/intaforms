"use client";

import { cn } from "@/lib/utils";
import useForm from "@/hooks/useForm";
import FormDetails from "./components/FormDetails";

type Props = {
  className: string;
};

const ElementEdit: React.FC<Props> = ({ className }) => {
  const formData = useForm();

  let formType;

  if (!formData.activeElement) {
    formType = <FormDetails />;
  }

  return (
    <div className={cn("bg-white shadow-md p-3", className)}>{formType}</div>
  );
};

export default ElementEdit;
