"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Github,
  GitlabIcon,
  Hash,
  Bug,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/Breadcrumb";

const integrations = [
  {
    name: "GitHub",
    icon: Github,
    href: "/dashboard/integrations/github",
    description: "Connect repositories for automated PR reviews.",
    connected: true,
    color: "hsl(0, 0%, 80%)",
    bg: "hsl(0, 0%, 15%)",
  },
  {
    name: "GitLab",
    icon: GitlabIcon,
    href: "/dashboard/integrations/gitlab",
    description: "Enable merge request reviews on GitLab projects.",
    connected: false,
    color: "hsl(15, 80%, 55%)",
    bg: "hsl(15, 25%, 16%)",
  },
  {
    name: "Slack",
    icon: Hash,
    href: "/dashboard/integrations/slack",
    description: "Get real-time review notifications in Slack.",
    connected: false,
    color: "hsl(330, 50%, 55%)",
    bg: "hsl(330, 20%, 17%)",
  },
  {
    name: "Jira",
    icon: Bug,
    href: "/dashboard/integrations/jira",
    description: "Enrich reviews with Jira issue context.",
    connected: false,
    color: "hsl(210, 60%, 55%)",
    bg: "hsl(210, 25%, 17%)",
  },
];

export default function IntegrationsPage() {
  const { data: session } = useSession();

  return (
    <>
      <Breadcrumb
        items={[{ label: "Integrations" }]}
        subtitle="Connect your tools to supercharge Optibot's code reviews."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {integrations.map((integration) => {
          const isGitHubConnected = integration.name === "GitHub" && !!session?.accessToken;
          const connected = isGitHubConnected;

          return (
            <Link
              key={integration.name}
              href={integration.href}
              className="bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-[8px] p-5 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: integration.bg }}
                >
                  <integration.icon size={20} style={{ color: integration.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[14px] font-medium text-[var(--text-primary)]">
                      {integration.name}
                    </h3>
                    {connected && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-[hsl(140,40%,50%)]">
                        <CheckCircle2 size={12} />
                        Connected
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                    {integration.description}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors shrink-0 mt-0.5"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
