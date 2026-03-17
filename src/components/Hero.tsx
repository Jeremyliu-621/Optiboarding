"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full pt-[180px] pb-0 px-6 flex flex-col items-center">

      {/* Hero Content */}
      <div className="w-full max-w-[1300px] mx-auto flex flex-col items-start mb-[60px] z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] leading-[1.15] tracking-[-0.005em] font-bold text-black max-w-[700px]"
        >
          Code review that understands your entire codebase
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mt-8"
        >
          <button className="flex items-center gap-2 border border-[#e2e2e2] bg-white hover:bg-[#f8f8f8] text-black px-5 py-3 rounded-full text-[15px] font-medium transition-colors">
            Get Started — Free
          </button>
        </motion.div>
      </div>

      {/* PR Review Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative mt-12 mb-32 z-20"
      >
        <div className="rounded-[12px] border border-black/[0.06] bg-white shadow-2xl overflow-hidden w-full max-w-[1300px] mx-auto flex flex-col">
          {/* Browser Chrome */}
          <div className="h-10 bg-[#f3f3f3] border-b border-[#e2e2e2] flex items-center px-4 relative">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#d4d4d4]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#d4d4d4]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#d4d4d4]" />
            </div>
          </div>

          {/* PR Header */}
          <div className="px-6 md:px-8 py-4 md:py-5 border-b border-[#e2e2e2]">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-semibold text-[14px] md:text-[15px] text-black">refactor: rename getUserById to fetchUser</span>
              <span className="text-[10px] md:text-[11px] border border-green-200 text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-medium">Open</span>
            </div>
            <div className="text-[11px] md:text-[12px] text-[#878787] mt-1 font-mono">feature/auth-cleanup → main · 3 files changed</div>
          </div>

          {/* Diff Section */}
          <div className="px-6 md:px-8 py-4 border-b border-[#e2e2e2]">
            <div className="text-[11px] text-[#878787] font-mono mb-2">auth-service/src/users.ts</div>
            <div className="font-mono text-[11px] md:text-[12px] rounded border border-[#e5e5e5] overflow-hidden">
              <div className="bg-[#fff1f0] px-4 py-1.5 text-[#9d1c0f] border-l-[3px] border-red-300">
                - export async function getUserById(id: string) {'{'}
              </div>
              <div className="bg-[#f0fff1] px-4 py-1.5 text-[#1a7f37] border-l-[3px] border-green-300">
                + export async function fetchUser(id: string) {'{'}
              </div>
            </div>
          </div>

          {/* Optibot Review Comment */}
          <div className="px-6 md:px-8 py-5">
            <div className="flex gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#e46a3d] flex items-center justify-center text-white text-[10px] md:text-[11px] font-bold shrink-0">O</div>
              <div className="flex-1 border border-[#e2e2e2] rounded-lg overflow-hidden">
                <div className="px-4 py-2 bg-[#f8f8f8] border-b border-[#e2e2e2] flex items-center gap-2">
                  <span className="font-semibold text-[13px]">Optibot</span>
                  <span className="text-[10px] border border-[#d4d4d4] px-1.5 py-0.5 rounded text-[#878787] font-medium">Bot</span>
                </div>
                <div className="px-4 py-3">
                  <div className="font-semibold text-[13px] text-[#9a6700] mb-2">Breaking change detected</div>
                  <p className="text-[12px] md:text-[13px] text-[#333] mb-2">
                    <code className="text-[11px] bg-[#f5f5f5] border border-[#e5e5e5] px-1 py-0.5 rounded">getUserById</code> is imported by 3 downstream services:
                  </p>
                  <div className="font-mono text-[10px] md:text-[11px] text-[#666] space-y-0.5 mb-2 pl-3 border-l-2 border-[#e2e2e2]">
                    <div>billing-service/src/charges.ts:42</div>
                    <div>notifications/src/alerts.ts:17</div>
                    <div>admin-api/src/users.ts:8</div>
                  </div>
                  <p className="text-[12px] md:text-[13px] text-[#333]">These imports will fail after this rename.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Background Gradient */}
    </section>
  );
}
