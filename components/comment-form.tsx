"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { createComment } from "@/app/lib/data";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  content: z
    .string()
    .min(2, { message: "Comment must be at least 2 characters long" })
    .max(500, { message: "Comment cannot exceed 500 characters" }),
});

export default function CommentForm({ post_id }: { post_id: number }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("content", values.content);
    formData.append("post_id", post_id.toString());
    createComment(formData);
    router.refresh();
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pb-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Leave a comment..." {...field} />
              </FormControl>
              <FormDescription>Please be respectful.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Post</Button>
        </div>
      </form>
    </Form>
  );
}
