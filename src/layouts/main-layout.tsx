import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ReactNode } from "react";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
