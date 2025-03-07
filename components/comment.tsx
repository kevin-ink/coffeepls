"use client";
import { CommentProps } from "@/app/lib/definitions";
import { format } from "date-fns";

export default function Comment(comment: CommentProps) {
  const [username, content, time] = [
    comment.username,
    comment.content,
    comment.created_at,
  ];

  const formattedDate = format(time, "eeee, MMMM d, yyyy HH:mm a");

  return (
    <div className="w-full h-auto flex flex-col gap-y-2 p-2">
      <div className="flex flex-row gap-x-2 items-center">
        <span className="text-md font-semibold">{username}</span>
        <p className="text-sm text-gray-700">{formattedDate}</p>
      </div>
      <p>{content}</p>
    </div>
  );
}
