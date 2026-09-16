"use client";

import { FileText, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type UploadedFile = {
  url: string;
  name: string;
  size: number;
};

export type PendingFile = {
  file: File;
  id: string;
  name: string;
  size: number;
};

interface MultipleFileUploadProps {
  className?: string;
  disabled?: boolean;
  files: UploadedFile[];
  label: string;
  maxFiles?: number;
  pendingFiles?: PendingFile[];
  setFiles: (files: UploadedFile[]) => void;
  setPendingFiles?: (files: PendingFile[]) => void;
}

export default function MultipleFileUpload({
  label,
  files,
  setFiles,
  maxFiles = 4,
  className,
  pendingFiles = [],
  setPendingFiles,
  disabled = false,
}: MultipleFileUploadProps) {
  const [isUploading, _setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newPending = Array.from(selectedFiles).map((file) => ({
      file,
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: file.name,
      size: file.size,
    }));

    if (setPendingFiles) {
      setPendingFiles([...pendingFiles, ...newPending].slice(0, maxFiles));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemovePending = (index: number) => {
    if (setPendingFiles) {
      setPendingFiles(pendingFiles.filter((_, i) => i !== index));
    }
  };

  const handleRemoveUploaded = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleChangeAll = () => {
    setFiles([]);
    if (setPendingFiles) {
      setPendingFiles([]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatSize = (bytes: number) => {
    return `${(bytes / 1000).toFixed(2)} KB`;
  };

  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label>{label}</Label>}
      <input
        accept=".pdf"
        className="hidden"
        multiple
        onChange={handleSelectFiles}
        ref={fileInputRef}
        type="file"
      />

      {files.length > 0 && (
        <div
          className={cn(
            "mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2",
            disabled && "pointer-events-none opacity-50",
          )}
        >
          {files.map((file, index) => (
            <div
              className="flex items-center gap-3 rounded-md border bg-white p-3 dark:bg-slate-800"
              key={`uploaded-${file.url}-${file.name}`}
            >
              <FileText className="size-6 shrink-0 text-red-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-sm">{file.name}</p>
                <p className="text-muted-foreground text-xs">
                  {formatSize(file.size)}
                </p>
              </div>
              <Button
                className="size-6 shrink-0"
                onClick={() => handleRemoveUploaded(index)}
                size="icon"
                type="button"
                variant="ghost"
              >
                <X className="size-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {pendingFiles.length > 0 && (
        <div
          className={cn(
            "mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2",
            disabled && "pointer-events-none opacity-50",
          )}
        >
          {pendingFiles.map((file, index) => (
            <div
              className="flex items-center gap-3 rounded-md border border-blue-400 border-dashed bg-blue-50 p-3 dark:bg-blue-950"
              key={`pending-${file.id}`}
            >
              <FileText className="size-6 shrink-0 text-blue-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-sm">{file.name}</p>
                <p className="text-muted-foreground text-xs">
                  {formatSize(file.size)} (chưa tải lên)
                </p>
              </div>
              <Button
                className="size-6 shrink-0"
                onClick={() => handleRemovePending(index)}
                size="icon"
                type="button"
                variant="ghost"
              >
                <X className="size-4 text-blue-500" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div
        className={cn(
          "flex gap-2",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <button
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-md border-2 border-dashed p-4 transition-colors hover:border-teal-500 hover:bg-teal-50",
            isUploading && "pointer-events-none opacity-50",
            files.length + pendingFiles.length >= maxFiles &&
              "pointer-events-none opacity-50",
          )}
          onClick={() => fileInputRef.current?.click()}
          type="button"
        >
          <Upload className="size-5 text-muted-foreground" />
          <span className="text-muted-foreground text-sm">
            {isUploading
              ? "Đang tải..."
              : `Tải lên file PDF (tối đa ${maxFiles} file)`}
          </span>
        </button>
        {(files.length > 0 || pendingFiles.length > 0) && (
          <Button onClick={handleChangeAll} type="button" variant="outline">
            Xóa tất cả
          </Button>
        )}
      </div>
    </div>
  );
}

export async function uploadPendingFiles(
  pendingFiles: PendingFile[],
): Promise<UploadedFile[]> {
  const uploadPromises = pendingFiles.map(async (pending) => {
    const formData = new FormData();
    formData.append("file", pending.file);

    const response = await fetch("/api/upload", {
      body: formData,
      method: "POST",
    });

    if (!response.ok) throw new Error("Tải file lên thất bại");

    const data = await response.json();
    return {
      name: pending.name,
      size: pending.size,
      url: data.url,
    };
  });

  return Promise.all(uploadPromises);
}
