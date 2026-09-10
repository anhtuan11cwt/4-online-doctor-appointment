"use client";

import { Check, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CustomButton from "./custom-button";

const plans = [
  {
    buttonStyle: "bg-gray-600 hover:bg-gray-800",
    buttonText: "Bắt đầu ngay",
    description: "Dành cho nhà cung cấp cá nhân mới bắt đầu",
    features: [
      "Quản lý tối đa 50 lịch hẹn mỗi tháng",
      "Quản lý bệnh nhân cơ bản",
      "Thông báo email cho lịch hẹn",
      "Hỗ trợ tiêu chuẩn",
    ],
    mostPopular: false,
    name: "Cơ Bản",
    period: "vĩnh viễn",
    price: "$0",
    transactionFee: "5%",
  },
  {
    buttonStyle: "bg-blue-600 hover:bg-blue-800",
    buttonText: "Dùng thử miễn phí",
    description: "Dành cho phòng khám vừa và nhỏ",
    features: [
      "Không giới hạn lịch hẹn",
      "Quản lý hồ sơ bệnh nhân nâng cao",
      "Hỗ trợ ưu tiên",
      "Tùy chỉnh thương hiệu",
      "Bảng phân tích dữ liệu",
    ],
    mostPopular: true,
    name: "Chuyên Nghiệp",
    period: "mỗi tháng",
    price: "$59.9",
    transactionFee: "2%",
  },
  {
    buttonStyle: "bg-purple-600 hover:bg-purple-800",
    buttonText: "Liên hệ bán hàng",
    description: "Dành cho tổ chức lớn và hệ thống bệnh viện",
    features: [
      "Tất cả tính năng của gói Chuyên Nghiệp",
      "Quản lý tài khoản chuyên biệt",
      "Truy cập API",
      "Tích hợp tùy chỉnh",
      "Đảm bảo SLA",
      "Tùy chọn nhãn trắng",
    ],
    mostPopular: false,
    name: "Doanh Nghiệp",
    period: "mỗi tháng",
    price: "$99",
    transactionFee: "0%",
  },
];

export default function Pricing() {
  return (
    <TooltipProvider>
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-semibold text-base text-blue-600 leading-7">
              Bảng Giá
            </h2>
            <p className="mt-2 font-bold text-4xl text-gray-900 tracking-tight sm:text-5xl">
              Chọn gói phù hợp cho phòng khám của bạn
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-gray-600 text-lg leading-8">
            Bắt đầu miễn phí, sau đó thêm gói phù hợp với nhu cầu. Không phí ẩn.
          </p>

          <div className="mx-auto mt-16 grid max-w-md grid-cols-1 items-stretch gap-6 sm:mt-20 sm:max-w-2xl sm:grid-cols-2 lg:max-w-6xl lg:grid-cols-3 lg:gap-8">
            {plans.map((plan) => (
              <div
                className={`flex flex-col rounded-3xl p-6 ring-1 sm:p-8 lg:p-10 ${
                  plan.mostPopular
                    ? "bg-white shadow-xl ring-blue-600"
                    : "bg-white ring-gray-200"
                }`}
                key={plan.name}
              >
                <h3
                  className="font-semibold text-gray-900 text-sm uppercase tracking-widest"
                  id={`plan-${plan.name}`}
                >
                  {plan.name}
                </h3>
                <p className="mt-4 text-gray-600 text-sm leading-6">
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline gap-x-2">
                  <span className="font-bold text-5xl text-gray-900 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="font-semibold text-base text-gray-600 leading-6">
                    /{plan.period}
                  </span>
                </div>

                {/* Transaction Fee with Tooltip */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-gray-600 text-sm">
                    Phí giao dịch: {plan.transactionFee}
                  </span>
                  <Tooltip>
                    <TooltipTrigger className="text-gray-400 hover:text-gray-600">
                      <HelpCircle className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-900 text-white text-xs">
                      <p>
                        PayPal hoặc Stripe có thể tính thêm phí giao dịch cho
                        việc xử lý thanh toán.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <ul className="mt-8 flex-1 space-y-3 text-gray-600 text-sm leading-6">
                  {plan.features.map((feature) => (
                    <li className="flex gap-x-3" key={feature}>
                      <Check
                        aria-hidden="true"
                        className="h-6 w-5 flex-shrink-0 text-blue-600"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <CustomButton
                    className={`w-full ${plan.buttonStyle}`}
                    href="#"
                    title={plan.buttonText}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
