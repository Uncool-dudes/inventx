CREATE TABLE IF NOT EXISTS "tweets" (
    "tweet_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" text NOT NULL REFERENCES "users" ("user_id") ON DELETE CASCADE,
    "content" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "tweet_interactions" (
    "interaction_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "tweet_id" uuid NOT NULL REFERENCES "tweets" ("tweet_id") ON DELETE CASCADE,
    "user_id" text NOT NULL REFERENCES "users" ("user_id") ON DELETE CASCADE,
    "type" text NOT NULL,
    "comment" text,
    "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "unique_user_tweet_like_idx" ON "tweet_interactions" ("user_id", "tweet_id") WHERE type = 'like';
