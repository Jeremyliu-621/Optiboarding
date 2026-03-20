"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { Sparkles, PenLine, FileText, ChevronDown } from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/Breadcrumb";
import { RepoSelector } from "@/components/dashboard/RepoSelector";
import { EmptyState } from "@/components/dashboard/EmptyState";

interface Repo {
  full_name: string;
  name: string;
  owner: { login: string };
}

export default function GuidelinesPage() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(false);

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
            { label: "Configuration", href: "/dashboard/configuration" },
            { label: "Guidelines" },
          ]}
          subtitle="Define review guidelines for Optibot to follow per repository."
        />
        <RepoSelector
          repos={repos}
          selected={selectedRepo}
          onSelect={setSelectedRepo}
          loading={loading}
        />
      </div>

      <div className="space-y-6">
        <div className="bg-[var(--bg-surface)] rounded-[8px] p-6">
          <EmptyState
            icon={FileText}
            title="No Guidelines Yet"
            description="Tell Optibot how your team likes code reviewed. Generate guidelines from your codebase with AI, or write your own from scratch."
            actions={
              <>
                <button className="h-9 px-4 rounded-[6px] text-[13px] font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors cursor-pointer flex items-center gap-2">
                  <Sparkles size={14} />
                  Generate with AI
                </button>
                <button className="h-9 px-4 rounded-[6px] text-[13px] font-medium bg-transparent border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer flex items-center gap-2">
                  <PenLine size={14} />
                  Write Manually
                </button>
              </>
            }
          />
        </div>

        {/* Collapsible about section */}
        <div className="bg-[var(--bg-surface)] rounded-[8px]">
          <button
            onClick={() => setAboutOpen(!aboutOpen)}
            className="w-full flex items-center justify-between px-5 py-4 cursor-pointer"
          >
            <h3 className="text-[13px] font-medium text-[var(--text-secondary)]">
              About Repository Guidelines & Best Practices
            </h3>
            <ChevronDown
              size={16}
              className={`text-[var(--text-muted)] transition-transform ${aboutOpen ? "rotate-180" : ""}`}
            />
          </button>

          {aboutOpen && (
            <div className="px-5 pb-5 border-t border-[var(--border-subtle)] pt-4">
              <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed space-y-3">
                <p>
                  Repository guidelines help Optibot understand your team&apos;s coding standards and preferences. When guidelines are configured, Optibot will reference them during code reviews to provide more relevant feedback.
                </p>
                <p>
                  You can write guidelines manually or let AI analyze your codebase to generate them automatically. Guidelines can cover naming conventions, architecture patterns, testing requirements, and any other standards your team follows.
                </p>
                <p>
                  Guidelines are stored as a markdown file in your repository and can be updated at any time.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
