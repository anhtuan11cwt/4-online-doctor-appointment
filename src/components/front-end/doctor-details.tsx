"use client";

import { useState } from "react";

function AvailabilityDetails() {
  return (
    <div className="px-4 py-4 sm:px-8 sm:py-6">
      <h3 className="mb-3 font-semibold text-base text-gray-900 sm:mb-4 sm:text-lg">
        Lịch hẹn khả dụng
      </h3>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5">
        {[
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
        ].map((time) => (
          <span
            className="cursor-pointer rounded-md border border-gray-200 bg-blue-50 px-2 py-1.5 text-center font-medium text-blue-600 text-xs transition-colors hover:bg-blue-600 hover:text-white sm:px-3 sm:py-2 sm:text-sm"
            key={time}
          >
            {time}
          </span>
        ))}
      </div>
    </div>
  );
}

function ServiceDetails() {
  return (
    <div className="px-4 py-4 sm:px-8 sm:py-6">
      <h3 className="mb-3 font-semibold text-base text-gray-900 sm:mb-4 sm:text-lg">
        Chi tiết dịch vụ
      </h3>
      <div className="space-y-3 sm:space-y-4">
        <div className="rounded-md border border-gray-200 p-3 sm:p-4">
          <h4 className="font-medium text-gray-900 text-sm sm:text-base">
            Khám qua video
          </h4>
          <p className="mt-1 text-gray-500 text-xs sm:text-sm">
            Tư vấn với bác sĩ qua cuộc gọi video an toàn từ nhà.
          </p>
        </div>
        <div className="rounded-md border border-gray-200 p-3 sm:p-4">
          <h4 className="font-medium text-gray-900 text-sm sm:text-base">
            Về bác sĩ
          </h4>
          <p className="mt-1 text-gray-500 text-xs sm:text-sm">
            Chuyên gia y tế giàu kinh nghiệm cam kết cung cấp dịch vụ chăm sóc
            sức khỏe toàn diện.
          </p>
        </div>
        <div className="rounded-md border border-gray-200 p-3 sm:p-4">
          <h4 className="font-medium text-gray-900 text-sm sm:text-base">
            Chứng chỉ
          </h4>
          <p className="mt-1 text-gray-500 text-xs sm:text-sm">
            Bác sĩ được chứng nhận với đào tạo chuyên môn và nhiều năm kinh
            nghiệm lâm sàng.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DoctorDetails() {
  const [isActive, setIsActive] = useState("availability");

  return (
    <div>
      <div className="bg-blue-600 px-4 sm:px-8">
        <div className="flex items-center">
          <button
            className={`w-full border px-3 py-3 font-medium text-xs uppercase tracking-widest transition-colors sm:px-8 sm:py-4 sm:text-sm ${
              isActive === "details"
                ? "border-blue-600 bg-white text-blue-600"
                : "border-transparent bg-blue-600 text-white"
            }`}
            onClick={() => setIsActive("details")}
            type="button"
          >
            Chi tiết dịch vụ
          </button>
          <button
            className={`w-full border px-3 py-3 font-medium text-xs uppercase tracking-widest transition-colors sm:px-8 sm:py-4 sm:text-sm ${
              isActive === "availability"
                ? "border-blue-600 bg-white text-blue-600"
                : "border-transparent bg-blue-600 text-white"
            }`}
            onClick={() => setIsActive("availability")}
            type="button"
          >
            Lịch hẹn
          </button>
        </div>
      </div>

      {isActive === "availability" ? (
        <AvailabilityDetails />
      ) : (
        <ServiceDetails />
      )}
    </div>
  );
}
