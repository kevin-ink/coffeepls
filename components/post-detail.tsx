"use server";
import { format, formatDistance } from "date-fns";
import {
  Heart,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
} from "lucide-react";
import Comment from "./comment";
import Link from "next/link";
import { Button } from "./ui/button";
import CommentForm from "./comment-form";
import { getComments } from "@/app/lib/data";
import { PostProps } from "@/app/lib/definitions";

export default async function PostDetail({ post }: { post: PostProps }) {
  const time_since = formatDistance(new Date(post.created_at), new Date(), {
    addSuffix: true,
  });
  const formattedDate = format(
    new Date(post.created_at),
    "eeee, MMMM d, yyyy HH:mm a"
  );

  const { username, content, beverage, location, recommend } = post;

  const comments = await getComments(post.id);

  return (
    <div className="w-full h-auto flex flex-col gap-y-2 px-5 pt-10">
      <Link
        href="/"
        className="py-4 flex flex-row gap-x-2 items-center w-fit h-fit"
      >
        <Button variant="ghost" className="text-lg [&_svg]:size-8">
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="flex flex-row gap-x-2 items-center">
        <span className="text-md">{username}</span>
        <p className="text-sm text-gray-700">{time_since}</p>
      </div>
      <div className="text-lg font-bold flex flex-row gap-x-2">
        {beverage} <span className="font-normal">at</span>
        {location}
        {recommend ? (
          <ThumbsUp size={24} className="fill-sky-600" />
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
      <CommentForm post_id={post.id} />
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment {...comment} />
        </div>
      ))}
    </div>
  );
}
