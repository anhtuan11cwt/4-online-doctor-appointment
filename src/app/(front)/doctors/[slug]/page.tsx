import { MapPin, Star, Stethoscope } from "lucide-react";
import Image from "next/image";
import { getDoctorBySlug } from "@/actions/doctors";
import DoctorDetails from "@/components/front-end/doctor-details";

const DEFAULT_AVATAR = "/profile_pic.png";

export const dynamic = "force-dynamic";

export default async function DoctorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);

  if (!doctor) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-50 py-16 dark:bg-slate-800">
        <h2 className="font-bold text-gray-900 text-xl sm:text-2xl dark:text-white">
          Không tìm thấy thông tin bác sĩ
        </h2>
      </section>
    );
  }

  const profile = doctor.doctorProfile;
  const specialty =
    profile?.primarySpecialization || profile?.specialty?.title || "Tổng quát";
  const address = profile?.hospitalAddress || "Chưa cập nhật địa chỉ";
  const profilePicture = profile?.profilePicture || DEFAULT_AVATAR;

  return (
    <section className="min-h-screen bg-slate-50 pt-16 pb-10 sm:pt-24 sm:pb-16 dark:bg-slate-800">
      <div className="mx-auto max-w-4xl px-3 sm:px-4">
        <div className="rounded-md bg-white py-8 shadow-lg dark:border dark:border-slate-600 dark:bg-slate-950">
          {/* Đầu trang bác sĩ */}
          <div className="flex flex-col items-start justify-between gap-4 border-gray-200 border-b px-3 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-6 min-[360px]:px-4 dark:border-gray-700">
            <div className="min-w-0 flex-1">
              <h1 className="break-words font-bold text-gray-900 text-lg uppercase tracking-wide sm:text-2xl dark:text-white">
                {doctor.name}
              </h1>
              <div className="mt-1.5 flex items-center gap-2 text-[10px] text-gray-500 uppercase sm:mt-2 sm:text-xs dark:text-gray-400">
                <Stethoscope className="h-3 w-3 sm:h-4 sm:w-4" />
                {profile?.operationMode || specialty}
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-xs text-yellow-500 sm:mt-2 sm:text-sm">
                <Star className="h-3 w-3 fill-current sm:h-4 sm:w-4" />
                <Star className="h-3 w-3 fill-current sm:h-4 sm:w-4" />
                <Star className="h-3 w-3 fill-current sm:h-4 sm:w-4" />
                <Star className="h-3 w-3 fill-current sm:h-4 sm:w-4" />
                <Star className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-gray-500 text-xs sm:mt-2 sm:text-sm dark:text-gray-400">
                <MapPin className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                <span className="min-w-0 break-words">{address}</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                alt={doctor.name || "Bác sĩ"}
                className="h-24 w-24 rounded-full object-cover sm:h-36 sm:w-36"
                height={207}
                src={profilePicture}
                width={243}
              />
            </div>
          </div>

          {/* Các thẻ nội dung chi tiết */}
          <DoctorDetails doctor={doctor} />
        </div>
      </div>
    </section>
  );
}
