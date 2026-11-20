import { MarksView } from '@/features/marks';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MarksView id={id} />;
}
