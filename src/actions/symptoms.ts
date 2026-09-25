"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import type { SymptomProps } from "@/types";

const seedSymptoms: SymptomProps[] = [
  { slug: "fever", title: "Sốt" },
  { slug: "cough", title: "Ho" },
  { slug: "headache", title: "Đau đầu" },
  { slug: "dizziness", title: "Chóng mặt" },
  { slug: "diarrhea", title: "Tiêu chảy" },
  { slug: "nausea", title: "Buồn nôn" },
  { slug: "vomiting", title: "Nôn mửa" },
  { slug: "fatigue", title: "Mệt mỏi" },
  { slug: "sore-throat", title: "Đau họng" },
  { slug: "runny-nose", title: "Chảy nước mũi" },
  { slug: "chest-pain", title: "Đau ngực" },
  { slug: "back-pain", title: "Đau lưng" },
  { slug: "stomach-pain", title: "Đau bụng" },
  { slug: "skin-rash", title: "Phát ban da" },
  { slug: "shortness-of-breath", title: "Khó thở" },
  { slug: "joint-pain", title: "Đau khớp" },
  { slug: "insomnia", title: "Mất ngủ" },
  { slug: "anxiety", title: "Lo âu" },
  { slug: "high-blood-pressure", title: "Cao huyết áp" },
  { slug: "allergies", title: "Dị ứng" },
];

export async function createSymptom(data: SymptomProps) {
  try {
    const existing = await prisma.symptom.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return { data: null, error: "Triệu chứng đã tồn tại", status: 409 };
    }

    const newSymptom = await prisma.symptom.create({ data });
    revalidatePath("/dashboard/symptoms");

    return { data: newSymptom, error: null, status: 201 };
  } catch (error) {
    console.error("Lỗi tạo triệu chứng:", error);
    return { data: null, error: "Đã có lỗi xảy ra", status: 500 };
  }
}

export async function getSymptoms() {
  try {
    const symptoms = await prisma.symptom.findMany({
      orderBy: { createdAt: "desc" },
    });
    return symptoms;
  } catch (error) {
    console.error("Lỗi lấy danh sách triệu chứng:", error);
    return [];
  }
}

export async function deleteSymptom(id: string) {
  try {
    await prisma.symptom.delete({ where: { id } });
    revalidatePath("/dashboard/symptoms");
    return { data: null, error: null, status: 200 };
  } catch (error) {
    console.error("Lỗi xóa triệu chứng:", error);
    return { data: null, error: "Đã có lỗi xảy ra", status: 500 };
  }
}

export async function createManySymptoms() {
  try {
    for (const symptom of seedSymptoms) {
      await createSymptom(symptom);
    }
    return { data: null, error: null, status: 201 };
  } catch (error) {
    console.error("Lỗi tạo nhiều triệu chứng:", error);
    return { data: null, error: "Đã có lỗi xảy ra", status: 500 };
  }
}

export async function getSymptomBySlug(slug: string) {
  try {
    const symptom = await prisma.symptom.findUnique({ where: { slug } });
    return symptom;
  } catch (error) {
    console.error("Lỗi lấy triệu chứng theo slug:", error);
    return null;
  }
}

export async function updateSymptomById(id: string, data: SymptomProps) {
  try {
    const existing = await prisma.symptom.findUnique({ where: { id } });

    if (!existing) {
      return { data: null, error: "Triệu chứng không tồn tại", status: 404 };
    }

    const updated = await prisma.symptom.update({ data, where: { id } });
    revalidatePath("/dashboard/symptoms");

    return { data: updated, error: null, status: 200 };
  } catch (error) {
    console.error("Lỗi cập nhật triệu chứng:", error);
    return { data: null, error: "Đã có lỗi xảy ra", status: 500 };
  }
}
