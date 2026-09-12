import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MainNav() {
  return (
    <div className="hidden gap-6 lg:flex">
      <Link className="mr-6 flex items-center space-x-2" href="/">
        <span className="hidden font-bold text-lg sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="gap-1">
          {siteConfig.navItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "text-muted-foreground hover:text-foreground",
                )}
                href={item.href}
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
