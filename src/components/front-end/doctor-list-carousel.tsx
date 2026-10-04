"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { Doctor } from "@/types";
import DoctorCard from "./doctor-card";

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

  if (doctors.length === 0) {
    return (
      <p className="py-6 text-center text-muted-foreground text-sm">
        Chưa có bác sĩ nào trong danh mục này.
      </p>
    );
  }

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
        className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 sm:gap-4"
        ref={scrollRef}
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        {doctors.map((doctor) => (
          <div
            className="w-[200px] min-w-[200px] snap-start sm:w-[320px] sm:min-w-[320px]"
            key={doctor.id}
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
