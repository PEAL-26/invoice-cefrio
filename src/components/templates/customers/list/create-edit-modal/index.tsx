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
import { Textarea } from "@/components/ui/textarea";

export function CreateEditCustomerDialog(props: DialogProps) {
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
            {id ? "Alterar cliente" : "Adicionar cliente"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="grid w-full gap-4 sm:rounded-lg">
            <div className="grid grid-cols-2 gap-6 ">
              <div className="col-span-2">
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
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="taxpayer"
                  render={({ field }) => (
                    <FormItem className="w-full flex-1">
                      <FormLabel>Contribuinte</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          placeholder="0000000000"
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
                  name="telephone"
                  render={({ field }) => (
                    <FormItem className="w-full flex-1">
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          placeholder="900 000 000"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full flex-1">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          placeholder="LhXkT@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="w-full flex-1">
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          placeholder="LhXkT@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full flex-1">
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          placeholder="123 Main St, Anytown USA"
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
