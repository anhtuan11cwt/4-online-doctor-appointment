import { getUserById } from "@/actions/users";
import VerifyTokenForm from "@/components/front-end/verify-token-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function VerifyAccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">
          Không tìm thấy người dùng
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Xác thực tài khoản</CardTitle>
          <CardDescription>
            Vui lòng kiểm tra email{" "}
            <span className="font-medium text-foreground">{user.email}</span> và
            nhập mã xác thực 6 chữ số mà chúng tôi đã gửi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyTokenForm id={id} userToken={user.token ?? ""} />
        </CardContent>
      </Card>
    </div>
  );
}
