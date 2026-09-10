"use client";

import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const socialLinks = [
  { color: "text-blue-600", href: "#", icon: FaLinkedin, title: "LinkedIn" },
  { color: "text-red-600", href: "#", icon: FaYoutube, title: "YouTube" },
  { color: "text-blue-400", href: "#", icon: FaTwitter, title: "Twitter" },
  { color: "text-pink-600", href: "#", icon: FaInstagram, title: "Instagram" },
];

const footerNavigation = {
  about: [
    { href: "#", name: "Câu chuyện của chúng tôi" },
    { href: "#", name: "Blog" },
    { href: "#", name: "Khách hàng" },
    { href: "#", name: "Thương hiệu" },
  ],
  company: [
    { href: "/about", name: "Giới thiệu" },
    { href: "/join/doctors", name: "Liên kết dịch vụ" },
    { href: "#", name: "Tuyển dụng" },
    { href: "#", name: "Báo chí" },
  ],
  resources: [
    { href: "#", name: "Cộng đồng" },
    { href: "#", name: "Trung tâm hỗ trợ" },
    { href: "#", name: "Đối tác" },
    { href: "#", name: "Sự kiện" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <h3 className="font-semibold text-sm text-white leading-6">
              Công Ty
            </h3>
            <ul className="space-y-6">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    className="text-gray-300 text-sm leading-6 hover:text-white"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="font-semibold text-sm text-white leading-6">
                  Tài Nguyên
                </h3>
                <ul className="mt-6 space-y-4">
                  {footerNavigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link
                        className="text-gray-300 text-sm leading-6 hover:text-white"
                        href={item.href}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="font-semibold text-sm text-white leading-6">
                  Về Chúng Tôi
                </h3>
                <ul className="mt-6 space-y-4">
                  {footerNavigation.about.map((item) => (
                    <li key={item.name}>
                      <Link
                        className="text-gray-300 text-sm leading-6 hover:text-white"
                        href={item.href}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-white/10 border-t pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <p className="text-gray-400 text-xs leading-5">
            &copy; {year} Medical App. Bảo lưu mọi quyền.
          </p>
          <div className="mt-8 flex gap-x-4 lg:mt-0">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  className={`text-gray-400 hover:text-white ${item.color}`}
                  href={item.href}
                  key={item.title}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">{item.title}</span>
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
