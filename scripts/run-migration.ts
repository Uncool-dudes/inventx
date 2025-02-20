import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

async function main() {
  const sql = postgres(process.env.DATABASE_URL!, { max: 1 });
  const db = drizzle(sql);
  
  try {
    // Read and execute migration SQL
    const migrationPath = path.join(process.cwd(), 'drizzle', '0001_sweet_speedball.sql');
    const migration = fs.readFileSync(migrationPath, 'utf8');
    
    await sql.unsafe(migration);
    console.log('Migration SQL executed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
  
  await sql.end();
  process.exit(0);
}

main();
