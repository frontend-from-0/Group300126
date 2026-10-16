# Lesson 30 — Context API (Instructor Notes)

**Topic:** React Context API (createContext, Provider, useContext)  
**Cohort:** Group300126 (Web Developer)  
**Historical source:** `frontend-from-0/Group021125` Lesson31 completed (`af0bf3b`) + `notes.md`

## Teaching sequence

1. **Motivation — props drilling**  
   Use `props_drilling.png` / `wrct_0101.png` to show why passing props through many layers is painful.

2. **Create a context**  
   `createContext` from React — must be done in a **client component** (`'use client'`).  
   Demo files: `src/app/context/QuotesContext.js`, `src/app/context/UserContext.js`.

3. **Wrap the tree in a Provider**  
   Wrap the app (or a subtree) with the provider. In completed code, `QuotesContextProvider` wraps children in `src/app/layout.js`.

4. **Consume with `useContext`**  
   Also client-only. Show reading/updating shared quote index, likes, and user-related state without drilling props.

## Key demos (completed app: `random-quotes`)

- Context modules under `src/app/context/`
- Extra routes used during class: `src/app/user/settings`, `src/app/user/quotes/favourite`
- Auth helper stub: `src/lib/auth.js` (used when liking quotes / associating `userId`)
- Provider wiring in root `layout.js`

## Historical notes.md (verbatim teaching bullets)

1. Create a context (`createContext` from react) → Can only be done in a client component!!!
2. Wrap entire application or its part in the context created in the previous step
3. Use context where you need it (`useContext` react hook) → Can only be done in a client component!!!

## Starter vs completed

- **Student starter:** Next.js random-quotes app without Context (props-based baseline).
- **This PR:** completed Context API version + these notes. Keep out of the student-facing branch.
