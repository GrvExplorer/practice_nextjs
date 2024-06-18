import { connectToDB } from "@/lib/database";
import Blog from "@/lib/database/models";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' 

export const GET = async () => {
  try {
    await connectToDB();

    const blogs = await Blog.find({});
    if (blogs) {
      return NextResponse.json({
        success: true,
        message: "Got all post available",
        data: blogs,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No Blog post found in collection.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again.",
    });
  }
};
