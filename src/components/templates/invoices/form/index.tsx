import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CustomerForm } from "./customer-form";
import { DocumentSettings } from "./document-settings";
import { ItemListingTable } from "./item-listing-table";
import { Resume } from "./resume";

export function InvoiceForm() {
  return (
    <form className="bg-white space-y-6">
      <div className="flex items-start justify-between gap-6">
        <DocumentSettings />
        <CustomerForm />
      </div>
      <ItemListingTable />
      <Resume />
      <div className="flex justify-end">
        <Button
          className="bg-primary-900 text-white hover:bg-primary-800"
          type="submit"
        >
          Save Invoice
        </Button>
      </div>
    </form>
  );
}
