import Timeline from "@/components/timeline";
import { getPosts } from "@/app/lib/data";
import Tracker from "@/components/tracker";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="w-full h-full flex flex-row justify-center pr-10">
      <div className="w-[600px] h-screen flex-col flex border-x-2 overflow-y-scroll border-primary no-scrollbar pt-10">
        <Timeline posts={posts} />
      </div>
      <div className="flex-1">
        <Tracker />
      </div>
    </div>
  );
}
