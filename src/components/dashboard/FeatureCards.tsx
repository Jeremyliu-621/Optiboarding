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
  ChevronRight,
} from "lucide-react";

interface CardDef {
  label: string;
  descriptor: string;
  icon: React.ElementType;
  href: string;
  iconColor: string;
  isPrimary?: boolean;
}

const cards: CardDef[] = [
  {
    label: "Review a PR",
    descriptor: "Run Optibot on open pull requests",
    icon: MessageSquareCode,
    href: "/dashboard/optibot",
    iconColor: "hsl(275, 28%, 55%)",
    isPrimary: true,
  },
  {
    label: "View Insights",
    descriptor: "Repo metrics and code quality trends",
    icon: BarChart3,
    href: "/dashboard/insights",
    iconColor: "hsl(230, 22%, 52%)",
    isPrimary: true,
  },
  {
    label: "Security Scan",
    descriptor: "Detect vulnerabilities across repos",
    icon: Shield,
    href: "/dashboard/configuration/settings",
    iconColor: "hsl(38, 22%, 50%)",
  },
  {
    label: "Browse Repos",
    descriptor: "Manage connected repositories",
    icon: FolderGit2,
    href: "/dashboard/integrations/github",
    iconColor: "hsl(185, 22%, 48%)",
  },
  {
    label: "Team Activity",
    descriptor: "Track recent contributions",
    icon: Users,
    href: "/dashboard/organization",
    iconColor: "hsl(15, 22%, 50%)",
  },
  {
    label: "Release Notes",
    descriptor: "Deployment history and changes",
    icon: FileText,
    href: "/dashboard/configuration/guidelines",
    iconColor: "hsl(300, 18%, 48%)",
  },
];

const primaryCards = cards.filter((c) => c.isPrimary);
const secondaryCards = cards.filter((c) => !c.isPrimary);

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

function FeatureCard({ card }: { card: CardDef }) {
  return (
    <Link
      href={card.href}
      className="group relative flex items-start gap-4 px-4 py-4 rounded-[10px] bg-[var(--bg-surface)] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-deep)] hover:bg-[var(--bg-elevated)] hover:shadow-[0_1px_4px_rgba(0,0,0,0.25)]"
    >
      {/* Left accent stripe — visible on hover only */}
      <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Icon */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-[6px] flex items-center justify-center transition-colors duration-200"
        style={{ backgroundColor: `color-mix(in srgb, ${card.iconColor} 15%, transparent)` }}
      >
        <card.icon
          size={16}
          strokeWidth={1.5}
          style={{ color: card.iconColor }}
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-[var(--text-primary)] leading-tight">
          {card.label}
        </p>
        <p className="text-[12px] text-[var(--text-muted)] leading-snug mt-0.5">
          {card.descriptor}
        </p>
      </div>

      {/* Chevron — hover only */}
      <ChevronRight
        size={14}
        className="flex-shrink-0 mt-1 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />
    </Link>
  );
}

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-3">
      {/* Primary column — 2 taller cards */}
      <motion.div
        className="flex flex-col gap-3"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {primaryCards.map((card) => (
          <motion.div key={card.label} variants={fadeUp}>
            <FeatureCard card={card} />
          </motion.div>
        ))}
      </motion.div>

      {/* Secondary column — 4 compact cards in 2x2 */}
      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {secondaryCards.map((card) => (
          <motion.div key={card.label} variants={fadeUp}>
            <FeatureCard card={card} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
