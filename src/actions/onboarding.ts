"use server";

import { prisma } from "@/lib/db";

export async function createDoctorProfile(data: Record<string, unknown>) {
  try {
    const userId = data.userId as string;
    const existing = await prisma.doctorProfile.findUnique({
      where: { userId },
    });

    if (existing) {
      const updated = await prisma.doctorProfile.update({
        data: { ...data, userId } as Parameters<
          typeof prisma.doctorProfile.update
        >[0]["data"],
        where: { userId },
      });
      console.log("Doctor profile updated:", updated);
      return updated;
    }

    const newProfile = await prisma.doctorProfile.create({
      data: data as Parameters<typeof prisma.doctorProfile.create>[0]["data"],
    });

    console.log("Doctor profile created:", newProfile);
    return newProfile;
  } catch (error) {
    console.error("Lỗi tạo doctor profile:", error);
    throw error;
  }
}
