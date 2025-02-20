"use client";

import { TweetCard } from "./tweet-card";
import { TweetComments } from "./tweet-comments";
import type { TweetWithInteraction } from "@/features/live-feed/db/types";
import { handleCreateComment, handleGetComments } from "@/app/(protected)/feed/actions";
import { useEffect, useState } from "react";

interface Comment {
  id: string;
  comment: string;
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
  } | null;
}

interface TweetInteractionProps {
  tweet: TweetWithInteraction;
}

export function TweetInteraction({ tweet }: TweetInteractionProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const loadComments = async () => {
      const tweetComments = await handleGetComments(tweet.id);
      setComments(tweetComments);
    };
    loadComments();
  }, [tweet.id]);

  const handleLike = async (id: string) => {
    console.log("Like", id);
    // TODO: Implement like functionality
  };

  const handleComment = async (tweetId: string, comment: string) => {
    try {
      await handleCreateComment(tweetId, comment);
      // Reload comments after posting
      const updatedComments = await handleGetComments(tweet.id);
      setComments(updatedComments);
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  const handleShare = async (id: string) => {
    console.log("Share", id);
    // TODO: Implement share functionality
  };

  return (
    <div>
      <TweetCard
        tweet={tweet}
        onLike={handleLike}
        onComment={() => {}} // Not used since we have inline comments
        onShare={handleShare}
      />
      <TweetComments
        tweetId={tweet.id}
        comments={comments}
        onSubmitComment={handleComment}
      />
    </div>
  );
}
