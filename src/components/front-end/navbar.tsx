"use client";

import { ChevronDown, MenuIcon } from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/doctors", label: "Bác sĩ" },
  { href: "/services", label: "Dịch vụ" },
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
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <nav className="border-gray-400/30 border-b bg-blue-950 py-3 sm:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link className="font-bold text-gray-50 text-lg sm:text-xl" href="/">
          MedicalApp
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} text-gray-50 hover:bg-blue-900 hover:text-white focus:bg-blue-900 focus:text-white aria-expanded:bg-blue-900 aria-expanded:text-white data-[active=true]:bg-blue-900 data-open:bg-blue-900 data-[active=true]:text-white data-open:text-white`}
                  href={link.href}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:block">
          <Button
            className="rounded-md bg-blue-600 px-6 py-2.5 text-gray-50 text-sm hover:bg-blue-700"
            variant="default"
          >
            Đăng nhập
          </Button>
        </div>

        <Sheet onOpenChange={setOpen} open={open}>
          <SheetTrigger
            render={
              <button
                aria-label="Mở menu"
                className="text-gray-50 lg:hidden"
                type="button"
              />
            }
          >
            <MenuIcon className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            className="flex w-64 flex-col border-blue-900 bg-blue-950 sm:w-72"
            side="left"
          >
            <div className="flex-1 pt-2">
              <div className="flex flex-col">
                {navLinks.map((link, index) => (
                  <div key={link.href}>
                    <Link
                      className="block px-4 py-3 text-gray-50 text-sm transition-colors hover:text-blue-400"
                      href={link.href}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {index < navLinks.length - 1 && (
                      <Separator className="bg-gray-700" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 border-gray-700 border-t pt-2">
                {mobileMenuData.map((group) => (
                  <div key={group.category}>
                    <button
                      className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold text-blue-400 text-sm transition-colors hover:text-blue-300"
                      onClick={() => toggleCategory(group.category)}
                      type="button"
                    >
                      {group.category}
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                          expandedCategory === group.category
                            ? "rotate-180"
                            : ""
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
                          className="block py-2 pr-4 pl-8 text-gray-400 text-sm transition-colors hover:text-blue-400"
                          href={`/services/${item.slug}`}
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

            <div className="border-gray-700 border-t px-4 pt-4 pb-6">
              <Button
                className="w-full rounded-md bg-blue-600 py-3 text-gray-50 text-sm hover:bg-blue-700"
                variant="default"
              >
                Đăng nhập
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
