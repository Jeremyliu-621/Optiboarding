"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Github,
  CheckCircle2,
  ExternalLink,
  BarChart3,
  Settings,
  GitFork,
} from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/Breadcrumb";

interface Repo {
  id: number;
  full_name: string;
  name: string;
  default_branch: string;
  language: string | null;
  owner: { login: string };
}

const languageColors: Record<string, string> = {
  TypeScript: "hsl(210, 55%, 55%)",
  JavaScript: "hsl(50, 65%, 50%)",
  Python: "hsl(210, 45%, 50%)",
  Rust: "hsl(25, 55%, 50%)",
  Go: "hsl(190, 50%, 45%)",
  Java: "hsl(10, 50%, 50%)",
  Ruby: "hsl(0, 50%, 50%)",
  CSS: "hsl(270, 50%, 55%)",
  HTML: "hsl(15, 65%, 55%)",
  Shell: "hsl(120, 30%, 45%)",
};

export default function GitHubIntegrationPage() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [orgName, setOrgName] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;

    const headers = {
      Authorization: `Bearer ${session.accessToken}`,
      Accept: "application/vnd.github.v3+json",
    };

    try {
      setLoading(true);
      const [reposRes, orgsRes] = await Promise.all([
        fetch("https://api.github.com/user/repos?sort=updated&per_page=20", { headers }),
        fetch("https://api.github.com/user/orgs", { headers }),
      ]);

      if (reposRes.ok) setRepos(await reposRes.json());
      if (orgsRes.ok) {
        const orgs = await orgsRes.json();
        if (orgs.length > 0) setOrgName(orgs[0].login);
      }
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Integrations", href: "/dashboard/integrations" },
          { label: "GitHub" },
        ]}
        subtitle="Manage your GitHub connection and connected repositories."
      />

      {/* Connection status */}
      <div className="bg-[var(--bg-surface)] rounded-[8px] p-5 flex items-center gap-4 mb-6 border-l-2 border-[hsl(140,40%,45%)]">
        <div className="w-10 h-10 rounded-[8px] bg-[hsl(0,0%,15%)] flex items-center justify-center">
          <Github size={20} className="text-[var(--text-primary)]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-medium text-[var(--text-primary)]">
              {orgName || "Personal Account"}
            </p>
            <span className="flex items-center gap-1.5 text-[12px] font-medium text-[hsl(140,40%,45%)]">
              <CheckCircle2 size={13} />
              Connected
            </span>
          </div>
          <p className="text-[12px] text-[var(--text-secondary)]">
            {repos.length} {repos.length === 1 ? "repository" : "repositories"} accessible
          </p>
        </div>
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Link href="/dashboard/insights" className="bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-[8px] p-5 text-left transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 size={18} className="text-[var(--accent)]" />
              <span className="text-[14px] font-medium text-[var(--text-primary)]">Repositories</span>
            </div>
            <span className="text-[13px] text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
              View stats →
            </span>
          </div>
        </Link>
        <a
          href="https://github.com/settings/installations"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-[8px] p-5 text-left transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings size={18} className="text-[var(--accent)]" />
              <span className="text-[14px] font-medium text-[var(--text-primary)]">Manage</span>
            </div>
            <span className="text-[13px] text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1">
              Open GitHub <ExternalLink size={12} />
            </span>
          </div>
        </a>
      </div>

      {/* Connected repos list */}
      <div>
        <h3 className="text-[14px] font-medium text-[var(--text-primary)] mb-3">
          Connected Repositories
        </h3>

        {loading && (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-[var(--bg-surface)] rounded-[8px] p-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded shimmer" />
                  <div className="h-3.5 w-48 rounded shimmer" />
                  <div className="ml-auto h-3 w-16 rounded shimmer" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="space-y-1.5">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-[8px] px-4 py-3 flex items-center gap-3 transition-colors group"
              >
                <GitFork size={15} className="text-[var(--text-muted)] shrink-0" />
                <span className="text-[13px] text-[var(--text-primary)] truncate flex-1 font-medium">
                  {repo.full_name}
                </span>
                {repo.language && (
                  <span className="flex items-center gap-1 shrink-0">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: languageColors[repo.language] || "var(--text-muted)" }}
                    />
                    <span className="text-[11px] text-[var(--text-muted)]">{repo.language}</span>
                  </span>
                )}
                <span className="text-[12px] text-[var(--text-muted)] shrink-0">
                  {repo.default_branch}
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[hsl(140,20%,15%)] text-[hsl(140,40%,50%)] shrink-0">
                  Active
                </span>
                <a
                  href={`https://github.com/${repo.full_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  <ExternalLink size={13} className="text-[var(--text-muted)] hover:text-[var(--accent)]" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
