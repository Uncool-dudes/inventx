import db from "@/db";
import { tweetsTable } from "@/db/schema";

export async function createTweet(userId: string, content: string) {
  const [tweet] = await db
    .insert(tweetsTable)
    .values({
      userId,
      content,
    })
    .returning();

  return tweet;
}
