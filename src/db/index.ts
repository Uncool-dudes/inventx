import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL as string, { prepare: false });
const db = drizzle(client, { logger: false });
export default db;
