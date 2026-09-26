"use client";

import { CalendarIcon } from "lucide-react";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface DatePickerInputProps {
  date: Date | undefined;
  defaultMonth?: Date;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
  setDate: (date: Date | undefined) => void;
  title: string;
}

export default function DatePickerInput({
  date,
  setDate,
  title,
  defaultMonth,
  minDate,
  maxDate,
  disabled = false,
}: DatePickerInputProps) {
  return (
    <div className="grid gap-2">
      <Label>{title}</Label>
      <DatePicker
        calendarIcon={<CalendarIcon aria-hidden className="size-4" />}
        calendarProps={{ defaultActiveStartDate: date ?? defaultMonth }}
        className={cn(
          "date-picker-input relative z-50 w-full",
          disabled && "pointer-events-none opacity-50",
        )}
        clearIcon={null}
        dayPlaceholder=""
        disabled={disabled}
        format="d MMMM yyyy"
        locale="vi"
        maxDate={maxDate}
        minDate={minDate}
        monthPlaceholder=""
        onChange={(value) => setDate(value instanceof Date ? value : undefined)}
        showLeadingZeros
        value={date ?? null}
        yearPlaceholder=""
      />
    </div>
  );
}
