import { getDayName } from "@/lib/utils";
import type { DoctorProfileAvailability } from "@/types";

const DAY_LABELS: Record<keyof DoctorProfileAvailability, string> = {
  friday: "Thứ Sáu",
  monday: "Thứ Hai",
  saturday: "Thứ Bảy",
  sunday: "Chủ Nhật",
  thursday: "Thứ Năm",
  tuesday: "Thứ Ba",
  wednesday: "Thứ Tư",
};

const MONTH_LABELS = [
  "Một",
  "Hai",
  "Ba",
  "Tư",
  "Năm",
  "Sáu",
  "Bảy",
  "Tám",
  "Chín",
  "Mười",
  "Mười Một",
  "Mười Hai",
];

export function getTodayDayKey(
  date: Date = new Date(),
): keyof DoctorProfileAvailability {
  return getDayName(date);
}

export function getDayLabel(dayKey: keyof DoctorProfileAvailability): string {
  return DAY_LABELS[dayKey];
}

export function getFormattedShortDate(date: Date = new Date()): string {
  const dayLabel = DAY_LABELS[getTodayDayKey(date)];
  const monthLabel = MONTH_LABELS[date.getMonth()];
  return `${dayLabel}, ${date.getDate()} Tháng ${monthLabel}`;
}
