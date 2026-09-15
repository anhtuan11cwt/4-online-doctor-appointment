"use client";

import type { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type RadioOption = {
  label: string;
  value: string;
};

type RadioInputProps<T extends Record<string, unknown>> = {
  title: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  options: RadioOption[];
  className?: string;
  disabled?: boolean;
};

export default function RadioInput<T extends Record<string, unknown>>({
  title,
  name,
  register,
  errors,
  options,
  className,
  disabled = false,
}: RadioInputProps<T>) {
  return (
    <div className={cn("grid gap-2", className)}>
      {title && <Label>{title}</Label>}
      <div
        className={cn(
          "flex gap-4",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        {options.map((item) => (
          <label
            className="flex cursor-pointer items-center gap-2"
            htmlFor={`${name}-${item.value}`}
            key={item.value}
          >
            <input
              className="size-4 accent-teal-600"
              disabled={disabled}
              id={`${name}-${item.value}`}
              type="radio"
              value={item.value}
              {...register(name)}
            />
            <span className="text-sm">{item.label}</span>
          </label>
        ))}
      </div>
      {errors[name] && (
        <p className="text-red-600 text-xs">
          {title || String(name)} là bắt buộc
        </p>
      )}
    </div>
  );
}
