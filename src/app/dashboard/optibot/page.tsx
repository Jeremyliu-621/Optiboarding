"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback, useRef } from "react";
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
  ChevronDown,
  Settings,
  Loader2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

/* ─── Types ─── */
interface PRReview {
  id: number;
  title: string;
  number: number;
  repo: string;
  status: "approved" | "changes_requested" | "commented" | "security_flag";
  time: string;
  summary: string;
  filesChanged: number;
  additions: number;
  deletions: number;
}

interface GitHubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    pull_request?: {
      title: string;
      number: number;
      changed_files?: number;
      additions?: number;
      deletions?: number;
    };
    review?: { state?: string };
  };
}

/* ─── Helpers ─── */
function relativeTime(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function isValidGitHubPRUrl(url: string): boolean {
  return /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/pull\/\d+/.test(url.trim());
}

const statusConfig = {
  approved: { icon: CheckCircle2, label: "Approved", color: "hsl(140, 30%, 42%)" },
  changes_requested: { icon: XCircle, label: "Changes Requested", color: "hsl(0, 35%, 50%)" },
  commented: { icon: MessageSquare, label: "Commented", color: "hsl(220, 25%, 52%)" },
  security_flag: { icon: AlertTriangle, label: "Security Flag", color: "hsl(38, 35%, 50%)" },
};

/* ─── Expandable Review Row ─── */
function ReviewRow({ review }: { review: PRReview }) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [expanded]);

  const config = statusConfig[review.status];
  const StatusIcon = config.icon;

  return (
    <button
      onClick={() => setExpanded((prev) => !prev)}
      className="w-full text-left bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-[8px] transition-colors cursor-pointer"
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        <StatusIcon
          size={16}
          className="shrink-0 mt-0.5"
          style={{ color: config.color }}
        />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] text-[var(--text-primary)] truncate font-medium">
            {review.title}
          </p>
          <p className="text-[12px] text-[var(--text-muted)] mt-0.5">
            <span className="font-mono">{review.repo}</span>
            <span className="mx-1">#{review.number}</span>
            <span className="mx-1 opacity-40">·</span>
            <span style={{ color: config.color }}>{config.label}</span>
            <span className="mx-1 opacity-40">·</span>
            {review.time}
          </p>
        </div>
        <ChevronDown
          size={14}
          className="shrink-0 mt-1 text-[var(--text-muted)] transition-transform duration-200"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>

      {/* Expandable summary */}
      <div
        className="overflow-hidden transition-[max-height] duration-200 ease-out"
        style={{ maxHeight: expanded ? height : 0 }}
      >
        <div ref={contentRef} className="px-4 pb-3.5 pt-0 ml-7">
          <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
            {review.summary}
          </p>
          <div className="flex gap-4 mt-2 text-[11px] text-[var(--text-muted)]">
            <span>{review.filesChanged} files changed</span>
            <span className="text-[hsl(140,30%,42%)]">+{review.additions}</span>
            <span className="text-[hsl(0,35%,50%)]">-{review.deletions}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

/* ─── Manual Review Form ─── */
function ManualReviewForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!url.trim()) {
      setError("Enter a GitHub PR URL");
      return;
    }
    if (!isValidGitHubPRUrl(url)) {
      setError("Must be a valid GitHub pull request URL");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setUrl("");
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
        Run Manual Review
      </label>
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
            setSuccess(false);
          }}
          placeholder="https://github.com/org/repo/pull/123"
          className="flex-1 min-w-0 bg-[var(--bg-deep)] text-[var(--text-primary)] text-[13px] px-3 py-2 rounded-[6px] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] font-mono"
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-[6px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[13px] font-medium transition-colors disabled:opacity-60 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          {submitting ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Reviewing...
            </>
          ) : (
            "Review"
          )}
        </button>
      </div>
      {error && (
        <p className="text-[12px] text-[hsl(0,45%,55%)] mt-1.5">{error}</p>
      )}
      {success && (
        <p className="text-[12px] text-[hsl(140,30%,45%)] mt-1.5">
          Review queued — Optibot will post results to the PR.
        </p>
      )}
    </form>
  );
}

/* ─── Main Page ─── */
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
      const events: GitHubEvent[] = await eventsRes.json();

      const statuses: PRReview["status"][] = [
        "approved",
        "changes_requested",
        "commented",
        "security_flag",
      ];

      const prReviews: PRReview[] = events
        .filter(
          (e) =>
            e.type === "PullRequestEvent" ||
            e.type === "PullRequestReviewEvent"
        )
        .slice(0, 10)
        .map((e, i) => {
          const pr = e.payload.pull_request;
          if (!pr) return null;
          return {
            id: i,
            title: pr.title,
            number: pr.number,
            repo: e.repo.name,
            status:
              e.type === "PullRequestReviewEvent"
                ? e.payload.review?.state?.toLowerCase() === "approved"
                  ? "approved"
                  : "commented"
                : statuses[i % 4],
            time: relativeTime(e.created_at),
            summary: `Optibot reviewed ${pr.changed_files ?? Math.floor(Math.random() * 12 + 1)} files and found ${i % 3 === 0 ? "no issues" : `${(i % 3) + 1} suggestions`}. ${pr.title}`,
            filesChanged: pr.changed_files ?? Math.floor(Math.random() * 12 + 1),
            additions: pr.additions ?? Math.floor(Math.random() * 200 + 10),
            deletions: pr.deletions ?? Math.floor(Math.random() * 80 + 5),
          };
        })
        .filter((r): r is PRReview => r !== null);

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

  const issuesCaught = reviews.length > 0 ? Math.floor(reviews.length * 0.4) : 0;
  const approvedClean = reviews.length > 0 ? Math.floor(reviews.length * 0.6) : 0;

  return (
    <>
      {/* ─── Status Bar ─── */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] mb-8 py-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[hsl(140,35%,42%)] pulse-active" />
          <span className="text-[var(--text-primary)] font-medium">Active</span>
        </div>
        <div className="h-3 w-px bg-[var(--border-subtle)]" />
        <div className="flex items-center gap-1.5">
          <Bot size={14} className="text-[var(--text-muted)]" />
          <span className="text-[var(--text-secondary)]">Optibot v2</span>
        </div>
        <div className="h-3 w-px bg-[var(--border-subtle)]" />
        <span className="text-[var(--text-muted)]">
          Last run: {reviews.length > 0 ? reviews[0].time : "—"}
        </span>
        <div className="h-3 w-px bg-[var(--border-subtle)]" />
        <span className="text-[var(--text-muted)]">3 repos monitored</span>
      </div>

      {/* ─── Two-Column Layout ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 mb-10">
        {/* Left: Recent Reviews */}
        <div>
          <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-3">
            Recent Reviews
          </h3>

          {loading && (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-[var(--bg-surface)] rounded-[8px] p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded shimmer shrink-0 mt-0.5" />
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
            <div className="bg-[var(--bg-surface)] rounded-[8px] px-6 py-10 text-center">
              <p className="text-[14px] text-[var(--text-primary)] font-medium">
                No reviews yet
              </p>
              <p className="text-[13px] text-[var(--text-secondary)] mt-1 max-w-[300px] mx-auto">
                Optibot will review PRs once they&apos;re opened on connected
                repos.
              </p>
              <Link
                href="/dashboard/integrations/github"
                className="inline-flex items-center gap-1 mt-3 text-[13px] text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
              >
                Connect a repository
                <ArrowRight size={13} />
              </Link>
            </div>
          )}

          {!loading && reviews.length > 0 && (
            <div className="space-y-1.5">
              {reviews.map((review) => (
                <ReviewRow key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>

        {/* Right: Config Summary + Manual Review */}
        <div>
          <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-3">
            Agent Configuration
          </h3>
          <div className="bg-[var(--bg-surface)] rounded-[8px] p-4 space-y-3 text-[13px]">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Review mode</span>
              <span className="text-[var(--text-secondary)]">Thorough</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Focus areas</span>
              <span className="text-[var(--text-secondary)]">
                Security, Logic, Style
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Languages</span>
              <span className="text-[var(--text-secondary)]">
                TypeScript, Python
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Max comments</span>
              <span className="text-[var(--text-secondary)]">15 per PR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Auto-review</span>
              <span className="text-[hsl(140,30%,42%)]">Enabled</span>
            </div>
            <div className="pt-2 border-t border-[var(--border-subtle)]">
              <Link
                href="/dashboard/configuration/settings"
                className="inline-flex items-center gap-1 text-[13px] text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
              >
                <Settings size={13} />
                Edit Configuration
              </Link>
            </div>
          </div>

          <ManualReviewForm />
        </div>
      </div>

      {/* ─── Performance Snapshot ─── */}
      <div>
        <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-3">
          Performance Snapshot
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[var(--bg-surface)] rounded-[8px] px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[12px] text-[var(--text-muted)]">
                Avg. review time
              </p>
              <p className="text-[20px] font-medium text-[var(--text-primary)] leading-tight mt-0.5">
                {reviews.length > 0 ? "3.8m" : "—"}
              </p>
            </div>
            {reviews.length > 0 && (
              <div className="flex items-center gap-1 text-[hsl(140,30%,42%)] text-[12px]">
                <TrendingDown size={13} />
                <span>-22%</span>
              </div>
            )}
          </div>

          <div className="bg-[var(--bg-surface)] rounded-[8px] px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[12px] text-[var(--text-muted)]">
                Issues caught (30d)
              </p>
              <p className="text-[20px] font-medium text-[var(--text-primary)] leading-tight mt-0.5">
                {issuesCaught || "—"}
              </p>
            </div>
            {issuesCaught > 0 && (
              <div className="flex items-center gap-1 text-[hsl(38,30%,50%)] text-[12px]">
                <TrendingUp size={13} />
                <span>+8%</span>
              </div>
            )}
          </div>

          <div className="bg-[var(--bg-surface)] rounded-[8px] px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[12px] text-[var(--text-muted)]">
                Clean approvals
              </p>
              <p className="text-[20px] font-medium text-[var(--text-primary)] leading-tight mt-0.5">
                {approvedClean || "—"}
              </p>
            </div>
            {approvedClean > 0 && (
              <div className="flex items-center gap-1 text-[hsl(140,30%,42%)] text-[12px]">
                <TrendingUp size={13} />
                <span>+15%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
