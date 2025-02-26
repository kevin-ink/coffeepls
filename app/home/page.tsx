import Timeline from "@/components/timeline";
import { getPosts } from "@/app/lib/data";
import SideNav from "@/components/sidenav";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="flex-1 flex justify-end">
        <SideNav />
      </div>
      <div className="w-[600px] flex-col flex border-x-2 border-primary overflow-y-scroll no-scrollbar">
        <Timeline posts={posts} />
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
