"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger
        render={
          <button
            className="mr-2 inline-flex items-center justify-center rounded-md px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:text-foreground lg:hidden"
            type="button"
          />
        }
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Mở menu</span>
      </SheetTrigger>
      <SheetContent className="pr-0" side="left">
        <SheetHeader>
          <SheetTitle>
            <Link
              className="flex items-center"
              href="/"
              onClick={() => setOpen(false)}
            >
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {siteConfig.navItems.map((item) => (
              <Link
                className="text-muted-foreground hover:text-foreground"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="mb-3 font-medium text-muted-foreground text-sm">
              Danh mục
            </h4>
            {siteConfig.megaMenuData.map((category) => (
              <div className="mb-4" key={category.title}>
                <h5 className="mb-2 font-medium text-sm">{category.title}</h5>
                <div className="flex flex-col space-y-2">
                  {category.services.map((service) => (
                    <Link
                      className="text-muted-foreground text-sm hover:text-foreground"
                      href={`/services/${service.slug}`}
                      key={service.slug}
                      onClick={() => setOpen(false)}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
