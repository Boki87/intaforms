"use client";

import useForm from "@/hooks/useForm";
import { useState } from "react";

const FormDetails = () => {
  const formState = useForm();

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (!formState.formState) return;
    formState.setFormState({ ...formState.formState, name: e.target.value });
  }

  return (
    <div>
      <label>Form Name</label>
      <input
        value={formState?.formState?.name || ""}
        onChange={changeHandler}
        type="text"
      />
    </div>
  );
};

export default FormDetails;
