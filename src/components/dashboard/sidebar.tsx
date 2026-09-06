"use client";

import {
  CalendarDays,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./logout-button";

const menuItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Bảng điều khiển" },
  {
    href: "/dashboard/appointments",
    icon: CalendarDays,
    label: "Lịch hẹn",
  },
  { href: "/dashboard/doctors", icon: Stethoscope, label: "Bác sĩ" },
  { href: "/dashboard/patients", icon: Users, label: "Bệnh nhân" },
  { href: "/dashboard/settings", icon: Settings, label: "Cài đặt" },
];

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          aria-label="Đóng menu"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
          type="button"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-dvh w-64 border-gray-200 border-r bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-4 hidden items-center lg:flex">
            <Image alt="Logo" height={32} src="/logo.svg" width={140} />
          </div>
          <div className="flex items-center justify-between lg:hidden">
            <span className="font-semibold text-gray-900 text-sm">Menu</span>
            <button onClick={onClose} type="button">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <nav className="mt-4 flex flex-col gap-1 lg:mt-0">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 font-medium text-sm transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  href={item.href}
                  key={item.href}
                  onClick={onClose}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-gray-200 border-t pt-4">
            <LogoutButton />
          </div>
        </div>
      </aside>
    </>
  );
}
