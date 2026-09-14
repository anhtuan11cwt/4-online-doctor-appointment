"use client";

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  MenuIcon,
  Microscope,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

const navLinks = siteConfig.mainNav.map((item) => ({
  href: item.href,
  label: item.title,
}));

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

export default function Navbar({ session }: { session?: Session }) {
  const [open, setOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

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

  const isLoggedIn = session?.user?.email;

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b bg-background py-2.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
        <Link className="hidden items-center gap-2 lg:flex" href="/">
          <Microscope className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-lg">Bác sĩ trực tuyến</span>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} text-muted-foreground hover:text-foreground focus:text-foreground aria-expanded:text-foreground data-[active=true]:text-foreground data-open:text-foreground`}
                  href={link.href}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-2 lg:flex">
          <ModeToggle />
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 font-medium text-sm shadow-xs transition-colors hover:bg-muted">
                <User className="h-4 w-4" />
                {session.user.email}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <p className="text-sm">
                      {session.user.name || session.user.email}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link className="flex items-center" href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button
                className="rounded-md bg-blue-700 px-6 py-2 text-sm text-white hover:bg-blue-800"
                variant="default"
              >
                Đăng nhập
              </Button>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ModeToggle />
          <button
            aria-label={open ? "Đóng menu" : "Mở menu"}
            className="text-foreground"
            onClick={() => setOpen(!open)}
            type="button"
          >
            {open ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
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
        className={`fixed top-0 left-0 z-50 h-dvh w-72 overflow-y-auto border-r bg-background transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto pt-2">
            <div className="flex items-center gap-2 px-4 py-3">
              <Microscope className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-lg">Bác sĩ trực tuyến</span>
            </div>
            <Separator />
            <div className="flex flex-col">
              {navLinks.map((link, index) => (
                <div key={link.href}>
                  <Link
                    className="block px-4 py-3 text-foreground text-sm transition-colors hover:text-blue-700"
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {index < navLinks.length - 1 && <Separator />}
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-2">
              {mobileMenuData.map((group) => (
                <div key={group.category}>
                  <button
                    className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold text-blue-700 text-sm transition-colors hover:text-blue-800"
                    onClick={() => toggleCategory(group.category)}
                    type="button"
                  >
                    {group.category}
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
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
                        className="block py-2 pr-4 pl-8 text-muted-foreground text-sm transition-colors hover:text-blue-700"
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

          <div className="border-t px-4 pt-4 pb-6">
            {isLoggedIn ? (
              <div className="space-y-2">
                <p className="px-2 text-muted-foreground text-sm">
                  {session.user.email}
                </p>
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <Button
                    className="w-full rounded-md py-3 text-sm"
                    variant="outline"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  className="w-full rounded-md bg-red-600 py-3 text-sm text-white hover:bg-red-700"
                  onClick={handleLogout}
                  variant="default"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  className="w-full rounded-md bg-blue-700 py-3 text-sm text-white hover:bg-blue-800"
                  variant="default"
                >
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
