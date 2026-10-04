import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { DoctorDetail } from "@/types";

const availabilitySelect = {
  friday: true,
  monday: true,
  saturday: true,
  sunday: true,
  thursday: true,
  tuesday: true,
  wednesday: true,
} satisfies Prisma.AvailabilitySelect;

const doctorSelect = {
  doctorProfile: {
    select: {
      accomplishments: true,
      availability: { select: availabilitySelect },
      bio: true,
      gender: true,
      hospitalAddress: true,
      hospitalName: true,
      hourlyWage: true,
      hoursOfOperation: true,
      insuranceAccepted: true,
      languagesSpoken: true,
      operationMode: true,
      otherSpecialties: true,
      primarySpecialization: true,
      profilePicture: true,
      servicesOffered: true,
      yearsOfExperience: true,
    },
  },
  email: true,
  id: true,
  name: true,
  phone: true,
  slug: true,
} satisfies Prisma.UserSelect;

const doctorDetailSelect = {
  doctorProfile: {
    select: {
      ...doctorSelect.doctorProfile.select,
      educationHistory: true,
      email: true,
      firstName: true,
      lastName: true,
      medicalLicense: true,
      middleName: true,
      phone: true,
      publishedWork: true,
      service: { select: { title: true } },
      specialty: { select: { title: true } },
    },
  },
  email: true,
  id: true,
  name: true,
  phone: true,
  slug: true,
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

export async function getDoctorBySlug(
  slug: string,
): Promise<DoctorDetail | null> {
  try {
    const isObjectId = /^[0-9a-f]{24}$/i.test(slug);

    const doctor = await prisma.user.findFirst({
      select: doctorDetailSelect,
      where: isObjectId ? { OR: [{ slug }, { id: slug }] } : { slug },
    });

    return doctor;
  } catch (error) {
    console.error("Lỗi lấy bác sĩ theo slug:", error);
    return null;
  }
}
