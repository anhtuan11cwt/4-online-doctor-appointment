"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  createAvailability,
  updateAvailabilityById,
} from "@/actions/availability";
import { Button } from "@/components/ui/button";
import { timesArray } from "@/config/constants";

type DayAvailabilityFormProps = {
  dayName: string;
  dayKey: string;
  selectedTimes: string[];
  availabilityId?: string;
  doctorProfileId?: string;
  onSave?: () => void;
};

export default function DayAvailabilityForm({
  dayName,
  dayKey,
  selectedTimes: initialTimes,
  availabilityId,
  doctorProfileId,
  onSave,
}: DayAvailabilityFormProps) {
  const [selectedTimes, setSelectedTimes] = useState<string[]>(initialTimes);
  const [loading, setLoading] = useState(false);

  const handleAddTime = (time: string) => {
    if (selectedTimes.includes(time)) {
      const timeObj = timesArray.find((t) => t.value === time);
      toast.error(`${timeObj?.label ?? time} giờ đã được thêm`);
      return;
    }
    setSelectedTimes((prev) => [...prev, time]);
  };

  const handleRemoveTime = (index: number) => {
    setSelectedTimes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddAll = () => {
    setSelectedTimes(timesArray.map((t) => t.value));
  };

  const handleClearAll = () => {
    setSelectedTimes([]);
  };

  const handleSubmit = async () => {
    if (!doctorProfileId) {
      toast.error("Không tìm thấy thông tin bác sĩ");
      return;
    }

    setLoading(true);
    try {
      const data = {
        doctorProfileId,
        [dayKey]: selectedTimes,
      };

      if (availabilityId) {
        await updateAvailabilityById(availabilityId, data);
      } else {
        await createAvailability(data);
      }

      toast.success("Cập nhật cài đặt thành công");
      onSave?.();
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm transition-opacity dark:border-gray-700 dark:bg-gray-800 ${loading ? "pointer-events-none opacity-50" : ""}`}
    >
      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:gap-4 sm:divide-x sm:divide-gray-200 sm:p-4 md:p-6">
        {/* Cột chọn giờ */}
        <div className="space-y-3">
          <p className="font-medium text-gray-700 text-sm dark:text-gray-300">
            Chọn các khung giờ bạn có thể hẹn trong ngày {dayName}
          </p>
          <div className="flex flex-wrap gap-2">
            {timesArray.map((time) => (
              <button
                className="flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1.5 text-xs transition-colors hover:bg-gray-50 active:bg-gray-100 sm:px-3 sm:py-2 sm:text-sm dark:border-gray-600 dark:active:bg-gray-600 dark:hover:bg-gray-700"
                disabled={loading}
                key={time.value}
                onClick={() => handleAddTime(time.value)}
                type="button"
              >
                <span>{time.label}</span>
                <Plus className="size-3.5" />
              </button>
            ))}
          </div>
          <Button
            className="border-gray-300"
            disabled={loading}
            onClick={handleAddAll}
            size="sm"
            type="button"
            variant="outline"
          >
            Chọn tất cả
          </Button>
        </div>

        {/* Cột giờ đã chọn */}
        <div className="space-y-3 sm:pl-4">
          {selectedTimes.length > 0 ? (
            <>
              <p className="font-medium text-gray-700 text-sm dark:text-gray-300">
                Giờ đã chọn
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTimes.map((time, index) => {
                  const timeObj = timesArray.find((t) => t.value === time);
                  return (
                    <button
                      className="flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-1.5 text-blue-700 text-xs transition-colors hover:bg-blue-100 active:bg-blue-200 sm:px-3 sm:py-2 sm:text-sm dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:active:bg-blue-900/70 dark:hover:bg-blue-900/50"
                      disabled={loading}
                      key={time}
                      onClick={() => handleRemoveTime(index)}
                      type="button"
                    >
                      <span>{timeObj?.label ?? time}</span>
                      <X className="size-3.5" />
                    </button>
                  );
                })}
              </div>
              <Button
                className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                disabled={loading}
                onClick={handleClearAll}
                size="sm"
                type="button"
                variant="outline"
              >
                Xóa tất cả
              </Button>
            </>
          ) : (
            <p className="text-gray-500 text-sm dark:text-gray-400">
              Chưa chọn giờ nào
            </p>
          )}
        </div>
      </div>

      {/* Nút lưu */}
      <div className="border-gray-200 border-t px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 dark:border-gray-700">
        <Button
          className="w-full bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 sm:w-auto"
          disabled={loading}
          onClick={handleSubmit}
          type="button"
        >
          {loading ? "Đang lưu..." : "Lưu cài đặt"}
        </Button>
      </div>
    </div>
  );
}
