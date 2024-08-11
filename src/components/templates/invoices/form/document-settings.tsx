import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function DocumentSettings() {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Documento</h2>
      <div className="grid grid-cols-2 gap-6 ">
        <div className="col-span-2">
          <Label htmlFor="doc-type">Tipo de documento</Label>
          <Input id="doc-type" placeholder="Factura Proforma" type="text" />
        </div>
        <div>
          <Label htmlFor="doc-number">Número</Label>
          <Input id="doc-number" disabled placeholder="PP.2024/1" type="text" />
        </div>
        <div>
          <Label htmlFor="doc-currency">Moeda</Label>
          <Input id="doc-currency" placeholder="Akz" type="text" value="Akz" />
        </div>
        <div>
          <Label htmlFor="doc-date">Data</Label>
          <Input id="doc-date" type="datetime-local" />
        </div>
        <div>
          <Label htmlFor="doc-due-date">Vencimento</Label>
          <Input id="doc-due-date" type="date" />
        </div>
        <div>
          <Label htmlFor="doc-customer-disc">Desconto cliente</Label>
          <Input
            id="doc-customer-disc"
            placeholder="0,00"
            className="text-right"
          />
        </div>
        <div>
          <Label htmlFor="doc-financial-disc">Desconto financeiro</Label>
          <Input
            id="doc-financial-disc"
            placeholder="0,00"
            className="text-right"
          />
        </div>
        <div>
          <Label htmlFor="doc-payment-conditions">Condições de Pagamento</Label>
          <Input id="doc-payment-conditions" placeholder="Pronto Pagamento" />
        </div>
        <div>
          <Label htmlFor="doc-reference">Referência</Label>
          <Input id="doc-reference" placeholder="Referência" />
        </div>
        <div className="col-span-2">
          <Label htmlFor="doc-obs">OBS</Label>
          <Textarea id="doc-obs" placeholder="Pagamento de 50%" />
        </div>
      </div>
    </div>
  );
}
