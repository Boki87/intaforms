/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { cn } from "@/lib/utils";
import { MdDragIndicator } from "react-icons/md";
import { TPage } from "../../../db/schema/pages";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import TooltipWrapper from "../TooltipWrapper";

type Props = {
  pages: TPage[];
  activePage?: number;
  onActivePageChange?: (page: TPage) => void;
  onPageDelete?: (pageId: number) => void;
  onPageAdd?: () => void;
};

const PagesSideBar: React.FC<Props> = ({
  pages,
  activePage,
  onActivePageChange,
  onPageAdd,
  onPageDelete,
}) => {
  return (
    <div className="bg-gray-100 h-full w-full flex flex-col">
      <div className="p-5 flex-1 flex flex-col gap-3">
        {pages?.map((page, i) => (
          <PageCard
            onClick={() => onActivePageChange?.(page)}
            onDelete={() => onPageDelete?.(page.id)}
            title={page.title || ""}
            activePage={activePage || 0}
            index={i}
            id={page.id}
            key={page.id}
          />
        ))}
      </div>
      <div className="w-full flex justify-end py-2 px-5">
        <TooltipWrapper message="Add a new page">
          <Button
            onClick={onPageAdd}
            variant="default"
            className="rounded-full"
            size="xs"
          >
            <FaPlus size={13} />
          </Button>
        </TooltipWrapper>
      </div>
    </div>
  );
};

export default PagesSideBar;

type PageCardProps = {
  title: string;
  id: number;
  activePage: number;
  onDelete?: () => void;
  [x: string]: any;
};

function PageCard({
  title,
  index,
  id,
  activePage,
  onDelete,
  ...rest
}: PageCardProps) {
  const isActive = activePage === id;
  const colors = [
    "bg-indigo-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-slate-400",
  ];

  const bgColor = colors[index % colors.length];

  const onDeleteHandler = () => {
    onDelete?.();
  };

  return (
    <div
      {...rest}
      className={cn(
        "h-10 w-full rounded-lg text-white px-2 text-sm flex items-center cursor-pointer",
        bgColor,
        isActive && "ring-2 ring-offset-2 ring-slate-500",
      )}
    >
      <MdDragIndicator />
      <span className="ml-1 truncate">{title}</span>
      <div className="flex-1"></div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="outline-none w-4 h-4">
            <BsThreeDotsVertical />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onDeleteHandler}>
            <div className="flex items-center gap-2 text-destructive hover:text-destructive">
              <FaTrash />
              Delete
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
