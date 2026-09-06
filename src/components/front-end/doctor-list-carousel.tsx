"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { StaticImageData } from "next/image";
import { useRef } from "react";
import DoctorCard from "./doctor-card";

interface Doctor {
  _id: string;
  address: { line1: string; line2: string };
  fees: number;
  image: string | StaticImageData;
  name: string;
  speciality: string;
}

export default function DoctorListCarousel({
  doctors,
  isInPerson = false,
}: {
  doctors: Doctor[];
  isInPerson?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      behavior: "smooth",
      left: direction === "left" ? -amount : amount,
    });
  };

  return (
    <div className="group/carousel relative">
      <button
        className="absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 sm:opacity-0 sm:group-hover/carousel:opacity-100"
        onClick={() => scroll("left")}
        type="button"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
        ref={scrollRef}
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        {doctors.map((doctor) => (
          <div
            className="w-[280px] min-w-[280px] snap-start sm:w-[320px] sm:min-w-[320px]"
            key={doctor._id}
          >
            <DoctorCard doctor={doctor} isInPerson={isInPerson} />
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 right-0 z-10 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 sm:opacity-0 sm:group-hover/carousel:opacity-100"
        onClick={() => scroll("right")}
        type="button"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
