"use client";

import PostDetail from "./post-detail";
import Post from "./post";
import { PostProps } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Timeline({ posts }: { posts: PostProps[] }) {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handlePostClick = (id: number, username: string) => {
    router.push(`${username}/post/${id}`);
  };

  useEffect(() => {
    if (selectedPost !== null) {
      const post = posts.find((post) => post.id === selectedPost);
      if (post) {
        router.push(`${post.username}/post/${post.id}`);
      }
    }
  }, [selectedPost, posts, router]);

  useEffect(() => {
    if (pathname === "/home") {
      setSelectedPost(null);
    }
  }, [pathname]);

  if (selectedPost) {
    const selectedPostData = posts.find((post) => post.id === selectedPost);
    if (!selectedPostData) {
      return <div>Post not found.</div>;
    }
    return <PostDetail post={selectedPostData} />;
  }

  return (
    <div className="max-w-full">
      {posts.map((post) => (
        <div key={post.id}>
          <Post
            post={post}
            handleClick={() => handlePostClick(post.id, post.username)}
          />
        </div>
      ))}
      <div className="my-6 text-center text-gray-700">
        You&apos;ve reached the end of the feed.
      </div>
    </div>
  );
}
