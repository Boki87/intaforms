"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";
import { deleteForm } from "@/app/actions/forms";
import useFormRenameModal from "@/hooks/useFormRenameModal";
import Link from "next/link";

type Props = {
  id: number;
  name: string;
  uuid: string;
};

const FormCard: React.FC<Props> = ({ id, name, uuid }) => {
  const formRenameModal = useFormRenameModal();

  return (
    <div className="w-full sm:w-40 h-[200px] border border-gray-200 rounded-md bg-white flex flex-col shadow-lg">
      <Link
        href={`/form/${uuid}/edit`}
        className="flex-1 flex items-center justify-center text-gray-800 text-lg truncate"
      >
        <span className="truncate px-4">{name}</span>
      </Link>
      <div className="h-12 border-t border-gray-200 flex items-center px-4">
        <span className="flex-1 text-gray-700 text-sm">1 entries</span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="xs">
              <BsThreeDots />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/form/${uuid}/edit`}>
              <DropdownMenuItem className="flex items-center gap-2">
                <GrConfigure />
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => formRenameModal.onOpen({ id, name })}
              className="flex items-center gap-2"
            >
              <FaEdit />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteForm(id)}>
              <div className="flex items-center gap-2 text-destructive hover:text-destructive">
                <FaTrash />
                Delete
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FormCard;
