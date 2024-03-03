"use client";

import { updatePage } from "@/app/actions/pages";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";
import useEditForm from "@/hooks/useEditForm";
import { useEffect, useState } from "react";

const PageEditSidebar: React.FC = () => {
  const editForm = useEditForm();
  const activePage = editForm.pages.find(
    (page) => page.id === editForm.activePage,
  );
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
    <div className="p-5">
      <div>
        <Label className="gap-2">
          <span>Page Title:</span>
          <Input
            value={title}
            onChange={onTitleChange}
            placeholder="Page Name"
          />
        </Label>
      </div>
    </div>
  );
};

export default PageEditSidebar;
