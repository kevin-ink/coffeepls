import PostDetail from "@/components/post-detail";
import { getPostById } from "@/app/lib/data";

type Params = Promise<{ post_id: string }>;

export default async function PostDetailPage({ params }: { params: Params }) {
  const { post_id } = await params;
  const post = await getPostById(parseInt(post_id));

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[600px] flex-col flex border-x-2 border-primary overflow-y-scroll no-scrollbar">
        {post ? <PostDetail post={post} /> : <div>Post not found</div>}
      </div>
      <div className="flex-1" />
    </div>
  );
}
