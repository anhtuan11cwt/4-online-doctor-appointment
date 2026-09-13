"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { CommandMenu } from "@/components/command-menu";
import Footer from "@/components/front-end/footer";
import MegaMenu from "@/components/front-end/mega-menu";
import Navbar from "@/components/front-end/navbar";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <div className="flex min-h-screen flex-col">
      <CommandMenu />
      <Navbar session={session ?? undefined} />
      {!isAuthPage && <MegaMenu />}
      <main className="flex-1">{children}</main>
      <div className="bg-blue-50 py-8 dark:bg-slate-900" />
      <Footer />
    </div>
  );
}
