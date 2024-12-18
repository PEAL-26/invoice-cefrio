import { Handlebars } from '@/libs/handlebars';
import { InvoiceDataType } from '../types';

import { generateItems } from '../utils';
import templateSource from './invoice.min.hbs';

export async function invoiceTemplate(data: InvoiceDataType) {
  const {
    company,
    customer,
    document,
    items,
    logo_url,
    total,
    banks = [],
    show_banks,
    tax_summary,
    payments,
    show_payments = true,
    number_validation,
  } = data;

  const { total_pages, pages } = await generateItems(items, 22);
  const context = {
    total_pages,
    pages,
    logo_url,
    company: {
      name: company?.name || false,
      slogan: company?.slogan || false,
      phone: company?.phone || false,
      email: company?.email || false,
      site: company?.site || false,
      address: company?.address || false,
      tax_id: company?.tax_id || false,
      location: company?.location || false,
    },
    customer: {
      name: customer?.name || false,
      phone: customer?.phone || false,
      email: customer?.email || false,
      address: customer?.address || false,
      location: customer?.location || false,
      tax_id: customer?.tax_id || false,
    },
    document: {
      number: document.number,
      currency: {
        name: document?.currency?.name || 'Akz',
        rate: document?.currency?.rate || '0,00 Kz',
      },
      date_issue: document.date_issue,
      due_date: document?.due_date || false,
      discount: document?.discount || false,
      payment_terms: document?.payment_terms || false,
      observation: document?.observation || false,
    },
    tax_summary:
      tax_summary?.map((tax) => ({
        value: tax?.value || '0,00 Kz',
        incidence: tax?.incidence || '0,00 Kz',
        total: tax?.total || '0,00 Kz',
        reason_exemption: tax?.reason_exemption || '',
      })) || [],
    total: {
      items: total.items,
      discounts: total.discounts,
      advance: total.advance,
      iva: total.iva,
      hit: total.hit,
      retention: total.retention,
      value: total.value,
    },
    show_banks,
    banks,
    number_validation,
    show_payments,
    payments,
  };

  const template = Handlebars.compile(templateSource);

  return template(context);
}
