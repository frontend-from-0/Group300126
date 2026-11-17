# Lesson 36 – Integrating a NoSQL database (MongoDB) into a Next.js project — Instructor notes

**Cohort:** Group300126 (Jr. Web Developer) · **When:** Tue 3 Nov 2026, 18:30–20:30 Stockholm (CET; 20:30 TR)
**Historical source:** `frontend-from-0/Group021125` Lesson37 (20 Aug 2026, same course + topic) — starter `aab6992` + `0fb3b12` + `5599e4a`, completed `79e000f`. Rebuilt on this group's `Lesson35/quotes-app` (completed `fb331e6`), renumbered 37 → 36.

## Starter (student branch `prep-lesson-36`) — plumbing pre-built
- `Lesson36/quotes-app`: copy of `Lesson35/quotes-app` completed code, plus:
  - `package.json`/lock: `mongodb` (^7.8.0) and `server-only`.
  - `.env.example` (`MONGODB_URI=mongodb://127.0.0.1:27017`, `MONGODB_DB=quotes-app`) and `!.env.example` in `.gitignore`. Students add the two vars to their existing `.env.local` (next to the Auth0 vars) — local MongoDB or an Atlas connection string.
  - `src/lib/db/client.ts`: cached `MongoClient` on `globalThis` + `getDb()`.
  - `src/lib/db/collections.ts`: `Collections.quotes` + typed `quotesCollection()`.
  - `src/lib/db/quote-document.ts`: `QuoteDocument` (`_id: ObjectId`, quote, author, likedBy, createdBy). (Historical app had `src/types/quotes-document.ts`; this app uses a single `src/types.ts`, so the document type lives next to the DB code.)
  - `src/repositories/quotes.ts`: `listAllQuotes`, `listFavouriteQuotes(userId)`, `insertQuote`, `updateQuoteLikedBy` (`$addToSet`/`$pull` toggle via `findOneAndUpdate`), `deleteQuoteById`, `seedQuotesIfEmpty()` (new: inserts `src/quotes.ts` when the collection is empty — historically the seed helper existed but was never called, so an empty DB would crash the home page).
  - `src/types.ts`: `Quote` gets optional `createdBy`.
- `Lesson36/notes.md`: persistence, request/response cycle, CRUD, SQL vs NoSQL, MongoDB concepts, CRUD operators/filters/upsert cheat-sheet (unchanged from history).
- `Lesson36/project-structure.md`: layered architecture (lib/db → repositories → server actions → pages), adapted to this app's paths (`(logged-in)`, `src/types.ts`, `quoteSchema`).

## Flow (as taught historically)
1. Theory with `notes.md`: why a DB, SQL vs NoSQL, documents/collections/`_id`, CRUD.
2. Set up MongoDB (local or Atlas) and `.env.local`; open Compass to watch the `quotes` collection.
3. Walk through the plumbing: `client.ts` (why one cached client in dev/serverless, `server-only`), `collections.ts`, `QuoteDocument` vs `Quote` (`_id` → `id: string` mapping in the repository), `project-structure.md`.
4. **Create**: in `(logged-in)/quotes/new/action.ts`, after Zod validation call `insertQuote({ quote, author, createdBy: session.user.sub })`; add `createdAt`/`updatedAt` (ISO string) to the document in the repository. Submit the form and see the document in Compass.
5. **Read**: new `(logged-in)/quotes/action.ts` server action `getQuotes()` (seed if empty → `listAllQuotes()`).
6. Turn `src/app/page.tsx` into an async **Server Component**: `Promise.all([getQuotes(), auth0.getSession()])`, pass `initialQuotes` + `userId` to a new **Client Component** `HomeClient.tsx` (the previous page UI, with local `useState` for quotes/likes). Discuss server vs client boundary: Mongo driver never reaches the browser.
7. Remove `QuotesContextProvider` from `layout.tsx` (data now comes from the DB).

## Completed state
See this branch: `src/app/page.tsx`, `src/app/HomeClient.tsx`, `src/app/(logged-in)/quotes/action.ts`, `src/app/(logged-in)/quotes/new/action.ts`, `src/repositories/quotes.ts`, `src/lib/db/quote-document.ts`, `src/app/layout.tsx`. Type-checks with `tsc --noEmit` (only the pre-existing `WarningDialog.tsx` `className` errors from Lesson 35 remain).

Differences vs. historical completed code (fixes, not new content):
- Like toggle uses the real `userId` from the session (history used the string literal `'userId'`; this group's Lesson35 page used `user.userId`, which does not exist on the Auth0 user — it is `sub`).
- `createdAt`/`updatedAt` use `toISOString()` (history used `Date#toString()`), matching the commented code already in this group's Lesson35 action.
- `QuoteSeed` was deleted in history while still used by the seed helper; here the existing `InitialQuote` type is reused.
- Empty-collection guard on the home page (`quotes[index]?.…`) and "Next quote" disabled on the last quote.

## Left open (next lesson / homework)
- `getLikedQuotes()` stub (auth → `listFavouriteQuotes(userId)`) and wiring `/user/quotes/liked` to it (that page still uses the old context and an empty list).
- Persist likes with `updateQuoteLikedBy(quoteId, userId)` via a server action.
No exercises prepared (none in the historical source).
