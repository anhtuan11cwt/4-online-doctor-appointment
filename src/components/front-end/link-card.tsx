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
          "flex min-w-0 items-center justify-between gap-2 rounded-md px-4 py-3 text-slate-50 transition-all duration-300 hover:opacity-90 min-[360px]:px-6",
          className || "bg-slate-800",
        )}
      >
        <h3 className="min-w-0 hyphens-auto break-words font-medium text-sm">
          {title}
        </h3>
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
