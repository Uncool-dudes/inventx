import { TweetInteraction } from "@/features/live-feed/components/tweet-interaction";
import { CreateTweet } from "@/features/live-feed/components/create-tweet";
import { getTweets } from "@/features/live-feed/db/getTweets";
import { handleCreateTweet } from "./actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function FeedPage() {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  const tweets = await getTweets();
  return ( 
  <div className="flex flex-col w-full items-center">
    <div className="w-1/2  py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Feed</h1>
      <CreateTweet onSubmit={handleCreateTweet} />
      <div className="space-y-4">
        {tweets.map((tweet) => {
          if (!tweet.user) return null;
          return (
            <TweetInteraction
              key={tweet.id}
              tweet={{
                ...tweet,
                liked: false, // TODO: Check if user has liked the tweet
              }}
            />
          );
        })}
        {tweets.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No posts yet. Be the first to post something!
          </p>
        )}
      </div>
    </div>
    </div>
  );
}
