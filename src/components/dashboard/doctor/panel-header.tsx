import type { LucideIcon } from "lucide-react";
import NewButton from "./new-button";

interface PanelHeaderProps {
  buttonHref: string;
  buttonTitle: string;
  count: number;
  icon: LucideIcon;
  title: string;
}

export default function PanelHeader({
  title,
  count,
  icon: Icon,
  buttonTitle,
  buttonHref,
}: PanelHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-gray-200 border-b px-3 py-3 sm:px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
        <Icon className="size-4 shrink-0" />
        <span className="truncate text-sm">{title}</span>
        <span className="shrink-0 text-muted-foreground text-sm">
          ({count.toString().padStart(2, "0")})
        </span>
      </div>
      <div className="hidden md:block">
        <NewButton href={buttonHref} title={buttonTitle} />
      </div>
    </div>
  );
}
