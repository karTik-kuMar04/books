# Playbook: Product Copy & UX Standards

## Rule

Use clear, unambiguous product terminology: Characters map, Concepts map, Key points, Ask this book, Study cards, Marks, Meaning, Author's idea. Every screen must display a concise one-line purpose statement directly under its title. Every empty state must name the exact user action needed to populate it.

## AI Insights & Sacred Texts

- AI Insights: Always pair with the violet AI chip and an explicit Evidence link referencing the source passage.
- Sacred & Historical Texts: Use strictly neutral, objective wording (e.g., "Explanations from the text written by AI"). Never claim to reveal "the true meaning" or "the real interpretation".

## Examples

### Right

```tsx
// Purpose line under title
<div className="space-y-1">
  <h1 className="font-display text-2xl font-bold">Characters Map</h1>
  <p className="text-sm text-muted">Explore who is who and how they connect.</p>
</div>

// Action-oriented empty state
<div className="rounded-card border border-border p-8 text-center">
  <Icon name="bookmark" size={24} className="mx-auto text-muted" />
  <h3 className="mt-3 font-semibold text-text">No marks yet</h3>
  <p className="mt-1 text-sm text-muted">Select text while reading and click Mark to save passages here.</p>
  <button className="mt-4 rounded-control bg-primary px-4 py-2 text-primary-fg">Open Reader</button>
</div>
```

### Wrong

```tsx
// Ambiguous empty state:
<div className="text-center">Nothing found.</div>

// Subjective dogmatic claims on religious texts:
<p>Here is the real meaning of verse 4.</p>
```
