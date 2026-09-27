import { getServices } from "@/actions/services";
import { getSpecialities } from "@/actions/specialties";
import { getSymptoms } from "@/actions/symptoms";
import UpdateServiceForm from "@/components/dashboard/settings/update-service-form";

type DoctorServiceSettingsProps = {
  profile?: {
    id: string;
    serviceId?: string | null;
    specialtyId?: string | null;
    symptomIds?: string[];
    operationMode?: string | null;
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

  return (
    <div className="w-full space-y-3 min-[360px]:space-y-4">
      <UpdateServiceForm
        profile={profile}
        services={services}
        specialties={specialties}
        symptoms={symptoms}
      />
    </div>
  );
}
