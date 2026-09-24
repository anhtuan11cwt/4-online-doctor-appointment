import { Plus } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewButtonProps {
  className?: string;
  href: string;
  title: string;
}

export default function NewButton({ title, href, className }: NewButtonProps) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "outline" }),
        "min-w-0 max-w-full",
        className,
      )}
      href={href}
    >
      <Plus className="mr-2 h-4 w-4 shrink-0" />
      <span className="truncate">{title}</span>
    </Link>
  );
}
