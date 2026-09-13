"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FixedBookButton({ fees }: { fees: number }) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 bg-white shadow-2xl dark:bg-slate-700">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row sm:px-6 sm:py-6">
        <div className="flex w-full items-center justify-between sm:w-auto sm:justify-start sm:gap-6">
          <div>
            <p className="font-semibold text-base text-gray-900 sm:text-lg dark:text-white">
              {fees.toLocaleString("vi-VN")}đ
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">mỗi lần khám</p>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">Tháng 9/2026</p>
        </div>
        <Button
          className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-slate-900 text-sm uppercase tracking-widest sm:w-auto sm:px-6 dark:text-white"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          Đặt lịch
        </Button>
      </div>
    </div>
  );
}
