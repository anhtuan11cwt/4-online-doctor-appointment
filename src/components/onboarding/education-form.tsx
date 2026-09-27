"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Specialty } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateDoctorProfile } from "@/actions/onboarding";
import { updateOnboardingData } from "@/actions/users";
import CustomMultiSelect from "@/components/dashboard/settings/custom-multi-select";
import ArrayInput from "@/components/form-inputs/array-input";
import SelectInput from "@/components/form-inputs/select-input";
import TextInput from "@/components/form-inputs/text-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useOnboardingContext } from "@/context/onboarding-context";
import degrees from "@/data/degrees.json";
import universities from "@/data/universities.json";
import { type EducationSchema, educationSchema } from "@/lib/validations";
import type { SelectOption } from "@/types";

export default function EducationForm({
  id,
  savedData,
  specialties = [],
  title = "Thông tin giáo dục",
  description = "Vui lòng điền thông tin giáo dục của bạn",
  onComplete,
}: {
  id: string;
  savedData?: Record<string, string>;
  specialties?: Specialty[];
  title?: string;
  description?: string;
  onComplete?: () => void;
}) {
  const { educationData, setEducationData, savedDBData } =
    useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);

  const allSpecialties: SelectOption[] = (specialties ?? []).map((item) => ({
    label: item.title,
    value: item.id,
  }));

  const findSpecialtyId = (value?: unknown) => {
    if (!value || typeof value !== "string") return "";
    const matched = allSpecialties.find(
      (option) => option.value === value || option.label === value,
    );
    return matched?.value ?? "";
  };

  const buildSelectedSpecialties = (values?: unknown): SelectOption[] => {
    if (!Array.isArray(values)) return [];
    return allSpecialties.filter(
      (option) =>
        values.includes(option.value) || values.includes(option.label),
    );
  };

  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(() =>
    findSpecialtyId(savedDBData?.primarySpecialization),
  );
  const [selectedOtherSpecialties, setSelectedOtherSpecialties] = useState<
    SelectOption[]
  >(() => buildSelectedSpecialties(savedDBData?.otherSpecialties));

  const [additionalCourses, setAdditionalCourses] = useState<string[]>(() => {
    const saved = savedData?.additionalCourses as unknown as
      | string[]
      | undefined;
    if (saved && saved.length > 0) return saved;
    if (
      educationData.additionalCourses &&
      educationData.additionalCourses.length > 0
    ) {
      return educationData.additionalCourses as string[];
    }
    return [];
  });
  const [selectedDegree, setSelectedDegree] = useState(
    savedData?.degree || educationData.degree || "",
  );
  const [selectedUniversity, setSelectedUniversity] = useState(
    savedData?.university ||
      educationData.university ||
      (savedDBData?.educationHistory as string) ||
      "",
  );
  const [graduationYearValue, setGraduationYearValue] = useState(
    String(savedData?.graduationYear ?? educationData.graduationYear ?? ""),
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
      degree: savedData?.degree || educationData.degree || "",
      graduationYear: savedData?.graduationYear
        ? Number(savedData.graduationYear)
        : educationData.graduationYear ||
          (savedDBData?.graduationYear as number) ||
          undefined,
      university:
        savedData?.university ||
        educationData.university ||
        (savedDBData?.educationHistory as string) ||
        "",
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
      const primarySpecialtyTitle =
        allSpecialties.find((option) => option.value === selectedSpecialtyId)
          ?.label ||
        (savedDBData?.primarySpecialization as string) ||
        "";

      const formattedData = {
        ...data,
        additionalCourses,
        degree: selectedDegree,
        university: selectedUniversity,
      };
      await updateDoctorProfile(id, {
        educationHistory: selectedUniversity,
        otherSpecialties: selectedOtherSpecialties.map(
          (option) => option.label,
        ),
        page: "practice",
        primarySpecialization: primarySpecialtyTitle,
      });
      await updateOnboardingData(id, "education", formattedData);
      setEducationData(data);
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
        <div className="mb-6 border-b pb-4 dark:border-slate-600">
          <h3 className="font-bold text-lg dark:text-slate-200">{title}</h3>
          <p className="mt-1 text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
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

      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
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

        <SelectInput
          disabled={isLoading}
          errors={errors}
          label="Chuyên khoa"
          name="primarySpecialization"
          onChange={(e) => setSelectedSpecialtyId(e.target.value)}
          options={allSpecialties}
          placeholder="Chọn chuyên khoa"
          value={selectedSpecialtyId}
        />

        <TextInput
          disabled={isLoading}
          errors={errors}
          inputMode="numeric"
          label="Năm tốt nghiệp"
          name="graduationYear"
          onChange={(e) => {
            const val = e.target.value;
            setGraduationYearValue(val);
            setValue(
              "graduationYear",
              val === "" ? (undefined as unknown as number) : Number(val),
              { shouldValidate: true },
            );
          }}
          type="number"
          value={graduationYearValue}
        />

        <div className="col-span-full grid gap-2">
          <Label>Chuyên khoa bổ sung</Label>
          <CustomMultiSelect
            disabled={isLoading}
            labelledBy="Chuyên khoa bổ sung"
            onChange={setSelectedOtherSpecialties}
            options={allSpecialties}
            value={selectedOtherSpecialties}
          />
        </div>

        <ArrayInput
          className="col-span-full"
          disabled={isLoading}
          items={additionalCourses}
          label="Khóa học bổ sung"
          placeholder="Nhập khóa học và nhấn Enter"
          setItems={setAdditionalCourses}
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
