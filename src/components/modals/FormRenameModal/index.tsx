"use client";

import { renameForm } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFormRenameModal from "@/hooks/useFormRenameModal";
import { useState } from "react";
import { FaSave } from "react-icons/fa";

const FormRenameModal: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRenameModal = useFormRenameModal();
  const onOpenChangeHandler = (val: boolean) => {
    if (!val) {
      formRenameModal.onClose();
    }
  };

  const onRenameHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRenameModal.formId) return;
    const inputVal = (
      e.target as HTMLFormElement
    ).querySelector<HTMLInputElement>("#form-name")?.value;

    try {
      setLoading(true);
      await renameForm(formRenameModal.formId, inputVal || "");
      formRenameModal.onClose();
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <Dialog open={formRenameModal.isOpen} onOpenChange={onOpenChangeHandler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Raname {formRenameModal.formName}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onRenameHandler} className="flex flex-col gap-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="form-name" className="sr-only">
              Name
            </Label>
            <Input
              id="form-name"
              name="form-name"
              defaultValue={formRenameModal.formName}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              disabled={loading}
              type="submit"
              variant="default"
              className="gap-2"
            >
              {!loading ? (
                <>
                  <FaSave />
                  Save
                </>
              ) : (
                "Saving..."
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormRenameModal;
