"use client";

export function AgentFeatures() {
  return (
    <section className="w-full flex flex-col items-center gap-12 px-6 py-24 bg-white">
      
      {/* Container 1: Agents turn ideas into code */}
      <div className="w-full max-w-[1200px] bg-[#f5f5f5] rounded-[32px] overflow-hidden flex flex-col md:flex-row items-stretch border border-[#ebebeb]">
        
        {/* Left Text */}
        <div className="flex-1 py-[80px] px-[48px] flex flex-col justify-center">
          <h2 className="text-[36px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#000000]">
            Agents turn ideas into code
          </h2>
          <p className="text-[18px] leading-[1.5] text-[#666666] mt-5">
            Accelerate development by handing off tasks to Cursor, while you focus on making decisions.
          </p>
          <a href="#" className="inline-block text-[16px] font-medium text-[#e46a3d] mt-8 hover:opacity-80 transition-opacity">
            Learn about agentic development →
          </a>
        </div>

        {/* Right Image/Mockup */}
        <div className="flex-[1.1] relative w-full min-h-[500px] flex items-end justify-end pl-8">
           <div className="w-[110%] h-[92%] bg-[#fafafa] rounded-tl-[16px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),0_10px_20px_-5px_rgba(0,0,0,0.05)] border border-[#e5e5e5] border-r-0 border-b-0 flex flex-col overflow-hidden">
              <div className="h-12 border-b border-[#e5e5e5] flex items-center px-5 bg-white text-[13px] text-[#878787] font-medium justify-between">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-[#e5e5e5]"></div>
                   <div className="w-3 h-3 rounded-full bg-[#e5e5e5]"></div>
                   <div className="w-3 h-3 rounded-full bg-[#e5e5e5]"></div>
                 </div>
                 <div>Cursor</div>
                 <div className="w-12"></div>
              </div>
              <div className="flex-1 flex text-[14px]">
                 {/* Sidebar */}
                 <div className="w-56 bg-white border-r border-[#e5e5e5] p-5 font-mono text-[13px] hidden md:block">
                   <div className="font-semibold text-black mb-4 font-sans text-[14px]">Plan Mission Control</div>
                   <div className="text-black/80 mb-8 bg-[#f5f5f5] border border-[#e5e5e5] p-3 rounded-lg leading-relaxed">
                     let's build a mission control interface, similar to the expose-style window manager on macOS
                   </div>
                   <div className="space-y-4">
                     <div><span className="text-[#a0a0a0]">Thought</span> <span className="text-black/60">4s</span></div>
                     <div><span className="text-[#a0a0a0]">Read</span> <span className="text-black/60">AppManager.tsx</span></div>
                     <div><span className="text-[#a0a0a0]">Searched</span> <span className="text-black/60">expose patterns</span></div>
                   </div>
                 </div>
                 {/* Main Content */}
                 <div className="flex-1 bg-[#fcfcfc] p-10 hidden md:block">
                    <h3 className="text-[18px] font-semibold text-black mb-3">Mission Control Interface</h3>
                    <p className="text-black/60 mb-8 text-[15px] leading-relaxed">A grid view of all open windows as scaled previews, allowing quick selection to bring any window to front.</p>
                    <h4 className="font-semibold text-black mb-3 text-[15px]">Trigger</h4>
                    <p className="text-black/60 text-[15px] leading-relaxed">Menu item in MenuBar.tsx (View {'>'} Mission Control), hotkey F3, or double click.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Container 2: Works autonomously, runs in parallel */}
      <div className="w-full max-w-[1200px] bg-[#f5f5f5] rounded-[32px] overflow-hidden flex flex-col-reverse md:flex-row items-stretch border border-[#ebebeb]">
        
        {/* Left Image/Mockup */}
        <div className="flex-[1.1] relative w-full min-h-[500px] flex items-end justify-start pr-8">
           <div className="w-[110%] ml-[-30px] h-[92%] bg-white rounded-tr-[16px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),0_10px_20px_-5px_rgba(0,0,0,0.05)] border border-[#e5e5e5] border-l-0 border-b-0 flex flex-col overflow-hidden">
              <div className="h-12 border-b border-[#e5e5e5] flex items-center px-5 bg-[#f8f8f8] rounded-tr-[16px] justify-center text-[12px] text-[#878787] font-mono relative">
                 <div className="flex gap-2 absolute left-5">
                   <div className="w-3 h-3 rounded-full bg-[#e5e5e5]"></div>
                   <div className="w-3 h-3 rounded-full bg-[#e5e5e5]"></div>
                   <div className="w-3 h-3 rounded-full bg-[#e5e5e5]"></div>
                 </div>
                 cursor.com/agent
              </div>
              <div className="flex-1 flex text-[14px]">
                 <div className="w-64 border-r border-[#e5e5e5] bg-[#fafafa] p-5 space-y-5">
                    <div className="font-semibold text-[#111] mb-3 text-[15px]">This Week</div>
                    <div className="flex items-center gap-2 text-[#111] bg-[#ececec] px-3 py-2 rounded-md text-[13px] font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#27c93f]"></div> Acme Research Dashboard
                    </div>
                    <div className="flex items-center gap-2 px-3 text-[13px] text-[#666]">
                      <div className="w-2 h-2 rounded-full border border-[#999]"></div> Live Telemetry Pipeline
                    </div>
                    <div className="flex items-center gap-2 px-3 text-[13px] text-[#666]">
                      <div className="w-2 h-2 rounded-full border border-[#999]"></div> Zero-Downtime Deploys
                    </div>
                 </div>
                 <div className="flex-1 bg-white p-8 hidden md:block">
                    <div className="font-semibold text-black mb-5 text-[15px]">Acme Research Dashboard</div>
                    <div className="p-4 bg-[#f5f5f5] border border-[#e5e5e5] rounded-lg font-mono text-[12px] text-[#333] leading-relaxed">
                      let's build a dashboard to make our research findings interactive
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Text */}
        <div className="flex-1 py-[80px] px-[48px] flex flex-col justify-center">
          <h2 className="text-[36px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#000000]">
            Works autonomously, runs in parallel
          </h2>
          <p className="text-[18px] leading-[1.5] text-[#666666] mt-5">
            Agents use their own computers to build, test, and demo features end to end for you to review.
          </p>
          <a href="#" className="inline-block text-[16px] font-medium text-[#e46a3d] mt-8 hover:opacity-80 transition-opacity">
            Learn about cloud agents →
          </a>
        </div>
      </div>
    </section>
  );
}
