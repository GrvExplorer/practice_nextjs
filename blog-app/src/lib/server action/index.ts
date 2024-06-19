"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectToDB } from "../database";
import Blog from "../database/models";

const AddPostValidate = z.object({
  title: z.string(),
  description: z.string(),
});

export const createPostAction = async (data: {
  title: string;
  description: string;
}) => {
  try {
    await connectToDB();

    const { title, description } = data;

    const { success, error } = AddPostValidate.safeParse({
      title,
      description,
    });
    if (!success && error) {
      return {
        success,
        error,
        message: "Enter a valid Details.",
      };
    }

    const created = await Blog.create(data);
    if (created) {
      revalidatePath("/blogs", "page");
      return {
        success,
        message: "Blog Post Created Successfully.",
      };
    }

    return {
      success: false,
      message: "No able to create post ! Please try again.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some Thing went wrong.",
      error: error,
    };
  }
};

export const deletePostAction = async (_id: string) => {
  try {
    await connectToDB();

    const deletedBlog = await Blog.findByIdAndDelete(_id);

    if (deletedBlog) {
      revalidatePath("/blogs", "page");
      return {
        success: true,
        message: "Deleted Post successfully.",
      };
    }

    return {
      success: false,
      message: "No able to delete your post.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some thing went wrong.",
      error,
    };
  }
};

export const editPostAction = async (
  id: string,
  formData: {
    title: string;
    description: string;
  },
) => {
try {

  await connectToDB()

  const updated = await Blog.findByIdAndUpdate(id, formData)

  if (updated) {
    revalidatePath('/blogs', 'page')
    return {
      success: true,
      message: 'Blog Post Updated Successfully.'
    }
  }

  return {
    success: false,
    message: 'Not able to update your post.'
  }

} catch (error) {
  console.log(error);
  return { 
    error,
    message: 'Some thing went wrong.',
    success: false,
  }
  
}

};
