## Important to understand

### Persistence vs. Volatility: 
Variables in Node.js/NextJs disappear when the server restarts. The database is the long-term memory.

### The Request/Response Cycle:
Frontend (React/HTML) sends a request → Backend (Node/Express; Server component, Server action or Api route in NextJS) receives it → Database (MongoDB) stores/finds it → Backend formats it → Frontend displays it.

### CRUD is the Universal Language

Regardless of the DB, they are always doing four things: Create, Read, Update, and Delete.


## SQL vs. NoSQL: The Core Trade-offs

### SQL (Relational)
- Tables with fixed rows and columns.
- Strict schema: You must define your columns before adding data.
- Relationships: Uses JOINs to link tables (excellent for complex logic).

### NoSQL (Document/MongoDB)
- JSON-like documents (BSON).
- Flexible schema: You can add new fields to one document without affecting others.
- Often uses Embedding (nesting data inside a document).


## Crucial MongoDB Concepts
- Documents are Objects: A single record in MongoDB is just a "Document," which looks exactly like a JavaScript object.

- Collections are Arrays: A "Collection" is just a giant array of those objects.

- The _id Field: Every document gets a unique ObjectId.

- Schema Flexibility vs. "Schema-less" Chaos: Just because MongoDB allows you to have different structures doesn't mean you should. We usually use libraries like Zod/Mongoose to enforce a schema so our data doesn't become a mess.

- Validation is Backend's Job: never trust the frontend. If a field is "required," it must be validated at the database/API level, not just on a form.

- Avoid accidentally making 100 database calls in a loop instead of one efficient call. It’s the #1 way to slow down an app.

```JS
  const db = await getDb();
  const col = db.collection(Collections.quotes);
  // This is just a bad example that you should not use!!!
  // quotes.map(async (quote) => {
  //   await col.insertOne(quote);
  // })
  // How to do it right:
  col.insertMany(quotes);

```

## Common MongoDB CRUD operations (Node driver)

Assume `col` is a collection, e.g. `db.collection('quotes')`.

CRUD maps to these methods:

| CRUD | Typical methods |
|---|---|
| Create | `insertOne`, `insertMany` |
| Read | `find`, `findOne`, `findOne` with `_id` |
| Update | `updateOne`, `updateMany`, `replaceOne`, `findOneAndUpdate` |
| Delete | `deleteOne`, `deleteMany` |

Many write methods also accept `{ upsert: true }` (update + insert if nothing matches).

### Create: `insertOne` / `insertMany`

```js
await col.insertOne({
  quote: 'Stay hungry. Stay foolish.',
  author: 'Steve Jobs',
  likedBy: [],
});

await col.insertMany([
  { quote: '...', author: 'A' },
  { quote: '...', author: 'B' },
]);
```

MongoDB adds `_id` if you do not provide one. Prefer `insertMany` for batches.

### Read: `find` / `findOne` (search)

The first argument is a **filter** (which documents). Optional second argument is **options** (how to return them).

```js
// One document
await col.findOne({ author: 'Mark Twain' });
await col.findOne({ _id: new ObjectId(idString) });

// Many documents — find() returns a cursor; you must consume it
const quotes = await col.find({ author: 'Albert Einstein' }).toArray();

// Common options: projection, sort, skip, limit
const page = await col
  .find(
    { author: { $regex: 'einstein', $options: 'i' } }, // case-insensitive search
    {
      projection: { quote: 1, author: 1 }, // fields to include (_id is included unless you set _id: 0)
      sort: { author: 1 },                 // 1 = ascending, -1 = descending
      skip: 20,
      limit: 10,
    },
  )
  .toArray();
```

Useful filter operators:

| Operator | Meaning | Example |
|---|---|---|
| `$eq` | equals (often written as `{ field: value }`) | `{ author: 'Maya Angelou' }` |
| `$ne` | not equal | `{ author: { $ne: 'Unknown' } }` |
| `$in` / `$nin` | value in / not in a list | `{ author: { $in: ['Twain', 'Wilde'] } }` |
| `$gt` `$gte` `$lt` `$lte` | comparisons | `{ likes: { $gte: 10 } }` |
| `$exists` | field present | `{ likedBy: { $exists: true } }` |
| `$regex` | string match | `{ quote: { $regex: 'dream', $options: 'i' } }` |
| `$or` / `$and` | combine conditions | `{ $or: [{ author: 'A' }, { author: 'B' }] }` |

`find` vs `findOne`: use `findOne` when you expect a single document (by `_id` or a unique field). Use `find` + `.toArray()` (or iterate the cursor) for lists.

### Update: `updateOne` / `updateMany`

The first argument is the **filter**. The second is an **update document** (almost always with operators, not a full replacement). The third is **options**.

```js
await col.updateOne(
  { _id: new ObjectId(idString) },
  { $set: { author: 'Oscar Wilde' } },
);

await col.updateOne(
  { _id: new ObjectId(idString) },
  { $addToSet: { likedBy: userId } }, // add userId only if not already in the array
);

await col.updateMany(
  { author: 'Unknown' },
  { $set: { author: 'Anonymous' } },
);
```

Common update operators:

| Operator | Meaning |
|---|---|
| `$set` | set / overwrite fields |
| `$unset` | remove fields |
| `$inc` | increment a number |
| `$push` | append to an array (duplicates allowed) |
| `$addToSet` | append to an array if missing |
| `$pull` | remove matching values from an array |

`updateOne` changes **at most one** matching document. `updateMany` changes **all** matches.

`replaceOne(filter, replacement)` swaps the whole document (except `_id`). Use it only when you intend to replace everything, not to patch a few fields.

`findOneAndUpdate(filter, update, options)` updates and can return the document (`returnDocument: 'before'` or `'after'`). Handy when the UI needs the new value in one round trip.

### Upsert: update or insert

**Upsert** = if a document matches the filter, update it; if none matches, insert a new one.

```js
await col.updateOne(
  { author: 'Ada Lovelace', quote: 'That brain of mine is something more than merely mortal...' },
  {
    $set: { author: 'Ada Lovelace', quote: '...' },
    $setOnInsert: { likedBy: [] }, // only applied when a new document is created
  },
  { upsert: true },
);
```

Use upsert for “create if missing, otherwise update” (idempotent saves, syncing unique keys). Do **not** upsert on a filter that can match many documents unless you understand which one MongoDB will pick.

`insertOne` always creates. `updateOne` without `upsert` does nothing if there is no match.

### Delete: `deleteOne` / `deleteMany`

```js
await col.deleteOne({ _id: new ObjectId(idString) });
await col.deleteMany({ author: 'Unknown' });
```

Same filter language as `find`. Prefer `deleteOne` with `_id` so you cannot wipe a whole collection by accident.

### Write options you will see often

These are passed as the last argument on insert/update/delete (names vary slightly by method):

| Option | Typical use |
|---|---|
| `upsert: true` | Update, or insert if no match (`updateOne` / `updateMany` / `replaceOne` / `findOneAndUpdate`) |
| `arrayFilters` | Update specific elements inside arrays |
| `sort` | Which matching document to update/delete when several match (`findOneAndUpdate`, some `updateOne` cases) |
| `returnDocument` | `'before'` or `'after'` on `findOneAndUpdate` |

Insert methods mainly care about the documents themselves. Search (`find`) cares about **filter + projection + sort + skip + limit**.


