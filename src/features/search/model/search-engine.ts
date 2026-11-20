export interface SearchDocument {
  id: string;
  title: string;
  text: string;
  scope: 'Books' | 'Marks' | 'Vocabulary';
  href: string;
}

export function tokenise(query: string): string[] {
  return query.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

export function searchDocuments(documents: SearchDocument[], query: string): SearchDocument[] {
  const tokens = tokenise(query);
  if (!tokens.length) return [];
  return documents
    .map((document) => {
      const title = document.title.toLowerCase();
      const text = document.text.toLowerCase();
      const score = tokens.reduce(
        (total, token) => total + (title.includes(token) ? 3 : 0) + (text.includes(token) ? 1 : 0),
        0,
      );
      return { document, score };
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .map(({ document }) => document);
}
