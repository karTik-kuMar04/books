import { ReaderView } from '@/features/reader';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ReaderView id={id} />;
}
