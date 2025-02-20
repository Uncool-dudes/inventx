"use client"
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

import { type TweetWithInteraction } from "../db/types";  

interface TweetCardProps {
  tweet: TweetWithInteraction;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
}

export function TweetCard({ tweet, onLike, onComment, onShare }: TweetCardProps) {
  const [isLiked, setIsLiked] = useState(tweet.liked);
  const [likesCount, setLikesCount] = useState(tweet.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike(tweet.id);
  };

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-start space-x-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={tweet.user?.image || "/defaultUser.svg"} />
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">
                {tweet.user ? `${tweet.user.firstName} ${tweet.user.lastName}` : "Anonymous User"}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                {formatDistanceToNow(tweet.createdAt, { addSuffix: true })}
              </span>
            </div>
          </div>
          <p className="mt-2 text-gray-800">{tweet.content}</p>
          <div className="flex items-center mt-4 space-x-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-2"
              onClick={handleLike}
            >
              <Heart className={isLiked ? "fill-red-500 stroke-red-500" : ""} size={18} />
              <span>{likesCount}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-2"
              onClick={() => onComment(tweet.id)}
            >
              <MessageCircle size={18} />
              <span>{tweet.comments}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center"
              onClick={() => onShare(tweet.id)}
            >
              <Share2 size={18} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
