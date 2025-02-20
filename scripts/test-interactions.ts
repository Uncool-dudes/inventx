import postgres from 'postgres';
import 'dotenv/config';

async function main() {
  console.log('Testing interactions table...');
  
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined');
    process.exit(1);
  }

  try {
    const sql = postgres(process.env.DATABASE_URL);

    // Create tweet_interactions table if not exists
    console.log('Creating tweet_interactions table...');
    await sql`
      CREATE TABLE IF NOT EXISTS tweet_interactions (
        interaction_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        tweet_id uuid NOT NULL REFERENCES tweets (tweet_id) ON DELETE CASCADE,
        user_id text NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
        type text NOT NULL,
        comment text,
        created_at timestamp DEFAULT now() NOT NULL
      )
    `;
    console.log('Tweet_interactions table created');

    // Create index
    console.log('Creating index...');
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_user_tweet_like_idx 
      ON tweet_interactions (user_id, tweet_id) 
      WHERE type = 'like'
    `;
    console.log('Index created');

    // Test if table exists
    const interactionsResult = await sql`SELECT * FROM tweet_interactions LIMIT 1`;
    console.log('Interactions table exists:', interactionsResult);

    await sql.end();
    console.log('Interactions test completed successfully');
  } catch (error) {
    console.error('Interactions test failed:', error);
    process.exit(1);
  }
}

main();
