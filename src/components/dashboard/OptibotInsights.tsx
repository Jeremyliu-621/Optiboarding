export function OptibotInsights() {
  return (
    <div>
      <h3 className="text-[12px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-3">
        Optibot Insights
      </h3>
      
      <div className="flex gap-8">
        <div className="flex flex-col">
          <p className="text-[20px] font-medium text-[var(--text-primary)] leading-tight mb-0.5">142</p>
          <p className="text-[12px] text-[var(--text-muted)]">PRs Reviewed</p>
        </div>

        <div className="flex flex-col">
          <p className="text-[20px] font-medium text-[var(--text-primary)] leading-tight mb-0.5">3</p>
          <p className="text-[12px] text-[var(--text-muted)]">Security Issues Prevented</p>
        </div>

        <div className="flex flex-col">
          <p className="text-[20px] font-medium text-[var(--text-primary)] leading-tight mb-0.5">~48h</p>
          <p className="text-[12px] text-[var(--text-muted)]">Est. Hours Saved</p>
        </div>
      </div>
    </div>
  );
}
