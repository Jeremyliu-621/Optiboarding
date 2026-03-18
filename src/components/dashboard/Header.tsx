"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Menu, FileText, MessageCircle, PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
}

export function Header({ onMenuClick, sidebarCollapsed, onToggleSidebarCollapse }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-[var(--border-subtle)]">
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
        >
          <Menu size={20} />
        </button>
        <button
          onClick={onToggleSidebarCollapse}
          className="hidden lg:block text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer p-1 rounded-[4px] hover:bg-[var(--bg-elevated)]"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
        <span className="text-[14px] font-medium text-[var(--text-primary)]">
          Dashboard
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 cursor-pointer">
          <FileText size={15} />
          Docs
        </button>
        <button className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 cursor-pointer">
          <MessageCircle size={15} />
          Feedback
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
  );
}
