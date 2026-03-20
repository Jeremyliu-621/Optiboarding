"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Sparkles, Check, GitFork, Settings, Users as UsersIcon } from "lucide-react";
import { FeatureCards } from "@/components/dashboard/FeatureCards";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { OptibotInsights } from "@/components/dashboard/OptibotInsights";
import { BeforeAfterStats } from "@/components/dashboard/BeforeAfterStats";
import { ImprovementGraph } from "@/components/dashboard/ImprovementGraph";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GitHubEvent = any;

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/* ─── Onboarding welcome modal ─── */
function WelcomeModal({
  name,
  avatar,
  onClose,
}: {
  name: string;
  avatar?: string | null;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
        className="w-full max-w-[440px] mx-4 bg-[var(--bg-surface)] rounded-[16px] p-8 text-center relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Avatar */}
        {avatar && (
          <div className="mb-5 flex justify-center">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--bg-surface)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        <h2
          className="text-[24px] text-[var(--text-primary)] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Welcome to Optimal AI
        </h2>
        <p className="text-[14px] text-[var(--text-secondary)] mb-1">
          {name ? `Hey ${name.split(" ")[0]},` : "Hey there,"} you&apos;re all set.
        </p>
        <p className="text-[13px] text-[var(--text-muted)] mb-6 max-w-[320px] mx-auto">
          Optibot reviews every pull request with full codebase context — catching breaking
          changes, security issues, and cross-repo impacts before they hit production.
        </p>

        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[8px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[14px] font-medium transition-colors cursor-pointer"
        >
          <Sparkles size={16} />
          <span>Let&apos;s get started</span>
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Setup checklist ─── */
const checklistItems = [
  { id: "github", label: "Connect GitHub", icon: GitFork, href: "/dashboard/integrations/github" },
  { id: "config", label: "Configure Optibot", icon: Settings, href: "/dashboard/configuration/settings" },
  { id: "invite", label: "Invite a teammate", icon: UsersIcon, href: "/dashboard/organization" },
];

function SetupChecklist() {
  const [dismissed, setDismissed] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDismissed(localStorage.getItem("opti-checklist-dismissed") === "true");
    // Load per-item completion from localStorage
    const stored: Record<string, boolean> = {};
    checklistItems.forEach((item) => {
      stored[item.id] = localStorage.getItem(`opti-step-${item.id}`) === "true";
    });
    setCompleted(stored);
  }, []);

  const markDone = (id: string) => {
    localStorage.setItem(`opti-step-${id}`, "true");
    setCompleted((prev) => ({ ...prev, [id]: true }));
  };

  const dismiss = () => {
    localStorage.setItem("opti-checklist-dismissed", "true");
    setDismissed(true);
  };

  if (dismissed) return null;

  const doneCount = checklistItems.filter((i) => completed[i.id]).length;
  const progress = (doneCount / checklistItems.length) * 100;

  return (
    <div className="mb-8 border border-[var(--border-subtle)] rounded-[8px] overflow-hidden" style={{ background: 'linear-gradient(to bottom, hsla(275, 35%, 55%, 0.06), var(--bg-surface) 60%)' }}>
      <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
        <h3 className="text-[14px] font-medium text-[var(--text-primary)]">
          Getting Started
          <span className="ml-2 text-[12px] text-[var(--text-muted)] font-normal">
            {doneCount}/{checklistItems.length}
          </span>
        </h3>
        <button
          onClick={dismiss}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          aria-label="Dismiss checklist"
        >
          <X size={14} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 w-full bg-[var(--bg-elevated)]">
        <div
          className="h-full bg-[var(--accent)] opacity-60 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-subtle)]">
        {checklistItems.map((item) => {
          const done = completed[item.id];
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => markDone(item.id)}
              className={`flex-1 flex items-center justify-center sm:justify-start gap-3 p-4 transition-colors cursor-pointer group ${
                done 
                  ? "bg-[rgba(255,255,255,0.01)] hover:bg-[rgba(255,255,255,0.02)]" 
                  : "bg-transparent hover:bg-[rgba(255,255,255,0.02)]"
              }`}
            >
              <div 
                className={`flex-shrink-0 w-4 h-4 rounded-[4px] flex items-center justify-center transition-colors border ${
                  done 
                    ? "bg-[var(--accent)] border-transparent opacity-50 text-white" 
                    : "border-current opacity-30 group-hover:opacity-50 text-[var(--text-secondary)] bg-transparent"
                }`}
              >
                {done && <Check size={10} strokeWidth={3} />}
              </div>
              <span className={`text-[13px] whitespace-nowrap ${done ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-secondary)] font-medium'} transition-colors`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function DashboardPage() {
  const { data: session } = useSession();

  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (localStorage.getItem("opti-onboarded") !== "true") {
      setShowWelcome(true);
    }
  }, []);

  const closeWelcome = () => {
    localStorage.setItem("opti-onboarded", "true");
    setShowWelcome(false);
  };

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;

    const headers = {
      Authorization: `Bearer ${session.accessToken}`,
      Accept: "application/vnd.github.v3+json",
    };

    try {
      setEventsLoading(true);
      setEventsError(null);

      const userRes = await fetch("https://api.github.com/user", { headers });
      if (!userRes.ok) throw new Error("Failed to fetch user");
      const user = await userRes.json();

      const eventsRes = await fetch(
        `https://api.github.com/users/${user.login}/events?per_page=30`,
        { headers }
      );
      if (!eventsRes.ok) throw new Error("Failed to fetch events");
      const data = await eventsRes.json();
      setEvents(data);
    } catch {
      setEventsError("Couldn't load activity — try refreshing.");
    } finally {
      setEventsLoading(false);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    if (session?.accessToken) {
      fetchData();
    }
  }, [session?.accessToken, fetchData]);

  return (
    <>
      {/* Welcome modal */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeModal
            name={session?.user?.name || ""}
            avatar={session?.user?.image}
            onClose={closeWelcome}
          />
        )}
      </AnimatePresence>

      {/* Announcement banner */}
      <div className="mb-6 flex items-center">
        <Link href="/dashboard/optibot" className="flex items-center gap-3 w-fit rounded-full border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)] p-1 pr-4 hover:bg-[rgba(255,255,255,0.05)] transition-colors group shadow-sm cursor-pointer">
          <span className="bg-[#f0f6fc] text-[#0d1117] px-3.5 py-1.5 rounded-full text-[13px] font-medium leading-none">
            New
          </span>
          <span className="text-[14px] text-white font-medium tracking-wide">
            Introducing Optibot v2
          </span>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-[#9198a1] group-hover:text-white transition-colors ml-0.5">
            <path d="M5.5 3L10.5 8L5.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Greeting */}
      <div className="mb-8">
        <p className="text-[13px] text-[var(--text-muted)] mb-1">
          {session?.user?.name ? `${session.user.name}'s Workspace` : "Your Workspace"}
        </p>
        <h1
          className="text-[24px] font-normal tracking-[-0.02em] text-[var(--text-secondary)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {getGreeting()}, {session?.user?.name?.split(" ")[0] || "there"}
        </h1>
      </div>

      {/* Setup checklist */}
      <SetupChecklist />

      {/* Feature cards */}
      <div className="mb-10">
        <h3 className="text-[13px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-3">Tools</h3>
        <FeatureCards />
      </div>

      {/* Two-Column Insights & Activity */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Optibot Insights + Recent Activity */}
        <div className="flex flex-col gap-8">
          <OptibotInsights />
          <RecentActivity
            events={events}
            loading={eventsLoading}
            error={eventsError}
          />
        </div>

        {/* Right Column: Improvement Graph */}
        <div className="flex flex-col gap-8 h-full">
          <ImprovementGraph />
        </div>

      </div>
    </>
  );
}
