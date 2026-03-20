"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GitPullRequest, GitMerge, Eye, GitFork } from "lucide-react";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: {
    action?: string;
    pull_request?: {
      title: string;
      number: number;
      state: string;
      merged?: boolean;
      user: { login: string; avatar_url: string };
      additions?: number;
      deletions?: number;
    };
    review?: {
      state: string;
    };
  };
  created_at: string;
}

interface RecentActivityProps {
  events: GitHubEvent[];
  loading: boolean;
  error: string | null;
}

function relativeTime(dateStr: string) {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function getEventInfo(event: GitHubEvent) {
  const pr = event.payload.pull_request;
  if (!pr) return null;

  let icon = GitPullRequest;
  let status = "opened";
  let statusColor = "var(--text-secondary)";

  if (event.type === "PullRequestEvent") {
    if (pr.merged) {
      icon = GitMerge;
      status = "merged";
      statusColor = "hsl(275, 35%, 55%)";
    } else if (pr.state === "closed") {
      status = "closed";
      statusColor = "hsl(0, 40%, 50%)";
    } else {
      status = event.payload.action || "opened";
      statusColor = "hsl(140, 40%, 45%)";
    }
  } else if (event.type === "PullRequestReviewEvent") {
    icon = Eye;
    status = "reviewed";
    statusColor = "hsl(220, 35%, 55%)";
  }

  return {
    icon,
    status,
    statusColor,
    title: pr.title,
    number: pr.number,
    repo: event.repo.name,
    time: relativeTime(event.created_at),
    avatar: pr.user?.avatar_url,
    author: pr.user?.login,
    additions: pr.additions || 0,
    deletions: pr.deletions || 0,
  };
}

export function RecentActivity({ events, loading, error }: RecentActivityProps) {
  const prEvents = events
    .filter((e) => e.type === "PullRequestEvent" || e.type === "PullRequestReviewEvent")
    .slice(0, 3);

  return (
    <div>
      <h3 className="text-[12px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-3">
        Recent Activity
      </h3>

      <div className="flex flex-col">

      {error && (
        <div className="rounded-[8px] p-5 text-center">
          <p className="text-[13px] text-[var(--text-muted)] mb-3">
            Couldn&apos;t load activity — try refreshing.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-[13px] text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-[6px]">
              <div className="w-7 h-7 rounded-full shimmer shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-3/4 rounded shimmer" />
                <div className="h-3 w-1/2 rounded shimmer" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && prEvents.length === 0 && (
        <div className="rounded-[8px] p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-3">
            <GitFork size={24} className="text-[var(--text-muted)]" />
          </div>
          <p className="text-[14px] font-medium text-[var(--text-primary)] mb-1">No recent activity</p>
          <p className="text-[13px] text-[var(--text-secondary)] max-w-[260px] mx-auto mb-4">
            PR activity will appear here once you start working on connected repositories.
          </p>
          <Link
            href="/dashboard/integrations/github"
            className="text-[13px] text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
          >
            Connect a repository →
          </Link>
        </div>
      )}

      {!loading && !error && prEvents.length > 0 && (
        <motion.div
          className="space-y-1"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
        >
          {prEvents.map((event) => {
            const info = getEventInfo(event);
            if (!info) return null;
            return (
              <motion.div
                key={event.id}
                variants={{
                  hidden: { opacity: 0, y: 4 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
                }}
                className="group flex items-center gap-4 py-4 border-b border-[var(--card-border)] last:border-0 hover:bg-[rgba(255,255,255,0.02)] px-4 -mx-4 rounded-lg transition-colors cursor-pointer"
              >
                <div className="relative shrink-0">
                  {info.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={info.avatar}
                      alt={info.author || ""}
                      className="w-10 h-10 rounded-full border border-[var(--border-subtle)] object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center">
                      <info.icon size={18} style={{ color: info.statusColor }} />
                    </div>
                  )}
                  {info.avatar && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[var(--bg-deep)] flex items-center justify-center border border-[var(--card-border)]">
                      <info.icon size={10} style={{ color: info.statusColor }} />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[14px] font-medium text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                      {info.title}
                    </span>
                    <span className="text-[14px] text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors shrink-0">
                      #{info.number}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
                    <span className="font-medium text-[var(--text-primary)]">{info.repo}</span>
                    <span className="text-[var(--text-muted)]">•</span>
                    <span style={{ color: info.statusColor }}>{info.status}</span>
                    <span className="text-[var(--text-muted)]">•</span>
                    <span className="truncate">by {info.author}</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-4 text-[13px] text-[var(--text-muted)]">
                  {(info.additions > 0 || info.deletions > 0) && (
                    <span className="hidden sm:flex items-center font-mono bg-[var(--bg-surface)] px-2 py-0.5 rounded text-[12px] border border-[var(--card-border)] group-hover:border-[rgba(255,255,255,0.1)] transition-colors gap-2">
                      {info.additions > 0 && <span className="text-[#3fb950]">+{info.additions}</span>}
                      {info.deletions > 0 && <span className="text-[#f85149]">-{info.deletions}</span>}
                    </span>
                  )}
                  <span className="whitespace-nowrap">{info.time}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
      </div>
    </div>
  );
}
