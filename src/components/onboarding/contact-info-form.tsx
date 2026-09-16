"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateOnboardingData } from "@/actions/users";
import SelectInput from "@/components/form-inputs/select-input";
import TextInput from "@/components/form-inputs/text-input";
import { Button } from "@/components/ui/button";
import { type ContactInfoSchema, contactInfoSchema } from "@/lib/validations";
import { allWards, provinceOptions, provinces } from "@/lib/vietnam-addresses";

export default function ContactInfoForm({
  id,
  savedData,
  title = "Thông tin liên hệ",
  description = "Vui lòng điền thông tin liên hệ của bạn",
  onComplete,
}: {
  id: string;
  savedData?: Record<string, string>;
  title?: string;
  description?: string;
  onComplete?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string>(
    savedData?.city ?? "",
  );
  const [selectedWard, setSelectedWard] = useState<string>(
    savedData?.ward ?? "",
  );
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const provinceCode = useMemo(() => {
    const found = provinces.find((p) => p.name === selectedProvince);
    return found?.province_code ?? "";
  }, [selectedProvince]);

  const wardOptions = useMemo(() => {
    if (!provinceCode) return [];
    return allWards
      .filter((w) => w.province_code === provinceCode)
      .map((w) => ({ label: w.name, value: w.name }));
  }, [provinceCode]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactInfoSchema>({
    defaultValues: {
      city: savedData?.city ?? "",
      emergencyContactName: savedData?.emergencyContactName ?? "",
      emergencyContactPhone: savedData?.emergencyContactPhone ?? "",
      emergencyContactRelationship:
        savedData?.emergencyContactRelationship ?? "",
      ward: savedData?.ward ?? "",
    },
    resolver: zodResolver(contactInfoSchema),
  });

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedProvince(value);
    setSelectedWard("");
    setValue("city", value, { shouldValidate: true });
    setValue("ward", "", { shouldValidate: true });
  };

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedWard(value);
    setValue("ward", value, { shouldValidate: true });
  };

  const onSubmit = async (data: ContactInfoSchema) => {
    setIsLoading(true);
    try {
      const result = await updateOnboardingData(id, "contact", data);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Lưu thông tin liên hệ thành công!");
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
        <div className="grid grid-cols-2 items-stretch gap-4">
          {["city", "ward", "emergency"].map((field) => (
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
        <SelectInput
          disabled={isLoading}
          errors={errors}
          label="Tỉnh/Thành phố"
          name="city"
          onChange={handleProvinceChange}
          options={provinceOptions}
          placeholder="Chọn tỉnh/thành phố"
          value={selectedProvince}
        />

        <SelectInput
          disabled={isLoading || !provinceCode}
          errors={errors}
          label="Phường/Xã"
          name="ward"
          onChange={handleWardChange}
          options={wardOptions}
          placeholder={provinceCode ? "Chọn phường/xã" : "Chọn tỉnh trước"}
          value={selectedWard}
        />

        <div className="col-span-full">
          <h4 className="mb-2 font-semibold text-sm">Người liên hệ khẩn cấp</h4>
        </div>

        <TextInput
          disabled={isLoading}
          errors={errors}
          label="Họ và tên"
          name="emergencyContactName"
          register={register}
        />

        <TextInput
          disabled={isLoading}
          errors={errors}
          inputMode="numeric"
          label="Số điện thoại"
          maxLength={10}
          name="emergencyContactPhone"
          pattern="[0-9]*"
          register={register}
          type="tel"
        />

        <TextInput
          disabled={isLoading}
          errors={errors}
          label="Mối quan hệ"
          name="emergencyContactRelationship"
          register={register}
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
