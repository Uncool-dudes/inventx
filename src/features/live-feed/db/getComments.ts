import db from "@/db";
import { tweetInteractionsTable, Users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getComments(tweetId: string) {
  const comments = await db
    .select({
      id: tweetInteractionsTable.id,
      comment: tweetInteractionsTable.comment,
      createdAt: tweetInteractionsTable.createdAt,
      user: {
        id: Users.id,
        firstName: Users.firstName,
        lastName: Users.lastName,
        image: Users.image,
      }
    })
    .from(tweetInteractionsTable)
    .leftJoin(Users, eq(tweetInteractionsTable.userId, Users.id))
    .where(
      eq(tweetInteractionsTable.tweetId, tweetId) && 
      eq(tweetInteractionsTable.type, "comment")
    );
    
  // Filter out any comments that are null and cast to the expected type
  return comments.filter(c => c.comment !== null) as {
    id: string;
    comment: string;
    createdAt: Date;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      image: string;
    } | null;
  }[];
}
