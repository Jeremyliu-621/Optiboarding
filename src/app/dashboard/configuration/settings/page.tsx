"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { ChevronDown, Check, Plus, Settings, Code } from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/Breadcrumb";
import { Toggle } from "@/components/dashboard/Toggle";
import { RepoSelector } from "@/components/dashboard/RepoSelector";

interface Repo {
  full_name: string;
  name: string;
  owner: { login: string };
}

/* ── JSON shape matching the screenshot ── */
interface SettingsJson {
  reviews: {
    auto: boolean;
    autoOnPush: boolean;
    autoOnDraft: boolean;
    autoAfterWorkflow: {
      enabled: boolean;
      excludeWorkflows: string[];
      notificationComments: boolean;
    };
    autoApprove: boolean;
    codeSuggestionsSkipFiles: string[];
    codeSuggestions: boolean;
    sensitivity: string;
    excludedLabels: string[];
    excludedUsers: string[];
  };
  dependencyBundler: {
    enabled: boolean;
  };
  summary: {
    auto: boolean;
    autoOnDraft: boolean;
    level: string;
    excludedLabels: string[];
    excludedUsers: string[];
  };
  enableCIFixer: boolean;
  guidelinesUrl: string;
  tagToTalk: boolean;
}

/* ── Collapsible section wrapper ── */
function Section({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--bg-surface)] rounded-[8px]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer"
      >
        <h3 className="text-[14px] font-medium text-[var(--text-primary)]">
          {title}
        </h3>
        <ChevronDown
          size={16}
          className={`text-[var(--text-muted)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-[var(--border-subtle)]">
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Tag list input ── */
function TagInput({
  label,
  description,
  placeholder,
  values,
  onChange,
}: {
  label: string;
  description: string;
  placeholder: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setDraft("");
  };

  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));

  return (
    <div className="py-3">
      <p className="text-[13px] font-medium text-[var(--text-primary)]">{label}</p>
      <p className="text-[12px] text-[var(--text-secondary)] mt-0.5 mb-2">{description}</p>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {values.map((v, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[12px] bg-[var(--accent-muted)] text-[var(--text-primary)]">
              {v}
              <button onClick={() => remove(i)} className="ml-0.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer">&times;</button>
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={placeholder}
          className="flex-1 h-9 px-3 rounded-[6px] text-[13px] bg-[var(--bg-deep)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
        />
        <button onClick={add} className="shrink-0 h-9 px-3 rounded-[6px] text-[12px] font-medium bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--accent-muted)] transition-colors flex items-center gap-1 cursor-pointer">
          <Plus size={13} /> Add
        </button>
      </div>
    </div>
  );
}

/* ── Select dropdown ── */
function SelectField({
  label, description, value, options, onChange,
}: {
  label: string; description: string; value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-[var(--text-primary)]">{label}</p>
        <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">{description}</p>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="shrink-0 h-9 px-3 pr-8 rounded-[6px] text-[13px] bg-[var(--bg-deep)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-all cursor-pointer appearance-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23656d76' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

/* ── Text input field ── */
function TextField({
  label, description, value, placeholder, onChange, helperNode,
}: {
  label: string; description: string; value: string; placeholder: string;
  onChange: (v: string) => void; helperNode?: React.ReactNode;
}) {
  return (
    <div className="py-3">
      <p className="text-[13px] font-medium text-[var(--text-primary)]">{label}</p>
      <p className="text-[12px] text-[var(--text-secondary)] mt-0.5 mb-2">{description}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 px-3 rounded-[6px] text-[13px] bg-[var(--bg-deep)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
      />
      {helperNode && <div className="mt-1.5">{helperNode}</div>}
    </div>
  );
}

/* ── Syntax-highlighted JSON editor ── */
function JsonEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const highlighted = useMemo(() => {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // strings
      .replace(/"([^"\\]|\\.)*"/g, (match) => {
        // check if it's a key (followed by :)
        return `<span class="json-string">${match}</span>`;
      })
      // booleans
      .replace(/\b(true|false)\b/g, '<span class="json-bool">$1</span>')
      // numbers
      .replace(/\b(\d+)\b/g, '<span class="json-number">$1</span>');
  }, [value]);

  return (
    <div className="relative bg-[var(--bg-surface)] rounded-[8px] overflow-hidden">
      <div className="relative">
        <pre
          className="p-5 text-[13px] leading-[1.6] font-mono overflow-auto pointer-events-none"
          aria-hidden
          dangerouslySetInnerHTML={{ __html: highlighted }}
          style={{ color: "var(--text-primary)" }}
        />
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="absolute inset-0 w-full h-full p-5 text-[13px] leading-[1.6] font-mono bg-transparent text-transparent caret-[var(--text-primary)] resize-none focus:outline-none selection:bg-[var(--accent-muted)]"
        />
      </div>
      <style jsx>{`
        :global(.json-string) { color: hsl(140, 40%, 55%); }
        :global(.json-bool)   { color: hsl(210, 60%, 60%); }
        :global(.json-number) { color: hsl(30, 70%, 60%); }
      `}</style>
    </div>
  );
}

const Divider = () => <div className="border-t border-[var(--border-subtle)]" />;

/* ══════════════════════════════════════════════════════════════════════════ */

export default function SettingsPage() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"form" | "json">("form");

  /* ── Reviews state ── */
  const [reviewsOpen, setReviewsOpen] = useState(true);
  const [reviews, setReviews] = useState({
    autoReview: true,
    autoReviewDraft: false,
    autoReviewPush: false,
    autoReviewWorkflow: false,
    autoReviewWorkflowExclude: [] as string[],
    autoReviewWorkflowNotifications: false,
    allowApprove: false,
    codeSuggestions: true,
  });
  const [skipFiles, setSkipFiles] = useState<string[]>([]);
  const [sensitivity, setSensitivity] = useState("medium");
  const [reviewExcludedLabels, setReviewExcludedLabels] = useState<string[]>([]);
  const [reviewExcludedUsers, setReviewExcludedUsers] = useState<string[]>([]);

  /* ── Summary state ── */
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [summary, setSummary] = useState({
    autoSummary: true,
    autoSummaryDraft: true,
  });
  const [summaryLevel, setSummaryLevel] = useState("basic");
  const [summaryExcludedLabels, setSummaryExcludedLabels] = useState<string[]>([]);
  const [summaryExcludedUsers, setSummaryExcludedUsers] = useState<string[]>([]);

  /* ── Dependency Bundler state ── */
  const [bundlerOpen, setBundlerOpen] = useState(true);
  const [bundlerEnabled, setBundlerEnabled] = useState(true);

  /* ── Other Settings state ── */
  const [otherOpen, setOtherOpen] = useState(true);
  const [enableCIFixer, setEnableCIFixer] = useState(false);
  const [tagToTalk, setTagToTalk] = useState(false);
  const [guidelinesUrl, setGuidelinesUrl] = useState("");

  /* ── Saved indicator ── */
  const [saved, setSaved] = useState(false);
  const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const handleReviewToggle = (key: string, value: boolean) => {
    setReviews((c) => ({ ...c, [key]: value }));
    flash();
  };
  const handleSummaryToggle = (key: string, value: boolean) => {
    setSummary((c) => ({ ...c, [key]: value }));
    flash();
  };

  /* ── Build JSON from state ── */
  const toJson = useCallback((): SettingsJson => ({
    reviews: {
      auto: reviews.autoReview,
      autoOnPush: reviews.autoReviewPush,
      autoOnDraft: reviews.autoReviewDraft,
      autoAfterWorkflow: {
        enabled: reviews.autoReviewWorkflow,
        excludeWorkflows: reviews.autoReviewWorkflowExclude,
        notificationComments: reviews.autoReviewWorkflowNotifications,
      },
      autoApprove: reviews.allowApprove,
      codeSuggestionsSkipFiles: skipFiles,
      codeSuggestions: reviews.codeSuggestions,
      sensitivity,
      excludedLabels: reviewExcludedLabels,
      excludedUsers: reviewExcludedUsers,
    },
    dependencyBundler: { enabled: bundlerEnabled },
    summary: {
      auto: summary.autoSummary,
      autoOnDraft: summary.autoSummaryDraft,
      level: summaryLevel,
      excludedLabels: summaryExcludedLabels,
      excludedUsers: summaryExcludedUsers,
    },
    enableCIFixer,
    guidelinesUrl,
    tagToTalk,
  }), [reviews, skipFiles, sensitivity, reviewExcludedLabels, reviewExcludedUsers, bundlerEnabled, summary, summaryLevel, summaryExcludedLabels, summaryExcludedUsers, enableCIFixer, guidelinesUrl, tagToTalk]);

  /* ── Apply JSON to state ── */
  const applyJson = useCallback((json: SettingsJson) => {
    setReviews({
      autoReview: json.reviews.auto,
      autoReviewDraft: json.reviews.autoOnDraft,
      autoReviewPush: json.reviews.autoOnPush,
      autoReviewWorkflow: json.reviews.autoAfterWorkflow.enabled,
      autoReviewWorkflowExclude: json.reviews.autoAfterWorkflow.excludeWorkflows,
      autoReviewWorkflowNotifications: json.reviews.autoAfterWorkflow.notificationComments,
      allowApprove: json.reviews.autoApprove,
      codeSuggestions: json.reviews.codeSuggestions,
    });
    setSkipFiles(json.reviews.codeSuggestionsSkipFiles);
    setSensitivity(json.reviews.sensitivity);
    setReviewExcludedLabels(json.reviews.excludedLabels);
    setReviewExcludedUsers(json.reviews.excludedUsers);
    setBundlerEnabled(json.dependencyBundler.enabled);
    setSummary({
      autoSummary: json.summary.auto,
      autoSummaryDraft: json.summary.autoOnDraft,
    });
    setSummaryLevel(json.summary.level);
    setSummaryExcludedLabels(json.summary.excludedLabels);
    setSummaryExcludedUsers(json.summary.excludedUsers);
    setEnableCIFixer(json.enableCIFixer);
    setGuidelinesUrl(json.guidelinesUrl);
    setTagToTalk(json.tagToTalk);
  }, []);

  /* ── JSON editor state ── */
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Sync form → JSON when switching to JSON tab
  useEffect(() => {
    if (viewMode === "json") {
      setJsonText(JSON.stringify(toJson(), null, 2));
      setJsonError(null);
    }
  }, [viewMode, toJson]);

  // Validate & apply JSON edits
  const handleJsonChange = (text: string) => {
    setJsonText(text);
    try {
      const parsed = JSON.parse(text) as SettingsJson;
      setJsonError(null);
      applyJson(parsed);
      flash();
    } catch {
      setJsonError("Invalid JSON");
    }
  };

  /* ── Fetch repos ── */
  const fetchRepos = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      setLoading(true);
      const res = await fetch(
        "https://api.github.com/user/repos?sort=updated&per_page=20",
        { headers: { Authorization: `Bearer ${session.accessToken}`, Accept: "application/vnd.github.v3+json" } }
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

  useEffect(() => { fetchRepos(); }, [fetchRepos]);

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
        <div className="flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-1 text-[12px] text-[hsl(140,40%,50%)]">
              <Check size={12} /> Saved
            </span>
          )}
          <RepoSelector repos={repos} selected={selectedRepo} onSelect={setSelectedRepo} loading={loading} />
        </div>
      </div>

      {/* ── Form / JSON tab bar ── */}
      <div className="flex items-center gap-1 mb-4 border-b border-[var(--border-subtle)]">
        <button
          onClick={() => setViewMode("form")}
          className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium cursor-pointer transition-colors border-b-2 -mb-px ${
            viewMode === "form"
              ? "border-[var(--accent)] text-[var(--text-primary)]"
              : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
          }`}
        >
          <Settings size={14} /> Form
        </button>
        <button
          onClick={() => setViewMode("json")}
          className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium cursor-pointer transition-colors border-b-2 -mb-px ${
            viewMode === "json"
              ? "border-[var(--accent)] text-[var(--text-primary)]"
              : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
          }`}
        >
          <Code size={14} /> JSON
        </button>
      </div>

      {viewMode === "json" ? (
        /* ═══ JSON view ═══ */
        <div className="space-y-4">
          <JsonEditor value={jsonText} onChange={handleJsonChange} />
          {jsonError && (
            <p className="text-[12px] text-[hsl(0,60%,55%)]">{jsonError}</p>
          )}
          <div className="flex justify-end pt-2">
            <button onClick={flash} className="h-9 px-5 rounded-[6px] text-[13px] font-medium bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors cursor-pointer">
              Save for {selectedRepo ?? "repository"}
            </button>
          </div>
        </div>
      ) : (
        /* ═══ Form view ═══ */
        <div className="space-y-4">
          {/* Reviews */}
          <Section title="Reviews" open={reviewsOpen} onToggle={() => setReviewsOpen(!reviewsOpen)}>
            <Toggle label="Auto review*" description="Automatically review every PR on open." checked={reviews.autoReview} onChange={(v) => handleReviewToggle("autoReview", v)} />
            <div className="pl-5 border-l-2 border-[var(--border-subtle)] ml-1">
              <Toggle label="Auto review on draft" description="Include draft PRs in automatic reviews." checked={reviews.autoReviewDraft} onChange={(v) => handleReviewToggle("autoReviewDraft", v)} />
            </div>
            <Divider />
            <Toggle label="Auto review on push*" description="Trigger a new review whenever commits are pushed." checked={reviews.autoReviewPush} onChange={(v) => handleReviewToggle("autoReviewPush", v)} />
            <Divider />
            <Toggle label="Auto review after workflow*" description="Trigger a review only after a CI workflow completes." checked={reviews.autoReviewWorkflow} onChange={(v) => handleReviewToggle("autoReviewWorkflow", v)} />
            <Divider />
            <Toggle label="Allow approve" description="Approves PRs that pass all checks." checked={reviews.allowApprove} onChange={(v) => handleReviewToggle("allowApprove", v)} />
            <Divider />
            <Toggle label="Code suggestions" description="Allows the agent to generate inline code suggestions during reviews when needed." checked={reviews.codeSuggestions} onChange={(v) => handleReviewToggle("codeSuggestions", v)} />
            <Divider />
            <TagInput label="Skip files" description="Files that should be skipped in the review process." placeholder="e.g. *.md, docs/*" values={skipFiles} onChange={(v) => { setSkipFiles(v); flash(); }} />
            <Divider />
            <SelectField label="Sensitivity" description="Controls the strictness of the review process. Medium is recommended." value={sensitivity} options={[{ value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" }]} onChange={(v) => { setSensitivity(v); flash(); }} />
            <Divider />
            <TagInput label="Excluded labels" description="PRs carrying any of these labels are skipped for automatic reviews." placeholder="e.g. wontfix" values={reviewExcludedLabels} onChange={(v) => { setReviewExcludedLabels(v); flash(); }} />
            <Divider />
            <TagInput label="Excluded users" description="PRs authored by these usernames are skipped for automatic reviews." placeholder="e.g. bot-account" values={reviewExcludedUsers} onChange={(v) => { setReviewExcludedUsers(v); flash(); }} />
            <p className="text-[11px] text-[var(--text-muted)] mt-3 pt-3 border-t border-[var(--border-subtle)]">* These settings affect your monthly review usage quota.</p>
          </Section>

          {/* Summary */}
          <Section title="Summary" open={summaryOpen} onToggle={() => setSummaryOpen(!summaryOpen)}>
            <Toggle label="Auto summary" description="Automatically generate a PR summary on open." checked={summary.autoSummary} onChange={(v) => handleSummaryToggle("autoSummary", v)} />
            <div className="pl-5 border-l-2 border-[var(--border-subtle)] ml-1">
              <Toggle label="Auto summary on draft" description="Include draft PRs in automatic summaries." checked={summary.autoSummaryDraft} onChange={(v) => handleSummaryToggle("autoSummaryDraft", v)} />
            </div>
            <Divider />
            <SelectField label="Summary level" description="Controls the detail level of generated summaries." value={summaryLevel} options={[{ value: "basic", label: "Basic" }, { value: "detailed", label: "Detailed" }]} onChange={(v) => { setSummaryLevel(v); flash(); }} />
            <Divider />
            <TagInput label="Excluded labels" description="PRs with these labels are skipped for automatic summaries." placeholder="e.g. wontfix" values={summaryExcludedLabels} onChange={(v) => { setSummaryExcludedLabels(v); flash(); }} />
            <Divider />
            <TagInput label="Excluded users" description="PRs from these usernames are skipped for automatic summaries." placeholder="e.g. bot-account" values={summaryExcludedUsers} onChange={(v) => { setSummaryExcludedUsers(v); flash(); }} />
          </Section>

          {/* Dependency Bundler */}
          <Section title="Dependency Bundler" open={bundlerOpen} onToggle={() => setBundlerOpen(!bundlerOpen)}>
            <Toggle label="Enabled" description="Organize/bundle PRs from Dependabot." checked={bundlerEnabled} onChange={(v) => { setBundlerEnabled(v); flash(); }} />
          </Section>

          {/* Other Settings */}
          <Section title="Other Settings" open={otherOpen} onToggle={() => setOtherOpen(!otherOpen)}>
            <Toggle label="Enable CI fixer" description="Attempts to fix failed CI checks by opening fix PRs and/or suggesting steps to fix the issue." checked={enableCIFixer} onChange={(v) => { setEnableCIFixer(v); flash(); }} />
            <Divider />
            <Toggle label="Tag to talk" description="Optibot will ONLY respond to comments containing the tag @optibot." checked={tagToTalk} onChange={(v) => { setTagToTalk(v); flash(); }} />
            <Divider />
            <TextField
              label="Guidelines URL"
              description="Path or URL pointing to your coding guidelines file from inside the repository."
              value={guidelinesUrl}
              placeholder="e.g. docs/guidelines/README.md"
              onChange={(v) => { setGuidelinesUrl(v); flash(); }}
              helperNode={
                <p className="text-[12px] text-[var(--text-muted)]">
                  You can also{" "}
                  <a href="/dashboard/configuration/guidelines" className="text-[var(--accent)] hover:underline">edit or generate guidelines</a>{" "}
                  from the Repository Guidelines page.
                </p>
              }
            />
          </Section>

          {/* Save button */}
          <div className="flex justify-end pt-2">
            <button onClick={flash} className="h-9 px-5 rounded-[6px] text-[13px] font-medium bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors cursor-pointer">
              Save for {selectedRepo ?? "repository"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
