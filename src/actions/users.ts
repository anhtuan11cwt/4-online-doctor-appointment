"use server";

import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validations";

const transporter = nodemailer.createTransport({
  auth: {
    pass: process.env.GMAIL_PASS,
    user: process.env.GMAIL_USER,
  },
  service: "gmail",
});

function getVerificationEmailHtml(firstName: string, token: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:sans-serif;">
      <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);overflow:hidden;">
        <div style="background:#1d4ed8;padding:32px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:24px;">Medical App</h1>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#111827;margin:0 0 16px;font-size:20px;">Chào ${firstName}!</h2>
          <p style="color:#6b7280;margin:0 0 24px;line-height:1.6;">
            Cảm ơn bạn đã đăng ký tài khoản tại Medical App. Vui lòng sử dụng mã xác thực bên dưới để hoàn tất quá trình đăng ký.
          </p>
          <div style="text-align:center;margin:24px 0;">
            <div style="display:inline-block;background:#1d4ed8;color:#ffffff;font-size:32px;font-weight:bold;padding:16px 48px;border-radius:8px;letter-spacing:8px;">
              ${token}
            </div>
          </div>
          <p style="color:#9ca3af;font-size:13px;text-align:center;margin-top:24px;">
            Mã xác thực có hiệu lực trong 24 giờ. Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.
          </p>
        </div>
        <div style="background:#f9fafb;padding:16px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">
            © 2024 Medical App. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  } catch (error) {
    console.error("Lỗi lấy thông tin người dùng:", error);
    return null;
  }
}

export async function updateUserById(id: string) {
  try {
    const updatedUser = await prisma.user.update({
      data: { isVerified: true },
      where: { id },
    });

    return updatedUser;
  } catch (error) {
    console.error("Lỗi cập nhật người dùng:", error);
    return null;
  }
}

export async function updateOnboardingStep(id: string, page: string) {
  try {
    const updatedUser = await prisma.user.update({
      data: { onboardingPage: page },
      where: { id },
    });

    return updatedUser;
  } catch (error) {
    console.error("Lỗi cập nhật bước onboarding:", error);
    return null;
  }
}

export async function updateOnboardingData(
  id: string,
  step: string,
  data: Record<string, unknown>,
) {
  try {
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return { error: "Không tìm thấy người dùng" };
    }

    const currentData = existingUser.onboardingPage
      ? JSON.parse(existingUser.onboardingPage)
      : {};

    const updatedData = {
      ...currentData,
      [step]: data,
      currentPage: step,
    };

    await prisma.user.update({
      data: { onboardingPage: JSON.stringify(updatedData) },
      where: { id },
    });

    return { error: null };
  } catch (error) {
    console.error("Lỗi cập nhật dữ liệu onboarding:", error);
    return { error: "Đã có lỗi xảy ra" };
  }
}

export async function createUser(data: unknown) {
  try {
    const rawData = data as Record<string, unknown>;
    const role = (rawData.role as string) || "user";
    const plan = (rawData.plan as string) || "";

    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      const firstError = validated.error.issues[0];
      return {
        data: null,
        error: firstError?.message || "Dữ liệu không hợp lệ",
        status: 400,
      };
    }

    const { fullName, email, phone, password } = validated.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        data: null,
        error: `Người dùng với email ${email} đã tồn tại trong hệ thống`,
        status: 400,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = await prisma.user.create({
      data: {
        email,
        name: fullName,
        password: hashedPassword,
        phone,
        plan: plan || null,
        role: role?.toUpperCase() === "DOCTOR" ? "DOCTOR" : "USER",
        token,
      },
    });

    const firstName = fullName.split(" ")[0];

    await transporter.sendMail({
      from: `"Medical App" <${process.env.GMAIL_USER}>`,
      html: getVerificationEmailHtml(firstName, token),
      subject: "Xác thực email của bạn",
      to: email,
    });

    return {
      data: newUser,
      error: null,
      status: 201,
    };
  } catch (error) {
    console.error("Lỗi tạo người dùng:", error);
    return {
      data: null,
      error: "Đã có lỗi xảy ra, vui lòng thử lại sau",
      status: 500,
    };
  }
}
