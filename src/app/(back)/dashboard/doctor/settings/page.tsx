import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getDoctorProfileWithAvailability } from "@/actions/availability";
import AvailabilitySettings from "@/components/dashboard/settings/availability-settings";
import DoctorServiceSettings from "@/components/dashboard/settings/doctor-service-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "@/lib/auth";

export default async function DoctorSettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const profileResult = await getDoctorProfileWithAvailability(session.user.id);

  if (!profileResult.data) {
    return (
      <div className="flex w-full flex-col">
        <div className="flex flex-col gap-3 py-3 md:gap-8 md:py-8 min-[360px]:gap-4 min-[360px]:py-4">
          <h2 className="font-bold text-lg sm:text-2xl min-[360px]:text-xl">
            Cài đặt
          </h2>
          <p className="break-words text-muted-foreground text-sm sm:text-base">
            Không tìm thấy thông tin hồ sơ bác sĩ. Vui lòng hoàn tất đăng ký
            trước khi chỉnh sửa cài đặt.
          </p>
        </div>
      </div>
    );
  }

  const profile = profileResult.data;

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-3 py-3 md:gap-8 md:py-8 min-[360px]:gap-4 min-[360px]:py-4">
        <h2 className="font-bold text-lg sm:text-2xl min-[360px]:text-xl">
          Cài đặt
        </h2>
        <Tabs className="w-full" defaultValue="availability">
          <TabsList className="w-full justify-start gap-1 overflow-x-auto sm:gap-2">
            <TabsTrigger
              className="whitespace-nowrap px-3 text-xs sm:px-4 sm:text-sm"
              value="availability"
            >
              Khả dụng
            </TabsTrigger>
            <TabsTrigger
              className="whitespace-nowrap px-3 text-xs sm:px-4 sm:text-sm"
              value="service"
            >
              Dịch vụ
            </TabsTrigger>
          </TabsList>
          <TabsContent value="availability">
            <AvailabilitySettings profile={profile} />
          </TabsContent>
          <TabsContent value="service">
            <DoctorServiceSettings profile={profile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
