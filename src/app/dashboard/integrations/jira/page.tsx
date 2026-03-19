"use client";

import { useState } from "react";
import { Bug, Target, BookOpen, FolderSearch, Server, FileText, Check } from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/Breadcrumb";
import { FormInput } from "@/components/dashboard/FormInput";
import { FeatureCard } from "@/components/dashboard/FeatureCard";

const jiraFeatures = [
  { icon: Bug, title: "Automatic issue detection.", description: "Optibot detects related Jira issues from PR descriptions and branch names." },
  { icon: Target, title: "AI alignment checks.", description: "Verify that code changes align with the acceptance criteria in linked Jira tickets." },
  { icon: BookOpen, title: "Issue context in reviews.", description: "Optibot includes relevant Jira issue context when reviewing pull requests." },
  { icon: FolderSearch, title: "Browse accessible projects.", description: "View and manage which Jira projects Optibot can access and reference." },
  { icon: Server, title: "Cloud & self-hosted.", description: "Works with both Jira Cloud and Jira Data Center / Server deployments." },
  { icon: FileText, title: "ADF description support.", description: "Parses Atlassian Document Format descriptions for richer issue context." },
];

export default function JiraIntegrationPage() {
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Integrations", href: "/dashboard/integrations" },
          { label: "Jira" },
        ]}
        subtitle="Connect Jira to enrich code reviews with issue context and alignment checks."
      />

      <div className="space-y-8">
        {/* Feature cards */}
        <div>
          <h3 className="text-[14px] font-medium text-[var(--text-primary)] mb-4">
            What You&apos;ll Get
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jiraFeatures.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} iconColor="hsl(210, 60%, 55%)" iconBg="hsl(210, 25%, 17%)" />
            ))}
          </div>
        </div>

        {/* Connect form */}
        <div className="bg-[var(--bg-surface)] rounded-[8px] p-6 max-w-lg">
          <p className="text-[14px] font-medium text-[var(--text-primary)] mb-4">Connect Jira</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              setTimeout(() => setSubmitted(false), 3000);
            }}
            className="space-y-4"
          >
            <FormInput
              label="Jira Domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="yourcompany.atlassian.net"
            />
            <FormInput
              label="Service Account Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="optibot@yourcompany.com"
            />
            <FormInput
              label="API Token"
              type="password"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              placeholder="Enter your Jira API token"
            />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="h-9 px-4 rounded-[6px] text-[13px] font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors cursor-pointer"
              >
                Connect Jira
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
      </div>
    </>
  );
}
