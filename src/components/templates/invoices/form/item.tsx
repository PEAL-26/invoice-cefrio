"use client";
import { useState } from "react";

import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { cn } from "@/libs/utils";
import { TableRow, TableCell } from "@/components/ui/table";
import { Input, inputClassName } from "@/components/ui/input";

export function TableItem() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
    setItems(
      Array.from({ length: 10 }).map((item) => event.query + "-" + item)
    );
  };

  return (
    <TableRow>
      <TableCell>
        <AutoComplete
          value={value}
          suggestions={items}
          completeMethod={search}
          onChange={(e) => setValue(e.value)}
          placeholder="Product or Service"
          inputClassName={cn(inputClassName)}
        />
      </TableCell>
      <TableCell className="w-[1%]">
        <Input defaultValue="1" min="1" type="number" className="w-20" />
      </TableCell>
      <TableCell className="w-[1%]">
        <Input
          defaultValue="0.00"
          min="0.00"
          step="0.01"
          type="number"
          className="w-40 text-right"
        />
      </TableCell>
      <TableCell className="w-[1%]">
        <Input
          defaultValue="0.00"
          min="0.00"
          step="0.01"
          type="number"
          className="w-40 text-right"
        />
      </TableCell>
      <TableCell className="w-[1%]">
        <Input
          defaultValue="0.00"
          min="0.00"
          step="0.01"
          type="number"
          className="w-40 text-right"
        />
      </TableCell>
      <TableCell className="text-right">$0.00</TableCell>
    </TableRow>
  );
}
