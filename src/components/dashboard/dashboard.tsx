import {
  CalendarDays,
  LayoutGrid,
  Package,
  Users,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import type { Stats } from "@/actions/stats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  {
    amount: "49.975.000 ₫",
    invoice: "INV001",
    method: "Thẻ tín dụng",
    status: "Đã thanh toán",
  },
  {
    amount: "975.000 ₫",
    invoice: "INV002",
    method: "PayPal",
    status: "Đang chờ",
  },
  {
    amount: "7.475.000 ₫",
    invoice: "INV003",
    method: "Chuyển khoản",
    status: "Đã thanh toán",
  },
  {
    amount: "2.475.000 ₫",
    invoice: "INV004",
    method: "Thẻ tín dụng",
    status: "Đã thanh toán",
  },
  {
    amount: "62.500.000 ₫",
    invoice: "INV005",
    method: "PayPal",
    status: "Đang chờ",
  },
  {
    amount: "975.000 ₫",
    invoice: "INV006",
    method: "Chuyển khoản",
    status: "Đã thanh toán",
  },
];

const recentSales = [
  {
    amount: "+49.975.000 ₫",
    avatar: "/doc1.png",
    email: "olivia.martin@email.com",
    name: "Olivia Martin",
  },
  {
    amount: "+975.000 ₫",
    avatar: "/doc2.png",
    email: "jackson.lee@email.com",
    name: "Jackson Lee",
  },
  {
    amount: "+7.475.000 ₫",
    avatar: "/doc3.png",
    email: "isabella.nguyen@email.com",
    name: "Isabella Nguyen",
  },
  {
    amount: "+2.475.000 ₫",
    avatar: "/doc4.png",
    email: "will@email.com",
    name: "William Kim",
  },
  {
    amount: "+62.500.000 ₫",
    avatar: "/doc5.png",
    email: "sofia.davis@email.com",
    name: "Sofia Davis",
  },
];

export default function Dashboard({ stats }: { stats: Stats }) {
  const statCards = [
    {
      count: stats.doctors,
      href: "/dashboard/doctors",
      icon: UsersRound,
      title: "Bác sĩ",
    },
    {
      count: stats.patients,
      href: "/dashboard/patients",
      icon: Users,
      title: "Bệnh nhân",
    },
    {
      count: stats.appointments,
      href: "/dashboard/appointments",
      icon: CalendarDays,
      title: "Lịch hẹn",
    },
    {
      count: stats.services,
      href: "/dashboard/services",
      icon: LayoutGrid,
      title: "Dịch vụ",
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-4 py-4 md:gap-8 md:py-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 min-[360px]:gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="font-medium text-sm">
                    {card.title}
                  </CardTitle>
                  <Icon className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="font-bold text-2xl">{card.count}</div>
                  <Link
                    className="text-muted-foreground text-xs hover:text-foreground"
                    href={card.href}
                  >
                    Xem {card.title}
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="grid gap-3 lg:grid-cols-2 min-[360px]:gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Giao dịch gần đây</CardTitle>
              <CardDescription>
                Tháng này đã có {transactions.length} giao dịch.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="-mx-1 overflow-x-auto px-1">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Ảnh</span>
                      </TableHead>
                      <TableHead>Hóa đơn</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Phương thức
                      </TableHead>
                      <TableHead className="text-right">Số tiền</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.invoice}>
                        <TableCell className="hidden sm:table-cell">
                          <Package className="size-4 text-muted-foreground" />
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction.invoice}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{transaction.status}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {transaction.method}
                        </TableCell>
                        <TableCell className="text-right">
                          {transaction.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Bán hàng gần đây</CardTitle>
              <CardDescription>
                Tháng này đã có {recentSales.length} bán hàng.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 min-[360px]:gap-6">
              {recentSales.map((sale) => (
                <div
                  className="flex items-center gap-2 min-[360px]:gap-4"
                  key={sale.email}
                >
                  <Avatar className="size-9 shrink-0">
                    <AvatarImage alt={sale.name} src={sale.avatar} />
                    <AvatarFallback>
                      {sale.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid min-w-0 gap-1">
                    <p className="truncate font-medium text-sm leading-none">
                      {sale.name}
                    </p>
                    <p className="truncate text-muted-foreground text-xs">
                      {sale.email}
                    </p>
                  </div>
                  <div className="ml-auto shrink-0 font-medium text-xs min-[360px]:text-sm">
                    {sale.amount}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
