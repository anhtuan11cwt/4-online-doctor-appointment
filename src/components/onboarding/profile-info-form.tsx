"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateDoctorProfile } from "@/actions/onboarding";
import { updateOnboardingData } from "@/actions/users";
import DatePickerInput from "@/components/form-inputs/date-picker-input";
import ImageInput, {
  uploadToCloudinary,
} from "@/components/form-inputs/image-input";
import TextAreaInput from "@/components/form-inputs/text-area-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboardingContext } from "@/context/onboarding-context";
import { cn } from "@/lib/utils";
import { type ProfileInfoSchema, profileInfoSchema } from "@/lib/validations";

export default function ProfileInfoForm({
  id,
  savedData,
  title = "Thông tin hồ sơ",
  description = "Vui lòng điền thông tin hồ sơ của bạn",
  onComplete,
}: {
  id: string;
  savedData?: Record<string, string>;
  title?: string;
  description?: string;
  onComplete?: () => void;
}) {
  const { profileData, setProfileData, savedDBData } = useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);
  const [expiry, setExpiry] = useState<Date | undefined>(() => {
    if (savedData?.medicalLicenseExpiry)
      return new Date(savedData.medicalLicenseExpiry);
    if (savedDBData?.medicalLicenseExpiry)
      return new Date(savedDBData.medicalLicenseExpiry as string);
    return undefined;
  });
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(
    () =>
      (savedData?.profileImage as string) ||
      (savedDBData?.profilePicture as string) ||
      "",
  );
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileInfoSchema>({
    defaultValues: {
      bio:
        savedData?.bio || profileData.bio || (savedDBData?.bio as string) || "",
      medicalLicense:
        savedData?.medicalLicense ||
        profileData.medicalLicense ||
        (savedDBData?.medicalLicense as string) ||
        "",
    },
    resolver: zodResolver(profileInfoSchema),
  });

  useEffect(() => {
    const newBio =
      savedData?.bio || profileData.bio || (savedDBData?.bio as string) || "";
    const newLicense =
      savedData?.medicalLicense ||
      profileData.medicalLicense ||
      (savedDBData?.medicalLicense as string) ||
      "";
    reset({ bio: newBio, medicalLicense: newLicense });
  }, [reset, profileData, savedDBData, savedData]);

  const onSubmit = async (data: ProfileInfoSchema) => {
    if (!expiry) {
      toast.error("Vui lòng chọn ngày hết hạn giấy phép");
      return;
    }
    if (expiry <= new Date()) {
      toast.error("Ngày hết hạn phải lớn hơn ngày hiện tại");
      return;
    }
    setIsLoading(true);
    try {
      let uploadedUrl =
        (savedData?.profileImage as string) ||
        (savedDBData?.profilePicture as string) ||
        "";
      if (file) {
        uploadedUrl = await uploadToCloudinary(
          file,
          "doctorProfile",
          uploadedUrl || undefined,
        );
        setImageUrl(uploadedUrl);
      }
      const formattedData = {
        ...data,
        medicalLicenseExpiry: format(expiry, "yyyy-MM-dd"),
        profileImage: uploadedUrl,
      };
      await updateDoctorProfile(id, {
        ...data,
        medicalLicenseExpiry: expiry,
        profilePicture: uploadedUrl,
      });
      await updateOnboardingData(id, "profile", formattedData);
      setProfileData(data);
      toast.success("Lưu thông tin hồ sơ thành công!");
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {["license", "expiry", "bio"].map((field) => (
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

      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="medicalLicense">
            Số giấy phép hành nghề <span className="text-red-500">*</span>
          </Label>
          <Input
            className={cn(
              errors.medicalLicense && "border-red-500",
              isLoading && "opacity-50",
            )}
            disabled={isLoading}
            id="medicalLicense"
            placeholder="000001/HN-GPHN"
            {...register("medicalLicense")}
          />
          {errors.medicalLicense && (
            <p className="text-red-500 text-xs">
              {errors.medicalLicense.message}
            </p>
          )}
        </div>

        <DatePickerInput
          date={expiry}
          disabled={isLoading}
          minDate={new Date()}
          setDate={setExpiry}
          title="Ngày hết hạn giấy phép"
        />

        <TextAreaInput
          className="col-span-full"
          disabled={isLoading}
          errors={errors}
          label="Tiểu sử"
          name="bio"
          placeholder="Nhập tiểu sử của bạn..."
          register={register}
        />

        <ImageInput
          className="col-span-full"
          disabled={isLoading}
          imageUrl={imageUrl}
          label="Ảnh đại diện"
          setFile={setFile}
          setImageUrl={setImageUrl}
        />
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
