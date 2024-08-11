import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TableItem } from "./item";

export function ItemListingTable() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Itens</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-right">Desc.</TableHead>
            <TableHead className="text-right">IVA</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableItem />
        </TableBody>
      </Table>
      <Button className="mt-4" size="sm" variant="outline">
        Add Item
      </Button>
    </div>
  );
}
