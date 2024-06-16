import { connectToDB } from "@/lib/database";
import Blog from "@/lib/database/models";
import { NextResponse } from "next/server";
import { z } from "zod";

const AddPostValidate = z.object({
  title: z.string(),
  description: z.string(),
});

export const POST = async (req: any) => {
  try {
    await connectToDB();

    // grad the data from request
    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;
    

    // validate and res with error
    const { success, error } = AddPostValidate.safeParse({
      title,
      description,
    });
    if (!success) {
      return NextResponse.json({
        success: false,
        error: error.message,
      });
    }

    // Right data then add to database And response
    const createBlog = await Blog.create(extractBlogData);

    if (createBlog) {
      return NextResponse.json({
      success: true,
      message: 'Blog added successfully.'
    }) }else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong ! Please try again",
      });
    }
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Some thing went wrong. ! Please try again. ",
    });
  }
};
