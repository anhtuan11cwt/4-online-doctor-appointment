import ServiceForm from "@/components/dashboard/service-form";

export default function NewServicePage() {
  return (
    <div className="flex w-full flex-col">
      <div className="border-gray-200 border-b px-3 py-3 sm:px-4 md:px-6">
        <h2 className="break-words font-bold text-lg sm:text-xl">
          Tạo dịch vụ mới
        </h2>
      </div>
      <div className="p-3 sm:p-4 md:p-6">
        <div className="max-w-2xl">
          <ServiceForm />
        </div>
      </div>
    </div>
  );
}
