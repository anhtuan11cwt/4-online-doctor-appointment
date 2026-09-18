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
import degrees from "@/data/degrees.json";
import universities from "@/data/universities.json";
import { type EducationSchema, educationSchema } from "@/lib/validations";

export default function EducationForm({
  formId,
  id,
  savedData,
  title = "Thông tin giáo dục",
  description = "Vui lòng điền thông tin giáo dục của bạn",
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
  const [additionalCourses, setAdditionalCourses] = useState<string[]>(
    (savedData?.additionalCourses as unknown as string[]) ?? [],
  );
  const [selectedDegree, setSelectedDegree] = useState(savedData?.degree ?? "");
  const [selectedUniversity, setSelectedUniversity] = useState(
    savedData?.university ?? "",
  );
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EducationSchema>({
    defaultValues: {
      degree: savedData?.degree ?? "",
      graduationYear: savedData?.graduationYear
        ? Number(savedData.graduationYear)
        : undefined,
      university: savedData?.university ?? "",
    },
    resolver: zodResolver(educationSchema),
  });

  const handleDegreeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedDegree(val);
    setValue("degree", val, { shouldValidate: true });
  };

  const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedUniversity(val);
    setValue("university", val, { shouldValidate: true });
  };

  const onSubmit = async (data: EducationSchema) => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...data,
        additionalCourses,
        degree: selectedDegree,
        university: selectedUniversity,
      };
      await updateDoctorProfile(formId, {
        educationHistory: selectedUniversity,
        graduationYear: data.graduationYear,
        primarySpecialization: selectedDegree,
        otherSpecialties: additionalCourses,
        page: "practice",
      });
      await updateOnboardingData(id, "education", formattedData);
      toast.success("Lưu thông tin giáo dục thành công!");
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
          {["degree", "university", "year"].map((field) => (
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
          label="Bằng cấp"
          name="degree"
          onChange={handleDegreeChange}
          options={degrees.map((d) => ({ label: d.label, value: d.label }))}
          placeholder="Chọn bằng cấp"
          value={selectedDegree}
        />

        <SelectInput
          disabled={isLoading}
          errors={errors}
          label="Trường đại học"
          name="university"
          onChange={handleUniversityChange}
          options={universities.map((u) => ({
            label: u.label,
            value: u.label,
          }))}
          placeholder="Chọn trường đại học"
          value={selectedUniversity}
        />

        <TextInput
          disabled={isLoading}
          errors={errors}
          inputMode="numeric"
          label="Năm tốt nghiệp"
          name="graduationYear"
          onChange={(e) => {
            const val = e.target.value;
            setValue(
              "graduationYear",
              val === "" ? (undefined as unknown as number) : Number(val),
              { shouldValidate: true },
            );
          }}
          type="number"
          value={String(savedData?.graduationYear ?? "")}
        />

        <ArrayInput
          className="col-span-full"
          disabled={isLoading}
          items={additionalCourses}
          label="Khóa học bổ sung"
          placeholder="Nhập khóa học và nhấn Enter"
          setItems={setAdditionalCourses}
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
