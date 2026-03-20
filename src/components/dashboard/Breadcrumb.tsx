"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  subtitle?: string;
}

export function Breadcrumb({ items, subtitle }: BreadcrumbProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-1.5 text-[14px]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={14} className="text-[var(--text-muted)]" />}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[var(--text-primary)] font-medium">{item.label}</span>
              )}
            </span>
          );
        })}
      </div>
      {subtitle && (
        <p className="text-[13px] text-[var(--text-secondary)] mt-1">{subtitle}</p>
      )}
    </div>
  );
}
