"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <section className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 font-extrabold text-6xl text-blue-600 tracking-tight sm:text-7xl lg:text-9xl dark:text-blue-400">
            404
          </h1>
          <p className="mb-2 font-bold text-2xl text-gray-900 tracking-tight sm:text-3xl md:text-4xl dark:text-slate-100">
            Không tìm thấy trang.
          </p>
          {pathname && (
            <p className="mb-4 font-mono text-gray-500 text-xs sm:text-sm dark:text-slate-400">
              {pathname}
            </p>
          )}
          <p className="mb-6 font-light text-base text-gray-500 sm:text-lg dark:text-slate-400">
            Trang bạn đang tìm kiếm không thể được tìm thấy hoặc đã bị xóa.
          </p>
          <Link
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-center font-medium text-sm text-white transition-colors hover:bg-blue-700 sm:px-5 dark:bg-blue-500 dark:hover:bg-blue-600"
            href="/"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </section>
  );
}
