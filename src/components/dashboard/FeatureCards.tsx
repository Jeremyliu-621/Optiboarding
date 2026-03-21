"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageSquareCode,
  BarChart3,
  Shield,
  FolderGit2,
  Users,
  FileText,
} from "lucide-react";

interface CardDef {
  label: string;
  icon: React.ElementType;
  href: string;
  accent: string;
  accentBg: string;
  glowColor: string;
}

const cards: CardDef[] = [
  {
    label: "Review a PR",
    icon: MessageSquareCode,
    href: "/dashboard/optibot",
    accent: "hsl(275, 55%, 65%)",
    accentBg: "hsla(275, 55%, 65%, 0.12)",
    glowColor: "hsla(275, 55%, 65%, 0.15)",
  },
  {
    label: "View Insights",
    icon: BarChart3,
    href: "/dashboard/insights",
    accent: "hsl(220, 65%, 60%)",
    accentBg: "hsla(220, 65%, 60%, 0.12)",
    glowColor: "hsla(220, 65%, 60%, 0.15)",
  },
  {
    label: "Security Scan",
    icon: Shield,
    href: "/dashboard/configuration/settings",
    accent: "hsl(38, 70%, 55%)",
    accentBg: "hsla(38, 70%, 55%, 0.12)",
    glowColor: "hsla(38, 70%, 55%, 0.15)",
  },
  {
    label: "Browse Repos",
    icon: FolderGit2,
    href: "/dashboard/integrations/github",
    accent: "hsl(175, 55%, 50%)",
    accentBg: "hsla(175, 55%, 50%, 0.12)",
    glowColor: "hsla(175, 55%, 50%, 0.15)",
  },
  {
    label: "Team Activity",
    icon: Users,
    href: "/dashboard/organization",
    accent: "hsl(10, 65%, 58%)",
    accentBg: "hsla(10, 65%, 58%, 0.12)",
    glowColor: "hsla(10, 65%, 58%, 0.15)",
  },
  {
    label: "Release Notes",
    icon: FileText,
    href: "/dashboard/configuration/guidelines",
    accent: "hsl(290, 50%, 58%)",
    accentBg: "hsla(290, 50%, 58%, 0.12)",
    glowColor: "hsla(290, 50%, 58%, 0.15)",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

function FeatureCard({ card }: { card: CardDef }) {
  return (
    <Link
      href={card.href}
      className="group relative flex flex-col items-center justify-center gap-3 p-4 rounded-[14px] bg-[var(--bg-surface)] border border-transparent transition-all duration-250 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-deep)] hover:border-[var(--border-subtle)] aspect-square"
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at 50% 40%, ${card.glowColor}, transparent 70%)` }}
      />

      {/* Icon */}
      <div
        className="relative z-[1] w-14 h-14 rounded-[12px] flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundColor: card.accentBg }}
      >
        <card.icon size={28} strokeWidth={1.75} style={{ color: card.accent }} />
      </div>

      {/* Label */}
      <h3 className="relative z-[1] text-[13px] font-semibold text-[var(--text-primary)] leading-tight tracking-[-0.01em] text-center">
        {card.label}
      </h3>
    </Link>
  );
}

export function FeatureCards() {
  return (
    <motion.div
      className="grid grid-cols-6 gap-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {cards.map((card) => (
        <motion.div key={card.label} variants={fadeUp}>
          <FeatureCard card={card} />
        </motion.div>
      ))}
    </motion.div>
  );
}
