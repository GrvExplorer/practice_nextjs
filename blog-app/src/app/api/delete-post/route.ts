import { connectToDB } from "@/lib/database";
import Blog from "@/lib/database/models";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    await connectToDB();

    const { id } = await req.json();

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({
        success: false,
        message: "Invalid Id.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Post deleted Successfully.",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Some thing went wrong ! Please try again.",
    });
  }
};
