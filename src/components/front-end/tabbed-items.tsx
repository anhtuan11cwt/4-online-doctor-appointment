"use client";

import { Activity, Microscope, Stethoscope, User } from "lucide-react";
import { useState } from "react";
import LinkCard from "./link-card";

const services = [
  { slug: "kham-tong-quat", title: "Khám tổng quát" },
  { slug: "tu-van-truc-tuyen", title: "Tư vấn trực tuyến" },
  { slug: "cap-don-thuoc", title: "Cấp đơn thuốc" },
  { slug: "khan-cap", title: "Khẩn cấp" },
  { slug: "tri-lieu", title: "Trị liệu" },
  { slug: "xet-nghiem", title: "Xét nghiệm" },
];

const doctors = [
  { slug: "bac-si-kham-chung", title: "Bác sĩ khám chung" },
  { slug: "bac-si-tam-than", title: "Bác sĩ tâm thần" },
  { slug: "bac-si-nhi", title: "Bác sĩ nhi" },
  { slug: "bac-si-da-lieu", title: "Bác sĩ da liễu" },
  { slug: "bac-si-than-kinh", title: "Bác sĩ thần kinh" },
  { slug: "bac-si-noi-tiet", title: "Bác sĩ nội tiết" },
];

const specialists = [
  { slug: "noi-khoa", title: "Nội khoa" },
  { slug: "ngoai-khoa", title: "Ngoại khoa" },
  { slug: "san-phu-khoa", title: "Sản phụ khoa" },
  { slug: "mat", title: "Mắt" },
  { slug: "tai-mui-hong", title: "Tai mũi họng" },
  { slug: "rang-ham-mat", title: "Răng hàm mặt" },
];

const symptoms = [
  { slug: "lo-au", title: "Lo âu" },
  { slug: "tram-cam", title: "Trầm cảm" },
  { slug: "dau-dai-dang", title: "Đau dai dẳng" },
  { slug: "mat-ngu", title: "Mất ngủ" },
  { slug: "sot", title: "Sốt" },
  { slug: "ho", title: "Ho" },
];

const tabs = [
  {
    content: "services",
    icon: Stethoscope,
    title: "Dịch vụ phổ biến",
  },
  {
    content: "doctors",
    icon: User,
    title: "Bác sĩ",
  },
  {
    content: "specialists",
    icon: Microscope,
    title: "Chuyên khoa",
  },
  {
    content: "symptoms",
    icon: Activity,
    title: "Triệu chứng",
  },
];

function getTabContent(activeTab: string) {
  switch (activeTab) {
    case "services":
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
          {services.map((s) => (
            <LinkCard
              href={`/services/${s.slug}`}
              key={s.slug}
              title={s.title}
            />
          ))}
        </div>
      );
    case "doctors":
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
          {doctors.map((d) => (
            <LinkCard
              className="bg-teal-800"
              href="/doctors"
              key={d.slug}
              title={d.title}
            />
          ))}
        </div>
      );
    case "specialists":
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
          {specialists.map((s) => (
            <LinkCard
              className="bg-blue-900"
              href="/doctors"
              key={s.slug}
              title={s.title}
            />
          ))}
        </div>
      );
    case "symptoms":
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
          {symptoms.map((s) => (
            <LinkCard
              className="bg-purple-950"
              href="/doctors"
              key={s.slug}
              title={s.title}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function TabbedItems() {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="pb-8 text-center font-bold text-2xl text-gray-900">
          Duyệt theo
        </h2>

        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  className={`flex items-center gap-2 rounded-md px-4 py-2.5 font-medium text-sm transition-colors ${
                    activeTab === tab.content
                      ? "bg-blue-700 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  key={tab.content}
                  onClick={() => setActiveTab(tab.content)}
                  type="button"
                >
                  <Icon className="h-4 w-4" />
                  {tab.title}
                </button>
              );
            })}
          </div>

          <div>{getTabContent(activeTab)}</div>
        </div>
      </div>
    </section>
  );
}
