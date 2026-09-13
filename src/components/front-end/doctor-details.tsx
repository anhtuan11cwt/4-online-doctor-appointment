"use client";

import { useState } from "react";
import Availability from "./availability";

function ServiceDetails() {
  return (
    <div className="px-4 py-4 sm:px-8 sm:py-6">
      <h3 className="mb-3 font-semibold text-base text-gray-900 sm:mb-4 sm:text-lg dark:text-white">
        Chi tiết dịch vụ
      </h3>
      <div className="space-y-3 sm:space-y-4">
        <div className="rounded-md border border-gray-200 p-3 sm:p-4 dark:border-gray-700 dark:bg-slate-800">
          <h4 className="font-medium text-gray-900 text-sm sm:text-base dark:text-white">
            Khám qua video
          </h4>
          <p className="mt-1 text-gray-500 text-xs sm:text-sm dark:text-gray-400">
            Tư vấn với bác sĩ qua cuộc gọi video an toàn từ nhà.
          </p>
        </div>
        <div className="rounded-md border border-gray-200 p-3 sm:p-4 dark:border-gray-700 dark:bg-slate-800">
          <h4 className="font-medium text-gray-900 text-sm sm:text-base dark:text-white">
            Về bác sĩ
          </h4>
          <p className="mt-1 text-gray-500 text-xs sm:text-sm dark:text-gray-400">
            Chuyên gia y tế giàu kinh nghiệm cam kết cung cấp dịch vụ chăm sóc
            sức khỏe toàn diện.
          </p>
        </div>
        <div className="rounded-md border border-gray-200 p-3 sm:p-4 dark:border-gray-700 dark:bg-slate-800">
          <h4 className="font-medium text-gray-900 text-sm sm:text-base dark:text-white">
            Chứng chỉ
          </h4>
          <p className="mt-1 text-gray-500 text-xs sm:text-sm dark:text-gray-400">
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
                ? "border-blue-600 bg-white text-blue-600 dark:bg-slate-100"
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
                ? "border-blue-600 bg-white text-blue-600 dark:bg-slate-100"
                : "border-transparent bg-blue-600 text-white"
            }`}
            onClick={() => setIsActive("availability")}
            type="button"
          >
            Lịch hẹn
          </button>
        </div>
      </div>

      {isActive === "availability" ? <Availability /> : <ServiceDetails />}
    </div>
  );
}
