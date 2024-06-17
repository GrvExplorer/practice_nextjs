import { connectToDB } from "@/lib/database";
import Blog from "@/lib/database/models";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    await connectToDB();

    const { id, data } = await req.json();

    const updatePost = await Blog.findByIdAndUpdate(id, data);

    if (!updatePost) {
      return NextResponse.json({
        success: false,
        message: "Invalid Id.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Post update Successfully.",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Some thing went wrong ! Please try again.",
    });
  }
};
