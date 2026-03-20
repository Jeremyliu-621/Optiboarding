"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { GitPullRequest, Clock, TrendingUp, BarChart3, LineChart } from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/Breadcrumb";
import { RepoSelector } from "@/components/dashboard/RepoSelector";

interface Repo {
  full_name: string;
  name: string;
  owner: { login: string };
}

export default function InsightsPage() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRepos = useCallback(async () => {
    if (!session?.accessToken) return;

    try {
      setLoading(true);
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
      // Graceful fallback
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return (
    <>
      <div className="flex items-start justify-between gap-4 mb-6">
        <Breadcrumb
          items={[
            { label: "Repo Insights" },
          ]}
        />
        <div className="flex items-center gap-3 shrink-0">
          <RepoSelector
            repos={repos}
            selected={selectedRepo}
            onSelect={setSelectedRepo}
            loading={loading}
          />
          {/* Date range placeholder */}
          <div className="flex items-center gap-1.5 h-9 px-3 rounded-[6px] text-[13px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
            <Clock size={14} />
            <span>Last 30 days</span>
          </div>
        </div>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[var(--bg-surface)] rounded-[8px] p-5 hover:bg-[var(--bg-elevated)] transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-[6px] bg-[hsl(200,20%,17%)] flex items-center justify-center">
              <GitPullRequest size={16} style={{ color: "hsl(200, 45%, 55%)" }} />
            </div>
            <p className="text-[12px] text-[var(--text-muted)] uppercase tracking-wider">Before Optibot</p>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[24px] font-bold text-[var(--text-primary)]">&mdash;</p>
              <p className="text-[12px] text-[var(--text-secondary)]">Pull Requests</p>
            </div>
            <div>
              <p className="text-[24px] font-bold text-[var(--text-primary)]">&mdash;</p>
              <p className="text-[12px] text-[var(--text-secondary)]">Avg Cycle Time</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] rounded-[8px] p-5 hover:bg-[var(--bg-elevated)] transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-[6px] bg-[hsl(140,20%,15%)] flex items-center justify-center">
                <GitPullRequest size={16} style={{ color: "hsl(140, 40%, 50%)" }} />
              </div>
              <p className="text-[12px] text-[var(--text-muted)] uppercase tracking-wider">With Optibot</p>
            </div>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[hsl(140,20%,15%)] text-[hsl(140,40%,50%)]">
              Active
            </span>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[24px] font-bold text-[var(--text-primary)]">&mdash;</p>
              <p className="text-[12px] text-[var(--text-secondary)]">Pull Requests</p>
            </div>
            <div>
              <p className="text-[24px] font-bold text-[var(--text-primary)]">&mdash;</p>
              <p className="text-[12px] text-[var(--text-secondary)]">Avg Cycle Time</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] rounded-[8px] p-5 hover:bg-[var(--bg-elevated)] transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-[6px] bg-[hsl(275,15%,20%)] flex items-center justify-center">
              <TrendingUp size={16} style={{ color: "hsl(275, 35%, 55%)" }} />
            </div>
            <p className="text-[12px] text-[var(--text-muted)] uppercase tracking-wider">Improvement</p>
          </div>
          <p className="text-[28px] font-bold text-[var(--text-primary)] leading-tight">&mdash;</p>
          <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">Overall Improvement</p>
        </div>
      </div>

      {/* Chart area */}
      <div className="bg-[var(--bg-surface)] rounded-[8px] p-8 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(var(--text-muted) 1px, transparent 1px),
              linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Decorative chart lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 300">
          <path
            d="M0 220 Q100 200 200 180 Q300 160 400 150 Q500 140 600 120 Q700 100 800 80"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.08"
          />
          <path
            d="M0 250 Q100 240 200 230 Q300 220 400 200 Q500 180 600 170 Q700 165 800 160"
            fill="none"
            stroke="hsl(200, 45%, 55%)"
            strokeWidth="1.5"
            opacity="0.08"
          />
          <path
            d="M0 180 Q100 190 200 170 Q300 140 400 160 Q500 130 600 100 Q700 110 800 60"
            fill="none"
            stroke="hsl(140, 40%, 50%)"
            strokeWidth="1.5"
            opacity="0.06"
          />
        </svg>

        <div className="relative flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mb-4">
            <BarChart3 size={28} className="text-[var(--text-muted)]" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <LineChart size={16} className="text-[var(--text-muted)]" />
            <h3 className="text-[16px] font-medium text-[var(--text-primary)]">
              No Historical Data
            </h3>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] max-w-[380px]">
            {selectedRepo
              ? `Insufficient data to display analytics for ${selectedRepo}. Start using Optibot on this repository to generate insights.`
              : "Select a repository and start using Optibot to generate analytics data."}
          </p>
        </div>
      </div>
    </>
  );
}
