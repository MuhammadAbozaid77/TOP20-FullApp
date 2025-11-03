import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
// const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = "Top20";

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function getDB() {
  const client = await clientPromise;
  return client.db(dbName);
}
