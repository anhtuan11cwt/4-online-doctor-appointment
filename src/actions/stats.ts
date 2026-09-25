"use server";

import { prisma } from "@/lib/db";

export type Stats = {
  appointments: string;
  doctors: string;
  patients: string;
  services: string;
};

export async function getStats(): Promise<Stats> {
  try {
    const [doctors, patients, services] = await Promise.all([
      prisma.doctorProfile.count(),
      prisma.user.count({ where: { role: "USER" } }),
      prisma.service.count(),
    ]);

    return {
      appointments: "00",
      doctors: doctors.toString().padStart(2, "0"),
      patients: patients.toString().padStart(2, "0"),
      services: services.toString().padStart(2, "0"),
    };
  } catch (error) {
    console.error("Lỗi lấy thống kê dashboard:", error);
    return {
      appointments: "00",
      doctors: "00",
      patients: "00",
      services: "00",
    };
  }
}
