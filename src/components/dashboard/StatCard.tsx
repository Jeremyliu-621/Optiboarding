"use client";

import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  badge?: string;
  iconColor?: string;
  iconBg?: string;
}

export function StatCard({ icon: Icon, value, label, badge, iconColor, iconBg }: StatCardProps) {
  return (
    <div className="bg-[var(--bg-surface)] rounded-[8px] p-5 transition-colors hover:bg-[var(--bg-elevated)]">
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-[8px] flex items-center justify-center"
          style={{ backgroundColor: iconBg || "var(--accent-muted)" }}
        >
          <Icon size={20} style={{ color: iconColor || "var(--accent)" }} />
        </div>
        {badge && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[var(--accent-muted)] text-[var(--accent)]">
            {badge}
          </span>
        )}
      </div>
      <p className="text-[28px] font-bold text-[var(--text-primary)] leading-tight">{value}</p>
      <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">{label}</p>
    </div>
  );
}
