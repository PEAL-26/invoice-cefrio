import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, SubmitErrorHandler, useForm } from "react-hook-form";
import {
  INVOICE_SCHEMA_PROPERTY,
  invoiceSchema,
  InvoiceSchemaType,
} from "./schema";
import {
  generateResponseError,
  toastResponseError,
  toastResponseRegisterSuccess,
} from "@/helpers/response/response";
import { useEffect, useState } from "react";
import { invoiceService } from "@/services/invoices";
import { useQueryClient } from "@tanstack/react-query";

interface InvoiceFormProps {
  id?: string;
}

export function useInvoiceForm(props?: InvoiceFormProps) {
  const { id = "" } = props || {};
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ property: string; message: string }[]>(
    []
  );
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const form = useForm<InvoiceSchemaType>({
    resolver: zodResolver(invoiceSchema),
    mode: "onChange",
    defaultValues: {
      date: new Date(),
      dueDate: new Date(),
      currency: "AOA",
      subtotal: 0,
      totalDiscount: 0,
      totalIva: 0,
      totalWithholdingTax: 0,
      total: 0,
      items: [
        {
          name: "",
          itemId: "",
          unitMeasure: "UN",
          discount: 0,
          discountAmount: 0,
          iva: 0,
          ivaAmount: 0,
          price: 0,
          quantity: 1,
          total: 0,
        },
      ],
    },
  });

  const queryClient = useQueryClient();
  const handleSubmit = async (data: InvoiceSchemaType) => {
    if (isLoading) return;

    try {
      setErrors([]);
      setIsLoading(true);
      const { items, payments, documents, ...rest } = data;
      await invoiceService.create({
        id: rest?.id,
        type: rest.type,
        customerId: rest?.customerId,
        date: rest.date,
        dueDate: rest?.dueDate,
        paymentTerms: rest?.paymentTerms,
        reference: rest?.reference,
        observation: rest?.observation,
        withholdingTax: rest?.withholdingTax,
        generalDiscount: rest?.generalDiscount,
        currency: rest?.currency,
        exchange: rest?.exchange,
        items: items?.map((item) => ({
          id: item.itemId,
          name: item.name,
          price: item?.price,
          unitMeasure: item?.unitMeasure,
          quantity: item.quantity,
          discount: item?.discount,
          iva: item?.iva,
          reasonExemption: item?.reasonExemption,
        })),
        payments: payments?.map((payment) => ({
          id: payment?.paymentId,
          method: payment.method,
          amount: payment.amount,
        })),
        documents: documents?.map((item) => ({
          id: item.documentId,
          paid: item.paid,
        })),
      });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toastResponseRegisterSuccess(data?.id);
    } catch (error) {
      setErrors([{ property: "", message: generateResponseError(error) }]);
      toastResponseError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onInvalid = (errors: FieldErrors<InvoiceSchemaType>) => {
    setErrors(() => []);

    const _errors = Object.entries(errors).map(([property, error]) => {
      if (Array.isArray(error)) {
        for (const errorProperties of error) {
          for (const [errorProperty, errorPropertyError] of Object.entries(
            errorProperties as any
          ) as any) {
            return {
              property:
                INVOICE_SCHEMA_PROPERTY[
                  errorProperty as keyof typeof INVOICE_SCHEMA_PROPERTY
                ],
              message: errorPropertyError?.message,
            };
          }
        }
      }
      return {
        property:
          INVOICE_SCHEMA_PROPERTY[
            property as keyof typeof INVOICE_SCHEMA_PROPERTY
          ],
        message: error.message,
      };
    });

    setErrors(_errors);
  };

  const loadingInvoice = async () => {
    if (!id) return;

    setIsNotFound(false);
    const invoice = await invoiceService.getById(id);

    if (!invoice) {
      setIsNotFound(true);
    }

    if (invoice) {
      form.setValue("id", invoice.id);
      form.setValue("number", invoice.number);
      form.setValue("type", invoice.type);
      form.setValue("customerId", invoice.customer?.id);
      form.setValue("date", invoice.date);
      form.setValue("dueDate", invoice.dueDate);
      form.setValue("currency", invoice.currency);
      form.setValue("exchange", invoice.exchange);
      form.setValue("paymentTerms", invoice.paymentTerms);
      form.setValue("observation", invoice.observation);
      form.setValue("reference", invoice.reference);
      form.setValue("totalWithholdingTax", invoice.totalWithholdingTax);
      form.setValue("withholdingTax.type", invoice.withholdingTaxType);
      form.setValue(
        "withholdingTax.percentage",
        invoice.withholdingTaxPercentage
      );
      form.setValue("generalDiscount", invoice.generalDiscount);
      form.setValue("subtotal", invoice.subtotal);
      form.setValue("totalIva", invoice.totalIva);
      form.setValue("totalDiscount", invoice.totalDiscount);
      form.setValue("total", invoice.total);
      form.setValue(
        "items",
        invoice?.products?.map((prod) => ({
          itemId: prod.product.id || "",
          name: prod.product.name,
          unitMeasure: prod.product.unitMeasure,
          quantity: prod.quantity,
          price: prod.price,
          discount: prod.discount,
          discountAmount: prod.discountAmount,
          iva: prod.iva,
          ivaAmount: prod.ivaAmount,
          total: prod.total,
        }))
      );
      form.setValue(
        "payments",
        invoice.payments?.map((payment) => ({
          paymentId: payment.id || "",
          method: payment.method,
          amount: payment.amount,
        }))
      );
      form.setValue(
        "documents",
        invoice.documents?.map((doc) => ({
          documentId: doc.document.id,
          paid: doc.paid,
        }))
      );
      form.setValue(
        "taxes",
        invoice.taxes?.map((tax) => ({
          taxId: tax.id,
          value: tax.value,
          amount: tax.amount,
          incidence: tax.incidence,
          observation: tax.observation,
        }))
      );
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoadingPage(true);
      await loadingInvoice();
      setIsLoadingPage(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    errors,
    form,
    isLoading,
    isLoadingPage,
    isNotFound,
    setErrors,
    onSubmit: form.handleSubmit(handleSubmit, onInvalid),
  };
}
