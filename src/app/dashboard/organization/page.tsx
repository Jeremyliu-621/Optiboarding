"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import {
  Users,
  MoreHorizontal,
  X,
  Loader2,
  CheckCircle2,
  Download,
  Check,
  Minus,
} from "lucide-react";
import { TabBar } from "@/components/dashboard/TabBar";

/* ─── Types ─── */
type OrgTab = "members" | "billing" | "plans";
type Role = "Admin" | "Developer" | "Viewer";
type MemberStatus = "active" | "pending";

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  status: MemberStatus;
  joined: string;
  isSelf?: boolean;
}

interface Invoice {
  date: string;
  amount: string;
  status: "Paid" | "Pending";
}

/* ─── Mock data ─── */
const mockInvoices: Invoice[] = [
  { date: "Mar 1, 2026", amount: "$29.00", status: "Paid" },
  { date: "Feb 1, 2026", amount: "$29.00", status: "Paid" },
  { date: "Jan 1, 2026", amount: "$29.00", status: "Paid" },
  { date: "Dec 1, 2025", amount: "$0.00", status: "Paid" },
];

const planFeatures = [
  "PR Reviews / month",
  "Repositories",
  "Team Members",
  "Security Scanning",
  "Custom Guidelines",
  "Priority Support",
  "SSO",
  "Audit Logs",
  "SLA",
] as const;

type PlanTier = "free" | "pro" | "team";

const planValues: Record<PlanTier, Record<string, string>> = {
  free: {
    "PR Reviews / month": "50",
    Repositories: "5",
    "Team Members": "3",
    "Security Scanning": "Basic",
    "Custom Guidelines": "—",
    "Priority Support": "—",
    SSO: "—",
    "Audit Logs": "—",
    SLA: "—",
  },
  pro: {
    "PR Reviews / month": "500",
    Repositories: "20",
    "Team Members": "10",
    "Security Scanning": "Advanced",
    "Custom Guidelines": "check",
    "Priority Support": "check",
    SSO: "—",
    "Audit Logs": "—",
    SLA: "—",
  },
  team: {
    "PR Reviews / month": "Unlimited",
    Repositories: "Unlimited",
    "Team Members": "Unlimited",
    "Security Scanning": "Enterprise",
    "Custom Guidelines": "check",
    "Priority Support": "check",
    SSO: "check",
    "Audit Logs": "check",
    SLA: "99.9%",
  },
};

const monthlyPrices = { free: 0, pro: 29, team: 79 };

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function initialsColor(name: string): string {
  let hash = 0;
  for (const ch of name) hash = ch.charCodeAt(0) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 25%, 35%)`;
}

const orgTabs = [
  { key: "members", label: "Members" },
  { key: "billing", label: "Billing" },
  { key: "plans", label: "Plans" },
];

/* ─── Main Page ─── */
export default function OrganizationPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<string>("members");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!session?.user) return;
    setLoading(true);

    // Start with the real user + fake team
    const fakeMock: Member[] = [
      {
        id: "self",
        name: session.user.name || "You",
        email: session.user.email || "you@example.com",
        avatar: session.user.image || "",
        role: "Admin",
        status: "active",
        joined: "Jan 15, 2026",
        isSelf: true,
      },
      {
        id: "m1",
        name: "Sarah Chen",
        email: "sarah.chen@example.com",
        avatar: "",
        role: "Developer",
        status: "active",
        joined: "Feb 3, 2026",
      },
      {
        id: "m2",
        name: "Marcus Johnson",
        email: "marcus.j@example.com",
        avatar: "",
        role: "Developer",
        status: "active",
        joined: "Feb 10, 2026",
      },
      {
        id: "m3",
        name: "Yuki Tanaka",
        email: "yuki@example.com",
        avatar: "",
        role: "Viewer",
        status: "pending",
        joined: "Mar 18, 2026",
      },
    ];
    setMembers(fakeMock);
    setLoading(false);
  }, [session?.user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <TabBar tabs={orgTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "members" && (
        <MembersTab members={members} setMembers={setMembers} loading={loading} />
      )}
      {activeTab === "billing" && <BillingTab />}
      {activeTab === "plans" && <PlansTab />}
    </>
  );
}

/* ═══════════════════════════════════════════
   Members Tab
   ═══════════════════════════════════════════ */
function MembersTab({
  members,
  setMembers,
  loading,
}: {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  loading: boolean;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Developer");
  const [inviteNote, setInviteNote] = useState("");
  const [inviting, setInviting] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!inviteEmail.trim() || !inviteEmail.includes("@")) {
      setError("Enter a valid email address");
      return;
    }
    setInviting(true);
    setTimeout(() => {
      const newMember: Member = {
        id: `m${Date.now()}`,
        name: inviteEmail.split("@")[0],
        email: inviteEmail,
        avatar: "",
        role: inviteRole,
        status: "pending",
        joined: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setMembers((prev) => [...prev, newMember]);
      setInviting(false);
      setDrawerOpen(false);
      setInviteEmail("");
      setInviteNote("");
    }, 1200);
  };

  const changeRole = (id: string, role: Role) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role } : m))
    );
    setMenuOpen(null);
  };

  const removeMember = (id: string) => {
    const member = members.find((m) => m.id === id);
    if (member?.isSelf) return; // Can't remove yourself
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setMenuOpen(null);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] text-[var(--text-muted)]">
          {members.length} member{members.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={() => setDrawerOpen(true)}
          className="px-4 py-1.5 rounded-[6px] text-[13px] font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors cursor-pointer"
        >
          Invite Member
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-14 rounded-[6px] shimmer" />
          ))}
        </div>
      ) : (
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[var(--text-muted)] text-[11px] uppercase tracking-wider">
              <th className="text-left pb-2 font-medium">Name</th>
              <th className="text-left pb-2 font-medium">Email</th>
              <th className="text-left pb-2 font-medium">Role</th>
              <th className="text-left pb-2 font-medium">Status</th>
              <th className="text-left pb-2 font-medium">Joined</th>
              <th className="text-right pb-2 font-medium w-10" />
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr
                key={m.id}
                className={`border-t border-[var(--border-subtle)] hover:bg-[var(--bg-surface)] transition-colors ${
                  m.status === "pending" ? "opacity-60" : ""
                }`}
              >
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2.5">
                    {m.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.avatar}
                        alt={m.name}
                        width={28}
                        height={28}
                        className="rounded-full shrink-0"
                      />
                    ) : (
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium text-white shrink-0"
                        style={{ backgroundColor: initialsColor(m.name) }}
                      >
                        {getInitials(m.name)}
                      </span>
                    )}
                    <span className="text-[var(--text-primary)] font-medium">
                      {m.name}
                      {m.isSelf && (
                        <span className="text-[var(--text-muted)] font-normal ml-1">(you)</span>
                      )}
                    </span>
                  </div>
                </td>
                <td className="py-3 pr-3 text-[var(--text-secondary)]">{m.email}</td>
                <td className="py-3 pr-3">
                  {m.isSelf ? (
                    <span className="text-[var(--text-secondary)]">{m.role}</span>
                  ) : (
                    <select
                      value={m.role}
                      onChange={(e) => changeRole(m.id, e.target.value as Role)}
                      className="bg-transparent text-[var(--text-secondary)] text-[13px] focus:outline-none cursor-pointer hover:text-[var(--text-primary)] transition-colors"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Developer">Developer</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  )}
                </td>
                <td className="py-3 pr-3">
                  <span
                    className="text-[11px] font-medium"
                    style={{
                      color:
                        m.status === "active"
                          ? "hsl(140, 30%, 42%)"
                          : "var(--text-muted)",
                    }}
                  >
                    {m.status === "active" ? "Active" : "Pending"}
                  </span>
                </td>
                <td className="py-3 pr-3 text-[var(--text-muted)] whitespace-nowrap">
                  {m.joined}
                </td>
                <td className="py-3 text-right relative">
                  {!m.isSelf && (
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setMenuOpen(menuOpen === m.id ? null : m.id)
                        }
                        className="w-7 h-7 rounded-[4px] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                      {menuOpen === m.id && (
                        <div className="absolute right-0 top-8 z-50 w-[180px] bg-[var(--bg-surface)] rounded-[6px] shadow-lg py-1">
                          {(["Admin", "Developer", "Viewer"] as Role[]).map((r) => (
                            <button
                              key={r}
                              onClick={() => changeRole(m.id, r)}
                              className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer ${
                                m.role === r
                                  ? "text-[var(--accent)]"
                                  : "text-[var(--text-secondary)]"
                              }`}
                            >
                              Change to {r}
                            </button>
                          ))}
                          <div className="border-t border-[var(--border-subtle)] my-1" />
                          <button
                            onClick={() => removeMember(m.id)}
                            className="w-full text-left px-3 py-1.5 text-[13px] text-[hsl(0,40%,55%)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
                          >
                            Remove from workspace
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Invite Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[90]" onClick={() => setDrawerOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-[400px] bg-[var(--bg-surface)] shadow-2xl p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-medium text-[var(--text-primary)]">
                Invite Member
              </h3>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleInvite} className="flex flex-col gap-4 flex-1">
              <div>
                <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => { setInviteEmail(e.target.value); setError(""); }}
                  placeholder="colleague@company.com"
                  className="w-full bg-[var(--bg-deep)] text-[var(--text-primary)] text-[13px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] placeholder:text-[var(--text-muted)]"
                  autoFocus
                />
                {error && <p className="text-[12px] text-[hsl(0,45%,55%)] mt-1">{error}</p>}
              </div>

              <div>
                <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as Role)}
                  className="w-full bg-[var(--bg-deep)] text-[var(--text-primary)] text-[13px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
                >
                  <option value="Admin">Admin</option>
                  <option value="Developer">Developer</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div>
                <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">
                  Personal note <span className="text-[var(--text-muted)] font-normal">(optional)</span>
                </label>
                <textarea
                  value={inviteNote}
                  onChange={(e) => setInviteNote(e.target.value)}
                  placeholder="Add a personal note..."
                  rows={3}
                  className="w-full bg-[var(--bg-deep)] text-[var(--text-primary)] text-[13px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] resize-none placeholder:text-[var(--text-muted)]"
                />
              </div>

              <div className="mt-auto pt-4">
                <button
                  type="submit"
                  disabled={inviting}
                  className="w-full px-4 py-2.5 rounded-[6px] text-[13px] font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors disabled:opacity-60 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {inviting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    "Send Invite"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════
   Billing Tab
   ═══════════════════════════════════════════ */
function BillingTab() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleManageBilling = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const usageBars: { label: string; used: number; limit: number }[] = [
    { label: "PR Reviews Used", used: 142, limit: 200 },
    { label: "Repositories Connected", used: 3, limit: 5 },
    { label: "Team Members", used: 4, limit: 10 },
  ];

  return (
    <div className="space-y-8">
      {/* Current Subscription */}
      <div>
        <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-3">
          Current Subscription
        </h3>
        <div className="bg-[var(--bg-surface)] rounded-[8px] p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[16px] font-medium text-[var(--text-primary)]">Pro Plan</p>
              <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">
                Monthly · Next billing: Apr 1, 2026
              </p>
              <p className="text-[22px] font-medium text-[var(--text-primary)] mt-2">
                $29<span className="text-[13px] text-[var(--text-muted)] font-normal">/month</span>
              </p>
            </div>
            <button
              onClick={handleManageBilling}
              className="px-4 py-1.5 rounded-[6px] text-[13px] font-medium bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Manage Billing
            </button>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div>
        <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-3">
          Usage This Period
        </h3>
        <div className="space-y-4">
          {usageBars.map((bar) => {
            const pct = (bar.used / bar.limit) * 100;
            const isWarning = pct > 80;
            return (
              <div key={bar.label}>
                <div className="flex items-center justify-between mb-1.5 text-[13px]">
                  <span className="text-[var(--text-secondary)]">{bar.label}</span>
                  <span
                    className="font-medium tabular-nums"
                    style={{
                      color: isWarning
                        ? "hsl(38, 35%, 55%)"
                        : "var(--text-primary)",
                    }}
                  >
                    {bar.used} / {bar.limit}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--bg-elevated)]">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(pct, 100)}%`,
                      backgroundColor: isWarning
                        ? "hsl(38, 35%, 50%)"
                        : "var(--accent)",
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoice History */}
      <div>
        <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-3">
          Invoice History
        </h3>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[var(--text-muted)] text-[11px] uppercase tracking-wider">
              <th className="text-left pb-2 font-medium">Date</th>
              <th className="text-left pb-2 font-medium">Amount</th>
              <th className="text-left pb-2 font-medium">Status</th>
              <th className="text-right pb-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map((inv, i) => (
              <tr
                key={i}
                className="border-t border-[var(--border-subtle)] hover:bg-[var(--bg-surface)] transition-colors"
              >
                <td className="py-2.5 text-[var(--text-secondary)]">{inv.date}</td>
                <td className="py-2.5 text-[var(--text-primary)] font-medium tabular-nums">
                  {inv.amount}
                </td>
                <td className="py-2.5">
                  <span
                    className="text-[11px] font-medium"
                    style={{
                      color:
                        inv.status === "Paid"
                          ? "hsl(140, 30%, 42%)"
                          : "hsl(38, 35%, 50%)",
                    }}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="py-2.5 text-right">
                  <button className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer">
                    <Download size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-[100] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-[13px] px-4 py-3 rounded-[8px] shadow-lg flex items-center gap-2">
          <Loader2 size={14} className="animate-spin text-[var(--accent)]" />
          Redirecting to billing portal...
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Plans Tab
   ═══════════════════════════════════════════ */
function PlansTab() {
  const [annual, setAnnual] = useState(false);
  const currentPlan: PlanTier = "pro";
  const tiers: PlanTier[] = ["free", "pro", "team"];
  const tierLabels = { free: "Free", pro: "Pro", team: "Team" };

  const getPrice = (tier: PlanTier): string => {
    const base = monthlyPrices[tier];
    if (base === 0) return "$0";
    const price = annual ? Math.round(base * 0.8) : base;
    return `$${price}`;
  };

  return (
    <div>
      {/* Annual toggle */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[13px] text-[var(--text-secondary)]">Bill Monthly</span>
        <button
          onClick={() => setAnnual(!annual)}
          className={`relative w-[40px] h-[22px] rounded-full transition-colors cursor-pointer ${
            annual ? "bg-[var(--accent)]" : "bg-[var(--bg-elevated)]"
          }`}
        >
          <span
            className={`absolute top-[2px] left-[2px] w-[18px] h-[18px] rounded-full bg-white transition-transform ${
              annual ? "translate-x-[18px]" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-[13px] text-[var(--text-secondary)]">
          Bill Annually{" "}
          <span className="text-[hsl(140,30%,42%)] font-medium">(save 20%)</span>
        </span>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr>
              <th className="text-left pb-3 text-[var(--text-muted)] text-[11px] uppercase tracking-wider font-medium w-[200px]">
                Feature
              </th>
              {tiers.map((tier) => (
                <th
                  key={tier}
                  className={`text-center pb-3 font-medium ${
                    tier === currentPlan
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  <div>
                    <p className="text-[14px]">{tierLabels[tier]}</p>
                    <p className="text-[18px] font-medium mt-0.5">
                      {getPrice(tier)}
                      {monthlyPrices[tier] > 0 && (
                        <span className="text-[11px] text-[var(--text-muted)] font-normal">
                          /mo
                        </span>
                      )}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planFeatures.map((feature) => (
              <tr
                key={feature}
                className="border-t border-[var(--border-subtle)]"
              >
                <td className="py-2.5 text-[var(--text-secondary)]">
                  {feature}
                </td>
                {tiers.map((tier) => {
                  const val = planValues[tier][feature];
                  return (
                    <td
                      key={tier}
                      className={`py-2.5 text-center ${
                        tier === currentPlan
                          ? "bg-[var(--bg-surface)]"
                          : ""
                      }`}
                    >
                      {val === "check" ? (
                        <Check
                          size={14}
                          className="text-[hsl(140,30%,42%)] mx-auto"
                        />
                      ) : val === "—" ? (
                        <Minus
                          size={14}
                          className="text-[var(--text-muted)] mx-auto opacity-40"
                        />
                      ) : (
                        <span className="text-[var(--text-primary)]">{val}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CTA buttons */}
      <div className="flex items-center gap-3 mt-6">
        {tiers.map((tier) => (
          <button
            key={tier}
            disabled={tier === currentPlan}
            className={`px-5 py-2 rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer ${
              tier === currentPlan
                ? "bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-default"
                : "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
            }`}
          >
            {tier === currentPlan
              ? "Current Plan"
              : `Upgrade to ${tierLabels[tier]}`}
          </button>
        ))}
      </div>
    </div>
  );
}
