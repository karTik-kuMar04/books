# Book Project — Full UI/UX Plan

Nov 19, 2026 · @kartik

## 1. The product in one page

The product is a private reader that also explains the book: upload a PDF, EPUB or TXT, start reading at once, and get a characters map or study tools on top of the same text.

**Three jobs, in this order of importance**

| Job        | What the user does                                                                                                      | Where it lives                 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Read       | Open a book, resume where they stopped, listen, bookmark, look up a word                                                | Reader                         |
| Understand | See who the characters are and how they connect; see the key ideas of a study book; ask questions and get cited answers | Characters, Concepts, Ask      |
| Revise     | Mark what matters, review notes, practise with generated cards                                                          | Marks, Study cards, Vocabulary |

**Two modes, chosen per book**

- **Story mode** (novels, storybooks): the Characters map, relationships with evidence, chapter summaries, spoiler-safe by chapter.
- **Study mode** (textbooks, notes, holy books): key points, Concepts map, Ask this book, study cards. Holy books use Study mode with a stricter label: meanings are shown as "explanations from the text, written by AI", never as the one true meaning.
- The app guesses the mode from the first chapters; the user can switch it in one tap, and a book can have both tabs turned on.

**Five rules that make every screen self-explaining**

1. Every insight links to the passage it came from (an "Evidence" link).
2. Reading never waits for analysis; insights appear as they finish.
3. Anything written by AI wears the same violet "AI" chip; anything taken straight from the text does not.
4. A book is one workspace with the same tabs everywhere: Read, Characters or Concepts, Ask, Marks, Cards.
5. Uploads are private to the user, and the UI says so where the upload happens.

## 2. First-pass plan (before review)

The straight translation of your feature list gives 14 pages; sections 3 and 4 find what this draft misses, and section 5 is the corrected result.

| #   | Page                 | First-draft features                                   |
| --- | -------------------- | ------------------------------------------------------ |
| 1   | Landing              | Pitch, feature list, sign-up button                    |
| 2   | Sign in / Sign up    | Email form, Google login                               |
| 3   | Library              | Grid of books, upload button, search box               |
| 4   | Upload               | Pick a file, wait for analysis, then open              |
| 5   | Book page            | Cover, details, chapter list, action buttons           |
| 6   | Reader               | Text, chapter navigation, font size, theme             |
| 7   | Read-aloud           | Play and pause, speed, voice                           |
| 8   | Characters graph     | Full graph, click a node for info                      |
| 9   | Study page           | Key info list, concept graph, question chat, Q&A cards |
| 10  | Highlights and notes | List per book                                          |
| 11  | Bookmarks            | List per book                                          |
| 12  | Word meaning         | Select a word, see a definition                        |
| 13  | Related books        | List on the book page                                  |
| 14  | Settings             | Account, theme, font                                   |

## 3. Smart-developer review

The developer pass makes the UI async-first (analysis takes minutes), merges pages that share data, and designs every failure path instead of leaving it to a toast.

| #   | Finding                                                 | Decision adopted                                                                                                                                                                                                           |
| --- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Analysis takes minutes, but the first draft waits on it | Reader opens as soon as text is extracted. Every AI feature has five visible states: queued, running, ready, failed, skipped. A Processing drawer streams progress.                                                        |
| 2   | Long books break a naive reader                         | Render by chapter chunks with virtual scrolling. A position is always (chapter, character offset), so bookmarks, highlights and Evidence links survive re-parsing and open the reader at the exact range.                  |
| 3   | A graph of 200+ characters is unreadable and slow       | Show the top 30 by importance, with a "show more" control. Use a canvas renderer (Cytoscape.js). One shared "Up to chapter N" slider keeps it spoiler-safe.                                                                |
| 4   | The backend arrives in phases, but the UI is built once | Build all screens against typed API contracts with a mock adapter per feature. Each feature has a flag, so the UI can show its no-AI tier (Ask returns passages only; relationships show "together" until AI labels them). |
| 5   | Pages that share data were separate                     | Highlights + Notes + Bookmarks become one Marks page. Read-aloud becomes a player, Word meaning a popover, Related books a section. Study splits into Concepts, Ask and Cards because they load different data.            |
| 6   | Graphs are not accessible by themselves                 | Every graph has a list twin with the same data, keyboard navigation, and an ARIA live region for processing updates.                                                                                                       |
| 7   | Theme flicker and hard-coded colours                    | All colours are CSS variables, set before first paint. Theme and reader surface are two independent attributes (see sections 9 and 10).                                                                                    |
| 8   | Two codebases for web and mobile is wasted effort       | One Next.js responsive app, container queries for panes, installable as a PWA with offline reading and file sharing into the app.                                                                                          |
| 9   | Upload failures are the common case                     | Designed states for: scanned PDF, DRM-protected EPUB, file too large, duplicate (same hash), unsupported language, per-feature retry.                                                                                      |
| 10  | The portfolio needs to show DevOps depth                | A desktop-only Admin page shows queue depth, failed jobs and cost per book.                                                                                                                                                |

## 4. User review

The user pass adds a no-signup sample book, plain-language names for every feature, and trust tools (Evidence links, AI chips, manual fixes) so people understand the purpose and believe the results.

| #   | What a user feels or fears                        | Decision adopted                                                                                                                                                                     |
| --- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | "What is this?" must be clear in 5 seconds        | The landing hero shows a real output (a characters map of a public-domain novel), not a feature list. A "Try a sample book" button opens the Demo page with no sign-up.              |
| 2   | Words like graph, RAG and embeddings mean nothing | Plain names everywhere: Characters map, Concepts map, Key points, Ask this book, Study cards, Marks, Meaning, Author's idea. Each page shows a one-line purpose under its title.     |
| 3   | "Is my book safe to upload?"                      | The upload dialog says "Only you can see this book. Delete it any time." with a link to what is stored.                                                                              |
| 4   | Waiting is the worst part                         | Read immediately; progress is named in real stages ("Splitting chapters", "Finding characters"). The user can leave and a notification dot appears when features are ready.          |
| 5   | Spoilers ruin stories                             | The Characters map defaults to "up to where you have read". Revealing more is a deliberate tap.                                                                                      |
| 6   | "Where was I?"                                    | Library starts with Continue reading. Position syncs across devices.                                                                                                                 |
| 7   | "Can I trust what the AI says?"                   | Every insight has Evidence (the passage), an AI chip, and a "Wrong?" button. Users can rename, merge or hide a character, and edit a relationship. Their edits win over re-analysis. |
| 8   | Empty pages feel broken                           | Each empty state says what the page will hold and the exact action that fills it (for example: "Select text while reading to highlight it").                                         |
| 9   | Reading must be comfortable for hours             | Font, size, spacing, width, a focus mode and night surfaces (section 10).                                                                                                            |
| 10  | Students want to take things out                  | Export Marks and Study cards as PDF, Markdown or CSV (importable into flashcard apps).                                                                                               |
| 11  | Dead ends after finishing a chapter               | End-of-chapter card offers: summary, "Author's idea", quiz this chapter, next chapter.                                                                                               |
| 12  | First visit is overwhelming                       | A skippable 3-step Welcome: what do you read, add a first book or the sample, pick a look.                                                                                           |
| 13  | Holy books need extra care                        | Study mode with neutral wording and an "AI explanation" label. A setting turns AI interpretation off entirely and keeps only the text, search and dictionary meanings.               |

## 5. Final page inventory

The final site has 19 pages, 8 overlays and 6 system states. Every page opens with a one-line purpose under its title, and every empty state names the action that fills it.

**Public pages (5)**

| #   | Page (route)     | Purpose line shown to the user                                     | Key features                                                                                                                                                                                                                      |
| --- | ---------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1  | Landing (`/`)    | "Upload a book, read it, and see who is in it or what it teaches." | Hero with a live Characters map and a Study view you can flip between. Three steps (Upload, Read, Understand). Features grouped by Story and Study. Privacy promise. Supported formats. FAQ. Buttons: Try a sample book, Sign up. |
| P2  | Demo (`/demo`)   | "Try it on a public-domain book. No account needed."               | Pre-analysed sample story and sample study text. Real reader, map and Ask (limited). A gentle sign-up card after a few actions, never a wall.                                                                                     |
| P3  | Help (`/help`)   | "Answers, and what each word means."                               | FAQ, supported files, how Story and Study modes work, a glossary of the 8 plain terms, why scanned PDFs fail, contact.                                                                                                            |
| P4  | Legal (`/legal`) | "Your books stay yours."                                           | Privacy, Terms, retention, copyright notice, in tabs.                                                                                                                                                                             |
| P5  | Auth (`/auth`)   | "Sign in to keep your library."                                    | Sign in / Sign up tabs, email link or password, Google, forgot and reset states. Benefits list beside the form on big screens.                                                                                                    |

**App pages (14)**

| #   | Page (route)                        | Purpose line shown to the user               | Key features                                                                                                                                                                                                                                                           |
| --- | ----------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | Welcome (`/welcome`)                | "Set up in three steps."                     | What do you read (stories, study, both), add a first book or the sample, pick a look (theme and font). Skippable. Sets defaults.                                                                                                                                       |
| A2  | Library (`/library`)                | "Your books."                                | Continue reading row, grid or list, shelves (Reading, Want to read, Finished, custom), filters by mode and status, sort, multi-select, upload button, status chip per book. Empty state offers the sample book.                                                        |
| A3  | Book hub (`/book/:id`)              | "Everything about this book."                | Cover, author, mode switch, progress. Chapter list with one-line summaries and "Author's idea" per chapter. Feature status chips. Quick actions: Read, Characters or Concepts, Ask. Related books. Export, delete.                                                     |
| A4  | Reader (`/book/:id/read`)           | "Read, listen, and look things up."          | Text, chapter list, progress, search in book, selection menu (Highlight, Note, Meaning, Ask, Copy), bookmark, read-aloud, reader settings, focus mode. End-of-chapter card. A chip row shows Characters in this chapter (Story) or Key points of this chapter (Study). |
| A5  | Characters (`/book/:id/characters`) | "Who is in this story and how they connect." | Map plus a list twin. Filter by role and importance. "Up to chapter N" slider. Legend for relationship types. Profile panel with role, traits, first appearance, relationships. Evidence on every link. Rename, merge, hide. Export as image.                          |
| A6  | Concepts (`/book/:id/concepts`)     | "The key ideas and how they relate."         | Key points grouped by chapter, Concepts map, glossary, mark as important, filter by chapter, "Make study cards from this".                                                                                                                                             |
| A7  | Ask (`/book/:id/ask`)               | "Ask a question. Answers point to the page." | Chat with citation chips that open the Evidence viewer. Suggested questions per chapter. Scope: whole book, this chapter, my marks. Toggle: passages only or written answer. Save an answer to Marks.                                                                  |
| A8  | Study cards (`/book/:id/cards`)     | "Practise what you marked."                  | Decks by chapter, flashcards, quiz, review session with progress, add or edit your own cards, export CSV.                                                                                                                                                              |
| A9  | Marks (`/marks`, `/book/:id/marks`) | "Everything you saved."                      | Tabs: Bookmarks, Highlights, Notes. Filter by colour, chapter, book. Tap to jump to the passage. Edit, export. Colour meanings shown at the top.                                                                                                                       |
| A10 | Vocabulary (`/vocabulary`)          | "Words you looked up."                       | List with the meaning in context and the source passage, mastery state, turn into cards, search.                                                                                                                                                                       |
| A11 | Discover (`/discover`)              | "Find what to read next."                    | Related to books in your library, plus public-domain browsing from Open Library. Filter by mode and genre. Add public-domain books in one tap.                                                                                                                         |
| A12 | Search (`/search`)                  | "Search your books and marks."               | Scope tabs: Books, In this book, Marks, Vocabulary. Passage snippets, recent searches. Same engine as the command palette.                                                                                                                                             |
| A13 | Settings (`/settings/:section`)     | "Make it yours."                             | Sections: Profile, Appearance and reading, Read-aloud, AI and privacy, Data and export, Account and security, Usage and limits.                                                                                                                                        |
| A14 | Admin jobs (`/admin/jobs`)          | "Pipeline health."                           | Queue depth, job list, retry, failure reasons, cost per book, duration per stage. Role-gated, desktop only.                                                                                                                                                            |

**Overlays (8)**

| #   | Overlay                | Opens from                      | What it does                                                                                      |
| --- | ---------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------- |
| O1  | Upload and analysis    | Library, Welcome, share target  | Drop zone, file checks, detected mode with override, named progress stages, "you can leave" note. |
| O2  | Processing drawer      | Bell icon, any book             | Live status of every feature of every book, with retry.                                           |
| O3  | Reader settings ("Aa") | Reader toolbar                  | Font, size, spacing, width, alignment, reader surface, focus mode.                                |
| O4  | Meaning                | Selecting a word                | Meaning in this context, other senses, source, save to Vocabulary.                                |
| O5  | Read-aloud player      | Reader toolbar                  | Play, speed, voice, sentence highlight, sleep timer, jump by paragraph.                           |
| O6  | Profile panel          | Character or concept tap        | Details, relationships, Evidence, Wrong? button, edit.                                            |
| O7  | Evidence viewer        | Any "Evidence" or citation chip | The cited passage in context with a button to open it in the Reader.                              |
| O8  | Command palette        | Ctrl/Cmd + K, search icon       | Jump to book, chapter, character, mark or setting.                                                |

**System states (6)**

Not found, Something went wrong, Offline (with downloaded books still readable), Unsupported file (scanned PDF, DRM-protected EPUB, too large, with what to do next), Session expired, Limit reached (storage or AI usage, with what resets when).

## 6. Sorted by device

Most of the product is shared; web/tablet adds workspace power tools, and mobile adds touch and one-hand reading ergonomics. "Web/tablet" means 768 px and wider; "mobile" means narrower (breakpoints are in section 8).

**Both (one codebase, same behaviour)**

- Auth, Welcome, Library, Book hub, Discover, Search, Settings, Help, Legal
- Reader core: text, chapters, progress, bookmarks, highlights, notes, Meaning, read-aloud, reader settings, focus mode
- Characters (map plus list twin), Concepts, Ask, Study cards, Marks, Vocabulary
- Evidence viewer, Processing drawer, all system states
- Light and dark themes, reader surfaces, offline reading, export

**Web/tablet only, or web-first**

- Three-pane reader workspace: chapters, text, and a side panel (Ask, Characters here, Marks, Meaning)
- Full-canvas Characters map: drag, pin, lasso-select, layout switch, up to 100 nodes
- Keyboard shortcuts (next chapter, bookmark, highlight, search, help) and the command palette
- Hover previews: a character name in the text shows a mini card; a map link shows its Evidence snippet
- Drag-and-drop upload, including dropping files anywhere on the Library
- Multi-select bulk actions in the Library (shelve, export, delete)
- Evidence viewer docked beside Ask answers instead of covering them
- Resizable, collapsible panes with remembered widths
- Print-styled export of Marks and Study cards
- Admin jobs page
- Interactive hero demo on the Landing page

**Mobile only, or mobile-first**

- Bottom tab bar, and inside a book a bottom segmented bar (Read, Characters or Concepts, Ask, Marks, Cards)
- Bottom sheets for Meaning, profile panel, Evidence, reader settings and Processing
- Reader gestures: tap zones, long-press to select, auto-hiding toolbar, double-tap for focus mode
- Characters shows a list first and a one-character neighbourhood map (the selected character and direct links, at most 12 nodes) instead of the full map
- Read-aloud on the lock screen through media controls, with a more prominent sleep timer
- Install as an app, share a file into the app from the phone's file manager, download books for offline reading
- Haptic tick on bookmark and highlight where supported
- Pull to refresh in the Library to check processing; a docked mini bar for Continue reading
- Primary actions sit in the bottom 40% of the screen; nothing essential is top-only
- Landing page uses short loops and screenshots with a sticky Sign up button

**Tablet note.** Tablets get the web layout with two panes (text plus one side panel), keep 44 px touch targets, and also use the mobile gestures.

## 7. Big-screen merges and small-screen splits

The rule: merge on big screens when the user needs two things at once to decide (a map and a profile, an answer and its evidence); split on small screens when each part needs the full width to be usable.

| Area                          | Big screen (merged on one page)                                                                                                 | Small screen (separate screens)                                                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Library + Book hub + Discover | Left shelves, centre grid, right preview panel with the hub summary and a Read button. Discover is a tab in the Library header. | Library grid. Tap a book to open the Book hub as its own screen. Discover is its own bottom tab.                                                                  |
| Reader workspace              | Chapters, text and a side panel with tabs for Ask, Characters here or Key points, Marks and Meaning, all on the Reader page.    | Full-screen text. Chapters slide in from the left. Ask, Characters, Marks are separate tabs in the book's bottom bar. Meaning and Evidence open as bottom sheets. |
| Characters                    | Map canvas, filter and list rail on the left, profile panel on the right, all at once.                                          | Two tabs: List and Neighbourhood map. Tap a character for a full-height profile sheet. Filters and the chapter slider live in a sheet.                            |
| Concepts                      | Key points list on the left, Concepts map on the right, glossary as a third tab.                                                | Three tabs: Key points, Map, Glossary.                                                                                                                            |
| Ask                           | Chat in the centre with the Evidence viewer docked on the right.                                                                | Chat full screen. A citation opens a bottom sheet.                                                                                                                |
| Study cards                   | Deck list on the left, the review session in the centre.                                                                        | Deck list screen, then the session full screen.                                                                                                                   |
| Marks                         | Filter rail, list, and a passage preview on the right.                                                                          | Tabs for Bookmarks, Highlights, Notes. Filters in a sheet. Tap to jump into the Reader.                                                                           |
| Vocabulary                    | List with a detail panel beside it.                                                                                             | List; detail as a sheet.                                                                                                                                          |
| Search                        | Command palette for quick jumps, plus the full Search page.                                                                     | Search is a bottom tab with full-screen results.                                                                                                                  |
| Settings                      | Section list on the left, section content on the right.                                                                         | Section list screen, then one screen per section.                                                                                                                 |
| Upload and analysis           | Modal dialog with a drop zone and live stages.                                                                                  | Full-screen sheet with a file picker and live stages.                                                                                                             |
| Processing                    | Right-side drawer.                                                                                                              | Banner under the header that opens a bottom sheet.                                                                                                                |
| Auth and Landing              | Split layout with an interactive demo beside the form or hero.                                                                  | Form only, and stacked sections with sticky Sign up.                                                                                                              |
| Admin jobs                    | Single dashboard page.                                                                                                          | Not offered; shows "open on a larger screen".                                                                                                                     |

## 8. Navigation and layout system

Three layouts from one codebase: mobile under 768 px, tablet and laptop from 768 to 1279 px with up to two panes, and wide screens from 1280 px with three.

| Layout            | Width          | Panes   | Navigation                                                                                                                                                                 |
| ----------------- | -------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mobile            | under 768 px   | 1       | Bottom tab bar with 5 items: Library, Discover, Search, Marks, Me (Vocabulary, Settings, Help, Processing). Inside a book the bottom bar becomes the book's segmented bar. |
| Tablet and laptop | 768 to 1279 px | up to 2 | Icon rail on the left, content, and one side panel the user toggles.                                                                                                       |
| Wide              | 1280 px and up | up to 3 | Labelled sidebar on the left (Library with a Discover tab, Search, Marks, Vocabulary, Settings), content in the centre, panel on the right.                                |

**Rules that apply everywhere**

- Routes are identical on every device, so a shared link always opens correctly. On wide screens, `/book/:id/ask` and `/book/:id/marks` open the Reader with that side panel already showing; on mobile they are full screens.
- A book is a workspace with a fixed tab order: Read, Characters (Story) or Concepts (Study), Ask, Marks, Cards. Tapping the book title opens its Book hub.
- The top bar holds the logo, search (the command palette on wide screens), the Processing bell, a theme toggle and the avatar.
- The Read-aloud player stays docked on every screen until the user closes it.
- Back always returns to where the user came from; the Reader's back goes to the Book hub or the Library, never to the previous chapter.
- The text column never exceeds about 70 characters wide, whatever the screen.
- Touch targets are at least 44 px; every control shows a visible focus ring.
- Pane widths and the open side panel are remembered per book.

&#91;embedded content: site map · 19 pages in 3 groups\]

The 19 pages are 5 public pages, 8 app-shell pages and the 6 pages of a book workspace; Marks for one book reuses the Marks page, so it is counted once.

## 9. Themes: Stone (light) and Night (dark)

Two themes share one structure: a calm teal primary does most of the coloured work, and three softer-but-lively accents (amber, violet, rose) are each reserved for one meaning.

**Palette**

| Role                    | Used for                                                               | Stone (light)         | Night (dark)          |
| ----------------------- | ---------------------------------------------------------------------- | --------------------- | --------------------- |
| Page                    | App background                                                         | `#ECE8DF`             | `#151A1D`             |
| Card                    | Panels, tiles                                                          | `#F4F1EA`             | `#1D2327`             |
| Raised                  | Menus, dialogs, sheets                                                 | `#F7F4ED`             | `#262D32`             |
| Border                  | Dividers, outlines                                                     | `#D2CCBF`             | `#353E44`             |
| Text                    | Body and headings                                                      | `#22282C`             | `#E7E4DC`             |
| Muted text              | Captions, hints                                                        | `#5A615E`             | `#A5ABAA`             |
| **Primary** (calm teal) | Buttons, links, focus ring, progress, Study mode                       | `#2B6B6F`             | `#6FB7B1`             |
| Primary soft            | Selected rows, chips                                                   | `#D1E2DF`             | `#213A3A`             |
| **Secondary** (amber)   | Your marks: bookmarks, highlights, "important"                         | `#E3A42B`             | `#EDB04A`             |
| Secondary soft / ink    | Tint behind marks / text on it                                         | `#F2DDAA` / `#6E4600` | `#3A2F17` / `#F3C976` |
| **Tertiary** (violet)   | Anything written by AI: the AI chip, Ask answers, suggested highlights | `#614FC6`             | `#A194F2`             |
| Tertiary soft / ink     | AI chip background / text                                              | `#DCD6F2` / `#4B3AA8` | `#2D2A4A` / `#C4BAFA` |
| **Quaternary** (rose)   | Story mode, characters, relationship lines                             | `#C25B80`             | `#E58AA9`             |
| Quaternary soft / ink   | Story chip background / text                                           | `#F1D5DE` / `#8E2F55` | `#40242F` / `#F2B0C6` |
| Success                 | Done, ready                                                            | `#2A7448`             | `#6CC48A`             |
| Error                   | Failed, destructive                                                    | `#B93C36`             | `#F08A82`             |

**Contrast checks** (WCAG 2.x ratios computed from these exact values)

| Pair                        | Stone | Night | Needed |
| --------------------------- | ----- | ----- | ------ |
| Body text on page           | 12.2  | 13.8  | 4.5    |
| Muted text on card          | 5.6   | 6.8   | 4.5    |
| Primary link on page        | 5.0   | 7.6   | 4.5    |
| Button label on primary     | 5.4   | 7.3   | 4.5    |
| Label on secondary fill     | 6.8   | 9.4   | 4.5    |
| Violet text on page         | 5.0   | 6.7   | 4.5    |
| Violet ink on its soft tint | 6.1   | 7.6   | 4.5    |
| Rose ink on its soft tint   | 5.7   | 7.8   | 4.5    |
| Error on page               | 4.6   | 7.2   | 4.5    |
| Success on page             | 4.7   | 8.3   | 4.5    |
| Amber icon or line on card  | 4.2   | 8.3   | 3.0    |
| Rose icon or line on card   | 3.7   | 6.5   | 3.0    |

**Why it will look neither too calm nor too vibrant**

- Teal is deliberately muted (Stone: 44% saturation, 30% lightness), and neutrals plus teal cover about 90% of the screen. The accents are lively (amber 76% saturation, violet 52%, rose 45% in Stone) but appear only on small marks, chips and graph lines.
- Stone is a solid warm stone, not white: the page is at lightness 92 on a 100 scale, and the brightest surface (menus and dialogs) is 96. No pure white appears anywhere.
- Night is a blue-grey ink, not black: the page is lightness 9 and cards step up to 13 and 18, so depth shows without shadows.
- Strong amber on Stone would fall below 3:1 as an icon, so Stone uses a darker amber (`#A86400`, 4.2:1) for icons and lines, and the bright amber only as a fill with dark text.
- Solid violet and rose are for icons, lines and dots. Wherever text sits on them, the soft tint plus its ink is used instead.

**Colour rules**

1. Violet means "AI wrote this", and nothing else uses it.
2. Amber means "you marked this". User highlights come in three meanings: Important (amber), Definition (teal), Question (rose).
3. Colour never carries meaning alone: every colour is paired with an icon, a label, or a line style.
4. Theme choice is System, Light or Dark. It follows the device by default, is saved to the account, and is applied before first paint so nothing flashes.

## 10. Reading mode: available in both themes

Decision: reading mode works in Stone and in Night. It is a layer inside the Reader, separate from the app theme, with its own surface choices for each theme.

Why both: the people who need comfort most are the ones reading at night in the dark theme, and limiting reading mode to light would force them to choose between a dark app and a comfortable page.

Reading mode is two independent things:

1. **Reader surface**: the colours behind the text, chosen in the Aa panel.
2. **Focus mode**: hides the toolbar and side panels, leaves a thin progress line, and centres one text column. A tap or a pointer move brings the controls back. It works with every surface.

**Reader surfaces**

| Surface         | Belongs to      | Page      | Text      | Contrast | Best for                      |
| --------------- | --------------- | --------- | --------- | -------- | ----------------------------- |
| Paper (default) | Stone           | `#F4F1EA` | `#22282C` | 13.2     | Daytime, most books           |
| Sepia           | Stone           | `#EBDFC6` | `#3A3025` | 9.8      | Long sessions, softer light   |
| Dusk (default)  | Night           | `#1D2327` | `#D9D5CB` | 10.8     | Evening, same feel as the app |
| Ember           | Night           | `#1B1815` | `#D2C8B6` | 10.7     | Late night, less blue light   |
| Pure black      | Night, optional | `#000000` | `#C4C8C6` | 12.4     | OLED phones, battery saving   |

Body text on every surface sits between 9.8 and 13.2 to 1, well above the 7 to 1 reading target, and no surface goes above 13.5 so it stays free of glare.

**How it behaves**

- By default the Reader matches the app theme: Paper in Stone, Dusk in Night. Changing the theme changes the surface with it.
- A "Match app theme" switch in the Aa panel turns this off, so someone can keep a Paper page inside the dark app, or the reverse.
- An "Auto" option follows the device or a sunset-to-sunrise schedule and moves between Paper and Ember or Dusk.
- Highlights, bookmarks and notes use tints tuned per surface (section 11), so a mark is as readable on Ember as on Paper.
- In focus mode, AI chips, the characters chip row and suggested highlights fold into a small margin dot; the selection menu still works.
- Reading mode applies only in the Reader. Every other page keeps the app theme.

## 11. Design system

The design system is a small set of tokens plus reusable components, all themed through CSS variables so Stone, Night and the reader surfaces need no per-component colour code.

**Type, space and shape**

| Token         | Value                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| UI font       | Inter                                                                                                                                                  |
| Reading fonts | Literata (default, serif), Inter, Atkinson Hyperlegible (high legibility). All are open-licence.                                                       |
| UI scale (px) | 12 caption, 14 small, 16 body, 20, 24, 30, 38 headings. Landing hero 48 on wide screens, 36 on mobile.                                                 |
| Reading text  | Default 18 px, range 14 to 28. Line height 1.65 (range 1.4 to 2.0). Column about 66 characters (range 55 to 75).                                       |
| Spacing       | 4 px base: 4, 8, 12, 16, 24, 32, 48, 64                                                                                                                |
| Corner radius | 8 controls, 12 cards, 16 dialogs and sheets, full round for chips                                                                                      |
| Depth         | Stone: 1 px borders, soft shadow on raised layers only. Night: borders and lighter surfaces, no shadows.                                               |
| Motion        | 120 ms for hover and press, 200 ms for panels and sheets, 300 ms for graph layout. With reduced motion on: fades only, no sliding or layout animation. |

**Highlight tints per reader surface** (text contrast on the tint)

| Surface | Important (amber) | Definition (teal) | Question (rose) | Lowest contrast |
| ------- | ----------------- | ----------------- | --------------- | --------------- |
| Paper   | `#F0D58A`         | `#BFDDD8`         | `#EBC4D1`       | 9.5             |
| Sepia   | `#E8C877`         | `#B5D0C4`         | `#E3B9C0`       | 7.3             |
| Dusk    | `#5A4519`         | `#1F4A48`         | `#5A2E40`       | 6.2             |
| Ember   | `#5A4219`         | `#27453F`         | `#573035`       | 5.7             |

Every highlight also carries a small icon in the margin (star, book, question mark), so meaning never depends on colour.

**Graph encoding**

| Element                               | Encoding                                                                                     |
| ------------------------------------- | -------------------------------------------------------------------------------------------- |
| Relationship: family                  | Teal, solid line                                                                             |
| Relationship: friends and allies      | Amber, solid line                                                                            |
| Relationship: romance                 | Rose, solid line                                                                             |
| Relationship: rivals and enemies      | Red, dashed line                                                                             |
| "Appear together" (no type known yet) | Grey, dotted line. This is what the no-AI tier shows.                                        |
| Line thickness                        | How often the two appear together                                                            |
| Node size                             | Mention count                                                                                |
| Node outline                          | Main character: 2 px primary. Supporting: 1 px border.                                       |
| Selection                             | Primary focus ring (amber is reserved for the user's own marks)                              |
| Provenance                            | A violet dot on the line when AI labelled the relationship; a pencil when the user edited it |

The Concepts map uses the same rules: soft teal nodes, arrows for "leads to" or "prerequisite of", a violet dot when AI proposed the link.

**Status chip (used on every feature of every book)**

| State   | Look                                                                |
| ------- | ------------------------------------------------------------------- |
| Queued  | Muted clock icon and "Waiting"                                      |
| Running | Primary progress ring, the named stage, and a percentage when known |
| Ready   | Success check                                                       |
| Failed  | Error icon, the reason in plain words, and a Retry button           |
| Skipped | Muted dash and why (for example "AI features are off")              |

**Core components**

Button, icon button, input, select, tabs, segmented control, chips (mode, AI, status), card, book card, dialog, bottom sheet, side drawer, popover, tooltip, toast, menu, command palette, slider, progress and stage progress, empty state, skeleton, chapter list, reader text, selection menu, audio player, graph canvas with its list twin.

**Accessibility**

- WCAG 2.2 AA: every text pair in section 9 passes. Focus ring is 2 px primary with a 2 px offset. Touch targets are at least 44 px.
- Each graph has a list twin with the same data and full keyboard navigation. Processing changes are announced through a live region.
- Text size follows the device setting; the Reader adds its own scale. A book's language is set on its pages so screen readers and read-aloud use the right voice.
- Reduced motion, high-contrast preference and forced-colours mode are respected.

**Tech choices** (opinionated)

- Next.js App Router with Tailwind driven by CSS variables; Radix primitives through shadcn/ui for accessible dialogs, sheets and menus.
- Cytoscape.js with the fcose layout for both maps; TanStack Query for server data; Zustand for reader and panel state.
- Web Speech API for read-aloud; a PWA service worker for offline reading and file sharing into the app.

## 12. Build order for the whole UI, and open decisions

Build all 19 pages, 8 overlays and 6 system states in one pass, in 9 layers, against typed mock data; then switch each feature to the real API as the backend phases from the feature spreadsheet ship.

**Build layers (each layer only needs the ones above it)**

| Layer                 | What gets built                                                                                                                                                                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0. Foundations        | Tokens for Stone, Night and the reader surfaces; no-flash theme switch; the three layouts and navigation; core components; status chip and empty-state pattern; typed API contracts, a mock adapter and a flag per feature; sample data (one analysed novel, one analysed study text). |
| 1. Public and auth    | Landing, Demo, Help, Legal, Auth, Welcome                                                                                                                                                                                                                                              |
| 2. Library and upload | Library, Upload overlay, Processing drawer, Book hub, all 6 system states                                                                                                                                                                                                              |
| 3. Reader             | Reader, Aa panel, focus mode, selection menu, Meaning, bookmarks, Read-aloud player, end-of-chapter card                                                                                                                                                                               |
| 4. Story mode         | Characters (map, list twin, profile panel, Evidence viewer, chapter slider, rename, merge, hide)                                                                                                                                                                                       |
| 5. Study mode         | Concepts, Ask, Study cards                                                                                                                                                                                                                                                             |
| 6. Cross-cutting      | Marks, Vocabulary, Search with the command palette, Discover                                                                                                                                                                                                                           |
| 7. Settings and data  | Every settings section, export, delete, usage and limits                                                                                                                                                                                                                               |
| 8. Ops and polish     | Admin jobs, offline reading and install, accessibility pass, performance pass (virtual reader, graph node cap), visual check at 3 widths, 2 themes and 4 reader surfaces                                                                                                               |

**When each UI part goes live (backend phases from the feature spreadsheet)**

| Backend phase                                                         | UI that switches from mock to real                              |
| --------------------------------------------------------------------- | --------------------------------------------------------------- |
| 1. EPUB and TXT upload, chapters, reader, bookmarks, read-aloud       | Layers 1 to 3 and the Library                                   |
| 2. Embeddings, Q&A with citations, highlights                         | Ask, Evidence viewer, semantic Search, Marks                    |
| 3. Character graph                                                    | Characters                                                      |
| 4. Study concept graph, key info, cards, word meanings, author intent | Concepts, Study cards, Meaning, Vocabulary, "Author's idea"     |
| 5. PDF support, related books, server-side voices                     | PDF upload, Discover and related books, extra read-aloud voices |

While a feature is still on mock data, its page shows a small "Sample data" ribbon, so nobody mistakes a demo result for their own book.

**Open decisions** (each has a default, so the build does not wait)

- **Product name and logo.** Default: a working name, swapped in one place later.
- **Sign-in methods.** Default: email link plus Google.
- **Sample books.** Default: one public-domain novel with many relationships for Story mode, and one public-domain textbook chapter for Study mode.
- **Scripts and languages.** Holy books and study books are often in non-Latin scripts. Default: English interface; the Reader supports Devanagari and Arabic script with Noto font fallbacks and right-to-left layout.
- **Limits and plans.** Default: the Usage page ships with placeholder limits (file size, books, AI questions per day) that you set later.
