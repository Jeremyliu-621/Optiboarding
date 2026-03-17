"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── GitHub Design Tokens ──────────────────────────────────────────────────────
const GH = {
  bg: "#ffffff",
  bgSubtle: "#f6f8fa",
  border: "#d1d9e0",
  fg: "#1f2328",
  fgMuted: "#656d76",
  link: "#0969da",
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  openBg: "#238636",
  mergedBg: "#8250df",
  mergedBannerBg: "#f6f4fe",
  mergedBannerBorder: "#d4c5f9",
  approvalGreen: "#1a7f37",
  orange: "#e46a3d",
  diffDelBg: "#ffebe9",
  diffDelBorder: "#ff8182",
  diffDelText: "#82071e",
  diffAddBg: "#e6ffec",
  diffAddBorder: "#4ac26b",
  diffAddText: "#116329",
  diffHunkBg: "#ddf4ff",
  diffHunkText: "#0550ae",
  codeBg: "rgba(175,184,193,0.2)",
} as const;

// ── Stage timing ──────────────────────────────────────────────────────────────
// 0=opened 1=reviewing 2=comment 3=committed 4=approved 5=merged 6=hold
const STAGE_DURATIONS = [2400, 1800, 3000, 1500, 1500, 2000, 1800];
const MAX_STAGE = 6;
const FADE_MS = 400;

// ── Icons ─────────────────────────────────────────────────────────────────────

function GitHubMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill={GH.fg}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function IconPR() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
    </svg>
  );
}

function IconMerged({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005L5 3.25Z" />
    </svg>
  );
}

function IconCheck({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
    </svg>
  );
}

function IconCommit() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
      <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
    </svg>
  );
}

// ── Primitive components ──────────────────────────────────────────────────────

function PRBadge({ merged }: { merged: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        backgroundColor: merged ? GH.mergedBg : GH.openBg,
        color: "#fff",
        borderRadius: "2em",
        fontSize: 12,
        fontWeight: 500,
        padding: "2px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {merged ? <IconMerged size={14} /> : <IconPR />}
      {merged ? "Merged" : "Open"}
    </span>
  );
}

function BotBadge() {
  return (
    <span
      style={{
        fontSize: 12,
        border: `1px solid ${GH.border}`,
        borderRadius: "2em",
        padding: "0 6px",
        color: GH.fgMuted,
        lineHeight: "20px",
      }}
    >
      Bot
    </span>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: GH.mono,
        fontSize: "85%",
        background: GH.codeBg,
        borderRadius: 6,
        padding: "0.2em 0.4em",
      }}
    >
      {children}
    </code>
  );
}

// Wrapper that animates in when first rendered
function SlideIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ── Timeline event row ────────────────────────────────────────────────────────

type EventIconProps = {
  bg: string;
  color?: string;
  border?: string;
  children: React.ReactNode;
};

function EventIcon({ bg, color = "#fff", border, children }: EventIconProps) {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: bg,
        color,
        border: border ?? "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        zIndex: 1,
      }}
    >
      {children}
    </div>
  );
}

function TimelineRow({
  icon,
  user,
  userColor,
  action,
  detail,
  timestamp,
}: {
  icon: React.ReactNode;
  user: string;
  userColor?: string;
  action: React.ReactNode;
  detail?: string;
  timestamp: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        position: "relative",
        marginBottom: 16,
      }}
    >
      {icon}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          minWidth: 0,
        }}
      >
        <div>
          <span style={{ fontSize: 14, fontWeight: 600, color: userColor ?? GH.fg }}>
            {user}
          </span>
          <span style={{ fontSize: 14, color: GH.fgMuted }}> {action}</span>
          {detail && (
            <div style={{ fontSize: 12, color: GH.fgMuted, marginTop: 2 }}>
              {detail}
            </div>
          )}
        </div>
        <span
          style={{
            fontSize: 12,
            color: GH.fgMuted,
            flexShrink: 0,
            marginLeft: 16,
            whiteSpace: "nowrap",
          }}
        >
          {timestamp}
        </span>
      </div>
    </div>
  );
}

// ── Diff block ────────────────────────────────────────────────────────────────

function DiffBlock() {
  return (
    <div
      style={{
        border: `1px solid ${GH.border}`,
        borderRadius: 6,
        overflow: "hidden",
        fontFamily: GH.mono,
        fontSize: 12,
        lineHeight: "20px",
        marginBottom: 20,
        marginLeft: 32,
      }}
    >
      <div
        style={{
          backgroundColor: GH.bgSubtle,
          borderBottom: `1px solid ${GH.border}`,
          padding: "6px 16px",
          color: GH.fg,
          fontWeight: 600,
        }}
      >
        auth-service/src/users.ts
      </div>
      {/* Hunk header */}
      <div
        style={{
          display: "flex",
          backgroundColor: GH.diffHunkBg,
          padding: "1px 10px",
        }}
      >
        <span style={{ color: GH.diffHunkText, opacity: 0.8 }}>
          @@ -12,7 +12,7 @@
        </span>
      </div>
      {/* Context */}
      <div style={{ display: "flex", backgroundColor: GH.bg, padding: "1px 0" }}>
        <span
          style={{
            width: 28,
            textAlign: "center",
            color: GH.fgMuted,
            opacity: 0.4,
            userSelect: "none",
            flexShrink: 0,
          }}
        >
          {" "}
        </span>
        <span style={{ color: GH.fg, paddingLeft: 4, paddingRight: 16 }}>
          {"  return db.query<User>({ table: 'users', where: { id } });"}
        </span>
      </div>
      {/* Deletion */}
      <div
        style={{
          display: "flex",
          backgroundColor: GH.diffDelBg,
          borderLeft: `4px solid ${GH.diffDelBorder}`,
          padding: "1px 0",
        }}
      >
        <span
          style={{
            width: 24,
            textAlign: "center",
            color: GH.diffDelText,
            opacity: 0.7,
            userSelect: "none",
            flexShrink: 0,
          }}
        >
          -
        </span>
        <span style={{ color: GH.diffDelText, paddingLeft: 4, paddingRight: 16 }}>
          {"export async function getUserById(id: string) {"}
        </span>
      </div>
      {/* Addition */}
      <div
        style={{
          display: "flex",
          backgroundColor: GH.diffAddBg,
          borderLeft: `4px solid ${GH.diffAddBorder}`,
          padding: "1px 0",
        }}
      >
        <span
          style={{
            width: 24,
            textAlign: "center",
            color: GH.diffAddText,
            opacity: 0.7,
            userSelect: "none",
            flexShrink: 0,
          }}
        >
          +
        </span>
        <span style={{ color: GH.diffAddText, paddingLeft: 4, paddingRight: 16 }}>
          {"export async function fetchUser(id: string) {"}
        </span>
      </div>
      {/* Context */}
      <div style={{ display: "flex", backgroundColor: GH.bg, padding: "1px 0" }}>
        <span
          style={{
            width: 28,
            textAlign: "center",
            color: GH.fgMuted,
            opacity: 0.4,
            userSelect: "none",
            flexShrink: 0,
          }}
        >
          {" "}
        </span>
        <span style={{ color: GH.fg, paddingLeft: 4, paddingRight: 16 }}>
          {"  const user = await db.find(id);"}
        </span>
      </div>
    </div>
  );
}

// ── Review comment card ───────────────────────────────────────────────────────

function ReviewCommentCard() {
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
      {/* 32px avatar for comments */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: GH.orange,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          marginTop: 2,
        }}
      >
        O
      </div>
      <div
        style={{
          flex: 1,
          border: `1px solid ${GH.border}`,
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
            padding: "8px 16px",
            backgroundColor: GH.bgSubtle,
            borderBottom: `1px solid ${GH.border}`,
            minHeight: 40,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: GH.fg }}>
            agent-optibot
          </span>
          <BotBadge />
          <span style={{ fontSize: 12, color: GH.fgMuted, marginLeft: "auto" }}>
            just now
          </span>
        </div>
        {/* Body */}
        <div style={{ padding: 16, fontSize: 14, lineHeight: 1.5, color: GH.fg }}>
          <p
            style={{
              fontWeight: 600,
              color: "#9a6700",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            ⚠️ Breaking change detected
          </p>
          <p style={{ marginBottom: 12 }}>
            <Code>getUserById</Code> is called by 3 downstream services:
          </p>
          <div
            style={{
              fontFamily: GH.mono,
              fontSize: 13,
              marginBottom: 12,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {[
              "billing-service/src/charges.ts:42",
              "notifications/src/alerts.ts:17",
              "admin-api/src/users.ts:8",
            ].map((p) => (
              <span key={p} style={{ color: GH.link }}>
                {p}
              </span>
            ))}
          </div>
          <p>
            These imports will break after this rename. Suggest updating all
            callers or adding a deprecation alias.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Merged banner ─────────────────────────────────────────────────────────────

function MergedBanner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderRadius: 6,
        backgroundColor: GH.mergedBannerBg,
        border: `1px solid ${GH.mergedBannerBorder}`,
        marginBottom: 16,
        marginLeft: 32,
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: GH.mergedBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          flexShrink: 0,
        }}
      >
        <IconMerged size={14} />
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, color: GH.mergedBg }}>
        Pull request successfully merged and closed
      </span>
    </div>
  );
}

// ── Timeline (accumulates events) ─────────────────────────────────────────────

function Timeline({ stage }: { stage: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const t = setTimeout(
      () => el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }),
      80
    );
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <div
      ref={scrollRef}
      style={{
        flex: 1,
        overflowY: "auto",
        // hide scrollbar
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      } as React.CSSProperties}
    >
      <div
        style={{
          padding: "20px 24px",
          position: "relative",
          minHeight: "100%",
        }}
      >
        {/* Vertical connecting line — runs the full height of content */}
        <div
          style={{
            position: "absolute",
            left: 33, // 24px padding + 9px = center of 20px avatar
            top: 36,
            bottom: 20,
            width: 2,
            backgroundColor: GH.border,
            pointerEvents: "none",
          }}
        />

        {/* ── Stage 0: drmaeur opened ── */}
        <TimelineRow
          icon={
            <EventIcon bg="#e6ffec">
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: GH.approvalGreen,
                }}
              />
            </EventIcon>
          }
          user="drmaeur"
          action="opened this pull request"
          detail="3 files changed · +47 −12"
          timestamp="3 minutes ago"
        />
        <DiffBlock />

        {/* ── Stage 1: optibot started reviewing ── */}
        {stage >= 1 && (
          <SlideIn>
            <TimelineRow
              icon={
                <EventIcon bg={GH.orange}>
                  <span style={{ fontSize: 9, fontWeight: 700 }}>O</span>
                </EventIcon>
              }
              user="agent-optibot"
              userColor={GH.orange}
              action="started a review"
              detail="Analyzing 3 files…"
              timestamp="1 minute ago"
            />
          </SlideIn>
        )}

        {/* ── Stage 2: review comment ── */}
        {stage >= 2 && (
          <SlideIn>
            <ReviewCommentCard />
          </SlideIn>
        )}

        {/* ── Stage 3: drmaeur committed ── */}
        {stage >= 3 && (
          <SlideIn>
            <TimelineRow
              icon={
                <EventIcon
                  bg={GH.bg}
                  color={GH.fgMuted}
                  border={`2px solid ${GH.border}`}
                >
                  <IconCommit />
                </EventIcon>
              }
              user="drmaeur"
              action="committed"
              detail="fix: update downstream imports"
              timestamp="30 seconds ago"
            />
          </SlideIn>
        )}

        {/* ── Stage 4: optibot approved ── */}
        {stage >= 4 && (
          <SlideIn>
            <TimelineRow
              icon={
                <EventIcon bg={GH.approvalGreen}>
                  <IconCheck />
                </EventIcon>
              }
              user="agent-optibot"
              userColor={GH.orange}
              action="approved these changes"
              detail="All issues resolved. Ready to merge."
              timestamp="10 seconds ago"
            />
          </SlideIn>
        )}

        {/* ── Stage 5: merged ── */}
        {stage >= 5 && (
          <SlideIn>
            <TimelineRow
              icon={
                <EventIcon bg={GH.mergedBg}>
                  <IconMerged size={12} />
                </EventIcon>
              }
              user="agent-optibot"
              userColor={GH.orange}
              action={
                <>
                  merged commit <Code>a3f29bc</Code> into <Code>main</Code>
                </>
              }
              timestamp="just now"
            />
            <MergedBanner />
          </SlideIn>
        )}
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({ stage }: { stage: number }) {
  const isReviewing = stage >= 1;
  const isApproved = stage >= 4;

  return (
    <div
      style={{
        width: 220,
        borderLeft: `1px solid ${GH.border}`,
        flexShrink: 0,
        overflowY: "auto",
        scrollbarWidth: "none",
        padding: "16px",
      } as React.CSSProperties}
    >
      {/* Reviewers */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: GH.fg,
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Reviewers
          <span style={{ color: GH.link, fontWeight: 400 }}>⚙</span>
        </div>

        {!isReviewing ? (
          <span style={{ fontSize: 12, color: GH.fgMuted }}>
            No reviews
          </span>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: GH.orange,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 9,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              O
            </div>
            <span style={{ fontSize: 12, color: GH.fg, flex: 1 }}>
              agent-optibot
            </span>
            <span
              style={{
                fontSize: 12,
                color: isApproved ? GH.approvalGreen : GH.fgMuted,
                fontWeight: isApproved ? 600 : 400,
              }}
            >
              {isApproved ? "✓" : "···"}
            </span>
          </motion.div>
        )}
      </div>

      {/* Assignees */}
      <div
        style={{
          borderTop: `1px solid ${GH.border}`,
          paddingTop: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: GH.fg,
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Assignees
          <span style={{ color: GH.link, fontWeight: 400 }}>⚙</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "#8250df",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 9,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            D
          </div>
          <span style={{ fontSize: 12, color: GH.fg }}>drmaeur</span>
        </div>
      </div>

      {/* Labels */}
      <div
        style={{
          borderTop: `1px solid ${GH.border}`,
          paddingTop: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: GH.fg,
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Labels
          <span style={{ color: GH.link, fontWeight: 400 }}>⚙</span>
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            backgroundColor: "#ddf4ff",
            color: "#0550ae",
            padding: "2px 8px",
            borderRadius: "2em",
          }}
        >
          refactor
        </span>
      </div>

      {/* Development */}
      <div style={{ borderTop: `1px solid ${GH.border}`, paddingTop: 16 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: GH.fg,
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Development
          <span style={{ color: GH.link, fontWeight: 400 }}>⚙</span>
        </div>
        <span style={{ fontSize: 12, color: GH.fgMuted }}>
          No linked issues
        </span>
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export function Hero() {
  const [stage, setStage] = useState(0);
  const [fading, setFading] = useState(false);

  // Advance stages
  useEffect(() => {
    if (fading) return;
    const timer = setTimeout(() => {
      if (stage === MAX_STAGE) setFading(true);
      else setStage((s) => s + 1);
    }, STAGE_DURATIONS[stage]);
    return () => clearTimeout(timer);
  }, [stage, fading]);

  // Fade out → reset → fade in
  useEffect(() => {
    if (!fading) return;
    const timer = setTimeout(() => {
      setStage(0);
      setFading(false);
    }, FADE_MS);
    return () => clearTimeout(timer);
  }, [fading]);

  const merged = stage >= 5;

  return (
    <section
      className="relative w-full px-6 flex flex-col items-center"
      style={{ paddingTop: 140 }}
    >
      {/* Hero copy and stats */}
      <div className="w-full max-w-[1300px] mx-auto flex flex-col md:flex-row justify-between items-start border-b-0 mb-10 z-10">
        <div>
          <h1 className="text-[16px] sm:text-[20px] md:text-[26px] lg:text-[32px] leading-[1.15] tracking-[-0.02em] font-normal text-black max-w-[680px]">
            Understanding intent at scale, Optibot is the most comprehensive code
            review agent.
          </h1>
          <div className="flex items-center gap-3 mt-8">
            <button className="flex items-center gap-2 border border-[#e2e2e2] bg-white hover:bg-[#f8f8f8] text-black px-5 py-3 rounded-full text-[15px] font-medium transition-colors">
              Get Started — Free
            </button>
          </div>
        </div>

        {/* Stats on the right */}
        <div className="flex flex-col gap-y-3 text-[14px] mt-8 md:mt-2 text-right">
          <div>
            <span className="font-semibold text-black">2x more</span>
            <span className="text-[#878787]"> security vulnerabilities caught</span>
          </div>
          <div>
            <span className="font-semibold text-black">50% faster</span>
            <span className="text-[#878787]"> PR review cycles</span>
          </div>
        </div>
      </div>

      {/* Mockup card */}
      <div className="w-full max-w-[1300px] mx-auto mb-24 z-20">
        <motion.div
          animate={{ opacity: fading ? 0 : 1 }}
          transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
        >
          {/* Root container — font set here so everything inherits */}
          <div
            style={{
              border: `1px solid ${GH.border}`,
              borderRadius: 12,
              backgroundColor: GH.bg,
              overflow: "hidden",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)",
              fontFamily: GH.font,
              color: GH.fg,
            }}
          >
            {/* ── Browser chrome ── */}
            <div
              style={{
                height: 40,
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                gap: 12,
                backgroundColor: GH.bgSubtle,
                borderBottom: `1px solid ${GH.border}`,
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: c,
                    }}
                  />
                ))}
              </div>
              <div
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
              >
                <div
                  style={{
                    height: 24,
                    borderRadius: 6,
                    border: `1px solid ${GH.border}`,
                    backgroundColor: GH.bg,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 10px",
                    maxWidth: 440,
                    width: "100%",
                    gap: 6,
                  }}
                >
                  {/* Lock icon */}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 16 16"
                    fill={GH.fgMuted}
                  >
                    <path d="M4 4a4 4 0 0 1 8 0v2h.25c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-5.5C2 6.784 2.784 6 3.75 6H4Zm8.25 3.5h-8.5a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25ZM10.5 4a2.5 2.5 0 0 0-5 0v2h5Z" />
                  </svg>
                  <span
                    style={{
                      fontSize: 12,
                      color: GH.fgMuted,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    github.com/myorg/auth-monorepo/pull/924
                  </span>
                </div>
              </div>
              <div style={{ width: 54 }} />
            </div>

            {/* ── GitHub nav bar ── */}
            <div
              style={{
                height: 48,
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                gap: 16,
                backgroundColor: GH.bg,
                borderBottom: `1px solid ${GH.border}`,
              }}
            >
              {/* Logo + repo path */}
              <div
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <GitHubMark />
                <span style={{ fontSize: 14, color: GH.fgMuted, marginLeft: 4 }}>
                  myorg
                </span>
                <span style={{ fontSize: 14, color: GH.border }}>/</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: GH.fg }}>
                  auth-monorepo
                </span>
              </div>

              {/* Repo nav tabs */}
              <div
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  fontSize: 13,
                  height: "100%",
                }}
              >
                {(
                  [
                    ["Code", null, false],
                    ["Issues", "0", false],
                    ["Pull requests", "1", true],
                    ["Actions", null, false],
                  ] as [string, string | null, boolean][]
                ).map(([label, count, active]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "0 12px",
                      borderBottom: active
                        ? `2px solid ${GH.orange}`
                        : "2px solid transparent",
                      color: active ? GH.fg : GH.fgMuted,
                      fontWeight: active ? 600 : 400,
                      cursor: "default",
                    }}
                  >
                    {label}
                    {count && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          backgroundColor: GH.border,
                          color: GH.fg,
                          borderRadius: "2em",
                          padding: "1px 6px",
                        }}
                      >
                        {count}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── PR header ── */}
            <div
              style={{
                padding: "16px 24px 0",
                borderBottom: `1px solid ${GH.border}`,
              }}
            >
              {/* Title + badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 8,
                  flexWrap: "wrap",
                }}
              >
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    lineHeight: 1.25,
                    color: GH.fg,
                    margin: 0,
                    flex: 1,
                    minWidth: 200,
                  }}
                >
                  refactor: rename getUserById to fetchUser
                </h2>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={merged ? "merged" : "open"}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    style={{ flexShrink: 0, paddingTop: 2 }}
                  >
                    <PRBadge merged={merged} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Branch meta */}
              <div style={{ fontSize: 14, color: GH.fgMuted, marginBottom: 12 }}>
                <span
                  style={{
                    fontFamily: GH.mono,
                    fontWeight: 600,
                    color: GH.link,
                  }}
                >
                  feature/auth-cleanup
                </span>
                <span> → </span>
                <span
                  style={{
                    fontFamily: GH.mono,
                    fontWeight: 600,
                    color: GH.link,
                  }}
                >
                  main
                </span>
                <span>
                  {" "}
                  · by{" "}
                  <strong style={{ fontWeight: 600, color: GH.fg }}>
                    drmaeur
                  </strong>{" "}
                  · #924
                </span>
              </div>

              {/* PR tab bar */}
              <div style={{ display: "flex", fontSize: 13, marginBottom: -1 }}>
                {(
                  [
                    ["Conversation", "3", true],
                    ["Commits", "1", false],
                    ["Checks", null, false],
                    ["Files changed", "3", false],
                  ] as [string, string | null, boolean][]
                ).map(([label, count, active]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 16px",
                      borderBottom: active
                        ? `2px solid ${GH.orange}`
                        : "2px solid transparent",
                      color: active ? GH.fg : GH.fgMuted,
                      fontWeight: active ? 600 : 400,
                      cursor: "default",
                    }}
                  >
                    {label}
                    {count && (
                      <span
                        style={{
                          fontSize: 11,
                          backgroundColor: GH.border,
                          color: GH.fg,
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

            {/* ── Main content: timeline + sidebar ── */}
            <div style={{ display: "flex", height: 360 }}>
              <Timeline stage={stage} />
              <Sidebar stage={stage} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
