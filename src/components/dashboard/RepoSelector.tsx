"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, GitFork } from "lucide-react";

interface Repo {
  full_name: string;
  name: string;
  owner: { login: string };
}

interface RepoSelectorProps {
  repos: Repo[];
  selected: string | null;
  onSelect: (repoFullName: string) => void;
  loading?: boolean;
}

export function RepoSelector({ repos, selected, onSelect, loading }: RepoSelectorProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset active index when opening
  useEffect(() => {
    if (open) {
      const idx = repos.findIndex((r) => r.full_name === selected);
      setActiveIndex(idx >= 0 ? idx : 0);
    }
  }, [open, repos, selected]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, repos.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && activeIndex >= 0 && repos[activeIndex]) {
        e.preventDefault();
        onSelect(repos[activeIndex].full_name);
        setOpen(false);
      }
    },
    [open, repos, activeIndex, onSelect]
  );

  return (
    <div ref={ref} className="relative" onKeyDown={handleKeyDown}>
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select repository"
        className="flex items-center gap-2 h-9 px-3 rounded-[6px] text-[13px]
          bg-[var(--bg-surface)] border border-[var(--border-subtle)]
          text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer
          min-w-[200px]"
      >
        <GitFork size={14} className="text-[var(--text-muted)] shrink-0" />
        <span className="truncate flex-1 text-left">
          {loading ? "Loading..." : selected || "Select a repository"}
        </span>
        <ChevronDown size={14} className={`text-[var(--text-muted)] shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && !loading && (
        <div
          role="listbox"
          aria-label="Repositories"
          className="absolute top-full left-0 right-0 mt-1 z-50 rounded-[8px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-lg max-h-[280px] overflow-y-auto"
        >
          {repos.length === 0 && (
            <p className="text-[13px] text-[var(--text-muted)] p-3">No repositories found</p>
          )}
          {repos.map((repo, idx) => (
            <button
              key={repo.full_name}
              role="option"
              aria-selected={selected === repo.full_name}
              onClick={() => {
                onSelect(repo.full_name);
                setOpen(false);
              }}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`w-full text-left px-3 py-2 text-[13px] transition-colors cursor-pointer flex items-center gap-2
                ${
                  idx === activeIndex
                    ? "text-[var(--text-primary)] bg-[var(--bg-elevated)]"
                    : selected === repo.full_name
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                }
              `}
            >
              <GitFork size={13} className="text-[var(--text-muted)] shrink-0" />
              <span className="truncate">{repo.full_name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
