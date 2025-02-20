import { TweetInteraction } from "@/features/live-feed/components/tweet-interaction";
import { CreateTweet } from "@/features/live-feed/components/create-tweet";
import { getUserTweets } from "@/features/live-feed/db/getTweets";
import { handleCreateTweet } from "../actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function YourPostsPage() {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  const tweets = await getUserTweets(user.id);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Posts</h1>
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
            You haven&apos;t posted anything yet.
          </p>
        )}
      </div>
    </div>
  );
}
