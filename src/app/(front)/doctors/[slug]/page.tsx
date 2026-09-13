"use client";

import { MapPin, Star, Stethoscope } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import DoctorDetails from "@/components/front-end/doctor-details";
import FixedBookButton from "@/components/front-end/fixed-book-button";
import { doctors } from "../../../../../public/assets";

export default function DoctorPage() {
  const { slug } = useParams();
  const doctor = doctors.find((d) => d._id === slug);

  if (!doctor) {
    return (
      <section className="bg-slate-50 py-16 sm:py-24 dark:bg-slate-800">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-bold text-gray-900 text-xl sm:text-2xl dark:text-white">
            Không tìm thấy bác sĩ
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 pt-16 pb-40 sm:pt-24 dark:bg-slate-800">
      <div className="mx-auto max-w-4xl px-3 sm:px-4">
        <div className="rounded-md bg-white py-8 shadow-lg dark:border dark:border-slate-600 dark:bg-slate-950">
          {/* Doctor Header */}
          <div className="flex flex-col items-start justify-between gap-4 border-gray-200 border-b px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-6 dark:border-gray-700">
            <div className="flex-1">
              <h1 className="font-bold text-gray-900 text-lg uppercase tracking-wide sm:text-2xl dark:text-white">
                {doctor.name}
              </h1>
              <div className="mt-1.5 flex items-center gap-2 text-[10px] text-gray-500 uppercase sm:mt-2 sm:text-xs dark:text-gray-400">
                <Stethoscope className="h-3 w-3 sm:h-4 sm:w-4" />
                {doctor.speciality}
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
                <span>
                  {doctor.address.line1}, {doctor.address.line2}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                alt={doctor.name}
                className="h-24 w-24 rounded-full object-cover sm:h-36 sm:w-36"
                height={207}
                src={doctor.image}
                width={243}
              />
            </div>
          </div>

          {/* Doctor Details Tabs */}
          <DoctorDetails />
        </div>
      </div>

      <FixedBookButton fees={doctor.fees} />
    </section>
  );
}
