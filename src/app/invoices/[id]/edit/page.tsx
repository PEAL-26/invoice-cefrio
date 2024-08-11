import { EditInvoice } from "../../../../components/templates/invoices";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alterar Factura",
};

export default function EditInvoicePage() {
  return <EditInvoice />;
}
