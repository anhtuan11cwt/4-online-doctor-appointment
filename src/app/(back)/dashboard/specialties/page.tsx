import { Stethoscope } from "lucide-react";
import { getSpecialities } from "@/actions/specialties";
import HomeDisplayCard from "@/components/dashboard/doctor/home-display-card";
import ListPanel from "@/components/dashboard/doctor/list-panel";
import PanelHeader from "@/components/dashboard/doctor/panel-header";
import SpecialtyCard from "@/components/dashboard/specialty-card";

export default async function SpecialtiesPage() {
  const specialities = await getSpecialities();

  return (
    <div className="flex w-full flex-col">
      <PanelHeader
        buttonHref="/dashboard/specialties/new"
        buttonTitle="Chuyên khoa mới"
        count={specialities.length}
        icon={Stethoscope}
        title="Chuyên khoa"
      />
      <div className="flex flex-col md:grid md:grid-cols-12">
        <div className="border-gray-100 border-b md:col-span-4 md:border-r md:border-b-0">
          <ListPanel
            newHref="/dashboard/specialties/new"
            newTitle="Chuyên khoa mới"
          >
            {specialities.length === 0 ? (
              <p className="px-2 py-4 text-center text-muted-foreground text-xs">
                Chưa có chuyên khoa nào. Tạo chuyên khoa mới để bắt đầu.
              </p>
            ) : (
              specialities.map((specialty) => (
                <SpecialtyCard key={specialty.id} specialty={specialty} />
              ))
            )}
          </ListPanel>
        </div>
        <div className="p-2 sm:p-3 md:col-span-8 md:px-6 md:py-3">
          <HomeDisplayCard
            buttonHref="/dashboard/specialties/new"
            buttonTitle="Chuyên khoa mới"
            count={specialities.length}
            description={`Bạn có ${specialities.length} chuyên khoa. Tạo chuyên khoa mới nếu cần.`}
            icon={Stethoscope}
            title="Chuyên khoa của chúng tôi"
          />
        </div>
      </div>
    </div>
  );
}
