import { CheckCircle } from "lucide-react";
import Image from "next/image";
import CustomAccordion, {
  type FAQItem,
} from "@/components/front-end/custom-accordion";
import CustomButton from "@/components/front-end/custom-button";
import Pricing from "@/components/front-end/pricing";

const features = [
  "Không phí cho nhà cung cấp",
  "Thanh toán trực tiếp từ bệnh nhân",
  "Quản lý lịch hẹn dễ dàng",
  "Cung cấp dịch vụ từ xa",
  "Theo dõi hồ sơ bệnh nhân",
];

const faqs: FAQItem[] = [
  {
    answer:
      "Chỉ cần nhấp vào 'Liên kết dịch vụ' và làm theo quy trình hướng dẫn. Chỉ mất vài phút để bắt đầu.",
    question: "Làm thế nào để đăng ký phòng khám trên Medical?",
  },
  {
    answer:
      "Không có phí trước cho nhà cung cấp. Chúng tôi chỉ tính một khoản phí giao dịch nhỏ khi bạn nhận thanh toán qua nền tảng.",
    question: "Phí dành cho nhà cung cấp là bao nhiêu?",
  },
  {
    answer:
      "Thanh toán được xử lý trực tiếp qua hệ thống thanh toán an toàn của chúng tôi. Bạn có thể nhận thanh toán qua PayPal hoặc Stripe.",
    question: "Làm thế nào để nhận thanh toán từ bệnh nhân?",
  },
  {
    answer:
      "Có! Nền tảng của chúng tôi cung cấp đầy đủ công cụ quản lý lịch hẹn, bao gồm đặt lịch, nhắc nhở và giao tiếp với bệnh nhân.",
    question: "Tôi có thể quản lý lịch hẹn qua nền tảng không?",
  },
  {
    answer:
      "Bạn có thể cập nhật thông tin phòng khám bất cứ lúc nào từ bảng điều khiển. Chỉ cần vào Cài đặt và chỉnh sửa thông tin hồ sơ.",
    question: "Làm thế nào để cập nhật thông tin phòng khám?",
  },
  {
    answer: (
      <div>
        <p className="mb-4">Chúng tôi cung cấp hỗ trợ toàn diện bao gồm:</p>
        <ul className="mb-4 list-inside list-disc space-y-1">
          <li>Hướng dẫn trực tiếp từng người</li>
          <li>Tài liệu hướng dẫn</li>
          <li>Hỗ trợ qua email</li>
        </ul>
        <p>Bạn sẵn sàng bắt đầu chưa?</p>
        <div className="mt-4">
          <CustomButton
            className="bg-blue-600 hover:bg-blue-800"
            href="#"
            title="Đăng ký ngay"
          />
        </div>
      </div>
    ),
    question: "Bạn hỗ trợ gì cho nhà cung cấp mới?",
  },
];

export default function JoinDoctorsPage() {
  return (
    <div className="min-h-screen bg-white pt-20 dark:bg-slate-900">
      {/* Welcome Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-4xl text-gray-900 leading-tight sm:text-5xl lg:text-6xl dark:text-white">
                Xây dựng phòng khám chăm sóc trực tiếp{" "}
                <span className="font-semibold text-blue-600">
                  với ứng dụng y tế
                </span>
              </h1>
              <p className="mt-6 text-gray-600 text-lg leading-relaxed dark:text-slate-300">
                Medical kết nối bạn với bệnh nhân, giúp bạn quản lý lịch hẹn,
                cung cấp dịch vụ từ xa và theo dõi hồ sơ bệnh nhân tất cả ở một
                nơi. Tham gia nền tảng của chúng tôi để phát triển phòng khám và
                tiếp cận nhiều bệnh nhân hơn.
              </p>

              <div className="mt-8">
                <CustomButton
                  className="bg-blue-600 hover:bg-blue-800"
                  href="/register?role=DOCTOR&plan=free"
                  title="Liên kết dịch vụ"
                />
              </div>

              {/* Features List */}
              <div className="mt-8 space-y-3">
                {features.map((feature) => (
                  <div className="flex items-center" key={feature}>
                    <CheckCircle
                      aria-hidden="true"
                      className="mr-3 h-5 w-5 flex-shrink-0 text-green-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="flex items-center justify-center">
              <Image
                alt="Bác sĩ"
                className="rounded-lg object-cover shadow-lg"
                height={500}
                priority
                src="/header_img.png"
                width={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Steps Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 dark:bg-slate-800">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            {/* Left Content - Image */}
            <div className="hidden md:block">
              <Image
                alt="Bác sĩ"
                className="rounded-lg object-cover shadow-lg"
                height={500}
                src="/header_img.png"
                width={600}
              />
            </div>

            {/* Right Content */}
            <div className="flex flex-col justify-center">
              <h2 className="font-bold text-3xl text-gray-900 leading-tight sm:text-4xl dark:text-white">
                Tham gia Medical để tăng doanh thu ngay hôm nay
              </h2>

              <div className="mt-8 space-y-3">
                <div className="flex items-center">
                  <CheckCircle
                    aria-hidden="true"
                    className="mr-3 h-5 w-5 flex-shrink-0 text-blue-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Liên kết phòng khám
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle
                    aria-hidden="true"
                    className="mr-3 h-5 w-5 flex-shrink-0 text-blue-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Tạo các gói dịch vụ cạnh tranh
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle
                    aria-hidden="true"
                    className="mr-3 h-5 w-5 flex-shrink-0 text-blue-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Bắt đầu tiếp nhận bệnh nhân
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Cards Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-slate-800">
              <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
                Bắt đầu hành trình
              </h3>
              <p className="mt-2 flex-1 text-gray-600 text-sm dark:text-gray-400">
                Bắt đầu đăng ký mới để tham gia nền tảng và kết nối với bệnh
                nhân.
              </p>
              <div className="mt-4">
                <CustomButton
                  className="bg-blue-600 hover:bg-blue-800"
                  href="/register?role=DOCTOR&plan=free"
                  title="Bắt đầu đăng ký"
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-slate-800">
              <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
                Tiếp tục đăng ký
              </h3>
              <p className="mt-2 flex-1 text-gray-600 text-sm dark:text-gray-400">
                Tiếp tục từ nơi bạn đã dừng và hoàn tất đăng ký.
              </p>
              <div className="mt-4">
                <CustomButton
                  className="bg-gray-600 hover:bg-gray-800"
                  href="/onboarding/resume"
                  title="Tiếp tục đăng ký"
                />
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-slate-800">
              <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
                Đặt lịch tư vấn
              </h3>
              <p className="mt-2 flex-1 text-gray-600 text-sm dark:text-gray-400">
                Chọn thời gian để nói chuyện với đội ngũ về việc tham gia nền
                tảng.
              </p>
              <div className="mt-4">
                <CustomButton
                  className="bg-green-600 hover:bg-green-800"
                  href="#"
                  title="Đặt lịch tư vấn"
                />
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-slate-800">
              <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
                Kiểm tra tiến độ
              </h3>
              <p className="mt-2 flex-1 text-gray-600 text-sm dark:text-gray-400">
                Theo dõi tiến trình đăng ký và xem bạn đang ở bước nào.
              </p>
              <div className="mt-4">
                <CustomButton
                  className="bg-purple-600 hover:bg-purple-800"
                  href="#"
                  title="Theo dõi tiến độ"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* FAQ Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 dark:bg-slate-800">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-bold text-3xl text-gray-900 dark:text-white">
            Câu Hỏi Thường Gặp
          </h2>
          <CustomAccordion faqs={faqs} />
        </div>
      </section>
    </div>
  );
}
