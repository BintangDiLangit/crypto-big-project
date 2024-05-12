import { MongoClient } from "mongodb";

if (!import.meta.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}

const uri = import.meta.env.MONGODB_URI;
const options = {};
let cachedMongo;

const connectToDB = async () => {
  const mongo = await new MongoClient(uri, options).connect();
  return mongo.db(import.meta.env.MONGODB_DB_NAME);
};

export const getDB = async () => {
  if (import.meta.env.PROD_ENV === "development") {
    (global as any)._mongoConnection = await connectToDB();
    cachedMongo = (global as any)._mongoConnection;
    return cachedMongo;
  }
  const mongo = await connectToDB();
  return mongo;
};

export const Users = async () => {
  const db = await getDB();
  return db.collection("users");
};