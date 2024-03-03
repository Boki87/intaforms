"use client";

import { FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import useNewFormModal from "@/hooks/useNewFormModal";

type Props = {
  userId: string;
};

const NewFormButton: React.FC<Props> = ({ userId }) => {
  const newFormModal = useNewFormModal();

  const onCreateNewForm = () => {
    newFormModal.onOpen();
  };

  return (
    <Button className="gap-2" onClick={onCreateNewForm}>
      <FaPlus />
      <span>New Form</span>
    </Button>
  );
};

export default NewFormButton;
