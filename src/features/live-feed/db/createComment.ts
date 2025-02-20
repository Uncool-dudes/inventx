import db from "@/db";
import { tweetInteractionsTable } from "@/db/schema";

export async function createComment(userId: string, tweetId: string, comment: string) {
  await db.insert(tweetInteractionsTable).values({
    userId,
    tweetId,
    type: "comment",
    comment,
  });
}
