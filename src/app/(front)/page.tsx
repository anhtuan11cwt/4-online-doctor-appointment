import Brands from "@/components/front-end/brands";
import DoctorsList from "@/components/front-end/doctor-list";
import Hero from "@/components/front-end/hero";
import TabbedItems from "@/components/front-end/tabbed-items";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Brands />
      <TabbedItems />
      <DoctorsList title="Khám từ xa" />
      <DoctorsList className="bg-white" isInPerson title="Khám trực tiếp" />
    </div>
  );
}
