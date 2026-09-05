import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LinkCardProps = {
  title: string;
  href: string;
  className?: string;
};

export default function LinkCard({ title, href, className }: LinkCardProps) {
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center justify-between rounded-md px-6 py-3 text-slate-50 transition-all duration-300 hover:opacity-90",
          className || "bg-slate-800",
        )}
      >
        <h3 className="font-medium text-sm">{title}</h3>
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
