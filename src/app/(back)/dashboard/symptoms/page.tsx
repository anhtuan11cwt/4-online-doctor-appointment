export default function SymptomsPage() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-3 py-3 sm:gap-4 sm:py-4 md:gap-8 md:py-8">
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl">
          Quản lý Triệu chứng
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
          Danh sách các triệu chứng sẽ được hiển thị tại đây.
        </p>
      </div>
    </div>
  );
}
