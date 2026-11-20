import { ConceptsView } from '@/features/concepts';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ConceptsView id={id} />;
}
