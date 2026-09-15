"use client";

import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const [open, setOpen] = useState(false);

  return (
    <div className="grid gap-2">
      <Label>{title}</Label>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
            disabled={disabled}
            variant="outline"
          >
            <CalendarIcon className="mr-2 size-4" />
            {date ? (
              format(date, "PPP", { locale: vi })
            ) : (
              <span>Chọn ngày</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            defaultMonth={date ?? defaultMonth}
            disabled={(calendarDate) => {
              if (minDate && calendarDate < minDate) return true;
              if (maxDate && calendarDate > maxDate) return true;
              return false;
            }}
            locale={vi}
            mode="single"
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setOpen(false);
            }}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
