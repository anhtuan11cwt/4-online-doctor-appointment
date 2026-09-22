import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getDoctorProfileWithAvailability } from "@/actions/availability";
import AvailabilitySettings from "@/components/dashboard/settings/availability-settings";
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
        <div className="flex flex-col gap-4 py-4 md:gap-8 md:py-8">
          <h2 className="font-bold text-xl sm:text-2xl">Cài đặt</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Không tìm thấy thông tin hồ sơ bác sĩ.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-4 py-4 md:gap-8 md:py-8">
        <h2 className="font-bold text-xl sm:text-2xl">Cài đặt</h2>
        <AvailabilitySettings profile={profileResult.data} />
      </div>
    </div>
  );
}
