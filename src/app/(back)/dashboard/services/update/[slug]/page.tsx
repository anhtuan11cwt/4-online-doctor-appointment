export default async function UpdateServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="flex w-full flex-col">
      <div className="border-gray-200 border-b px-3 py-3 sm:px-4 md:px-6">
        <h2 className="break-words font-bold text-lg sm:text-xl">
          Cập nhật dịch vụ
        </h2>
      </div>
      <div className="p-3 sm:p-4 md:p-6">
        <p className="break-words text-muted-foreground text-sm">
          Chức năng cập nhật dịch vụ &quot;{slug}&quot; sẽ được triển khai ở
          giai đoạn tiếp theo.
        </p>
      </div>
    </div>
  );
}
