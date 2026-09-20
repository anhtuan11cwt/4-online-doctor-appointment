export default function PatientDashboard() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-4 py-4 md:gap-8 md:py-8">
        <h2 className="font-bold text-xl sm:text-2xl">
          Bảng điều khiển bệnh nhân
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Chào mừng bạn đến với trang quản trị bệnh nhân.
        </p>
      </div>
    </div>
  );
}
