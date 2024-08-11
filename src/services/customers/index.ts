import { crud } from "@/libs/axios";
import { ListRequestParams } from "@/types";

export interface CustomerListResponseData {
  id: string;
  name: string;
  taxpayer?: string;
  telephone?: string;
  email?: string;
}

export interface CustomerParams extends ListRequestParams {}

export interface CustomerRequestData {
  id?: string;
  name: string;
  address?: string;
  location?: string;
  email?: string;
  taxpayer?: string;
  telephone?: string;
}

export const customerService = crud<
  CustomerRequestData,
  CustomerRequestData,
  CustomerListResponseData,
  CustomerParams
>({ route: "customers" });
