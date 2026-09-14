"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateOnboardingData } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type BioDataSchema, bioDataSchema } from "@/lib/validations";

export default function BioDataForm({
  id,
  user,
  savedData,
  onComplete,
}: {
  id: string;
  user: { email: string; name: string | null; phone: string | null };
  savedData?: Record<string, string>;
  onComplete?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );
  const maxDateStr = maxDate.toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BioDataSchema>({
    defaultValues: {
      address: savedData?.address ?? "",
      dateOfBirth: savedData?.dateOfBirth ?? "",
      email: user.email,
      fullName: user.name ?? "",
      phone: user.phone ?? "",
    },
    resolver: zodResolver(bioDataSchema),
  });

  // Đồng bộ lại giá trị sau hydration để đảm bảo dữ liệu thật luôn được hiển thị
  useEffect(() => {
    reset({
      address: savedData?.address ?? "",
      dateOfBirth: savedData?.dateOfBirth ?? "",
      email: user.email,
      fullName: user.name ?? "",
      phone: user.phone ?? "",
    });
  }, [user.email, user.name, user.phone, savedData, reset]);

  const onSubmit = async (data: BioDataSchema) => {
    setIsLoading(true);
    try {
      const result = await updateOnboardingData(id, "biodata", data);
      if (result?.error) {
        toast.error(result.error);
      } else {
        onComplete?.();
      }
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="space-y-4">
        <div className="mb-6 border-b pb-4">
          <h3 className="font-bold text-lg">Thông tin cơ bản</h3>
          <p className="mt-1 text-muted-foreground text-sm">
            Vui lòng điền thông tin cơ bản của bạn
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {["name", "email", "phone", "date"].map((field) => (
            <div className="space-y-2" key={field}>
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-10 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
          <div className="col-span-full space-y-2">
            <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-10 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 border-b pb-4">
        <h3 className="font-bold text-lg">Thông tin cơ bản</h3>
        <p className="mt-1 text-muted-foreground text-sm">
          Vui lòng điền thông tin cơ bản của bạn
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="font-medium text-sm" htmlFor="fullName">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <Input
            className={cn(
              errors.fullName && "border-red-500",
              isLoading && "opacity-50",
            )}
            disabled
            id="fullName"
            placeholder="Nguyễn Văn A"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            className={cn(errors.email && "border-red-500", "opacity-50")}
            disabled
            id="email"
            placeholder="name@example.com"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm" htmlFor="phone">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <Input
            className={cn(errors.phone && "border-red-500", "opacity-50")}
            disabled
            id="phone"
            inputMode="numeric"
            maxLength={10}
            placeholder="0912345678"
            type="tel"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm" htmlFor="dateOfBirth">
            Ngày sinh <span className="text-red-500">*</span>
          </label>
          <Input
            className={cn(
              errors.dateOfBirth && "border-red-500",
              isLoading && "opacity-50",
            )}
            disabled={isLoading}
            id="dateOfBirth"
            max={maxDateStr}
            type="date"
            {...register("dateOfBirth")}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div className="col-span-full space-y-2">
          <label className="font-medium text-sm" htmlFor="address">
            Địa chỉ <span className="text-red-500">*</span>
          </label>
          <Input
            className={cn(
              errors.address && "border-red-500",
              isLoading && "opacity-50",
            )}
            disabled={isLoading}
            id="address"
            placeholder="123 Đường ABC, Quận XYZ, TP.HCM"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-red-500 text-xs">{errors.address.message}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="px-8" disabled={isLoading} type="submit">
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isLoading ? "Đang lưu, vui lòng chờ..." : "Lưu và tiếp tục"}
        </Button>
      </div>
    </form>
  );
}
