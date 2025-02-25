import { Button } from "@/components/ui/button";
import PostForm from "@/components/post-form";
import { getUsername } from "../lib/data";
import Timeline from "@/components/timeline";
import { getPosts } from "@/app/lib/data";

export default async function Home() {
  const username = await getUsername();
  const posts = await getPosts();

  return (
    <div className="max-w-screen h-screen flex flex-row gap-x-8 justify-center">
      <div className="flex-1 flex flex-col justify-center items-end">
        <div className="w-1/2 h-screen py-10 flex flex-col">
          <div className="flex flex-1 flex-col items-start">
            <Button variant="ghost" className="text-3xl">
              Coffee Please!
            </Button>
            <div></div>
          </div>
          <PostForm />
          <span className="text-xl mt-6">{username}</span>
        </div>
      </div>
      <div className="w-1/3 flex-col flex border-x-2 border-primary overflow-y-scroll no-scrollbar">
        <Timeline posts={posts} />
        <div className="mt-6 text-center text-gray-700">
          You&apos;ve reached the end of the feed.
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
