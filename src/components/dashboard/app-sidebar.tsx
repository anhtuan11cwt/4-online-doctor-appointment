"use client";

import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CheckSquare,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type SidebarLink = {
  icon: LucideIcon;
  name: string;
  path: string;
};

const roles: Record<string, SidebarLink[]> = {
  ADMIN: [
    { icon: LayoutDashboard, name: "Dashboard", path: "/dashboard" },
    { icon: Users, name: "Bác sĩ", path: "/dashboard/doctors" },
    { icon: Users, name: "Bệnh nhân", path: "/dashboard/patients" },
    {
      icon: CalendarDays,
      name: "Lịch hẹn",
      path: "/dashboard/appointments",
    },
    { icon: Settings, name: "Cài đặt", path: "/dashboard/settings" },
  ],
  DOCTOR: [
    { icon: LayoutDashboard, name: "Dashboard", path: "/dashboard" },
    {
      icon: CalendarDays,
      name: "Lịch hẹn",
      path: "/dashboard/doctor/appointments",
    },
    { icon: Users, name: "Bệnh nhân", path: "/dashboard/doctor/patients" },
    { icon: Mail, name: "Hộp thư", path: "/dashboard/doctor/inbox" },
    { icon: CheckSquare, name: "Công việc", path: "/dashboard/doctor/tasks" },
    { icon: Settings, name: "Cài đặt", path: "/dashboard/doctor/settings" },
  ],
  USER: [
    { icon: LayoutDashboard, name: "Dashboard", path: "/dashboard" },
    {
      icon: CalendarDays,
      name: "Lịch hẹn",
      path: "/dashboard/appointments",
    },
    { icon: Settings, name: "Cài đặt", path: "/dashboard/settings" },
  ],
};

interface AppSidebarProps {
  session?: {
    user?: {
      role?: string;
    };
  };
}

export default function AppSidebar({ session }: AppSidebarProps) {
  const pathname = usePathname();
  const role = session?.user?.role || "USER";
  const sidebarLinks = roles[role] || roles.USER;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <Image alt="Logo" height={32} src="/logo.svg" width={140} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarLinks.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.path ||
                  (item.path !== "/dashboard" &&
                    pathname.startsWith(item.path));
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={isActive}
                      render={<Link href={item.path} />}
                      tooltip={item.name}
                    >
                      <Icon className="size-4" />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                toast.success("Đăng xuất thành công!");
                signOut({ callbackUrl: "/login" });
              }}
              tooltip="Đăng xuất"
            >
              <LogOut className="size-4" />
              <span>Đăng xuất</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
