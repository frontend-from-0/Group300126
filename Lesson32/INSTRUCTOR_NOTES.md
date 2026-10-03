# Lesson 32 — Introduction to TypeScript (Instructor Notes)

**Topic:** TypeScript basics + adding TS to an existing Next.js app  
**Cohort / repo:** Group300126 (Web Developer) → `frontend-from-0/Group300126`  
**When:** Tue 6 Oct 2026, 19:30 Europe/Istanbul  
**Historical source:** `frontend-from-0/Group021125` Lesson33  
- Starter: `8648acc` “Add Lesson33 starter files”  
- Completed: `5d20dd2` “Lesson33 completed files”

Student PR: `typeScript-intro/` worksheets + JS `random-quotes` Next app.  
This instructor PR: filled intro files + TS-migrated `random-quotes` + these notes. **Do not merge** into student-visible `main` until you decide.

**Numbering note:** Calendar once labeled styling as “30”; Lesson31 styling PRs #7/#8 already exist. This is correctly **Lesson 32** TypeScript. Stale Lesson 30 PRs #4/#5 may still be open — leave them.

## Goals

- Motivate TypeScript (catch bugs at edit time; better editor help).
- Cover primitives, arrays, tuples, enums, unions, interfaces vs type aliases, function types.
- Migrate a small Next.js (`random-quotes`) surface from JS → TS (rename, `tsconfig`, annotate props/state).

## Before class

- [ ] Recording on
- [ ] `npm install` in `Lesson32/random-quotes` beforehand if Wi‑Fi is slow
- [ ] Decide live pace: worksheets first, then migrate 1–2 files together

## Teaching flow

### A. `typeScript-intro/`

1. **`basicTypes.ts`** — `string` / `number` / `boolean` / `null`, arrays, tuples, numeric + string enums.
2. **`functionTypes.ts`** — param/return annotations; optional params; what completed file trims or clarifies.
3. **`interfacesAndTypes.ts`** — `interface` vs `type`; extending; using types on objects/arrays.
4. **`AddTsToProject.md`** — install `typescript` + `@types/*`, add `tsconfig.json`, rename `.js`/`.jsx` → `.ts`/`.tsx`.

### B. Live migrate `random-quotes` (completed delta)

1. Add `tsconfig.json`; remove/`allowJs` as in completed tree; drop bare `jsconfig.json` when TS takes over.
2. Rename key files: `QuotesContext.js` → `.tsx`, `page.js` → `.tsx`, `layout.js` → `.tsx`, `button.jsx` → `.tsx`, `quotes.js` → `.quotes.ts`.
3. Add types on context value, quote shape, component props; fix the errors the compiler surfaces.
4. Optional: `ExampleTypographyComponent.tsx` as a typed UI example.

## Starter vs completed

| Starter | Completed |
|---------|-----------|
| Intro `.ts` files with exercises / partial answers | Filled / adjusted intro solutions |
| JS App Router `random-quotes` + `jsconfig` | TS versions + `tsconfig.json` + typed context/page/quotes |

## Pitfalls

- Forgetting `.tsx` when file contains JSX.
- `strict` null checks surprising students — good teaching moment.
- Mixing default and named exports after rename.
- Next.js still runs with `allowJs` — emphasize intentional migration, not “it still works so skip types”.

## Continuity

Builds on Lesson 31 styling / `random-quotes` polish. Students should already know the app structure.

## Exercises

No clearly applicable Lesson32/33 TypeScript homework on the exercises repos for this cohort. Skipped.

## Files in this instructor PR

| Path | Role |
|------|------|
| `Lesson32/typeScript-intro/` | Completed worksheets |
| `Lesson32/random-quotes/` | TS-migrated app end state |
| `Lesson32/INSTRUCTOR_NOTES.md` | These notes |
