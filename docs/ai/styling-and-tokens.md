# Playbook: Styling & Design Tokens

## Rule

Style strictly using semantic token utilities (`bg-page`, `bg-card`, `text-text`, `text-muted`, `border-border`, `bg-primary`, `text-primary-fg`, etc.). Never write hardcoded hex, rgb, or hsl values in components or CSS. Never write `dark:` overrides; semantic tokens switch automatically with `[data-theme='dark']`. Restrict breakpoints to `md` (768px) and `xl` (1280px).

## Color Semantics

- `primary`: Interactive controls, buttons, links, progress, Study mode.
- `amber`: User marks and user notes only.
- `violet`: AI-generated insights, summaries, and suggestions.
- `rose`: Story mode, characters, narrative relationships.

## Examples

### Right

```tsx
// Using semantic tokens and logical properties
<div className="rounded-card border-border bg-card shadow-raised border p-6">
  <h2 className="font-display text-text text-xl font-bold">Chapter Insights</h2>
  <p className="text-muted mt-2 text-sm">Summary generated from reading.</p>
  <button className="rounded-control bg-primary text-primary-fg focus:ring-primary mt-4 px-4 py-2 text-sm font-medium hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none">
    Study Cards
  </button>
</div>
```

### Wrong

```tsx
// Hardcoded hex colors (Banned by ESLint and script):
<div className="border-[#D2CCBF] bg-[#F4F1EA] text-[#22282C]">
  {/* Dark mode override (Banned: tokens adapt automatically) */}
  <p className="text-gray-600 dark:text-gray-300">Hardcoded colors</p>
  {/* Arbitrary breakpoint */}
  <div className="lg:flex 2xl:grid">Content</div>
</div>
```
