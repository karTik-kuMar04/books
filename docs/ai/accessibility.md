# Playbook: Accessibility & WCAG Compliance

## Rule

Folio must maintain zero serious or critical accessibility violations under axe-core. Every interactive control must have an accessible name, a visible focus ring (2px primary with 2px offset), and a touch target of at least 44px by 44px. Every visual graph must have an accessible list twin.

## Core Requirements

- Semantic Markup: Use `<main>`, `<header>`, `<nav>`, `<article>`, `<button>`. Never use `<div onClick=...>` without role and keyboard listeners.
- Focus: `focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`.
- Contrast: Normal text &ge; 4.5:1, reader body text on surface &ge; 7:1, reader highlights &ge; 4.5:1.
- Live Regions: Announce background AI analysis and transcription with `aria-live="polite"`.
- Motion: Honor `prefers-reduced-motion: reduce` by zeroing transition durations.

## Examples

### Right

```tsx
// Accessible icon button with explicit label and touch target
<button
  type="button"
  aria-label="Add bookmark"
  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-control p-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
>
  <Icon name="bookmark" size={20} />
</button>

// Visual graph accompanied by list twin
<div>
  <CharacterNetworkGraph data={characters} />
  <div className="sr-only">
    <h3>Character Connections</h3>
    <ul>{characters.map(c => <li key={c.id}>{c.name}: {c.relationships}</li>)}</ul>
  </div>
</div>
```

### Wrong

```tsx
// Unlabeled button, missing focus ring, tiny touch target:
<button onClick={doAction} className="p-1">
  <Icon name="bookmark" size={16} />
</button>

// Div pretending to be a button:
<div onClick={doAction}>Click here</div>
```
