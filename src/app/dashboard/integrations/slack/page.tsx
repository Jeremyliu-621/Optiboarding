"use client";

import { Bell, MessageSquare, Terminal, Hash } from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/Breadcrumb";

const slackFeatures = [
  { icon: Bell, title: "PR review notifications", description: "Get instant Slack notifications when Optibot finishes reviewing a pull request." },
  { icon: MessageSquare, title: "Review summaries", description: "Receive concise summaries of code reviews directly in your Slack channels." },
  { icon: Terminal, title: "Slash command support", description: "Trigger reviews, check status, and manage Optibot directly from Slack." },
  { icon: Hash, title: "Customizable channels", description: "Route notifications to specific channels per repository or team." },
];

export default function SlackIntegrationPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Integrations", href: "/dashboard/integrations" },
          { label: "Slack" },
        ]}
        subtitle="Get real-time code review notifications in your Slack workspace."
      />

      <div className="space-y-8">
        {/* Connect card */}
        <div className="bg-[var(--bg-surface)] rounded-[8px] p-6 max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-[8px] bg-[hsl(330,20%,17%)] flex items-center justify-center">
              <Hash size={20} className="text-[hsl(330,50%,55%)]" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-[var(--text-primary)]">Connect Slack</p>
              <p className="text-[12px] text-[var(--text-secondary)]">
                Link your Slack workspace to receive review updates.
              </p>
            </div>
          </div>
          <button
            disabled
            title="Slack integration coming soon"
            className="h-9 px-4 rounded-[6px] text-[13px] font-medium bg-[var(--accent)] text-white opacity-50 cursor-not-allowed"
          >
            Connect workspace — coming soon
          </button>
        </div>

        {/* Feature cards */}
        <div>
          <h3 className="text-[14px] font-medium text-[var(--text-primary)] mb-4">
            What You Get With Slack
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {slackFeatures.map((f) => (
              <div key={f.title} className="bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-[8px] p-5 flex items-start gap-3 transition-colors">
                <div className="w-6 h-6 rounded-full bg-[var(--accent-muted)] flex items-center justify-center shrink-0 mt-0.5">
                  <f.icon size={14} className="text-[var(--accent)]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-[var(--text-primary)] mb-0.5">{f.title}</h4>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
