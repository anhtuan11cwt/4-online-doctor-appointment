import { getServices } from "@/actions/services";
import { getSpecialities } from "@/actions/specialties";
import { getSymptoms } from "@/actions/symptoms";
import UpdateServiceForm from "@/components/dashboard/settings/update-service-form";
import type { SelectOption } from "@/types";

type DoctorServiceSettingsProps = {
  profile?: {
    id: string;
    serviceId?: string | null;
    specialtyId?: string | null;
    symptomIds?: string[];
  } | null;
};

export default async function DoctorServiceSettings({
  profile,
}: DoctorServiceSettingsProps) {
  const [services, specialties, symptoms] = await Promise.all([
    getServices(),
    getSpecialities(),
    getSymptoms(),
  ]);

  const toOptions = (items: { id: string; title: string }[]): SelectOption[] =>
    items.map((item) => ({ label: item.title, value: item.id }));

  return (
    <div className="w-full space-y-3 min-[360px]:space-y-4">
      <UpdateServiceForm
        profile={profile}
        services={toOptions(services)}
        specialties={toOptions(specialties)}
        symptoms={toOptions(symptoms)}
      />
    </div>
  );
}
