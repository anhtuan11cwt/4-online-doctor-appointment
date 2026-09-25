import { getSpecialtyBySlug } from "@/actions/specialties";
import SpecialtyForm from "@/components/dashboard/specialty-form";

export default async function UpdateSpecialtyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const specialty = await getSpecialtyBySlug(slug);

  return (
    <div className="flex w-full flex-col">
      <div className="border-gray-200 border-b px-2 py-3 sm:px-4 md:px-6 min-[360px]:px-3">
        <h2 className="break-words font-bold text-base sm:text-xl min-[360px]:text-lg">
          Cập nhật chuyên khoa
        </h2>
      </div>
      <div className="p-2 sm:p-4 md:p-6 min-[360px]:p-3">
        {specialty?.id ? (
          <div className="max-w-2xl">
            <SpecialtyForm
              initialData={specialty}
              title="Cập nhật chuyên khoa"
            />
          </div>
        ) : (
          <p className="break-words text-muted-foreground text-sm">
            Không tìm thấy chuyên khoa &quot;{slug}&quot;.
          </p>
        )}
      </div>
    </div>
  );
}
