"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Service } from "@prisma/client";
import { Loader2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createService, updateService } from "@/actions/services";
import ImageInput, {
  uploadToCloudinary,
} from "@/components/form-inputs/image-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateSlug } from "@/lib/generate-slug";
import { cn } from "@/lib/utils";
import { type ServiceSchema, serviceSchema } from "@/lib/validations";

type ServiceFormProps = {
  initialData?: Service;
  title?: string;
};

export default function ServiceForm({ initialData, title }: ServiceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
  const editingId = initialData?.id ?? "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceSchema>({
    defaultValues: { title: initialData?.title ?? "" },
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = async (data: ServiceSchema) => {
    setIsLoading(true);
    try {
      let uploadedUrl = imageUrl;
      if (file) {
        uploadedUrl = await uploadToCloudinary(file, "serviceImage");
        setImageUrl(uploadedUrl);
      }

      const payload = {
        imageUrl: uploadedUrl,
        slug: generateSlug(data.title),
        title: data.title,
      };

      if (editingId) {
        const result = await updateService(editingId, payload);
        if (result.status === 200) {
          toast.success("Cập nhật dịch vụ thành công");
          router.push("/dashboard/services");
        } else {
          toast.error(result.error ?? "Đã có lỗi xảy ra");
        }
      } else {
        const result = await createService(payload);
        if (result.status === 201) {
          toast.success("Tạo dịch vụ thành công");
          reset();
          setFile(null);
          setImageUrl("");
          router.push("/dashboard/services");
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex items-start justify-between gap-2 border-b pb-3 min-[360px]:mb-6 min-[360px]:pb-4">
        <div className="min-w-0">
          <h3 className="break-words font-bold text-base min-[360px]:text-lg">
            {editingId ? "Cập nhật dịch vụ" : title || "Tạo dịch vụ mới"}
          </h3>
          <p className="mt-1 break-words text-muted-foreground text-xs min-[360px]:text-sm">
            Nhập thông tin dịch vụ khám bệnh
          </p>
        </div>
        <Link
          aria-label="Đóng"
          className="-m-1 flex size-8 shrink-0 items-center justify-center rounded-md p-1 text-muted-foreground hover:text-foreground"
          href="/dashboard/services"
        >
          <X className="size-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">
            Tiêu đề dịch vụ <span className="text-red-500">*</span>
          </Label>
          <Input
            className={cn(
              errors.title && "border-red-500",
              isLoading && "opacity-50",
            )}
            disabled={isLoading}
            id="title"
            placeholder="Nhập tiêu đề dịch vụ"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>

        <ImageInput
          className="space-y-2"
          disabled={isLoading}
          imageUrl={imageUrl}
          label="Ảnh dịch vụ"
          setFile={setFile}
          setImageUrl={setImageUrl}
        />
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-4">
        <Button
          className="w-full sm:w-auto"
          disabled={isLoading}
          onClick={() => router.push("/dashboard/services")}
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
              ? "Cập nhật dịch vụ"
              : "Tạo dịch vụ"}
        </Button>
      </div>
    </form>
  );
}
