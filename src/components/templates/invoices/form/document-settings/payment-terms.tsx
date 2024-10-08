import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useDocumentSettings } from "./use-document-settings";
import { cn } from "@/libs/utils";
import { useState } from "react";
import { PAYMENT_TERMS } from "@/constants/payment-terms";

export function PaymentTerms() {
  const { form } = useDocumentSettings();
  const [open, setOpen] = useState(false);

  const paymentTerms = PAYMENT_TERMS.find(
    (payment) => payment.code === form.getValues("paymentTerms")
  );

  const handleSelect = (terms?: string) => {
    form.setValue("paymentTerms", terms);
    setOpen(false);
  };

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger className="flex items-center line-clamp-1 flex-1 gap-2">
        <span
          className={cn(
            "flex gap-2 items-center line-clamp-1 whitespace-nowrap w-full text-right",
            !paymentTerms?.name && "text-gray-400"
          )}
        >
          {paymentTerms?.name || "Nenhum"}
        </span>
        <ChevronDownIcon className="text-gray-400" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit">
        <div className="flex flex-col">
          {PAYMENT_TERMS.map((payment, key) => (
            <label
              key={key}
              className="flex items-center gap-2 line-clamp-1 pr-10"
            >
              <input
                name="payment-terms"
                type="radio"
                onChange={() => handleSelect(payment.code)}
                checked={paymentTerms?.code === payment.code}
              />
              <span className="line-clamp-1">{payment.name}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
