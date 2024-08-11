import { crud } from "@/libs/axios";
import { ListRequestParams } from "@/types";

export interface InvoiceListResponseData {
  id: string;
  number: string;
  type: string;
  customer: string;
  total?: number;
}

export interface InvoiceParams extends ListRequestParams {}

export interface InvoiceRequestData {
  id?: string;
  number?: string;
  type: string;
  customerId: string;
  customerDiscount?: number;
  financialDiscount?: number;
  exchange?: number;
  date: Date;
  dueDate?: Date;
  paymentCondition?: string;
  invoices: Product[];
  payments?: Payment[];
}

interface Product {
  id: string;
  quantity: number;
  discount: number;
}

interface Payment {
  method: string;
  amount: number;
}

export const invoiceService = crud<
  InvoiceRequestData,
  InvoiceRequestData,
  InvoiceListResponseData,
  InvoiceParams
>({ route: "invoices" });
