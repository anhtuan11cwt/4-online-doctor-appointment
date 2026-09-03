"use client";

import { MenuIcon } from "lucide-react";
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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-blue-950 py-3 sm:py-4">
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
                aria-label="Open menu"
                className="text-gray-50 lg:hidden"
                type="button"
              />
            }
          >
            <MenuIcon className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            className="w-64 border-blue-900 bg-blue-950 sm:w-72"
            side="left"
          >
            <div className="flex flex-col pt-2">
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
            <div className="px-4 pt-4">
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
