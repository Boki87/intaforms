"use client";

import { updatePage } from "@/app/actions/pages";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";
import useEditForm from "@/hooks/useEditForm";
import { useEffect, useMemo, useState } from "react";

const PageEditSidebar: React.FC = () => {
  const editForm = useEditForm();
  const { activeField } = editForm;

  const activePage = useMemo(() => {
    return editForm.pages.find((page) => page.id === editForm.activePage);
  }, [editForm.activePage, editForm.pages]);

  const [title, setTitle] = useState("");

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useDebounceEffect(
    async () => {
      if (!activePage) return;
      await updatePage(activePage.id, { title });
      editForm.setPages(
        editForm.pages.map((page) => {
          if (page.id === activePage.id) {
            return {
              ...page,
              title,
            };
          }
          return page;
        }),
      );
    },
    500,
    [title],
  );

  useEffect(() => {
    setTitle(activePage?.title || "");
  }, [activePage?.title]);

  return (
    <div>
      <div className="p-5 border-b border-gray-200 bg-gray-100">
        <Label className="gap-2">
          <span>Page Title:</span>
          <Input
            value={title}
            onChange={onTitleChange}
            placeholder="Page Name"
          />
        </Label>
      </div>
      <div>{JSON.stringify(activeField, null, 2)}</div>
    </div>
  );
};

export default PageEditSidebar;
