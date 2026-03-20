"use client";

import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  iconBg?: string;
}

export function FeatureCard({ icon: Icon, title, description, iconColor, iconBg }: FeatureCardProps) {
  return (
    <div className="bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-[8px] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center mb-3"
        style={{ backgroundColor: iconBg || "var(--accent-muted)" }}
      >
        <Icon size={16} style={{ color: iconColor || "var(--accent)" }} />
      </div>
      <h4 className="text-[14px] font-semibold text-[var(--text-primary)] mb-1">{title}</h4>
      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{description}</p>
    </div>
  );
}
