"use client";

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
import useNewFieldModal from "@/hooks/useNewFieldModal";
import { FaSave } from "react-icons/fa";

const NewFieldModal: React.FC = () => {
  const newFieldModal = useNewFieldModal();

  const onOpenChangeHandler = (isOpen: boolean) => {
    console.log("open change", isOpen);
    // if (isOpen) {
    //   newFieldModal.onOpen();
    // } else {
    //   newFieldModal.onClose();
    // }
  };

  return (
    <Dialog open={newFieldModal.isOpen} onOpenChange={onOpenChangeHandler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a form field</DialogTitle>
        </DialogHeader>
        <div>New Field</div>
      </DialogContent>
    </Dialog>
  );
};

export default NewFieldModal;
