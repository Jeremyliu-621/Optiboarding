"use client";

import { useState } from "react";
import { Github, GitlabIcon, MessageCircle, Bug, CheckCircle2, Loader, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Step1ConnectProps {
  githubUsername?: string;
  onIntegrationsChange?: (integrations: Record<string, boolean>) => void;
}

interface IntegrationState {
  gitlab: boolean;
  slack: boolean;
  jira: boolean;
}

interface FieldConfig {
  key: string;
  label: string;
  placeholder: string;
  type?: string;
  hint?: string;
}

const SERVICE_FIELDS: Record<string, FieldConfig[]> = {
  gitlab: [
    {
      key: "url",
      label: "Instance URL",
      placeholder: "https://gitlab.com",
      hint: "Your GitLab instance (use gitlab.com if not self-hosted)",
    },
    {
      key: "token",
      label: "Personal Access Token",
      placeholder: "glpat-xxxxxxxxxxxxxxxxxxxx",
      type: "password",
      hint: "Settings → Access Tokens → create with api scope",
    },
  ],
  slack: [
    {
      key: "token",
      label: "Bot Token",
      placeholder: "xoxb-xxxxxxxxxxxx-xxxxxxxxxxxx",
      type: "password",
      hint: "api.slack.com → Your Apps → OAuth & Permissions",
    },
  ],
  jira: [
    {
      key: "site",
      label: "Site URL",
      placeholder: "your-company.atlassian.net",
      hint: "The subdomain of your Jira Cloud instance",
    },
    {
      key: "email",
      label: "Account Email",
      placeholder: "you@company.com",
      type: "email",
    },
    {
      key: "token",
      label: "API Token",
      placeholder: "ATATT3xFfGF0...",
      type: "password",
      hint: "id.atlassian.com → Security → API tokens",
    },
  ],
};

export function Step1Connect({ githubUsername, onIntegrationsChange }: Step1ConnectProps) {
  const [integrations, setIntegrations] = useState<IntegrationState>({
    gitlab: false,
    slack: false,
    jira: false,
  });

  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, Record<string, string>>>({});
  const [loadingIntegration, setLoadingIntegration] = useState<string | null>(null);

  const handleConnectClick = (serviceId: string) => {
    setExpandedService((prev) => (prev === serviceId ? null : serviceId));
  };

  const handleFieldChange = (serviceId: string, fieldKey: string, value: string) => {
    setFieldValues((prev) => ({
      ...prev,
      [serviceId]: { ...(prev[serviceId] ?? {}), [fieldKey]: value },
    }));
  };

  const handleSubmit = async (serviceId: keyof IntegrationState) => {
    setLoadingIntegration(serviceId);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIntegrations((prev) => {
      const updated = { ...prev, [serviceId]: true };
      onIntegrationsChange?.(updated);
      return updated;
    });
    setExpandedService(null);
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
        <h1 className="text-[28px] font-bold tracking-[-0.02em] mb-2" style={{ color: "hsl(275, 8%, 88%)" }}>
          Welcome to Optimal AI.
        </h1>
        <p className="text-[15px] leading-relaxed" style={{ color: "hsl(275, 6%, 58%)" }}>
          Let&#39;s connect your tools so Optibot has everything it needs to review your code.
        </p>
      </div>

      {/* GitHub Connection Card */}
      <div
        className="rounded-[10px] px-5 py-4 flex items-center justify-between"
        style={{ background: "hsl(275, 10%, 16%)", border: "1px solid hsl(275, 10%, 22%)" }}
      >
        <div className="flex items-center gap-3">
          <Github size={20} style={{ color: "hsl(275, 8%, 75%)" }} />
          <div>
            <p className="text-[14px] font-medium" style={{ color: "hsl(275, 8%, 88%)" }}>GitHub</p>
            <p className="text-[13px]" style={{ color: "hsl(275, 6%, 58%)" }}>
              {githubUsername ? `@${githubUsername}` : "Connected"}
            </p>
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ background: "hsl(145, 35%, 14%)" }}
        >
          <CheckCircle2 size={14} strokeWidth={2.5} style={{ color: "hsl(145, 55%, 52%)" }} />
          <span className="text-[12px] font-medium" style={{ color: "hsl(145, 55%, 52%)" }}>Connected</span>
        </div>
      </div>

      {/* Optional Integrations Section */}
      <div>
        <p
          className="text-[11px] font-semibold uppercase tracking-wider mb-3"
          style={{ color: "hsl(275, 5%, 42%)" }}
        >
          Connect more tools — optional
        </p>
        <div className="space-y-2">
          {integrationServices.map((service) => {
            const Icon = service.icon;
            const isConnected = integrations[service.id];
            const isLoading = loadingIntegration === service.id;
            const isExpanded = expandedService === service.id;
            const fields = SERVICE_FIELDS[service.id] ?? [];
            const values = fieldValues[service.id] ?? {};
            const allFilled = fields.every((f) => (values[f.key] ?? "").trim().length > 0);

            return (
              <motion.div
                key={service.id}
                layout
                className="rounded-[10px] overflow-hidden"
                style={{ background: "hsl(275, 10%, 16%)", border: "1px solid hsl(275, 10%, 22%)" }}
              >
                {/* Row */}
                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon size={18} style={{ color: "hsl(275, 8%, 75%)" }} />
                    <p className="text-[14px] font-medium" style={{ color: "hsl(275, 8%, 88%)" }}>{service.name}</p>
                  </div>

                  {isConnected ? (
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                      style={{ background: "hsl(145, 35%, 14%)" }}
                    >
                      <CheckCircle2 size={14} strokeWidth={2.5} style={{ color: "hsl(145, 55%, 52%)" }} />
                      <span className="text-[12px] font-medium" style={{ color: "hsl(145, 55%, 52%)" }}>Connected</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnectClick(service.id)}
                      className="flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-[6px] text-[12px] font-medium transition-colors cursor-pointer"
                      style={{ border: "1px solid var(--accent)", color: "var(--accent-hover)", background: "transparent" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-muted)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      Connect
                      <ChevronDown
                        size={12}
                        strokeWidth={2.5}
                        style={{
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                        }}
                      />
                    </button>
                  )}
                </div>

                {/* Credential form */}
                <AnimatePresence initial={false}>
                  {isExpanded && !isConnected && (
                    <motion.div
                      key="form"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="px-5 pb-5 pt-1 space-y-3"
                        style={{ borderTop: "1px solid hsl(275, 10%, 22%)" }}
                      >
                        {fields.map((field) => (
                          <div key={field.key} className="space-y-1">
                            <label
                              className="text-[11px] font-medium uppercase tracking-wide"
                              style={{ color: "hsl(275, 5%, 50%)" }}
                            >
                              {field.label}
                            </label>
                            <input
                              type={field.type ?? "text"}
                              placeholder={field.placeholder}
                              value={values[field.key] ?? ""}
                              onChange={(e) => handleFieldChange(service.id, field.key, e.target.value)}
                              className="w-full rounded-[6px] px-3 py-2 text-[13px] outline-none transition-colors"
                              style={{
                                background: "hsl(275, 10%, 12%)",
                                border: "1px solid hsl(275, 10%, 24%)",
                                color: "hsl(275, 8%, 85%)",
                              }}
                              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                              onBlur={(e) => (e.currentTarget.style.borderColor = "hsl(275, 10%, 24%)")}
                            />
                            {field.hint && (
                              <p className="text-[11px]" style={{ color: "hsl(275, 5%, 40%)" }}>
                                {field.hint}
                              </p>
                            )}
                          </div>
                        ))}

                        <button
                          onClick={() => handleSubmit(service.id)}
                          disabled={!allFilled || isLoading}
                          className="w-full mt-1 flex items-center justify-center gap-2 py-2 rounded-[6px] text-[13px] font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          style={{
                            background: allFilled && !isLoading ? "var(--accent)" : "var(--accent-muted)",
                            color: "var(--text-primary)",
                          }}
                          onMouseEnter={(e) => {
                            if (allFilled && !isLoading)
                              e.currentTarget.style.background = "var(--accent-hover)";
                          }}
                          onMouseLeave={(e) => {
                            if (allFilled && !isLoading)
                              e.currentTarget.style.background = "var(--accent)";
                          }}
                        >
                          {isLoading ? (
                            <>
                              <Loader size={13} className="animate-spin" />
                              Connecting…
                            </>
                          ) : (
                            `Connect ${service.name}`
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
