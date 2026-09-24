import { Calendar } from "lucide-react";
import HomeDisplayCard from "@/components/dashboard/doctor/home-display-card";
import ListPanel from "@/components/dashboard/doctor/list-panel";
import PanelHeader from "@/components/dashboard/doctor/panel-header";

export default function DoctorAppointmentsPage() {
  return (
    <div className="flex w-full flex-col">
      <PanelHeader
        buttonHref="#"
        buttonTitle="Lịch hẹn mới"
        count={2}
        icon={Calendar}
        title="Lịch hẹn"
      />
      <div className="flex flex-col md:grid md:grid-cols-12">
        <div className="border-gray-100 border-b md:col-span-4 md:border-r md:border-b-0">
          <ListPanel />
        </div>
        <div className="p-2 sm:p-3 md:col-span-8 md:px-6 md:py-3">
          <HomeDisplayCard
            buttonHref="#"
            buttonTitle="Lịch hẹn mới"
            count={2}
            description="Chọn một lịch hẹn từ danh sách bên trái hoặc tạo lịch hẹn mới"
            icon={Calendar}
            title="Chưa chọn lịch hẹn nào"
          />
        </div>
      </div>
    </div>
  );
}
