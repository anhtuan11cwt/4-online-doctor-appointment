import { LayoutGrid } from "lucide-react";
import { getServices } from "@/actions/services";
import HomeDisplayCard from "@/components/dashboard/doctor/home-display-card";
import ListPanel from "@/components/dashboard/doctor/list-panel";
import PanelHeader from "@/components/dashboard/doctor/panel-header";
import ServiceCard from "@/components/dashboard/service-card";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="flex w-full flex-col">
      <PanelHeader
        buttonHref="/dashboard/services/new"
        buttonTitle="Dịch vụ mới"
        count={services.length}
        icon={LayoutGrid}
        title="Dịch vụ"
      />
      <div className="flex flex-col md:grid md:grid-cols-12">
        <div className="border-gray-100 border-b md:col-span-4 md:border-r md:border-b-0">
          <ListPanel newHref="/dashboard/services/new" newTitle="Dịch vụ mới">
            {services.length === 0 ? (
              <p className="px-2 py-4 text-center text-muted-foreground text-xs">
                Chưa có dịch vụ nào. Tạo dịch vụ mới để bắt đầu.
              </p>
            ) : (
              services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))
            )}
          </ListPanel>
        </div>
        <div className="p-2 sm:p-3 md:col-span-8 md:px-6 md:py-3">
          <HomeDisplayCard
            buttonHref="/dashboard/services/new"
            buttonTitle="Dịch vụ mới"
            count={services.length}
            description={`Bạn có ${services.length} dịch vụ. Tạo dịch vụ mới nếu cần.`}
            icon={LayoutGrid}
            title="Dịch vụ của chúng tôi"
          />
        </div>
      </div>
    </div>
  );
}
