import { Button } from "./ui/button"

export default function Leftbar() {
    return (
        <div className="w-1/2 h-screen py-10 bg-primary-foreground flex flex-col">
            <div className="flex flex-1 flex-col items-start">
                <Button variant="ghost" className="text-3xl">Coffee Please!</Button>
                <div>

                </div>
            </div>
            <Button className="mt-6 text-xl h-10">New Post</Button>
            <span className="text-xl mt-6">Username</span>
        </div>
    )
}