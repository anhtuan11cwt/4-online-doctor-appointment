import MegaMenu from "@/components/front-end/mega-menu";
import Navbar from "@/components/front-end/navbar";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <MegaMenu />
      <main>{children}</main>
    </div>
  );
}
