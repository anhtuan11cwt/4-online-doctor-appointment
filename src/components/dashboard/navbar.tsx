"use client";

import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardNavbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const user = session?.user;
  const userName = user?.name || "Admin";
  const userEmail = user?.email || "admin@example.com";

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-2 border-b bg-background px-4 sm:h-16 sm:px-6">
      <SidebarTrigger className="md:hidden" />

      <div className="ml-auto flex items-center gap-2">
        <ModeToggle />

        <DropdownMenu onOpenChange={setOpen} open={open}>
          <DropdownMenuTrigger
            render={
              <button
                className="flex items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-accent sm:gap-3"
                type="button"
              />
            }
          >
            <Image
              alt="Avatar"
              className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
              height={100}
              src="/doc1.png"
              width={100}
            />
            <div className="hidden text-left md:block">
              <p className="font-medium text-sm">{userName}</p>
              <p className="text-muted-foreground text-xs">{userEmail}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <p className="font-medium text-sm">{userName}</p>
                <p className="text-muted-foreground text-xs">{userEmail}</p>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                toast.success("Đăng xuất thành công!");
                signOut({ callbackUrl: "/login" });
              }}
            >
              <LogOut className="mr-2 size-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
