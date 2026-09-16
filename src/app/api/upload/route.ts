import { type NextRequest, NextResponse } from "next/server";
import cloudinary, { CLOUDINARY_FOLDERS } from "@/lib/cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
];

function extractPublicId(imageUrl: string): string | null {
  const parts = imageUrl.split("/");
  const uploadIndex = parts.indexOf("upload");
  if (uploadIndex === -1) return null;
  const pathParts = parts.slice(uploadIndex + 1);
  if (pathParts[0]?.startsWith("v") && pathParts[0].length > 1) {
    pathParts.shift();
  }
  const fullPath = pathParts.join("/");
  const dotIndex = fullPath.lastIndexOf(".");
  return dotIndex > 0 ? fullPath.substring(0, dotIndex) : fullPath;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folderKey = formData.get("folder") as string;

    if (!file) {
      return NextResponse.json(
        { error: "Không có file nào được cung cấp" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Chỉ chấp nhận file ảnh (JPEG, PNG, WebP, GIF, SVG)" },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Kích thước ảnh không được vượt quá 5MB" },
        { status: 400 },
      );
    }

    const folder =
      CLOUDINARY_FOLDERS[folderKey as keyof typeof CLOUDINARY_FOLDERS] ??
      CLOUDINARY_FOLDERS.doctorProfile;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as { secure_url: string });
          },
        );
        uploadStream.end(buffer);
      },
    );

    return NextResponse.json({ url: result.secure_url });
  } catch {
    return NextResponse.json(
      { error: "Tải file lên thất bại" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl } = body as { imageUrl?: string };

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Không có URL ảnh nào được cung cấp" },
        { status: 400 },
      );
    }

    const publicId = extractPublicId(imageUrl);
    if (!publicId) {
      return NextResponse.json(
        { error: "URL Cloudinary không hợp lệ" },
        { status: 400 },
      );
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return NextResponse.json({ error: "Xóa ảnh thất bại" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Xóa ảnh thất bại" }, { status: 500 });
  }
}
