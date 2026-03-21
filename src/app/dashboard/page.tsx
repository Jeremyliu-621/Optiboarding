"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronRight, X, Check, GitFork, Settings, Users as UsersIcon } from "lucide-react";
import { FeatureCards } from "@/components/dashboard/FeatureCards";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { OptibotInsights } from "@/components/dashboard/OptibotInsights";
import { ImprovementGraph } from "@/components/dashboard/ImprovementGraph";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GitHubEvent = any;

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
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
      <div className="mb-10 mt-4">
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
