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

interface MultipleFileUploadProps {
  className?: string;
  files: UploadedFile[];
  label: string;
  maxFiles?: number;
  setFiles: (files: UploadedFile[]) => void;
}

export default function MultipleFileUpload({
  label,
  files,
  setFiles,
  maxFiles = 4,
  className,
}: MultipleFileUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    setIsLoading(true);
    try {
      const uploadPromises = Array.from(selectedFiles).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          body: formData,
          method: "POST",
        });

        if (!response.ok) throw new Error("Tải file lên thất bại");

        const data = await response.json();
        return {
          name: file.name,
          size: file.size,
          url: data.url,
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      setFiles([...files, ...uploadedFiles].slice(0, maxFiles));
    } catch {
      alert("Upload file thất bại");
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleChangeAll = () => {
    setFiles([]);
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
        onChange={handleUpload}
        ref={fileInputRef}
        type="file"
      />

      {files.length > 0 && (
        <div className="mb-2 grid grid-cols-2 gap-2">
          {files.map((file, index) => (
            <div
              className="flex items-center gap-3 rounded-md border bg-white p-3 dark:bg-slate-800"
              key={file.url}
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
                onClick={() => handleRemove(index)}
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

      <div className="flex gap-2">
        <button
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-md border-2 border-dashed p-4 transition-colors hover:border-teal-500 hover:bg-teal-50",
            isLoading && "pointer-events-none opacity-50",
            files.length >= maxFiles && "pointer-events-none opacity-50",
          )}
          onClick={() => fileInputRef.current?.click()}
          type="button"
        >
          <Upload className="size-5 text-muted-foreground" />
          <span className="text-muted-foreground text-sm">
            {isLoading
              ? "Đang tải..."
              : `Tải lên file PDF (tối đa ${maxFiles} file)`}
          </span>
        </button>
        {files.length > 0 && (
          <Button onClick={handleChangeAll} type="button" variant="outline">
            Đổi file
          </Button>
        )}
      </div>
    </div>
  );
}
