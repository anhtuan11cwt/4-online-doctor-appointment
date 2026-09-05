import Image from "next/image";
import Link from "next/link";

type SingleImageProps = {
  href: string;
  imageSrc: string;
  alt: string;
};

function BrandSingle({ href, imageSrc, alt }: SingleImageProps) {
  return (
    <Link href={href}>
      <Image
        alt={alt}
        className="h-8 w-auto opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
        height={32}
        src={imageSrc}
        width={120}
      />
    </Link>
  );
}

const brands = [
  { alt: "Brand 1", href: "#", imageSrc: "/logo.svg" },
  { alt: "Brand 2", href: "#", imageSrc: "/logo.svg" },
  { alt: "Brand 3", href: "#", imageSrc: "/logo.svg" },
  { alt: "Brand 4", href: "#", imageSrc: "/logo.svg" },
  { alt: "Brand 5", href: "#", imageSrc: "/logo.svg" },
  { alt: "Brand 6", href: "#", imageSrc: "/logo.svg" },
];

export default function Brands() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="pb-8 text-center font-bold text-gray-900 text-xl">
          Được tin tưởng bởi
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {brands.map((brand) => (
            <BrandSingle
              alt={brand.alt}
              href={brand.href}
              imageSrc={brand.imageSrc}
              key={brand.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
