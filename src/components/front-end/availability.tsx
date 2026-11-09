"use client";

import { vi } from "date-fns/locale";
import { MoveRight } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getDayFromDate, getLongDate, getTimeLabel } from "@/lib/utils";
import type { DoctorDetail } from "@/types";
import BookingForm from "./booking-form";

let _clientDate: Date | undefined;

function getClientDate() {
  if (!_clientDate) _clientDate = new Date();
  return _clientDate;
}

function isDateInPast(date: Date, today: Date): boolean {
  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);
  const compare = new Date(date);
  compare.setHours(0, 0, 0, 0);
  return compare < todayStart;
}

const SKELETON_SLOTS = ["1", "2", "3", "4", "5", "6", "7", "8"];

function TimeSkeleton() {
  return (
    <div className="px-3 py-4 sm:px-8 sm:py-6 min-[360px]:px-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-[300px] w-full animate-pulse rounded-md border bg-gray-100 dark:bg-slate-700" />
        <div>
          <div className="mb-4 h-[48px] animate-pulse rounded border bg-gray-100 dark:bg-slate-700" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {SKELETON_SLOTS.map((slot) => (
              <div
                className="h-[36px] animate-pulse rounded-md border bg-gray-100 dark:bg-slate-700"
                key={slot}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Availability({ doctor }: { doctor: DoctorDetail }) {
  const clientDate = useSyncExternalStore(
    () => () => {},
    getClientDate,
    () => undefined as Date | undefined,
  );
  const [pickedDate, setPickedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const date = pickedDate ?? clientDate;
  const dayKey = getDayFromDate(date);
  const times = dayKey
    ? (doctor.doctorProfile?.availability?.[dayKey] ?? [])
    : [];
  const fee = doctor.doctorProfile?.hourlyWage ?? 15000;

  const handleDateSelect = (nextDate: Date | undefined) => {
    setPickedDate(nextDate);
    setSelectedTime(null);
  };

  if (step > 1) {
    return (
      <BookingForm
        date={date}
        doctor={doctor}
        onStepChange={setStep}
        selectedTime={selectedTime}
        step={step}
      />
    );
  }

  if (!clientDate || !date) {
    return <TimeSkeleton />;
  }

  return (
    <div className="px-3 py-4 sm:px-8 sm:py-6 min-[360px]:px-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Chọn ngày */}
        <div className="rounded-md border bg-white p-2 min-[360px]:p-3 dark:border-gray-700 dark:bg-slate-800">
          <Calendar
            className="mx-auto max-w-full"
            disabled={(day) => isDateInPast(day, clientDate)}
            locale={vi}
            mode="single"
            onSelect={handleDateSelect}
            selected={date}
          />
        </div>

        {/* Chọn giờ */}
        <div className="min-w-0">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider min-[360px]:text-xs">
            Bạn đã chọn
          </span>
          <h2 className="mt-1 break-words font-semibold text-base sm:text-xl">
            {getLongDate(date)}
            {selectedTime ? ` · ${getTimeLabel(selectedTime)}` : ""}
          </h2>

          <div className="mt-3 min-[360px]:mt-4">
            {times.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 min-[360px]:gap-3">
                {times.map((time) => (
                  <Button
                    className="w-full px-1 text-xs min-[360px]:px-2.5 min-[360px]:text-sm"
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                  >
                    {getTimeLabel(time)}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="rounded-md border border-dashed p-3 text-center text-muted-foreground text-xs min-[360px]:p-4 min-[360px]:text-sm dark:border-gray-600">
                Bác sĩ chưa có lịch làm việc vào ngày này. Vui lòng chọn ngày
                khác.
              </p>
            )}
          </div>

          {/* Giá khám và nút đặt lịch */}
          <div className="mt-4 rounded-md border p-3 min-[360px]:mt-6 min-[360px]:p-4 dark:border-gray-700">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-base sm:text-lg">
                  {fee.toLocaleString("vi-VN")}đ
                </p>
                <p className="text-muted-foreground text-xs">mỗi lần khám</p>
              </div>
              <Button
                className="w-full gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 sm:w-auto"
                disabled={!selectedTime}
                onClick={() => setStep((current) => current + 1)}
                type="button"
              >
                Đặt lịch
                <MoveRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
