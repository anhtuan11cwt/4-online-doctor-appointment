import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
});

export const CLOUDINARY_FOLDERS = {
  additionalDocs: "4-online-doctor-appointment/additional-docs",
  doctorProfile: "4-online-doctor-appointment/doctor-profile",
  patientMedicalFiles: "4-online-doctor-appointment/patient-medical-files",
  serviceImage: "4-online-doctor-appointment/service-image",
} as const;

export type UploadFolder = keyof typeof CLOUDINARY_FOLDERS;

export function extractPublicId(imageUrl: string): string | null {
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

export async function destroyCloudinaryImage(
  imageUrl: string,
): Promise<boolean> {
  const publicId = extractPublicId(imageUrl);
  if (!publicId) return false;

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Lỗi xóa ảnh Cloudinary:", error);
    return false;
  }
}

export default cloudinary;
