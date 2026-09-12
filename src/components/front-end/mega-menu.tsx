"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const megaMenuData = [
  {
    services: [
      {
        description: "Các buổi trị liệu chuyên nghiệp cho sức khỏe tinh thần.",
        slug: "tri-lieu",
        title: "Trị liệu",
      },
      {
        description: "Tư vấn trực tuyến và kê đơn thuốc.",
        slug: "ke-don-truc-tuyen",
        title: "Kê đơn trực tuyến",
      },
      {
        description: "Cuộc hẹn trực tiếp với bác sĩ.",
        slug: "hen-truc-tiep",
        title: "Hẹn trực tiếp",
      },
      {
        description: "Tư vấn chăm sóc khẩn cấp khi bạn cần.",
        slug: "tu-van-khan-cap",
        title: "Tư vấn khẩn cấp",
      },
    ],
    title: "Đặt nhiều nhất",
  },
  {
    services: [
      {
        description: "Bác sĩ chăm sóc sức khỏe chính cho sức khỏe tổng quát.",
        slug: "bac-si-kham-chung",
        title: "Bác sĩ khám chung",
      },
      {
        description: "Bác sĩ sức khỏe tinh thần và bác sĩ tâm thần.",
        slug: "bac-si-tam-than",
        title: "Bác sĩ tâm thần",
      },
      {
        description: "Bác sĩ chăm sóc sức khỏe cho trẻ em.",
        slug: "bac-si-nhi",
        title: "Bác sĩ nhi",
      },
      {
        description: "Bác sĩ chăm sóc da và da liễu.",
        slug: "bac-si-da-lieu",
        title: "Bác sĩ da liễu",
      },
    ],
    title: "Bác sĩ",
  },
  {
    services: [
      {
        description: "Hỗ trợ các hoạt động sinh hoạt hàng ngày và làm việc.",
        slug: "bac-si-nghe-nghiep",
        title: "Bác sĩ nghề nghiệp",
      },
      {
        description: "Phục hồi chức năng thể chất và hồi phục.",
        slug: "bac-si-vat-ly-tri-lieu",
        title: "Bác sĩ vật lý trị liệu",
      },
      {
        description: "Dịch vụ trị liệu ngôn ngữ và lời nói.",
        slug: "bac-si-tri-lieu-ngon-ngu",
        title: "Bác sĩ trị liệu ngôn ngữ",
      },
      {
        description: "Điều trị châm cứu truyền thống.",
        slug: "bac-si-cham-cuu",
        title: "Bác sĩ châm cứu",
      },
    ],
    title: "Chuyên khoa",
  },
  {
    services: [
      {
        description: "Hỗ trợ quản lý lo âu và căng thẳng.",
        slug: "lo-au",
        title: "Lo âu",
      },
      {
        description: "Hỗ trợ trầm cảm và rối loạn tâm trạng.",
        slug: "tram-cam",
        title: "Trầm cảm",
      },
      {
        description: "Điều trị các tình trạng đau dai dẳng.",
        slug: "dau-dai-dang",
        title: "Đau dai dẳng",
      },
      {
        description: "Điều trị và hỗ trợ rối loạn giấc ngủ.",
        slug: "roi-luan-giac-ngu",
        title: "Mất ngủ",
      },
    ],
    title: "Triệu chứng",
  },
];

export default function MegaMenu() {
  return (
    <div className="fixed top-[56px] right-0 left-0 z-50 hidden border-b bg-background py-3 lg:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <NavigationMenu>
          <NavigationMenuList className="space-x-4">
            {megaMenuData.map((category) => (
              <NavigationMenuItem key={category.title}>
                <NavigationMenuTrigger className="!bg-transparent hover:!bg-accent hover:!text-blue-700 focus:!bg-accent focus:!text-blue-700 data-[popup-open]:!bg-accent data-[popup-open]:!text-blue-700 data-[state=open]:!bg-accent data-[state=open]:!text-blue-700 data-open:!bg-accent data-open:!text-blue-700 text-muted-foreground">
                  {category.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[320px] border bg-popover p-4 shadow-lg">
                  <div className="grid gap-3">
                    {category.services.map((service) => (
                      <div key={service.slug}>
                        <Link
                          className="block rounded-md p-3 transition-colors hover:bg-accent"
                          href={`/services/${service.slug}`}
                        >
                          <div className="font-medium text-foreground text-sm">
                            {service.title}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {service.description}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
