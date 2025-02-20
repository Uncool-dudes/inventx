"use server";

import { createTweet } from "@/features/live-feed/db/createTweet";
import { createComment } from "@/features/live-feed/db/createComment";
import { getComments } from "@/features/live-feed/db/getComments";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

export async function handleCreateTweet(content: string) {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  await createTweet(user.id, content);
  revalidatePath("/feed");
  revalidatePath("/feed/your-posts");
}

export async function handleGetComments(tweetId: string) {
  const comments = await getComments(tweetId);
  return comments;
}

export async function handleCreateComment(tweetId: string, comment: string) {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  await createComment(user.id, tweetId, comment);
  revalidatePath("/feed");
  revalidatePath("/feed/your-posts");
}
