import type { Symptom } from "@prisma/client";
import LinkCard from "./link-card";

const cardClassName =
  "justify-between border border-slate-100 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300";

export default function SymptomCards({
  symptoms,
}: {
  symptoms?: Symptom[] | null;
}) {
  if (!symptoms || symptoms.length === 0) {
    return (
      <p className="py-6 text-center text-muted-foreground text-sm">
        Chưa có triệu chứng nào.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5 min-[360px]:grid-cols-2 min-[360px]:gap-4">
      {symptoms.map((item) => (
        <LinkCard
          className={cardClassName}
          href="/doctors"
          key={item.id}
          title={item.title}
        />
      ))}
    </div>
  );
}
