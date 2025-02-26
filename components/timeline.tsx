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
    <div className="pt-10">
      {posts.map((post) => (
        <div
          className="hover:cursor-pointer"
          key={post.id}
          onClick={() => handlePostClick(post.id, post.username)}
        >
          <Post post={post} />
        </div>
      ))}
      <div className="mt-6 text-center text-gray-700">
        You&apos;ve reached the end of the feed.
      </div>
    </div>
  );
}
