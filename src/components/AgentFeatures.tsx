"use client";

// GitHub dark theme tokens — same verified values as Hero.tsx
const GD = {
  bg:        "#0d1117",
  bgSubtle:  "#151b23",
  border:    "#3d444d",
  fg:        "#f0f6fc",
  fgMuted:   "#9198a1",
  link:      "#4493f8",
  mono:      'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  orange:    "#e46a3d",
  openBg:    "#238636",
  mergedBg:  "#8957e5",
  mergedFg:  "#ab7df8",
  approvalGreen: "#3fb950",
  diffDelBg:    "#f851491a",
  diffDelBorder:"#f85149",
  diffDelNumBg: "#f851494d",
  diffAddBg:    "#2ea04326",
  diffAddBorder:"#3fb950",
  diffAddNumBg: "#3fb9504d",
  codeBg:       "rgba(110,118,129,0.4)",
  attentionFg:  "#d29922",
} as const;

// ── Shared chrome component ────────────────────────────────────────────────────
function WindowChrome({ title }: { title: string }) {
  return (
    <div
      style={{
        height: 40,
        borderBottom: `1px solid ${GD.border}`,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 12,
        backgroundColor: GD.bgSubtle,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", gap: 6 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c }} />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: 22,
            borderRadius: 5,
            border: `1px solid ${GD.border}`,
            backgroundColor: GD.bg,
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            maxWidth: 320,
            width: "100%",
            gap: 6,
          }}
        >
          {/* Lock icon */}
          <svg width="9" height="9" viewBox="0 0 16 16" fill={GD.fgMuted}>
            <path d="M4 4a4 4 0 0 1 8 0v2h.25c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-5.5C2 6.784 2.784 6 3.75 6H4Zm8.25 3.5h-8.5a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25ZM10.5 4a2.5 2.5 0 0 0-5 0v2h5Z" />
          </svg>
          <span style={{ fontSize: 11, color: GD.fgMuted, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {title}
          </span>
        </div>
      </div>
      <div style={{ width: 40 }} />
    </div>
  );
}

// ── Block 1: PR Review window ─────────────────────────────────────────────────
function PRReviewWindow() {
  return (
    <div
      style={{
        width: "110%",
        height: "92%",
        backgroundColor: GD.bg,
        borderRadius: "12px 0 0 0",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 50px rgba(0,0,0,0.55)",
        border: `1px solid ${GD.border}`,
        borderRight: "none",
        borderBottom: "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      }}
    >
      <WindowChrome title="github.com/myorg/auth-service/pull/847" />

      {/* PR title strip */}
      <div
        style={{
          padding: "14px 20px 0",
          borderBottom: `1px solid ${GD.border}`,
          backgroundColor: GD.bg,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: GD.fg, margin: 0, flex: 1, lineHeight: 1.3 }}>
            migrate: JWT to session-based auth
            <span style={{ fontSize: 14, fontWeight: 400, color: GD.fgMuted, marginLeft: 6 }}>#847</span>
          </h2>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              backgroundColor: GD.openBg,
              color: "#fff",
              borderRadius: "2em",
              fontSize: 12,
              fontWeight: 500,
              padding: "3px 10px",
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
            </svg>
            Open
          </span>
        </div>
        <div style={{ fontSize: 12, color: GD.fgMuted, marginBottom: 0 }}>
          <span style={{ color: GD.link }}>drmaeur</span>
          <span style={{ color: GD.fgMuted }}> wants to merge 4 commits into </span>
          <span style={{ fontFamily: GD.mono, backgroundColor: GD.diffAddBg, color: GD.link, borderRadius: 4, padding: "1px 5px", fontSize: 11 }}>main</span>
          <span style={{ color: GD.fgMuted }}> from </span>
          <span style={{ fontFamily: GD.mono, backgroundColor: GD.bgSubtle, color: GD.link, borderRadius: 4, padding: "1px 5px", fontSize: 11 }}>feature/auth-refactor</span>
        </div>

        {/* PR tabs */}
        <div style={{ display: "flex", gap: 0, marginTop: 10, fontSize: 12 }}>
          {[
            ["Conversation", "3", true],
            ["Commits", "4", false],
            ["Files changed", "3", false],
          ].map(([label, count, active]) => (
            <div
              key={String(label)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 14px",
                borderBottom: active ? `2px solid ${GD.orange}` : "2px solid transparent",
                color: active ? GD.fg : GD.fgMuted,
                fontWeight: active ? 600 : 400,
                cursor: "default",
              }}
            >
              {label}
              {count && (
                <span
                  style={{
                    fontSize: 11,
                    backgroundColor: GD.border,
                    color: GD.fg,
                    borderRadius: "2em",
                    padding: "1px 6px",
                    fontWeight: 500,
                  }}
                >
                  {count}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Optibot review comment */}
      <div style={{ padding: "16px 20px", flex: 1, overflowY: "auto", scrollbarWidth: "none" } as React.CSSProperties}>
        <div style={{ display: "flex", gap: 10 }}>
          {/* Avatar */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: GD.orange,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            O
          </div>

          {/* Comment bubble */}
          <div
            style={{
              flex: 1,
              border: `1px solid ${GD.border}`,
              borderRadius: 6,
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                backgroundColor: GD.bgSubtle,
                borderBottom: `1px solid ${GD.border}`,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: GD.fg }}>agent-optibot</span>
              <span
                style={{
                  fontSize: 11,
                  border: `1px solid ${GD.border}`,
                  borderRadius: "2em",
                  padding: "0 6px",
                  color: GD.fgMuted,
                  lineHeight: "18px",
                }}
              >
                Bot
              </span>
              <span style={{ fontSize: 11, color: GD.fgMuted, marginLeft: "auto" }}>just now</span>
            </div>

            {/* Body */}
            <div style={{ padding: "12px 14px", fontSize: 13, lineHeight: 1.55, color: GD.fg }}>
              <div style={{ fontSize: 12, color: GD.fgMuted, marginBottom: 10 }}>
                Reviewed{" "}
                <code style={{ fontFamily: GD.mono, backgroundColor: GD.codeBg, borderRadius: 4, padding: "1px 5px", fontSize: 11 }}>
                  auth/middleware.ts
                </code>
                ,{" "}
                <code style={{ fontFamily: GD.mono, backgroundColor: GD.codeBg, borderRadius: 4, padding: "1px 5px", fontSize: 11 }}>
                  session.ts
                </code>
                {" "}and 1 more file.
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: GD.attentionFg, lineHeight: "20px", flexShrink: 0 }}>⚠</span>
                  <div>
                    <span style={{ color: GD.attentionFg }}>Session cookie missing </span>
                    <code style={{ fontFamily: GD.mono, backgroundColor: GD.codeBg, borderRadius: 4, padding: "1px 5px", fontSize: 11, color: GD.fg }}>
                      httpOnly
                    </code>
                    <span style={{ color: GD.fgMuted, fontSize: 11, marginLeft: 6 }}>auth/session.ts:42</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ color: GD.approvalGreen, flexShrink: 0 }}>✓</span>
                  <span style={{ color: GD.fgMuted }}>No SQL injection vectors detected</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ color: GD.approvalGreen, flexShrink: 0 }}>✓</span>
                  <span style={{ color: GD.fgMuted }}>CSRF token validation intact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Block 2: Insights dashboard window ────────────────────────────────────────
function InsightsWindow() {
  const bars = [
    { day: "Mon", pct: 84, val: "4.1h" },
    { day: "Tue", pct: 57, val: "2.8h" },
    { day: "Wed", pct: 42, val: "2.0h" },
    { day: "Thu", pct: 28, val: "1.4h" },
    { day: "Fri", pct: 22, val: "1.1h" },
  ];

  return (
    <div
      style={{
        width: "110%",
        marginLeft: -30,
        height: "92%",
        backgroundColor: GD.bg,
        borderRadius: "0 12px 0 0",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 50px rgba(0,0,0,0.55)",
        border: `1px solid ${GD.border}`,
        borderLeft: "none",
        borderBottom: "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      }}
    >
      <WindowChrome title="app.optimalai.com/insights" />

      {/* App header */}
      <div
        style={{
          height: 40,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          borderBottom: `1px solid ${GD.border}`,
          backgroundColor: GD.bgSubtle,
          gap: 24,
        }}
      >
        {["Overview", "Cycle Time", "Contributors", "Alerts"].map((tab, i) => (
          <span
            key={tab}
            style={{
              fontSize: 12,
              color: i === 1 ? GD.fg : GD.fgMuted,
              fontWeight: i === 1 ? 600 : 400,
              borderBottom: i === 1 ? `2px solid ${GD.orange}` : "2px solid transparent",
              paddingBottom: 2,
              cursor: "default",
              lineHeight: "36px",
            }}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Dashboard content */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Chart */}
        <div className="hidden md:block" style={{ flex: 1, padding: "20px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: GD.fg }}>PR Cycle Time</span>
            <span style={{ fontSize: 11, color: GD.approvalGreen, fontWeight: 500 }}>↓ 34% this month</span>
          </div>
          <div style={{ fontSize: 11, color: GD.fgMuted, marginBottom: 14 }}>
            Avg hours from open → merge · last 5 working days
          </div>

          {/* Chart grid + bars */}
          <div style={{ position: "relative" }}>
            {/* Grid lines */}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", pointerEvents: "none" }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ height: 1, backgroundColor: GD.border, opacity: 0.5, width: "100%" }} />
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 9, position: "relative", zIndex: 1 }}>
              {bars.map((bar) => (
                <div key={bar.day} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 26, fontSize: 11, color: GD.fgMuted, fontFamily: GD.mono, flexShrink: 0 }}>
                    {bar.day}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 16,
                      backgroundColor: GD.bgSubtle,
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${bar.pct}%`,
                        background: `linear-gradient(90deg, ${GD.orange}99, ${GD.orange}55)`,
                        borderRadius: "0 2px 2px 0",
                      }}
                    />
                  </div>
                  <span style={{ width: 30, fontSize: 11, color: GD.fg, fontFamily: GD.mono, textAlign: "right", flexShrink: 0 }}>
                    {bar.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* X-axis labels */}
          <div style={{ display: "flex", marginTop: 8, paddingLeft: 36, paddingRight: 30, justifyContent: "space-between" }}>
            {["0h", "1h", "2h", "3h", "4h"].map((label) => (
              <span key={label} style={{ fontSize: 10, color: GD.fgMuted, fontFamily: GD.mono }}>{label}</span>
            ))}
          </div>
        </div>

        {/* Metrics sidebar */}
        <div
          className="hidden md:flex"
          style={{
            width: 140,
            flexShrink: 0,
            borderLeft: `1px solid ${GD.border}`,
            backgroundColor: GD.bgSubtle,
            padding: "20px 16px",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {[
            { value: "142", label: "PRs merged" },
            { value: "1.8h", label: "avg cycle time" },
            { value: "5.2", label: "deploys / day" },
            { value: "89%", label: "AI adoption" },
          ].map((m) => (
            <div key={m.label}>
              <div style={{ fontSize: 20, fontWeight: 700, color: GD.fg, lineHeight: 1.1 }}>{m.value}</div>
              <div style={{ fontSize: 11, color: GD.fgMuted, marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── AgentFeatures ─────────────────────────────────────────────────────────────
export function AgentFeatures() {
  return (
    <section className="w-full flex flex-col items-center gap-3 px-6 py-24">

      {/* Block 1: Optibot PR Reviews */}
      <div className="w-full max-w-[1300px] bg-[var(--bg-surface)] rounded-[4px] overflow-hidden flex flex-col md:flex-row items-stretch min-h-[640px]">

        {/* Left text */}
        <div className="flex-[0.45] max-w-[420px] py-[80px] px-[48px] flex flex-col justify-center">
          <h2 className="text-[22px] leading-[1.3] font-normal tracking-[-0.02em] text-[var(--text-primary)]">
            Summaries, risk flags, and security scans on every PR
          </h2>
          <p className="text-[16px] leading-[1.5] text-[var(--text-secondary)] mt-4">
            Optibot summarizes what changed, assesses risk, and flags security issues — automatically, on every pull request. 198 PRs reviewed in 6 weeks at Mpulse.
          </p>
          <a href="#" className="inline-block text-[16px] no-underline text-[var(--accent)] mt-6 hover:underline hover:text-[var(--accent-hover)] transition-colors">
            See what Optibot catches →
          </a>
        </div>

        {/* Right: PR review window */}
        <div className="flex-1 relative w-full min-h-[500px] hidden md:flex items-end justify-end pl-8">
          <PRReviewWindow />
        </div>
      </div>

      {/* Block 2: Insights Dashboard */}
      <div className="w-full max-w-[1300px] bg-[var(--bg-surface)] rounded-[4px] overflow-hidden flex flex-col-reverse md:flex-row items-stretch min-h-[640px]">

        {/* Left: Insights window */}
        <div className="flex-1 relative w-full min-h-[500px] hidden md:flex items-end justify-start pr-8">
          <InsightsWindow />
        </div>

        {/* Right text */}
        <div className="flex-[0.45] max-w-[420px] py-[80px] px-[48px] flex flex-col justify-center">
          <h2 className="text-[22px] leading-[1.3] font-normal tracking-[-0.02em] text-[var(--text-primary)]">
            The engineering dashboard you&apos;ll actually check
          </h2>
          <p className="text-[16px] leading-[1.5] text-[var(--text-secondary)] mt-4">
            PR cycle time, deploy frequency, contributor analytics, AI adoption rates — the numbers engineering managers actually need, without stitching together five tools.
          </p>
          <a href="#" className="inline-block text-[16px] no-underline text-[var(--accent)] mt-6 hover:underline hover:text-[var(--accent-hover)] transition-colors">
            Explore Insights →
          </a>
        </div>
      </div>
    </section>
  );
}
