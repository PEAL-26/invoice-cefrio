import { useState } from "react";
import { LoaderIcon, PlusCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounceValue, useQueryPagination } from "@/hooks";
import {
  CustomerListResponseData,
  customerService,
} from "@/services/customers";
import { Button } from "@/components/ui/button";

interface CustomerTablePros {
  open: boolean;
  onAdd?(): void;
  onSelect?(customer: CustomerListResponseData): void;
}
export function CustomerTable(props: CustomerTablePros) {
  const { open, onAdd, onSelect } = props;
  const [page, setPage] = useState<string | undefined>(undefined);
  const [size, setSize] = useState<string | undefined>("10");
  const [query, setQuery] = useState<string | undefined>(undefined);

  const q = useDebounceValue(query);

  const { data, isLoading, isError } = useQueryPagination({
    fn: async () => await customerService.list({ page, q, size }),
    queryKey: ["customers", q, size, page],
    disableFetch: !open,
  });

  return (
    <div className="h-full w-full p-4">
      <Input
        placeholder="Pesquisar"
        value={query}
        onChange={(e) => setQuery(e.target.value || "")}
      />
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="hover:bg-transparent">Cliente</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && !isError && (
            <TableRow className="hover:bg-transparent h-full">
              <TableCell className="h-full">
                <div className="flex justify-center items-center">
                  <LoaderIcon className="animate-spin" />
                </div>
              </TableCell>
            </TableRow>
          )}
          {!isLoading && isError && (
            <div className="flex justify-center items-center">
              <TableRow className="hover:bg-transparent h-full">
                <TableCell>
                  <div className="flex justify-center items-center">
                    <LoaderIcon className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            </div>
          )}
          {!isLoading && !isError && data.length === 0 && (
            <div className="flex justify-center items-center">
              <TableRow className="hover:bg-transparent h-full">
                <TableCell>Nenhum item</TableCell>
                <Button className="gap-2" variant="ghost" onClick={onAdd}>
                  <PlusCircle /> Adicionar
                </Button>
              </TableRow>
            </div>
          )}
          {!isLoading &&
            !isError &&
            data.map((item, key) => (
              <TableRow
                key={key}
                className="hover:cursor-pointer"
                onClick={() => onSelect?.(item)}
              >
                <TableCell>{item.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
