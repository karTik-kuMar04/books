# Playbook: Custom SVG Icon System

## Rule

Every icon in Folio lives in `src/components/icons/icons.tsx`. Never install, import, or copy SVG path data from third-party packages (`lucide-react`, `react-icons`, `@heroicons/*`, etc.). Render icons exclusively with `<Icon name="..." size={16 | 20 | 24} />`.

## Design Specification

- ViewBox: 24 by 24, drawn on a pixel grid with a 2px safe margin (live area 20 by 20).
- Stroke Style: `fill='none'`, `stroke='currentColor'`, stroke width 1.75 by default, round caps (`strokeLinecap='round'`), round joins (`strokeLinejoin='round'`). Corner radius 2 on rectangles (`rx='2'`).
- Fills: Allowed ONLY for small dots (radius 1.25 or less) and explicit filled variants (`bookmark-filled`, `star-filled`).
- Restrictions: Zero gradients, zero hex colors, zero opacity tricks. Maximum ~6 elements per icon. Optically centered.
- Accessibility: Decorative by default (`aria-hidden='true'`). When `title` is supplied, sets `role='img'` and renders `<title>`.

## Examples

### Right

```tsx
import { Icon } from '@/components/icons/icons';

// Standard decorative icon in UI
<button className="flex items-center gap-2 rounded-control p-2">
  <Icon name="bookmark" size={20} />
  <span>Bookmark</span>
</button>

// Accessible standalone icon button
<button aria-label="Search library">
  <Icon name="search" size={20} title="Search" />
</button>
```

### Wrong

```tsx
// Importing from external icon libraries (Strictly Banned by ESLint):
import { Bookmark } from 'lucide-react';
import { FaBook } from 'react-icons/fa';

// Inlined raw SVG path in components (Banned):
<svg viewBox="0 0 24 24">
  <path d="M12 2..." />
</svg>;
```
