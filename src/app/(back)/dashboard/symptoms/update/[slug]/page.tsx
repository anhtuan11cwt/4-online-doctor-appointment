import { getSymptomBySlug } from "@/actions/symptoms";
import SymptomForm from "@/components/dashboard/symptom-form";

export default async function UpdateSymptomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const symptom = await getSymptomBySlug(slug);

  return (
    <div className="flex w-full flex-col">
      <div className="border-gray-200 border-b px-2 py-3 sm:px-4 md:px-6 min-[360px]:px-3">
        <h2 className="break-words font-bold text-base sm:text-xl min-[360px]:text-lg">
          Cập nhật triệu chứng
        </h2>
      </div>
      <div className="p-2 sm:p-4 md:p-6 min-[360px]:p-3">
        {symptom?.id ? (
          <div className="max-w-2xl">
            <SymptomForm initialData={symptom} title="Cập nhật triệu chứng" />
          </div>
        ) : (
          <p className="break-words text-muted-foreground text-sm">
            Không tìm thấy triệu chứng &quot;{slug}&quot;.
          </p>
        )}
      </div>
    </div>
  );
}
