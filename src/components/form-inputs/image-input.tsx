"use client";

import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ImageInputProps {
  className?: string;
  disabled?: boolean;
  imageUrl?: string;
  label: string;
  maxSizeMB?: number;
  setFile: (file: File | null) => void;
  setImageUrl?: (url: string) => void;
}

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

export default function ImageInput({
  label,
  imageUrl,
  setFile,
  setImageUrl,
  disabled = false,
  maxSizeMB = 5,
  className,
}: ImageInputProps) {
  const [preview, setPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displaySrc = preview || imageUrl || "";

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!ALLOWED_TYPES.includes(selected.type)) {
      toast.error("Chỉ chấp nhận file ảnh (JPEG, PNG, WebP, GIF, SVG)");
      e.target.value = "";
      return;
    }
    if (selected.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Kích thước ảnh không được vượt quá ${maxSizeMB}MB`);
      e.target.value = "";
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleRemove = () => {
    setFile(null);
    setPreview("");
    setImageUrl?.("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label>{label}</Label>}
      <input
        accept="image/*"
        className="hidden"
        disabled={disabled}
        onChange={handleSelect}
        ref={fileInputRef}
        type="file"
      />

      {displaySrc ? (
        <div
          className={cn(
            "relative size-32 overflow-hidden rounded-md border",
            disabled && "pointer-events-none opacity-50",
          )}
        >
          <Image
            alt="Ảnh xem trước"
            className="object-cover"
            fill
            sizes="128px"
            src={displaySrc}
          />
          <Button
            className="absolute top-1 right-1 size-6 rounded-full"
            onClick={handleRemove}
            size="icon"
            type="button"
            variant="destructive"
          >
            <X className="size-3" />
          </Button>
        </div>
      ) : (
        <button
          className={cn(
            "flex size-32 flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed transition-colors hover:border-teal-500 hover:bg-teal-50",
            disabled && "pointer-events-none opacity-50",
          )}
          onClick={() => fileInputRef.current?.click()}
          type="button"
        >
          <ImagePlus className="size-8 text-muted-foreground" />
          <span className="text-muted-foreground text-xs">Chọn ảnh</span>
        </button>
      )}
    </div>
  );
}

export async function uploadToCloudinary(
  file: File,
  folder = "doctorProfile",
  oldImageUrl?: string,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch("/api/upload", {
    body: formData,
    method: "POST",
  });

  if (!response.ok) throw new Error("Tải file lên thất bại");

  const data = await response.json();
  const newUrl: string = data.url;

  // Delete old image after successful upload
  if (oldImageUrl) {
    await fetch("/api/upload", {
      body: JSON.stringify({ imageUrl: oldImageUrl }),
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });
  }

  return newUrl;
}

export async function deleteFromCloudinary(imageUrl: string): Promise<boolean> {
  const response = await fetch("/api/upload", {
    body: JSON.stringify({ imageUrl }),
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  });
  return response.ok;
}
