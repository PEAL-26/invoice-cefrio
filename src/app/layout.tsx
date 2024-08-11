import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppLayout } from "@/components/layout";
import { PrimeReactProvider } from "primereact/api";
import { cn } from "@/libs/utils";
import { QueryClientProvider } from "@/providers";
import Tailwind from "primereact/passthrough/tailwind";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cefrio Invoice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={cn(inter.className, "overflow-hidden")}>
        <QueryClientProvider>
          <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
            <AppLayout>{children}</AppLayout>
          </PrimeReactProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
