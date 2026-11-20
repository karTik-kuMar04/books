import { CharactersView } from '@/features/characters';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CharactersView id={id} />;
}
