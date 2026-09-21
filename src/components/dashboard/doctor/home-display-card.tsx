import { Calendar } from "lucide-react";
import NewButton from "./new-button";

export default function HomeDisplayCard() {
  return (
    <div className="flex min-h-[30vh] flex-col items-center justify-center rounded-lg border px-4 py-6 text-center shadow-sm md:min-h-[50vh] md:px-6">
      <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
      <p className="py-3 text-sm">Chưa chọn lịch hẹn nào</p>
      <p className="py-3 text-muted-foreground text-sm">
        Chọn một lịch hẹn từ danh sách bên trái hoặc tạo lịch hẹn mới
      </p>
      <div className="mt-4">
        <NewButton href="#" title="Lịch hẹn mới" />
      </div>
    </div>
  );
}
