import { Suspense } from 'react';

async function Content({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="p-8">
      <h1 className="font-display text-2xl font-bold capitalize">characters</h1>
      <p className="text-muted text-sm">Book ID: {id}</p>
    </main>
  );
}

export default function BookCharactersPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="text-muted p-8 text-sm">Loading characters...</div>}>
      <Content params={props.params} />
    </Suspense>
  );
}
