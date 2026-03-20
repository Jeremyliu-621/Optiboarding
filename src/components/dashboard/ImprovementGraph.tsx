export function ImprovementGraph() {
  return (
    <div className="flex flex-col h-full min-h-[250px]">
      <h3 className="text-[12px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-3">
        Merge Time Trend
      </h3>
      
      {/* Container for SVG graph */}
      <div className="relative flex-1 w-full flex items-end">
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[11px] text-[var(--text-muted)] py-1.5">
            <span>3d</span>
            <span>2d</span>
            <span>1d</span>
            <span>0</span>
        </div>

        {/* Graph Area */}
        <div className="ml-6 flex-1 h-full relative border-b border-[var(--border-subtle)]">
          {/* Horizontal Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between py-1.5">
            <div className="w-full h-px bg-[var(--border-subtle)] opacity-40" />
            <div className="w-full h-px bg-[var(--border-subtle)] opacity-40" />
            <div className="w-full h-px bg-[var(--border-subtle)] opacity-40" />
            <div className="w-full h-px bg-transparent" />
          </div>

          {/* Line Chart SVG */}
          <svg className="absolute inset-x-0 bottom-0 top-1.5 w-full h-[calc(100%-6px)]" preserveAspectRatio="none" viewBox="0 0 100 100">
            {/* Area under the line */}
            <path 
              d="M 0,15 L 20,25 L 40,40 L 60,85 L 80,90 L 100,92 L 100,100 L 0,100 Z" 
              fill="url(#gradient)" 
              opacity="0.15"
              preserveAspectRatio="none"
            />
            {/* The line starts high, drops, and levels off low */}
            <path 
              d="M 0,15 L 20,25 L 40,40 L 60,85 L 80,90 L 100,92" 
              fill="none" 
              stroke="var(--accent)" 
              strokeWidth="2" 
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Activation Marker */}
          <div className="absolute left-[40%] top-0 bottom-0 w-px border-l border-dashed border-[var(--accent)] opacity-60">
             <div className="absolute -top-[18px] -translate-x-1/2 text-[var(--accent)] text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap">
                Optibot Enabled
             </div>
          </div>
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="ml-6 flex justify-between text-[11px] text-[var(--text-muted)] mt-2">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  );
}
