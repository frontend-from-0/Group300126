import 'server-only';

import { MongoClient, type Db } from 'mongodb';

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

function getMongoClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it to .env.local.');
  }

  if (!globalForMongo.mongoClientPromise) {
    const client = new MongoClient(uri);
    globalForMongo.mongoClientPromise = client.connect();
  }

  return globalForMongo.mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClientPromise();
  const dbName = process.env.MONGODB_DB ?? 'quotes-app';
  return client.db(dbName);
}
