"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center w-full transition-all duration-300 px-6 border-b border-[var(--border-subtle)]"
      )}
      style={{ backgroundColor: "var(--bg-deep)" }}
    >
      <div className="flex h-12 w-full max-w-[1300px] items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-[5px] bg-[#e46a3d]" />
          <span className="text-[17px] font-bold tracking-tight text-[var(--text-primary)]">Optimal AI</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Optibot
          </Link>
          <Link href="#" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Insights
          </Link>
          <Link href="#" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="#" className="hidden sm:inline-block text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Sign in
          </Link>
          <Button className="rounded-full h-9 px-5">
            Get a Demo
          </Button>
        </div>
      </div>
    </header>
  );
}
