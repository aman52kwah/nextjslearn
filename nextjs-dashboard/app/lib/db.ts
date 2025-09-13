import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('POSTGRES_URL or DATABASE_URL environment variable is required');
}
console.log('Connection String:', connectionString); // Log to verify


//disable prefecth as it is not support for "Transaction" pool made
const client = postgres(connectionString,{prepare:false});

export const db = drizzle(client, {schema});