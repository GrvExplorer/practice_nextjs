"use client";
import { DialogTrigger } from "@/components/ui/dialog";
import { deletePost } from "@/lib/api call";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Popup from "./Dialog";
import { useToast } from "@/components/ui/use-toast";
import { deletePostAction } from "@/lib/server action";
export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    _id: string;
    createdAt: string | null;
    updatedAt: string | null;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { toast } = useToast()

  const handleDelete = async (_id:string) => {
    try {
      const { success, message } = await deletePostAction(_id)
      if (success) {
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
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.title + idx}
          className="group relative block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-3xl bg-red-300 dark:bg-slate-800/[0.8]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>

            <div className="mt-4 flex justify-between gap-4">
              <Popup
                type="edit"
                id={item._id}
                data={{ title: item.title, description: item.description }}
              />
              <button
                onClick={() => handleDelete(item._id)}
                className="rounded-md border-2 border-transparent bg-red-500 px-8 py-2 font-bold text-white transition duration-200 hover:border-red-500 hover:bg-white hover:text-black"
              >
                Delete
              </button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full w-full overflow-hidden rounded-2xl border border-transparent bg-black p-4 group-hover:border-slate-700 dark:border-white/[0.2]",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("mt-4 font-bold tracking-wide text-zinc-100", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-sm leading-relaxed tracking-wide text-zinc-400",
        className,
      )}
    >
      {children}
    </p>
  );
};
