import type { ServiceProps } from "@/types";
import ServiceCard from "./service-card";

export default function ServiceList({ data }: { data: ServiceProps[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
      {data.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}
