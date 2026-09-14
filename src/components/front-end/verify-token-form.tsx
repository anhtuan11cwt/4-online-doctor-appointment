"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { updateUserById } from "@/actions/users";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  token: z.string().min(6, "Mã token phải có ít nhất 6 ký tự"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function VerifyTokenForm({
  userToken,
  id,
  userRole,
}: {
  userToken: string;
  id: string;
  userRole: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      token: "",
    },
    resolver: zodResolver(formSchema),
  });

  const tokenValue = useWatch({ control, name: "token" });

  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true);
    setShowNotification(false);

    try {
      const userInputToken = Number.parseInt(data.token, 10);
      const dbToken = Number.parseInt(userToken, 10);

      if (userInputToken === dbToken) {
        await updateUserById(id);
        toast.success("Tài khoản đã được xác minh!");
        setShowNotification(false);
        if (userRole === "DOCTOR") {
          router.push(`/onboarding/${id}`);
        } else {
          router.push("/login");
        }
      } else {
        setShowNotification(true);
      }
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="font-bold text-2xl">Xác thực tài khoản</h1>
        <p className="text-balance text-muted-foreground text-sm">
          Nhập mã xác thực 6 chữ số được gửi đến email của bạn
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <InputOTP
          className={isLoading ? "pointer-events-none opacity-50" : ""}
          disabled={isLoading}
          maxLength={6}
          onChange={(value) =>
            setValue("token", value, { shouldValidate: true })
          }
          value={tokenValue}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {errors.token && (
          <p className="text-destructive text-sm">{errors.token.message}</p>
        )}

        {showNotification && (
          <div className="flex w-full items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm">
            <AlertCircle className="size-4 shrink-0" />
            <span>Sai mã token, vui lòng kiểm tra lại mã và nhập lại</span>
          </div>
        )}

        <Button className="w-full" disabled={isLoading} type="submit">
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          Xác thực
        </Button>
      </div>
    </form>
  );
}
