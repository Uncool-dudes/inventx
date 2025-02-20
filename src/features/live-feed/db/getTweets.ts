import db from "@/db";
import { tweetsTable, Users, tweetInteractionsTable } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function getTweets() {
  const tweets = await db
    .select({
      id: tweetsTable.id,
      content: tweetsTable.content,
      createdAt: tweetsTable.createdAt,
      user: {
        id: Users.id,
        firstName: Users.firstName,
        lastName: Users.lastName,
        image: Users.image,
      },
      likes: sql<number>`COUNT(DISTINCT CASE WHEN ${tweetInteractionsTable.type} = 'like' THEN ${tweetInteractionsTable.userId} END)`,
      comments: sql<number>`COUNT(DISTINCT CASE WHEN ${tweetInteractionsTable.type} = 'comment' THEN ${tweetInteractionsTable.id} END)`,
    })
    .from(tweetsTable)
    .leftJoin(Users, eq(tweetsTable.userId, Users.id))
    .leftJoin(tweetInteractionsTable, eq(tweetsTable.id, tweetInteractionsTable.tweetId))
    .groupBy(tweetsTable.id, Users.id)
    .orderBy(desc(tweetsTable.createdAt));

  return tweets;
}

export async function getUserTweets(userId: string) {
  const tweets = await db
    .select({
      id: tweetsTable.id,
      content: tweetsTable.content,
      createdAt: tweetsTable.createdAt,
      user: {
        id: Users.id,
        firstName: Users.firstName,
        lastName: Users.lastName,
        image: Users.image,
      },
      likes: sql<number>`COUNT(DISTINCT CASE WHEN ${tweetInteractionsTable.type} = 'like' THEN ${tweetInteractionsTable.userId} END)`,
      comments: sql<number>`COUNT(DISTINCT CASE WHEN ${tweetInteractionsTable.type} = 'comment' THEN ${tweetInteractionsTable.id} END)`,
    })
    .from(tweetsTable)
    .leftJoin(Users, eq(tweetsTable.userId, Users.id))
    .leftJoin(tweetInteractionsTable, eq(tweetsTable.id, tweetInteractionsTable.tweetId))
    .where(eq(tweetsTable.userId, userId))
    .groupBy(tweetsTable.id, Users.id)
    .orderBy(desc(tweetsTable.createdAt));

  return tweets;
}
