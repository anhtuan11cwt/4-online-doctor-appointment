"use client";

import { Map as MapIcon } from "lucide-react";
import Link from "next/link";
import { doctors } from "../../../public/assets";
import DoctorListCarousel from "./doctor-list-carousel";
import SectionHeading from "./section-heading";
import ToggleButton from "./toggle-button";

export default function DoctorsList({
  title = "Khám từ xa",
  isInPerson = false,
  className = "bg-slate-50",
}: {
  title?: string;
  isInPerson?: boolean;
  className?: string;
}) {
  return (
    <section className={`py-6 sm:py-8 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SectionHeading title={title} />
          <div className="flex items-center gap-4">
            {isInPerson ? (
              <Link
                className="flex items-center gap-2 font-semibold text-blue-600 text-sm"
                href="#"
              >
                <MapIcon className="h-4 w-4 flex-shrink-0" />
                Xem tất cả
              </Link>
            ) : (
              <ToggleButton />
            )}
          </div>
        </div>

        <div className="mt-6 px-10 sm:mt-8 sm:px-12">
          <DoctorListCarousel doctors={doctors} isInPerson={isInPerson} />
        </div>
      </div>
    </section>
  );
}
