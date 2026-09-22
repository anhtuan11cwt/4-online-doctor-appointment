"use client";

import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DayAvailabilityForm from "./day-availability-form";

type DoctorProfile = {
  id: string;
  availability?: {
    id: string;
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
  } | null;
};

type AvailabilitySettingsProps = {
  profile: DoctorProfile;
};

const days = [
  { dayKey: "monday", title: "Thứ 2", value: "monday" },
  { dayKey: "tuesday", title: "Thứ 3", value: "tuesday" },
  { dayKey: "wednesday", title: "Thứ 4", value: "wednesday" },
  { dayKey: "thursday", title: "Thứ 5", value: "thursday" },
  { dayKey: "friday", title: "Thứ 6", value: "friday" },
  { dayKey: "saturday", title: "Thứ 7", value: "saturday" },
  { dayKey: "sunday", title: "Chủ nhật", value: "sunday" },
];

export default function AvailabilitySettings({
  profile,
}: AvailabilitySettingsProps) {
  const router = useRouter();
  const availability = profile.availability;

  const handleSave = () => {
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-500 text-sm dark:text-gray-400">
        Vui lòng thiết lập thời gian khả dụng cho cả tuần.
      </p>

      <Tabs className="w-full" defaultValue="monday">
        <TabsList
          className="w-full justify-start gap-1 overflow-x-auto sm:gap-2"
          variant="line"
        >
          {days.map((day) => (
            <TabsTrigger
              className="whitespace-nowrap px-3 text-xs sm:px-4 sm:text-sm"
              key={day.value}
              value={day.value}
            >
              {day.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map((day) => (
          <TabsContent className="py-3" key={day.value} value={day.value}>
            <DayAvailabilityForm
              availabilityId={availability?.id}
              dayKey={day.dayKey}
              dayName={day.title}
              doctorProfileId={profile.id}
              onSave={handleSave}
              selectedTimes={
                availability
                  ? ((availability as unknown as Record<string, string[]>)[
                      day.dayKey
                    ] ?? [])
                  : []
              }
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
