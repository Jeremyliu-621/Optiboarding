"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Check, ArrowRight } from "lucide-react";
import Image from "next/image";

interface OnboardingWizardProps {
  onComplete: () => void;
  userName?: string;
  userImage?: string;
}

const TOTAL_STEPS = 5;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

/* ── Dots ── */
function Dots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5 justify-center mt-16">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{
            backgroundColor:
              i <= current
                ? "var(--text-secondary)"
                : "var(--border-subtle)",
          }}
        />
      ))}
    </div>
  );
}

/* ═══ STEP 1 — Welcome ═══ */
function WelcomeStep({
  onNext,
  userName,
  userImage,
}: {
  onNext: () => void;
  userName?: string;
  userImage?: string;
}) {
  return (
    <div className="flex flex-col items-center">
      {/* Logo mark — the actual product icon, not a generic Sparkles */}
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        className="mb-10"
      >
        <rect
          width="56"
          height="56"
          rx="14"
          fill="var(--bg-surface)"
          stroke="var(--card-border)"
          strokeWidth="1"
        />
        <path
          d="M20 28C20 23.582 23.582 20 28 20C32.418 20 36 23.582 36 28C36 32.418 32.418 36 28 36"
          stroke="var(--text-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="28" cy="28" r="3" fill="var(--accent)" />
      </svg>

      <h1
        className="text-[40px] tracking-[-0.04em] text-[var(--text-primary)] mb-4 text-center"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
      >
        Welcome to Optimal AI
      </h1>

      <p className="text-[15px] text-[var(--text-muted)] text-center max-w-[340px] leading-relaxed mb-10">
        AI-powered code review with full codebase context.
        Streamline reviews, catch bugs early, and ship with confidence.
      </p>

      {userName && (
        <div className="flex items-center gap-2.5 mb-10">
          {userImage && (
            <Image
              src={userImage}
              alt={userName}
              width={28}
              height={28}
              className="rounded-full"
            />
          )}
          <span className="text-[14px] text-[var(--text-muted)]">
            {userName}
          </span>
        </div>
      )}

      <button
        onClick={onNext}
        className="h-11 px-10 rounded-[8px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[14px] font-medium transition-colors duration-150 cursor-pointer"
      >
        Get started
      </button>
    </div>
  );
}

/* ═══ STEP 2 — GitHub ═══ */
function GitHubStep({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <Github size={40} className="text-[var(--text-primary)] mb-8" />

      <h2
        className="text-[28px] tracking-[-0.03em] text-[var(--text-primary)] mb-2 text-center"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
      >
        Install GitHub integration
      </h2>
      <p className="text-[14px] text-[var(--text-muted)] text-center max-w-[380px] mb-8">
        Automate issue workflow when GitHub pull requests are opened and merged.
      </p>

      {/* Benefit list — simple, no cards */}
      <div className="w-full max-w-[440px] border border-[var(--card-border)] rounded-[10px] divide-y divide-[var(--card-border)] mb-8">
        {[
          "Optibot reviews every pull request automatically.",
          "Full codebase context — reads your entire repo, not just the diff.",
          <>Optimal AI <strong className="text-[var(--text-primary)]">will not</strong> ask for code write permissions.</>,
        ].map((text, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-4">
            <Check size={16} className="text-[var(--accent)] shrink-0 mt-0.5" strokeWidth={2.5} />
            <p className="text-[14px] text-[var(--text-secondary)] leading-snug">{text}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="h-11 px-10 rounded-[8px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[14px] font-medium transition-colors duration-150 cursor-pointer flex items-center gap-2"
      >
        Authenticate with GitHub
      </button>
      <button
        onClick={onSkip}
        className="mt-5 text-[13px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer"
      >
        I&apos;ll do this later
      </button>
    </div>
  );
}

/* ═══ STEP 3 — Slack ═══ */
function SlackStep({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  return (
    <div className="flex flex-col items-center">
      {/* Slack logo — simple SVG, not a lucide icon */}
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-8">
        <path d="M14.5 4C12.567 4 11 5.567 11 7.5C11 9.433 12.567 11 14.5 11H18V7.5C18 5.567 16.433 4 14.5 4Z" fill="#E01E5A"/>
        <path d="M14.5 14H7.5C5.567 14 4 15.567 4 17.5C4 19.433 5.567 21 7.5 21H14.5C16.433 21 18 19.433 18 17.5C18 15.567 16.433 14 14.5 14Z" fill="#E01E5A"/>
        <path d="M36 17.5C36 15.567 34.433 14 32.5 14C30.567 14 29 15.567 29 17.5V21H32.5C34.433 21 36 19.433 36 17.5Z" fill="#2EB67D"/>
        <path d="M25.5 14H22.5C20.567 14 19 15.567 19 17.5V24.5C19 26.433 20.567 28 22.5 28C24.433 28 26 26.433 26 24.5V17.5C26 15.567 25.433 14 25.5 14Z" fill="#2EB67D"/>
        <path d="M22.5 36C24.433 36 26 34.433 26 32.5C26 30.567 24.433 29 22.5 29H19V32.5C19 34.433 20.567 36 22.5 36Z" fill="#ECB22E"/>
        <path d="M22.5 19H29.5C31.433 19 33 20.567 33 22.5C33 24.433 31.433 26 29.5 26H22.5C20.567 26 19 24.433 19 22.5C19 20.567 20.567 19 22.5 19Z" fill="#ECB22E"/>
        <path d="M4 22.5C4 24.433 5.567 26 7.5 26C9.433 26 11 24.433 11 22.5V19H7.5C5.567 19 4 20.567 4 22.5Z" fill="#36C5F0"/>
        <path d="M14.5 19H17.5C19.433 19 21 20.567 21 22.5V29.5C21 31.433 19.433 33 17.5 33C15.567 33 14 31.433 14 29.5V22.5C14 20.567 14.567 19 14.5 19Z" fill="#36C5F0"/>
      </svg>

      <h2
        className="text-[28px] tracking-[-0.03em] text-[var(--text-primary)] mb-2 text-center"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
      >
        Connect Slack
      </h2>
      <p className="text-[14px] text-[var(--text-muted)] text-center max-w-[380px] mb-8">
        Get review notifications and summaries right where your team works.
      </p>

      <div className="w-full max-w-[440px] border border-[var(--card-border)] rounded-[10px] divide-y divide-[var(--card-border)] mb-8">
        {[
          "Get notified when reviews finish — never miss a finding.",
          "Route alerts to specific channels per repository.",
          "Receive daily digests of review activity across your team.",
        ].map((text, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-4">
            <Check size={16} className="text-[var(--accent)] shrink-0 mt-0.5" strokeWidth={2.5} />
            <p className="text-[14px] text-[var(--text-secondary)] leading-snug">{text}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="h-11 px-10 rounded-[8px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[14px] font-medium transition-colors duration-150 cursor-pointer"
      >
        Connect Slack
      </button>
      <button
        onClick={onSkip}
        className="mt-5 text-[13px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer"
      >
        I&apos;ll do this later
      </button>
    </div>
  );
}

/* ═══ STEP 4 — Configure ═══ */
function ConfigureStep({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState("balanced");

  const options = [
    { id: "relaxed",  label: "Relaxed",  desc: "Bugs & security only" },
    { id: "balanced", label: "Balanced", desc: "Bugs, security + style" },
    { id: "strict",   label: "Strict",   desc: "Full best-practice review" },
  ];

  return (
    <div className="flex flex-col items-center">
      <h2
        className="text-[28px] tracking-[-0.03em] text-[var(--text-primary)] mb-2 text-center"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
      >
        Configure Optibot
      </h2>
      <p className="text-[14px] text-[var(--text-muted)] text-center max-w-[360px] mb-10">
        Choose how thorough you want reviews to be. You can change this anytime in settings.
      </p>

      {/* Horizontal radio group — not cards, just clean segmented options */}
      <div className="w-full max-w-[440px] border border-[var(--card-border)] rounded-[10px] divide-y divide-[var(--card-border)] mb-10">
        {options.map((opt) => {
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-100 cursor-pointer first:rounded-t-[10px] last:rounded-b-[10px]"
              style={{ backgroundColor: active ? "var(--bg-elevated)" : "transparent" }}
            >
              <div>
                <p
                  className="text-[14px] font-medium"
                  style={{ color: active ? "var(--text-primary)" : "var(--text-secondary)" }}
                >
                  {opt.label}
                </p>
                <p className="text-[13px] text-[var(--text-muted)] mt-0.5">{opt.desc}</p>
              </div>
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                style={{
                  borderColor: active ? "var(--accent)" : "var(--border-subtle)",
                  backgroundColor: active ? "var(--accent)" : "transparent",
                }}
              >
                {active && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        className="h-11 px-10 rounded-[8px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[14px] font-medium transition-colors duration-150 cursor-pointer flex items-center gap-2"
      >
        Continue
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

/* ═══ STEP 5 — Done ═══ */
function DoneStep({ onComplete }: { onComplete: () => void }) {
  const tips = [
    { label: "Tell your team",             desc: "Invite co-workers to your workspace." },
    { label: "Integrate GitHub & Slack",    desc: "Link your pull requests and channels." },
    { label: "Try a review",               desc: "Open a PR to see Optibot in action." },
  ];

  return (
    <div className="flex flex-col items-center">
      <h2
        className="text-[28px] tracking-[-0.03em] text-[var(--text-primary)] mb-2 text-center"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
      >
        You&apos;re good to go
      </h2>
      <p className="text-[14px] text-[var(--text-muted)] text-center max-w-[380px] mb-10">
        Go ahead and explore the app. When you&apos;re ready, create your first review from the dashboard.
      </p>

      <div className="w-full max-w-[500px] grid grid-cols-3 gap-px bg-[var(--card-border)] border border-[var(--card-border)] rounded-[10px] overflow-hidden mb-10">
        {tips.map((tip) => (
          <div key={tip.label} className="bg-[var(--bg-surface)] p-5">
            <p className="text-[14px] font-medium text-[var(--text-primary)] mb-1">
              {tip.label}
            </p>
            <p className="text-[12px] text-[var(--text-muted)] leading-snug">
              {tip.desc}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={onComplete}
        className="h-11 px-10 rounded-[8px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[14px] font-medium transition-colors duration-150 cursor-pointer"
      >
        Open Optimal AI
      </button>
    </div>
  );
}

/* ═══ WIZARD SHELL ═══ */
export function OnboardingWizard({
  onComplete,
  userName,
  userImage,
}: OnboardingWizardProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => { setDirection(1); setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1)); };
  const skip = () => { setDirection(1); setStep((s) => s + 1); };

  const steps = [
    <WelcomeStep key="w" onNext={next} userName={userName} userImage={userImage} />,
    <GitHubStep key="g" onNext={next} onSkip={skip} />,
    <SlackStep key="s" onNext={next} onSkip={skip} />,
    <ConfigureStep key="c" onNext={next} />,
    <DoneStep key="d" onComplete={onComplete} />,
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[var(--bg-deep)] flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative w-full max-w-[560px] min-h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full"
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      <Dots current={step} total={TOTAL_STEPS} />
    </motion.div>
  );
}
