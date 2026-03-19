"use client";

import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actions?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, actions }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mb-4">
        <Icon size={28} className="text-[var(--text-muted)]" />
      </div>
      <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">{title}</h3>
      <p className="text-[13px] text-[var(--text-secondary)] max-w-sm">{description}</p>
      {actions && <div className="flex items-center gap-3 mt-5">{actions}</div>}
    </div>
  );
}
