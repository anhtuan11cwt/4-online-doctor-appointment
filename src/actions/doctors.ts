import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

const doctorSelect = {
  doctorProfile: {
    select: {
      hospitalAddress: true,
      hourlyWage: true,
      operationMode: true,
      primarySpecialization: true,
      profilePicture: true,
    },
  },
  id: true,
  name: true,
} satisfies Prisma.UserSelect;

export async function getDoctors() {
  try {
    const doctors = await prisma.user.findMany({
      select: doctorSelect,
      where: { doctorProfile: { isNot: null } },
    });

    return doctors;
  } catch (error) {
    console.error("Lỗi lấy danh sách bác sĩ:", error);
    return [];
  }
}
