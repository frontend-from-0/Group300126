# Lesson 31 — Different ways of styling a React application (Instructor Notes)

**Topic:** React styling approaches  
**Cohort:** Group300126 (Web Developer)  
**App baseline:** this group's Lesson30 `quotes-app` (continued into Lesson31)

## Goals

- Survey the main ways to style React apps and when each fits.
- Walk the `example/` demos in a clear order (simple → scoped → CSS-in-JS → utilities).
- Apply a practical Tailwind v4 + shadcn polish to the existing `quotes-app` Next.js app (builds on Lesson 30 Context).

## Teaching sequence — `example/` demos

Demo under `Lesson31/example/src/examples/` (see also `Styling.md`):

1. **Inline** — `InlineCssExample/` — `style={{ }}` objects, camelCase props; fine for one-offs, poor for scale.
2. **CSS stylesheet** — `CssStylesheetExample/` — import `.css`; global class names (collision risk).
3. **CSS Modules** — `CssModulesExample/` — `*.module.css`; locally scoped classes.
4. **SCSS / Sass** — `ScssExample/` — nesting, variables; needs `sass` (`npm install sass`).
5. **styled-components** — `StyledComponentsExample/` — CSS-in-JS tagged templates; install `styled-components` (theme wiring in `src/theme.js`).
6. **Tailwind** — `TailwindExample/` — utility classes in JSX; config already present for CRA example.

Optional mention from `Styling.md`: Headless UI + Phosphor icons with Tailwind.

## During-class changes — `quotes-app`

Starter continues Lesson30: simple `src/components/Button.jsx`, `QuoteText` / `Subtitle`, Context providers, `/user/quotes/liked`. Completed tree shows the classroom end state:

1. Add shadcn / UI deps (`shadcn`, `class-variance-authority`, `clsx`, `tailwind-merge`, `radix-ui`, `tw-animate-css`, `@phosphor-icons/react`).
2. Expand `src/app/globals.css` with shadcn theme tokens (`@import "shadcn/tailwind.css"`, CSS variables / `@theme inline`).
3. Replace hand-rolled button with shadcn `src/components/ui/button.jsx` + `src/lib/utils.js` (`cn` helper).
4. Add typography helpers: `src/components/ui/typography/H1.jsx`, `Small.jsx`.
5. Update `page.jsx` / `layout.js` / liked page to use the new Button, H1, Small, and Phosphor heart icons; clean up layout wrappers.
6. `components.json` appears once shadcn is initialized.

## Theming best practices — Tailwind v4 + shadcn/ui

Teach this while editing `globals.css` (and when students ask “where do colors live?”):

1. **CSS variables, not `tailwind.config` colors** — Tailwind v4 is CSS-first. shadcn puts semantic tokens in `globals.css`. Leave `components.json` → `tailwind.config` empty; do not teach adding a `theme.extend.colors` object from old v3 tutorials.

2. **Two layers, clear roles**
   - **`:root` / `.dark` (or `prefers-color-scheme`)** — define the actual values (`--primary`, `--background`, …), ideally in **OKLCH**.
   - **`@theme inline { … }`** — map those values into Tailwind’s namespace (`--color-primary: var(--primary)`). That is what creates utilities like `bg-primary` / `text-muted-foreground`.

3. **Use `@theme inline` when mapping `var(...)`** — the `inline` option makes utilities resolve to the referenced variable at use-time. Plain `@theme` with nested `var()` can surprise you. Prefer `--color-*: var(--*)` under `@theme inline`.

4. **Change the token, not the component** — components should use semantic classes (`bg-primary`, `text-destructive`). Recolor the app by editing `--primary` (etc.) once; avoid hardcoding zinc/fuchsia hex classes in UI primitives.

5. **Keep surface / foreground pairs** — every surface needs a matching `-foreground` (`primary` / `primary-foreground`, `muted` / `muted-foreground`). That keeps contrast correct when the theme flips.

6. **Add a custom color in three steps** — (1) define `--warning` + `--warning-foreground` in `:root` (and dark), (2) register `--color-warning: var(--warning)` under `@theme inline`, (3) use `bg-warning` / `text-warning-foreground` in JSX. Never invent a parallel theme file unless you still import it into the same global CSS pipeline.

7. **One radius knob** — `--radius` drives `rounded-*` scaling for shadcn components; tweak that instead of per-component radii.

8. **Fonts via CSS variables** — wire `next/font` to variables (e.g. `--font-sans`) and map them in `@theme inline` so `font-sans` / heading utilities stay theme-aware.

Docs to point at: [shadcn theming](https://ui.shadcn.com/docs/theming), [shadcn + Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4).

## Pitfalls

- **Inline vs className:** students mix string CSS and JS objects; remind camelCase (`backgroundColor`) for inline only.
- **CSS Modules:** forget `.module.css` suffix → styles become global again.
- **SCSS:** missing `sass` install → import fails.
- **styled-components + Next:** needs client components / SSR caveats; keep demos in the CRA `example/` app to avoid App Router friction.
- **Tailwind class typos:** silent no-op; use IntelliSense / compare with `TailwindExample`.
- **shadcn path aliases:** `jsconfig` `@/*` must match where `components/ui` lands.
- **v3 theme tutorials:** students paste `tailwind.config.js` color maps; redirect them to CSS variables + `@theme inline`.
- **Broken `@theme` mapping:** forgetting `--color-*` aliases means `bg-primary` does nothing even though `:root { --primary: … }` looks fine.
- Keep this instructor PR out of the student-facing `prep-lesson-31` branch until after class.

## Starter vs completed

- **Student starter PR:** `Styling.md` + `example/` demos + Lesson30-based `quotes-app` with simple button/typography.
- **This PR:** completed shadcn/Tailwind `quotes-app` + small example tweaks + these notes.
