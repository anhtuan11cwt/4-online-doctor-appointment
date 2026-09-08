"use client";

import { usePathname } from "next/navigation";
import MegaMenu from "@/components/front-end/mega-menu";
import Navbar from "@/components/front-end/navbar";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <div>
      <Navbar />
      {!isAuthPage && <MegaMenu />}
      <main>{children}</main>
    </div>
  );
}
