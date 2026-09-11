import { CreditCard, DollarSign, Package, Users } from "lucide-react";
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

const cards = [
  {
    change: "+20.1% so với tháng trước",
    icon: DollarSign,
    title: "Tổng doanh thu",
    value: "1.130.797.250 ₫",
  },
  {
    change: "+180.1% so với tháng trước",
    icon: Users,
    title: "Khách hàng mới",
    value: "+2.350",
  },
  {
    change: "+19% so với tháng trước",
    icon: CreditCard,
    title: "Đơn hàng",
    value: "+12.234",
  },
  {
    change: "+201 so với giờ trước",
    icon: Package,
    title: "Đang hoạt động",
    value: "+573",
  },
];

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

export default function Dashboard() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-4 py-4 md:gap-8 md:py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-medium text-sm">
                  {card.title}
                </CardTitle>
                <card.icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="font-bold text-2xl">{card.value}</div>
                <p className="text-muted-foreground text-xs">{card.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Giao dịch gần đây</CardTitle>
              <CardDescription>
                Tháng này đã có {transactions.length} giao dịch.
              </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Bán hàng gần đây</CardTitle>
              <CardDescription>
                Tháng này đã có {recentSales.length} bán hàng.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {recentSales.map((sale) => (
                <div className="flex items-center gap-4" key={sale.email}>
                  <Avatar className="size-9">
                    <AvatarImage alt="Avatar" src={sale.avatar} />
                    <AvatarFallback>
                      {sale.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="font-medium text-sm leading-none">
                      {sale.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {sale.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">{sale.amount}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
