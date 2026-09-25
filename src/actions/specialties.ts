"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import type { SpecialtyProps } from "@/types";

const seedSpecialties: SpecialtyProps[] = [
  { slug: "imaging-and-radiology", title: "Chẩn đoán hình ảnh và X-quang" },
  { slug: "primary-care", title: "Chăm sóc sức khỏe ban đầu" },
  { slug: "dermatology", title: "Da liễu" },
  { slug: "pediatrics", title: "Nhi khoa" },
  { slug: "psychiatry", title: "Tâm thần học" },
  { slug: "cardiology", title: "Tim mạch" },
  { slug: "neurology", title: "Thần kinh học" },
];

export async function createSpeciality(data: SpecialtyProps) {
  try {
    const existing = await prisma.specialty.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return { data: null, error: "Chuyên khoa đã tồn tại", status: 409 };
    }

    const newSpeciality = await prisma.specialty.create({ data });
    revalidatePath("/dashboard/specialties");

    return { data: newSpeciality, error: null, status: 201 };
  } catch (error) {
    console.error("Lỗi tạo chuyên khoa:", error);
    return { data: null, error: "Đã có lỗi xảy ra", status: 500 };
  }
}

export async function getSpecialities() {
  try {
    const specialities = await prisma.specialty.findMany({
      orderBy: { createdAt: "desc" },
    });
    return specialities;
  } catch (error) {
    console.error("Lỗi lấy danh sách chuyên khoa:", error);
    return [];
  }
}

export async function deleteSpeciality(id: string) {
  try {
    await prisma.specialty.delete({ where: { id } });
    revalidatePath("/dashboard/specialties");
    return { data: null, error: null, status: 200 };
  } catch (error) {
    console.error("Lỗi xóa chuyên khoa:", error);
    return { data: null, error: "Đã có lỗi xảy ra", status: 500 };
  }
}

export async function createManySpecialities() {
  try {
    for (const specialty of seedSpecialties) {
      await createSpeciality(specialty);
    }
    return { data: null, error: null, status: 201 };
  } catch (error) {
    console.error("Lỗi tạo nhiều chuyên khoa:", error);
    return { data: null, error: "Đã có lỗi xảy ra", status: 500 };
  }
}

export async function getSpecialtyBySlug(slug: string) {
  try {
    const specialty = await prisma.specialty.findUnique({ where: { slug } });
    return specialty;
  } catch (error) {
    console.error("Lỗi lấy chuyên khoa theo slug:", error);
    return null;
  }
}

export async function updateSpecialty(id: string, data: SpecialtyProps) {
  try {
    const existing = await prisma.specialty.findUnique({ where: { id } });

    if (!existing) {
      return { data: null, error: "Chuyên khoa không tồn tại", status: 404 };
    }

    const updated = await prisma.specialty.update({ data, where: { id } });
    revalidatePath("/dashboard/specialties");

    return { data: updated, error: null, status: 200 };
  } catch (error) {
    console.error("Lỗi cập nhật chuyên khoa:", error);
    return { data: null, error: "Đã có lỗi xảy ra", status: 500 };
  }
}
