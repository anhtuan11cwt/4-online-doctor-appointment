"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { getApplicationByTrackingNumber } from "@/actions/onboarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  trackingNumber: z
    .string()
    .min(10, "Mã theo dõi phải có ít nhất 10 ký tự")
    .max(10, "Mã theo dõi phải có đúng 10 ký tự"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function TrackingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      trackingNumber: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true);
    setNotification("");

    try {
      const response = await getApplicationByTrackingNumber(
        data.trackingNumber,
      );

      if (response.status === 404) {
        setNotification(
          "Mã theo dõi không đúng, vui lòng kiểm tra và nhập lại",
        );
      } else if (response.status === 200 && response.data) {
        const userId = response.data.userId;
        const page = response.data.page || "biodata";
        toast.success("Đã tìm thấy dữ liệu, đang chuyển hướng...");
        router.push(`/onboarding/${userId}?page=${page}`);
      }
    } catch {
      toast.error("Vui lòng thử lại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="font-bold text-2xl">Tiếp tục đơn đăng ký</h1>
        <p className="text-balance text-muted-foreground text-sm">
          Vui lòng nhập mã theo dõi gồm 10 ký tự đã được cấp cho bạn
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <div className="w-full space-y-2">
          <Label htmlFor="trackingNumber">Mã theo dõi</Label>
          <Input
            className={isLoading ? "pointer-events-none opacity-50" : ""}
            disabled={isLoading}
            id="trackingNumber"
            maxLength={10}
            placeholder="VD: ABC1234567"
            {...register("trackingNumber")}
          />
        </div>

        {errors.trackingNumber && (
          <p className="w-full text-destructive text-sm">
            {errors.trackingNumber.message}
          </p>
        )}

        {notification && (
          <div className="flex w-full items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm">
            <AlertCircle className="size-4 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        <Button className="w-full" disabled={isLoading} type="submit">
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          Tiếp tục
        </Button>
      </div>
    </form>
  );
}
