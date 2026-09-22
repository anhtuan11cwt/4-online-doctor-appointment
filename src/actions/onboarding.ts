"use server";

import { prisma } from "@/lib/db";
import { sendWelcomeEmail } from "./users";

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
      return { data: updated, status: 201 };
    }

    const newProfile = await prisma.doctorProfile.create({
      data: data as Parameters<typeof prisma.doctorProfile.create>[0]["data"],
    });

    return { data: newProfile, status: 201 };
  } catch (error) {
    console.error("Lỗi tạo doctor profile:", error);
    return { error: "Đã có lỗi xảy ra", status: 500 };
  }
}

export async function updateDoctorProfile(
  userId: string,
  data: Record<string, unknown>,
) {
  try {
    const updateData = { ...data };
    delete updateData.id;
    delete updateData.userId;
    const updatedProfile = await prisma.doctorProfile.update({
      data: updateData as Parameters<
        typeof prisma.doctorProfile.update
      >[0]["data"],
      where: { userId },
    });

    return { data: updatedProfile, status: 201 };
  } catch (error) {
    console.error("Lỗi cập nhật doctor profile:", error);
    return { error: "Đã có lỗi xảy ra", status: 500 };
  }
}

export async function getApplicationByTrackingNumber(trackingNumber: string) {
  try {
    const existingProfile = await prisma.doctorProfile.findUnique({
      where: { trackingNumber },
    });

    if (!existingProfile) {
      return {
        error: "Mã theo dõi không đúng",
        status: 404,
      };
    }

    return { data: existingProfile, status: 200 };
  } catch (error) {
    console.error("Lỗi tìm kiếm đơn đăng ký:", error);
    return { error: "Đã có lỗi xảy ra", status: 500 };
  }
}

export async function getDoctorProfileById(userId: string) {
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
    console.error("Lỗi lấy doctor profile:", error);
    return { error: "Đã có lỗi xảy ra", status: 500 };
  }
}

export async function completeDoctorProfile(
  userId: string,
  data: Record<string, unknown>,
) {
  try {
    const existingProfile = await prisma.doctorProfile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      return { data: null, error: "Không tìm thấy hồ sơ", status: 404 };
    }

    const firstName = existingProfile.firstName as string;
    const email = existingProfile.email as string;

    await sendWelcomeEmail(firstName, email, {
      message:
        "Cảm ơn bạn đã tham gia Online Doctors. Chúng tôi rất vui khi có bạn trên nền tảng.",
      subject: "Chào mừng bạn đến với Online Doctors!",
    });

    const updateData = { ...data };
    delete updateData.id;
    delete updateData.userId;

    const updatedProfile = await prisma.doctorProfile.update({
      data: updateData as Parameters<
        typeof prisma.doctorProfile.update
      >[0]["data"],
      where: { userId },
    });

    return { data: updatedProfile, status: 201 };
  } catch (error) {
    console.error("Lỗi hoàn tất hồ sơ:", error);
    return { error: "Đã có lỗi xảy ra", status: 500 };
  }
}
