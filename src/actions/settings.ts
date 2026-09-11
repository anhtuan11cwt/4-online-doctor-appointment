"use server";

import { prisma } from "@/lib/db";
import { settingsSchema } from "@/lib/validations";

export async function updateSettings(userId: string, data: unknown) {
  try {
    const validated = settingsSchema.safeParse(data);

    if (!validated.success) {
      const errors: Record<string, string> = {};
      for (const issue of validated.error.issues) {
        const field = issue.path[0] as string;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }
      return {
        errors,
        message: "Dữ liệu không hợp lệ",
        success: false,
      };
    }

    const { name, email, phone } = validated.data;

    // Kiểm tra email trùng lặp (trừ user hiện tại)
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: userId },
      },
    });

    if (existingUser) {
      return {
        errors: { email: "Email đã được sử dụng bởi tài khoản khác" },
        message: "Email đã tồn tại",
        success: false,
      };
    }

    await prisma.user.update({
      data: { email, name, phone },
      where: { id: userId },
    });

    return {
      errors: null,
      message: "Cập nhật thành công",
      success: true,
    };
  } catch (error) {
    console.error("Lỗi cập nhật settings:", error);
    return {
      errors: null,
      message: "Đã có lỗi xảy ra, vui lòng thử lại sau",
      success: false,
    };
  }
}
