"use server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { connectToDB } from "../database";
import Blog, { User } from "../database/models";

const AddPostValidate = z.object({
  title: z.string(),
  description: z.string(),
});

// Blog Actions
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
    await connectToDB();

    const updated = await Blog.findByIdAndUpdate(id, formData);

    if (updated) {
      revalidatePath("/blogs", "page");
      return {
        success: true,
        message: "Blog Post Updated Successfully.",
      };
    }

    return {
      success: false,
      message: "Not able to update your post.",
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      message: "Some thing went wrong.",
      success: false,
    };
  }
};

// Auth Actions
export const signUpAction = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    await connectToDB();

    const { username, email } = data;

    const userName = await User.findOne({ username });

    const userEmail = await User.findOne({ email });
    if (userName || userEmail) {
      return {
        success: false,
        message: "User Already Exist",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    const createUser = await User.create({
      ...data,
      password: hashPassword,
    });

    if (createUser) {
      return {
        success: true,
        message: "Now You Can Sign In to your account",
        user: JSON.parse(JSON.stringify(createUser)),
      };
    } else {
      return {
        success: false,
        message: "No able to create your account ! Please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some thing went wrong ! Please try again.",
    };
  }
};

export const signInAction = async (data: {
  username: string;
  password: string;
}) => {
  try {
    await connectToDB();

    const { username, password } = data;

    const user = await User.findOne({ username });

    if (!user) {
      return {
        success: false,
        message: "You need to first sign up",
      };
    }

    const checkPass = await bcrypt.compare(password, user.password);

    if (checkPass) {
      const { _id, email } = user;
      const token = jwt.sign(
        {
          username,
          _id,
          email,
        },
        process.env.JWT_SECRET || "",
        {
          expiresIn: "7d",
        },
      );

      const setCookies = cookies();
      setCookies.set("token", token);

      return {
        success: true,
        message: "Now You Can Use Your app",
      };
    } else {
      return {
        success: false,
        message: "Enter valid password.",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some thing went wrong ! Please Try again",
    };
  }
};

export const fetchUserAuthToken = async () => {
  try {
    await connectToDB();

    const getCookies = cookies();
    const token = getCookies.get("token")?.value;

    if (token) {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET || "");
      if (decodeToken) {
        const { _id } = decodeToken;
        const user = await User.findOne({ _id });
        if (user) {
          return {
            success: true,
            user: JSON.parse(JSON.stringify(user)),
            message: "Successfully loaded user",
          };
        } else {
          return {
            success: false,
            message: "User Not Found!",
          };
        }
      }
      return {
        success: false,
        message: "No able to decode token",
      };
    } else {
      return {
        success: false,
        message: "Token is Invalid!",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some thing went wrong ! Please Try again",
    };
  }
};

export const logoutUser = async () => {
  try {
    const rmCookies = cookies();
    const token = rmCookies.delete("token");

    console.log(token);

    if (!token) {
      return {
        success: true,
        message: "You have been logout",
      };
    } else {
      return {
        success: false,
        message: "Not able to logout",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some thing went wrong ! Please Try again",
    };
  }
};
