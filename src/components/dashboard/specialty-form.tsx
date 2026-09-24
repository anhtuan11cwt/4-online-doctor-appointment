"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createSpeciality } from "@/actions/specialties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateSlug } from "@/lib/generate-slug";
import { cn } from "@/lib/utils";
import { type SpecialtySchema, specialtySchema } from "@/lib/validations";

export default function SpecialtyForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpecialtySchema>({
    defaultValues: { title: "" },
    resolver: zodResolver(specialtySchema),
  });

  const onSubmit = async (data: SpecialtySchema) => {
    setIsLoading(true);
    try {
      const payload = {
        slug: generateSlug(data.title),
        title: data.title,
      };

      const result = await createSpeciality(payload);

      if (result.status === 201) {
        toast.success("Tạo chuyên khoa thành công");
        reset();
        router.push("/dashboard/specialties");
      } else {
        toast.error(result.error ?? "Đã có lỗi xảy ra");
      }
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 flex items-start justify-between gap-2 border-b pb-4">
        <div className="min-w-0">
          <h3 className="break-words font-bold text-lg">Tạo chuyên khoa mới</h3>
          <p className="mt-1 break-words text-muted-foreground text-sm">
            Nhập thông tin chuyên khoa
          </p>
        </div>
        <Link
          aria-label="Đóng"
          className="-m-1 flex size-8 shrink-0 items-center justify-center rounded-md p-1 text-muted-foreground hover:text-foreground"
          href="/dashboard/specialties"
        >
          <X className="size-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            Tiêu đề chuyên khoa <span className="text-red-500">*</span>
          </Label>
          <Input
            className={cn(
              errors.title && "border-red-500",
              isLoading && "opacity-50",
            )}
            disabled={isLoading}
            id="title"
            placeholder="Nhập tiêu đề chuyên khoa"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-4">
        <Button
          className="w-full sm:w-auto"
          disabled={isLoading}
          onClick={() => router.push("/dashboard/specialties")}
          type="button"
          variant="outline"
        >
          Hủy
        </Button>
        <Button className="w-full sm:w-auto" disabled={isLoading} type="submit">
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isLoading ? "Đang tạo..." : "Tạo chuyên khoa"}
        </Button>
      </div>
    </form>
  );
}
