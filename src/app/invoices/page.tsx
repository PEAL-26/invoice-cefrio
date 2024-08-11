import { Metadata } from "next";
import { Suspense } from "react";
import { ListInvoices } from "../../components/templates/invoices";

export const metadata: Metadata = {
  title: "Facturas",
};

export default function InvoiceListPage() {
  return (
    <Suspense>
      <ListInvoices />
    </Suspense>
  );
}
