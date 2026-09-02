import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  description: "Hệ thống đặt lịch khám bác sĩ trực tuyến",
  title: "Đặt Lịch Khám Bác Sĩ Online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={cn("font-sans", inter.variable)} lang="vi">
      <body>{children}</body>
    </html>
  );
}
