"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { completeDoctorProfile } from "@/actions/onboarding";
import { updateOnboardingData } from "@/actions/users";
import MultipleFileUpload, {
  type PendingFile,
  type UploadedFile,
  uploadPendingFiles,
} from "@/components/form-inputs/multiple-file-upload";
import TextAreaInput from "@/components/form-inputs/text-area-input";
import { Button } from "@/components/ui/button";
import { useOnboardingContext } from "@/context/onboarding-context";
import {
  type AdditionalInfoSchema,
  additionalInfoSchema,
} from "@/lib/validations";

export default function AdditionalInfoForm({
  id,
  savedData,
  title = "Thông tin bổ sung",
  description = "Vui lòng điền thông tin bổ sung của bạn",
  onComplete,
}: {
  id: string;
  savedData?: Record<string, string>;
  title?: string;
  description?: string;
  onComplete?: () => void;
}) {
  const { additionalData, setAdditionalData } = useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);
  const [additionalDocs, setAdditionalDocs] = useState<UploadedFile[]>(() => {
    const docs = savedData?.additionalDocs;
    if (!docs || !Array.isArray(docs)) return [];
    return (docs as unknown[]).map((item) => {
      if (typeof item === "string") {
        return { name: item.split("/").pop() ?? "file", size: 0, url: item };
      }
      return item as UploadedFile;
    });
  });
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdditionalInfoSchema>({
    defaultValues: {
      accomplishments:
        savedData?.accomplishments || additionalData.accomplishments || "",
      educationHistory:
        savedData?.educationHistory || additionalData.educationHistory || "",
      publishedWork:
        savedData?.publishedWork || additionalData.publishedWork || "",
    },
    resolver: zodResolver(additionalInfoSchema),
  });

  const onSubmit = async (data: AdditionalInfoSchema) => {
    setIsLoading(true);
    try {
      let uploadedDocs = additionalDocs;

      if (pendingFiles.length > 0) {
        const newUploaded = await uploadPendingFiles(pendingFiles);
        uploadedDocs = [...additionalDocs, ...newUploaded];
        setAdditionalDocs(uploadedDocs);
        setPendingFiles([]);
      }

      const formattedData = {
        ...data,
        additionalDocs: uploadedDocs,
      };

      const response = await completeDoctorProfile(id, {
        accomplishments: Array.isArray(data.accomplishments)
          ? data.accomplishments
          : data.accomplishments
            ? [data.accomplishments]
            : [],
        additionalDocuments: uploadedDocs.map((doc) => doc.url),
        educationHistory: data.educationHistory,
        publishedWork: data.publishedWork,
      });

      await updateOnboardingData(id, "additional", formattedData);
      setAdditionalData(data);

      if (response.status === 201) {
        toast.success("Hoàn thành hồ sơ thành công!");
        onComplete?.();
      } else {
        toast.error(response.error || "Đã có lỗi xảy ra");
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
        <div className="mb-6 border-b pb-4 dark:border-slate-600">
          <h3 className="font-bold text-lg dark:text-slate-200">{title}</h3>
          <p className="mt-1 text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="space-y-4">
          {["history", "research", "awards"].map((field) => (
            <div className="space-y-2" key={field}>
              <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-24 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 border-b pb-4 dark:border-slate-600">
        <h3 className="font-bold text-lg dark:text-slate-200">{title}</h3>
        <p className="mt-1 text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="space-y-4">
        <TextAreaInput
          className="col-span-full"
          disabled={isLoading}
          errors={errors}
          label="Lịch sử giáo dục"
          name="educationHistory"
          placeholder="Nhập lịch sử giáo dục của bạn..."
          register={register}
        />

        <TextAreaInput
          className="col-span-full"
          disabled={isLoading}
          errors={errors}
          label="Công trình nghiên cứu đã công bố"
          name="publishedWork"
          placeholder="Nhập các công trình nghiên cứu..."
          register={register}
        />

        <TextAreaInput
          className="col-span-full"
          disabled={isLoading}
          errors={errors}
          label="Thành tựu hoặc giải thưởng"
          name="accomplishments"
          placeholder="Nhập thành tựu hoặc giải thưởng..."
          register={register}
        />

        <MultipleFileUpload
          className="col-span-full"
          disabled={isLoading}
          files={additionalDocs}
          label="Tài liệu bổ sung (CV, bằng cấp, v.v.)"
          pendingFiles={pendingFiles}
          setFiles={setAdditionalDocs}
          setPendingFiles={setPendingFiles}
        />
      </div>

      <div className="mt-6 flex justify-center sm:mt-8">
        <Button
          className="w-full px-4 sm:w-auto sm:px-8"
          disabled={isLoading}
          type="submit"
        >
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isLoading ? "Đang lưu, vui lòng chờ..." : "Hoàn tất"}
        </Button>
      </div>
    </form>
  );
}
