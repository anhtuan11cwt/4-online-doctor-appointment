import type { LucideIcon } from "lucide-react";
import NewButton from "./new-button";

interface HomeDisplayCardProps {
  buttonHref: string;
  buttonTitle: string;
  count: number;
  description: string;
  icon: LucideIcon;
  title: string;
}

export default function HomeDisplayCard({
  icon: Icon,
  count,
  title,
  description,
  buttonTitle,
  buttonHref,
}: HomeDisplayCardProps) {
  return (
    <div className="flex min-h-[30vh] flex-col items-center justify-center rounded-lg border px-3 py-6 text-center shadow-sm sm:px-4 md:min-h-[50vh] md:px-6">
      <Icon className="mb-4 size-10 shrink-0 text-muted-foreground sm:size-12" />
      <p className="w-full break-words py-2 text-sm sm:py-3">{title}</p>
      <p className="w-full break-words py-2 text-muted-foreground text-sm sm:py-3">
        {description}
      </p>
      <p className="py-1 text-muted-foreground text-xs">
        Tổng cộng: {count.toString().padStart(2, "0")}
      </p>
      <div className="mt-4 w-full sm:w-auto">
        <NewButton
          className="w-full sm:w-auto"
          href={buttonHref}
          title={buttonTitle}
        />
      </div>
    </div>
  );
}
