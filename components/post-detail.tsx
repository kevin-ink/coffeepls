import { format, formatDistance } from "date-fns";
import { Heart, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

interface PostProps {
  username: string;
  content: string;
  beverage: string;
  location: string;
  created_at: string;
  recommend: boolean;
  id: number;
}

export default function PostDetail({ post }: { post: PostProps }) {
  const time_since = formatDistance(new Date(post.created_at), new Date(), {
    addSuffix: true,
  });
  const formattedDate = format(
    new Date(post.created_at),
    "eeee, MMMM d, yyyy HH:mm a"
  );

  const { username, content, beverage, location, recommend } = post;

  return (
    <div className="w-full h-auto flex flex-col gap-y-2 p-5 border-primary border-t-2 first:border-t-0 hover:cursor-pointer">
      <div className="flex flex-row gap-x-2 items-center">
        <span className="text-md">{username}</span>
        <p className="text-sm text-gray-700">{time_since}</p>
      </div>
      <div className="text-lg font-bold flex flex-row gap-x-2">
        {beverage} <span className="font-normal">at</span>
        {location}
        {recommend ? (
          <ThumbsUp size={24} className="fill-sky-500" />
        ) : (
          <ThumbsDown size={24} className="fill-red-500" />
        )}
      </div>
      <p>{content}</p>
      <div className="flex flex-row gap-x-4">
        <Heart size={24} className="hover:cursor-pointer hover:fill-red-500" />
        <MessageSquare
          size={24}
          className="hover:cursor-pointer hover:fill-primary"
        />
        <span className="text-sm text-gray-700">{formattedDate}</span>
      </div>
    </div>
  );
}
