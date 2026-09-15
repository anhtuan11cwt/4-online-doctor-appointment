"use client";

import type { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type TextAreaInputProps<T extends Record<string, unknown>> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export default function TextAreaInput<T extends Record<string, unknown>>({
  label,
  name,
  register,
  errors,
  placeholder,
  className,
  disabled = false,
}: TextAreaInputProps<T>) {
  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Textarea
        className={cn(
          errors[name] && "border-red-500",
          disabled && "opacity-50",
        )}
        disabled={disabled}
        id={name}
        placeholder={placeholder}
        {...register(name)}
      />
      {errors[name] && (
        <p className="text-red-600 text-xs">
          {String(
            errors[name]?.message || `${label || String(name)} là bắt buộc`,
          )}
        </p>
      )}
    </div>
  );
}
