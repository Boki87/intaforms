"use client";

import { Label } from "@/components/ui/label";
import { FieldsBaseProps } from "../BaseProps";
import { Input } from "@/components/ui/input";
import { MdDragIndicator } from "react-icons/md";

export const Edit: React.FC<FieldsBaseProps & { onClick?: () => void }> = ({
  label,
  placeholder,
  description,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex gap-2 mb-5 rounded-lg hover:bg-gray-50 p-4 cursor-pointer"
    >
      <div className="pt-1">
        <MdDragIndicator />
      </div>
      <div className="flex-1">
        <Label>{label}</Label>
        {description && description !== "" && (
          <p className="text-sm text-gray-400">{description}</p>
        )}
        <Input placeholder={placeholder} disabled />
      </div>
    </div>
  );
};
