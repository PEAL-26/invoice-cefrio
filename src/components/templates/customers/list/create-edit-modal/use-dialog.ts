import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  toastResponseError,
  toastResponseRegisterSuccess,
} from "@/helpers/response/response";
import { useQueryGetDataCached } from "@/hooks";

import { customerSchema, CustomerSchemaType } from "./customer";
import { UseDialogProps } from "./types";
import { customerService } from "@/services/customers";

export function useDialog(props: UseDialogProps) {
  const { id, open, onClose } = props;
  const queryClient = useQueryClient();
  const { getDataCached } = useQueryGetDataCached();

  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["customer"],
    mutationFn: customerService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
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

  const form = useForm<CustomerSchemaType>({
    resolver: zodResolver(customerSchema),
    defaultValues: { id },
    mode: "onChange",
  });

  const handleSubmit = async (data: CustomerSchemaType) => {
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
      const response = getDataCached(id, ["customers"]);
      if (response) {
        form.setValue("id", response.id);
        form.setValue("name", response.name);
        form.setValue("address", response?.address);
        form.setValue("location", response?.location);
        form.setValue("taxpayer", response?.taxpayer);
        form.setValue("telephone", response?.telephone);
        form.setValue("email", response?.email);
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
