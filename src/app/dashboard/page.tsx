"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { FeatureCards } from "@/components/dashboard/FeatureCards";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickSetup } from "@/components/dashboard/QuickSetup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GitHubEvent = any;

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;

    const headers = {
      Authorization: `Bearer ${session.accessToken}`,
      Accept: "application/vnd.github.v3+json",
    };

    // Fetch events
    try {
      setEventsLoading(true);
      setEventsError(null);

      // Get username first
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
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.accessToken) {
      fetchData();
    }
  }, [session?.accessToken, fetchData]);

  if (status === "loading") {
    return <DashboardSkeleton />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-deep)]">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
      />

      <div
        className="transition-[margin] duration-200 ease-in-out"
        style={{ marginLeft: sidebarCollapsed ? "56px" : "220px" }}
      >
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebarCollapse={() => setSidebarCollapsed((c) => !c)}
        />

        <main className="px-8 py-6 max-w-[1100px] mx-auto">
          {/* Announcement banner */}
          <div className="mb-6">
            <button className="inline-flex items-center gap-2 text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              <span className="text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-primary)]">
                New
              </span>
              Introducing Optibot v2
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Greeting */}
          <div className="mb-8">
            <p className="text-[13px] text-[var(--text-muted)] mb-1">
              {session.user?.name ? `${session.user.name}'s Workspace` : "Your Workspace"}
            </p>
            <h1 className="text-[32px] font-normal tracking-[-0.02em] text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
              {getGreeting()}, {session.user?.name?.split(" ")[0] || "there"}
            </h1>
          </div>

          {/* Feature cards */}
          <div className="mb-10">
            <FeatureCards />
          </div>

          {/* Two-column section */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            <RecentActivity
              events={events}
              loading={eventsLoading}
              error={eventsError}
            />
            <QuickSetup />
          </div>
        </main>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--bg-deep)] flex">
      {/* Sidebar skeleton */}
      <div className="hidden lg:block w-[220px] bg-[var(--bg-surface)] shrink-0">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] animate-pulse" />
            <div className="h-3 w-24 rounded bg-[var(--bg-elevated)] animate-pulse" />
          </div>
          <div className="space-y-2 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 rounded-[6px] bg-[var(--bg-elevated)] animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Main area skeleton */}
      <div className="flex-1">
        <div className="h-14 border-b border-[var(--border-subtle)]" />
        <div className="p-6 max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[var(--bg-surface)] rounded-[8px] p-5">
                <div className="h-28 rounded-[6px] bg-[var(--bg-elevated)] animate-pulse mb-4" />
                <div className="h-3.5 w-24 rounded bg-[var(--bg-elevated)] animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
