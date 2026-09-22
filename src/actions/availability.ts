"use server";

import { prisma } from "@/lib/db";

export async function getDoctorProfileWithAvailability(userId: string) {
  try {
    const profile = await prisma.doctorProfile.findUnique({
      include: { availability: true },
      where: { userId },
    });

    if (!profile) {
      return { data: null, status: 404 };
    }

    return { data: profile, status: 200 };
  } catch (error) {
    console.error("Lỗi lấy doctor profile với availability:", error);
    return { error: "Đã có lỗi xảy ra", status: 500 };
  }
}

export async function createAvailability(data: Record<string, unknown>) {
  try {
    const doctorProfileId = data.doctorProfileId as string;
    const existing = await prisma.availability.findUnique({
      where: { doctorProfileId },
    });

    if (existing) {
      const updateData = { ...data };
      delete updateData.doctorProfileId;
      const updated = await prisma.availability.update({
        data: updateData as Parameters<
          typeof prisma.availability.update
        >[0]["data"],
        where: { doctorProfileId },
      });
      return { data: updated, status: 200 };
    }

    const newAvailability = await prisma.availability.create({
      data: data as Parameters<typeof prisma.availability.create>[0]["data"],
    });

    return { data: newAvailability, status: 201 };
  } catch (error) {
    console.error("Lỗi tạo availability:", error);
    return { error: "Đã có lỗi xảy ra", status: 500 };
  }
}

export async function updateAvailabilityById(
  id: string,
  data: Record<string, unknown>,
) {
  try {
    const updateData = { ...data };
    delete updateData.id;

    const updatedAvailability = await prisma.availability.update({
      data: updateData as Parameters<
        typeof prisma.availability.update
      >[0]["data"],
      where: { id },
    });

    return { data: updatedAvailability, status: 200 };
  } catch (error) {
    console.error("Lỗi cập nhật availability:", error);
    return { error: "Đã có lỗi xảy ra", status: 500 };
  }
}
