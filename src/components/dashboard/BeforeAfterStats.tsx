import { ArrowRight } from "lucide-react";

export function BeforeAfterStats() {
  return (
    <div className="border border-[var(--card-border)] bg-[var(--bg-surface)] rounded-[8px] p-5">
      <h3 className="text-[13px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-5">
        Impact Summary
      </h3>

      <div className="space-y-3">
        {/* Metric 1: Merge Time */}
        <div className="flex items-center justify-between bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-[6px] p-3">
          <div className="flex-1">
             <p className="text-[12px] text-[var(--text-muted)] font-medium mb-1">Avg. PR Merge Time</p>
             <div className="flex items-center gap-3">
               <span className="text-[18px] text-[var(--text-secondary)] line-through decoration-[var(--border-subtle)]">2.4 days</span>
               <ArrowRight size={14} className="text-[var(--text-muted)]" />
               <span className="text-[18px] font-medium text-[var(--text-primary)]">4.5 hrs</span>
             </div>
          </div>
        </div>

        {/* Metric 2: Bug Escapes */}
        <div className="flex items-center justify-between bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-[6px] p-3">
          <div className="flex-1">
             <p className="text-[12px] text-[var(--text-muted)] font-medium mb-1">Monthly Bug Escapes</p>
             <div className="flex items-center gap-3">
               <span className="text-[18px] text-[var(--text-secondary)] line-through decoration-[var(--border-subtle)]">14</span>
               <ArrowRight size={14} className="text-[var(--text-muted)]" />
               <span className="text-[18px] font-medium text-[var(--text-primary)]">2</span>
             </div>
          </div>
        </div>

        {/* Metric 3: Code Smells */}
        <div className="flex items-center justify-between bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-[6px] p-3">
          <div className="flex-1">
             <p className="text-[12px] text-[var(--text-muted)] font-medium mb-1">Code Quality Score</p>
             <div className="flex items-center gap-3">
               <span className="text-[18px] text-[var(--text-secondary)] line-through decoration-[var(--border-subtle)]">B-</span>
               <ArrowRight size={14} className="text-[var(--text-muted)]" />
               <span className="text-[18px] font-medium text-[var(--accent)]">A+</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
