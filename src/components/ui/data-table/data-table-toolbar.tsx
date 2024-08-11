"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import {
  useDebounceValue,
  useGetSearchParams,
  useSetSearchParams,
} from "@/hooks";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { setParams } = useSetSearchParams();
  const [q, size] = useGetSearchParams({ params: ["q", "size"] });
  const [search, setSearch] = useState(q || "");
  const isFiltered = search.trim().length > 0;
  const debounced = useDebounceValue(search?.trim());

  const setParamsSearch = useCallback(() => {
    setParams([
      { name: "q", value: debounced },
      { name: "page", value: debounced ? "1" : "" },
      { name: "size", value: size },
    ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    setParamsSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const reset = () => {
    setSearch("");
    table.resetColumnFilters();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Pesquisar..."
          value={search}
          onChange={(event) => setSearch(String(event.target.value))}
          className="h-8 w-[150px] placeholder-muted-foreground lg:w-[250px]"
        />
        {isFiltered && (
          <Button variant="ghost" onClick={reset} className="h-8 px-2 lg:px-3">
            Limpar filtro
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
