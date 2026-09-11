"use client";

import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Settings,
  Stethoscope,
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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const sidebarLinks = [
  {
    icon: LayoutDashboard,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: CalendarDays,
    name: "Lịch hẹn",
    path: "/dashboard/appointments",
  },
  {
    icon: Stethoscope,
    name: "Bác sĩ",
    path: "/dashboard/doctors",
  },
  {
    icon: Users,
    name: "Bệnh nhân",
    path: "/dashboard/patients",
  },
  {
    badgeCount: 6,
    icon: Settings,
    name: "Cài đặt",
    path: "/dashboard/settings",
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

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
                    {item.badgeCount && (
                      <SidebarMenuBadge>{item.badgeCount}</SidebarMenuBadge>
                    )}
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
