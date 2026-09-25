"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Symptom } from "@prisma/client";
import { Loader2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  createManySymptoms,
  createSymptom,
  updateSymptomById,
} from "@/actions/symptoms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateSlug } from "@/lib/generate-slug";
import { cn } from "@/lib/utils";
import { type SymptomSchema, symptomSchema } from "@/lib/validations";

type SymptomFormProps = {
  initialData?: Symptom;
  title?: string;
};

export default function SymptomForm({ initialData, title }: SymptomFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const editingId = initialData?.id ?? "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SymptomSchema>({
    defaultValues: { title: initialData?.title ?? "" },
    resolver: zodResolver(symptomSchema),
  });

  const onSubmit = async (data: SymptomSchema) => {
    setIsLoading(true);
    try {
      const payload = {
        slug: generateSlug(data.title),
        title: data.title,
      };

      if (editingId) {
        const result = await updateSymptomById(editingId, payload);
        if (result.status === 200) {
          toast.success("Cập nhật triệu chứng thành công");
          router.push("/dashboard/symptoms");
        } else {
          toast.error(result.error ?? "Đã có lỗi xảy ra");
        }
      } else {
        const result = await createSymptom(payload);
        if (result.status === 201) {
          toast.success("Tạo triệu chứng thành công");
          reset();
          router.push("/dashboard/symptoms");
        } else {
          toast.error(result.error ?? "Đã có lỗi xảy ra");
        }
      }
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const onCreateMany = async () => {
    setIsLoading(true);
    try {
      const result = await createManySymptoms();
      if (result.status === 201) {
        toast.success("Tạo nhiều triệu chứng thành công");
        router.refresh();
      } else {
        toast.error(result.error ?? "Không thể tạo triệu chứng hàng loạt");
      }
    } catch {
      toast.error("Không thể tạo triệu chứng hàng loạt");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex items-start justify-between gap-2 border-b pb-3 min-[360px]:mb-6 min-[360px]:pb-4">
        <div className="min-w-0">
          <h3 className="break-words font-bold text-base min-[360px]:text-lg">
            {editingId
              ? "Cập nhật triệu chứng"
              : title || "Tạo triệu chứng mới"}
          </h3>
          <p className="mt-1 break-words text-muted-foreground text-xs min-[360px]:text-sm">
            Nhập thông tin triệu chứng
          </p>
        </div>
        <Link
          aria-label="Đóng"
          className="-m-1 flex size-8 shrink-0 items-center justify-center rounded-md p-1 text-muted-foreground hover:text-foreground"
          href="/dashboard/symptoms"
        >
          <X className="size-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            Tiêu đề triệu chứng <span className="text-red-500">*</span>
          </Label>
          <Input
            className={cn(
              errors.title && "border-red-500",
              isLoading && "opacity-50",
            )}
            disabled={isLoading}
            id="title"
            placeholder="Nhập tiêu đề triệu chứng"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-4">
        {!editingId && (
          <Button
            className="w-full sm:w-auto"
            disabled={isLoading}
            onClick={onCreateMany}
            type="button"
            variant="secondary"
          >
            {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Tạo hàng loạt
          </Button>
        )}
        <Button
          className="w-full sm:w-auto"
          disabled={isLoading}
          onClick={() => router.push("/dashboard/symptoms")}
          type="button"
          variant="outline"
        >
          Hủy
        </Button>
        <Button className="w-full sm:w-auto" disabled={isLoading} type="submit">
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isLoading
            ? editingId
              ? "Đang cập nhật..."
              : "Đang tạo..."
            : editingId
              ? "Cập nhật triệu chứng"
              : "Tạo triệu chứng"}
        </Button>
      </div>
    </form>
  );
}
