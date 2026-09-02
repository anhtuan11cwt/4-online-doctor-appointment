import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Đặt Lịch Khám Bác Sĩ Online",
  description: "Hệ thống đặt lịch khám bác sĩ trực tuyến",
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
