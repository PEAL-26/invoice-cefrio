import { ListProducts } from "../../components/templates/products";
import { Suspense } from "react";

export const metadata = {
  title: "Produtos\\Serviços",
};

export default function ProductsPage() {
  return (
    <Suspense>
      <ListProducts />
    </Suspense>
  );
}
