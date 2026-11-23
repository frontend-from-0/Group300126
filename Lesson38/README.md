# Lesson 38

MongoDB + Prisma for data storage (create product page), and Vercel Blob file storage in the Next.js ecom app.

`ecom/` is a pre-built shop shell (admin create-product form + storefront). Product list helpers currently return empty results; `createProduct` in `ecom/src/app/admin/products/new/action.ts` validates the form and then has a TODO for saving to MongoDB and uploading images.

Handouts: `prisma.md`, `prisma-integration.md`.

## Setup

```bash
cd Lesson38/ecom
cp .env.example .env.local
npm install
npm run dev
```

- Auth0: reuse the Lesson 37 application. `ROLES_CLAIM` in `src/lib/auth0.ts` is `https://pyp-admin/roles` and must match the post-login action.
- `DATABASE_URL`: MongoDB Atlas (replica set) connection string.
- `BLOB_READ_WRITE_TOKEN`: from the Vercel Blob store.
