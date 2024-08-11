import { crud } from "@/libs/axios";
import { ListRequestParams } from "@/types";

export interface ProductListResponseData {
  id: string;
  name: string;
  unitMeasure?: string;
  price?: number;
  iva?: number;
}

export interface ProductParams extends ListRequestParams {}

export interface ProductRequestData {
  id?: string;
  name: string;
  unitMeasure?: string;
  price?: number;
  iva?: number;
}

export const productService = crud<
  ProductRequestData,
  ProductRequestData,
  ProductListResponseData,
  ProductParams
>({ route: "products" });
