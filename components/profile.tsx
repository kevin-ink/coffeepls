import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Post from "./post";
import { getPostsByUserLiked, getPostsByUsername } from "@/app/lib/data";

export default async function Profile({ username }: { username: string }) {
  const posts = await getPostsByUsername(username);
  const liked = await getPostsByUserLiked(username);

  return (
    <div className="w-full h-auto min-h-screen flex flex-col">
      <div className="w-[600px] h-full flex flex-col gap-y-2 border-x-2 border-primary overflow-y-scroll no-scrollbar">
        <Link href="/" className="w-fit">
          <Button
            variant="ghost"
            className="text-xl rounded-sm [&_svg]:size-8 w-fit hover:bg-[#D6C0B3]"
          >
            <ArrowLeft /> {username}
          </Button>
        </Link>
        <div className="flex flex-col text-sm p-2 text-center bg-accent">
          <h1 className="text-2xl">{username}</h1>
          <span>Joined {}</span>
          <span>{} posts</span>
        </div>
        <Tabs defaultValue="posts">
          <TabsList className="w-full bg-accent rounded-none mb-2">
            <TabsTrigger value="posts" className="flex-1 font-semibold">
              Posts
            </TabsTrigger>
            <TabsTrigger value="likes" className="flex-1 font-semibold">
              Likes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            {posts.map((post) => (
              <div key={post.id} className="border-t-2 border-primary">
                <Post post={post} />
              </div>
            ))}
          </TabsContent>
          <TabsContent value="likes">
            {liked.map((post) => (
              <div key={post.id} className="border-t-2 border-primary">
                <Post post={post} />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
