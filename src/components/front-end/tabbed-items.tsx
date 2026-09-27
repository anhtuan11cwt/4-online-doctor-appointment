"use client";

import type { Service, Specialty, Symptom } from "@prisma/client";
import { Activity, Microscope, Stethoscope, User } from "lucide-react";
import { useState } from "react";
import LinkCard from "./link-card";
import LinkedCards from "./linked-cards";
import ServiceList from "./services/service-list";
import SymptomCards from "./symptom-cards";

const doctors = [
  { slug: "bac-si-kham-chung", title: "Bác sĩ khám chung" },
  { slug: "bac-si-tam-than", title: "Bác sĩ tâm thần" },
  { slug: "bac-si-nhi", title: "Bác sĩ nhi" },
  { slug: "bac-si-da-lieu", title: "Bác sĩ da liễu" },
  { slug: "bac-si-than-kinh", title: "Bác sĩ thần kinh" },
  { slug: "bac-si-noi-tiet", title: "Bác sĩ nội tiết" },
];

const tabs = [
  { content: "services", icon: Stethoscope, title: "Dịch vụ phổ biến" },
  { content: "doctors", icon: User, title: "Bác sĩ" },
  { content: "specialists", icon: Microscope, title: "Chuyên khoa" },
  { content: "symptoms", icon: Activity, title: "Triệu chứng" },
];

type TabbedItemsProps = {
  services?: Service[] | null;
  specialties?: Specialty[] | null;
  symptoms?: Symptom[] | null;
};

export default function TabbedItems({
  services,
  specialties,
  symptoms,
}: TabbedItemsProps) {
  const [activeTab, setActiveTab] = useState("services");

  const getTabContent = () => {
    switch (activeTab) {
      case "services":
        return <ServiceList data={services} />;
      case "doctors":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8">
            {doctors.map((doctor) => (
              <LinkCard
                className="bg-teal-800"
                href="/doctors"
                key={doctor.slug}
                title={doctor.title}
              />
            ))}
          </div>
        );
      case "specialists":
        return <LinkedCards specialties={specialties} />;
      case "symptoms":
        return <SymptomCards symptoms={symptoms} />;
      default:
        return null;
    }
  };

  return (
    <section className="bg-slate-50 py-10 min-[360px]:py-16 dark:bg-slate-900">
      <div className="container mx-auto px-3 sm:px-6 min-[360px]:px-4">
        <h2 className="pb-6 text-center font-bold text-2xl text-gray-900 min-[360px]:pb-8 min-[360px]:text-3xl dark:text-slate-100">
          Duyệt theo
        </h2>

        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  className={`flex max-w-full items-center gap-1.5 break-words rounded-md border px-3 py-2 font-medium text-xs transition-colors sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm ${
                    activeTab === tab.content
                      ? "border-slate-100 bg-blue-500 text-white"
                      : "border-slate-100 bg-white text-gray-700 hover:bg-gray-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
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

          <div className="mt-8">{getTabContent()}</div>
        </div>
      </div>
    </section>
  );
}
