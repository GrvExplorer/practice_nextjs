import { connectToDB } from "../database";
import Blog from "../database/models";

export const fetchAllPosts = async () => {
  try {
    await connectToDB();

    const blogs = await Blog.find({});

    if (blogs) {
      const plainBlogs = blogs.map(blog => ({
        id: blog._id.toString(),
        title: blog.title,
        description: blog.description,
        createdAt: blog.createdAt ? blog.createdAt.toISOString() : null,
        updatedAt: blog.updatedAt ? blog.updatedAt.toISOString() : null,
      }));
      return {
        success: true,
        message: "Got all post available",
        blogList: plainBlogs,
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
