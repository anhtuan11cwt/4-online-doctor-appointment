"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateDoctorProfileWithService } from "@/actions/services";
import CustomMultiSelect from "@/components/dashboard/settings/custom-multi-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import type { SelectOption } from "@/types";

type ProfileSummary = {
  id: string;
  serviceId?: string | null;
  specialtyId?: string | null;
  symptomIds?: string[];
};

type UpdateServiceFormProps = {
  profile?: ProfileSummary | null;
  services: SelectOption[];
  specialties: SelectOption[];
  symptoms: SelectOption[];
};

export default function UpdateServiceForm({
  profile,
  services,
  specialties,
  symptoms,
}: UpdateServiceFormProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(
    profile?.serviceId ?? "",
  );
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(
    profile?.specialtyId ?? "",
  );
  const [selectedSymptomIds, setSelectedSymptomIds] = useState<SelectOption[]>(
    symptoms.filter((option) =>
      (profile?.symptomIds ?? []).includes(option.value),
    ),
  );

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Loader2 className="size-4 animate-spin" />
        Đang tải phiên đăng nhập...
      </div>
    );
  }

  const handleUpdateService = async () => {
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

    const data = {
      serviceId: selectedServiceId || null,
      specialtyId: selectedSpecialtyId || null,
      symptomIds: selectedSymptomIds.map((item) => item.value),
    };

    setIsLoading(true);
    try {
      const result = await updateDoctorProfileWithService(profile.id, data);
      if (result.status === 201) {
        toast.success("Cập nhật cài đặt dịch vụ thành công");
        router.refresh();
      } else {
        toast.error((result.error as string) ?? "Đã có lỗi xảy ra");
      }
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-3 min-[360px]:space-y-4">
      <p className="break-words text-muted-foreground text-xs min-[360px]:text-sm">
        Chọn dịch vụ, chuyên khoa và các triệu chứng bạn phụ trách.
      </p>

      <div className="space-y-2">
        <Label htmlFor="service-select">Chọn dịch vụ</Label>
        <NativeSelect
          className="w-full"
          disabled={isLoading}
          id="service-select"
          onChange={(e) => setSelectedServiceId(e.target.value)}
          value={selectedServiceId}
        >
          <NativeSelectOption value="">Chọn một dịch vụ</NativeSelectOption>
          {services.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialty-select">Chọn chuyên khoa</Label>
        <NativeSelect
          className="w-full"
          disabled={isLoading}
          id="specialty-select"
          onChange={(e) => setSelectedSpecialtyId(e.target.value)}
          value={selectedSpecialtyId}
        >
          <NativeSelectOption value="">Chọn một chuyên khoa</NativeSelectOption>
          {specialties.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <div className="space-y-2">
        <Label>Chọn triệu chứng</Label>
        <CustomMultiSelect
          disabled={isLoading}
          labelledBy="Chọn triệu chứng"
          onChange={setSelectedSymptomIds}
          options={symptoms}
          value={selectedSymptomIds}
        />
      </div>

      <Button
        className="w-full sm:w-auto"
        disabled={isLoading}
        onClick={handleUpdateService}
        type="button"
      >
        {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
        {isLoading ? "Đang lưu..." : "Lưu cài đặt"}
      </Button>
    </div>
  );
}
