"use client";

import {
  MessageSquareCode,
  BarChart3,
  Shield,
  FolderGit2,
  Users,
  FileText,
} from "lucide-react";

const cards = [
  { label: "Review a PR", icon: MessageSquareCode, color: "hsl(275, 35%, 55%)" },
  { label: "View Insights", icon: BarChart3, color: "hsl(220, 45%, 60%)" },
  { label: "Security Scan", icon: Shield, color: "hsl(150, 40%, 50%)" },
  { label: "Browse Repos", icon: FolderGit2, color: "hsl(35, 50%, 55%)" },
  { label: "Team Activity", icon: Users, color: "hsl(200, 40%, 55%)" },
  { label: "Release Notes", icon: FileText, color: "hsl(340, 35%, 55%)" },
];

export function FeatureCards() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {cards.map((card) => (
        <button
          key={card.label}
          className="flex flex-col items-center gap-2.5 group cursor-pointer"
        >
          <div className="aspect-square w-full bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-[10px] flex items-center justify-center transition-colors">
            <card.icon
              size={30}
              strokeWidth={1.5}
              style={{ color: card.color }}
            />
          </div>
          <span className="text-[13px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            {card.label}
          </span>
        </button>
      ))}
    </div>
  );
}
