import { getDoctors } from "@/actions/doctors";
import { getServices } from "@/actions/services";
import { getSpecialities } from "@/actions/specialties";
import { getSymptoms } from "@/actions/symptoms";
import Brands from "@/components/front-end/brands";
import DoctorsList from "@/components/front-end/doctor-list";
import Hero from "@/components/front-end/hero";
import TabbedItems from "@/components/front-end/tabbed-items";
import { getTodayDayKey } from "@/lib/date";
import type { Doctor } from "@/types";

const BOTH_MODE = "Cả khám từ xa và khám trực tiếp";
const IN_PERSON_MODE = "Khám trực tiếp";
const TELEHEALTH_MODE = "Khám từ xa";

export const dynamic = "force-dynamic";

function hasAvailabilityToday(doctor: Doctor) {
  const today = getTodayDayKey();
  const times = doctor.doctorProfile?.availability?.[today];
  return Boolean(times && times.length > 0);
}

export default async function HomePage() {
  const [services, specialties, symptoms, doctors] = await Promise.all([
    getServices(),
    getSpecialities(),
    getSymptoms(),
    getDoctors(),
  ]);

  const availableDoctors = doctors.filter(hasAvailabilityToday);

  const telehealthDoctors = availableDoctors.filter((doctor) => {
    const mode = doctor.doctorProfile?.operationMode;
    return mode === TELEHEALTH_MODE || mode === BOTH_MODE;
  });

  const inPersonDoctors = availableDoctors.filter((doctor) => {
    const mode = doctor.doctorProfile?.operationMode;
    return mode === IN_PERSON_MODE || mode === BOTH_MODE;
  });

  return (
    <div>
      <Hero />
      <Brands />
      <TabbedItems
        services={services}
        specialties={specialties}
        symptoms={symptoms}
      />
      <DoctorsList doctors={telehealthDoctors} title="Khám từ xa" />
      <DoctorsList
        className="bg-white"
        doctors={inPersonDoctors}
        isInPerson
        title="Khám trực tiếp"
      />
    </div>
  );
}
