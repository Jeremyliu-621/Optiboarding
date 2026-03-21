"use client";

import { useState } from "react";
import { Github, GitlabIcon, MessageCircle, Bug, CheckCircle2, Loader } from "lucide-react";
import { motion } from "framer-motion";

interface Step1ConnectProps {
  githubUsername?: string;
  onIntegrationsChange?: (integrations: Record<string, boolean>) => void;
}

interface IntegrationState {
  gitlab: boolean;
  slack: boolean;
  jira: boolean;
}

export function Step1Connect({ githubUsername, onIntegrationsChange }: Step1ConnectProps) {
  const [integrations, setIntegrations] = useState<IntegrationState>({
    gitlab: false,
    slack: false,
    jira: false,
  });

  const [loadingIntegration, setLoadingIntegration] = useState<string | null>(null);

  const handleConnect = async (service: keyof IntegrationState) => {
    setLoadingIntegration(service);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIntegrations((prev) => {
      const updated = { ...prev, [service]: true };
      onIntegrationsChange?.(updated);
      return updated;
    });
    setLoadingIntegration(null);
  };

  const integrationServices = [
    { id: "gitlab" as const, name: "GitLab", icon: GitlabIcon },
    { id: "slack" as const, name: "Slack", icon: MessageCircle },
    { id: "jira" as const, name: "Jira", icon: Bug },
  ];

  return (
    <div className="w-full max-w-[520px] mx-auto space-y-7">
      {/* Welcome headline */}
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#0a0a0a] mb-2">
          <span className="text-[#5b3dc8]">Welcome to Optimal AI.</span>
        </h1>
        <p className="text-[15px] text-[#4a4a4a] leading-relaxed">
          Let&#39;s connect your tools so Optibot has everything it needs to review your code.
        </p>
      </div>

      {/* GitHub Connection Card */}
      <div className="rounded-[10px] bg-[#f5f5f5] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Github size={20} className="text-[#0a0a0a]" />
          <div>
            <p className="text-[14px] font-medium text-[#0a0a0a]">GitHub</p>
            <p className="text-[13px] text-[#8a8a8a]">
              {githubUsername ? `@${githubUsername}` : "Connected"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e8f5e9]">
          <CheckCircle2 size={14} className="text-[#2e7d32]" strokeWidth={2.5} />
          <span className="text-[12px] font-medium text-[#2e7d32]">Connected</span>
        </div>
      </div>

      {/* Optional Integrations Section */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8a8a8a] mb-3">
          Connect more tools — optional
        </p>
        <div className="space-y-2">
          {integrationServices.map((service) => {
            const Icon = service.icon;
            const isConnected = integrations[service.id];
            const isLoading = loadingIntegration === service.id;

            return (
              <motion.div
                key={service.id}
                layout
                className="rounded-[10px] bg-[#fafafa] px-5 py-4 flex items-center justify-between border border-[#efefef]"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-[#0a0a0a]" />
                  <p className="text-[14px] font-medium text-[#0a0a0a]">{service.name}</p>
                </div>

                {isConnected ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e8f5e9]">
                    <CheckCircle2 size={14} className="text-[#2e7d32]" strokeWidth={2.5} />
                    <span className="text-[12px] font-medium text-[#2e7d32]">Connected</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleConnect(service.id)}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-[6px] border border-[#5b3dc8] text-[#5b3dc8] text-[12px] font-medium hover:bg-[#f5f0ff] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader size={12} className="animate-spin" />
                    ) : (
                      "Connect"
                    )}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
