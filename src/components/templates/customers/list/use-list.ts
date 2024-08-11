import { toastResponseError } from "@/helpers/response/response";
import { useGetSearchParams, useQueryPagination } from "@/hooks";
import { customerService } from "@/services/customers";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useList() {
  const queryClient = useQueryClient();
  const [q, size, page] = useGetSearchParams({ params: ["q", "size", "page"] });

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);

  const response = useQueryPagination({
    fn: async () => await customerService.list({ page, q, size }),
    queryKey: ["customers", q, size, page],
  });

  const handleOpenDialog = (id?: string) => {
    setId(() => id);
    setIsOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await customerService.delete(id);
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    } catch (error) {
      toastResponseError(error);
    }
  };

  useEffect(() => {
    if (!isOpenDialog) setId(undefined);
  }, [isOpenDialog]);

  return {
    id,
    response,
    isOpenDialog,
    handleOpenDialog,
    handleDelete,
    setIsOpenDialog,
  };
}
