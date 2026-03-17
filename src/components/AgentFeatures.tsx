"use client";

export function AgentFeatures() {
  return (
    <section className="w-full flex flex-col items-center gap-3 px-6 py-24 bg-white">

      {/* Block 1: Optibot PR Reviews */}
      <div className="w-full max-w-[1300px] bg-[#fafafa] rounded-[4px] overflow-hidden flex flex-col md:flex-row items-stretch border border-black/[0.04] min-h-[640px]">

        {/* Left Text */}
        <div className="flex-[0.45] max-w-[420px] py-[80px] px-[48px] flex flex-col justify-center">
          <h2 className="text-[22px] leading-[1.3] font-normal tracking-[-0.02em] text-[#000000]">
            Summaries, risk flags, and security scans on every PR
          </h2>
          <p className="text-[16px] leading-[1.5] text-[#00000099] mt-4">
            Optibot summarizes what changed, assesses risk, and flags security issues — automatically, on every pull request. 198 PRs reviewed in 6 weeks at Mpulse.
          </p>
          <a href="#" className="inline-block text-[16px] underline text-[#e46a3d] mt-6 hover:opacity-80 transition-opacity">
            See what Optibot catches →
          </a>
        </div>

        {/* Right Mockup: PR Summary */}
        <div className="flex-1 relative w-full min-h-[500px] flex items-end justify-end pl-8">
          <div className="w-[110%] h-[92%] bg-white rounded-tl-[12px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),0_10px_20px_-5px_rgba(0,0,0,0.05)] border border-[#e5e5e5] border-r-0 border-b-0 flex flex-col overflow-hidden">
            {/* Chrome */}
            <div className="h-10 border-b border-[#e5e5e5] flex items-center px-5 bg-[#f8f8f8] text-[11px] text-[#878787] font-medium justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]"></div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#e46a3d] flex items-center justify-center text-white text-[7px] font-bold">O</div>
                <span>Optibot</span>
              </div>
              <div className="w-12"></div>
            </div>

            {/* PR Summary Content */}
            <div className="flex-1 p-6 md:p-8 text-[12px] md:text-[13px] overflow-hidden hidden md:block">
              <div className="text-[15px] font-semibold text-black mb-1">PR Summary</div>
              <div className="text-[12px] text-[#878787] font-mono mb-6">migrate: JWT to session-based auth · #847</div>

              <div className="mb-6">
                <div className="text-[11px] font-semibold text-black/50 uppercase tracking-wider mb-2">Changes</div>
                <div className="space-y-1.5 text-[#333] text-[13px]">
                  <div className="flex items-start gap-2"><span className="text-[#c0c0c0]">·</span> Replaced JWT strategy with database sessions</div>
                  <div className="flex items-start gap-2"><span className="text-[#c0c0c0]">·</span> Updated 3 middleware files for new session API</div>
                  <div className="flex items-start gap-2"><span className="text-[#c0c0c0]">·</span> Added session cleanup cron job</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[11px] font-semibold text-black/50 uppercase tracking-wider">Risk</span>
                  <span className="text-[10px] font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Medium</span>
                </div>
                <p className="text-[#333] text-[13px]">Session storage adds a database dependency. Verify connection pooling under load.</p>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-black/50 uppercase tracking-wider mb-2">Security</div>
                <div className="space-y-1.5 text-[13px]">
                  <div className="flex items-start gap-2 text-amber-700">
                    <span className="shrink-0">⚠</span>
                    <span>Session cookie missing <code className="text-[11px] bg-[#f5f5f5] border border-[#e5e5e5] px-1 rounded">httpOnly</code> flag — line 42</span>
                  </div>
                  <div className="flex items-start gap-2 text-green-700">
                    <span className="shrink-0">✓</span>
                    <span>No SQL injection vectors detected</span>
                  </div>
                  <div className="flex items-start gap-2 text-green-700">
                    <span className="shrink-0">✓</span>
                    <span>CSRF protection intact</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Block 2: Insights Dashboard */}
      <div className="w-full max-w-[1300px] bg-[#fafafa] rounded-[4px] overflow-hidden flex flex-col-reverse md:flex-row items-stretch border border-black/[0.04] min-h-[640px]">

        {/* Left Mockup: Dashboard */}
        <div className="flex-1 relative w-full min-h-[500px] flex items-end justify-start pr-8">
          <div className="w-[110%] ml-[-30px] h-[92%] bg-white rounded-tr-[12px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),0_10px_20px_-5px_rgba(0,0,0,0.05)] border border-[#e5e5e5] border-l-0 border-b-0 flex flex-col overflow-hidden">
            {/* Chrome */}
            <div className="h-10 border-b border-[#e5e5e5] flex items-center px-5 bg-[#f8f8f8] rounded-tr-[12px] justify-center text-[11px] text-[#878787] font-medium relative">
              <div className="flex gap-2 absolute left-5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]"></div>
              </div>
              Insights
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 flex text-[12px]">
              {/* Chart Area */}
              <div className="flex-1 p-6 md:p-8 hidden md:block">
                <div className="text-[14px] font-semibold text-black mb-0.5">PR Cycle Time</div>
                <div className="text-[11px] text-[#878787] mb-5">Last 30 days · <span className="text-green-600 font-medium">↓ 34%</span></div>

                <div className="space-y-2.5">
                  {[
                    { day: "Mon", width: "85%", value: "4.2h" },
                    { day: "Tue", width: "58%", value: "2.8h" },
                    { day: "Wed", width: "43%", value: "2.1h" },
                    { day: "Thu", width: "29%", value: "1.4h" },
                    { day: "Fri", width: "24%", value: "1.2h" },
                  ].map((bar) => (
                    <div key={bar.day} className="flex items-center gap-3">
                      <span className="w-8 text-[11px] text-[#878787] font-mono">{bar.day}</span>
                      <div className="flex-1 h-7 bg-[#f5f5f5] rounded overflow-hidden">
                        <div className="h-full bg-[#e46a3d]/20 rounded" style={{ width: bar.width }} />
                      </div>
                      <span className="w-8 text-[11px] text-[#878787] text-right font-mono">{bar.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Sidebar */}
              <div className="w-40 md:w-44 border-l border-[#e5e5e5] bg-[#fafafa] p-5 space-y-6 hidden md:block">
                <div>
                  <div className="text-[22px] font-bold text-black">142</div>
                  <div className="text-[11px] text-[#878787]">PRs merged</div>
                </div>
                <div>
                  <div className="text-[22px] font-bold text-black">1.8h</div>
                  <div className="text-[11px] text-[#878787]">avg review time</div>
                </div>
                <div>
                  <div className="text-[22px] font-bold text-black">5.2</div>
                  <div className="text-[11px] text-[#878787]">deploys / day</div>
                </div>
                <div>
                  <div className="text-[22px] font-bold text-black">89%</div>
                  <div className="text-[11px] text-[#878787]">AI adoption</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Text */}
        <div className="flex-[0.45] max-w-[420px] py-[80px] px-[48px] flex flex-col justify-center">
          <h2 className="text-[22px] leading-[1.3] font-normal tracking-[-0.02em] text-[#000000]">
            The engineering dashboard you&apos;ll actually check
          </h2>
          <p className="text-[16px] leading-[1.5] text-[#00000099] mt-4">
            PR cycle time, deploy frequency, contributor analytics, AI adoption rates — the numbers engineering managers actually need, without stitching together five tools.
          </p>
          <a href="#" className="inline-block text-[16px] underline text-[#e46a3d] mt-6 hover:opacity-80 transition-opacity">
            Explore Insights →
          </a>
        </div>
      </div>
    </section>
  );
}
