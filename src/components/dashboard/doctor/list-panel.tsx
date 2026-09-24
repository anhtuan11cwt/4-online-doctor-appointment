import { BriefcaseMedical, Dot } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewButton from "./new-button";

const appointments = [
  { id: 1, name: "Nguyễn Văn An" },
  { id: 2, name: "Trần Thị Bình" },
  { id: 3, name: "Lê Văn Cường" },
  { id: 4, name: "Phạm Thị Dung" },
  { id: 5, name: "Hoàng Văn Em" },
  { id: 6, name: "Đỗ Thị Giang" },
  { id: 7, name: "Nguyễn Văn Hùng" },
  { id: 8, name: "Bùi Thị Lan" },
];

interface ListPanelProps {
  children?: ReactNode;
  newHref?: string;
  newTitle?: string;
}

export default function ListPanel({
  children,
  newTitle,
  newHref,
}: ListPanelProps) {
  return (
    <ScrollArea className="h-72 w-full md:h-96">
      <div className="px-1.5 py-3 sm:px-2 md:px-3">
        {newTitle && newHref && (
          <div className="mb-2 px-0.5 md:hidden">
            <NewButton className="w-full" href={newHref} title={newTitle} />
          </div>
        )}
        {children ??
          appointments.map((item) => (
            <Link
              className="mb-2 block rounded-md border border-slate-200 bg-white px-2 py-3 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              href={`/dashboard/doctor/appointments/view/${item.id}`}
              key={item.id}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="min-w-0 truncate font-medium dark:text-slate-100">
                  {item.name}
                </h2>
                <span className="shrink-0 text-muted-foreground">16:00</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1">
                  <Dot className="h-3 w-3 shrink-0" />
                  <span>Theo dõi</span>
                </div>
                <div className="flex items-center gap-1">
                  <BriefcaseMedical className="mr-1 h-3 w-3 shrink-0" />
                  <span>Khám</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </ScrollArea>
  );
}
