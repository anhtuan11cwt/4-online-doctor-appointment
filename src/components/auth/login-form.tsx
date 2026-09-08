"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type LoginSchema, loginSchema } from "@/lib/validations";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className={isLoading ? "pointer-events-none" : ""}>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="font-bold text-2xl">Đăng nhập vào tài khoản</h1>
          <p className="text-balance text-muted-foreground text-sm">
            Nhập email và mật khẩu bên dưới để đăng nhập
          </p>
        </div>
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
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
            <Link
              className={`ml-auto text-muted-foreground text-sm underline-offset-4 hover:underline ${isLoading ? "pointer-events-none" : ""}`}
              href="/forgot-password"
            >
              Quên mật khẩu?
            </Link>
          </div>
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
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>
        <Field>
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Đăng nhập
          </Button>
        </Field>
        <Field>
          <p className="text-center text-muted-foreground text-sm">
            Chưa có tài khoản?{" "}
            <Link
              className={`font-medium text-primary underline-offset-4 hover:underline ${isLoading ? "pointer-events-none" : ""}`}
              href="/register"
            >
              Đăng ký
            </Link>
          </p>
        </Field>
      </FieldGroup>
    </form>
  );
}
