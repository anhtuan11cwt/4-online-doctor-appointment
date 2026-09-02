import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1
            className="mb-4 font-extrabold text-7xl tracking-tight lg:text-9xl"
            style={{ color: "#2563eb" }}
          >
            404
          </h1>
          <p className="mb-4 font-bold text-3xl text-gray-900 tracking-tight md:text-4xl">
            Không tìm thấy trang.
          </p>
          <p className="mb-4 font-light text-gray-500 text-lg">
            Xin lỗi, chúng tôi không thể tìm thấy trang bạn yêu cầu. Bạn sẽ tìm
            thấy nhiều nội dung hữu ích trên trang chủ.
          </p>
          <Link
            className="my-4 inline-flex rounded-lg px-5 py-2.5 text-center font-medium text-sm text-white"
            href="/"
            style={{ backgroundColor: "#2563eb" }}
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </section>
  );
}
