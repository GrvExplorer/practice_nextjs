"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { fetchUserAuthToken, logoutUser } from "@/lib/server action";
import { useRouter } from "next/navigation";
import React from "react";

function BlogUserAvatar({ user }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    const { success, message } = await logoutUser();
    if (success) {
      toast({
        title: message,
      });
      router.push('/auth/sign-in')
    } else {
      toast({
        title: message,
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Details</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{user?._id}</DropdownMenuItem>
        <DropdownMenuItem>{user?.username}</DropdownMenuItem>
        <DropdownMenuItem>{user?.email}</DropdownMenuItem>
        <DropdownMenuItem>
          <Button onClick={handleLogout}>Logout</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default BlogUserAvatar;
