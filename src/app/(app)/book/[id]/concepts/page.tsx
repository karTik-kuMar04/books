export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="p-8">
      <h1 className="font-display text-2xl font-bold capitalize">concepts</h1>
      <p className="text-muted text-sm">Book ID: {id}</p>
    </main>
  );
}
