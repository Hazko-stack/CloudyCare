import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBook2,
  IconTreadmill,
  IconUserCircle,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/home",
    },
    {
      title: "Exercise",
      icon: (
        <IconTreadmill className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/exercise",
    },
    {
      title: "Article",
      icon: (
        <IconBook2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/article",
    },
    {
      title: "Aceternity UI",
      icon: (
        <img
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo" 
        />
      ),
      href: "#",
    },
    {
      title: "Profile",
      icon: (
        <IconUserCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 border border-gray-500 rounded-full p-1 bg-white/90 backdrop-blur-sm">
      <FloatingDock
        items={links} 
      />
    </div>
  );
}