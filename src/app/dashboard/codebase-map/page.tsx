"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { GitFork, Info, Save, Network } from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/Breadcrumb";

interface Repo {
  id: number;
  full_name: string;
  name: string;
  language: string | null;
  description: string | null;
  updated_at: string;
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

export default function CodebaseMapPage() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRepos = useCallback(async () => {
    if (!session?.accessToken) return;

    try {
      setLoading(true);
      const res = await fetch(
        "https://api.github.com/user/repos?sort=updated&per_page=30",
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
            { label: "Codebase Map" },
          ]}
          subtitle="Create a visual representation of your organization's repository connections."
        />
        <button
          disabled
          title="Coming soon"
          className="h-9 px-4 rounded-[6px] text-[13px] font-medium bg-[var(--accent)] text-white opacity-50 cursor-not-allowed flex items-center gap-2 shrink-0"
        >
          <Save size={14} />
          Save Map
        </button>
      </div>

      {/* Repo node grid */}
      <div className="bg-[var(--bg-surface)] rounded-[8px] p-6 min-h-[500px] relative overflow-hidden">
        {/* Background dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--text-muted) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {loading && (
          <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-[var(--bg-elevated)] rounded-[8px] p-4">
                <div className="h-4 w-24 rounded shimmer mb-2" />
                <div className="h-3 w-16 rounded shimmer" />
              </div>
            ))}
          </div>
        )}

        {!loading && repos.length === 0 && (
          <div className="relative flex flex-col items-center justify-center h-[400px] text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mb-4">
              <Network size={28} className="text-[var(--text-muted)]" />
            </div>
            <p className="text-[14px] font-medium text-[var(--text-primary)]">No repositories found</p>
            <p className="text-[13px] text-[var(--text-secondary)] mt-1">Connect GitHub to see your repositories here.</p>
          </div>
        )}

        {!loading && repos.length > 0 && (
          <>
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  className="relative bg-[var(--bg-elevated)] hover:bg-[var(--bg-deep)] rounded-[8px] p-4 transition-all duration-200 group cursor-default hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  {/* Connection handles */}
                  <div className="absolute top-1/2 -left-1.5 w-3 h-3 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-60 transition-opacity -translate-y-1/2" />
                  <div className="absolute top-1/2 -right-1.5 w-3 h-3 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-60 transition-opacity -translate-y-1/2" />
                  <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-60 transition-opacity -translate-x-1/2" />
                  <div className="absolute -bottom-1.5 left-1/2 w-3 h-3 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-60 transition-opacity -translate-x-1/2" />

                  <div className="flex items-center gap-2 mb-1.5">
                    <GitFork size={13} className="text-[var(--text-muted)] shrink-0" />
                    <p className="text-[13px] font-medium text-[var(--text-primary)] truncate">
                      {repo.name}
                    </p>
                  </div>
                  {repo.description && (
                    <p className="text-[11px] text-[var(--text-muted)] truncate mb-2">
                      {repo.description}
                    </p>
                  )}
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: languageColors[repo.language] || "var(--text-muted)" }}
                      />
                      <span className="text-[11px] text-[var(--text-muted)]">{repo.language}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Tips bar */}
      <div className="mt-4 flex items-start gap-2.5 bg-[var(--bg-surface)] rounded-[8px] px-4 py-3">
        <Info size={15} className="text-[var(--accent)] shrink-0 mt-0.5" />
        <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
          <strong className="text-[var(--text-primary)]">Tip:</strong> The codebase map helps Optibot understand relationships between your repositories for cross-repo context during reviews. Hover over nodes to reveal connection handles. Full drag-and-drop editing coming soon.
        </p>
      </div>
    </>
  );
}
