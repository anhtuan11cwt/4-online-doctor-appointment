"use client";

import { ChevronDown, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  const router = useRouter();
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
  const userImage = user?.image || null;
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-2 border-b bg-background px-4 sm:h-16 sm:px-6">
      <SidebarTrigger className="md:hidden" />

      <div className="ml-auto flex items-center gap-2">
        <ModeToggle />

        <DropdownMenu onOpenChange={setOpen} open={open}>
          <DropdownMenuTrigger
            render={
              <button
                className="flex cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-accent sm:gap-3"
                type="button"
              />
            }
          >
            <Avatar size="sm">
              {userImage && <AvatarImage alt={userName} src={userImage} />}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="hidden text-left md:block">
              <p className="font-medium text-sm">{userName}</p>
              <p className="text-muted-foreground text-xs">{userEmail}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-center">
                <p className="font-medium text-sm">{userName}</p>
                <p className="font-light text-slate-500 text-xs">{userEmail}</p>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/settings")}
            >
              <Settings className="mr-2 size-4" />
              Cài đặt
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 size-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
