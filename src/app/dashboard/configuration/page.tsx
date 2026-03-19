"use client";

import Link from "next/link";
import { SlidersHorizontal, FileText, ChevronRight } from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/Breadcrumb";

const configPages = [
  {
    name: "Settings",
    icon: SlidersHorizontal,
    href: "/dashboard/configuration/settings",
    description: "Control auto-review triggers, approval behavior, and code suggestion preferences per repository.",
    color: "hsl(275, 35%, 55%)",
    bg: "hsl(275, 15%, 20%)",
  },
  {
    name: "Guidelines",
    icon: FileText,
    href: "/dashboard/configuration/guidelines",
    description: "Define coding standards and review guidelines for Optibot to follow during reviews.",
    color: "hsl(200, 40%, 55%)",
    bg: "hsl(200, 20%, 17%)",
  },
];

export default function ConfigurationPage() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Configuration" }]}
        subtitle="Customize how Optibot reviews your code."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {configPages.map((page) => (
          <Link
            key={page.name}
            href={page.href}
            className="bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-[8px] p-5 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0"
                style={{ backgroundColor: page.bg }}
              >
                <page.icon size={20} style={{ color: page.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-medium text-[var(--text-primary)] mb-1">
                  {page.name}
                </h3>
                <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                  {page.description}
                </p>
              </div>
              <ChevronRight
                size={16}
                className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors shrink-0 mt-0.5"
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
