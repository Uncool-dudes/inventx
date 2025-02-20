import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import 'dotenv/config';

async function main() {
  console.log('Testing database connection...');
  
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined');
    process.exit(1);
  }

  try {
    const sql = postgres(process.env.DATABASE_URL);
    const db = drizzle(sql);

    // Test users table
    console.log('Checking users table...');
    const usersResult = await sql`SELECT * FROM users LIMIT 1`;
    console.log('Users table exists:', usersResult);

    // Try to create tweets table
    console.log('Creating tweets table...');
    await sql`
      CREATE TABLE IF NOT EXISTS tweets (
        tweet_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id text NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
        content text NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `;
    console.log('Tweets table created');

    // Check if tweets table exists
    const tweetsResult = await sql`SELECT * FROM tweets LIMIT 1`;
    console.log('Tweets table exists:', tweetsResult);

    await sql.end();
    console.log('Database test completed successfully');
  } catch (error) {
    console.error('Database test failed:', error);
    process.exit(1);
  }
}

main();
