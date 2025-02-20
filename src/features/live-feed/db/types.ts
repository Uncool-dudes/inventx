export interface Tweet {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
  } | null;
  likes: number;
  comments: number;
}

export interface TweetWithInteraction extends Tweet {
  liked: boolean;
}
