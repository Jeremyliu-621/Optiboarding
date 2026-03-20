"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { Users, CreditCard, Check } from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/Breadcrumb";
import { TabBar } from "@/components/dashboard/TabBar";
import { FormInput, FormTextarea } from "@/components/dashboard/FormInput";
import { EmptyState } from "@/components/dashboard/EmptyState";

const orgTabs = [
  { key: "general", label: "General" },
  { key: "members", label: "Members & Access" },
  { key: "billing", label: "Billing" },
  { key: "plans", label: "Plans" },
];

interface OrgMember {
  id: number;
  login: string;
  avatar_url: string;
  role?: string;
}

export default function OrganizationPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("general");
  const [orgName, setOrgName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState<OrgMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrgData = useCallback(async () => {
    if (!session?.accessToken) return;

    const headers = {
      Authorization: `Bearer ${session.accessToken}`,
      Accept: "application/vnd.github.v3+json",
    };

    try {
      setLoading(true);
      const orgsRes = await fetch("https://api.github.com/user/orgs", { headers });
      if (orgsRes.ok) {
        const orgs = await orgsRes.json();
        if (orgs.length > 0) {
          const org = orgs[0];
          setOrgName(org.login);
          setDisplayName(org.login);
          setDescription(org.description || "");

          // Fetch members
          const membersRes = await fetch(
            `https://api.github.com/orgs/${org.login}/members?per_page=20`,
            { headers }
          );
          if (membersRes.ok) {
            const membersData = await membersRes.json();
            setMembers(membersData);
          }
        }
      }
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchOrgData();
  }, [fetchOrgData]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Organization" },
        ]}
        subtitle="Manage your organization, members, and billing."
      />

      <TabBar tabs={orgTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "general" && (
        <GeneralTab
          orgName={orgName}
          displayName={displayName}
          description={description}
          onDisplayNameChange={setDisplayName}
          onDescriptionChange={setDescription}
          loading={loading}
        />
      )}
      {activeTab === "members" && <MembersTab members={members} loading={loading} orgName={orgName} />}
      {activeTab === "billing" && <BillingTab />}
      {activeTab === "plans" && <PlansTab />}
    </>
  );
}

/* ── General Tab ───────────────────────────────────────── */
function GeneralTab({
  orgName,
  displayName,
  description,
  onDisplayNameChange,
  onDescriptionChange,
  loading,
}: {
  orgName: string;
  displayName: string;
  description: string;
  onDisplayNameChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  loading: boolean;
}) {
  const [saved, setSaved] = useState(false);
  if (loading) {
    return (
      <div className="bg-[var(--bg-surface)] rounded-[8px] p-6 space-y-4 max-w-lg">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-24 rounded shimmer" />
            <div className="h-10 rounded-[6px] shimmer" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-surface)] rounded-[8px] p-6 max-w-lg">
      <h3 className="text-[14px] font-medium text-[var(--text-primary)] mb-5">
        Organization Details
      </h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        }}
        className="space-y-4"
      >
        <FormInput
          label="Organization Name"
          value={orgName || "No organization"}
          readOnly
          helperText="Organization name is set by your GitHub or GitLab account and cannot be changed here."
          className="opacity-60 cursor-not-allowed"
        />
        <FormInput
          label="Display Name"
          value={displayName}
          onChange={(e) => onDisplayNameChange(e.target.value)}
          placeholder="A friendly name for your org"
          helperText="A friendly name shown across the Optibot interface."
        />
        <FormTextarea
          label="Description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Describe your organization..."
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="h-9 px-4 rounded-[6px] text-[13px] font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors cursor-pointer"
          >
            Save Changes
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-[12px] text-[hsl(140,40%,50%)]">
              <Check size={12} />
              Saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

/* ── Members Tab ───────────────────────────────────────── */
function MembersTab({ members, loading, orgName }: { members: OrgMember[]; loading: boolean; orgName: string }) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-[var(--bg-surface)] rounded-[8px] p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full shimmer" />
            <div className="h-3.5 w-32 rounded shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (!orgName) {
    return (
      <div className="bg-[var(--bg-surface)] rounded-[8px] p-6">
        <EmptyState
          icon={Users}
          title="No Organization Found"
          description="Connect a GitHub organization to manage members and access controls."
        />
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="bg-[var(--bg-surface)] rounded-[8px] p-6">
        <EmptyState
          icon={Users}
          title="No Members Found"
          description="Organization members will appear here once they accept their invitations."
        />
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {members.map((member) => (
        <div
          key={member.id}
          className="bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-[8px] px-4 py-3 flex items-center gap-3 transition-colors"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={member.avatar_url}
            alt={member.login}
            width={32}
            height={32}
            className="rounded-full shrink-0"
          />
          <span className="text-[13px] text-[var(--text-primary)] font-medium flex-1">
            {member.login}
          </span>
          <span className="text-[12px] text-[var(--text-muted)]">Member</span>
        </div>
      ))}
    </div>
  );
}

/* ── Billing Tab ───────────────────────────────────────── */
function BillingTab() {
  return (
    <div className="bg-[var(--bg-surface)] rounded-[8px] p-6">
      <EmptyState
        icon={CreditCard}
        title="No Billing Information"
        description="You're on the Free plan. Contact support to set up billing for Pro or Enterprise."
        actions={
          <a
            href="mailto:support@getoptimal.ai"
            className="inline-flex h-9 px-4 rounded-[6px] text-[13px] font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors items-center"
          >
            Contact Support
          </a>
        }
      />
    </div>
  );
}

/* ── Plans Tab ─────────────────────────────────────────── */
function PlansTab() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "For individual developers and small projects.",
      features: ["5 repos", "50 reviews/month", "Basic code analysis", "Community support"],
      current: true,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For teams that need deeper analysis and faster reviews.",
      features: ["Unlimited repos", "Unlimited reviews", "Full codebase context", "Priority support", "Custom guidelines"],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For organizations with advanced security and compliance needs.",
      features: ["Everything in Pro", "SSO & SAML", "Self-hosted option", "SLA guarantee", "Dedicated account manager", "Audit logs"],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`rounded-[8px] p-5 flex flex-col relative overflow-hidden ${
            plan.highlight
              ? "bg-[var(--accent-muted)] ring-1 ring-[var(--accent)]"
              : "bg-[var(--bg-surface)]"
          }`}
        >
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-[16px] font-semibold text-[var(--text-primary)]">{plan.name}</h4>
              {plan.highlight && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--accent)] text-white">
                  Popular
                </span>
              )}
              {plan.current && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
                  Current
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-[28px] font-bold text-[var(--text-primary)]">{plan.price}</span>
              {plan.period && <span className="text-[13px] text-[var(--text-muted)]">{plan.period}</span>}
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] mt-1">{plan.description}</p>
          </div>

          <ul className="space-y-2 flex-1 mb-5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
                <Check size={14} className="text-[var(--accent)] shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {plan.name === "Enterprise" ? (
            <a
              href="mailto:sales@getoptimal.ai"
              className="flex items-center justify-center h-9 rounded-[6px] text-[13px] font-medium bg-transparent border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors w-full"
            >
              Contact Sales
            </a>
          ) : (
            <button
              className={`h-9 rounded-[6px] text-[13px] font-medium transition-colors w-full ${
                plan.current
                  ? "bg-[var(--bg-elevated)] text-[var(--text-secondary)] cursor-default"
                  : "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white cursor-pointer"
              }`}
              disabled={plan.current}
              title={!plan.current ? "Upgrade coming soon" : undefined}
            >
              {plan.current ? "Current Plan" : "Upgrade"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
