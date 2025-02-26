"use client";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { CommentProps } from "@/app/lib/definitions";
import { format } from "date-fns";
import { updateCommentRating } from "@/app/lib/data";
import { useRouter } from "next/navigation";

export default function Comment(comment: CommentProps) {
  const router = useRouter();

  const [username, content, time, rating] = [
    comment.username,
    comment.content,
    comment.created_at,
    comment.rating,
  ];

  const formattedDate = format(time, "eeee, MMMM d, yyyy HH:mm a");

  return (
    <div className="w-full h-auto flex flex-col gap-y-2 py-4 border-primary border-t-2">
      <div className="flex flex-row gap-x-2 items-center">
        <span className="text-md">{username}</span>
        <p className="text-sm text-gray-700">{formattedDate}</p>
      </div>
      <p>{content}</p>
      <div className="flex flex-row gap-x-1 items-center text-md font-bold">
        <ArrowBigDown
          size={24}
          className="hover:cursor-pointer hover:fill-red-500"
          onClick={() =>
            updateCommentRating(comment.id, -1).then(router.refresh)
          }
        />
        {rating}
        <ArrowBigUp
          size={24}
          className="hover:cursor-pointer hover:fill-sky-500"
          onClick={() =>
            updateCommentRating(comment.id, 1).then(router.refresh)
          }
        />
      </div>
    </div>
  );
}
