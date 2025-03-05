"use server";
import { ArrowLeft } from "lucide-react";
import Comment from "./comment";
import Link from "next/link";
import { Button } from "./ui/button";
import CommentForm from "./comment-form";
import { getComments } from "@/app/lib/data";
import { PostProps } from "@/app/lib/definitions";
import Post from "./post";

export default async function PostDetail({ post }: { post: PostProps }) {
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
      <Post post={post} />
      <CommentForm post_id={post.id} />
      {comments.length === 0 && (
        <p className="text-center text-sm border-t-2 pt-2 border-t-primary">
          No comments yet. Be the first to comment!
        </p>
      )}
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment {...comment} />
        </div>
      ))}
    </div>
  );
}
