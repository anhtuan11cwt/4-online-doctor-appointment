import { Calendar } from "lucide-react";
import NewButton from "./new-button";

export default function PanelHeader() {
  return (
    <div className="flex items-center justify-between border-gray-200 border-b px-4 py-3 md:px-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 shrink-0" />
        <span className="text-sm">Lịch hẹn</span>
        <span className="text-muted-foreground text-sm">(2)</span>
      </div>
      <div>
        <NewButton href="#" title="Lịch hẹn mới" />
      </div>
    </div>
  );
}
