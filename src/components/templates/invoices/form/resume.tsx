import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Resume() {
  return (
    <div className="flex gap-6 ">
      <div>
        <Label htmlFor="subtotal">Subtotal</Label>
        <Input
          defaultValue="0.00"
          disabled
          id="subtotal"
          min="0.00"
          step="0.01"
          type="number"
        />
      </div>
      <div>
        <Label htmlFor="tax">Tax</Label>
        <Input
          defaultValue="0.00"
          id="tax"
          min="0.00"
          step="0.01"
          type="number"
        />
      </div>
      <div>
        <Label htmlFor="total">Total</Label>
        <Input
          defaultValue="0.00"
          disabled
          id="total"
          min="0.00"
          step="0.01"
          type="number"
        />
      </div>
    </div>
  );
}
