"use client";

import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { useOutsideClick } from "@/hooks/useOutsideClick";

type Props = {
  title: string;
  onRename: (newTitle: string) => void;
};

export const TitleEdit: React.FC<Props> = ({ title, onRename }) => {
  const isFirstRender = React.useRef(true);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [showInput, setShowInput] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(title);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  useOutsideClick(inputRef, () => {
    setShowInput(false);
    if (inputValue !== "" && inputValue !== title) {
      onRename(inputValue);
    }
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (inputValue !== "" && inputValue !== title) {
          onRename(inputValue);
        }
        setTimeout(() => {
          setShowInput(false);
        }, 0);
      }
      if (e.key === "Escape") {
        setShowInput(false);
        setInputValue(title);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, title]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setInputValue(title);
  }, [title]);

  return (
    <div>
      {!showInput && (
        <span
          className="text-lg font-semibold text-gray-800 cursor-pointer"
          onClick={() => {
            setShowInput(true);
            if (isFirstRender.current) {
              setInputValue(title);
            }
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
        >
          {inputValue === "" ? title : inputValue}
        </span>
      )}
      {showInput && (
        <Input ref={inputRef} value={inputValue} onChange={onChangeHandler} />
      )}
    </div>
  );
};
