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
import { signInAction } from "@/lib/server action";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function SignIn() {

  const { toast } = useToast()
  const router = useRouter()

  const signSchema = z.object({
    username: z
      .string({
        required_error: "username is required",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, { message: "Please enter your password" }),
  });

  const form = useForm<z.infer<typeof signSchema>>({
    resolver: zodResolver(signSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const signInSubmit = async (formData: z.infer<typeof signSchema>) => {

    try {
      const { username,  password } = formData;
      const { success, message } = await signInAction({
        username,
        password,
      });

      if (success) {
        toast({
          title: message,
        });
        router.push('/blogs')
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
      <div className="flex-center flex-col gap-8">
        <div className="sm:w-42 flex flex-col text-center">
          <div className="flex w-96 justify-center"></div>
          <h2 className="h3-bold md:h2-bold pt-5 text-xl sm:pt-12 md:text-2xl">
            Log in to your account
          </h2>
          <p className="small-medium md:base-regular text-light-3 mt-2">
            Welcome back! enter your details{" "}
          </p>
        </div>

        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={form.handleSubmit(signInSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl className="text-md border-none bg-[#1c1c1c] text-white h-10">
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your username"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl className="text-md border-none bg-[#1c1c1c] text-white h-10">
                  <Input
                    {...field}
                    type="password"
                    autoComplete="off"
                    placeholder="Enter your password"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-10 bg-purple-300">
            {false ? "Loading..." : "Sign In"}
          </Button>
          <p className="text-center">
            Don't have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="tracking-wide text-blue-700 hover:underline"
            >
              Sign Up
            </Link>{" "}
          </p>
        </form>
      </div>
    </Form>
  );
}

export default SignIn;
