"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { signUpAction } from "@/lib/server action";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function SignUp() {
  const { toast } = useToast();
  const router = useRouter()
  
  const signSchema = z.object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(4, "username must be at least 4 characters"),
    email: z
      .string({
        required_error: "email is required",
      })
      .email("email is required"),
    password: z
      .string({
        required_error: "Password is required",
      }),
      // .min(8, { message: "Password must be at least 8 characters" })
      // .regex(/[A-Z]/, {
      //   message: "Password must contain at least one uppercase letter",
      // })
      // .regex(/[0-9]/, { message: "Password must contain at least one number" })
      // .regex(/[a-z]/, {
      //   message: "Password must contain at least one lowercase letter",
      // }),
    confirmPassword: z
      .string()
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // Specify where the error message should be shown
      }),
  });
  const form = useForm<z.infer<typeof signSchema>>({
    resolver: zodResolver(signSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUpSubmit = async (formData: z.infer<typeof signSchema>) => {
    try {
      const { username, email, password } = formData;
      const { success, message } = await signUpAction({
        username,
        email,
        password,
      });

      if (success) {
        toast({
          title: message,
          description: "You can use the app now.",
        });
        router.push('/auth/sign-in')
      } else {
        toast({
          title: message,
          variant: 'destructive',
        });
      }

    } catch (error) {
      console.log(error);
      toast({
        title: "Not able to creating your account Please try again",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try Again</ToastAction>,
      });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-42 flex flex-col text-center">
        <div className="w-420 flex justify-center"></div>

        <h2 className="h3-bold md:h2-bold pt-5 text-2xl sm:pt-12 lg:text-4xl">
          Create a new account now
        </h2>
        <p className="small-medium md:base-regular text-light-3 mt-2">
          To use Blogs app enter your account{" "}
        </p>
      </div>
      <div className="flex-center mt-8 flex-col gap-8">
        <form
          className="flex flex-col gap-4"
          action=""
          onSubmit={form.handleSubmit(signUpSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Username</FormLabel>
                <FormControl className="text-md w-96 border-none bg-[#1c1c1c] text-white outline-none focus:border-transparent">
                  <Input
                    className="h-10 focus:border-none focus:outline-none"
                    placeholder="Username"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Email</FormLabel>
                <FormControl className="text-md w-96 border-none bg-[#1c1c1c] text-white outline-none focus:border-transparent">
                  <Input
                    className="h-10 focus:border-none focus:outline-none"
                    placeholder="Email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Password</FormLabel>
                <FormControl className="text-md w-96 border-none bg-[#1c1c1c] text-white outline-none focus:border-transparent">
                  <Input
                    className="h-10 focus:border-none focus:outline-none"
                    autoComplete="off"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Confirm Password</FormLabel>
                <FormControl className="text-md w-96 border-none bg-[#1c1c1c] text-white outline-none focus:border-transparent">
                  <Input
                    className="h-10 focus:border-none focus:outline-none"
                    placeholder="Confirm Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button className="mt-8 bg-purple-300 font-semibold" type="submit">
            {false ? "Loading..." : "Sign up"}
          </Button>
          <p className="text-center">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="tracking-wide text-blue-700 hover:underline"
            >
              Sign In
            </Link>{" "}
          </p>
        </form>
      </div>
    </Form>
  );
}

export default SignUp;
