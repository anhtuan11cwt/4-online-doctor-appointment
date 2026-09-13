"use client";

import { Clock, MapPin, Stethoscope, Video } from "lucide-react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

interface Doctor {
  _id: string;
  address: { line1: string; line2: string };
  fees: number;
  image: string | StaticImageData;
  name: string;
  speciality: string;
}

const timeStamps = [
  { period: "AM", time: "9:00" },
  { period: "AM", time: "9:15" },
  { period: "AM", time: "9:30" },
  { period: "AM", time: "9:45" },
  { period: "AM", time: "10:00" },
  { period: "AM", time: "10:15" },
  { period: "AM", time: "10:30" },
  { period: "AM", time: "10:45" },
  { period: "AM", time: "11:00" },
];

export default function DoctorCard({
  doctor,
  isInPerson = false,
}: {
  doctor: Doctor;
  isInPerson?: boolean;
}) {
  return (
    <div className="group rounded-md border border-gray-200 bg-white transition-all duration-300 hover:border-gray-400 dark:border-gray-600 dark:bg-slate-700">
      <Link className="block" href={`/doctors/${doctor._id}`}>
        <div className="relative">
          <Image
            alt={doctor.name}
            className="h-40 w-full rounded-t-md object-cover sm:h-48"
            height={207}
            src={doctor.image}
            width={243}
          />
          {!isInPerson && (
            <div className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 text-blue-700 sm:h-10 sm:w-10">
              <Video className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <Link href={`/doctors/${doctor._id}`}>
          <h2 className="font-bold text-base text-gray-900 uppercase tracking-wide sm:text-xl">
            {doctor.name}
          </h2>
        </Link>

        <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm dark:text-gray-400">
          <Stethoscope className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
          <span>{doctor.speciality}</span>
        </div>

        {isInPerson && (
          <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
            <span className="truncate">
              {doctor.address.line1}, {doctor.address.line2}
            </span>
          </div>
        )}

        <span className="inline-block w-fit rounded-full bg-green-100 px-2 py-0.5 font-medium text-[10px] text-green-700 uppercase sm:px-3 sm:py-1 sm:text-xs">
          Khám hôm nay
        </span>

        <div className="border-gray-200 border-t pt-2 sm:pt-3 dark:border-gray-600">
          <div className="mb-1.5 flex items-center justify-between text-xs sm:mb-2 sm:text-sm">
            <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="hidden min-[360px]:inline">
                Thứ Ba, ngày 9/9
              </span>
              <span className="min-[360px]:hidden">9/9</span>
            </span>
            <span className="font-bold text-gray-900">
              {doctor.fees.toLocaleString("vi-VN")}đ
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
            {timeStamps.slice(0, 5).map((item) => (
              <span
                className="cursor-pointer rounded bg-blue-50 px-1 py-1 text-center font-medium text-[10px] text-blue-600 transition-colors hover:bg-blue-600 hover:text-white sm:px-2 sm:text-xs dark:text-slate-900"
                key={`${item.time}-${item.period}`}
              >
                {item.time}
                <br className="hidden sm:hidden min-[360px]:hidden" />
                <span className="sm:inline min-[360px]:hidden"> </span>
                {item.period}
              </span>
            ))}
          </div>

          <Link
            className="mt-1.5 block text-center font-medium text-blue-600 text-xs hover:text-blue-800 sm:mt-2"
            href={`/doctors/${doctor._id}`}
          >
            Xem thêm giờ →
          </Link>
        </div>
      </div>
    </div>
  );
}
