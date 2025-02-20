import postgres from 'postgres';
import 'dotenv/config';

async function main() {
  console.log('Starting database setup...');
  
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined in environment variables');
    process.exit(1);
  }

  const sql = postgres(process.env.DATABASE_URL, { max: 1 });
  
  try {
    console.log('Creating tweets table...');
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS tweets (
        tweet_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id text NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
        content text NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      );
    `);
    console.log('Tweets table created successfully');

    console.log('Creating tweet_interactions table...');
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS tweet_interactions (
        interaction_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        tweet_id uuid NOT NULL REFERENCES tweets (tweet_id) ON DELETE CASCADE,
        user_id text NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
        type text NOT NULL,
        comment text,
        created_at timestamp DEFAULT now() NOT NULL
      );
    `);
    console.log('Tweet_interactions table created successfully');

    console.log('Creating index...');
    await sql.unsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_user_tweet_like_idx 
      ON tweet_interactions (user_id, tweet_id) 
      WHERE type = 'like';
    `);
    console.log('Index created successfully');
    
    console.log('All database operations completed successfully');
  } catch (error) {
    console.error('Error during database setup:', error);
    process.exit(1);
  } finally {
    await sql.end();
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
