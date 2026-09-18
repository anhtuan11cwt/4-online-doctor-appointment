"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateDoctorProfile } from "@/actions/onboarding";
import { updateOnboardingData } from "@/actions/users";
import ArrayInput from "@/components/form-inputs/array-input";
import SelectInput from "@/components/form-inputs/select-input";
import TextInput from "@/components/form-inputs/text-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { type PracticeInfoSchema, practiceInfoSchema } from "@/lib/validations";

const insuranceOptions = [
  { label: "Có", value: "yes" },
  { label: "Không", value: "no" },
];

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const minutes = ["00", "15", "30", "45"];

export default function PracticeForm({
  formId,
  id,
  savedData,
  title = "Thông tin thực hành",
  description = "Vui lòng điền thông tin phòng khám của bạn",
  onComplete,
}: {
  formId: string;
  id: string;
  savedData?: Record<string, string>;
  title?: string;
  description?: string;
  onComplete?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<string[]>(
    (savedData?.servicesOffered as unknown as string[]) ?? [],
  );
  const [languages, setLanguages] = useState<string[]>(
    (savedData?.languagesSpoken as unknown as string[]) ?? [],
  );
  const [insuranceAccepted, setInsuranceAccepted] = useState<string>(
    savedData?.insuranceAccepted ?? "",
  );

  const savedHours = savedData?.hoursOfOperation ?? "";
  const [startHour, setStartHour] = useState(
    savedHours.split(" - ")[0]?.split(":")[0] ?? "08",
  );
  const [startMinute, setStartMinute] = useState(
    savedHours.split(" - ")[0]?.split(":")[1] ?? "00",
  );
  const [endHour, setEndHour] = useState(
    savedHours.split(" - ")[1]?.split(":")[0] ?? "17",
  );
  const [endMinute, setEndMinute] = useState(
    savedHours.split(" - ")[1]?.split(":")[1] ?? "00",
  );

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PracticeInfoSchema>({
    defaultValues: {
      hospitalAddress: savedData?.hospitalAddress ?? "",
      hospitalContactNumber: savedData?.hospitalContactNumber ?? "",
      hospitalEmailAddress: savedData?.hospitalEmailAddress ?? "",
      hospitalName: savedData?.hospitalName ?? "",
      hospitalWebsite: savedData?.hospitalWebsite ?? "",
      hoursOfOperation: savedHours,
      insuranceAccepted: (savedData?.insuranceAccepted as "yes" | "no") ?? "",
      languagesSpoken:
        (savedData?.languagesSpoken as unknown as string[]) ?? [],
      servicesOffered:
        (savedData?.servicesOffered as unknown as string[]) ?? [],
    },
    resolver: zodResolver(practiceInfoSchema),
  });

  const onSubmit = async (data: PracticeInfoSchema) => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...data,
        hoursOfOperation: `${startHour}:${startMinute} - ${endHour}:${endMinute}`,
        insuranceAccepted,
        languagesSpoken: languages,
        servicesOffered: services,
      };
      await updateDoctorProfile(formId, {
        ...formattedData,
        page: "additional",
      });
      await updateOnboardingData(id, "practice", formattedData);
      toast.success("Lưu thông tin thực hành thành công!");
      onComplete?.();
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="space-y-4">
        <div className="mb-6 border-b pb-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="mt-1 text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="grid grid-cols-2 items-start gap-4">
          {["hospital", "address", "contact", "email"].map((field) => (
            <div className="space-y-2" key={field}>
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-10 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 border-b pb-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="mt-1 text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="grid grid-cols-2 items-start gap-4">
        <TextInput
          disabled={isLoading}
          errors={errors}
          label="Tên bệnh viện"
          name="hospitalName"
          register={register}
        />

        <TextInput
          disabled={isLoading}
          errors={errors}
          label="Địa chỉ bệnh viện"
          name="hospitalAddress"
          register={register}
        />

        <TextInput
          disabled={isLoading}
          errors={errors}
          inputMode="numeric"
          label="Số liên hệ"
          maxLength={20}
          name="hospitalContactNumber"
          pattern="[0-9]*"
          register={register}
          type="tel"
        />

        <TextInput
          disabled={isLoading}
          errors={errors}
          label="Email bệnh viện"
          name="hospitalEmailAddress"
          register={register}
        />

        <TextInput
          disabled={isLoading}
          errors={errors}
          label="Website bệnh viện (không bắt buộc)"
          name="hospitalWebsite"
          register={register}
        />

        <div className="grid gap-2">
          <Label>Giờ hoạt động</Label>
          <div className="flex items-center gap-2">
            <NativeSelect
              disabled={isLoading}
              onChange={(e) => {
                setStartHour(e.target.value);
                setTimeout(() => {
                  setValue(
                    "hoursOfOperation",
                    `${e.target.value}:${startMinute} - ${endHour}:${endMinute}`,
                    { shouldValidate: true },
                  );
                }, 0);
              }}
              value={startHour}
            >
              {hours.map((h) => (
                <NativeSelectOption key={h} value={h}>
                  {h}
                </NativeSelectOption>
              ))}
            </NativeSelect>

            <span className="text-muted-foreground">:</span>

            <NativeSelect
              disabled={isLoading}
              onChange={(e) => {
                setStartMinute(e.target.value);
                setTimeout(() => {
                  setValue(
                    "hoursOfOperation",
                    `${startHour}:${e.target.value} - ${endHour}:${endMinute}`,
                    { shouldValidate: true },
                  );
                }, 0);
              }}
              value={startMinute}
            >
              {minutes.map((m) => (
                <NativeSelectOption key={m} value={m}>
                  {m}
                </NativeSelectOption>
              ))}
            </NativeSelect>

            <span className="text-muted-foreground">-</span>

            <NativeSelect
              disabled={isLoading}
              onChange={(e) => {
                setEndHour(e.target.value);
                setTimeout(() => {
                  setValue(
                    "hoursOfOperation",
                    `${startHour}:${startMinute} - ${e.target.value}:${endMinute}`,
                    { shouldValidate: true },
                  );
                }, 0);
              }}
              value={endHour}
            >
              {hours.map((h) => (
                <NativeSelectOption key={h} value={h}>
                  {h}
                </NativeSelectOption>
              ))}
            </NativeSelect>

            <span className="text-muted-foreground">:</span>

            <NativeSelect
              disabled={isLoading}
              onChange={(e) => {
                setEndMinute(e.target.value);
                setTimeout(() => {
                  setValue(
                    "hoursOfOperation",
                    `${startHour}:${startMinute} - ${endHour}:${e.target.value}`,
                    { shouldValidate: true },
                  );
                }, 0);
              }}
              value={endMinute}
            >
              {minutes.map((m) => (
                <NativeSelectOption key={m} value={m}>
                  {m}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          {errors.hoursOfOperation && (
            <p className="text-red-600 text-xs">
              {String(errors.hoursOfOperation.message)}
            </p>
          )}
        </div>

        <SelectInput
          disabled={isLoading}
          errors={errors}
          label="Bảo hiểm được chấp nhận"
          name="insuranceAccepted"
          onChange={(e) => {
            const val = e.target.value;
            setInsuranceAccepted(val);
            setValue("insuranceAccepted", val as "yes" | "no", {
              shouldValidate: true,
            });
          }}
          options={insuranceOptions}
          value={insuranceAccepted}
        />

        <ArrayInput
          className="col-span-full"
          disabled={isLoading}
          items={services}
          label="Dịch vụ cung cấp"
          placeholder="Nhập dịch vụ và nhấn Enter"
          setItems={(items) => {
            setServices(items);
            setValue("servicesOffered", items, { shouldValidate: true });
          }}
        />

        <ArrayInput
          className="col-span-full"
          disabled={isLoading}
          items={languages}
          label="Ngôn ngữ sử dụng"
          placeholder="Nhập ngôn ngữ và nhấn Enter"
          setItems={(items) => {
            setLanguages(items);
            setValue("languagesSpoken", items, { shouldValidate: true });
          }}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="px-8" disabled={isLoading} type="submit">
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isLoading ? "Đang lưu, vui lòng chờ..." : "Lưu và tiếp tục"}
        </Button>
      </div>
    </form>
  );
}
