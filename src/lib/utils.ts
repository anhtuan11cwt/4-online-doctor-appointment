import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { timesArray } from "@/config/constants";
import type { DoctorProfileAvailability } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DAYS_OF_WEEK: (keyof DoctorProfileAvailability)[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function getDayName(
  date: Date = new Date(),
): keyof DoctorProfileAvailability {
  return DAYS_OF_WEEK[date.getDay()];
}

export function getDayFromDate(
  date?: Date | string | null,
): keyof DoctorProfileAvailability | undefined {
  if (!date) return undefined;
  const parsed = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return DAYS_OF_WEEK[parsed.getDay()];
}

export function getLongDate(date?: Date | string | null): string {
  if (!date) return "";
  const parsed = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "numeric",
    month: "long",
    weekday: "long",
  }).format(parsed);
}

export function getTimeLabel(time: string): string {
  return timesArray.find((item) => item.value === time)?.label ?? time;
}
