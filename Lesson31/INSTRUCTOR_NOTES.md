# Lesson 31 — Different ways of styling a React application (Instructor Notes)

**Topic:** React styling approaches  
**Cohort:** Group300126 (Web Developer)  
**Historical source:** `frontend-from-0/Group021125` Lesson32 starter (`91f11e1`) + completed (`c16497a`)

## Goals

- Survey the main ways to style React apps and when each fits.
- Walk the `example/` demos in a clear order (simple → scoped → CSS-in-JS → utilities).
- Apply a practical Tailwind + shadcn polish to the existing `random-quotes` Next.js app (builds on Lesson 30 Context).

## Teaching sequence — `example/` demos

Demo under `Lesson31/example/src/examples/` (see also `Styling.md`):

1. **Inline** — `InlineCssExample/` — `style={{ }}` objects, camelCase props; fine for one-offs, poor for scale.
2. **CSS stylesheet** — `CssStylesheetExample/` — import `.css`; global class names (collision risk).
3. **CSS Modules** — `CssModulesExample/` — `*.module.css`; locally scoped classes.
4. **SCSS / Sass** — `ScssExample/` — nesting, variables; needs `sass` (`npm install sass`).
5. **styled-components** — `StyledComponentsExample/` — CSS-in-JS tagged templates; install `styled-components` (theme wiring in `src/theme.js`).
6. **Tailwind** — `TailwindExample/` — utility classes in JSX; config already present for CRA example.

Optional mention from `Styling.md`: Headless UI + Phosphor icons with Tailwind.

## During-class changes — `random-quotes`

Starter ships a simple custom `src/components/button.js` and light Tailwind layout. Completed tree shows the classroom end state:

1. Add shadcn / UI deps (`shadcn`, `class-variance-authority`, `clsx`, `tailwind-merge`, `radix-ui`, `tw-animate-css`, `@phosphor-icons/react`).
2. Expand `src/app/globals.css` with shadcn theme tokens (`@import "shadcn/tailwind.css"`, CSS variables / `@theme`).
3. Replace hand-rolled button with shadcn `src/components/ui/button.jsx` + `src/lib/utils.js` (`cn` helper).
4. Add typography helpers: `src/components/ui/typography/H1.jsx`, `Small.jsx`.
5. Update `page.js` / `layout.js` to use the new Button, H1, Small, and Phosphor heart icons; clean up layout wrappers.
6. `components.json` appears once shadcn is initialized.

## Pitfalls

- **Inline vs className:** students mix string CSS and JS objects; remind camelCase (`backgroundColor`) for inline only.
- **CSS Modules:** forget `.module.css` suffix → styles become global again.
- **SCSS:** missing `sass` install → import fails.
- **styled-components + Next:** needs client components / SSR caveats; keep demos in the CRA `example/` app to avoid App Router friction.
- **Tailwind class typos:** silent no-op; use IntelliSense / compare with `TailwindExample`.
- **shadcn path aliases:** `jsconfig` `@/*` must match where `components/ui` lands.
- **Like-button bug in starter:** `isLikedQuote` was used as a value instead of calling the function / indexing `quotes[index]` — fixed in completed `page.js`; good live debugging moment.
- Keep this instructor PR out of the student-facing `prep-lesson-31` branch until after class.

## Starter vs completed

- **Student starter PR:** `Styling.md` + `example/` demos + Context-based `random-quotes` with simple button.
- **This PR:** completed shadcn/Tailwind `random-quotes` + small example tweaks + these notes.
