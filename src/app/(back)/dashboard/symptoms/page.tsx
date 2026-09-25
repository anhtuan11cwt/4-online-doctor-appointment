import { Activity } from "lucide-react";
import { getSymptoms } from "@/actions/symptoms";
import HomeDisplayCard from "@/components/dashboard/doctor/home-display-card";
import ListPanel from "@/components/dashboard/doctor/list-panel";
import PanelHeader from "@/components/dashboard/doctor/panel-header";
import SymptomCard from "@/components/dashboard/symptom-card";

export default async function SymptomsPage() {
  const symptoms = await getSymptoms();

  return (
    <div className="flex w-full flex-col">
      <PanelHeader
        buttonHref="/dashboard/symptoms/new"
        buttonTitle="Triệu chứng mới"
        count={symptoms.length}
        icon={Activity}
        title="Triệu chứng"
      />
      <div className="flex flex-col md:grid md:grid-cols-12">
        <div className="border-gray-100 border-b md:col-span-4 md:border-r md:border-b-0">
          <ListPanel
            newHref="/dashboard/symptoms/new"
            newTitle="Triệu chứng mới"
          >
            {symptoms.length === 0 ? (
              <p className="px-2 py-4 text-center text-muted-foreground text-xs">
                Chưa có triệu chứng nào. Tạo triệu chứng mới để bắt đầu.
              </p>
            ) : (
              symptoms.map((symptom) => (
                <SymptomCard key={symptom.id} symptom={symptom} />
              ))
            )}
          </ListPanel>
        </div>
        <div className="p-2 md:col-span-8 md:px-6 md:py-3 min-[360px]:p-3">
          <HomeDisplayCard
            buttonHref="/dashboard/symptoms/new"
            buttonTitle="Triệu chứng mới"
            count={symptoms.length}
            description={`Bạn có ${symptoms.length} triệu chứng. Tạo triệu chứng mới nếu cần.`}
            icon={Activity}
            title="Triệu chứng của chúng tôi"
          />
        </div>
      </div>
    </div>
  );
}
