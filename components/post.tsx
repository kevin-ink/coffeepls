"use client";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Loader,
} from "lucide-react";
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
import { useAppSelector, useAppDispatch } from "@/app/hooks";

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
  const [loading, setLoading] = useState(true);

  const cachedLikes = useAppSelector((state) => state.likes[post.id]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchLiked = async () => {
      const user_id = await getUserId();
      if (!user_id) {
        console.error("User not found");
        return;
      }

      if (cachedLikes) {
        setLikes(cachedLikes.likes);
        setLiked(cachedLikes.liked);
        return;
      }

      const liked = await postIsLiked(post.id, user_id);
      const postLikes = await getPostLikes(post.id);
      dispatch({
        type: "likes/setLikes",
        payload: { postId: post.id, likes: postLikes, liked },
      });
      setLikes(postLikes);
      setLiked(liked);
    };

    fetchLiked().then(() => setLoading(false));
  }, [post.id, cachedLikes, dispatch]);

  const handleLike = async () => {
    if (pending) return;
    setPending(true);

    const newLikes = liked ? likes - 1 : likes + 1;
    setLikes(newLikes);
    setLiked(!liked);

    if (liked) {
      await removePostLike(post.id);
      setLikes(likes - 1);
    } else {
      await postLike(post.id);
      setLikes(likes + 1);
    }

    dispatch({
      type: "likes/setLikes",
      payload: { postId: post.id, likes: newLikes, liked: !liked },
    });

    setPending(false);
  };

  const handleNav = () => {
    if (handleClick) {
      handleClick();
    }
  };

  return (
    <div className="w-full min-w-full h-fit flex flex-col p-4 gap-y-2">
      <div
        className={`flex flex-col gap-y-2 ${
          handleClick ? `hover:cursor-pointer` : ""
        }`}
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
          <div className="flex justify-center w-full max-h-[300px]">
            <Image
              className="border-2 rounded object-cover h-auto w-auto min-w-[300px] border-primary"
              src={image_url}
              width={0}
              height={0}
              sizes="100vw"
              alt="post image"
            />
          </div>
        )}
      </div>
      <div className="flex flex-row gap-x-4">
        <div className="flex flex-row gap-x-2">
          {!loading ? (
            <>
              <Heart
                size={24}
                onClick={handleLike}
                className={`hover:cursor-pointer hover:fill-red-500 ${
                  liked ? "fill-red-500" : ""
                }`}
              />
              <span>{likes}</span>
            </>
          ) : (
            <Loader size={24} className="animate-spin" />
          )}
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
