"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table";
import { CustomerListResponseData } from "@/services/customers";

import { DataTableRowActions } from "./data-table-row-actions";

interface ColumnProps {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const columns = (
  props?: ColumnProps
): ColumnDef<CustomerListResponseData>[] => [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate font-medium">
        {row.getValue("name")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "taxpayer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contribuinte" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <span> {row.getValue("taxpayer")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "telephone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Telefone" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="">{row.getValue("telephone")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("email")}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actions={props} />,
  },
];
