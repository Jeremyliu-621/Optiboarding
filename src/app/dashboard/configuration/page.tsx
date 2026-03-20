"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Settings,
  Bot,
  Bell,
  Key,
  AlertTriangle,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  Trash2,
  Plus,
  Minus,
  RotateCcw,
} from "lucide-react";
import { Toggle } from "@/components/dashboard/Toggle";

/* ─── Types ─── */
type ConfigTab = "settings" | "guidelines";
type SettingsSection = "general" | "agent" | "notifications" | "api" | "danger";
type Thoroughness = "fast" | "balanced" | "thorough";
type GuidelineCategory = "Security" | "Style" | "Performance" | "Custom";
type GuidelinePriority = "low" | "medium" | "high";

interface Guideline {
  id: string;
  title: string;
  category: GuidelineCategory;
  priority: GuidelinePriority;
  body: string;
  enabled: boolean;
}

/* ─── Initial Guidelines ─── */
const initialGuidelines: Guideline[] = [
  {
    id: "g1",
    title: "Flag eval() and Function() constructor",
    category: "Security",
    priority: "high",
    body: "Flag any use of `eval()` or `Function()` constructor in JavaScript files. These are major security risks and should never appear in production code.",
    enabled: true,
  },
  {
    id: "g2",
    title: "Require JSDoc on exports",
    category: "Style",
    priority: "medium",
    body: "Require JSDoc comments on all exported functions. Internal helper functions do not need documentation.",
    enabled: true,
  },
  {
    id: "g3",
    title: "Skip test file comments",
    category: "Custom",
    priority: "low",
    body: "Do not comment on test files unless there are security issues. Test files have different conventions.",
    enabled: false,
  },
  {
    id: "g4",
    title: "Flag hardcoded secrets",
    category: "Security",
    priority: "high",
    body: "Flag hardcoded API keys or secrets, even in comments. This includes AWS keys, Stripe keys, database passwords, and JWT secrets.",
    enabled: true,
  },
];

/* ─── Sidebar Nav Items ─── */
const settingsSections: { id: SettingsSection; label: string; icon: React.ElementType }[] = [
  { id: "general", label: "General", icon: Settings },
  { id: "agent", label: "Agent Behaviour", icon: Bot },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "api", label: "API & Webhooks", icon: Key },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle },
];

const focusAreas = ["Security", "Performance", "Style", "Logic", "Tests"] as const;
const languages = ["TypeScript", "JavaScript", "Python", "Go", "Rust", "Java", "Ruby", "PHP"] as const;

/* ─── Main Page ─── */
export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState<ConfigTab>("settings");

  return (
    <>
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-8 border-b border-[var(--border-subtle)]">
        {(["settings", "guidelines"] as ConfigTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2.5 text-[13px] font-medium capitalize transition-colors cursor-pointer ${
              activeTab === tab
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--accent)] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {activeTab === "settings" && <SettingsTab />}
      {activeTab === "guidelines" && <GuidelinesTab />}
    </>
  );
}

/* ═══════════════════════════════════════════
   Settings Tab
   ═══════════════════════════════════════════ */
function SettingsTab() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("general");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Settings state
  const [workspaceName, setWorkspaceName] = useState("My Workspace");
  const [defaultRepo, setDefaultRepo] = useState("optibot/dashboard");
  const [timezone, setTimezone] = useState("America/New_York");

  const [thoroughness, setThoroughness] = useState<Thoroughness>("balanced");
  const [selectedFocus, setSelectedFocus] = useState<Set<string>>(
    new Set(["Security", "Logic", "Style"])
  );
  const [selectedLangs, setSelectedLangs] = useState<Set<string>>(
    new Set(["TypeScript", "JavaScript", "Python"])
  );
  const [maxComments, setMaxComments] = useState(15);
  const [skipPattern, setSkipPattern] = useState("**/*.test.ts");

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [notifReview, setNotifReview] = useState(true);
  const [notifSecurity, setNotifSecurity] = useState(true);
  const [notifDigest, setNotifDigest] = useState(false);
  const [notifEmail, setNotifEmail] = useState("user@example.com");

  const [apiKeyRevealed, setApiKeyRevealed] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("https://example.com/webhook");
  const [webhookSecretRevealed, setWebhookSecretRevealed] = useState(false);
  const [regenConfirm, setRegenConfirm] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const scrollTo = (id: SettingsSection) => {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  const toggleChip = (set: Set<string>, val: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    setter(next);
  };

  return (
    <div className="flex gap-8">
      {/* Sidebar nav */}
      <nav className="w-[180px] shrink-0 sticky top-0 self-start hidden lg:block">
        {settingsSections.map((s) => {
          const SIcon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-[6px] text-[13px] transition-colors cursor-pointer mb-0.5 ${
                activeSection === s.id
                  ? "text-[var(--text-primary)] bg-[var(--bg-surface)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              <SIcon size={14} />
              {s.label}
            </button>
          );
        })}
      </nav>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-10">
        {/* General */}
        <div ref={(el) => { sectionRefs.current.general = el; }}>
          <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-4">
            General
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">Workspace name</label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full max-w-[360px] bg-[var(--bg-surface)] text-[var(--text-primary)] text-[13px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>
            <div>
              <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">Default repository</label>
              <select
                value={defaultRepo}
                onChange={(e) => setDefaultRepo(e.target.value)}
                className="bg-[var(--bg-surface)] text-[var(--text-primary)] text-[13px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
              >
                <option value="optibot/dashboard">optibot/dashboard</option>
                <option value="optibot/api">optibot/api</option>
                <option value="optibot/docs">optibot/docs</option>
              </select>
            </div>
            <div>
              <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="bg-[var(--bg-surface)] text-[var(--text-primary)] text-[13px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
              >
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="America/Chicago">America/Chicago (CST)</option>
                <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Agent Behaviour */}
        <div ref={(el) => { sectionRefs.current.agent = el; }}>
          <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-4">
            Agent Behaviour
          </h3>
          <div className="space-y-5">
            <div>
              <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-2">Review thoroughness</label>
              <div className="flex gap-2">
                {(["fast", "balanced", "thorough"] as Thoroughness[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setThoroughness(t)}
                    className={`flex-1 py-2 rounded-[6px] text-[13px] font-medium capitalize transition-colors cursor-pointer ${
                      thoroughness === t
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[var(--text-muted)] mt-1.5">
                {thoroughness === "fast" && "Quick surface-level review. Lower token cost."}
                {thoroughness === "balanced" && "Standard review covering security, logic, and style."}
                {thoroughness === "thorough" && "Deep analysis with cross-file context. Higher token cost."}
              </p>
            </div>

            <div>
              <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-2">Focus areas</label>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <button
                    key={area}
                    onClick={() => toggleChip(selectedFocus, area, setSelectedFocus)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                      selectedFocus.has(area)
                        ? "bg-[var(--accent-muted)] text-[var(--accent)]"
                        : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-2">Languages</label>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => toggleChip(selectedLangs, lang, setSelectedLangs)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                      selectedLangs.has(lang)
                        ? "bg-[var(--accent-muted)] text-[var(--accent)]"
                        : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-2">Max comments per PR</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMaxComments((v) => Math.max(1, v - 1))}
                  className="w-8 h-8 rounded-[6px] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] flex items-center justify-center transition-colors cursor-pointer text-[var(--text-secondary)]"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-[14px] font-medium text-[var(--text-primary)] tabular-nums">
                  {maxComments}
                </span>
                <button
                  onClick={() => setMaxComments((v) => Math.min(50, v + 1))}
                  className="w-8 h-8 rounded-[6px] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] flex items-center justify-center transition-colors cursor-pointer text-[var(--text-secondary)]"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div>
              <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">Skip files matching</label>
              <input
                type="text"
                value={skipPattern}
                onChange={(e) => setSkipPattern(e.target.value)}
                placeholder="**/*.test.ts"
                className="w-full max-w-[360px] bg-[var(--bg-surface)] text-[var(--text-primary)] text-[13px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] font-mono"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div ref={(el) => { sectionRefs.current.notifications = el; }}>
          <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-4">
            Notifications
          </h3>
          <Toggle
            label="Email notifications"
            description="Receive email notifications from Optibot"
            checked={emailNotifs}
            onChange={setEmailNotifs}
          />
          {emailNotifs && (
            <div className="ml-4 border-l-2 border-[var(--border-subtle)] pl-4 space-y-0">
              <Toggle label="Review complete" checked={notifReview} onChange={setNotifReview} />
              <Toggle label="Security flag found" checked={notifSecurity} onChange={setNotifSecurity} />
              <Toggle label="Weekly digest" checked={notifDigest} onChange={setNotifDigest} />
              <div className="pt-2">
                <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">Notification email</label>
                <input
                  type="email"
                  value={notifEmail}
                  onChange={(e) => setNotifEmail(e.target.value)}
                  className="w-full max-w-[300px] bg-[var(--bg-surface)] text-[var(--text-primary)] text-[13px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
            </div>
          )}
        </div>

        {/* API & Webhooks */}
        <div ref={(el) => { sectionRefs.current.api = el; }}>
          <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-4">
            API & Webhooks
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">API Key</label>
              <div className="flex items-center gap-2">
                <span className="bg-[var(--bg-surface)] text-[var(--text-secondary)] text-[13px] px-3 py-2 rounded-[6px] font-mono flex-1 max-w-[360px] truncate">
                  {apiKeyRevealed ? "sk-opt-a8f2b39e4c7d1052f6e8a1b3" : "sk-opt-••••••••••••••••••••"}
                </span>
                <button
                  onClick={() => setApiKeyRevealed(!apiKeyRevealed)}
                  className="w-8 h-8 rounded-[6px] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] flex items-center justify-center transition-colors cursor-pointer text-[var(--text-muted)]"
                  title={apiKeyRevealed ? "Hide" : "Reveal"}
                >
                  {apiKeyRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                {regenConfirm ? (
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="text-[var(--text-muted)]">Regenerate?</span>
                    <button
                      onClick={() => setRegenConfirm(false)}
                      className="px-2 py-1 rounded-[4px] bg-[hsl(0,30%,22%)] text-[hsl(0,60%,65%)] font-medium hover:bg-[hsl(0,30%,26%)] transition-colors cursor-pointer"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setRegenConfirm(false)}
                      className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setRegenConfirm(true)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-[6px] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[13px] text-[var(--text-secondary)] transition-colors cursor-pointer"
                  >
                    <RotateCcw size={12} /> Regenerate
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">Webhook URL</label>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full max-w-[360px] bg-[var(--bg-surface)] text-[var(--text-primary)] text-[13px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] font-mono"
              />
            </div>

            <div>
              <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">Webhook Secret</label>
              <div className="flex items-center gap-2">
                <span className="bg-[var(--bg-surface)] text-[var(--text-secondary)] text-[13px] px-3 py-2 rounded-[6px] font-mono flex-1 max-w-[360px] truncate">
                  {webhookSecretRevealed ? "whsec_k9m2p5q8r1t4w7z0" : "whsec_••••••••••••••••"}
                </span>
                <button
                  onClick={() => setWebhookSecretRevealed(!webhookSecretRevealed)}
                  className="w-8 h-8 rounded-[6px] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] flex items-center justify-center transition-colors cursor-pointer text-[var(--text-muted)]"
                >
                  {webhookSecretRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[12px] text-[var(--text-muted)] block mb-1.5">Sample webhook payload</label>
              <pre className="bg-[var(--bg-deep)] text-[var(--text-secondary)] text-[12px] px-4 py-3 rounded-[6px] overflow-x-auto font-mono leading-relaxed">
{`{
  "event": "review.completed",
  "repo": "optibot/dashboard",
  "pr": 142,
  "verdict": "approved",
  "issues": 0,
  "timestamp": "2026-03-20T14:30:00Z"
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div ref={(el) => { sectionRefs.current.danger = el; }}>
          <div className="border-l-[3px] border-[hsl(0,25%,30%)] pl-5">
            <h3 className="text-[11px] uppercase tracking-wider text-[hsl(0,35%,55%)] font-medium mb-4">
              Danger Zone
            </h3>
            {!deleteConfirm ? (
              <button
                onClick={() => setDeleteConfirm(true)}
                className="px-4 py-2 rounded-[6px] text-[13px] font-medium text-[hsl(0,45%,60%)] bg-[hsl(0,25%,15%)] hover:bg-[hsl(0,25%,20%)] transition-colors cursor-pointer"
              >
                Delete Workspace
              </button>
            ) : (
              <div className="bg-[var(--bg-surface)] rounded-[8px] p-4 max-w-[400px]">
                <p className="text-[13px] text-[var(--text-secondary)] mb-3">
                  Type <span className="font-mono text-[var(--text-primary)]">{workspaceName}</span> to confirm deletion.
                </p>
                <input
                  type="text"
                  value={deleteInput}
                  onChange={(e) => setDeleteInput(e.target.value)}
                  placeholder={workspaceName}
                  className="w-full bg-[var(--bg-deep)] text-[var(--text-primary)] text-[13px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[hsl(0,40%,50%)] mb-3 font-mono"
                />
                <div className="flex gap-2">
                  <button
                    disabled={deleteInput !== workspaceName}
                    className="px-4 py-1.5 rounded-[6px] text-[13px] font-medium text-white bg-[hsl(0,40%,45%)] hover:bg-[hsl(0,40%,50%)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Delete permanently
                  </button>
                  <button
                    onClick={() => { setDeleteConfirm(false); setDeleteInput(""); }}
                    className="px-3 py-1.5 rounded-[6px] text-[13px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Save */}
        <div className="pt-4 border-t border-[var(--border-subtle)]">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-[6px] text-[13px] font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors disabled:opacity-60 cursor-pointer flex items-center gap-1.5"
          >
            {saving ? (
              <><Loader2 size={13} className="animate-spin" /> Saving...</>
            ) : saved ? (
              <><CheckCircle2 size={13} /> Saved</>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Guidelines Tab
   ═══════════════════════════════════════════ */
function GuidelinesTab() {
  const [guidelines, setGuidelines] = useState<Guideline[]>(initialGuidelines);
  const [selectedId, setSelectedId] = useState<string | null>(initialGuidelines[0].id);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const selected = guidelines.find((g) => g.id === selectedId) || null;

  const addGuideline = () => {
    const id = `g${Date.now()}`;
    const newG: Guideline = {
      id,
      title: "New Guideline",
      category: "Custom",
      priority: "medium",
      body: "",
      enabled: true,
    };
    setGuidelines((prev) => [newG, ...prev]);
    setSelectedId(id);
  };

  const updateGuideline = useCallback(
    (id: string, updates: Partial<Guideline>) => {
      setGuidelines((prev) =>
        prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
      );
    },
    []
  );

  const deleteGuideline = useCallback(
    (id: string) => {
      setGuidelines((prev) => prev.filter((g) => g.id !== id));
      if (selectedId === id) setSelectedId(null);
    },
    [selectedId]
  );

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  // Interpretation mock
  const interpretation = selected?.body
    ? `Optibot will scan for patterns matching this guideline and flag violations in review comments with ${selected.priority} priority.`
    : "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-6 min-h-[500px]">
      {/* Left: List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
            Guidelines
          </h3>
          <button
            onClick={addGuideline}
            className="flex items-center gap-1 text-[12px] text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors cursor-pointer font-medium"
          >
            <Plus size={13} /> Add
          </button>
        </div>
        <div className="space-y-1.5">
          {guidelines.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedId(g.id)}
              className={`w-full text-left px-3 py-3 rounded-[8px] transition-colors cursor-pointer group ${
                selectedId === g.id
                  ? "bg-[var(--bg-elevated)]"
                  : "bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)]"
              } ${!g.enabled ? "opacity-50" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-[var(--text-primary)] truncate">
                    {g.title}
                  </p>
                  <span
                    className="inline-block text-[11px] font-medium mt-1 px-1.5 py-0.5 rounded-[3px]"
                    style={{
                      backgroundColor:
                        g.category === "Security"
                          ? "hsl(0, 20%, 18%)"
                          : g.category === "Performance"
                            ? "hsl(38, 20%, 18%)"
                            : g.category === "Style"
                              ? "hsl(275, 15%, 22%)"
                              : "var(--bg-deep)",
                      color:
                        g.category === "Security"
                          ? "hsl(0, 35%, 55%)"
                          : g.category === "Performance"
                            ? "hsl(38, 35%, 55%)"
                            : g.category === "Style"
                              ? "var(--accent)"
                              : "var(--text-muted)",
                    }}
                  >
                    {g.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Toggle inline */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateGuideline(g.id, { enabled: !g.enabled });
                    }}
                    className={`w-[32px] h-[18px] rounded-full relative transition-colors cursor-pointer ${
                      g.enabled ? "bg-[var(--accent)]" : "bg-[var(--bg-deep)]"
                    }`}
                  >
                    <span
                      className={`absolute top-[2px] left-[2px] w-[14px] h-[14px] rounded-full bg-white transition-transform ${
                        g.enabled ? "translate-x-[14px]" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteGuideline(g.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-[var(--text-muted)] hover:text-[hsl(0,45%,55%)] transition-all cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </button>
          ))}
          {guidelines.length === 0 && (
            <p className="text-[13px] text-[var(--text-muted)] text-center py-8">
              No guidelines yet. Click Add to create one.
            </p>
          )}
        </div>
      </div>

      {/* Right: Editor */}
      <div>
        {selected ? (
          <div className="space-y-4">
            <input
              type="text"
              value={selected.title}
              onChange={(e) => updateGuideline(selected.id, { title: e.target.value })}
              className="w-full bg-transparent text-[var(--text-primary)] text-[18px] font-medium focus:outline-none placeholder:text-[var(--text-muted)]"
              placeholder="Guideline title"
            />

            <div className="flex items-center gap-4">
              <div>
                <label className="text-[11px] text-[var(--text-muted)] block mb-1">Category</label>
                <select
                  value={selected.category}
                  onChange={(e) =>
                    updateGuideline(selected.id, {
                      category: e.target.value as GuidelineCategory,
                    })
                  }
                  className="bg-[var(--bg-surface)] text-[var(--text-primary)] text-[13px] px-3 py-1.5 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
                >
                  {(["Security", "Style", "Performance", "Custom"] as GuidelineCategory[]).map(
                    (c) => (
                      <option key={c} value={c}>{c}</option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="text-[11px] text-[var(--text-muted)] block mb-1">Priority</label>
                <div className="flex bg-[var(--bg-surface)] rounded-[6px] p-0.5">
                  {(["low", "medium", "high"] as GuidelinePriority[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => updateGuideline(selected.id, { priority: p })}
                      className={`px-2.5 py-1 rounded-[4px] text-[12px] font-medium capitalize transition-colors cursor-pointer ${
                        selected.priority === p
                          ? "bg-[var(--bg-elevated)] text-[var(--text-primary)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <textarea
              value={selected.body}
              onChange={(e) => updateGuideline(selected.id, { body: e.target.value })}
              placeholder="Describe the guideline instructions for Optibot..."
              rows={8}
              className="w-full bg-[var(--bg-deep)] text-[var(--text-primary)] text-[13px] px-4 py-3 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] resize-y min-h-[200px] font-mono leading-relaxed placeholder:text-[var(--text-muted)]"
            />

            {interpretation && (
              <div className="text-[12px] text-[var(--text-muted)] italic leading-relaxed">
                {interpretation}
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-[6px] text-[13px] font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors disabled:opacity-60 cursor-pointer flex items-center gap-1.5"
            >
              {saving ? (
                <><Loader2 size={13} className="animate-spin" /> Saving...</>
              ) : saved ? (
                <><CheckCircle2 size={13} /> Saved</>
              ) : (
                "Save Guideline"
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-[13px] text-[var(--text-muted)]">
            Select a guideline to edit, or add a new one.
          </div>
        )}
      </div>
    </div>
  );
}
