"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-[180px] pb-0 px-6 max-w-[1280px] mx-auto flex flex-col items-center">

      {/* Hero Content */}
      <div className="w-full flex flex-col items-start mb-[60px] z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[0.5rem] sm:text-[1rem] md:text-[1.5rem] lg:text-[2rem] leading-[1.1] tracking-[-0.02em] font-medium text-black max-w-[800px]"
        >
          Built to make you extraordinarily productive,<br className="hidden md:block" />
          Cursor is the best way to code with AI.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <button className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-black text-white px-5 py-3 rounded-full text-[15px] font-medium transition-colors shadow-sm">
            Download for Windows
            <ArrowDownToLine className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Floating IDE Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative mt-12 mb-32 z-20"
      >
        <div className="rounded-[1rem] border border-[#e2e2e2] bg-white shadow-2xl overflow-hidden aspect-[16/10] md:aspect-[16/9] w-full max-w-[1200px] mx-auto flex flex-col">
          {/* Mockup Header */}
          <div className="h-12 bg-[#f3f3f3] border-b border-[#e2e2e2] flex items-center px-4 relative">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 text-xs font-medium text-black/40">
              Cursor
            </div>
          </div>

          {/* Mockup Body */}
          <div className="flex flex-1 overflow-hidden bg-white">
            {/* Sidebar */}
            <div className="w-64 bg-[#f8f8f8] border-r border-[#e2e2e2] flex flex-col p-2">
              <div className="px-3 py-2 text-xs font-bold text-black/50 tracking-wider">IN PROGRESS 2</div>
              <div className="px-3 py-2 flex items-center gap-2 text-sm text-black">
                <div className="w-1 h-1 rounded-full bg-black/30" />
                Analyze Tab vs Agent
              </div>
              <div className="px-3 py-2 flex items-center gap-2 text-sm text-black/50">
                <div className="w-1 h-1 rounded-full bg-black/20" />
                Plan Mission Control
              </div>

              <div className="mt-6 px-3 py-2 text-xs font-bold text-black/50 tracking-wider">READY FOR REVIEW 4</div>
              <div className="px-3 py-2 flex items-center gap-2 text-sm text-black">
                <svg className="w-4 h-4 text-black/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Build Landing Page
              </div>
              <div className="px-3 py-2 flex items-center gap-2 text-sm text-black/50">
                <svg className="w-4 h-4 text-black/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                PyTorch MNIST
              </div>
            </div>
            {/* Editor Area */}
            <div className="flex-1 bg-white p-8 overflow-hidden relative font-mono text-sm">
              <div className="text-black/80">
                <span className="text-blue-600">import</span> React <span className="text-blue-600">from</span> <span className="text-green-600">'react'</span>;
              </div>
              <div className="text-black/80 mt-2">
                <span className="text-blue-600">export default function</span> <span className="text-purple-600">LandingPage</span>() {'{'}
              </div>
              <div className="text-black/80 ml-4 mt-2">
                <span className="text-blue-600">return</span> (
              </div>
              <div className="text-black/80 ml-8 mt-2">
                {'<'}div className=<span className="text-green-600">"min-h-screen bg-white"</span>{'>'}
              </div>
              <div className="text-black/80 ml-12 mt-2">
                {'<'}Hero /{'>'}
              </div>
              <div className="text-black/80 ml-8 mt-2">
                {'<'}//div{'>'}
              </div>
              <div className="text-black/80 ml-4 mt-2">
                );
              </div>
              <div className="text-black/80 mt-2">
                {'}'}
              </div>

              {/* AI Input Overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[600px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#e2e2e2] p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2 text-sm text-black">
                  <span className="font-medium bg-[#f2f2f2] px-2 py-1 rounded text-xs">Cmd K</span>
                  <span className="opacity-60">Generate a stunning landing page hero</span>
                </div>
                <div className="h-1 w-full bg-[#f8f8f8] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
                    className="h-full bg-black"
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </motion.div>

      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[#f8f8f8] -z-10" />
    </section>
  );
}
