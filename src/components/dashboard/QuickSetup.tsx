"use client";

import Link from "next/link";
import { GitFork, Users, Settings } from "lucide-react";

const actions = [
  {
    label: "Connect a Repository",
    description: "Add a repo to start receiving AI-powered code reviews.",
    icon: GitFork,
    href: "/dashboard/integrations/github",
    color: "hsl(140, 40%, 50%)",
    bg: "hsl(140, 20%, 15%)",
  },
  {
    label: "Configure Optibot",
    description: "Set up review preferences and auto-review triggers.",
    icon: Settings,
    href: "/dashboard/configuration/settings",
    color: "hsl(275, 35%, 55%)",
    bg: "hsl(275, 15%, 20%)",
  },
  {
    label: "Invite Team Members",
    description: "Share Optibot with your team for collaborative reviews.",
    icon: Users,
    href: "/dashboard/organization",
    color: "hsl(200, 40%, 55%)",
    bg: "hsl(200, 20%, 17%)",
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
            className="block w-full bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-[8px] p-4 text-left transition-colors group"
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0"
                style={{ backgroundColor: action.bg }}
              >
                <action.icon size={16} style={{ color: action.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    Step {idx + 1}
                  </span>
                </div>
                <p className="text-[13px] font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {action.label}
                </p>
                <p className="text-[12px] text-[var(--text-muted)] mt-0.5">
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
