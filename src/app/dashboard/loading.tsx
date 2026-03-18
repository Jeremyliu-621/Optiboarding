export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-deep)] flex">
      {/* Sidebar skeleton */}
      <div className="hidden lg:block w-[220px] bg-[var(--bg-surface)] shrink-0">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] animate-pulse" />
            <div className="h-3 w-24 rounded bg-[var(--bg-elevated)] animate-pulse" />
          </div>
          <div className="space-y-2 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 rounded-[6px] bg-[var(--bg-elevated)] animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Main area skeleton */}
      <div className="flex-1">
        <div className="h-14 border-b border-[var(--border-subtle)]" />
        <div className="p-6 max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[var(--bg-surface)] rounded-[8px] p-5">
                <div className="h-28 rounded-[6px] bg-[var(--bg-elevated)] animate-pulse mb-4" />
                <div className="h-3.5 w-24 rounded bg-[var(--bg-elevated)] animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
