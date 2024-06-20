import { Document, ObjectId } from "mongoose";
import { connectToDB } from "../database";
import Blog from "../database/models";

interface BlogDocument extends Document {
  _id: ObjectId;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

type plainBlogsType = {
  title: string;
  description: string;
  _id: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export const fetchAllPosts = async () => {
  'use server'
  try {
    await connectToDB();

    const blogs : BlogDocument[] = await Blog.find({});

    if (blogs) {
      // const plainBlogs : plainBlogsType[] = blogs.map(blog => ({
      //   _id: blog._id.toString(),
      //   title: blog.title,
      //   description: blog.description,
      //   createdAt: blog.createdAt ? blog.createdAt.toISOString() : null,
      //   updatedAt: blog.updatedAt ? blog.updatedAt.toISOString() : null,
      // }));
      return {
        success: true,
        message: "Got all post available",
        blogList: JSON.parse(JSON.stringify(blogs))
      };
    }

    return {
      success: false,
      message: "No Blog post found in collection.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong ! Please try again.",
    };
  }
};
