"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/Breadcrumb";
import { Toggle } from "@/components/dashboard/Toggle";
import { RepoSelector } from "@/components/dashboard/RepoSelector";

interface Repo {
  full_name: string;
  name: string;
  owner: { login: string };
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [config, setConfig] = useState({
    autoReview: true,
    autoReviewDraft: false,
    autoReviewPush: false,
    autoReviewWorkflow: false,
    allowApprove: false,
    codeSuggestions: true,
  });

  const [reviewsOpen, setReviewsOpen] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleToggle = (key: string, value: boolean) => {
    setConfig((c) => ({ ...c, [key]: value }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
            { label: "Settings" },
          ]}
          subtitle="Customize Optibot's review behavior per repository."
        />
        <RepoSelector
          repos={repos}
          selected={selectedRepo}
          onSelect={setSelectedRepo}
          loading={loading}
        />
      </div>

      {/* Reviews section */}
      <div className="bg-[var(--bg-surface)] rounded-[8px]">
        <button
          onClick={() => setReviewsOpen(!reviewsOpen)}
          className="w-full flex items-center justify-between px-5 py-4 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <h3 className="text-[14px] font-medium text-[var(--text-primary)]">Reviews</h3>
            {saved && (
              <span className="flex items-center gap-1 text-[12px] text-[hsl(140,40%,50%)]">
                <Check size={12} />
                Saved
              </span>
            )}
          </div>
          <ChevronDown
            size={16}
            className={`text-[var(--text-muted)] transition-transform ${reviewsOpen ? "rotate-180" : ""}`}
          />
        </button>

        {reviewsOpen && (
          <div className="px-5 pb-4 border-t border-[var(--border-subtle)]">
            <Toggle
              label="Auto review*"
              description="Automatically review every PR on open."
              checked={config.autoReview}
              onChange={(v) => handleToggle("autoReview", v)}
            />
            <div className="border-t border-[var(--border-subtle)]" />
            <Toggle
              label="Auto review on draft"
              description="Include draft PRs in automatic reviews."
              checked={config.autoReviewDraft}
              onChange={(v) => handleToggle("autoReviewDraft", v)}
            />
            <div className="border-t border-[var(--border-subtle)]" />
            <Toggle
              label="Auto review on push*"
              description="Trigger a new review whenever commits are pushed."
              checked={config.autoReviewPush}
              onChange={(v) => handleToggle("autoReviewPush", v)}
            />
            <div className="border-t border-[var(--border-subtle)]" />
            <Toggle
              label="Auto review after workflow*"
              description="Trigger a review only after a CI workflow completes."
              checked={config.autoReviewWorkflow}
              onChange={(v) => handleToggle("autoReviewWorkflow", v)}
            />
            <div className="border-t border-[var(--border-subtle)]" />
            <Toggle
              label="Allow approve"
              description="Approves PRs that pass all checks."
              checked={config.allowApprove}
              onChange={(v) => handleToggle("allowApprove", v)}
            />
            <div className="border-t border-[var(--border-subtle)]" />
            <Toggle
              label="Code suggestions"
              description="Allows the agent to generate inline code suggestions during reviews when needed."
              checked={config.codeSuggestions}
              onChange={(v) => handleToggle("codeSuggestions", v)}
            />

            <p className="text-[11px] text-[var(--text-muted)] mt-3 pt-3 border-t border-[var(--border-subtle)]">
              * These settings affect your monthly review usage quota.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
