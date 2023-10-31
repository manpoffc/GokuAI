"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
const monserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-red-500",
  },

  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-violet-500",
  },

  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-amber-500",
  },

  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-pink-500",
  },

  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-emerald-500",
  },

  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "",
  },
];

const SideBar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 bg- text-slate-800 py-4 flex flex-col h-full">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-12 h-12 mr-4">
            <Image fill alt="logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", monserrat.className)}>
            Goku AI
          </h1>
        </Link>
        <div className="space-y-4">
          {routes.map((route) => (
            <Link
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-gray-800 hover:bg-slate-900/10 hover:scale-110 rounded-lg transition",
                pathname === route.href
                  ? "bg-slate-900/10 text-gray-800 font-semibold"
                  : ""
              )}
              key={route.href}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
