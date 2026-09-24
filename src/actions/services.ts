"use server";

import { revalidatePath } from "next/cache";
import { destroyCloudinaryImage } from "@/lib/cloudinary";
import { prisma } from "@/lib/db";
import type { ServiceProps } from "@/types";

const seedServices: ServiceProps[] = [
  { imageUrl: "", slug: "telehealth-visit", title: "Khám từ xa" },
  {
    imageUrl: "",
    slug: "video-prescription-refill",
    title: "Cấp lại đơn qua video",
  },
  {
    imageUrl: "",
    slug: "in-person-doctor-visit",
    title: "Khám trực tiếp",
  },
  { imageUrl: "", slug: "uti-consult", title: "Tư vấn nhiễm trùng tiểu" },
  {
    imageUrl: "",
    slug: "mental-health-consult",
    title: "Tư vấn sức khỏe tâm thần",
  },
  { imageUrl: "", slug: "ed-consult", title: "Tư vấn rối loạn cương dương" },
];

export async function createService(data: ServiceProps) {
  try {
    const existing = await prisma.service.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return { data: null, error: "Dịch vụ đã tồn tại", status: 409 };
    }

    const newService = await prisma.service.create({ data });
    revalidatePath("/dashboard/services");

    return { data: newService, error: null, status: 201 };
  } catch (error) {
    console.error("Lỗi tạo dịch vụ:", error);
    return { data: null, error: "Đã có lỗi xảy ra", status: 500 };
  }
}

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return services;
  } catch (error) {
    console.error("Lỗi lấy danh sách dịch vụ:", error);
    return [];
  }
}

export async function deleteService(id: string) {
  try {
    const service = await prisma.service.delete({ where: { id } });
    revalidatePath("/dashboard/services");

    if (service.imageUrl) {
      const destroyed = await destroyCloudinaryImage(service.imageUrl);
      if (!destroyed) {
        console.warn(
          `Không thể xóa ảnh Cloudinary của dịch vụ: ${service.slug}`,
        );
      }
    }

    return { data: null, error: null, status: 200 };
  } catch (error) {
    console.error("Lỗi xóa dịch vụ:", error);
    return { data: null, error: "Đã có lỗi xảy ra", status: 500 };
  }
}

export async function createManyServices() {
  try {
    for (const service of seedServices) {
      await createService(service);
    }
    return { data: null, error: null, status: 201 };
  } catch (error) {
    console.error("Lỗi tạo nhiều dịch vụ:", error);
    return { data: null, error: "Đã có lỗi xảy ra", status: 500 };
  }
}
