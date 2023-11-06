"use client";
import Heading from "@/components/heading";
import { MessageSquare, Video, VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
const VideoGenerationPage = () => {
  const [video, setVideo] = useState<string>();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      const response = await axios.post("/api/video", values);
      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      // Premium Model
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="text-white">
      <Heading
        title="Video Generation"
        description="Build Amazing videos with Goku Video AI feature"
        icon={VideoIcon}
        iconColor="text-orange-500"
        bgColor="bg-orange-50"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" rounded-lg 
              border
              border-slate-200
              bg-slate-200 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm 
              grid 
              grid-cols-12 
              gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className=" bg-slate-200 text-gray-800 outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        disabled={isLoading}
                        placeholder="Horse Dancing Video"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 text-md lg:col-span-2 w-full font-bold"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg  w-full flex items-center justify-center">
              <Loader />
            </div>
          )}
          {!video && !isLoading && <Empty label="No Video Generated" />}
          {video && (
            <video
              className="w-full aspect-video mt-8 rounded-lg border bg-black"
              controls
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGenerationPage;
