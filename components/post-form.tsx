"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createPost } from "@/app/lib/data";

const PostSchema = z.object({
  content: z.string().min(1).max(1000),
  beverage: z.string().min(1).max(50),
  location: z.string().min(1).max(150),
  recommend: z.boolean(),
});

export default function PostForm() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: "",
      beverage: "",
      location: "",
      recommend: true,
    },
  });

  function onSubmit(values: z.infer<typeof PostSchema>) {
    const formData = new FormData();
    formData.append("beverage", values.beverage);
    formData.append("content", values.content);
    formData.append("location", values.location);
    formData.append("recommend", values.recommend.toString());
    createPost(formData);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-6 text-xl h-10">New Post</Button>
      </DialogTrigger>
      <DialogContent className="top-1/3 min-w-[750px] bg-white">
        <DialogHeader>
          <DialogTitle>What&apos;s brewing?</DialogTitle>
          <DialogDescription>
            <span>Share your thoughts on your recent cup of coffee!</span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="beverage"
              render={({ field }) => (
                <FormItem className="flex flex-row space-x-2 items-center">
                  <FormLabel>Beverage</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter coffee beverage name..."
                      className="flex-1"
                      {...field}
                      maxLength={50}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex flex-row space-x-2 items-center">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Where'd you get your coffee?"
                      {...field}
                      maxLength={150}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recommend"
              render={({ field: { value, onChange } }) => (
                <FormItem className="flex flex-row space-x-2 items-center">
                  <FormLabel>Recommend?</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={value ? "yes" : "no"}
                      onValueChange={(val) => onChange(val === "yes")}
                    >
                      <ToggleGroupItem value="yes" aria-label="Toggle yes">
                        Yes
                      </ToggleGroupItem>
                      <ToggleGroupItem value="no" aria-label="Toggle no">
                        No
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="How is your cup of coffee?"
                      {...field}
                      maxLength={1000}
                      className="resize-none h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
