"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DatePickerInput from "@/components/form-inputs/date-picker-input";
import MultipleFileUpload, {
  type PendingFile,
  type UploadedFile,
  uploadPendingFiles,
} from "@/components/form-inputs/multiple-file-upload";
import RadioInput from "@/components/form-inputs/radio-input";
import TextAreaInput from "@/components/form-inputs/text-area-input";
import TextInput from "@/components/form-inputs/text-input";
import { Button } from "@/components/ui/button";
import { getLongDate, getTimeLabel } from "@/lib/utils";
import type { AppointmentProps, DoctorDetail } from "@/types";

const genderOptions = [
  { label: "Nam", value: "male" },
  { label: "Nữ", value: "female" },
];

type BookingFormProps = {
  date?: Date;
  doctor: DoctorDetail;
  onStepChange: (step: number) => void;
  selectedTime: string | null;
  step: number;
};

export default function BookingForm({
  date,
  doctor,
  onStepChange,
  selectedTime,
  step,
}: BookingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [medicalDocs, setMedicalDocs] = useState<UploadedFile[]>([]);
  const [pendingDocs, setPendingDocs] = useState<PendingFile[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentProps>();

  const onSubmit = async (data: AppointmentProps) => {
    if (
      !data.firstName?.trim() ||
      !data.lastName?.trim() ||
      !data.email?.trim()
    ) {
      toast.error("Vui lòng nhập họ, tên và email");
      return;
    }

    setLoading(true);
    try {
      const uploadedDocs =
        pendingDocs.length > 0
          ? await uploadPendingFiles(pendingDocs, "patientMedicalFiles")
          : [];
      const allDocs = [...medicalDocs, ...uploadedDocs];
      setMedicalDocs(allDocs);
      setPendingDocs([]);

      const payload: AppointmentProps = {
        ...data,
        appointmentDate: date ? new Date(date).toISOString() : undefined,
        appointmentTime: selectedTime ?? undefined,
        charge: doctor.doctorProfile?.hourlyWage ?? 15000,
        dob: dob ?? null,
        doctorId: doctor.id,
        doctorName: doctor.name,
        medicalDocuments: allDocs.map((file) => file.url),
      };

      console.log("DỮ LIỆU LỊCH HẸN:", payload);
      toast.success(
        "Đã ghi nhận lịch hẹn (bản demo, chưa được lưu vào hệ thống)",
      );
      router.refresh();
    } catch {
      toast.error("Đã có lỗi xảy ra khi gửi thông tin");
    } finally {
      setLoading(false);
    }
  };

  const summary = `${getLongDate(date)}${selectedTime ? ` · ${getTimeLabel(selectedTime)}` : ""}`;

  return (
    <form
      className="px-3 py-4 sm:px-8 sm:py-6 min-[360px]:px-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Bước 2: Thông tin cá nhân */}
      {step === 2 && (
        <div className="space-y-5 min-[360px]:space-y-6">
          <div>
            <h2 className="break-words font-semibold text-base sm:text-xl">
              Cho chúng tôi biết vài thông tin về bạn
            </h2>
            <p className="mt-1 break-words text-muted-foreground text-xs min-[360px]:text-sm">
              Lịch hẹn: {summary}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 min-[360px]:gap-6">
            <TextInput
              errors={errors}
              label="Họ"
              name="firstName"
              placeholder="Nhập họ của bạn"
              register={register}
            />
            <TextInput
              errors={errors}
              label="Tên"
              name="lastName"
              placeholder="Nhập tên của bạn"
              register={register}
            />
            <TextInput
              errors={errors}
              inputMode="tel"
              label="Số điện thoại"
              name="phone"
              placeholder="Nhập số điện thoại"
              register={register}
              type="tel"
            />
            <TextInput
              errors={errors}
              label="Email"
              name="email"
              placeholder="Nhập địa chỉ email"
              register={register}
              type="email"
            />
            <DatePickerInput date={dob} setDate={setDob} title="Ngày sinh" />
            <RadioInput
              errors={errors}
              name="gender"
              options={genderOptions}
              register={register}
              title="Giới tính"
            />
          </div>

          <div className="flex flex-col gap-3 border-gray-200 border-t pt-5 sm:flex-row sm:justify-between min-[360px]:pt-6 dark:border-gray-700">
            <Button
              className="w-full sm:w-auto"
              onClick={() => onStepChange(step - 1)}
              type="button"
              variant="outline"
            >
              Quay lại
            </Button>
            <Button
              className="w-full sm:w-auto"
              onClick={() => onStepChange(step + 1)}
              type="button"
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      )}

      {/* Bước 3: Thông tin bổ sung và hoàn tất */}
      {step === 3 && (
        <div className="space-y-5 pb-2 min-[360px]:space-y-6">
          <div>
            <h2 className="break-words font-semibold text-base sm:text-xl">
              Hoàn tất lịch hẹn
            </h2>
            <p className="mt-1 text-muted-foreground text-xs min-[360px]:text-sm">
              Thêm một vài thông tin để bác sĩ chuẩn bị tốt hơn cho cuộc hẹn.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 min-[360px]:gap-6">
            <TextInput
              errors={errors}
              label="Địa chỉ"
              name="location"
              placeholder="Nhập địa chỉ của bạn"
              register={register}
            />
            <TextInput
              errors={errors}
              label="Nghề nghiệp"
              name="occupation"
              placeholder="Nhập nghề nghiệp của bạn"
              register={register}
            />
          </div>

          <TextAreaInput
            errors={errors}
            label="Lý do khám"
            name="appointmentReason"
            placeholder="Mô tả ngắn gọn lý do bạn muốn khám"
            register={register}
          />

          <MultipleFileUpload
            files={medicalDocs}
            label="Tài liệu y tế"
            maxFiles={4}
            pendingFiles={pendingDocs}
            setFiles={setMedicalDocs}
            setPendingFiles={setPendingDocs}
          />

          <div className="flex flex-col gap-3 border-gray-200 border-t pt-5 sm:flex-row sm:justify-between min-[360px]:pt-6 dark:border-gray-700">
            <Button
              className="w-full sm:w-auto"
              onClick={() => onStepChange(step - 1)}
              type="button"
              variant="outline"
            >
              Quay lại
            </Button>
            <Button
              className="w-full sm:w-auto"
              disabled={loading}
              type="submit"
            >
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
              {loading ? "Đang xử lý..." : "Hoàn tất lịch hẹn"}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
