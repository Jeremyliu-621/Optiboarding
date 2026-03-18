// ── Code review comparison section ───────────────────────────────────────────
// Shows what Human / Claude Code / Cursor Bugbot output vs Optibot

const mono = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

// Syntax highlighting colors (VS Code Dark+)
const SYN = {
  keyword: "#c586c0",
  fn: "#dcdcaa",
  type: "#4ec9b0",
  string: "#ce9178",
  param: "#9cdcfe",
  prop: "#9cdcfe",
  punct: "#cccccc",
  num: "#b5cea8",
  comment: "#6a9955",
} as const;

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code style={{ fontFamily: mono, fontSize: 11, backgroundColor: "var(--bg-elevated)", borderRadius: 3, padding: "2px 5px", color: "var(--text-primary)" }}>
      {children}
    </code>
  );
}

function DiffLine({ num, children, type }: { num: string; children: React.ReactNode; type: "add" | "del" | "ctx" }) {
  const bg = type === "add" ? "rgba(46,160,67,0.10)" : type === "del" ? "rgba(248,81,73,0.10)" : "transparent";
  const border = type === "add" ? "#3fb950" : type === "del" ? "#f85149" : "transparent";
  const prefix = type === "add" ? "+" : type === "del" ? "−" : " ";

  return (
    <div style={{ display: "flex", fontSize: 13, lineHeight: "22px", fontFamily: mono, backgroundColor: bg, borderLeft: `3px solid ${border}` }}>
      <span style={{ width: 40, textAlign: "right", paddingRight: 14, color: "var(--text-muted)", userSelect: "none", flexShrink: 0, fontSize: 12 }}>
        {num}
      </span>
      <span style={{ color: "var(--text-muted)", width: 14, flexShrink: 0 }}>{prefix}</span>
      <span style={{ whiteSpace: "pre", wordBreak: "break-word" }}>{children}</span>
    </div>
  );
}

// ── Shared competitor card shell ─────────────────────────────────────────────
// Matches AgentFeatures: 22px heading, 16px body, rounded-[4px], bg-surface

function CompetitorCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[4px] flex flex-col px-7 py-8" style={{ backgroundColor: "var(--bg-surface)" }}>
      <div>
        <h3 className="text-[22px] leading-[1.3] font-normal tracking-[-0.02em] text-[var(--text-primary)] m-0">
          {title}
        </h3>
        <p className="text-[16px] leading-[1.5] text-[var(--text-secondary)] mt-4 mb-0">
          {description}
        </p>
      </div>
      <div className="pt-5 flex-1 flex flex-col justify-end">
        <div className="rounded-[4px] overflow-hidden min-h-[220px]" style={{ backgroundColor: "var(--bg-elevated)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function HumanReviewCard() {
  return (
    <CompetitorCard
      title="Human Reviewer"
      description="Skimmed 3 files in 22 minutes. Missed the breaking import that will crash production."
    >
      <div style={{ padding: "16px 20px", fontFamily: mono, fontSize: 13, lineHeight: "22px", color: "var(--text-primary)" }}>
        LGTM 👍
      </div>
    </CompetitorCard>
  );
}

function ClaudeCodeCard() {
  return (
    <CompetitorCard
      title="Claude Code"
      description="Caught a naming nit and a local type error. Missed the upstream dependency break entirely."
    >
      <div style={{ padding: "16px 20px", fontFamily: mono, fontSize: 12, lineHeight: "22px" }}>
        <div style={{ color: "var(--text-secondary)", marginBottom: 8 }}>
          <span style={{ color: "#d29922" }}>⚠</span>{" "}
          Variable name <span style={{ color: SYN.param }}>status</span> is ambiguous
        </div>
        <div style={{ display: "flex", backgroundColor: "rgba(248,81,73,0.10)", borderLeft: "3px solid #f85149", padding: "2px 10px", margin: "4px -20px 0", paddingLeft: 20 }}>
          <span style={{ color: "var(--text-muted)", marginRight: 8 }}>−</span>
          <span>
            <span style={{ color: SYN.keyword }}>def</span>
            <span style={{ color: SYN.fn }}> get_user_rank</span>
            <span style={{ color: SYN.punct }}>(</span>
            <span style={{ color: SYN.param }}>user_id</span>
            <span style={{ color: SYN.punct }}>):</span>
          </span>
        </div>
        <div style={{ display: "flex", backgroundColor: "rgba(248,81,73,0.10)", borderLeft: "3px solid #f85149", padding: "2px 10px", margin: "0 -20px", paddingLeft: 20 }}>
          <span style={{ color: "var(--text-muted)", marginRight: 8 }}>−</span>
          <span>
            <span style={{ color: SYN.punct }}>{"  "}</span>
            <span style={{ color: SYN.keyword }}>return</span>
            <span style={{ color: SYN.param }}> user_id</span>
            <span style={{ color: SYN.punct }}> / </span>
            <span style={{ color: SYN.num }}>10</span>
            <span style={{ color: SYN.comment }}>{" "}# Cannot divide string by int</span>
          </span>
        </div>
        <div style={{ display: "flex", backgroundColor: "rgba(46,160,67,0.10)", borderLeft: "3px solid #3fb950", padding: "2px 10px", margin: "0 -20px", paddingLeft: 20 }}>
          <span style={{ color: "var(--text-muted)", marginRight: 8 }}>+</span>
          <span>
            <span style={{ color: SYN.keyword }}>def</span>
            <span style={{ color: SYN.fn }}> get_user_rank</span>
            <span style={{ color: SYN.punct }}>(</span>
            <span style={{ color: SYN.param }}>user_id</span>
            <span style={{ color: SYN.punct }}>):</span>
          </span>
        </div>
        <div style={{ display: "flex", backgroundColor: "rgba(46,160,67,0.10)", borderLeft: "3px solid #3fb950", padding: "2px 10px", margin: "0 -20px 8px", paddingLeft: 20 }}>
          <span style={{ color: "var(--text-muted)", marginRight: 8 }}>+</span>
          <span>
            <span style={{ color: SYN.punct }}>{"  "}</span>
            <span style={{ color: SYN.keyword }}>return</span>
            <span style={{ color: SYN.fn }}> int</span>
            <span style={{ color: SYN.punct }}>(</span>
            <span style={{ color: SYN.param }}>user_id</span>
            <span style={{ color: SYN.punct }}>) / </span>
            <span style={{ color: SYN.num }}>10</span>
          </span>
        </div>
        <div style={{ color: SYN.comment, fontSize: 11, fontStyle: "italic" }}>
          No cross-repo issues detected.
        </div>
      </div>
    </CompetitorCard>
  );
}

function BugbotCard() {
  return (
    <CompetitorCard
      title="Cursor Bugbot"
      description="Burned 52 seconds linting domain types. Missed the breaking change that will crash production."
    >
      <div style={{ padding: "16px 20px", fontFamily: mono, fontSize: 12, lineHeight: "20px" }}>
        <div style={{ color: "var(--text-muted)", fontSize: 11, marginBottom: 10 }}>
          ENFORCING ARCHITECTURAL LINTING · 52s
        </div>
        <div style={{ color: "var(--text-secondary)", marginBottom: 8 }}>
          Found <span style={{ color: "var(--text-primary)" }}>3 violations</span> — domain modeling
        </div>
        <div>
          <div style={{ color: "var(--text-primary)", marginBottom: 2 }}>
            1. [DOMAIN MODELING] CodeLinkMenu.tsx:6
          </div>
          <div style={{ color: "var(--text-secondary)", paddingLeft: 14 }}>
            <span style={{ color: SYN.param }}>filePath</span> is a bare <span style={{ color: SYN.type }}>string</span> — use branded type
          </div>
          <div style={{ color: "var(--text-secondary)", paddingLeft: 14, marginTop: 2 }}>
            Fix: <span style={{ color: SYN.type }}>FilePath</span> = <span style={{ color: SYN.type }}>string</span> & {"{"} <span style={{ color: SYN.keyword }}>readonly</span> _brand: <span style={{ color: SYN.string }}>&apos;FilePath&apos;</span> {"}"}
          </div>
        </div>
      </div>
    </CompetitorCard>
  );
}

// ── Optibot card (dominant, full-width) ──────────────────────────────────────

function OptibotCard() {
  return (
    <div
      className="rounded-[4px] overflow-hidden"
      style={{
        backgroundColor: "var(--bg-surface)",
        boxShadow: "0 0 0 1px var(--accent), 0 0 40px rgba(139,92,246,0.08)",
      }}
    >
      {/* Header */}
      <div className="px-[48px] pt-[48px]">
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#e46a3d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 700 }}>
            O
          </div>
          <h3 className="text-[22px] leading-[1.3] font-normal tracking-[-0.02em] text-[var(--text-primary)] m-0">
            Optibot
          </h3>
          <span style={{
            fontSize: 11,
            backgroundColor: "var(--accent-muted)",
            color: "var(--accent)",
            borderRadius: "2em",
            padding: "2px 8px",
            fontWeight: 500,
          }}>
            Cross-repo context
          </span>
          <span className="text-[var(--text-muted)] text-[14px] ml-auto">reviewed in 47s</span>
        </div>
        <p className="text-[16px] leading-[1.5] text-[var(--text-secondary)] mt-4 mb-0">
          Catches the breaking change, traces it across 3 repos, and suggests the fix — all in under a minute.
        </p>
      </div>

      {/* Body */}
      <div className="px-[48px] pb-[48px] pt-[24px]">
        {/* File header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--text-muted)">
            <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
          </svg>
          <span style={{ fontFamily: mono, fontSize: 13, color: "var(--text-secondary)" }}>
            services/billing/applyDiscount.ts
          </span>
        </div>

        {/* Diff block */}
        <div className="rounded-[4px] overflow-hidden mb-5" style={{ backgroundColor: "var(--bg-elevated)", padding: "10px 0" }}>
          <DiffLine num="1" type="ctx">
            <span style={{ color: SYN.keyword }}>import</span>
            <span style={{ color: SYN.punct }}>{" { "}</span>
            <span style={{ color: SYN.fn }}>getDiscountTier</span>
            <span style={{ color: SYN.punct }}>{" } "}</span>
            <span style={{ color: SYN.keyword }}>from</span>
            <span style={{ color: SYN.string }}>{' "@org/shared-utils"'}</span>
            <span style={{ color: SYN.punct }}>;</span>
          </DiffLine>
          <DiffLine num="2" type="ctx">
            <span style={{ color: SYN.keyword }}>import</span>
            <span style={{ color: SYN.punct }}>{" { "}</span>
            <span style={{ color: SYN.type }}>User</span>
            <span style={{ color: SYN.punct }}>{" } "}</span>
            <span style={{ color: SYN.keyword }}>from</span>
            <span style={{ color: SYN.string }}>{' "@org/auth-types"'}</span>
            <span style={{ color: SYN.punct }}>;</span>
          </DiffLine>
          <DiffLine num="3" type="ctx"><span /></DiffLine>
          <DiffLine num="4" type="ctx">
            <span style={{ color: SYN.keyword }}>export const</span>
            <span style={{ color: SYN.fn }}> applyDiscount</span>
            <span style={{ color: SYN.punct }}> = (</span>
            <span style={{ color: SYN.param }}>user</span>
            <span style={{ color: SYN.punct }}>: </span>
            <span style={{ color: SYN.type }}>User</span>
            <span style={{ color: SYN.punct }}>, </span>
            <span style={{ color: SYN.param }}>price</span>
            <span style={{ color: SYN.punct }}>: </span>
            <span style={{ color: SYN.type }}>number</span>
            <span style={{ color: SYN.punct }}>): </span>
            <span style={{ color: SYN.type }}>number</span>
            <span style={{ color: SYN.punct }}>{" => {"}</span>
          </DiffLine>
          <DiffLine num="5" type="del">
            <span style={{ color: SYN.punct }}>{"  "}</span>
            <span style={{ color: SYN.keyword }}>const</span>
            <span style={{ color: SYN.param }}> tier</span>
            <span style={{ color: SYN.punct }}> = </span>
            <span style={{ color: SYN.fn }}>getDiscountTier</span>
            <span style={{ color: SYN.punct }}>(</span>
            <span style={{ color: SYN.param }}>user</span>
            <span style={{ color: SYN.punct }}>.</span>
            <span style={{ color: SYN.prop }}>login</span>
            <span style={{ color: SYN.punct }}>);</span>
          </DiffLine>
          <DiffLine num="5" type="add">
            <span style={{ color: SYN.punct }}>{"  "}</span>
            <span style={{ color: SYN.keyword }}>const</span>
            <span style={{ color: SYN.param }}> tier</span>
            <span style={{ color: SYN.punct }}> = </span>
            <span style={{ color: SYN.fn }}>getDiscountTier</span>
            <span style={{ color: SYN.punct }}>(</span>
            <span style={{ color: SYN.param }}>user</span>
            <span style={{ color: SYN.punct }}>.</span>
            <span style={{ color: SYN.prop }}>username</span>
            <span style={{ color: SYN.punct }}>);</span>
          </DiffLine>
          <DiffLine num="6" type="ctx">
            <span style={{ color: SYN.punct }}>{"  "}</span>
            <span style={{ color: SYN.keyword }}>return</span>
            <span style={{ color: SYN.param }}> price</span>
            <span style={{ color: SYN.punct }}> * (</span>
            <span style={{ color: SYN.num }}>1</span>
            <span style={{ color: SYN.punct }}> - </span>
            <span style={{ color: SYN.param }}>tier</span>
            <span style={{ color: SYN.punct }}>.</span>
            <span style={{ color: SYN.prop }}>rate</span>
            <span style={{ color: SYN.punct }}>);</span>
          </DiffLine>
          <DiffLine num="7" type="ctx">
            <span style={{ color: SYN.punct }}>{"}"}</span>
            <span style={{ color: SYN.punct }}>;</span>
          </DiffLine>
        </div>

        {/* Findings */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="rounded-[4px] p-4" style={{ backgroundColor: "var(--bg-elevated)" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ color: "#f85149", fontSize: 13, lineHeight: "22px", flexShrink: 0 }}>●</span>
              <div>
                <div className="text-[16px] font-medium text-[var(--text-primary)] mb-1.5" style={{ lineHeight: 1.4 }}>
                  Breaking change: <InlineCode>user.login</InlineCode> → <InlineCode>user.username</InlineCode>
                </div>
                <p className="text-[16px] leading-[1.5] text-[var(--text-secondary)] m-0">
                  <InlineCode>@org/auth-types@3.2.0</InlineCode> renamed <InlineCode>User.login</InlineCode> to <InlineCode>User.username</InlineCode>, but <InlineCode>getDiscountTier()</InlineCode> in <InlineCode>@org/shared-utils</InlineCode> still expects <InlineCode>.login</InlineCode>. This will throw at runtime in billing, checkout, and 4 other consumers.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[4px] p-4" style={{ backgroundColor: "var(--bg-elevated)" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ color: "#3fb950", fontSize: 13, lineHeight: "22px", flexShrink: 0 }}>●</span>
              <div>
                <div className="text-[16px] font-medium text-[var(--text-primary)] mb-1.5" style={{ lineHeight: 1.4 }}>
                  Suggested fix across 3 repos
                </div>
                <p className="text-[16px] leading-[1.5] text-[var(--text-secondary)] m-0">
                  Update <InlineCode>getDiscountTier()</InlineCode> signature in <InlineCode>@org/shared-utils</InlineCode> to accept <InlineCode>username</InlineCode>, and pin <InlineCode>@org/auth-types</InlineCode> ≥ 3.2.0 in all 6 downstream consumers.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", paddingTop: 2 }}>
            {["No SQL injection vectors", "CSRF validation intact", "Session handling correct"].map((check) => (
              <div key={check} className="text-[14px] text-[var(--text-muted)] flex items-center gap-1.5">
                <span style={{ color: "#3fb950" }}>✓</span>
                {check}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────

export function Comparison() {
  return (
    <section className="w-full px-6 pt-24 pb-2">
      <div className="max-w-[1300px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-[28px] md:text-[36px] leading-[1.2] tracking-[-0.02em] font-normal text-[var(--text-primary)]">
            Same PR. Four reviewers.
          </h2>
          <p className="text-[16px] md:text-[18px] leading-[1.5] text-[var(--text-secondary)] mt-4 max-w-[600px] mx-auto">
            Only one catches the breaking change that will crash your production build.
          </p>
        </div>

        {/* Competitor grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <HumanReviewCard />
          <ClaudeCodeCard />
          <BugbotCard />
        </div>

        {/* Optibot — full width */}
        <OptibotCard />

        {/* Closing line */}
        <h2 className="text-[16px] sm:text-[20px] md:text-[26px] lg:text-[32px] leading-[1.15] tracking-[-0.02em] font-normal text-[var(--text-primary)] mt-20 max-w-[950px]">
          knows your business logic, catches breaking changes before prod, and understands every dependency.
        </h2>
      </div>
    </section>
  );
}
