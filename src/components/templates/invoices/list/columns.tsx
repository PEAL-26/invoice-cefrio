"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { InvoiceListResponseData } from "@/services/invoices";
import { DataTableColumnHeader } from "@/components/ui/data-table";

import { DataTableRowActions } from "./data-table-row-actions";

interface ColumnProps {
  onDelete?: (id: string) => void;
}

export const columns = (
  props?: ColumnProps
): ColumnDef<InvoiceListResponseData>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nº" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("number")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span> {row.getValue("type")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cliente" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("customer")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("customer.name")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actions={props} />,
  },
];
