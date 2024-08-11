"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ResponsiveLine } from "@nivo/line";
import {
  FilterIcon,
  PackageIcon,
  PlusIcon,
  ReceiptIcon,
  UsersIcon,
} from "lucide-react";

export function Dashboard() {
  const [invoiceStatus, setInvoiceStatus] = useState("all");
  const invoices = [
    {
      id: "INV001",
      date: "2023-06-01",
      client: "Acme Inc.",
      total: 1250.0,
      status: "paid",
    },
    {
      id: "INV002",
      date: "2023-05-15",
      client: "Globex Corp.",
      total: 750.0,
      status: "pending",
    },
    {
      id: "INV003",
      date: "2023-04-30",
      client: "Stark Industries",
      total: 2500.0,
      status: "paid",
    },
    {
      id: "INV004",
      date: "2023-04-20",
      client: "Wayne Enterprises",
      total: 1500.0,
      status: "cancelled",
    },
    {
      id: "INV005",
      date: "2023-04-10",
      client: "Stark Industries",
      total: 1000.0,
      status: "paid",
    },
    {
      id: "INV006",
      date: "2023-03-25",
      client: "Globex Corp.",
      total: 850.0,
      status: "pending",
    },
    {
      id: "INV007",
      date: "2023-03-15",
      client: "Acme Inc.",
      total: 1750.0,
      status: "paid",
    },
    {
      id: "INV008",
      date: "2023-03-01",
      client: "Wayne Enterprises",
      total: 1200.0,
      status: "paid",
    },
    {
      id: "INV009",
      date: "2023-02-20",
      client: "Stark Industries",
      total: 900.0,
      status: "pending",
    },
    {
      id: "INV010",
      date: "2023-02-10",
      client: "Acme Inc.",
      total: 1100.0,
      status: "paid",
    },
  ];
  const products = [
    {
      name: "Premium Subscription",
      price: 99.99,
      quantity: 150,
    },
    {
      name: "Consulting Service",
      price: 150.0,
      quantity: 75,
    },
    {
      name: "Graphic Design Package",
      price: 75.0,
      quantity: 100,
    },
    {
      name: "Website Development",
      price: 1500.0,
      quantity: 25,
    },
    {
      name: "SEO Optimization",
      price: 250.0,
      quantity: 60,
    },
    {
      name: "Email Marketing Campaign",
      price: 75.0,
      quantity: 90,
    },
    {
      name: "Social Media Management",
      price: 200.0,
      quantity: 45,
    },
    {
      name: "Content Creation",
      price: 100.0,
      quantity: 80,
    },
    {
      name: "Branding Package",
      price: 500.0,
      quantity: 35,
    },
    {
      name: "IT Support",
      price: 75.0,
      quantity: 120,
    },
  ];
  const totalInvoices = invoices.length;
  const totalClients = [...new Set(invoices.map((invoice) => invoice.client))]
    .length;
  const totalProducts = products.length;
  const filteredInvoices = invoices.filter((invoice) => {
    if (invoiceStatus === "all") return true;
    return invoice.status === invoiceStatus;
  });
  const filteredProducts = products
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10);
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Invoices</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-4xl font-bold">{totalInvoices}</div>
          <ReceiptIcon className="w-10 h-10 text-primary" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Clients</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-4xl font-bold">{totalClients}</div>
          <UsersIcon className="w-10 h-10 text-primary" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Products/Services</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-4xl font-bold">{totalProducts}</div>
          <PackageIcon className="w-10 h-10 text-primary" />
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-2 xl:col-span-3">
        <CardHeader>
          <CardTitle>Monthly Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart className="aspect-[9/4]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <FilterIcon className="w-4 h-4" />
                  <span>{invoiceStatus === "all" ? "All" : invoiceStatus}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={invoiceStatus === "all"}
                  onCheckedChange={() => setInvoiceStatus("all")}
                >
                  All
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={invoiceStatus === "paid"}
                  onCheckedChange={() => setInvoiceStatus("paid")}
                >
                  Paid
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={invoiceStatus === "pending"}
                  onCheckedChange={() => setInvoiceStatus("pending")}
                >
                  Pending
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={invoiceStatus === "cancelled"}
                  onCheckedChange={() => setInvoiceStatus("cancelled")}
                >
                  Cancelled
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <PlusIcon className="w-4 h-4" />
              <span>New Invoice</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.slice(0, 10).map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell className="text-right">
                    ${invoice.total.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Top Products/Services</CardTitle>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <PlusIcon className="w-4 h-4" />
            <span>New Product</span>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.name}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-right">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>New Client</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <Input placeholder="Name" />
            <Input placeholder="Email" />
            <Input placeholder="Phone" />
            <Button size="lg" className="w-full">
              Add Client
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function LineChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
