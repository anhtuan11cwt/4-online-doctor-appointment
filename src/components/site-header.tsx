"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";
import { CommandMenu } from "@/components/command-menu";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden lg:block">
            <CommandMenu />
          </div>
          <ModeToggle />
          <Link href="/login">
            <Button size="sm" variant="ghost">
              <LogIn className="mr-2 size-4" />
              Đăng nhập
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
