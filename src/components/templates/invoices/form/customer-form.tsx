"use client";
import { Label } from "@/components/ui/label";
import { Input, inputClassName } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "@/components/ui/autocomplete";
import { cn } from "@/libs/utils";

export function CustomerForm() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
    console.log(event.query);
    setItems(
      Array.from({ length: 10 }).map((item) => event.query + "-" + item)
    );
  };

  return (
    <div className="flex flex-col max-w-lg ">
      <h2 className="text-lg font-semibold mb-4 w-full">Cliente</h2>
      <div className="grid grid-cols-2 gap-6 ">
        <div className="col-span-2 flex flex-col">
          <Label htmlFor="customer-name">Nome do cliente</Label>
          <AutoComplete
            value={value}
            suggestions={items}
            completeMethod={search}
            onChange={(e) => setValue(e.value)}
            inputClassName={cn(inputClassName)}
            panelClassName="w-full"
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="customer-contribuinte">Contribuinte</Label>
          <Input id="customer-contribuinte" />
        </div>
        <div>
          <Label htmlFor="customer-telephone">Telefone</Label>
          <Input
            id="customer-telephone"
            placeholder="900 00 00 00"
            type="text"
          />
        </div>
        <div>
          <Label htmlFor="customer-email">Email</Label>
          <Input
            id="customer-email"
            placeholder="example@ex.com"
            type="email"
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="customer-address">Endereço</Label>
          <Textarea
            id="customer-address"
            placeholder="123 Main St, Anytown USA"
          />
        </div>
      </div>
    </div>
  );
}
