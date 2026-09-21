import { Calendar } from "lucide-react";
import ListPanel from "@/components/dashboard/doctor/list-panel";

export default function AppointmentDetailsPage() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col md:grid md:grid-cols-12">
        <div className="border-gray-100 border-b md:col-span-4 md:border-r md:border-b-0">
          <div className="flex items-center justify-between border-gray-200 border-b px-4 py-3 md:px-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0" />
              <span className="text-sm">Lịch hẹn</span>
              <span className="text-muted-foreground text-sm">(2)</span>
            </div>
          </div>
          <ListPanel />
        </div>
        <div className="p-3 md:col-span-8 md:px-6 md:py-3">
          <h2 className="font-bold text-xl">Thông tin bệnh nhân</h2>
        </div>
      </div>
    </div>
  );
}
