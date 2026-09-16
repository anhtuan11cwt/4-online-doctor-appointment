"use client";

import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { cn } from "@/lib/utils";

type SelectInputProps = {
  className?: string;
  disabled?: boolean;
  errors?: Record<string, { message?: string }>;
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  value?: string;
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
  disabled = false,
}: SelectInputProps) {
  const error = errors?.[name];
  const message =
    error && typeof error === "object" && "message" in error
      ? (error.message as string)
      : undefined;

  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <NativeSelect
        className={cn("w-full", message && "border-red-500")}
        disabled={disabled}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
      >
        <NativeSelectOption value="">{placeholder}</NativeSelectOption>
        {options.map((option) => (
          <NativeSelectOption key={option.value} value={option.value}>
            {option.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      {message && <p className="text-red-600 text-xs">{message}</p>}
    </div>
  );
}
