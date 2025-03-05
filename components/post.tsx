"use client";

import { Heart } from "lucide-react";
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { formatDistance, format } from "date-fns";
import { PostProps } from "@/app/lib/definitions";
import { useState, useEffect } from "react";
import {
  getPostLikes,
  postIsLiked,
  postLike,
  removePostLike,
} from "@/app/lib/data";
import Image from "next/image";
import { getUserId } from "@/app/actions";

export default function Post({
  post,
  handleClick,
}: {
  post: PostProps;
  handleClick?: () => void;
}) {
  const time_since = formatDistance(new Date(post.created_at), new Date(), {
    addSuffix: true,
  });

  const formattedDate = format(post.created_at, "eeee, MMMM d, yyyy HH:mm a");
  const { username, content, beverage, location, recommend, image_url } = post;

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [pending, setPending] = useState(false);

  const cacheLikes = (postId: string, likes: number, liked: boolean) => {
    localStorage.setItem(`post_${postId}_likes`, likes.toString());
    localStorage.setItem(`post_${postId}_liked`, liked.toString());
  };

  const getCachedLikes = (postId: string) => {
    const cachedLikes = localStorage.getItem(`post_${postId}_likes`);
    const cachedLiked = localStorage.getItem(`post_${postId}_liked`);

    if (cachedLikes && cachedLiked !== null) {
      return {
        likes: parseInt(cachedLikes, 10),
        liked: cachedLiked === "true",
      };
    }
    return null;
  };

  useEffect(() => {
    const fetchLiked = async () => {
      const cached = getCachedLikes(post.id.toString());
      if (cached) {
        setLikes(cached.likes);
        setLiked(cached.liked);
        return;
      }
      const user_id = await getUserId();
      if (!user_id) {
        console.error("User not found");
        return;
      }
      const liked = await postIsLiked(post.id, user_id);
      const postLikes = await getPostLikes(post.id);
      setLikes(postLikes);
      setLiked(liked);
      cacheLikes(post.id.toString(), postLikes, liked);
    };

    fetchLiked();
  }, [post.id]);

  const handleLike = async () => {
    if (pending) return;
    setPending(true);

    const newLikes = liked ? likes - 1 : likes + 1;
    setLikes(newLikes);
    setLiked(!liked);

    cacheLikes(post.id.toString(), newLikes, !liked);

    if (liked) {
      await removePostLike(post.id);
      setLikes(likes - 1);
    } else {
      await postLike(post.id);
      setLikes(likes + 1);
    }

    setPending(false);
  };

  const handleNav = () => {
    if (handleClick) {
      handleClick();
    }
  };

  return (
    <div className="w-full h-auto flex flex-col p-5 border-primary gap-y-2 border-t-2">
      <div
        className="flex flex-col gap-y-2 hover:cursor-pointer"
        onClick={handleNav}
      >
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
        {image_url && (
          <Image
            className="border-2 rounded mx-auto w-auto h-auto max-h-full max-w-full"
            src={image_url}
            width={0}
            height={0}
            sizes="100vw"
            alt="post image"
          />
        )}
      </div>

      <div className="flex flex-row gap-x-4">
        <div className="flex flex-row gap-x-2">
          <Heart
            size={24}
            onClick={handleLike}
            className={`hover:cursor-pointer hover:fill-red-500 ${
              liked ? "fill-red-500" : ""
            }`}
          />
          <span>{likes}</span>
        </div>
        <MessageSquare
          size={24}
          className="hover:cursor-pointer hover:fill-primary"
          onClick={handleNav}
        />
        <span className="text-sm text-gray-700">{formattedDate}</span>
      </div>
    </div>
  );
}
