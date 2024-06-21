import { getAllBlogs } from "@/lib/api call";
import { fetchUserAuthToken } from "@/lib/server action";
import { fetchAllPosts } from "@/lib/server action/data";
import React from "react";
import BlogUserAvatar from "../ui/BlogUserAvatar";
import Popup from "../ui/Dialog";
import { HoverEffect } from "../ui/card-hover-effect";
import { redirect } from "next/navigation";

async function Blogs() {
  const { blogList, success } = await fetchAllPosts();
  const { user } = await fetchUserAuthToken();

  if (!user) {
    redirect('/auth/sign-in')
  }

  return (
    <div>
      <div className="flex py-4 px-2 items-center justify-between mb-16 border-b">
        <h1 className="flex gap-8 text-4xl font-bold">
          BLOG <span>POSTS</span>
        </h1>
        <div className="">
          <BlogUserAvatar user={user} />
        </div>
      </div>

      <div className="mx-auto mb-16 flex max-w-5xl gap-8 px-8 text-4xl font-bold">
        <Popup type="add" />
      </div>

      {blogList && blogList.length > 0 && success ? (
        <div className="mx-auto max-w-5xl px-8">
          <HoverEffect items={blogList} />
        </div>
      ) : (
        <p className="text-3xl font-extrabold">No Blog found! Please add one</p>
      )}
    </div>
  );
}

export default Blogs;
