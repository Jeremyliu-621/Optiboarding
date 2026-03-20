"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center w-full transition-all duration-300 px-6"
      )}
      style={{ backgroundColor: "var(--bg-deep)" }}
    >
      <div className="flex h-12 w-full max-w-[1300px] items-center justify-between">
        <div className="flex items-center gap-0.75">
          <Image src="/optimalaismalllogo.png" alt="Optimal AI" width={25} height={25} className="rounded shrink-0" />
          <span className="text-[18px] leading-none mt-[2px] font-normal tracking-[-0.02em] text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>Optimal AI</span>
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
          <button
            onClick={() => session ? window.location.href = "/dashboard" : signIn("github")}
            className="hidden sm:inline-block text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            Sign in
          </button>
          <Button
            onClick={() => session ? window.location.href = "/dashboard" : signIn("github")}
            className="rounded-full h-9 px-5 bg-[var(--text-primary)] hover:bg-white text-[var(--bg-deep)] cursor-pointer"
          >
            Get a Demo
          </Button>
        </div>
      </div>
    </header>
  );
}
