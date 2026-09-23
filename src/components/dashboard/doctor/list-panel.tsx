import { BriefcaseMedical, Dot } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export default function ListPanel() {
  return (
    <ScrollArea className="h-72 w-full md:h-96">
      <div className="px-2 py-3 md:px-3">
        {appointments.map((item) => (
          <Link
            className="mb-2 block rounded-md border border-slate-200 bg-white px-2 py-3 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            href={`/dashboard/doctor/appointments/view/${item.id}`}
            key={item.id}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium dark:text-slate-100">{item.name}</h2>
              <span className="text-muted-foreground">16:00</span>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Dot className="h-3 w-3" />
                <span>Theo dõi</span>
              </div>
              <div className="flex items-center gap-1">
                <BriefcaseMedical className="mr-1 h-3 w-3" />
                <span>Khám</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
