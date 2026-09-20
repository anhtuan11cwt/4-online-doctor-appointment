"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useOnboardingContext } from "@/context/onboarding-context";
import { cn } from "@/lib/utils";
import AdditionalInfoForm from "./additional-info-form";
import BioDataForm from "./bio-data-form";
import ContactInfoForm from "./contact-info-form";
import EducationForm from "./education-form";
import PracticeForm from "./practice-form";
import ProfileInfoForm from "./profile-info-form";

const steps = [
  { page: "biodata", title: "Thông tin cơ bản" },
  { page: "profile", title: "Thông tin hồ sơ" },
  { page: "contact", title: "Thông tin liên hệ" },
  { page: "education", title: "Thông tin giáo dục" },
  { page: "practice", title: "Thông tin thực hành" },
  { page: "additional", title: "Thông tin bổ sung" },
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
  const { trackingNumber, savedDBData } = useOnboardingContext();

  useEffect(() => {
    if (saved === "1" && !toastShown.current) {
      toastShown.current = true;
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
            userId={id}
          />
        );
      case "profile":
        return (
          <ProfileInfoForm
            id={id}
            onComplete={() => {
              if (nextPage) {
                router.push(`/onboarding/${id}?page=${nextPage}&saved=1`);
              }
            }}
            savedData={
              onboardingData.profile as Record<string, string> | undefined
            }
          />
        );
      case "contact":
        return (
          <ContactInfoForm
            id={id}
            onComplete={() => {
              if (nextPage) {
                router.push(`/onboarding/${id}?page=${nextPage}&saved=1`);
              }
            }}
            savedData={
              onboardingData.contact as Record<string, string> | undefined
            }
          />
        );
      case "education":
        return (
          <EducationForm
            id={id}
            onComplete={() => {
              if (nextPage) {
                router.push(`/onboarding/${id}?page=${nextPage}&saved=1`);
              }
            }}
            savedData={
              onboardingData.education as Record<string, string> | undefined
            }
          />
        );
      case "practice":
        return (
          <PracticeForm
            id={id}
            onComplete={() => {
              if (nextPage) {
                router.push(`/onboarding/${id}?page=${nextPage}&saved=1`);
              }
            }}
            savedData={
              onboardingData.practice as Record<string, string> | undefined
            }
          />
        );
      case "additional":
        return (
          <AdditionalInfoForm
            id={id}
            onComplete={() => {
              router.push("/login");
            }}
            savedData={
              onboardingData.additional as Record<string, string> | undefined
            }
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
    <div className="grid min-h-[60vh] grid-cols-12 gap-4 sm:min-h-[80vh]">
      <div className="col-span-12 h-full rounded-lg bg-slate-200 p-2 sm:col-span-3 sm:p-3 dark:bg-slate-900">
        <h2 className="mb-2 px-2 font-bold text-slate-700 text-xs uppercase tracking-wider sm:mb-4 sm:text-sm dark:text-slate-300">
          Các bước
        </h2>
        <nav className="flex flex-row gap-1 overflow-x-auto sm:flex-col sm:overflow-x-visible">
          {steps.map((step, index) => (
            <a
              className={cn(
                "block truncate rounded-md px-2 py-1.5 font-medium text-xs transition-colors sm:px-3 sm:py-2 sm:text-sm",
                step.page === page
                  ? "bg-teal-800 text-slate-100"
                  : "text-slate-600 hover:bg-slate-300 dark:text-slate-400 dark:hover:bg-slate-700",
              )}
              href={`/onboarding/${id}?page=${step.page}`}
              key={step.page}
              title={step.title}
            >
              {index + 1}. {step.title}
            </a>
          ))}
          <Link
            className="mt-2 block truncate rounded-md bg-gray-600 px-2 py-1.5 text-center font-medium text-slate-100 text-xs transition-colors hover:bg-gray-800 sm:mt-4 sm:px-3 sm:py-2 sm:text-sm"
            href="/onboarding/resume"
            title="Tiếp tục đơn đăng ký"
          >
            Tiếp tục đơn đăng ký
          </Link>
        </nav>
      </div>

      <div className="col-span-12 rounded-lg bg-slate-100 p-3 sm:col-span-9 sm:p-6 dark:bg-slate-800">
        {(trackingNumber || (savedDBData.trackingNumber as string)) && (
          <div className="mb-3 border-slate-200 border-b pb-2 sm:mb-4 dark:border-slate-600">
            <p className="text-xs sm:text-sm dark:text-slate-300">
              Mã theo dõi của bạn là{" "}
              <span className="font-bold">
                {trackingNumber || (savedDBData.trackingNumber as string)}
              </span>
            </p>
            <p className="text-muted-foreground text-xs">
              Sử dụng mã này để kiểm tra trạng thái hoặc tiếp tục đơn đăng ký
            </p>
          </div>
        )}
        {renderForm()}
      </div>
    </div>
  );
}
