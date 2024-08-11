import { Dashboard } from "@/components/templates/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return <Dashboard />;
}
