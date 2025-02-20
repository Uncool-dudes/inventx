"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

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

interface TweetCommentsProps {
  tweetId: string;
  comments: Comment[];
  onSubmitComment: (tweetId: string, comment: string) => Promise<void>;
}

export function TweetComments({ tweetId, comments, onSubmitComment }: TweetCommentsProps) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onSubmitComment(tweetId, comment);
      setComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-start space-x-2">
        <Textarea
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1"
          rows={1}
        />
        <Button 
          onClick={handleSubmit} 
          disabled={!comment.trim() || isSubmitting}
        >
          Post
        </Button>
      </div>

      {comments.length > 0 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? "Hide" : "Show"} {comments.length} comment{comments.length !== 1 ? 's' : ''}
          </Button>

          {showComments && (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.user?.image || "/defaultUser.svg"} />
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-2">
                      <p className="font-medium">
                        {comment.user ? `${comment.user.firstName} ${comment.user.lastName}` : "Anonymous User"}
                      </p>
                      <p>{comment.comment}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
