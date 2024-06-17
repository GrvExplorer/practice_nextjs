"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { addPost } from "@/lib/api call";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cross2Icon } from "@radix-ui/react-icons";
import { revalidatePath } from "next/cache";
import { useForm } from "react-hook-form";
import { z } from "zod";

function Popup({ type }: { type: "edit" | "add" }) {
  const withType = type == "add";

  const { toast } = useToast();

  const formSchema = z.object({
    title: z.string().min(4, {
      message: "Title must be at least 4 characters.",
    }),
    description: z.string().min(8, {
      message: "Title must be at least 8 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    console.log(formData);
    const { title, description } = formData;
    try {
      const { success, message } = await addPost({
        title,
        description,
      });
      if (success) {
        form.reset({
          title: "",
          description: "",
        });

        toast({
          title: message,
          variant: "default",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Some thing went wrong.",
        variant: "destructive",
      });
    }
    // revalidatePath("/blogs");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="relative bg-white p-[3px] py-5 hover:bg-white">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
          <div className="group relative rounded-[6px] bg-black px-8 py-2 text-white transition duration-200 hover:bg-transparent">
            {withType ? "Add Post" : "Edit Post"}
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>{withType ? "Add Post" : "Edit Post"}</DialogTitle>

              <DialogDescription>
                {withType
                  ? "Fill the details and create the post using create."
                  : "Make changes to your post here. Click save when you're done"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col pl-12">
                    <div className="flex items-center gap-4">
                      <FormLabel className="text-right">Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter title"
                          className=""
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-end" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <FormLabel className="text-right">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          cols={10}
                          className=""
                          placeholder="please enter description"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-end" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => {
                  form.reset({
                    title: "",
                    description: "",
                  });
                  form.clearErrors(["description", "title"]);
                }}
                variant={"outline"}
              >
                Clear
              </Button>
              <Button type="submit">
                {withType ? "Create Post" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <DialogClose
          onClick={() => {
            form.reset({
              title: "",
              description: "",
            });
            form.clearErrors(["description", "title"]);
          }}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <Cross2Icon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default Popup;
