"use client";

import Post from "./post";
import { PostProps } from "@/app/lib/definitions";
import { useEffect, useState } from "react";

export default function Timeline({ posts }: { posts: PostProps[] }) {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const handlePostClick = (id: number, username: string) => {
    window.history.pushState(null, "", `${username}/post/${id}`);
    setSelectedPost(id);
  };

  useEffect(() => {
    window.onpopstate = () => {
      setSelectedPost(null);
    };
  }, []);

  if (selectedPost) {
    const selectedPostData = posts.find((post) => post.id === selectedPost);
    if (!selectedPostData) {
      return <div>Post not found.</div>;
    }
    return <Post post={selectedPostData} />;
  }

  return (
    <>
      {posts.map((post) => (
        <div
          className="hover:cursor-pointer"
          key={post.id}
          onClick={() => handlePostClick(post.id, post.username)}
        >
          <Post post={post} />
        </div>
      ))}
    </>
  );
}
