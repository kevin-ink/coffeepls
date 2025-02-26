import PostForm from "./post-form";
import { Button } from "./ui/button";
import Link from "next/link";
import { getUsername } from "@/app/lib/data";
import { Coffee, House, UserRound, CircleUser } from "lucide-react";

export default async function SideNav() {
  const username = await getUsername();

  return (
    <div className="py-10 h-screen">
      <div className="h-full hidden w-auto mx-8 lg:flex flex-col">
        <div className="flex flex-col justify-start flex-grow">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-3xl xl:text-4xl [&_svg]:size-8 xl:[&_svg]:size-12 py-6 mb-6"
            >
              <Coffee className="fill-primary" />
              coffeepls
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="ghost"
              className="text-xl xl:text-2xl [&_svg]:size-8 xl:[&_svg]:size-10 py-6"
            >
              <House />
              Home
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="ghost"
              className="text-xl xl:text-2xl [&_svg]:size-8 xl:[&_svg]:size-10 py-6"
            >
              <UserRound />
              Profile
            </Button>
          </Link>
        </div>
        <PostForm />
        <span className="text-xl mt-6">{username}</span>
      </div>
      <div className="h-full lg:hidden w-auto mx-6 flex flex-col">
        <div className="flex-1 flex flex-col space-y-4 items-start">
          <Link href="/">
            <Button variant="ghost" className="[&_svg]:size-10 py-6">
              <House />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="[&_svg]:size-10 py-6">
              <Coffee />
            </Button>
          </Link>
        </div>
        <PostForm variant="compact" />
        <Link href="/">
          <Button variant="ghost" className="[&_svg]:size-10 py-6 mt-4">
            <CircleUser />
          </Button>
        </Link>
      </div>
    </div>
  );
}
