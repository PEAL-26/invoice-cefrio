import { ListCustomers } from '@/components/templates/customers';
import { Loading } from '@/components/ui/loading';
import { Suspense } from 'react';

export const metadata = {
  title: 'Clientes',
};

export default function CustomersPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ListCustomers />
    </Suspense>
  );
}
