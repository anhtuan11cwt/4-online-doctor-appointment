"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type RegisterSchema, registerSchema } from "@/lib/validations";

export default function RegisterForm({
  role = "user",
  plan = "",
}: {
  role?: string;
  plan?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    setIsLoading(true);
    try {
      const result = await createUser({ ...data, plan, role });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(
          "Tạo tài khoản thành công! Vui lòng kiểm tra email để xác thực.",
        );
        router.push(`/verify-account/${result.data?.id}`);
      }
    } catch {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setIsLoading(false);
    }
  };

  const isDoctor = role === "doctor";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className={isLoading ? "pointer-events-none" : ""}>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="font-bold text-2xl">
            {isDoctor ? "Tạo tài khoản bác sĩ" : "Tạo tài khoản mới"}
          </h1>
          <p className="text-balance text-muted-foreground text-sm">
            {isDoctor
              ? "Đăng ký tài khoản bác sĩ để bắt đầu cung cấp dịch vụ"
              : "Điền thông tin bên dưới để đăng ký tài khoản"}
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="fullName">Họ và tên</FieldLabel>
          <Input
            className={isLoading ? "opacity-50" : ""}
            disabled={isLoading}
            id="fullName"
            placeholder="Nguyễn Văn A"
            type="text"
            {...register("fullName")}
          />
          {errors.fullName && (
            <FieldError>{errors.fullName.message}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            className={isLoading ? "opacity-50" : ""}
            disabled={isLoading}
            id="email"
            placeholder="name@example.com"
            type="email"
            {...register("email")}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">Số điện thoại</FieldLabel>
          <Input
            className={isLoading ? "opacity-50" : ""}
            disabled={isLoading}
            id="phone"
            inputMode="numeric"
            maxLength={10}
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                e.key !== "Backspace" &&
                e.key !== "Tab" &&
                e.key !== "Enter"
              ) {
                e.preventDefault();
              }
            }}
            placeholder="0912345678"
            type="tel"
            {...register("phone")}
          />
          {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
          <div className="relative">
            <Input
              className={isLoading ? "opacity-50" : ""}
              disabled={isLoading}
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <button
              className={`absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground ${isLoading ? "cursor-not-allowed" : ""}`}
              disabled={isLoading}
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          <FieldDescription>
            <span className="mt-1 text-muted-foreground text-xs">
              • Ít nhất 8 ký tự
              <br />• Ít nhất 1 chữ hoa (A-Z)
              <br />• Ít nhất 1 chữ thường (a-z)
              <br />• Ít nhất 1 chữ số (0-9)
              <br />• Ít nhất 1 ký tự đặc biệt (!@#$%^&*)
            </span>
          </FieldDescription>
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>
        <Field>
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
            {isDoctor ? "Đăng ký bác sĩ" : "Đăng ký"}
          </Button>
        </Field>
        <Field>
          <p
            className={`text-center text-muted-foreground text-sm ${isLoading ? "opacity-50" : ""}`}
          >
            Đã có tài khoản?{" "}
            <Link
              className={`font-medium text-primary underline-offset-4 hover:underline ${isLoading ? "pointer-events-none" : ""}`}
              href="/login"
            >
              Đăng nhập
            </Link>
          </p>
        </Field>
        {!isDoctor && (
          <Field>
            <p
              className={`text-center text-muted-foreground text-sm ${isLoading ? "opacity-50" : ""}`}
            >
              Bạn là bác sĩ?{" "}
              <Link
                className={`font-medium text-primary underline-offset-4 hover:underline ${isLoading ? "pointer-events-none" : ""}`}
                href="/register?role=doctor&plan=professional"
              >
                Đăng ký ngay
              </Link>
            </p>
          </Field>
        )}
      </FieldGroup>
    </form>
  );
}
