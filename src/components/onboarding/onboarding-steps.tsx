"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import BioDataForm from "./bio-data-form";

const steps = [
  { page: "biodata", title: "Thông tin cơ bản" },
  { page: "contact", title: "Thông tin liên hệ" },
  { page: "professional", title: "Thông tin chuyên môn" },
  { page: "education", title: "Học vấn" },
  { page: "practice", title: "Thông tin thực hành" },
  { page: "additional", title: "Thông tin bổ sung" },
  { page: "availability", title: "Thời gian rảnh" },
];

export default function OnboardingSteps({
  id,
  user,
  onboardingData,
  page,
  saved,
}: {
  id: string;
  user: { email: string; name: string | null; phone: string | null };
  onboardingData: Record<string, Record<string, unknown>>;
  page: string;
  saved?: string;
}) {
  const toastShown = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (saved === "1" && !toastShown.current) {
      toastShown.current = true;
      toast.success("Lưu thành công!");
      window.history.replaceState({}, "", `/onboarding/${id}?page=${page}`);
    }
  }, [saved, id, page]);
  const currentIndex = steps.findIndex((s) => s.page === page);
  const nextPage =
    currentIndex < steps.length - 1 ? steps[currentIndex + 1].page : null;

  const renderForm = () => {
    switch (page) {
      case "biodata":
        return (
          <BioDataForm
            id={id}
            onComplete={() => {
              if (nextPage) {
                router.push(`/onboarding/${id}?page=${nextPage}&saved=1`);
              }
            }}
            savedData={
              onboardingData.biodata as Record<string, string> | undefined
            }
            user={user}
          />
        );
      default:
        return (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">
              Form đang được phát triển...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="grid min-h-[80vh] grid-cols-12 gap-4">
      <div className="col-span-12 rounded-lg bg-slate-200 p-3 sm:col-span-3 dark:bg-slate-700">
        <h2 className="mb-4 px-2 font-bold text-slate-700 text-sm uppercase tracking-wider dark:text-slate-200">
          Các bước
        </h2>
        <nav className="flex flex-row gap-1 overflow-x-auto sm:flex-col sm:overflow-x-visible">
          {steps.map((step, index) => (
            <a
              className={cn(
                "block truncate rounded-md px-3 py-2 font-medium text-sm transition-colors",
                step.page === page
                  ? "bg-teal-800 text-slate-100"
                  : "text-slate-600 hover:bg-slate-300 dark:text-slate-300 dark:hover:bg-slate-600",
              )}
              href={`/onboarding/${id}?page=${step.page}`}
              key={step.page}
              title={step.title}
            >
              {index + 1}. {step.title}
            </a>
          ))}
        </nav>
      </div>

      <div className="col-span-12 rounded-lg bg-slate-100 p-6 sm:col-span-9 dark:bg-slate-800">
        {renderForm()}
      </div>
    </div>
  );
}
