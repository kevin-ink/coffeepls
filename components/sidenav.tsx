"use client";

import PostForm from "./post-form";
import { Button } from "./ui/button";
import Link from "next/link";
import { logout } from "@/app/actions";
import { Coffee, House, UserRound, CircleUser, LogOut } from "lucide-react";
import { useAppDispatch } from "@/app/hooks";

export default function SideNav({ username }: { username: string }) {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch({
      type: "likes/resetLikes",
    });
    logout();
  };

  return (
    <div className="py-10 h-full flex flex-col items-end">
      <div className="h-full hidden lg:flex lg:flex-col w-fit mx-8 ">
        <div className="flex flex-col justify-start flex-grow">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-4xl [&_svg]:size-12 py-6 mb-6"
            >
              <Coffee className="fill-primary" />
              coffeepls
            </Button>
          </Link>
          <Link href="/" className="w-fit">
            <Button variant="ghost" className="text-2xl [&_svg]:size-10 py-6">
              <House />
              Home
            </Button>
          </Link>
          <Link href={`/${username}`} className="w-fit">
            <Button variant="ghost" className="text-2xl [&_svg]:size-10 py-6">
              <UserRound />
              Profile
            </Button>
          </Link>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-2xl [&_svg]:size-10 py-6 w-fit"
          >
            <LogOut />
            Logout
          </Button>
        </div>
        <PostForm />
        <span className="text-xl mt-6">{username}</span>
      </div>
      <div className="h-full flex flex-col lg:hidden w-auto mx-6">
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
          <Link href="/">
            <Button variant="ghost" className="text-2xl [&_svg]:size-10 py-6">
              <LogOut />
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
