import SearchBar from "@/components/front-end/searchbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-blue-950 pt-14 pb-12 sm:pt-20 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <Badge
          className="mb-4 border-blue-400 bg-blue-900 text-blue-200"
          variant="outline"
        >
          Được 10,000+ Bệnh nhân tin tưởng
        </Badge>

        <h1 className="font-bold text-3xl text-gray-50 tracking-tight sm:text-5xl lg:text-6xl">
          Sức khỏe của bạn, Ưu tiên của chúng tôi
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400 sm:mt-6 sm:text-lg">
          Đặt lịch hẹn với bác sĩ hàng đầu ngay lập tức. Chất lượng chăm sóc sức
          khỏe được tiếp cận, tiện lợi và có sẵn ngay tại tầm tay bạn.
        </p>

        <div className="mt-8 sm:mt-10">
          <SearchBar />
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            className="w-full bg-blue-600 px-8 py-3 text-gray-50 hover:bg-blue-700 sm:w-auto"
            variant="default"
          >
            Đặt lịch hẹn
          </Button>
          <Button
            className="w-full border-gray-300 bg-white px-8 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-950 sm:w-auto"
            variant="outline"
          >
            Bác sĩ của chúng tôi
          </Button>
        </div>
      </div>
    </section>
  );
}
