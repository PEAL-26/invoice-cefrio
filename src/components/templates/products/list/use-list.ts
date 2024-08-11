import { toastResponseError } from "@/helpers/response/response";
import { useGetSearchParams, useQueryPagination } from "@/hooks";
import { productService } from "@/services/products";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useList() {
  const queryClient = useQueryClient();
  const [q, size, page] = useGetSearchParams({ params: ["q", "size", "page"] });

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);

  const response = useQueryPagination({
    fn: async () => await productService.list({ page, q, size }),
    queryKey: ["products", q, size, page],
  });

  const handleOpenDialog = (id?: string) => {
    setId(() => id);
    setIsOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await productService.delete(id);
      queryClient.invalidateQueries({
        queryKey: ["products"],
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
