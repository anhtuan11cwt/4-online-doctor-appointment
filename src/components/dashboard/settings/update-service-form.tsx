"use client";

import type { Service, Specialty, Symptom } from "@prisma/client";
import { Loader2, MapPin, PictureInPicture, Video } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { type ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { updateDoctorProfileWithService } from "@/actions/services";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const operationModes = [
  { icon: Video, slug: "telehealth-visit", title: "Khám từ xa" },
  { icon: MapPin, slug: "in-person-doctor-visit", title: "Khám trực tiếp" },
  {
    icon: PictureInPicture,
    slug: "both",
    title: "Cả khám từ xa và khám trực tiếp",
  },
];

type ProfileSummary = {
  id: string;
  operationMode?: string | null;
  serviceId?: string | null;
  specialtyId?: string | null;
  symptomIds?: string[];
};

type UpdateServiceFormProps = {
  profile?: ProfileSummary | null;
  services: Service[];
  specialties: Specialty[];
  symptoms: Symptom[];
};

function SettingsCard({
  children,
  description,
  title,
  action,
}: {
  children: ReactNode;
  description?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-md border border-slate-200 bg-card p-3 shadow-sm min-[360px]:p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1">
          <h2 className="break-words font-bold text-base">{title}</h2>
          {description && (
            <p className="break-words text-muted-foreground text-xs">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export default function UpdateServiceForm({
  profile,
  services,
  specialties,
  symptoms,
}: UpdateServiceFormProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [savingMode, setSavingMode] = useState(false);
  const [savingServices, setSavingServices] = useState(false);
  const [savingSpecialty, setSavingSpecialty] = useState(false);
  const [savingSymptoms, setSavingSymptoms] = useState(false);

  const [operationMode, setOperationMode] = useState(
    profile?.operationMode ?? "",
  );
  const [selectedServiceId, setSelectedServiceId] = useState(
    profile?.serviceId ?? "",
  );
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(
    profile?.specialtyId ?? "",
  );
  const [symptomIds, setSymptomIds] = useState<string[]>(
    profile?.symptomIds ?? [],
  );

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Loader2 className="size-4 animate-spin" />
        Đang tải phiên đăng nhập...
      </div>
    );
  }

  const persist = async (
    data: Record<string, unknown>,
    setIsSaving: (value: boolean) => void,
    successMessage: string,
  ) => {
    if (!session?.user?.id) {
      toast.error("Vui lòng đăng nhập lại");
      return;
    }

    if (!profile?.id) {
      toast.error(
        "Không tìm thấy hồ sơ bác sĩ. Vui lòng hoàn tất đăng ký trước.",
      );
      return;
    }

    setIsSaving(true);
    try {
      const result = await updateDoctorProfileWithService(profile.id, data);
      if (result.status === 201) {
        toast.success(successMessage);
        router.refresh();
      } else {
        toast.error((result.error as string) ?? "Đã có lỗi xảy ra");
      }
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateMode = () =>
    persist(
      { operationMode: operationMode || null },
      setSavingMode,
      "Đã cập nhật chế độ hoạt động",
    );

  const handleUpdateService = () =>
    persist(
      { serviceId: selectedServiceId || null },
      setSavingServices,
      "Đã cập nhật dịch vụ",
    );

  const handleUpdateSpecialty = () =>
    persist(
      { specialtyId: selectedSpecialtyId || null },
      setSavingSpecialty,
      "Đã cập nhật chuyên khoa",
    );

  const handleUpdateSymptoms = () =>
    persist({ symptomIds }, setSavingSymptoms, "Đã cập nhật triệu chứng");

  const toggleSymptom = (id: string) => {
    setSymptomIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isSelectedCard = (isSelected: boolean) =>
    cn(
      "flex w-full min-w-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border p-2 text-center transition-colors",
      isSelected
        ? "border-2 border-purple-600 bg-slate-50 dark:bg-slate-800"
        : "border-slate-200 bg-background hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800",
    );

  const updateButton = (
    label: string,
    isSaving: boolean,
    onClick: () => void,
  ) => (
    <Button
      className="w-full justify-center min-[480px]:w-auto"
      disabled={isSaving}
      onClick={onClick}
      size="sm"
      type="button"
    >
      {isSaving && <Loader2 className="mr-2 size-4 animate-spin" />}
      {label}
    </Button>
  );

  return (
    <div className="w-full space-y-4">
      <SettingsCard
        action={updateButton(
          "Cập nhật chế độ hoạt động",
          savingMode,
          handleUpdateMode,
        )}
        description="Chọn hình thức bạn tiếp nhận bệnh nhân."
        title="Chọn chế độ hoạt động"
      >
        <div className="grid grid-cols-1 gap-2 py-3 min-[360px]:grid-cols-3 min-[360px]:gap-3">
          {operationModes.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={isSelectedCard(operationMode === item.title)}
                key={item.slug}
                onClick={() => setOperationMode(item.title)}
                type="button"
              >
                <Icon className="size-8 text-purple-600" />
                <b className="hyphens-auto break-words text-xs">{item.title}</b>
              </button>
            );
          })}
        </div>
      </SettingsCard>

      <SettingsCard
        action={updateButton(
          "Cập nhật dịch vụ",
          savingServices,
          handleUpdateService,
        )}
        title="Chọn dịch vụ bạn muốn cung cấp"
      >
        <div className="grid grid-cols-2 gap-2 py-3 sm:grid-cols-4 md:grid-cols-6 min-[360px]:grid-cols-3 min-[360px]:gap-3">
          {services.map((item) => (
            <button
              className={isSelectedCard(selectedServiceId === item.id)}
              key={item.id}
              onClick={() => setSelectedServiceId(item.id)}
              type="button"
            >
              {item.imageUrl ? (
                <Image
                  alt={item.title}
                  className="h-14 w-14 object-contain"
                  height={56}
                  src={item.imageUrl}
                  width={56}
                />
              ) : (
                <span className="h-14 w-14 rounded-md bg-slate-100 dark:bg-slate-700" />
              )}
              <b className="hyphens-auto break-words text-xs">{item.title}</b>
            </button>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard
        action={updateButton(
          "Cập nhật chuyên khoa",
          savingSpecialty,
          handleUpdateSpecialty,
        )}
        title="Chuyên khoa"
      >
        <div className="grid grid-cols-2 gap-2 py-3 sm:grid-cols-3 md:grid-cols-5 min-[360px]:grid-cols-3 min-[360px]:gap-3">
          {specialties.map((item) => (
            <button
              className={isSelectedCard(selectedSpecialtyId === item.id)}
              key={item.id}
              onClick={() => setSelectedSpecialtyId(item.id)}
              type="button"
            >
              <b className="hyphens-auto break-words text-xs">{item.title}</b>
            </button>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard
        action={updateButton(
          "Cập nhật triệu chứng",
          savingSymptoms,
          handleUpdateSymptoms,
        )}
        title="Chọn triệu chứng"
      >
        <div className="grid grid-cols-2 gap-2 py-3 sm:grid-cols-3 md:grid-cols-5 min-[360px]:grid-cols-3 min-[360px]:gap-3">
          {symptoms.map((item) => (
            <button
              className={isSelectedCard(symptomIds.includes(item.id))}
              key={item.id}
              onClick={() => toggleSymptom(item.id)}
              type="button"
            >
              <b className="hyphens-auto break-words text-xs">{item.title}</b>
            </button>
          ))}
        </div>
      </SettingsCard>
    </div>
  );
}
