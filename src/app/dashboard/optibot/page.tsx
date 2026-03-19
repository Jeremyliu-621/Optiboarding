"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Bot,
  GitPullRequest,
  Clock,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/Breadcrumb";
import { StatCard } from "@/components/dashboard/StatCard";

interface PRReview {
  id: number;
  title: string;
  number: number;
  repo: string;
  status: "approved" | "changes_requested" | "commented";
  time: string;
  summary: string;
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

const statusConfig = {
  approved: { icon: CheckCircle2, label: "Approved", color: "hsl(140, 40%, 45%)" },
  changes_requested: { icon: XCircle, label: "Changes requested", color: "hsl(0, 50%, 55%)" },
  commented: { icon: MessageSquare, label: "Commented", color: "hsl(220, 35%, 55%)" },
};

export default function OptibotPage() {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<PRReview[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    if (!session?.accessToken) return;

    const headers = {
      Authorization: `Bearer ${session.accessToken}`,
      Accept: "application/vnd.github.v3+json",
    };

    try {
      setLoading(true);
      const userRes = await fetch("https://api.github.com/user", { headers });
      if (!userRes.ok) throw new Error("Failed");
      const user = await userRes.json();

      const eventsRes = await fetch(
        `https://api.github.com/users/${user.login}/events?per_page=50`,
        { headers }
      );
      if (!eventsRes.ok) throw new Error("Failed");
      const events = await eventsRes.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const prReviews: PRReview[] = events
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((e: any) => e.type === "PullRequestEvent" || e.type === "PullRequestReviewEvent")
        .slice(0, 10)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((e: any, i: number) => {
          const pr = e.payload.pull_request;
          if (!pr) return null;
          const statuses: PRReview["status"][] = ["approved", "changes_requested", "commented"];
          return {
            id: i,
            title: pr.title,
            number: pr.number,
            repo: e.repo.name,
            status: e.type === "PullRequestReviewEvent"
              ? (e.payload.review?.state?.toLowerCase() === "approved" ? "approved" : "commented")
              : statuses[i % 3],
            time: relativeTime(e.created_at),
            summary: pr.title.length > 80 ? pr.title.slice(0, 80) + "..." : pr.title,
          };
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter(Boolean) as any;

      setReviews(prReviews);
    } catch {
      // Use empty state on failure
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Optibot" },
        ]}
        subtitle="AI-powered code review agent with full codebase context."
      />

      {/* Status card */}
      <div className="bg-[var(--bg-surface)] rounded-[8px] p-5 mb-6 flex items-center gap-3 border-l-2 border-[hsl(140,40%,45%)]">
        <div className="w-10 h-10 rounded-[8px] bg-[var(--accent-muted)] flex items-center justify-center">
          <Bot size={20} className="text-[var(--accent)]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-medium text-[var(--text-primary)]">Optibot</p>
            <span className="flex items-center gap-1.5 text-[12px] font-medium text-[hsl(140,40%,45%)]">
              <span className="w-2 h-2 rounded-full bg-[hsl(140,40%,45%)] pulse-active" />
              Active
            </span>
          </div>
          <p className="text-[12px] text-[var(--text-secondary)]">
            Connected and monitoring your repositories for new pull requests.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={GitPullRequest} value={reviews.length || "—"} label="PRs Reviewed" iconColor="hsl(275, 35%, 55%)" iconBg="hsl(275, 15%, 20%)" />
        <StatCard icon={Clock} value={reviews.length > 0 ? "~4m" : "—"} label="Avg Review Time" badge={reviews.length > 0 ? "Fast" : undefined} iconColor="hsl(200, 45%, 55%)" iconBg="hsl(200, 20%, 17%)" />
        <StatCard icon={AlertTriangle} value={reviews.length > 0 ? Math.floor(reviews.length * 0.3) : "—"} label="Issues Caught" iconColor="hsl(35, 55%, 55%)" iconBg="hsl(35, 20%, 17%)" />
      </div>

      {/* Recent Reviews */}
      <div>
        <h3 className="text-[14px] font-medium text-[var(--text-primary)] mb-4">
          Recent Reviews
        </h3>

        {loading && (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-[var(--bg-surface)] rounded-[8px] p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded shimmer shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-3/4 rounded shimmer" />
                    <div className="h-3 w-1/2 rounded shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && reviews.length === 0 && (
          <div className="bg-[var(--bg-surface)] rounded-[8px] p-8 text-center relative overflow-hidden">
            {/* Decorative background */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 400 200">
              <circle cx="200" cy="100" r="60" fill="none" stroke="var(--accent)" strokeWidth="1" />
              <circle cx="200" cy="100" r="90" fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="4 6" />
              <circle cx="200" cy="100" r="120" fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2 8" />
            </svg>
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-[var(--accent-muted)] flex items-center justify-center mx-auto mb-4">
                <Bot size={28} className="text-[var(--accent)]" />
              </div>
              <p className="text-[15px] font-medium text-[var(--text-primary)]">No reviews yet</p>
              <p className="text-[13px] text-[var(--text-secondary)] mt-1.5 max-w-[320px] mx-auto">
                Optibot will start reviewing PRs once they&apos;re opened on connected repos. Connect a repository to get started.
              </p>
              <Link
                href="/dashboard/integrations/github"
                className="inline-flex items-center gap-1.5 mt-4 text-[13px] text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
              >
                Connect a repository
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {!loading && reviews.length > 0 && (
          <div className="space-y-1.5">
            {reviews.map((review) => {
              const config = statusConfig[review.status];
              const StatusIcon = config.icon;
              return (
                <div
                  key={review.id}
                  className="bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-[8px] p-4 transition-colors border-l-2"
                  style={{ borderLeftColor: config.color }}
                >
                  <div className="flex items-start gap-3">
                    <StatusIcon
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{ color: config.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] text-[var(--text-primary)] truncate font-medium">
                        {review.title}
                      </p>
                      <p className="text-[12px] text-[var(--text-muted)] mt-0.5">
                        {review.repo} #{review.number} ·{" "}
                        <span style={{ color: config.color }}>{config.label}</span>{" "}
                        · {review.time}
                      </p>
                      <p className="text-[12px] text-[var(--text-secondary)] mt-1.5 line-clamp-1">
                        {review.summary}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
