"use client";

import type { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";

type TextInputProps<T extends Record<string, unknown>> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: string;
};

export default function TextInput<T extends Record<string, unknown>>({
  label,
  name,
  register,
  errors,
  type = "text",
}: TextInputProps<T>) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="font-medium text-gray-700 text-sm" htmlFor={name}>
          {label}
        </label>
      )}
      <Input id={name} type={type} {...register(name, { required: true })} />
      {errors[name] && (
        <p className="text-red-600 text-xs">{label || name} là bắt buộc</p>
      )}
    </div>
  );
}
