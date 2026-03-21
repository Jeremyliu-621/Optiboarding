import { ReactNode } from "react";

interface OverlayDef {
  title: string;
  description: string;
  bullets: string[];
  preview: ReactNode;
}

const previewStyles = "rounded-[8px] p-4 bg-[hsl(275, 10%, 15%)]";

export const OVERLAY_DEFINITIONS: Record<number, OverlayDef> = {
  2: {
    // Optibot
    title: "Optibot — your AI reviewer",
    description:
      "Optibot reads your entire codebase, not just the diff. It understands context that file-level tools miss — like whether this PR breaks an invariant defined three files away, or introduces a security pattern your guidelines explicitly flag.",
    bullets: [
      "Runs automatically on every opened PR",
      "Posts structured review comments directly to GitHub",
      "Trigger manual reviews on any PR URL",
    ],
    preview: (
      <div className="w-64 space-y-2">
        {[
          { dot: "bg-green-500", title: "feat: add dark mode", verdict: "Approved" },
          { dot: "bg-yellow-500", title: "fix: API rate limiting", verdict: "Changes requested" },
          { dot: "bg-red-500", title: "refactor: auth module", verdict: "Issues found" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 p-2 rounded-[6px]"
            style={{ backgroundColor: "hsl(275, 10%, 15%)" }}
          >
            <div className={`w-2 h-2 rounded-full ${item.dot} shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-white truncate font-mono">{item.title}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{item.verdict}</p>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] shrink-0">2h ago</span>
          </div>
        ))}
      </div>
    ),
  },
  3: {
    // Repo Insights
    title: "See the impact",
    description:
      "Repo Insights tracks how Optibot is changing your team's velocity. The most important metric: time from PR open to merge. Teams using Optibot see this drop within the first two weeks.",
    bullets: [
      "Filter by repository and time range",
      "Sortable PR activity table with Optibot verdicts",
      "Security issue breakdown by category",
    ],
    preview: (
      <div className="w-64 space-y-4">
        <div className="flex items-end gap-1 h-24">
          {[12, 18, 16, 22, 14].map((height, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-[2px] bg-[#5b3dc8] opacity-60"
              style={{ height: `${(height / 22) * 100}%` }}
            />
          ))}
        </div>
        <p className="text-[10px] text-[var(--text-muted)]">Merge Time (days)</p>
        <div className="grid grid-cols-3 gap-2">
          {["142 PRs", "3 Issues", "~48h saved"].map((stat, i) => (
            <div
              key={i}
              className="text-center p-2 rounded-[4px]"
              style={{ backgroundColor: "hsl(275, 10%, 15%)" }}
            >
              <p className="text-[12px] font-medium text-white">{stat}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  4: {
    // Settings
    title: "Optibot does what you tell it",
    description:
      "The settings you configured during onboarding live here. Review thoroughness, trigger behaviour, focus areas — everything that determines how Optibot approaches each PR. Change them any time and Optibot adapts immediately.",
    bullets: [
      "Toggle auto-review triggers independently",
      "Configure minimum PR size thresholds",
      "API keys and webhook URLs for CI/CD integration",
    ],
    preview: (
      <div className="w-64 space-y-1 rounded-[8px] overflow-hidden" style={{ backgroundColor: "hsl(275, 10%, 15%)" }}>
        {[
          { label: "Auto review", on: true },
          { label: "Code suggestions", on: true },
          { label: "Allow approve", on: false },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-2.5 text-[12px] border-b border-[hsl(275, 8%, 20%)]">
            <span className="text-white">{item.label}</span>
            <div
              className={`w-6 h-3.5 rounded-full ${item.on ? "bg-[#5b3dc8]" : "bg-[hsl(275, 10%, 25%)]"}`}
            />
          </div>
        ))}
      </div>
    ),
  },
  5: {
    // Guidelines
    title: "Your rules, enforced",
    description:
      "Guidelines are plain-English instructions Optibot reads before every review. They're more flexible than linters — you can describe patterns, architectural decisions, or team conventions in natural language.",
    bullets: [
      "Toggle guidelines on/off without deleting them",
      "Set priority: low, medium, or high severity",
      "Preview how Optibot interprets each guideline",
    ],
    preview: (
      <div className="w-64 flex h-32 gap-1 rounded-[8px] overflow-hidden">
        <div
          className="w-1/3 space-y-1 p-2"
          style={{ backgroundColor: "hsl(275, 10%, 15%)" }}
        >
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Guidelines</p>
          {["Security", "Style", "Perf"].map((g) => (
            <div key={g} className="text-[11px] text-white p-1 rounded-[2px]" style={{ backgroundColor: "hsl(275, 10%, 22%)" }}>
              {g}
            </div>
          ))}
        </div>
        <div
          className="flex-1 p-2 flex flex-col gap-1"
          style={{ backgroundColor: "hsl(275, 10%, 20%)" }}
        >
          <p className="text-[10px] text-[var(--text-muted)]">// Editor preview</p>
          {["function preview() {", "  // Content here", "};"].map((line, i) => (
            <p key={i} className="text-[9px] text-[var(--text-secondary)] font-mono">
              {line}
            </p>
          ))}
        </div>
      </div>
    ),
  },
  6: {
    // Codebase Map
    title: "Your entire codebase, at a glance",
    description:
      "The Codebase Map shows coverage and issue density across your repository. Click any directory to zoom in. Use it to find files Optibot hasn't reviewed yet, or to see where issues are clustering.",
    bullets: [
      "Click directories to zoom in, breadcrumb to navigate back",
      "Colour by coverage, issue density, or file size",
      "Switch to list view for a sortable data table",
    ],
    preview: (
      <div className="w-64 h-32 grid grid-cols-3 gap-1 rounded-[8px] overflow-hidden p-2" style={{ backgroundColor: "hsl(275, 10%, 15%)" }}>
        {[
          { size: "h-20 w-20", opacity: 0.4 },
          { size: "h-16 w-16", opacity: 0.6 },
          { size: "h-12 w-12", opacity: 0.8 },
          { size: "h-14 w-14", opacity: 0.5 },
          { size: "h-10 w-10", opacity: 0.7 },
          { size: "h-8 w-8", opacity: 0.3 },
        ].map((block, i) => (
          <div
            key={i}
            className={`${block.size} rounded-[4px] bg-[#5b3dc8]`}
            style={{ opacity: block.opacity }}
          />
        ))}
      </div>
    ),
  },
};
