"user client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    bgColor: "bg-violet-500/10",
    color: "text-violet-500",
  },

  {
    label: "Video Generation",
    icon: VideoIcon,
    bgColor: "bg-amber-500/10",
    href: "/video",
    color: "text-amber-500",
  },

  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    bgColor: "bg-pink-500/10",
    color: "text-pink-500",
  },

  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    bgColor: "bg-emerald-500/10",
    color: "text-emerald-500",
  },
];
export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl p-2 md:text-4xl text-white font-bold text-center">
          Experience the AI with Goku
        </h2>
        <p className="text-muted-foreground text-white font-light text-sm md:text-lg text-center">
          Chat with Goku himself- He knows it all.
        </p>
      </div>
      <div className="px-4 md:px-16 lg:px-30 space-y-4">
        {tools.map((tool) => (
          <Card
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between
             hover:scale-110 transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                {<tool.icon className={cn("w-8 h-8", tool.color)} />}
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}
