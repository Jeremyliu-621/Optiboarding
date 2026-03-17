"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BeatId = 0 | 1 | 2 | 3 | 4;

const BEAT_DURATION = 2800;
const LOOP_PAUSE = 1500;
const TRANSITION = { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const };

function StatusBadge({ beat }: { beat: BeatId }) {
  if (beat <= 1) {
    return (
      <span className="text-[10px] md:text-[11px] border border-green-200 text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-medium">
        Open
      </span>
    );
  }
  if (beat <= 3) {
    return (
      <span className="text-[10px] md:text-[11px] border border-amber-200 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
        Changes requested
      </span>
    );
  }
  return (
    <span className="text-[10px] md:text-[11px] border border-purple-200 text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-medium">
      Merged
    </span>
  );
}

function Beat0() {
  return (
    <div className="px-6 md:px-8 py-5 space-y-4">
      <div className="flex items-start gap-2.5">
        <div className="w-5 h-5 rounded-full bg-green-100 border border-green-200 flex items-center justify-center shrink-0 mt-0.5">
          <div className="w-2 h-2 rounded-full bg-green-600" />
        </div>
        <div className="text-[13px]">
          <span className="font-semibold text-black">drmaeur</span>
          <span className="text-[#878787]"> opened this pull request · 2 minutes ago</span>
        </div>
      </div>
      <div className="border border-[#e2e2e2] rounded-lg overflow-hidden">
        <div className="px-4 py-2 bg-[#f8f8f8] border-b border-[#e2e2e2] text-[11px] flex items-center justify-between">
          <span className="font-semibold text-black">Files changed</span>
          <span className="text-[#878787] font-mono">3 files · +6 −4</span>
        </div>
        {[
          { file: "auth-service/src/users.ts", added: 3, removed: 2 },
          { file: "auth-middleware.ts", added: 1, removed: 1 },
          { file: "tests/auth.test.ts", added: 2, removed: 1 },
        ].map((f) => (
          <div
            key={f.file}
            className="px-4 py-2 border-b last:border-b-0 border-[#e2e2e2] flex items-center gap-3"
          >
            <span className="font-mono text-[11px] text-[#333] flex-1">{f.file}</span>
            <span className="text-[11px] text-green-600 font-mono font-medium">+{f.added}</span>
            <span className="text-[11px] text-red-500 font-mono font-medium">−{f.removed}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Beat1() {
  return (
    <div className="px-6 md:px-8 py-5 space-y-4">
      <div>
        <div className="text-[11px] text-[#878787] font-mono mb-2">
          auth-service/src/users.ts
        </div>
        <div className="font-mono text-[11px] rounded border border-[#e5e5e5] overflow-hidden">
          <div className="bg-[#fff1f0] px-4 py-1.5 text-[#9d1c0f] border-l-[3px] border-red-300">
            {"- export async function getUserById(id: string) {"}
          </div>
          <div className="bg-[#f0fff1] px-4 py-1.5 text-[#1a7f37] border-l-[3px] border-green-300">
            {"+ export async function fetchUser(id: string) {"}
          </div>
        </div>
      </div>
      <div className="border border-[#e2e2e2] rounded-lg overflow-hidden">
        <div className="px-4 py-2 bg-[#f8f8f8] border-b border-[#e2e2e2] text-[11px] font-semibold text-[#878787]">
          Checks
        </div>
        <div className="px-4 py-3 flex items-center gap-2.5">
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#e46a3d] animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <div className="w-4 h-4 rounded-full bg-[#e46a3d] flex items-center justify-center text-white text-[7px] font-bold shrink-0">
            O
          </div>
          <span className="text-[12px] font-semibold text-black">agent-optibot</span>
          <span className="text-[12px] text-[#878787]">· Analyzing cross-repo dependencies</span>
        </div>
      </div>
    </div>
  );
}

function Beat2() {
  return (
    <div className="px-6 md:px-8 py-5">
      <div className="flex gap-3">
        <div className="w-7 h-7 rounded-full bg-[#e46a3d] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
          O
        </div>
        <div className="flex-1 border border-[#e2e2e2] rounded-lg overflow-hidden">
          <div className="px-4 py-2 bg-[#f8f8f8] border-b border-[#e2e2e2] flex items-center gap-2">
            <span className="font-semibold text-[12px]">Optibot</span>
            <span className="text-[10px] border border-[#d4d4d4] px-1.5 py-0.5 rounded text-[#878787] font-medium">
              Bot
            </span>
            <span className="ml-auto text-[11px] text-[#878787]">just now</span>
          </div>
          <div className="px-4 py-3">
            <div className="text-[12px] font-semibold text-[#9a6700] mb-2 flex items-center gap-1.5">
              ⚠ Breaking change detected
            </div>
            <p className="text-[12px] text-[#333] mb-2">
              <code className="text-[10px] bg-[#f5f5f5] border border-[#e5e5e5] px-1 py-0.5 rounded">
                getUserById
              </code>{" "}
              is imported by 3 downstream services:
            </p>
            <div className="font-mono text-[10px] text-[#666] space-y-0.5 mb-3 pl-3 border-l-2 border-[#e2e2e2]">
              <div>billing-service/src/charges.ts:42</div>
              <div>notifications/src/alerts.ts:17</div>
              <div>admin-api/src/users.ts:8</div>
            </div>
            <p className="text-[12px] text-[#333]">
              These imports will fail. Update them or add a re-export alias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Beat3() {
  return (
    <div className="px-6 md:px-8 py-5">
      <div className="flex gap-3">
        <div className="w-7 h-7 rounded-full bg-[#e46a3d] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
          O
        </div>
        <div className="flex-1 border border-[#e2e2e2] rounded-lg overflow-hidden">
          <div className="px-4 py-2 bg-[#f8f8f8] border-b border-[#e2e2e2] flex items-center gap-2">
            <span className="font-semibold text-[12px]">Optibot</span>
            <span className="text-[10px] border border-[#d4d4d4] px-1.5 py-0.5 rounded text-[#878787] font-medium">
              Bot
            </span>
          </div>
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold text-black/40 uppercase tracking-wider w-16 shrink-0">
                Risk
              </span>
              <span className="text-[10px] font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                Medium
              </span>
              <span className="text-[11px] text-[#878787]">auth change touches 4 services</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[10px] font-semibold text-black/40 uppercase tracking-wider w-16 shrink-0 pt-0.5">
                Security
              </span>
              <div className="text-[11px] text-amber-700">
                Session cookie missing{" "}
                <code className="text-[10px] bg-[#f5f5f5] border border-[#e5e5e5] px-1 rounded">
                  httpOnly
                </code>{" "}
                — auth-middleware.ts:42
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-black/40 uppercase tracking-wider mb-1.5">
                Suggested fix
              </div>
              <div className="font-mono text-[10px] rounded border border-[#e5e5e5] overflow-hidden">
                <div className="bg-[#fff1f0] px-3 py-1 text-[#9d1c0f] border-l-[3px] border-red-300">
                  {"- res.cookie('session', token, { secure: true })"}
                </div>
                <div className="bg-[#f0fff1] px-3 py-1 text-[#1a7f37] border-l-[3px] border-green-300">
                  {"+ res.cookie('session', token, { secure: true, httpOnly: true })"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Beat4() {
  const events = [
    {
      icon: "C",
      iconBg: "bg-[#f0f0f0]",
      iconText: "text-[#666]",
      user: "drmaeur",
      userColor: "text-black",
      action: "committed",
      detail: "fix: update downstream imports + httpOnly flag",
      time: "5m ago",
    },
    {
      icon: "✓",
      iconBg: "bg-green-100",
      iconText: "text-green-700",
      user: "agent-optibot",
      userColor: "text-[#e46a3d]",
      action: "approved",
      detail: "All issues resolved. Ready to merge.",
      time: "3m ago",
    },
    {
      icon: "M",
      iconBg: "bg-purple-100",
      iconText: "text-purple-700",
      user: "agent-optibot",
      userColor: "text-[#e46a3d]",
      action: "merged",
      detail: "main ← feature/auth-cleanup · 6 commits",
      time: "3m ago",
    },
  ];

  return (
    <div className="px-6 md:px-8 py-5 space-y-3">
      {events.map((item, i) => (
        <div key={i} className="flex items-start gap-2.5">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold ${item.iconBg} ${item.iconText}`}
          >
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px]">
              <span className={`font-semibold ${item.userColor}`}>{item.user}</span>
              <span className="text-[#878787]"> {item.action}</span>
            </div>
            <div className="text-[11px] text-[#878787] mt-0.5 font-mono truncate">
              {item.detail}
            </div>
          </div>
          <div className="text-[10px] text-[#c0c0c0] shrink-0 mt-0.5">{item.time}</div>
        </div>
      ))}
      <div className="pt-3 border-t border-[#e2e2e2] flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center text-white text-[8px] font-bold">
          ✓
        </div>
        <span className="text-[12px] font-medium text-purple-700">
          Pull request successfully merged and closed
        </span>
      </div>
    </div>
  );
}

const beatComponents = [Beat0, Beat1, Beat2, Beat3, Beat4];

function badgeKey(beat: BeatId): string {
  if (beat <= 1) return "open";
  if (beat <= 3) return "changes";
  return "merged";
}

export function Hero() {
  const [beat, setBeat] = useState<BeatId>(0);

  useEffect(() => {
    const delay = beat === 4 ? BEAT_DURATION + LOOP_PAUSE : BEAT_DURATION;
    const timer = setTimeout(() => {
      setBeat(((beat + 1) % 5) as BeatId);
    }, delay);
    return () => clearTimeout(timer);
  }, [beat]);

  const BeatContent = beatComponents[beat];

  return (
    <section className="relative w-full pt-[160px] pb-0 px-6 flex flex-col items-center">
      {/* Hero Content */}
      <div className="w-full max-w-[1300px] mx-auto flex flex-col items-start mb-8 z-10">
        <h1 className="text-[16px] sm:text-[20px] md:text-[26px] lg:text-[32px] leading-[1.15] tracking-[-0.02em] font-normal text-black max-w-[680px]">
          Understanding intent at scale, Optibot is the most comprehensive code review agent.
        </h1>

        <div className="flex items-center gap-3 mt-8">
          <button className="flex items-center gap-2 border border-[#e2e2e2] bg-white hover:bg-[#f8f8f8] text-black px-5 py-3 rounded-full text-[15px] font-medium transition-colors">
            Get Started — Free
          </button>
        </div>
      </div>

      {/* PR Review Mockup */}
      <div className="w-full max-w-[1300px] mx-auto mb-24 z-20">
        <div className="rounded-[12px] border border-black/[0.06] bg-white shadow-2xl overflow-hidden w-full flex flex-col">
          {/* Browser Chrome */}
          <div className="h-10 bg-[#f3f3f3] border-b border-[#e2e2e2] flex items-center px-4">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#d4d4d4]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#d4d4d4]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#d4d4d4]" />
            </div>
          </div>

          {/* PR Header — static chrome, animated badge */}
          <div className="px-6 md:px-8 py-4 md:py-5 border-b border-[#e2e2e2]">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-semibold text-[14px] md:text-[15px] text-black">
                refactor: rename getUserById to fetchUser
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={badgeKey(beat)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <StatusBadge beat={beat} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="text-[11px] md:text-[12px] text-[#878787] mt-1 font-mono">
              feature/auth-cleanup → main · by drmaeur · #924
            </div>
          </div>

          {/* Animated Beat Content */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={beat}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={TRANSITION}
              >
                <BeatContent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
