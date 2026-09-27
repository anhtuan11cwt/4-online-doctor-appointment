import type { Service } from "@prisma/client";
import ServiceCard from "./service-card";

export default function ServiceList({ data }: { data?: Service[] | null }) {
  if (!data || data.length === 0) {
    return (
      <p className="py-6 text-center text-muted-foreground text-sm">
        Chưa có dịch vụ nào.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 items-center gap-3 px-0 sm:grid-cols-3 md:grid-cols-4 min-[360px]:gap-4 min-[360px]:px-2">
      {data.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
