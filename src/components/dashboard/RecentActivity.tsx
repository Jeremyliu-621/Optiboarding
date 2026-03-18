"use client";

import { GitPullRequest, GitMerge, Eye } from "lucide-react";

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
  };
}

export function RecentActivity({ events, loading, error }: RecentActivityProps) {
  const prEvents = events
    .filter((e) => e.type === "PullRequestEvent" || e.type === "PullRequestReviewEvent")
    .slice(0, 8);

  return (
    <div>
      <h3 className="text-[14px] font-medium text-[var(--text-primary)] mb-4">
        Recent Activity
      </h3>

      {error && (
        <p className="text-[13px] text-[var(--text-muted)]">
          Couldn&apos;t load activity — try refreshing.
        </p>
      )}

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-[6px]">
              <div className="w-5 h-5 rounded bg-[var(--bg-elevated)] animate-pulse shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-3/4 rounded bg-[var(--bg-elevated)] animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-[var(--bg-elevated)] animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && prEvents.length === 0 && (
        <p className="text-[13px] text-[var(--text-muted)]">
          No recent PR activity found.
        </p>
      )}

      {!loading && !error && prEvents.length > 0 && (
        <div className="space-y-1">
          {prEvents.map((event) => {
            const info = getEventInfo(event);
            if (!info) return null;
            return (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-[6px] hover:bg-[var(--bg-elevated)] transition-colors"
              >
                <info.icon
                  size={18}
                  className="shrink-0 mt-0.5"
                  style={{ color: info.statusColor }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-[var(--text-primary)] truncate">
                    {info.title}
                  </p>
                  <p className="text-[12px] text-[var(--text-muted)] mt-0.5">
                    {info.repo} #{info.number} ·{" "}
                    <span style={{ color: info.statusColor }}>{info.status}</span>{" "}
                    · {info.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
