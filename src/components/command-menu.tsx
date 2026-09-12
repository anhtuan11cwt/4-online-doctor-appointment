"use client";

import { Circle, File, Laptop, Moon, Sun, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { siteConfig } from "@/config/site";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandInput placeholder="Gõ lệnh hoặc tìm kiếm..." />
      <CommandList>
        <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
        <CommandGroup heading="Trang">
          {siteConfig.navItems.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => runCommand(() => router.push(item.href))}
              value={item.label}
            >
              <File className="mr-2 size-4" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Danh mục">
          {siteConfig.megaMenuData.map((category) =>
            category.services.map((service) => (
              <CommandItem
                key={service.slug}
                onSelect={() =>
                  runCommand(() => router.push(`/services/${service.slug}`))
                }
                value={service.title}
              >
                <Circle className="mr-2 size-4" />
                <span>{service.title}</span>
              </CommandItem>
            )),
          )}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Chế độ">
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
            <Sun className="mr-2 size-4" />
            Sáng
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
            <Moon className="mr-2 size-4" />
            Tối
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
            <Laptop className="mr-2 size-4" />
            Hệ thống
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Tài khoản">
          <CommandItem onSelect={() => runCommand(() => router.push("/login"))}>
            <User className="mr-2 size-4" />
            Đăng nhập
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
