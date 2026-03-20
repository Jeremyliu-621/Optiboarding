"use client";

import { useState } from "react";
import { GitlabIcon, Shield, Wrench, GitMerge, Check } from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/Breadcrumb";
import { FormInput } from "@/components/dashboard/FormInput";
import { FeatureCard } from "@/components/dashboard/FeatureCard";

export default function GitLabIntegrationPage() {
  const [host, setHost] = useState("https://gitlab.com");
  const [token, setToken] = useState("");
  const [botId, setBotId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Integrations", href: "/dashboard/integrations" },
          { label: "GitLab" },
        ]}
        subtitle="Connect your GitLab account to enable automated code reviews on merge requests."
      />

      <div className="space-y-8">
        <div className="bg-[var(--bg-surface)] rounded-[8px] p-6 max-w-lg">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-[8px] bg-[hsl(15,25%,16%)] flex items-center justify-center">
              <GitlabIcon size={20} className="text-[hsl(15,80%,55%)]" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-[var(--text-primary)]">Connect GitLab</p>
              <p className="text-[12px] text-[var(--text-secondary)]">Link your GitLab account to enable code reviews.</p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              setTimeout(() => setSubmitted(false), 3000);
            }}
            className="space-y-4"
          >
            <FormInput
              label="GitLab Host"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="https://gitlab.com"
            />
            <FormInput
              label="GitLab Token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your GitLab access token"
            />
            <FormInput
              label="GitLab Bot / User ID"
              value={botId}
              onChange={(e) => setBotId(e.target.value)}
              placeholder="e.g. 12345678"
            />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="h-9 px-4 rounded-[6px] text-[13px] font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors cursor-pointer"
              >
                Connect GitLab
              </button>
              {submitted && (
                <span className="flex items-center gap-1 text-[12px] text-[hsl(140,40%,50%)]">
                  <Check size={12} />
                  Connection saved — verification pending
                </span>
              )}
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-[14px] font-medium text-[var(--text-primary)] mb-4">
            Why Teams Use Optibot
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FeatureCard
              icon={GitMerge}
              title="Every MR reviewed. Every time."
              description="Optibot reviews every merge request automatically, ensuring consistent code quality across your GitLab projects."
              iconColor="hsl(15, 80%, 55%)"
              iconBg="hsl(15, 25%, 16%)"
            />
            <FeatureCard
              icon={Shield}
              title="Security & compliance."
              description="Catch security vulnerabilities, enforce coding standards, and maintain compliance in every merge request."
              iconColor="hsl(15, 80%, 55%)"
              iconBg="hsl(15, 25%, 16%)"
            />
            <FeatureCard
              icon={Wrench}
              title="CI breaks? Optibot fixes it."
              description="When your CI pipeline fails, Optibot analyzes the error and suggests fixes right in the merge request."
              iconColor="hsl(15, 80%, 55%)"
              iconBg="hsl(15, 25%, 16%)"
            />
          </div>
        </div>
      </div>
    </>
  );
}
