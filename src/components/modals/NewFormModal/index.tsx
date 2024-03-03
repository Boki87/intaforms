"use client";

import { createForm, renameForm } from "@/app/actions/forms";
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
import useNewFormModal from "@/hooks/useNewFormModal";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@clerk/nextjs";

const NewFormModal: React.FC = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const newFormModal = useNewFormModal();
  const [formState, setFormState] = useState({
    name: "",
    isInternal: true,
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onOpenChangeHandler = (val: boolean) => {
    if (!val) {
      newFormModal.onClose();
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) return;
    e.preventDefault();

    try {
      setLoading(true);
      await createForm(user.id, formState.name, formState.isInternal);
      newFormModal.onClose();
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <Dialog open={newFormModal.isOpen} onOpenChange={onOpenChangeHandler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new form</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="form-name" className="sr-only">
              Name
            </Label>
            <Input
              onChange={onChangeHandler}
              id="name"
              name="name"
              placeholder="Form Name"
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox
              id="form-is_internal"
              name="form-is_internal"
              defaultChecked={formState.isInternal}
              onCheckedChange={(checked) => {
                return checked
                  ? setFormState((prev) => ({ ...prev, isInternal: true }))
                  : setFormState((prev) => ({ ...prev, isInternal: false }));
              }}
            />
            <Label htmlFor="form-is_internal">Internal form</Label>
          </div>
          <p className="text-gray-700 text-sm mt-0">
            Internal forms are only managed by you and members of this form.
            Otherwise it is a public form that any one you share the link with
            can submit
          </p>
          <p className="text-red-400 text-sm -mt-4">
            This cannot be changed later
          </p>
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
                  Create
                </>
              ) : (
                "Creating..."
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewFormModal;
