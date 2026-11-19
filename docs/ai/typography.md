# Playbook: Typography & Font Roles

## Rule

Load fonts exclusively via `next/font` in `src/styles/fonts/ui.ts` (Fraunces, Inter) and `src/styles/fonts/reader.ts` (Literata, Atkinson Hyperlegible Next, Noto Devanagari, Noto Arabic, JetBrains Mono). Never write custom `font-family` strings or use `@import` or `<link>` tags. Use `font-display` for headings/titles and `font-ui` for interface text.

## Reader Family Switching

Inside the reader, family is driven by `data-reader-font` (`literata`, `hyper`, `inter`). Language selectors (`:lang(hi)`, `:lang(ar)`, etc.) automatically override the font family to matching scripts.

## Examples

### Right

```tsx
// Using mapped font utilities
<h1 className="font-display text-2xl font-bold tracking-tight text-text">
  War and Peace
</h1>
<p className="font-ui text-sm text-muted">
  Read time: <span className="tabular font-medium">14h 22m</span>
</p>

// Reader text container
<article className="reader-container" data-reader-font="literata">
  <p>Call me Ishmael...</p>
</article>
```

### Wrong

```tsx
// Hand-written font family (Banned):
<h1 style={{ fontFamily: 'Georgia, serif' }}>Title</h1>

// CSS import of external font (Banned):
// @import url('https://fonts.googleapis.com/css2?family=Roboto');
```
