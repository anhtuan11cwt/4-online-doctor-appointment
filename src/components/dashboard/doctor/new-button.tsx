import { Plus } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewButtonProps {
  href: string;
  title: string;
}

export default function NewButton({ title, href }: NewButtonProps) {
  return (
    <Link className={cn(buttonVariants({ variant: "outline" }))} href={href}>
      <Plus className="mr-2 h-4 w-4" />
      {title}
    </Link>
  );
}
