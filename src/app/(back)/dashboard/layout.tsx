export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <aside>
        <p className="p-4 text-muted-foreground text-sm">
          Thanh bên bảng điều khiển
        </p>
      </aside>
      <main>{children}</main>
    </div>
  );
}
