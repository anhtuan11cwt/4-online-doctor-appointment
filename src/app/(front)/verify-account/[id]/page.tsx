import Image from "next/image";
import { getUserById } from "@/actions/users";
import VerifyTokenForm from "@/components/front-end/verify-token-form";

export default async function VerifyAccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="flex min-h-svh items-center justify-center">
          <p className="text-muted-foreground text-sm">
            Không tìm thấy người dùng
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
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
              <VerifyTokenForm id={id} userToken={user.token ?? ""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
