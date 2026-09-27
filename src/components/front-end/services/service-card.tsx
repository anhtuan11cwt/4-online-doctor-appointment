import type { Service } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`}>
      <div className="flex min-w-0 flex-col items-center justify-center gap-2 rounded-md border border-slate-100 bg-white p-3 text-center transition-all duration-300 hover:border-purple-200 hover:bg-slate-50 min-[360px]:p-4 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700">
        {service.imageUrl ? (
          <Image
            alt={service.title}
            className="h-12 w-12 object-contain min-[360px]:h-14 min-[360px]:w-14"
            height={56}
            src={service.imageUrl}
            width={56}
          />
        ) : (
          <span className="h-12 w-12 rounded-md bg-slate-100 min-[360px]:h-14 min-[360px]:w-14 dark:bg-slate-700" />
        )}
        <h3 className="hyphens-auto break-words font-medium text-slate-900 text-sm dark:text-slate-300">
          {service.title}
        </h3>
      </div>
    </Link>
  );
}
