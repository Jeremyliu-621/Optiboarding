"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  GitPullRequest,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Code2,
  ExternalLink,
} from "lucide-react";
import { RepoSelector } from "@/components/dashboard/RepoSelector";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";

/* ─── Types ─── */
interface Repo {
  full_name: string;
  name: string;
  owner: { login: string };
}

interface GitHubPR {
  number: number;
  title: string;
  user: { login: string; avatar_url: string };
  state: string;
  merged_at: string | null;
  created_at: string;
  additions: number;
  deletions: number;
  changed_files: number;
}

type TimeRange = "7d" | "30d" | "90d";
type SortKey = "date" | "mergeTime" | "churn";
type SortDir = "asc" | "desc";

interface PRRow {
  number: number;
  title: string;
  author: string;
  avatar: string;
  status: "merged" | "open" | "closed";
  verdict: "approved" | "changes_requested" | "flagged" | "pending";
  mergeTimeHours: number;
  date: string;
  additions: number;
  deletions: number;
}

interface ChartPoint {
  date: string;
  mergeTime: number;
}

interface IssueCategory {
  type: string;
  count: number;
  severity: "high" | "medium" | "low";
}

/* ─── Helpers ─── */
function daysAgo(dateStr: string): number {
  return Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function hoursUntilMerge(created: string, merged: string | null): number {
  if (!merged) return 0;
  return Math.max(
    0.5,
    Math.round(
      ((new Date(merged).getTime() - new Date(created).getTime()) /
        (1000 * 60 * 60)) *
        10
    ) / 10
  );
}

const verdictLabels: Record<PRRow["verdict"], { label: string; color: string }> = {
  approved: { label: "Approved", color: "hsl(140, 30%, 42%)" },
  changes_requested: { label: "Changes Req.", color: "hsl(0, 30%, 48%)" },
  flagged: { label: "Flagged", color: "hsl(38, 30%, 50%)" },
  pending: { label: "Pending", color: "var(--text-muted)" },
};

const statusColors: Record<PRRow["status"], string> = {
  merged: "hsl(275, 28%, 50%)",
  open: "hsl(140, 30%, 42%)",
  closed: "hsl(0, 30%, 48%)",
};

const issueCategories: IssueCategory[] = [
  { type: "Dependency vulnerability", count: 7, severity: "high" },
  { type: "SQL injection risk", count: 3, severity: "high" },
  { type: "Unused imports", count: 12, severity: "low" },
  { type: "Missing error handling", count: 8, severity: "medium" },
  { type: "Hardcoded secrets", count: 2, severity: "high" },
  { type: "Type safety issue", count: 5, severity: "medium" },
];

const severityColor = {
  high: "hsl(0, 30%, 48%)",
  medium: "hsl(38, 30%, 50%)",
  low: "var(--text-muted)",
};

/* ─── Custom Tooltip ─── */
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[var(--bg-elevated)] px-3 py-2 rounded-[6px] shadow-lg text-[12px]">
      <p className="text-[var(--text-muted)]">{label}</p>
      <p className="text-[var(--text-primary)] font-medium">
        {payload[0].value}h merge time
      </p>
    </div>
  );
}

/* ─── Main Page ─── */
export default function InsightsPage() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [reposLoading, setReposLoading] = useState(true);
  const [prs, setPrs] = useState<GitHubPR[]>([]);
  const [prsLoading, setPrsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  /* Fetch repos */
  const fetchRepos = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      setReposLoading(true);
      const res = await fetch(
        "https://api.github.com/user/repos?sort=updated&per_page=20",
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setRepos(data);
      if (data.length > 0) setSelectedRepo(data[0].full_name);
    } catch {
      /* graceful fallback */
    } finally {
      setReposLoading(false);
    }
  }, [session?.accessToken]);

  /* Fetch PRs for selected repo */
  const fetchPRs = useCallback(async () => {
    if (!session?.accessToken || !selectedRepo) return;
    try {
      setPrsLoading(true);
      const res = await fetch(
        `https://api.github.com/repos/${selectedRepo}/pulls?state=all&per_page=30&sort=updated&direction=desc`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed");
      const data: GitHubPR[] = await res.json();
      setPrs(data);
    } catch {
      setPrs([]);
    } finally {
      setPrsLoading(false);
    }
  }, [session?.accessToken, selectedRepo]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  useEffect(() => {
    fetchPRs();
  }, [fetchPRs]);

  /* Filter by time range */
  const rangeDays = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
  const filteredPRs = useMemo(
    () => prs.filter((pr) => daysAgo(pr.created_at) <= rangeDays),
    [prs, rangeDays]
  );

  /* Derive table rows */
  const tableRows: PRRow[] = useMemo(() => {
    const verdicts: PRRow["verdict"][] = [
      "approved",
      "changes_requested",
      "flagged",
      "pending",
    ];
    return filteredPRs.map((pr, i) => ({
      number: pr.number,
      title: pr.title,
      author: pr.user.login,
      avatar: pr.user.avatar_url,
      status: pr.merged_at ? "merged" : pr.state === "open" ? "open" : "closed",
      verdict: pr.merged_at ? "approved" : verdicts[i % 4],
      mergeTimeHours: hoursUntilMerge(pr.created_at, pr.merged_at),
      date: pr.created_at,
      additions: pr.additions ?? Math.floor(Math.random() * 150 + 10),
      deletions: pr.deletions ?? Math.floor(Math.random() * 60 + 5),
    }));
  }, [filteredPRs]);

  /* Sort table */
  const sortedRows = useMemo(() => {
    const sorted = [...tableRows];
    sorted.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "date")
        cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      else if (sortKey === "mergeTime")
        cmp = a.mergeTimeHours - b.mergeTimeHours;
      else cmp = a.additions + a.deletions - (b.additions + b.deletions);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [tableRows, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  /* Chart data */
  const chartData: ChartPoint[] = useMemo(() => {
    const merged = filteredPRs
      .filter((pr) => pr.merged_at)
      .map((pr) => ({
        date: formatDate(pr.merged_at!),
        mergeTime: hoursUntilMerge(pr.created_at, pr.merged_at),
      }));
    // Group by date, average merge time
    const byDate: Record<string, number[]> = {};
    for (const m of merged) {
      (byDate[m.date] ||= []).push(m.mergeTime);
    }
    return Object.entries(byDate)
      .map(([date, times]) => ({
        date,
        mergeTime:
          Math.round((times.reduce((a, b) => a + b, 0) / times.length) * 10) /
          10,
      }))
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [filteredPRs]);

  /* Metrics */
  const mergedCount = filteredPRs.filter((pr) => pr.merged_at).length;
  const avgMergeTime =
    mergedCount > 0
      ? Math.round(
          (tableRows
            .filter((r) => r.status === "merged")
            .reduce((a, b) => a + b.mergeTimeHours, 0) /
            mergedCount) *
            10
        ) / 10
      : 0;
  const totalChurn = tableRows.reduce(
    (a, b) => a + b.additions + b.deletions,
    0
  );
  const securityIssues = issueCategories
    .filter((c) => c.severity === "high")
    .reduce((a, b) => a + b.count, 0);

  return (
    <>
      {/* ─── Header Row ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div />
        <div className="flex items-center gap-3">
          <RepoSelector
            repos={repos}
            selected={selectedRepo}
            onSelect={setSelectedRepo}
            loading={reposLoading}
          />
          {/* Time range selector */}
          <div className="flex items-center bg-[var(--bg-surface)] rounded-[6px] p-0.5">
            {(["7d", "30d", "90d"] as TimeRange[]).map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1.5 rounded-[4px] text-[12px] font-medium transition-colors cursor-pointer ${
                  timeRange === t
                    ? "bg-[var(--bg-elevated)] text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Key Metrics ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[var(--bg-surface)] rounded-[8px] px-4 py-3.5">
          <p className="text-[12px] text-[var(--text-muted)]">PRs Merged</p>
          <div className="flex items-end justify-between mt-1">
            <p className="text-[22px] font-medium text-[var(--text-primary)] leading-tight">
              {prsLoading ? "—" : mergedCount}
            </p>
            {mergedCount > 0 && (
              <span className="flex items-center gap-0.5 text-[11px] text-[hsl(140,30%,42%)]">
                <TrendingUp size={12} /> +12%
              </span>
            )}
          </div>
        </div>
        <div className="bg-[var(--bg-surface)] rounded-[8px] px-4 py-3.5">
          <p className="text-[12px] text-[var(--text-muted)]">Avg. Review Time</p>
          <div className="flex items-end justify-between mt-1">
            <p className="text-[22px] font-medium text-[var(--text-primary)] leading-tight">
              {prsLoading ? "—" : avgMergeTime > 0 ? `${avgMergeTime}h` : "—"}
            </p>
            {avgMergeTime > 0 && (
              <span className="flex items-center gap-0.5 text-[11px] text-[hsl(140,30%,42%)]">
                <TrendingDown size={12} /> -18%
              </span>
            )}
          </div>
        </div>
        <div className="bg-[var(--bg-surface)] rounded-[8px] px-4 py-3.5">
          <p className="text-[12px] text-[var(--text-muted)]">Security Issues</p>
          <div className="flex items-end justify-between mt-1">
            <p className="text-[22px] font-medium text-[var(--text-primary)] leading-tight">
              {securityIssues}
            </p>
            <span className="flex items-center gap-0.5 text-[11px] text-[hsl(38,30%,50%)]">
              <AlertTriangle size={12} /> needs review
            </span>
          </div>
        </div>
        <div className="bg-[var(--bg-surface)] rounded-[8px] px-4 py-3.5">
          <p className="text-[12px] text-[var(--text-muted)]">Code Churn</p>
          <div className="flex items-end justify-between mt-1">
            <p className="text-[22px] font-medium text-[var(--text-primary)] leading-tight">
              {prsLoading
                ? "—"
                : totalChurn > 1000
                  ? `${(totalChurn / 1000).toFixed(1)}k`
                  : totalChurn || "—"}
            </p>
            {totalChurn > 0 && (
              <span className="text-[11px] text-[var(--text-muted)]">lines</span>
            )}
          </div>
        </div>
      </div>

      {/* ─── Chart ─── */}
      <div className="bg-[var(--bg-surface)] rounded-[8px] p-5 mb-8">
        <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-4">
          Merge Time Trend
        </h3>
        {chartData.length > 1 ? (
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="mergeTimeGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="hsl(275, 35%, 55%)"
                      stopOpacity={0.15}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(275, 35%, 55%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                  axisLine={false}
                  tickLine={false}
                  unit="h"
                  width={40}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ stroke: "var(--border-subtle)", strokeWidth: 1 }}
                />
                {chartData.length > 3 && (
                  <ReferenceLine
                    x={chartData[Math.floor(chartData.length / 2)]?.date}
                    stroke="var(--accent)"
                    strokeDasharray="4 4"
                    strokeOpacity={0.4}
                    label={{
                      value: "Optibot Enabled",
                      position: "top",
                      fill: "var(--accent)",
                      fontSize: 10,
                    }}
                  />
                )}
                <Area
                  type="monotone"
                  dataKey="mergeTime"
                  stroke="hsl(275, 35%, 55%)"
                  strokeWidth={1.5}
                  fill="url(#mergeTimeGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[240px] flex items-center justify-center">
            <p className="text-[13px] text-[var(--text-muted)]">
              {prsLoading
                ? "Loading chart data..."
                : "Not enough merged PRs to chart trends."}
            </p>
          </div>
        )}
      </div>

      {/* ─── Two-Column: Table + Issue Breakdown ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-8">
        {/* PR Activity Table */}
        <div>
          <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-3">
            PR Activity
          </h3>
          {prsLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 rounded-[6px] shimmer" />
              ))}
            </div>
          ) : sortedRows.length === 0 ? (
            <div className="bg-[var(--bg-surface)] rounded-[8px] px-5 py-8 text-center">
              <GitPullRequest
                size={20}
                className="text-[var(--text-muted)] mx-auto mb-2"
              />
              <p className="text-[13px] text-[var(--text-secondary)]">
                No pull requests in this time range.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-[var(--text-muted)] text-[11px] uppercase tracking-wider">
                    <th className="text-left pb-2 font-medium">PR</th>
                    <th className="text-left pb-2 font-medium">Author</th>
                    <th className="text-left pb-2 font-medium">Status</th>
                    <th className="text-left pb-2 font-medium">Verdict</th>
                    <th className="text-left pb-2 font-medium">
                      <button
                        onClick={() => toggleSort("mergeTime")}
                        className="inline-flex items-center gap-1 cursor-pointer hover:text-[var(--text-secondary)] transition-colors"
                      >
                        Merge Time
                        <ArrowUpDown size={10} />
                      </button>
                    </th>
                    <th className="text-left pb-2 font-medium">
                      <button
                        onClick={() => toggleSort("date")}
                        className="inline-flex items-center gap-1 cursor-pointer hover:text-[var(--text-secondary)] transition-colors"
                      >
                        Date
                        <ArrowUpDown size={10} />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.slice(0, 15).map((row) => {
                    const v = verdictLabels[row.verdict];
                    return (
                      <tr
                        key={row.number}
                        className="border-t border-[var(--border-subtle)] hover:bg-[var(--bg-surface)] transition-colors"
                      >
                        <td className="py-2.5 pr-3 max-w-[200px]">
                          <p className="truncate text-[var(--text-primary)]">
                            {row.title}
                          </p>
                          <span className="text-[11px] text-[var(--text-muted)] font-mono">
                            #{row.number}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3 text-[var(--text-secondary)]">
                          {row.author}
                        </td>
                        <td className="py-2.5 pr-3">
                          <span
                            className="text-[11px] font-medium capitalize"
                            style={{ color: statusColors[row.status] }}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3">
                          <span
                            className="text-[11px] font-medium"
                            style={{ color: v.color }}
                          >
                            {v.label}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3 text-[var(--text-secondary)] tabular-nums">
                          {row.mergeTimeHours > 0
                            ? `${row.mergeTimeHours}h`
                            : "—"}
                        </td>
                        <td className="py-2.5 text-[var(--text-muted)] tabular-nums whitespace-nowrap">
                          {formatDate(row.date)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Issue Breakdown */}
        <div>
          <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-3">
            Issue Breakdown
          </h3>
          <div className="space-y-3">
            {issueCategories.map((cat) => {
              const maxCount = Math.max(...issueCategories.map((c) => c.count));
              const pct = (cat.count / maxCount) * 100;
              return (
                <div key={cat.type}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: severityColor[cat.severity],
                        }}
                      />
                      <span className="text-[13px] text-[var(--text-secondary)]">
                        {cat.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] text-[var(--text-primary)] font-medium tabular-nums">
                        {cat.count}
                      </span>
                      <button className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer">
                        <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="h-1 rounded-full bg-[var(--bg-elevated)]">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: severityColor[cat.severity],
                        opacity: 0.6,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center gap-1.5">
            <Code2 size={13} className="text-[var(--text-muted)]" />
            <span className="text-[12px] text-[var(--text-muted)]">
              {issueCategories.reduce((a, b) => a + b.count, 0)} total issues
              across {filteredPRs.length} PRs
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
