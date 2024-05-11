// src/auth.ts
import { MongoClient } from 'mongodb';
import { Lucia } from 'lucia';

// Connection URL
const url = 'mongodb://103.245.38.205:27017';

// Database Name
const dbName = 'crypto_project';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the server
await client.connect();

console.log("Connected successfully to server");

const db = client.db(dbName);

export const lucia = new Lucia(db as any, {
    sessionCookie: {
        attributes: {
            secure: import.meta.env.PROD
        }
    }
});

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
    }
}