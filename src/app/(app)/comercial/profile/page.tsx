import { Loading } from '@/components/ui/loading';
import { Suspense } from 'react';

export const metadata = {
  title: 'Produtos\\Serviços',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <></>
    </Suspense>
  );
}
