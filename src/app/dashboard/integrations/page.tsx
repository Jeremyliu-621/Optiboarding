"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import {
  Github,
  GitlabIcon,
  Hash,
  Bug,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Toggle } from "@/components/dashboard/Toggle";

/* ─── Types ─── */
type TabId = "github" | "gitlab" | "slack" | "jira";
type PostAs = "review_comments" | "pr_comment";
type MinPR = "any" | "50" | "100" | "200";
type NotifFormat = "verbose" | "compact";
type JiraPriority = "Highest" | "High" | "Medium" | "Low" | "Lowest";

interface TabDef {
  id: TabId;
  label: string;
  icon: React.ElementType;
  color: string;
}

interface GitHubRepo {
  full_name: string;
  name: string;
  owner: { login: string };
}

/* ─── Static Data ─── */
const tabs: TabDef[] = [
  { id: "github", label: "GitHub", icon: Github, color: "hsl(0, 0%, 80%)" },
  { id: "gitlab", label: "GitLab", icon: GitlabIcon, color: "hsl(15, 65%, 55%)" },
  { id: "slack", label: "Slack", icon: Hash, color: "hsl(330, 45%, 55%)" },
  { id: "jira", label: "Jira", icon: Bug, color: "hsl(210, 55%, 55%)" },
];

const jiraSeverities = ["Critical", "High", "Medium", "Low"] as const;

/* ─── Segmented Control ─── */
function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex bg-[var(--bg-deep)] rounded-[6px] p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-[4px] text-[12px] font-medium transition-colors cursor-pointer ${
            value === opt.value
              ? "bg-[var(--bg-elevated)] text-[var(--text-primary)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Inline Confirm ─── */
function InlineConfirm({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex items-center gap-3 text-[13px]">
      <span className="text-[var(--text-secondary)]">{message}</span>
      <button
        onClick={onConfirm}
        className="px-3 py-1 rounded-[4px] bg-[hsl(0,30%,22%)] text-[hsl(0,60%,65%)] text-[12px] font-medium hover:bg-[hsl(0,30%,26%)] transition-colors cursor-pointer"
      >
        Disconnect
      </button>
      <button
        onClick={onCancel}
        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
      >
        Cancel
      </button>
    </div>
  );
}

/* ─── Main Page ─── */
export default function IntegrationsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<TabId>("github");

  // Connection state per integration
  const [connected, setConnected] = useState<Record<TabId, boolean>>({
    github: false,
    gitlab: false,
    slack: false,
    jira: false,
  });
  const [connecting, setConnecting] = useState<TabId | null>(null);
  const [disconnectConfirm, setDisconnectConfirm] = useState<TabId | null>(null);

  // GitHub config
  const [ghRepos, setGhRepos] = useState<GitHubRepo[]>([]);
  const [ghSelectedRepos, setGhSelectedRepos] = useState<Set<string>>(new Set());
  const [ghAutoReview, setGhAutoReview] = useState(true);
  const [ghPostAs, setGhPostAs] = useState<PostAs>("review_comments");
  const [ghMinPR, setGhMinPR] = useState<MinPR>("any");
  const [ghUsername, setGhUsername] = useState("");
  const [ghLastSync, setGhLastSync] = useState("");

  // GitLab config
  const [glInstanceUrl, setGlInstanceUrl] = useState("https://gitlab.com");
  const [glAutoReview, setGlAutoReview] = useState(true);

  // Slack config
  const [slChannel, setSlChannel] = useState("#optibot-reviews");
  const [slReviewComplete, setSlReviewComplete] = useState(true);
  const [slSecurityFlag, setSlSecurityFlag] = useState(true);
  const [slPRApproved, setSlPRApproved] = useState(false);
  const [slFormat, setSlFormat] = useState<NotifFormat>("compact");

  // Jira config
  const [jiraProjectKey, setJiraProjectKey] = useState("OPT");
  const [jiraAutoIssue, setJiraAutoIssue] = useState(false);
  const [jiraPriorityMap, setJiraPriorityMap] = useState<Record<string, JiraPriority>>({
    Critical: "Highest",
    High: "High",
    Medium: "Medium",
    Low: "Low",
  });

  // Dirty tracking + save state
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const markDirty = () => {
    setDirty(true);
    setSaved(false);
  };

  /* Fetch GitHub data on mount */
  const fetchGitHub = useCallback(async () => {
    if (!session?.accessToken) return;
    const headers = {
      Authorization: `Bearer ${session.accessToken}`,
      Accept: "application/vnd.github.v3+json",
    };
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch("https://api.github.com/user", { headers }),
        fetch("https://api.github.com/user/repos?sort=updated&per_page=20", { headers }),
      ]);
      if (userRes.ok) {
        const user = await userRes.json();
        setGhUsername(user.login);
        setGhLastSync(new Date().toLocaleTimeString());
      }
      if (reposRes.ok) {
        const repos: GitHubRepo[] = await reposRes.json();
        setGhRepos(repos);
        setGhSelectedRepos(new Set(repos.slice(0, 3).map((r) => r.full_name)));
      }
      setConnected((prev) => ({ ...prev, github: true }));
    } catch {
      /* graceful */
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchGitHub();
  }, [fetchGitHub]);

  const connectedCount = Object.values(connected).filter(Boolean).length;

  const handleConnect = (tab: TabId) => {
    setConnecting(tab);
    setTimeout(() => {
      setConnecting(null);
      setConnected((prev) => ({ ...prev, [tab]: true }));
    }, 1500);
  };

  const handleDisconnect = (tab: TabId) => {
    setConnected((prev) => ({ ...prev, [tab]: false }));
    setDisconnectConfirm(null);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setDirty(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  const toggleGhRepo = (repo: string) => {
    markDirty();
    setGhSelectedRepos((prev) => {
      const next = new Set(prev);
      if (next.has(repo)) next.delete(repo);
      else next.add(repo);
      return next;
    });
  };

  return (
    <>
      {/* Summary */}
      <p className="text-[13px] text-[var(--text-muted)] mb-6">
        {connectedCount} of {tabs.length} integrations connected
      </p>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-8 border-b border-[var(--border-subtle)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setDisconnectConfirm(null);
            }}
            className={`relative px-4 py-2.5 text-[13px] font-medium transition-colors cursor-pointer ${
              activeTab === tab.id
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {tab.label}
            {connected[tab.id] && (
              <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-[hsl(140,35%,42%)] inline-block" />
            )}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--accent)] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* ─── Tab Content ─── */}
      {tabs
        .filter((t) => t.id === activeTab)
        .map((tab) => {
          const isConnected = connected[tab.id];
          const TabIcon = tab.icon;

          return (
            <div key={tab.id}>
              {/* Connection Status */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-[8px] flex items-center justify-center"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${tab.color} 15%, transparent)`,
                    }}
                  >
                    <TabIcon size={20} style={{ color: tab.color }} />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[var(--text-primary)]">
                      {tab.label}
                    </p>
                    <p className="text-[12px] text-[var(--text-muted)]">
                      {isConnected ? (
                        <>
                          <span className="inline-flex items-center gap-1 text-[hsl(140,30%,42%)]">
                            <CheckCircle2 size={11} />
                            Connected
                            {tab.id === "github" && ghUsername && (
                              <span className="text-[var(--text-muted)] ml-1">
                                as @{ghUsername}
                              </span>
                            )}
                          </span>
                          {tab.id === "github" && ghLastSync && (
                            <span className="ml-2">
                              · Last synced: {ghLastSync}
                            </span>
                          )}
                        </>
                      ) : (
                        "Not connected"
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  {disconnectConfirm === tab.id ? (
                    <InlineConfirm
                      message={`Disconnect ${tab.label}?`}
                      onConfirm={() => handleDisconnect(tab.id)}
                      onCancel={() => setDisconnectConfirm(null)}
                    />
                  ) : isConnected ? (
                    <button
                      onClick={() => setDisconnectConfirm(tab.id)}
                      className="px-3 py-1.5 rounded-[6px] text-[13px] font-medium text-[hsl(0,45%,60%)] bg-[hsl(0,25%,15%)] hover:bg-[hsl(0,25%,20%)] transition-colors cursor-pointer"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnect(tab.id)}
                      disabled={connecting === tab.id}
                      className="px-4 py-1.5 rounded-[6px] text-[13px] font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors disabled:opacity-60 cursor-pointer flex items-center gap-1.5"
                    >
                      {connecting === tab.id ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        `Connect with ${tab.label}`
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Configuration — only if connected */}
              {isConnected && (
                <div className="bg-[var(--bg-surface)] rounded-[8px] p-5 space-y-1">
                  {/* ─── GitHub Config ─── */}
                  {tab.id === "github" && (
                    <>
                      <p className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-3">
                        Monitored Repositories
                      </p>
                      <div className="max-h-[200px] overflow-y-auto space-y-1 mb-4">
                        {ghRepos.map((repo) => (
                          <label
                            key={repo.full_name}
                            className="flex items-center gap-2.5 px-2 py-1.5 rounded-[4px] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer text-[13px]"
                          >
                            <input
                              type="checkbox"
                              checked={ghSelectedRepos.has(repo.full_name)}
                              onChange={() => toggleGhRepo(repo.full_name)}
                              className="accent-[var(--accent)]"
                            />
                            <span className="text-[var(--text-primary)] font-mono truncate">
                              {repo.full_name}
                            </span>
                          </label>
                        ))}
                      </div>
                      <Toggle
                        label="Auto-review on PR open"
                        description="Optibot will automatically review new pull requests"
                        checked={ghAutoReview}
                        onChange={(v) => { setGhAutoReview(v); markDirty(); }}
                      />
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="text-[13px] font-medium text-[var(--text-primary)]">Post review as</p>
                        </div>
                        <Segmented
                          options={[
                            { value: "review_comments" as PostAs, label: "Review Comments" },
                            { value: "pr_comment" as PostAs, label: "PR Comment" },
                          ]}
                          value={ghPostAs}
                          onChange={(v) => { setGhPostAs(v); markDirty(); }}
                        />
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <p className="text-[13px] font-medium text-[var(--text-primary)]">
                          Minimum PR size
                        </p>
                        <select
                          value={ghMinPR}
                          onChange={(e) => { setGhMinPR(e.target.value as MinPR); markDirty(); }}
                          className="bg-[var(--bg-deep)] text-[var(--text-primary)] text-[13px] px-3 py-1.5 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
                        >
                          <option value="any">Any</option>
                          <option value="50">50+ lines</option>
                          <option value="100">100+ lines</option>
                          <option value="200">200+ lines</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* ─── GitLab Config ─── */}
                  {tab.id === "gitlab" && (
                    <>
                      <div className="py-3">
                        <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">
                          GitLab Instance URL
                        </label>
                        <input
                          type="text"
                          value={glInstanceUrl}
                          onChange={(e) => { setGlInstanceUrl(e.target.value); markDirty(); }}
                          className="w-full bg-[var(--bg-deep)] text-[var(--text-primary)] text-[13px] px-3 py-2 rounded-[6px] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] font-mono"
                        />
                      </div>
                      <Toggle
                        label="Auto-review on merge request"
                        description="Automatically review new merge requests"
                        checked={glAutoReview}
                        onChange={(v) => { setGlAutoReview(v); markDirty(); }}
                      />
                    </>
                  )}

                  {/* ─── Slack Config ─── */}
                  {tab.id === "slack" && (
                    <>
                      <div className="py-3">
                        <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">
                          Notification channel
                        </label>
                        <div className="flex items-center gap-0">
                          <span className="text-[var(--text-muted)] text-[13px] bg-[var(--bg-deep)] px-2.5 py-2 rounded-l-[6px] border-r border-[var(--border-subtle)]">
                            #
                          </span>
                          <input
                            type="text"
                            value={slChannel.replace("#", "")}
                            onChange={(e) => { setSlChannel("#" + e.target.value); markDirty(); }}
                            className="flex-1 bg-[var(--bg-deep)] text-[var(--text-primary)] text-[13px] px-3 py-2 rounded-r-[6px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                          />
                        </div>
                      </div>
                      <p className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium pt-2">
                        Notification Triggers
                      </p>
                      <Toggle label="Review complete" checked={slReviewComplete} onChange={(v) => { setSlReviewComplete(v); markDirty(); }} />
                      <Toggle label="Security flag found" checked={slSecurityFlag} onChange={(v) => { setSlSecurityFlag(v); markDirty(); }} />
                      <Toggle label="PR approved by Optibot" checked={slPRApproved} onChange={(v) => { setSlPRApproved(v); markDirty(); }} />
                      <div className="flex items-center justify-between py-3">
                        <p className="text-[13px] font-medium text-[var(--text-primary)]">
                          Notification format
                        </p>
                        <Segmented
                          options={[
                            { value: "verbose" as NotifFormat, label: "Verbose" },
                            { value: "compact" as NotifFormat, label: "Compact" },
                          ]}
                          value={slFormat}
                          onChange={(v) => { setSlFormat(v); markDirty(); }}
                        />
                      </div>
                    </>
                  )}

                  {/* ─── Jira Config ─── */}
                  {tab.id === "jira" && (
                    <>
                      <div className="py-3">
                        <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">
                          Project Key
                        </label>
                        <input
                          type="text"
                          value={jiraProjectKey}
                          onChange={(e) => { setJiraProjectKey(e.target.value.toUpperCase()); markDirty(); }}
                          className="w-full max-w-[200px] bg-[var(--bg-deep)] text-[var(--text-primary)] text-[13px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] font-mono uppercase"
                        />
                      </div>
                      <Toggle
                        label="Auto-create issue on security flag"
                        description="Automatically file a Jira ticket when Optibot flags a security concern"
                        checked={jiraAutoIssue}
                        onChange={(v) => { setJiraAutoIssue(v); markDirty(); }}
                      />
                      <p className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium pt-3 mb-2">
                        Priority Mapping
                      </p>
                      <div className="space-y-2">
                        {jiraSeverities.map((sev) => (
                          <div
                            key={sev}
                            className="flex items-center justify-between text-[13px]"
                          >
                            <span className="text-[var(--text-secondary)]">
                              {sev}
                            </span>
                            <select
                              value={jiraPriorityMap[sev]}
                              onChange={(e) => {
                                setJiraPriorityMap((prev) => ({
                                  ...prev,
                                  [sev]: e.target.value as JiraPriority,
                                }));
                                markDirty();
                              }}
                              className="bg-[var(--bg-deep)] text-[var(--text-primary)] text-[12px] px-2 py-1 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
                            >
                              {(["Highest", "High", "Medium", "Low", "Lowest"] as JiraPriority[]).map(
                                (p) => (
                                  <option key={p} value={p}>
                                    {p}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Save button */}
                  <div className="pt-4 border-t border-[var(--border-subtle)] mt-4">
                    <button
                      onClick={handleSave}
                      disabled={!dirty || saving}
                      className={`px-4 py-2 rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer ${
                        dirty
                          ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                          : "bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed"
                      }`}
                    >
                      {saving ? (
                        <span className="flex items-center gap-1.5">
                          <Loader2 size={13} className="animate-spin" />
                          Saving...
                        </span>
                      ) : saved ? (
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 size={13} />
                          Saved
                        </span>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </>
  );
}
