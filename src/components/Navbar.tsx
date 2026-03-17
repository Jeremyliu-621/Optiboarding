"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 transition-all duration-300",
        scrolled ? "bg-white/70 backdrop-blur-md border-b border-[#e2e2e2]" : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 rounded-[5px] bg-[#e46a3d]" />
        <span className="text-[17px] font-bold tracking-tight">Optimal AI</span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <Link href="#" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
          Optibot
        </Link>
        <Link href="#" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
          Insights
        </Link>
        <Link href="#" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
          Pricing
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link href="#" className="hidden sm:inline-block text-sm font-medium text-black/80 hover:text-black transition-colors">
          Sign in
        </Link>
        <Button className="rounded-full h-9 px-5 bg-[#171717] hover:bg-black">
          Get a Demo
        </Button>
      </div>
    </header>
  );
}
