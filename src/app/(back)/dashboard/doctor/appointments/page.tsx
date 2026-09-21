import HomeDisplayCard from "@/components/dashboard/doctor/home-display-card";
import ListPanel from "@/components/dashboard/doctor/list-panel";
import PanelHeader from "@/components/dashboard/doctor/panel-header";

export default function DoctorAppointmentsPage() {
  return (
    <div className="flex w-full flex-col">
      <PanelHeader />
      <div className="flex flex-col md:grid md:grid-cols-12">
        <div className="border-gray-100 border-b md:col-span-4 md:border-r md:border-b-0">
          <ListPanel />
        </div>
        <div className="p-3 md:col-span-8 md:px-6 md:py-3">
          <HomeDisplayCard />
        </div>
      </div>
    </div>
  );
}
