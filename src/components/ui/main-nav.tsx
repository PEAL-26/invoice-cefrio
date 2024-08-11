"use client";

import Link from "next/link";
import { HTMLAttributes } from "react";

import { cn } from "@/libs/utils";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/invoices", label: "Facturas" },
  { href: "/products", label: "Produtos\\Serviços" },
  { href: "/customers", label: "Clientes" },
];

export function MainNav(props: HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const { className, ...rest } = props;

  const activeLink = (url: string) => {
    const className = {
      active: "text-sm font-bold transition-colors hover:text-primary text-primary",
      inative:
        "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
    }[url === pathname ? "active" : "inative"];

    return className;
  };

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...rest}
    >
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={activeLink(link.href)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
