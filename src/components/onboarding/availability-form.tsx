"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateOnboardingData } from "@/actions/users";
import RadioInput, {
  type RadioOption,
} from "@/components/form-inputs/radio-input";
import TextInput from "@/components/form-inputs/text-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { cn } from "@/lib/utils";
import { type AvailabilitySchema, availabilitySchema } from "@/lib/validations";

const availabilityTypeOptions: RadioOption[] = [
  {
    label: "Hàng tuần",
    value: "weekly",
  },
  {
    label: "Ngày cụ thể",
    value: "specificDates",
  },
];

const daysOfWeek = [
  { key: "monday", label: "Thứ 2" },
  { key: "tuesday", label: "Thứ 3" },
  { key: "wednesday", label: "Thứ 4" },
  { key: "thursday", label: "Thứ 5" },
  { key: "friday", label: "Thứ 6" },
  { key: "saturday", label: "Thứ 7" },
  { key: "sunday", label: "Chủ nhật" },
] as const;

const hours = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const periodOptions = [
  { label: "SA", value: "AM" },
  { label: "CH", value: "PM" },
];

function parseTimeToWindow(time: string): {
  hour: string;
  minute: string;
  period: string;
} {
  const [h, m] = time.split(":");
  let hour = Number.parseInt(h, 10);
  const period = hour >= 12 ? "PM" : "AM";
  if (period === "PM" && hour !== 12) hour -= 12;
  if (period === "AM" && hour === 0) hour = 12;
  return { hour: String(hour).padStart(2, "0"), minute: m, period };
}

function initDaySchedules(
  savedSchedule?: {
    day: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
  }[],
): DaySchedule[] {
  const scheduleMap = new Map<string, { startTime: string; endTime: string }>();
  if (savedSchedule) {
    for (const s of savedSchedule) {
      if (s.isActive)
        scheduleMap.set(s.day, { endTime: s.endTime, startTime: s.startTime });
    }
  }

  return daysOfWeek.map((d) => {
    const saved = scheduleMap.get(d.key);
    if (!saved) {
      return { day: d.key, isActive: false, windows: [createDefaultWindow()] };
    }
    const start = parseTimeToWindow(saved.startTime);
    const end = parseTimeToWindow(saved.endTime);
    return {
      day: d.key,
      isActive: true,
      windows: [
        {
          endHour: end.hour,
          endMinute: end.minute,
          endPeriod: end.period,
          id: `win-${Date.now()}-${d.key}`,
          startHour: start.hour,
          startMinute: start.minute,
          startPeriod: start.period,
        },
      ],
    };
  });
}

let windowIdCounter = 0;
function createDefaultWindow(): TimeWindow {
  windowIdCounter += 1;
  return {
    endHour: "05",
    endMinute: "00",
    endPeriod: "PM",
    id: `win-${Date.now()}-${windowIdCounter}`,
    startHour: "09",
    startMinute: "00",
    startPeriod: "AM",
  };
}

type TimeWindow = {
  id: string;
  startHour: string;
  startMinute: string;
  startPeriod: string;
  endHour: string;
  endMinute: string;
  endPeriod: string;
};

type DaySchedule = {
  day: string;
  isActive: boolean;
  windows: TimeWindow[];
};

export default function AvailabilityForm({
  id,
  savedData,
  title = "Thời gian rảnh",
  description = "Vui lòng thiết lập lịch trình khả dụng của bạn",
  onComplete,
}: {
  id: string;
  savedData?: Record<string, string>;
  title?: string;
  description?: string;
  onComplete?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [daySchedules, setDaySchedules] = useState<DaySchedule[]>(() =>
    initDaySchedules(
      savedData?.schedule as unknown as
        | {
            day: string;
            startTime: string;
            endTime: string;
            isActive: boolean;
          }[]
        | undefined,
    ),
  );
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AvailabilitySchema>({
    defaultValues: {
      availabilityType:
        (savedData?.availabilityType as "weekly" | "specificDates") ?? "weekly",
      duration: savedData?.duration ? Number(savedData.duration) : 30,
      schedule: [],
      timezone: savedData?.timezone ?? "Asia/Ho_Chi_Minh",
    },
    resolver: zodResolver(availabilitySchema),
  });

  const toggleDay = (index: number) => {
    setDaySchedules((prev) =>
      prev.map((schedule, i) =>
        i === index ? { ...schedule, isActive: !schedule.isActive } : schedule,
      ),
    );
  };

  const updateWindow = (
    dayIndex: number,
    windowIndex: number,
    field: keyof TimeWindow,
    value: string,
  ) => {
    setDaySchedules((prev) =>
      prev.map((schedule, i) =>
        i === dayIndex
          ? {
              ...schedule,
              windows: schedule.windows.map((w, j) =>
                j === windowIndex ? { ...w, [field]: value } : w,
              ),
            }
          : schedule,
      ),
    );
  };

  const addWindow = (dayIndex: number) => {
    setDaySchedules((prev) =>
      prev.map((schedule, i) =>
        i === dayIndex
          ? {
              ...schedule,
              windows: [...schedule.windows, createDefaultWindow()],
            }
          : schedule,
      ),
    );
  };

  const removeWindow = (dayIndex: number, windowIndex: number) => {
    setDaySchedules((prev) =>
      prev.map((schedule, i) =>
        i === dayIndex
          ? {
              ...schedule,
              windows: schedule.windows.filter((_, j) => j !== windowIndex),
            }
          : schedule,
      ),
    );
  };

  const onSubmit = async (data: AvailabilitySchema) => {
    setIsLoading(true);
    try {
      const activeSchedules = daySchedules
        .filter((s) => s.isActive)
        .flatMap((s) =>
          s.windows.map((w) => {
            let startH = Number.parseInt(w.startHour, 10);
            if (w.startPeriod === "PM" && startH !== 12) startH += 12;
            if (w.startPeriod === "AM" && startH === 12) startH = 0;
            const startTime = `${String(startH).padStart(2, "0")}:${w.startMinute}`;

            let endH = Number.parseInt(w.endHour, 10);
            if (w.endPeriod === "PM" && endH !== 12) endH += 12;
            if (w.endPeriod === "AM" && endH === 12) endH = 0;
            const endTime = `${String(endH).padStart(2, "0")}:${w.endMinute}`;

            return {
              day: s.day,
              endTime,
              isActive: true,
              startTime,
            };
          }),
        );

      if (activeSchedules.length === 0) {
        toast.error("Vui lòng chọn ít nhất 1 lịch trình");
        setIsLoading(false);
        return;
      }

      const formattedData = {
        ...data,
        schedule: activeSchedules,
      };
      const result = await updateOnboardingData(
        id,
        "availability",
        formattedData,
      );
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Lưu lịch trình thành công!");
        onComplete?.();
      }
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    const activeSchedules = daySchedules
      .filter((s) => s.isActive)
      .flatMap((s) =>
        s.windows.map((w) => {
          let startH = Number.parseInt(w.startHour, 10);
          if (w.startPeriod === "PM" && startH !== 12) startH += 12;
          if (w.startPeriod === "AM" && startH === 12) startH = 0;
          const startTime = `${String(startH).padStart(2, "0")}:${w.startMinute}`;

          let endH = Number.parseInt(w.endHour, 10);
          if (w.endPeriod === "PM" && endH !== 12) endH += 12;
          if (w.endPeriod === "AM" && endH === 12) endH = 0;
          const endTime = `${String(endH).padStart(2, "0")}:${w.endMinute}`;

          return {
            day: s.day as
              | "monday"
              | "tuesday"
              | "wednesday"
              | "thursday"
              | "friday"
              | "saturday"
              | "sunday",
            endTime,
            isActive: true,
            startTime,
          };
        }),
      );

    if (activeSchedules.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 lịch trình");
      return;
    }

    setValue("schedule", activeSchedules, { shouldValidate: true });
    handleSubmit(onSubmit)();
  };

  if (!isMounted) {
    return (
      <div className="space-y-4">
        <div className="mb-6 border-b pb-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="mt-1 text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="space-y-4">
          {["duration", "type"].map((field) => (
            <div className="space-y-2" key={field}>
              <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-10 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit();
      }}
    >
      <div className="mb-6 border-b pb-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="mt-1 text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="space-y-6">
        <TextInput
          disabled={isLoading}
          errors={errors}
          label="Thời lượng mỗi cuộc hẹn (phút)"
          name="duration"
          onChange={(e) => {
            const val = e.target.value;
            setValue(
              "duration",
              val === "" ? (undefined as unknown as number) : Number(val),
              { shouldValidate: true },
            );
          }}
          type="number"
          value={String(savedData?.duration ?? 30)}
        />

        <RadioInput
          disabled={isLoading}
          errors={errors}
          name="availabilityType"
          options={availabilityTypeOptions}
          register={register}
          title="Bạn muốn thiết lập lịch rảnh khi nào?"
        />

        <div
          className={cn(
            "rounded-lg bg-gray-100 p-4 dark:bg-gray-800",
            isLoading && "pointer-events-none opacity-50",
          )}
        >
          <h4 className="mb-4 font-semibold text-sm">
            Thiết lập lịch hàng tuần của bạn bên dưới
          </h4>

          <div className="space-y-4">
            {daysOfWeek.map((day, dayIndex) => {
              const schedule = daySchedules[dayIndex];
              return (
                <div
                  className="rounded-md border bg-white p-3 dark:bg-slate-900"
                  key={day.key}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <Checkbox
                      checked={schedule.isActive}
                      disabled={isLoading}
                      onCheckedChange={() => toggleDay(dayIndex)}
                    />
                    <span className="font-medium text-sm">{day.label}</span>
                  </div>

                  {schedule.isActive && (
                    <div className="space-y-3 pl-7">
                      {schedule.windows.map((window, windowIndex) => (
                        <div
                          className="flex flex-wrap items-center gap-2"
                          key={window.id}
                        >
                          <span className="text-muted-foreground text-xs">
                            Từ:
                          </span>
                          <NativeSelect
                            disabled={isLoading}
                            onChange={(e) =>
                              updateWindow(
                                dayIndex,
                                windowIndex,
                                "startHour",
                                e.target.value,
                              )
                            }
                            value={window.startHour}
                          >
                            {hours.map((h) => (
                              <NativeSelectOption key={h} value={h}>
                                {h}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>

                          <span className="text-muted-foreground text-xs">
                            :
                          </span>

                          <NativeSelect
                            disabled={isLoading}
                            onChange={(e) =>
                              updateWindow(
                                dayIndex,
                                windowIndex,
                                "startMinute",
                                e.target.value,
                              )
                            }
                            value={window.startMinute}
                          >
                            {minutes.map((m) => (
                              <NativeSelectOption key={m} value={m}>
                                {m}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>

                          <NativeSelect
                            disabled={isLoading}
                            onChange={(e) =>
                              updateWindow(
                                dayIndex,
                                windowIndex,
                                "startPeriod",
                                e.target.value,
                              )
                            }
                            value={window.startPeriod}
                          >
                            {periodOptions.map((p) => (
                              <NativeSelectOption key={p.value} value={p.value}>
                                {p.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>

                          <span className="text-muted-foreground text-xs">
                            đến:
                          </span>

                          <NativeSelect
                            disabled={isLoading}
                            onChange={(e) =>
                              updateWindow(
                                dayIndex,
                                windowIndex,
                                "endHour",
                                e.target.value,
                              )
                            }
                            value={window.endHour}
                          >
                            {hours.map((h) => (
                              <NativeSelectOption key={h} value={h}>
                                {h}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>

                          <span className="text-muted-foreground text-xs">
                            :
                          </span>

                          <NativeSelect
                            disabled={isLoading}
                            onChange={(e) =>
                              updateWindow(
                                dayIndex,
                                windowIndex,
                                "endMinute",
                                e.target.value,
                              )
                            }
                            value={window.endMinute}
                          >
                            {minutes.map((m) => (
                              <NativeSelectOption key={m} value={m}>
                                {m}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>

                          <NativeSelect
                            disabled={isLoading}
                            onChange={(e) =>
                              updateWindow(
                                dayIndex,
                                windowIndex,
                                "endPeriod",
                                e.target.value,
                              )
                            }
                            value={window.endPeriod}
                          >
                            {periodOptions.map((p) => (
                              <NativeSelectOption key={p.value} value={p.value}>
                                {p.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>

                          {schedule.windows.length > 1 && (
                            <Button
                              disabled={isLoading}
                              onClick={() =>
                                removeWindow(dayIndex, windowIndex)
                              }
                              size="icon"
                              type="button"
                              variant="ghost"
                            >
                              <X className="size-4 text-red-500" />
                            </Button>
                          )}
                        </div>
                      ))}

                      <Button
                        disabled={isLoading}
                        onClick={() => addWindow(dayIndex)}
                        size="sm"
                        type="button"
                        variant="ghost"
                      >
                        <Plus className="mr-1 size-4" />
                        Thêm khung giờ
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="px-8" disabled={isLoading} type="submit">
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isLoading ? "Đang lưu, vui lòng chờ..." : "Lưu và hoàn tất"}
        </Button>
      </div>
    </form>
  );
}
