import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  toastResponseError,
  toastResponseRegisterSuccess,
} from "@/helpers/response/response";
import { useQueryGetDataCached } from "@/hooks";

import { productSchema, ProductSchemaType } from "./product";
import { UseDialogProps } from "./types";
import { productService } from "@/services/products";

export function useDialog(props: UseDialogProps) {
  const { id, open, onClose } = props;
  const queryClient = useQueryClient();
  const { getDataCached } = useQueryGetDataCached();

  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["product"],
    mutationFn: productService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      if (open) {
        toastResponseRegisterSuccess(id);
        onClose?.(false);
      }
    },
    onError: (error) => {
      toastResponseError(error);
    },
  });

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: { id },
    mode: "onChange",
  });

  const handleSubmit = async (data: ProductSchemaType) => {
    if (isPending) return;
    await mutateAsync(data);
  };

  useEffect(() => {
    if (!open) {
      form.reset({
        id: undefined,
        name: "",
      });
    }
    if (id && open) {
      setIsLoading(true);
      const response = getDataCached(id, ["products"]);
      if (response) {
        form.setValue("id", response.id);
        form.setValue("name", response.name);
        form.setValue("price", response?.price);
        form.setValue("unitMeasure", response?.unitMeasure);
        form.setValue("iva", response?.iva);
      }
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, open]);

  return {
    form,
    isPending,
    isLoading,
    onSubmit: form.handleSubmit(handleSubmit),
  };
}
