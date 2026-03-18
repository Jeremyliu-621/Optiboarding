"use client";

import { GitFork, Users } from "lucide-react";

const actions = [
  {
    label: "Connect a Repository",
    description: "Add a repo to start receiving AI-powered code reviews.",
    icon: GitFork,
  },
  {
    label: "Invite Team Members",
    description: "Share Optibot with your team for collaborative reviews.",
    icon: Users,
  },
];

export function QuickSetup() {
  return (
    <div>
      <h3 className="text-[14px] font-medium text-[var(--text-primary)] mb-4">
        Quick Setup
      </h3>
      <div className="space-y-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="w-full bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-[8px] p-4 text-left transition-colors flex items-start gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-[6px] bg-[var(--bg-elevated)] flex items-center justify-center shrink-0">
              <action.icon size={18} className="text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-[var(--text-primary)]">
                {action.label}
              </p>
              <p className="text-[12px] text-[var(--text-muted)] mt-0.5">
                {action.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
