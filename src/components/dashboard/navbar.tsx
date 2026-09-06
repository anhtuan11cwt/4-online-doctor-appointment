"use client";

import { ChevronDown, LogOut, MenuIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DashboardNavbar({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
}) {
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

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex h-14 items-center border-gray-200 border-b bg-white px-4 sm:h-16 sm:px-6">
      <button
        className="mr-3 text-gray-900 lg:hidden"
        onClick={onToggleSidebar}
        type="button"
      >
        <MenuIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <Image
        alt="Logo"
        className="hidden h-auto w-44 lg:block"
        height={36}
        src="/logo.svg"
        width={176}
      />

      <div className="ml-auto flex items-center gap-4">
        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-gray-100 sm:gap-3"
            onClick={() => setOpen(!open)}
            type="button"
          >
            <Image
              alt="Doctor profile"
              className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
              height={100}
              src="/doc1.png"
              width={100}
            />
            <div className="hidden text-left md:block">
              <p className="font-medium text-gray-900 text-sm">Johnson Joe</p>
              <p className="text-gray-500 text-xs">johnson@gmail.com</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {open && (
            <>
              <button
                aria-label="Đóng menu"
                className="fixed inset-0 z-40 lg:hidden"
                onClick={() => setOpen(false)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setOpen(false);
                }}
                type="button"
              />
              <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                <div className="border-gray-100 border-b px-4 py-2">
                  <p className="font-medium text-gray-900 text-sm">
                    Johnson Joe
                  </p>
                  <p className="text-gray-500 text-xs">johnson@gmail.com</p>
                </div>
                <button
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-red-600 text-sm hover:bg-gray-50"
                  type="button"
                >
                  <LogOut className="h-4 w-4" />
                  Đăng xuất
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
