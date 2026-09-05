"use client";

import { Pill } from "lucide-react";
import SearchBar from "@/components/front-end/searchbar";
import TransitionText from "@/components/front-end/transition-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const texts = [
  "bác sĩ nghề nghiệp",
  "bác sĩ vật lý trị liệu",
  "bác sĩ châm cứu",
  "bác sĩ trị liệu ngôn ngữ",
  "bác sĩ massage",
];

export default function Hero() {
  return (
    <section className="mt-[52px] bg-blue-950 pt-14 pb-12 sm:mt-[72px] sm:pt-20 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <Badge
          className="mb-4 border-blue-400 bg-blue-900 text-blue-200"
          variant="outline"
        >
          Được 10,000+ bệnh nhân tin tưởng
        </Badge>

        <h1 className="font-bold text-3xl text-gray-50 tracking-tight sm:text-5xl lg:text-6xl">
          Đặt lịch với <TransitionText className="text-blue-400" text={texts} />
          <br />
          ngay
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400 sm:mt-6 sm:text-lg">
          Tìm và đặt lịch hẹn với các bác sĩ hàng đầu trong khu vực của bạn.
          Chăm sóc sức khỏe tinh thần chất lượng cao, dễ tiếp cận và tiện lợi.
        </p>

        <div className="mt-8 sm:mt-10">
          <SearchBar />
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            className="w-full bg-blue-600 px-8 py-3 text-gray-50 hover:bg-blue-700 sm:w-auto"
            variant="default"
          >
            Cần bác sĩ khẩn cấp
          </Button>
          <Button
            className="w-full border-gray-300 bg-white px-8 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-950 sm:w-auto"
            variant="outline"
          >
            <Pill className="mr-2 h-4 w-4 flex-shrink-0 text-blue-500" /> Tôi
            cần được cấp lại đơn thuốc
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row sm:gap-8">
          <div className="flex flex-col items-center">
            <span className="font-bold text-2xl text-gray-50">600+</span>
            <span className="text-gray-400 text-sm">Bác sĩ đang hoạt động</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-2xl text-gray-50">1,800+</span>
            <span className="text-gray-400 text-sm">Bệnh nhân</span>
          </div>
        </div>
      </div>
    </section>
  );
}
