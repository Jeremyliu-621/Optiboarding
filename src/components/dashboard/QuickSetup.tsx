"use client";

import Link from "next/link";
import { GitFork, Users, Settings } from "lucide-react";

const actions = [
  {
    label: "Connect a Repository",
    description: "Add a repo to start receiving AI-powered code reviews.",
    icon: GitFork,
    href: "/dashboard/integrations/github",
    color: "hsl(275, 38%, 60%)",
    bg: "transparent",
  },
  {
    label: "Configure Optibot",
    description: "Set up review preferences and auto-review triggers.",
    icon: Settings,
    href: "/dashboard/configuration/settings",
    color: "hsl(260, 38%, 60%)",
    bg: "transparent",
  },
  {
    label: "Invite Team Members",
    description: "Share Optibot with your team for collaborative reviews.",
    icon: Users,
    href: "/dashboard/organization",
    color: "hsl(290, 38%, 60%)",
    bg: "transparent",
  },
];

export function QuickSetup() {
  return (
    <div>
      <h3 className="text-[14px] font-medium text-[var(--text-primary)] mb-4">
        Quick Setup
      </h3>
      <div className="space-y-2">
        {actions.map((action, idx) => (
          <Link
            key={action.label}
            href={action.href}
            className="block w-full dashboard-card hover:bg-[var(--bg-elevated)] p-4 text-left group"
          >
            <div className="flex items-start gap-3">
              <action.icon size={20} style={{ color: action.color }} className="shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    Step {idx + 1}
                  </span>
                </div>
                <p className="text-[13px] font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {action.label}
                </p>
                <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">
                  {action.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
