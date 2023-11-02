"use client";
import Heading from "@/components/heading";
import { Code, MessageSquare } from "lucide-react";
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

import Markdown from "react-markdown";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
const CodePage = () => {
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);
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
      const userMessage: ChatCompletionMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/code", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);
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
        title="Code Generation"
        description="Generate Code with Goku AI"
        icon={Code}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-50"
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
                        placeholder="Generate Todo List with react."
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
          {messages.length === 0 && !isLoading && (
            <Empty label="No Conversation Started" />
          )}
          <div className="flex flex-col-reverse gap-y-4 text-gray-800">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-center gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-slate-600/70 text-white"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <Markdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-slate-200 text-gray-800  p-8 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code
                        className="bg-slate-200 text-gray-800 rounded-lg p-1"
                        {...props}
                      />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message.content}
                </Markdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
