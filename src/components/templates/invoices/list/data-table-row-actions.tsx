"use client";

import Link from "next/link";
import { useState } from "react";
import { Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { AlertModal } from "@/components/modals/alert-modal";

interface Actions {
  onDelete?: (id: string) => void;
}

interface DataTableRowActionsProps<TData extends { id: string }> {
  row: Row<TData>;
  actions?: Actions;
}

export function DataTableRowActions<TData extends { id: string }>({
  row,
  actions,
}: DataTableRowActionsProps<TData>) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={`/invoices/${row.original?.id}`}>Ver Detalhes</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/invoices/${row.original?.id}/edit`}>Alterar</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Imprimir</DropdownMenuItem>
          <DropdownMenuItem>Baixar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsOpenDeleteModal(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertModal
        open={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        onOk={() => actions?.onDelete?.(row.original?.id || "")}
      />
    </>
  );
}
