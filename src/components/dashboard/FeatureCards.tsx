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
  color: string;
  iconBg: string;
}

const cards: CardDef[] = [
  {
    label: "Review a PR",
    icon: MessageSquareCode,
    href: "/dashboard/optibot",
    color: "hsl(275, 38%, 60%)",
    iconBg: "transparent",
  },
  {
    label: "View Insights",
    icon: BarChart3,
    href: "/dashboard/insights",
    color: "hsl(260, 38%, 60%)",
    iconBg: "transparent",
  },
  {
    label: "Security Scan",
    icon: Shield,
    href: "/dashboard/configuration/settings",
    color: "hsl(290, 38%, 60%)",
    iconBg: "transparent",
  },
  {
    label: "Browse Repos",
    icon: FolderGit2,
    href: "/dashboard/integrations/github",
    color: "hsl(245, 38%, 60%)",
    iconBg: "transparent",
  },
  {
    label: "Team Activity",
    icon: Users,
    href: "/dashboard/organization",
    color: "hsl(305, 38%, 60%)",
    iconBg: "transparent",
  },
  {
    label: "Release Notes",
    icon: FileText,
    href: "/dashboard/configuration/guidelines",
    color: "hsl(275, 38%, 60%)",
    iconBg: "transparent",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export function FeatureCards() {
  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {cards.map((card) => (
        <motion.div key={card.label} variants={item}>
          <Link
            href={card.href}
            className="group flex flex-col rounded-[12px] overflow-hidden bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          >
            {/* Icon area */}
            <div className="aspect-[4/3] flex items-center justify-center">
              <card.icon size={56} strokeWidth={1.25} style={{ color: card.color }} className="transition-transform duration-200 group-hover:scale-110" />
            </div>
            {/* Label */}
            <div className="px-3 py-2.5 border-t border-[var(--border-subtle)]">
              <span className="text-[13px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                {card.label}
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
