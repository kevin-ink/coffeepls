import Post from "@/components/post";

export default function Homepage() {
    return (
        <div className="max-w-full w-screen min-h-screen h-auto flex flex-row bg-primary-foreground">
            <div className="flex-1 flex flex-col justify-center items-center">
                
            </div>
            <div className="w-1/3 flex-col flex border-x-2 border-primary">
                <Post />
                <Post />
                <Post />
            </div>
            <div className="flex-1">

            </div>
        </div>
    )
}