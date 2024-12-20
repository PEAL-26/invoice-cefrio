import { Loading } from '@/components/ui/loading';
import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';

interface Props {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id;

  return {
    // title: invoice?.number || "",
  };
}

export default async function MailsInputMessageDetailsPage(props: Props) {
  return <Suspense fallback={<Loading />}>mensagem de entrada{JSON.stringify(props)}</Suspense>;
}
