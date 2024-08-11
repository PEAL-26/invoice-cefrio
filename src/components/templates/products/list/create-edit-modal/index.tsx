"use client";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { DialogProps } from "./types";
import { useDialog } from "./use-dialog";

export function CreateEditProductDialog(props: DialogProps) {
  const { id, open, onClose } = props;
  const { isPending, isLoading, form, onSubmit } = useDialog({
    id,
    open,
    onClose,
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {id ? "Alterar produto\\serviço" : "Adicionar produto\\serviço"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="grid w-full gap-4 sm:rounded-lg">
            <div className="grid grid-cols-3 gap-6 ">
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full flex-1">
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          placeholder="Ex.: Instalação mecânica de AC"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="unitMeasure"
                  render={({ field }) => (
                    <FormItem className="w-full flex-1">
                      <FormLabel>Unidade</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          placeholder="Km"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full flex-1">
                      <FormLabel>Preço</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="iva"
                  render={({ field }) => (
                    <FormItem className="w-full flex-1">
                      <FormLabel>IVA</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="flex lg:items-center lg:justify-center">
              <Button
                variant={"default"}
                className="gap-2 text-white"
                type="submit"
                disabled={isPending || isLoading}
              >
                {(isPending || isLoading) && (
                  <Loader2 className="size-3 animate-spin" />
                )}
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
