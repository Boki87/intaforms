"use client";

import React from "react";
import PagesSideBar from "@/components/PagesSideBar";
import useEditForm from "@/hooks/useEditForm";
import { TPage } from "../../../../../../db/schema/pages";
import { addPage, deletePage } from "@/app/actions/pages";
import ConfirmDialog from "@/components/ConfirmDialog";
import PageContent from "./PageContent";
import PageEditSidebar from "./PageEditSidebar";

type Props = {
  userId: string;
  formId: number;
};

const EditLayout: React.FC<Props> = ({ userId, formId }) => {
  const { pages, activePage, setActivePage } = useEditForm();
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [pageToDelete, setPageToDelete] = React.useState<number | null>(null);

  const onPageAddHandler = async () => {
    try {
      await addPage(userId, formId);
    } catch (e) {
      console.error(e);
      // TODO: show toast error
    }
  };

  const onPageDeleteHandler = async () => {
    try {
      if (!pageToDelete) return;
      await deletePage(pageToDelete);
      setShowConfirm(false);
      setPageToDelete(null);
    } catch (e) {
      console.error(e);
      // TODO: show toast error
    }
  };

  const showConfirmDialog = (pageId: number) => {
    setShowConfirm(true);
    setPageToDelete(pageId);
  };

  return (
    <>
      <div className="w-full h-full grid grid-cols-12">
        <div className="col-span-2">
          <PagesSideBar
            pages={pages}
            activePage={activePage}
            onActivePageChange={(page: TPage) => {
              setActivePage(page.id);
            }}
            onPageAdd={onPageAddHandler}
            onPageDelete={showConfirmDialog}
          />
        </div>
        <div className="col-span-7 bg-gray-50 overflow-auto">
          <PageContent />
        </div>
        <div className="col-span-3">
          <PageEditSidebar />
        </div>
      </div>
      <ConfirmDialog
        message="Are you sure you want to delete this page?"
        isOpen={showConfirm}
        onConfirm={onPageDeleteHandler}
        onCancel={() => {
          setShowConfirm(false);
        }}
      />
    </>
  );
};

export default EditLayout;
