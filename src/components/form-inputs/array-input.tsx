"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ArrayInputProps {
  className?: string;
  items: string[];
  label: string;
  placeholder?: string;
  setItems: (items: string[]) => void;
}

export default function ArrayInput({
  label,
  items,
  setItems,
  placeholder = "Nhập giá trị",
  className,
}: ArrayInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !items.includes(trimmed)) {
      setItems([...items, trimmed]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      {label && (
        <label className="font-medium text-gray-700 text-sm" htmlFor={label}>
          {label}
        </label>
      )}
      <div className="flex gap-2">
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          value={inputValue}
        />
        <Button onClick={handleAdd} type="button" variant="outline">
          <Plus className="size-4" />
        </Button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              className="flex items-center gap-1 rounded-full bg-teal-100 px-3 py-1 text-sm text-teal-800 dark:bg-teal-900 dark:text-teal-100"
              key={item}
            >
              {item}
              <button
                className="ml-1 rounded-full p-0.5 hover:bg-teal-200 dark:hover:bg-teal-800"
                onClick={() => handleRemove(index)}
                type="button"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
