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
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          {/* SVG Diamond Logo */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path
              d="M12 2L2 12l10 10 10-10L12 2z"
              fill="currentColor"
            />
            {/* Inner diamond to match cursor logo */}
            <path d="M12 2L2 12l10 10 10-10L12 2z" fill="url(#paint0_linear)" />
            <defs>
              <linearGradient id="paint0_linear" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1A1A1A" />
                <stop offset="1" stopColor="#000000" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-xl font-bold tracking-tight">CURSOR</span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <Link href="#" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
          Product
        </Link>
        <Link href="#" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
          Enterprise
        </Link>
        <Link href="#" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
          Pricing
        </Link>
        <Link href="#" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
          Resources
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link href="#" className="hidden sm:inline-block text-sm font-medium text-black/80 hover:text-black transition-colors">
          Sign in
        </Link>
        <Button variant="outline" className="hidden sm:inline-flex rounded-full h-9 px-4">
          Contact sales
        </Button>
        <Button className="rounded-full h-9 px-5 bg-[#171717] hover:bg-black">
          Download
        </Button>
      </div>
    </header>
  );
}
