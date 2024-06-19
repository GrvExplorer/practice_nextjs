import { getAllBlogs } from "@/lib/api call";
import { fetchAllPosts } from "@/lib/server action/data";
import React from "react";
import Popup from "../ui/Dialog";
import { HoverEffect } from "../ui/card-hover-effect";

async function Blogs() {
  const { blogList, success } = await fetchAllPosts();

  return (
    <div>
      <h1 className="mb-16 flex justify-center gap-8 border-b text-4xl font-bold">
        BLOG <span>POSTS</span>
      </h1>

      <div className="mx-auto mb-16 flex max-w-5xl gap-8 px-8 text-4xl font-bold">
        <Popup type="add" />
      </div>

      {blogList && blogList.length > 0  && success ? (
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
