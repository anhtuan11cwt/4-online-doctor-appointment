import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
