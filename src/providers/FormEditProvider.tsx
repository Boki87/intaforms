"use client";

import { PropsWithChildren, useEffect } from "react";
import { TForm, TPage } from "../../db/schema";
import useEditForm from "@/hooks/useEditForm";

type Props = {
  pages: TPage[];
};

const FormEditProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  pages,
}) => {
  const editForm = useEditForm();

  useEffect(() => {
    if (pages.length === 0) return;
    editForm.setPages(pages);
    editForm.setActivePage(pages[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages]);
  return <>{children}</>;
};

export default FormEditProvider;
