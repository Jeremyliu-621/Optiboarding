"use client";
import { motion } from "framer-motion";

function FeatureBlock({ 
  title, 
  description, 
  reverse = false, 
  mockupContent,
  mockupBgClass = "bg-[#fafafa]",
  mockupBorderClass = "border-[#e5e5e5]"
}: { 
  title: string; 
  description: string; 
  reverse?: boolean;
  mockupContent?: React.ReactNode;
  mockupBgClass?: string;
  mockupBorderClass?: string;
}) {
  return (
    <div className={`w-full max-w-[1200px] bg-[#f5f5f5] rounded-[32px] overflow-hidden flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch border border-[#ebebeb] mx-auto mb-6`}>
      {/* Text Section */}
      <div className="flex-1 py-[80px] px-[48px] flex flex-col justify-center max-w-[500px]">
        <h2 className="text-[36px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#000000]">
          {title}
        </h2>
        <p className="text-[18px] leading-[1.5] text-[#666666] mt-5">
          {description}
        </p>
      </div>

      {/* Mockup Section */}
      <div className={`flex-[1.2] w-full min-h-[500px] flex items-center justify-center p-8 lg:p-12`}>
         <motion.div 
           initial={{ opacity: 0, scale: 0.98, y: 10 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.5, ease: "easeOut" }}
           className={`relative w-full max-w-[540px] rounded-[16px] ${mockupBgClass} shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15),0_18px_36px_-18px_rgba(0,0,0,0.1)] border ${mockupBorderClass} flex flex-col overflow-hidden`}
         >
           {mockupContent}
         </motion.div>
      </div>
    </div>
  );
}

export function FeatureGrid() {
  return (
    <section className="bg-white">

      
      <FeatureBlock 
        title="Predicts your next edit."
        description="Cursor predicts your next edit based on your recent changes. Press Tab to accept, and let the AI write the boilerplate."
        reverse={false}
        mockupContent={
          <div className="flex flex-col font-mono text-[12px] p-8 leading-[1.6]">
             <div className="text-black/80">
                <span className="text-[#3b82f6]">function</span> <span className="text-[#a855f7]">calculateTotal</span>(items) {'{'}
             </div>
             <div className="text-black/80 ml-4">
                <span className="text-[#3b82f6]">return</span> items.reduce((sum, item) =&gt; sum + item.price, <span className="text-[#e46a3d]">0</span>);
             </div>
             <div className="text-black/80 mb-6">
                {'}'}
             </div>
             
             <div className="text-black/30 pt-2 border-t border-transparent">
                <span className="text-[#3b82f6]/40">export function</span> <span className="text-[#a855f7]/40">formatCurrency</span>(amount) {'{'}
             </div>
             <div className="text-black/30 ml-4 py-1">
                <span className="text-[#3b82f6]/40">return new</span> Intl.NumberFormat(<span className="text-[#22c55e]/40">'en-US'</span>, {'{'} style: <span className="text-[#22c55e]/40">'currency'</span>, currency: <span className="text-[#22c55e]/40">'USD'</span> {'}'}).format(amount);
             </div>
             <div className="text-black/30 flex items-center mt-1">
                {'}'} 
                <span className="ml-3 text-[10px] font-sans font-medium bg-[#878787] text-white px-1.5 py-0.5 rounded shadow-sm">Tab</span>
             </div>
          </div>
        }
      />
      


      <FeatureBlock 
        title="Chat with your codebase."
        description="Ask questions about your entire codebase. Cursor finds the relevant files and gives you an accurate answer instantly."
        reverse={true}
        mockupContent={
          <div className="flex flex-col bg-white p-6 justify-center">
             <div className="border border-[#e2e2e2] rounded-[6px] bg-white shadow-sm mb-6">
                <div className="px-3 py-2 flex items-center text-[13px] text-[#111]">
                  <span className="bg-[#f2f2f2] text-[#878787] p-0.5 rounded text-[10px] font-mono border border-[#e2e2e2] mr-2">@codebase</span>
                  <span>How does authentication work?</span>
                </div>
             </div>
             <div className="flex gap-3 text-sm text-black">
               <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5">C</div>
               <div className="flex-1 space-y-3">
                 <p className="leading-[1.6] text-[13px] text-[#111]">Authentication is handled by <span className="font-mono text-[11px] bg-[#f5f5f5] border border-[#e5e5e5] px-1 py-0.5 rounded mx-0.5">src/lib/auth.ts</span> using NextAuth. The main session provider is configured in <span className="font-mono text-[11px] bg-[#f5f5f5] border border-[#e5e5e5] px-1 py-0.5 rounded mx-0.5">layout.tsx</span>.</p>
                 <div className="border border-[#e5e5e5] rounded-[6px] flex px-3 py-2 font-mono text-[11px] text-[#878787] bg-white">
                   <div className="w-[2px] bg-[#e46a3d] mr-3 shrink-0 rounded-full" />
                   <div>
                     // lib/auth.ts<br/>
                     export const authOptions = {'{'} ... {'}'};
                   </div>
                 </div>
               </div>
             </div>
          </div>
        }
      />

      {/* Separator block 3 */}
      <div className="w-full max-w-[1100px] mx-auto h-[1px] bg-[#f0f0f0]" />

      <FeatureBlock 
        title="Agents that write code."
        description="Delegate entire tasks to Cursor's autonomous agents. They will plan, write, and execute code across multiple files."
        reverse={false}
        mockupBgClass="bg-[#111111]"
        mockupBorderClass="border-[#222]"
        mockupContent={
          <div className="p-8 text-[#ededed] font-mono text-[12px] flex flex-col justify-center">
            <div className="flex text-[#878787] mb-6 font-medium">
              cursor-agent <span className="animate-pulse ml-1 opacity-70">_</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#27c93f]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Read 14 files related to authentication
              </div>
              <div className="flex items-center gap-2 text-[#27c93f]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Plan migration from JWT to Sessions
              </div>
              <div className="flex items-center gap-2 text-[#e46a3d]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
                Updating src/lib/auth.ts
              </div>
              
              <div className="mt-5 border border-[#333] rounded-[6px] overflow-hidden">
                <div className="bg-[#1a1a1a] px-3 py-1.5 text-[10px] text-[#888] border-b border-[#333]">src/lib/auth.ts</div>
                <div className="p-3 text-[#dcdcdc] bg-[#111] leading-[1.6]">
                  <div className="text-[#e46a3d]">- strategy: "jwt"</div>
                  <div className="text-[#27c93f]">+ strategy: "database"</div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </section>
  );
}
