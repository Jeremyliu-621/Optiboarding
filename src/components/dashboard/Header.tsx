"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import {
  Menu,
  FileText,
  MessageCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  LayoutDashboard,
  Bot,
  BarChart3,
  Github,
  SlidersHorizontal,
  Map,
  Building2,
  Bell,
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
}

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/optibot": "Optibot",
  "/dashboard/insights": "Repo Insights",
  "/dashboard/integrations": "Integrations",
  "/dashboard/integrations/github": "GitHub",
  "/dashboard/integrations/gitlab": "GitLab",
  "/dashboard/integrations/slack": "Slack",
  "/dashboard/integrations/jira": "Jira",
  "/dashboard/configuration": "Configuration",
  "/dashboard/configuration/settings": "Settings",
  "/dashboard/configuration/guidelines": "Guidelines",
  "/dashboard/codebase-map": "Codebase Map",
  "/dashboard/organization": "Organization",
};

const commandItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Optibot", icon: Bot, href: "/dashboard/optibot" },
  { label: "Repo Insights", icon: BarChart3, href: "/dashboard/insights" },
  { label: "Integrations", icon: SlidersHorizontal, href: "/dashboard/integrations" },
  { label: "GitHub Integration", icon: Github, href: "/dashboard/integrations/github" },
  { label: "Configuration", icon: SlidersHorizontal, href: "/dashboard/configuration" },
  { label: "Settings", icon: SlidersHorizontal, href: "/dashboard/configuration/settings" },
  { label: "Guidelines", icon: FileText, href: "/dashboard/configuration/guidelines" },
  { label: "Codebase Map", icon: Map, href: "/dashboard/codebase-map" },
  { label: "Organization", icon: Building2, href: "/dashboard/organization" },
];

function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const filtered = query.trim()
    ? commandItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : commandItems;

  const navigate = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router]
  );

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % filtered.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
      }
      if (e.key === "Enter" && filtered.length > 0) {
        e.preventDefault();
        navigate(filtered[activeIndex]?.href || filtered[0].href);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, filtered, activeIndex, navigate]);

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[480px] mx-4 bg-[var(--bg-surface)] rounded-[12px] shadow-2xl overflow-hidden border border-[var(--border-subtle)]">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 h-12 border-b border-[var(--border-subtle)]">
          <Search size={16} className="text-[var(--text-muted)] shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages..."
            className="flex-1 bg-transparent text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
          />
          <kbd className="text-[11px] text-[var(--text-muted)] px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] font-mono">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[320px] overflow-y-auto p-1.5" role="listbox">
          {filtered.length === 0 && (
            <p className="text-[13px] text-[var(--text-muted)] text-center py-6">
              No results found
            </p>
          )}
          {filtered.map((item, idx) => (
            <button
              key={item.href}
              role="option"
              aria-selected={idx === activeIndex}
              onClick={() => navigate(item.href)}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-left transition-colors cursor-pointer ${
                idx === activeIndex ? "bg-[var(--bg-elevated)]" : ""
              }`}
            >
              <item.icon size={16} className={`shrink-0 ${idx === activeIndex ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`} />
              <span className="text-[13px] text-[var(--text-primary)] flex-1">{item.label}</span>
              {idx === activeIndex && (
                <kbd className="text-[10px] text-[var(--text-muted)] px-1 py-px rounded bg-[var(--bg-surface)] font-mono">↵</kbd>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header({ onMenuClick, sidebarCollapsed, onToggleSidebarCollapse }: HeaderProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Dashboard";
  const [showCommand, setShowCommand] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCommand((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {showCommand && <CommandPalette onClose={() => setShowCommand(false)} />}

      <header className="h-14 flex items-center justify-between px-6 border-b border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            className="lg:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <Menu size={20} />
          </button>
          <button
            onClick={onToggleSidebarCollapse}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden lg:block text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer p-1 rounded-[4px] hover:bg-[var(--bg-elevated)]"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
          <span className="text-[14px] font-medium text-[var(--text-primary)]">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Search trigger */}
          <button
            onClick={() => setShowCommand(true)}
            className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-[6px] bg-[var(--bg-deep)] border border-[var(--card-border)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] text-[13px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"
          >
            <Search size={13} />
            <span>Search...</span>
            <kbd className="text-[10px] ml-2 px-1 py-px rounded bg-[var(--bg-elevated)] font-mono">
              ⌘K
            </kbd>
          </button>

          <a
            href="https://docs.getoptimal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
          >
            <FileText size={15} />
            <span className="hidden sm:inline">Docs</span>
          </a>
          <a
            href="mailto:feedback@getoptimal.ai"
            className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
          >
            <MessageCircle size={15} />
            <span className="hidden sm:inline">Feedback</span>
          </a>

          {/* Notification bell */}
          <button
            aria-label="Notifications — coming soon"
            title="Notifications coming soon"
            className="relative text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer p-1"
          >
            <Bell size={16} />
          </button>

          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={28}
              height={28}
              className="rounded-full"
            />
          )}
        </div>
      </header>
    </>
  );
}
