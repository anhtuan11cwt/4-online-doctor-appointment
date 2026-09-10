"use client";

import { ChevronDown, MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/doctors", label: "Bác sĩ" },
  { href: "/services", label: "Dịch vụ" },
  { href: "/join/doctors", label: "Liên kết dịch vụ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/contact", label: "Liên hệ" },
];

const mobileMenuData = [
  {
    category: "Đặt nhiều nhất",
    items: [
      { slug: "tri-lieu", title: "Trị liệu" },
      { slug: "ke-don-truc-tuyen", title: "Kê đơn trực tuyến" },
      { slug: "hen-truc-tiep", title: "Hẹn trực tiếp" },
      { slug: "tu-van-khan-cap", title: "Tư vấn khẩn cấp" },
    ],
  },
  {
    category: "Bác sĩ",
    items: [
      { slug: "bac-si-kham-chung", title: "Bác sĩ khám chung" },
      { slug: "bac-si-tam-than", title: "Bác sĩ tâm thần" },
      { slug: "bac-si-nhi", title: "Bác sĩ nhi" },
      { slug: "bac-si-da-lieu", title: "Bác sĩ da liễu" },
    ],
  },
  {
    category: "Chuyên khoa",
    items: [
      { slug: "bac-si-nghe-nghiep", title: "Bác sĩ nghề nghiệp" },
      { slug: "bac-si-vat-ly-tri-lieu", title: "Bác sĩ vật lý trị liệu" },
      { slug: "bac-si-tri-lieu-ngon-ngu", title: "Bác sĩ trị liệu ngôn ngữ" },
      { slug: "bac-si-cham-cuu", title: "Bác sĩ châm cứu" },
    ],
  },
  {
    category: "Triệu chứng",
    items: [
      { slug: "lo-au", title: "Lo âu" },
      { slug: "tram-cam", title: "Trầm cảm" },
      { slug: "dau-dai-dang", title: "Đau dai dẳng" },
      { slug: "roi-luan-giac-ngu", title: "Mất ngủ" },
    ],
  },
  {
    category: "Dành cho Bác sĩ",
    items: [{ slug: "/join/doctors", title: "Liên kết dịch vụ" }],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
        setExpandedCategory(null);
      }
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

  const toggleCategory = (category: string) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-gray-200 border-b bg-white py-2.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
        <Link className="hidden lg:block" href="/">
          <Image
            alt="Logo ứng dụng y tế"
            className="h-auto w-44"
            height={40}
            src="/logo.svg"
            width={176}
          />
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-blue-700 focus:text-blue-700 aria-expanded:text-blue-700 data-[active=true]:text-blue-700 data-open:text-blue-700`}
                  href={link.href}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:block">
          <Link href="/login">
            <Button
              className="rounded-md bg-blue-700 px-6 py-2 text-sm text-white hover:bg-blue-800"
              variant="default"
            >
              Đăng nhập
            </Button>
          </Link>
        </div>

        <button
          aria-label={open ? "Đóng menu" : "Mở menu"}
          className="text-gray-900 lg:hidden"
          onClick={() => setOpen(!open)}
          type="button"
        >
          {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <button
          aria-label="Đóng menu"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          type="button"
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed top-0 left-0 z-50 h-dvh w-72 overflow-y-auto border-gray-200 border-r bg-white transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto pt-2">
            <div className="flex flex-col">
              {navLinks.map((link, index) => (
                <div key={link.href}>
                  <Link
                    className="block px-4 py-3 text-gray-900 text-sm transition-colors hover:text-blue-700"
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <Separator className="bg-gray-200" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 border-gray-200 border-t pt-2">
              {mobileMenuData.map((group) => (
                <div key={group.category}>
                  <button
                    className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold text-blue-700 text-sm transition-colors hover:text-blue-800"
                    onClick={() => toggleCategory(group.category)}
                    type="button"
                  >
                    {group.category}
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                        expandedCategory === group.category ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      expandedCategory === group.category
                        ? "max-h-60 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {group.items.map((item) => (
                      <Link
                        className="block py-2 pr-4 pl-8 text-gray-500 text-sm transition-colors hover:text-blue-700"
                        href={
                          item.slug.startsWith("/")
                            ? item.slug
                            : `/services/${item.slug}`
                        }
                        key={item.slug}
                        onClick={() => setOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-gray-200 border-t px-4 pt-4 pb-6">
            <Link href="/login">
              <Button
                className="w-full rounded-md bg-blue-700 py-3 text-sm text-white hover:bg-blue-800"
                variant="default"
              >
                Đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
