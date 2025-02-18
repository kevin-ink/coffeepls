import Post from "@/components/post";
import Leftbar from "@/components/leftbar";

export default function Home() {
    return (
        <div className="max-w-screen h-screen flex flex-row bg-primary-foreground gap-x-8 justify-center">
            <div className="flex-1 flex flex-col justify-center items-end">
               <Leftbar/>
            </div>
            <div className="w-1/3 flex-col flex border-x-2 border-primary overflow-y-scroll no-scrollbar">
                <Post />
                <Post />
                <Post />
                <div className="mt-6 text-center text-gray-700">
                    You&apos;ve reached the end of the feed.
                </div>
            </div>
            <div className="flex-1">

            </div>
        </div>
    )
}