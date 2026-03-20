"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Bot,
  BarChart3,
  Github,
  GitlabIcon,
  Hash,
  Bug,
  BookOpen,
  SlidersHorizontal,
  FileText,
  Map,
  Building2,
  X,
  ExternalLink,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItemDef {
  label: string;
  icon: React.ElementType;
  href: string;
  external?: boolean;
}

interface NavSection {
  heading: string;
  icon: React.ElementType;
  href?: string;
  items: NavItemDef[];
}

const topNav: NavItemDef[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Optibot", icon: Bot, href: "/dashboard/optibot" },
  { label: "Repo Insights", icon: BarChart3, href: "/dashboard/insights" },
];

const sections: NavSection[] = [
  {
    heading: "Integrations",
    icon: SlidersHorizontal,
    href: "/dashboard/integrations",
    items: [
      { label: "GitHub", icon: Github, href: "/dashboard/integrations/github" },
      { label: "GitLab", icon: GitlabIcon, href: "/dashboard/integrations/gitlab" },
      { label: "Slack", icon: Hash, href: "/dashboard/integrations/slack" },
      { label: "Jira", icon: Bug, href: "/dashboard/integrations/jira" },
    ],
  },
  {
    heading: "Configuration",
    icon: SlidersHorizontal,
    href: "/dashboard/configuration",
    items: [
      { label: "Settings", icon: SlidersHorizontal, href: "/dashboard/configuration/settings" },
      { label: "Guidelines", icon: FileText, href: "/dashboard/configuration/guidelines" },
    ],
  },
];

const bottomNav: NavItemDef[] = [
  { label: "Codebase Map", icon: Map, href: "/dashboard/codebase-map" },
  { label: "Organization", icon: Building2, href: "/dashboard/organization" },
  { label: "Documentation", icon: BookOpen, href: "https://docs.getoptimal.ai", external: true },
];

function NavItem({
  label,
  icon: Icon,
  href,
  active,
  collapsed,
  external,
}: {
  label: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
  collapsed: boolean;
  external?: boolean;
}) {
  const cls = `
    flex items-center rounded-[6px] py-[7px] transition-colors text-[13px] relative
    ${collapsed ? "justify-center px-0" : "gap-2.5 px-3"}
    ${
      active
        ? "text-[var(--text-primary)] bg-[var(--bg-elevated)]"
        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
    }
  `;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" title={collapsed ? label : undefined} className={cls}>
        <Icon size={17} className="shrink-0" />
        {!collapsed && (
          <>
            <span className="whitespace-nowrap truncate flex-1">{label}</span>
            <ExternalLink size={12} className="text-[var(--text-muted)] shrink-0" />
          </>
        )}
      </a>
    );
  }

  return (
    <Link href={href} title={collapsed ? label : undefined} className={cls}>
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-[var(--accent)]" />
      )}
      <Icon size={17} className="shrink-0" />
      {!collapsed && <span className="whitespace-nowrap truncate">{label}</span>}
    </Link>
  );
}

function SectionGroup({
  section,
  collapsed,
  pathname,
}: {
  section: NavSection;
  collapsed: boolean;
  pathname: string;
}) {
  // In collapsed mode just show the child icons
  if (collapsed) {
    return (
      <div className="space-y-0.5">
        {section.items.map((item) => (
          <NavItem
            key={item.href}
            label={item.label}
            icon={item.icon}
            href={item.href}
            active={pathname.startsWith(item.href)}
            collapsed
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      {section.href ? (
        <Link
          href={section.href}
          className="block px-3 py-[6px] text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          {section.heading}
        </Link>
      ) : (
        <p className="px-3 py-[6px] text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          {section.heading}
        </p>
      )}
      <div className="space-y-0.5">
        {section.items.map((item) => (
          <NavItem
            key={item.href}
            label={item.label}
            icon={item.icon}
            href={item.href}
            active={pathname.startsWith(item.href)}
            collapsed={false}
          />
        ))}
      </div>
    </div>
  );
}

function isActive(href: string, pathname: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

export function Sidebar({ open, onClose, collapsed }: SidebarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        style={{ width: collapsed ? "56px" : "220px" }}
        className={`
          fixed top-0 left-0 h-full z-50
          bg-[var(--bg-surface)] flex flex-col
          transition-[transform,width] duration-200 ease-in-out
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div
          className={`h-14 shrink-0 flex items-center border-b border-[var(--border-subtle)] ${
            collapsed ? "justify-center px-0" : "gap-2 px-4"
          }`}
        >
          <Image src="/optimalaismalllogo.png" alt="Optimal AI" width={22} height={22} className="rounded shrink-0" />
          {!collapsed && (
            <span
              className="text-[16px] font-normal tracking-[-0.02em] text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Optimal AI
            </span>
          )}
          {!collapsed && (
            <button
              onClick={onClose}
              className="ml-auto lg:hidden text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer shrink-0"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className={`flex-1 overflow-y-auto overflow-x-hidden sidebar-scroll ${collapsed ? "px-2" : "px-3"} pt-3`}>
          {/* Top items */}
          <div className="space-y-0.5 mb-2">
            {topNav.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                active={isActive(item.href, pathname)}
                collapsed={collapsed}
              />
            ))}
          </div>

          {/* Sections */}
          {sections.map((section) => (
            <div key={section.heading} className="mt-2">
              {!collapsed && <div className="border-t border-[var(--border-subtle)] mb-2" />}
              <SectionGroup section={section} collapsed={collapsed} pathname={pathname} />
            </div>
          ))}

          {/* Bottom items */}
          <div className="mt-2">
            {!collapsed && <div className="border-t border-[var(--border-subtle)] mb-2" />}
            <div className="space-y-0.5">
              {bottomNav.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  active={!item.external && isActive(item.href, pathname)}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        </nav>

        {/* Plan indicator */}
        {!collapsed && (
          <div className="shrink-0 mx-3 mb-2 px-3 py-2 rounded-[6px] bg-[var(--bg-elevated)]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-[var(--text-muted)]">Free plan</span>
              <span className="text-[11px] text-[var(--text-muted)]">0/50</span>
            </div>
            <div className="h-1 bg-[var(--bg-deep)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: "0%" }} />
            </div>
          </div>
        )}

        {/* User profile */}
        {session?.user && !collapsed && (
          <div className="shrink-0 border-t border-[var(--border-subtle)] p-3">
            <div className="flex items-center gap-2.5">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={28}
                  height={28}
                  className="rounded-full shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[13px] text-[var(--text-primary)] truncate">{session.user.name}</p>
                <p className="text-[11px] text-[var(--text-muted)] truncate">
                  @{session.user.name?.replace(/\s+/g, "").toLowerCase() || "user"}
                </p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                title="Sign out"
                aria-label="Sign out"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer p-1 rounded-[4px] hover:bg-[var(--bg-elevated)] shrink-0"
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>
        )}
        {session?.user && collapsed && (
          <div className="shrink-0 border-t border-[var(--border-subtle)] p-2 flex flex-col items-center gap-1.5">
            {session.user.image && (
              <Image src={session.user.image} alt={session.user.name || "User"} width={28} height={28} className="rounded-full" />
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              title="Sign out"
              aria-label="Sign out"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer p-1 rounded-[4px] hover:bg-[var(--bg-elevated)]"
            >
              <LogOut size={13} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
