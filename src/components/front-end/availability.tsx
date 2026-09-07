"use client";

import { vi } from "date-fns/locale";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Calendar } from "@/components/ui/calendar";

const timeSlots = [
  "9:00 AM",
  "9:15 AM",
  "9:30 AM",
  "9:45 AM",
  "10:00 AM",
  "10:15 AM",
  "10:30 AM",
  "10:45 AM",
  "11:00 AM",
  "11:15 AM",
  "2:00 PM",
  "2:15 PM",
  "2:30 PM",
  "2:45 PM",
  "3:00 PM",
];

const vietnameseDays: Record<string, string> = {
  Fri: "T6",
  Mon: "T2",
  Sat: "T7",
  Sun: "CN",
  Thu: "T5",
  Tue: "T3",
  Wed: "T4",
};

const vietnameseMonths: Record<string, string> = {
  Apr: "Th04",
  Aug: "Th08",
  Dec: "Th12",
  Feb: "Th02",
  Jan: "Th01",
  Jul: "Th07",
  Jun: "Th06",
  Mar: "Th03",
  May: "Th05",
  Nov: "Th11",
  Oct: "Th10",
  Sep: "Th09",
};

let _clientDate: Date | undefined;

function getClientDate() {
  if (!_clientDate) _clientDate = new Date();
  return _clientDate;
}

function parseTimeToMinutes(time: string): number {
  const [timePart, period] = time.split(" ");
  const [hoursStr, minutesStr] = timePart.split(":");
  const minutes = Number(minutesStr);
  let hours = Number(hoursStr);
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function isDateInPast(date: Date, today: Date): boolean {
  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);
  const compare = new Date(date);
  compare.setHours(0, 0, 0, 0);
  return compare < todayStart;
}

export default function Availability() {
  const clientDate = useSyncExternalStore(
    () => () => {},
    getClientDate,
    () => undefined as Date | undefined,
  );
  const [bookDate, setBookDate] = useState<Date | undefined>(clientDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const today = useMemo(() => new Date(), []);

  const isToday = useMemo(() => {
    if (!bookDate) return false;
    return (
      bookDate.getDate() === today.getDate() &&
      bookDate.getMonth() === today.getMonth() &&
      bookDate.getFullYear() === today.getFullYear()
    );
  }, [bookDate, today]);

  const availableTimeSlots = useMemo(() => {
    if (!isToday) return timeSlots;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return timeSlots.filter((time) => {
      const slotMinutes = parseTimeToMinutes(time);
      return slotMinutes > currentMinutes;
    });
  }, [isToday]);

  const formatDate = (date: Date): string => {
    const dateStr = date.toString();
    const parts = dateStr.split(" ");
    const dayEN = parts[0];
    const monthEN = parts[1];
    const dateNum = parts[2];
    const dayVN = vietnameseDays[dayEN] || dayEN;
    const monthVN = vietnameseMonths[monthEN] || monthEN;
    const gmtParts = dateStr.split("GMT");
    const gmtOffset = gmtParts[1]?.split(" ")[0] || "";
    return `${dayVN}, ${dateNum}/${monthVN} GMT${gmtOffset}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setBookDate(date);
    setSelectedTime(null);
  };

  if (!clientDate) {
    return (
      <div className="mb-[100px] px-4 py-4 sm:px-8 sm:py-6">
        <h2 className="mb-4 font-bold text-lg text-slate-700 sm:text-xl">
          Chọn ngày và giờ
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="h-[300px] w-[280px] animate-pulse rounded-md border bg-gray-100" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="mb-4 h-[48px] animate-pulse rounded border bg-gray-100" />
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((time) => (
                <div
                  className="h-[36px] animate-pulse rounded-md border bg-gray-100"
                  key={time}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-[100px] px-4 py-4 sm:px-8 sm:py-6">
      <h2 className="mb-4 font-bold text-lg text-slate-700 sm:text-xl">
        Chọn ngày và giờ
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <Calendar
            className="rounded-md border"
            disabled={(date) => isDateInPast(date, today)}
            locale={vi}
            mode="single"
            onSelect={handleDateSelect}
            selected={bookDate}
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          {bookDate && (
            <div className="mb-4 border border-blue-500 px-4 py-3 text-center">
              <p className="font-bold text-slate-700 text-sm uppercase tracking-wider">
                {formatDate(bookDate)}
              </p>
            </div>
          )}

          {isToday && availableTimeSlots.length === 0 && (
            <p className="mb-4 text-center text-gray-500 text-sm">
              Không có khung giờ khả dụng cho hôm nay. Vui lòng chọn ngày khác.
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            {availableTimeSlots.map((time) => (
              <button
                className={`rounded-md border px-3 py-2 font-medium text-xs transition-colors sm:text-sm ${
                  selectedTime === time
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-200 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
                key={time}
                onClick={() => setSelectedTime(time)}
                type="button"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
