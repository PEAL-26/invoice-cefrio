import { CreateInvoice } from "../../../components/templates/invoices";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova Factura",
};

export default function CreateInvoicePage() {
  return <CreateInvoice />;
}
