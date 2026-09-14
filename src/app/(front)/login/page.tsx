import Image from "next/image";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-7xl pt-16">
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="relative hidden bg-muted lg:block">
          <Image
            alt="Ứng dụng đặt lịch khám bệnh"
            className="object-cover"
            fill
            priority
            src="/header_img.png"
          />
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
