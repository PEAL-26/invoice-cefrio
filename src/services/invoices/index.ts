import { crud } from "@/libs/axios";
import { ListRequestParams } from "@/types";
import { CustomerRequestData } from "../customers";
import { ProductRequestData } from "../products";

export interface InvoiceListResponseData {
  id: string;
  number: string;
  type: string;
  date: Date;
  customer: { id: string; name: string };
  total?: number;
}

export interface InvoiceParams extends ListRequestParams {
  type?: string;
}

export interface InvoiceRequestData {
  id?: string;
  type: string;
  customerId?: string;
  date: Date;
  dueDate?: Date;
  currency?: string;
  exchange?: number;
  paymentTerms?: string;
  reference?: string;
  observation?: string;
  generalDiscount?: number;
  withholdingTax?: { type?: string; percentage?: number };
  items?: Product[];
  payments?: Payment[];
  documents?: Document[];
}

interface Product {
  id: string;
  unitMeasure?: string;
  price?: number;
  quantity: number;
  discount: number;
  iva: number;
  reasonExemption?: string;
}

interface Payment {
  id?: string;
  method: string;
  amount: number;
}

interface Document {
  id: string;
  paid: number;
}

enum WithholdingTaxTypeEnum {
  PARTICULAR = "PARTICULAR",
  COMPANY = "COMPANY",
}

export interface InvoiceDetailsData {
  id: string;
  number: string;
  type: string;
  customer: CustomerRequestData;
  currency?: string;
  exchange?: number;
  date: Date;
  dueDate?: Date;
  paymentTerms?: string;
  reference?: string;
  observation?: string;
  withholdingTaxType?: WithholdingTaxTypeEnum;
  withholdingTaxPercentage?: number;
  generalDiscount?: number;

  subtotal?: number;
  totalIva?: number;
  totalDiscount?: number;
  totalWithholdingTax?: number;
  total?: number;

  createdAt?: Date;
  updatedAt?: Date;

  products?: InvoiceDetailsProduct[];
  payments?: InvoiceDetailsPayment[];
  taxes?: InvoiceDetailsTax[];
  documents?: InvoiceDetailsDocument[];
}

interface InvoiceDetailsProduct {
  id: string;
  product: ProductRequestData;
  productName: string;
  unitMeasure?: string;
  price: number;
  quantity: number;
  discount?: number;
  discountAmount?: number;
  iva?: number;
  ivaAmount?: number;
  total: number;
}

interface InvoiceDetailsPayment {
  id: string;
  method: string;
  amount: number;
}

interface InvoiceDetailsTax {
  id: string;
  value: number;
  amount: number;
  incidence: number;
  observation?: string;
}

interface InvoiceDetailsDocument {
  id: string;
  document: InvoiceDetailsData;
  paid: number;
}

export const invoiceService = crud<
  InvoiceRequestData,
  InvoiceRequestData,
  InvoiceListResponseData,
  InvoiceParams,
  InvoiceDetailsData
>({ route: "invoices" });
