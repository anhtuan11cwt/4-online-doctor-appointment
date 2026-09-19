"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createDoctorProfile } from "@/actions/onboarding";
import { updateOnboardingData } from "@/actions/users";
import DatePickerInput from "@/components/form-inputs/date-picker-input";
import RadioInput, {
  type RadioOption,
} from "@/components/form-inputs/radio-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboardingContext } from "@/context/onboarding-context";
import { generateTrackingNumber } from "@/lib/generate-tracking";
import { cn } from "@/lib/utils";
import { type BioDataSchema, bioDataSchema } from "@/lib/validations";

const genderOptions: RadioOption[] = [
  { label: "Nam", value: "male" },
  { label: "Nữ", value: "female" },
];

export default function BioDataForm({
  id,
  userId,
  user,
  savedData,
  title = "Thông tin cơ bản",
  description = "Vui lòng điền thông tin cơ bản của bạn",
  onComplete,
}: {
  id: string;
  userId: string;
  user: { email: string; name: string | null; phone: string | null };
  savedData?: Record<string, string>;
  title?: string;
  description?: string;
  onComplete?: () => void;
}) {
  const {
    setTrackingNumber,
    setDoctorProfileId,
    bioData,
    setBioData,
    savedDBData,
  } = useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(() => {
    if (savedData?.dateOfBirth) return new Date(savedData.dateOfBirth);
    if (savedDBData?.dateOfBirth)
      return new Date(savedDBData.dateOfBirth as string);
    return undefined;
  });
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BioDataSchema>({
    defaultValues: {
      address:
        savedData?.address ||
        bioData.address ||
        (savedDBData?.address as string) ||
        "",
      email:
        savedData?.email ||
        bioData.email ||
        (savedDBData?.email as string) ||
        user.email,
      fullName:
        savedData?.fullName ||
        bioData.fullName ||
        (savedDBData?.firstName as string) ||
        user.name ||
        "",
      gender:
        (savedData?.gender as "male" | "female") ||
        bioData.gender ||
        (savedDBData?.gender as "male" | "female") ||
        undefined,
      phone:
        savedData?.phone ||
        bioData.phone ||
        (savedDBData?.phone as string) ||
        user.phone ||
        "",
    },
    resolver: zodResolver(bioDataSchema),
  });

  useEffect(() => {
    reset({
      address:
        savedData?.address ||
        bioData.address ||
        (savedDBData?.address as string) ||
        "",
      email:
        savedData?.email ||
        bioData.email ||
        (savedDBData?.email as string) ||
        user.email,
      fullName:
        savedData?.fullName ||
        bioData.fullName ||
        (savedDBData?.firstName as string) ||
        user.name ||
        "",
      gender:
        (savedData?.gender as "male" | "female") ||
        bioData.gender ||
        (savedDBData?.gender as "male" | "female") ||
        undefined,
      phone:
        savedData?.phone ||
        bioData.phone ||
        (savedDBData?.phone as string) ||
        user.phone ||
        "",
    });
  }, [
    user.email,
    user.name,
    user.phone,
    reset,
    bioData,
    savedDBData,
    savedData,
  ]);

  const onSubmit = async (data: BioDataSchema) => {
    if (!date) {
      toast.error("Vui lòng chọn ngày sinh");
      return;
    }
    setIsLoading(true);
    try {
      const formattedData = {
        ...data,
        dateOfBirth: format(date, "yyyy-MM-dd"),
      };
      const result = await updateOnboardingData(id, "biodata", formattedData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        const trackingNumber = generateTrackingNumber();
        const response = await createDoctorProfile({
          dateOfBirth: new Date(date),
          email: data.email,
          firstName: data.fullName.split(" ").slice(-1)[0] ?? "",
          gender: data.gender,
          lastName: data.fullName.split(" ").slice(0, -1).join(" ") ?? "",
          middleName: "",
          page: "profile",
          phone: data.phone,
          trackingNumber,
          userId,
        });
        if (response.status === 201 && response.data) {
          setTrackingNumber(response.data.trackingNumber);
          setDoctorProfileId(response.data.id);
        }
        setBioData(data);
        toast.success("Hồ sơ bác sĩ đã được tạo");
        onComplete?.();
      }
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
        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
          {["name", "email", "phone", "date"].map((field) => (
            <div className="space-y-2" key={field}>
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-10 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
          <div className="col-span-full space-y-2">
            <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-10 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
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

      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">
            Họ và tên <span className="text-red-500">*</span>
          </Label>
          <Input
            className={cn(
              errors.fullName && "border-red-500",
              isLoading && "opacity-50",
            )}
            disabled
            id="fullName"
            placeholder="Nguyễn Văn A"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            className={cn(errors.email && "border-red-500", "opacity-50")}
            disabled
            id="email"
            placeholder="name@example.com"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Số điện thoại <span className="text-red-500">*</span>
          </Label>
          <Input
            className={cn(errors.phone && "border-red-500", "opacity-50")}
            disabled
            id="phone"
            inputMode="numeric"
            maxLength={10}
            placeholder="0912345678"
            type="tel"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>

        <DatePickerInput
          date={date}
          defaultMonth={maxDate}
          disabled={isLoading}
          maxDate={maxDate}
          setDate={setDate}
          title="Ngày sinh"
        />

        <RadioInput
          className="content-end"
          disabled={isLoading}
          errors={errors}
          name="gender"
          options={genderOptions}
          register={register}
          title="Giới tính"
        />

        <div className="col-span-full space-y-2">
          <Label htmlFor="address">
            Địa chỉ <span className="text-red-500">*</span>
          </Label>
          <Input
            className={cn(
              errors.address && "border-red-500",
              isLoading && "opacity-50",
            )}
            disabled={isLoading}
            id="address"
            placeholder="123 Đường ABC, Quận XYZ, TP.HCM"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-red-500 text-xs">{errors.address.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center sm:mt-8">
        <Button
          className="w-full px-4 sm:w-auto sm:px-8"
          disabled={isLoading}
          type="submit"
        >
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isLoading ? "Đang lưu, vui lòng chờ..." : "Lưu và tiếp tục"}
        </Button>
      </div>
    </form>
  );
}
