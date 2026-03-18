"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  GitFork,
  BookOpen,
  X,
  Bot,
  PieChart,
  BarChart3,
  SlidersHorizontal,
  Map,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const primaryNav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "Insights", icon: BarChart3, href: "/dashboard" },
];

const sections = [
  {
    heading: "AI Agents",
    items: [
      { label: "Optibot", icon: Bot, href: "/dashboard" },
    ],
  },
  {
    heading: "Analytics",
    items: [
      { label: "Repo Insights", icon: PieChart, href: "/dashboard" },
    ],
  },
  {
    heading: "Integrations",
    items: [
      { label: "Integrations", icon: GitFork, href: "/dashboard" },
    ],
  },
  {
    heading: "Documentation",
    items: [
      { label: "Documentation", icon: BookOpen, href: "/dashboard" },
    ],
  },
  {
    heading: "Configuration",
    items: [
      { label: "Configuration", icon: SlidersHorizontal, href: "/dashboard" },
      { label: "Codebase Map", icon: Map, href: "/dashboard" },
    ],
  },
];

function NavItem({
  label,
  icon: Icon,
  href,
  active,
  collapsed,
}: {
  label: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`
        flex items-center rounded-[6px] py-[7px] transition-colors text-[13px]
        ${collapsed ? "justify-center px-0" : "gap-2.5 px-3"}
        ${
          active
            ? "text-[var(--text-primary)] bg-[var(--bg-elevated)]"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
        }
      `}
    >
      <Icon size={17} className="shrink-0" />
      {!collapsed && <span className="whitespace-nowrap truncate">{label}</span>}
    </Link>
  );
}

export function Sidebar({ open, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const { data: session } = useSession();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
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
          <Image
            src="/optimalaismalllogo.png"
            alt="Optimal AI"
            width={22}
            height={22}
            className="rounded shrink-0"
          />
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


        {/* Scrollable nav area */}
        <nav
          className={`flex-1 overflow-y-auto overflow-x-hidden sidebar-scroll ${collapsed ? "px-2" : "px-3"}`}
        >
          {/* Primary nav */}
          <div className="space-y-0.5 mb-1">
            {primaryNav.map((item) => (
              <NavItem key={item.label} {...item} collapsed={collapsed} />
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--border-subtle)] my-3" />

          {/* Dynamic sections */}
          {sections.map((section) => (
            <div key={section.heading}>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavItem key={item.label} {...item} collapsed={collapsed} />
                ))}
              </div>
            </div>
          ))}
        </nav>

      </aside>
    </>
  );
}
