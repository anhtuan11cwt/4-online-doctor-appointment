import Link from "next/link";
import type { ServiceProps } from "@/types";

export default function ServiceCard({ service }: { service: ServiceProps }) {
  return (
    <Link href={`/services/${service.slug}`}>
      <div className="overflow-hidden rounded-md bg-slate-400 transition-all duration-300 hover:bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600">
        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm">{service.title}</h3>
          <p className="mt-1 text-gray-600 text-xs">936 khả dụng</p>
        </div>
      </div>
    </Link>
  );
}
