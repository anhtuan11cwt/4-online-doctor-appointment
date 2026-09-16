import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
});

export const CLOUDINARY_FOLDERS = {
  additionalDocs: "4-online-doctor-appointment/additional-docs",
  doctorProfile: "4-online-doctor-appointment/doctor-profile",
} as const;

export type UploadFolder = keyof typeof CLOUDINARY_FOLDERS;

export default cloudinary;
