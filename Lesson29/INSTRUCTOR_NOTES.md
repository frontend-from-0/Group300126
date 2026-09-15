# Instructor notes — Lesson 29 (Group300126)

**Cohort:** Group300126 (attendee `30012026@code2career.eu`)  
**Calendar (2026-09-15):** 29. Web Developer Eğitimi TR saat ile 20.30  
**Topic:** Understanding JSX and components (Props, state, events)  
**Student starter PR:** "Lesson 29 preparation" (`prep-lesson-29`) — `Lesson29/quotes.js` only  
**Historical source:** `frontend-from-0/Group200825` Lesson29  
- Starter: `16718f60a6da15f6e96a42497cb249ac2456219c` ("Starter files L29")  
- Completed: `99d4030bdec2f5eb5be67ee96fd676d673ba4838` ("Add Lesson 29 completed files")

**Calendar vs historical:** Topic matches. Historical L29 built a Next.js **random-quotes** app during class from a bare `quotes.js` data file. Folder/branch numbering is **Lesson29 / lesson 29** for this cohort. Metadata string in completed `layout.js` still says "130625" in the historical copy — optional live fix to "300126" / "Random Quotes" during class; not required for teaching.

**Exercises:** No related Lesson29 homework found in `200825-exercises` (folders stop before L29). Skip separate exercises PR.

---

## Teaching sequence (suggested ~90–120 min)

1. **Frame (5 min)** — Today we move from plain JS into **React UI building blocks**: JSX, components, props, state, and events. End goal: a small **Random Quotes** Next.js app.
2. **Scaffold the app (10–15 min)** — In `Lesson29/`, create Next.js app `random-quotes` (`create-next-app`). Move starter `quotes.js` → `src/quotes.js` (or keep `@/quotes` alias). Show `page.js` / `layout.js` / App Router briefly (tie to Lesson28 if they already saw Next).
3. **JSX walkthrough (10–15 min)** — Replace default page with a `<main>` + quote card using JSX. Emphasize: looks like HTML, is JS; `className`; expressions `{quote}`; one parent / fragment rules.
4. **Extract components + props (20–25 min)** — Build `Button` (variant, onClick, children) and typography `H3` (element, children). Discuss props as function arguments; `children` as nested content; prop-driven styling (`variant` switch).
5. **State + events (20–25 min)** — Add `'use client'`, `useState` for `quoteIndex`, wire `Button` `onClick` → `handleClick`. Show why state triggers re-render; destructure `{ quote, author }` from `initialQuotes[quoteIndex]`.
6. **Stretch / TODO (10–15 min)** — Historical code increments index only (`setQuoteIndex(quoteIndex + 1)`). Point at TODO: use `getRandomNumber` in `src/utils/helper-functions.js` so the next quote is **not** the same index; handle wrap-around / bounds.
7. **Recap + Q&A (5–10 min)** — Map vocabulary back to what they typed; leave empty `H6.js` as "you can add another typography component the same way."

---

## Core concepts

| Concept | What to stress |
|--------|----------------|
| **JSX** | Syntax sugar for `React.createElement`; embed JS with `{}`; use `className` not `class` |
| **Component** | Reusable function that returns UI; name capitalized (`Button`, `H3`) |
| **Props** | Inputs to a component (`variant`, `element`, `onClick`, `children`) — read-only from the child |
| **State** | Data owned by a component that can change over time (`useState`); updates schedule a re-render |
| **Events** | Browser interactions → handlers (`onClick={handleClick}`); pass functions as props |
| **Client components** | `'use client'` needed for hooks / interactivity in App Router |
| **Composition** | Parent (`Home`) owns state; children render UI / fire callbacks |

---

## Terminology to introduce / reinforce

| Term | Plain meaning |
|------|----------------|
| JSX | JavaScript XML — UI written in a HTML-like syntax inside JS |
| Component | Named function returning JSX |
| Props | Parameters passed into a component |
| `children` | Special prop: content between opening/closing tags |
| State | Mutable UI data managed with `useState` |
| Re-render | React calls the component again after state/props change |
| Event handler | Function run when user clicks/types/etc. |
| Controlled UI via state | What you see comes from state variables |
| Variant | Prop that switches styles/behavior (`primary` / `secondary`) |
| Path alias `@/` | Maps to `src/` via `jsconfig.json` |

---

## Questions to ask the room

1. Why is `Button` capitalized, and what happens if you write `<button>` vs `<Button>`?
2. If props are inputs, can a child change the parent's `quoteIndex` directly? How *should* it ask for a change?
3. What is the difference between a normal variable and a `useState` value after a click?
4. Why does `page.js` need `'use client'` once we use `useState`?
5. What does `children` let us do that a `label="Next Quote"` prop would also do — tradeoffs?
6. In `H3`, why pass `element='p'` instead of always rendering `<h3>`? (semantics / a11y / flexibility)
7. What breaks if `quoteIndex` goes past `initialQuotes.length - 1`? How would you fix it?
8. How would you use `getRandomNumber(0, initialQuotes.length - 1)` and still avoid the *same* quote?

---

## Demos (instructor live)

1. **create-next-app** in `Lesson29/random-quotes` (JS, App Router, Tailwind as in historical package.json).
2. **Move data** — `quotes.js` → `src/quotes.js`; import as `@/quotes`.
3. **JSX card** — static first quote hard-coded, then wire to `initialQuotes[0]`.
4. **Extract `Button`** — start inline `<button>`, lift to `src/components/Button.js` with `variant` + `onClick` + `children`.
5. **Extract `H3`** — switch on `element` (`p` / `span` / default `h3`).
6. **Add state** — `const [quoteIndex, setQuoteIndex] = useState(0)`; show React DevTools or console.log on render.
7. **Click handler** — increment; then discuss random + "not same as current" TODO.
8. **Optional:** sketch `H6` together (empty file in completed tree — intentional hook for students).

---

## Ordered code changes (historical 16718f6 → 99d4030)

1. Add full Next.js app scaffold under `Lesson29/random-quotes/` (config, `package.json`, public assets, `globals.css`, `layout.js`, default structure).
2. **Rename/move** `Lesson29/quotes.js` → `Lesson29/random-quotes/src/quotes.js` (content unchanged).
3. Implement `src/app/page.js` as client component: import quotes, `Button`, `H3`, `useState`; render quote card + Next Quote button.
4. Add `src/components/Button.js` — `variant` switch for Tailwind classes; forward `onClick`; render `children`.
5. Add `src/components/typography/H3.js` — polymorphic-ish heading via `element` prop.
6. Add empty `src/components/typography/H6.js` (placeholder).
7. Add `src/utils/helper-functions.js` with `getRandomNumber(min, max)` (for the TODO).
8. Set `layout.js` metadata title/description to Random Quotes app.

**Not in historical completed (leave as teaching TODO):** random index that never equals current; bounds-safe next quote; filling in `H6`.

---

## Expected final code (what “done” looks like in this PR)

- App runs with `npm install && npm run dev` inside `Lesson29/random-quotes`.
- Home page centers a card: quote text via `<H3 element="p">`, author line, primary `Button` “Next Quote”.
- Clicking advances `quoteIndex` (historical: simple `+ 1`).
- `Button` supports `primary` / `secondary` variants.
- Quotes data module unchanged list of `{ quote, author }` objects.

### Key snippets (for speaking, not to paste blindly)

**State + event (`page.js`):**
```js
const [quoteIndex, setQuoteIndex] = useState(0);
const { quote, author } = initialQuotes[quoteIndex];
function handleClick() {
  // TODO: random index ≠ current
  setQuoteIndex(quoteIndex + 1);
}
```

**Props (`Button.js`):** `variant`, `onClick`, `children` → styled `<button>`.

**Helper:** `getRandomNumber(min, max)` → `Math.floor(Math.random() * (max - min + 1)) + min`.

---

## Pitfalls & tips

- Forgetting `'use client'` → hooks/events error in Server Components.
- Using `class` instead of `className` in JSX.
- Mutating `quoteIndex` directly instead of `setQuoteIndex`.
- Index out of range when only incrementing (demo the bug, then fix).
- Passing `onClick={handleClick()}` (calls immediately) vs `onClick={handleClick}`.
- Lowercase component filenames/imports mismatch; keep `@/` imports consistent with `jsconfig`.
- Students may try to put `useState` in `layout.js` — keep interactivity in `page.js` / client children.
- Large `package-lock.json` is expected; don’t hand-edit it.
- Empty `H6.js` is not a mistake in the historical dump — use it as an exercise prompt.

---

## Instructor verification checklist

- [ ] Student PR merged or available: `Lesson29/quotes.js` only (no `random-quotes` solution on student branch).
- [ ] This instructor PR has completed `Lesson29/random-quotes/**` + these notes.
- [ ] Optional: `cd Lesson29/random-quotes && npm install && npm run build` (network may flake — note if skipped).
- [ ] Live path: scaffold → JSX → components/props → state/events → random TODO.
