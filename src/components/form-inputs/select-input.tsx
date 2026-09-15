"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SelectInputProps = {
  label: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  errors?: Record<string, { message?: string }>;
  className?: string;
};

export default function SelectInput({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Chọn một tùy chọn",
  errors,
  className,
}: SelectInputProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      {label && (
        <label className="font-medium text-gray-700 text-sm" htmlFor={name}>
          {label}
        </label>
      )}
      <Select onValueChange={(v) => onChange?.(v ?? "")} value={value}>
        <SelectTrigger
          className={cn("w-full", errors?.[name] && "border-red-500")}
          id={name}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors?.[name] && (
        <p className="text-red-600 text-xs">
          {label || String(name)} là bắt buộc
        </p>
      )}
    </div>
  );
}
