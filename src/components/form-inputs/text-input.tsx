"use client";

import type { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type TextInputProps<T extends Record<string, unknown>> = {
  disabled?: boolean;
  errors: FieldErrors<T>;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  label: string;
  maxLength?: number;
  name: Path<T>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  register?: UseFormRegister<T>;
  type?: string;
  value?: string;
};

export default function TextInput<T extends Record<string, unknown>>({
  label,
  name,
  register,
  errors,
  type = "text",
  inputMode,
  maxLength,
  pattern,
  disabled = false,
  value,
  onChange,
}: TextInputProps<T>) {
  const error = errors[name];
  const message =
    error && typeof error === "object" && "message" in error
      ? (error.message as string)
      : undefined;

  const handleNumericInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^0-9]/g, "");
  };

  const inputProps = register ? { ...register(name) } : { onChange, value };

  return (
    <div className="grid gap-2">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        className={cn(message && "border-red-500", disabled && "opacity-50")}
        disabled={disabled}
        id={name}
        inputMode={inputMode}
        maxLength={maxLength}
        onInput={inputMode === "numeric" ? handleNumericInput : undefined}
        pattern={pattern}
        type={type}
        {...inputProps}
      />
      {message && <p className="text-red-600 text-xs">{message}</p>}
    </div>
  );
}
