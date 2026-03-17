"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "The ability to quickly understand how different engineering teams and contributors are performing gives me confidence that we will break up organizational bottlenecks and have the management conversations that continually drive us towards excellence.",
    name: "Rebecca Yang",
    title: "Director of Engineering, HubSpot",
    initials: "RY",
  },
  {
    quote:
      "We now have a single place to see all our engineering metrics from Jira to GitHub without maintaining scripts. The UX is smooth, so adoption improved from engineers to directors.",
    name: "Lila Brooks",
    title: "Software Engineering Manager, MongoDB",
    initials: "LB",
  },
  {
    quote:
      "We want to keep showing the value of investing in AI to our leadership. Optimal's Insights help prove how our cycle times are improving with AI agents.",
    name: "Enam Haque",
    title: "Sr Director of Engineering, Mpulse",
    initials: "EH",
  },
  {
    quote:
      "Optibot's PR reviews are genuinely useful. The team immediately noticed the difference compared to our old code reviewer. Being able to understand all our teams' analytics and act on them in one place is critical.",
    name: "Manh Do",
    title: "Co-Founder & CTO, Blaze",
    initials: "MD",
  },
  {
    quote:
      "We went from one or two daily deploys to five or six. Cycle time dropped 30%, and every PR gets reviewed instantly.",
    name: "Grainger Blackett",
    title: "CTO, Prado",
    initials: "GB",
  },
  {
    quote:
      "Optibot highlights the biggest issues first on every PR in Github, so reviews take minutes, not hours. Code reviews are 50% faster and less stressful.",
    name: "Sam Lee",
    title: "CEO & Co-Founder, Artemis Ops",
    initials: "SL",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white px-6 pb-24">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              className="bg-[#fafafa] border border-black/[0.04] rounded-[4px] px-7 py-8 flex flex-col justify-between"
            >
              <p className="text-[15px] leading-[1.65] text-black">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-7">
                <div className="w-9 h-9 rounded-full bg-[#e46a3d]/10 text-[#e46a3d] text-[12px] font-bold flex items-center justify-center shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-black leading-tight">
                    {t.name}
                  </div>
                  <div className="text-[12px] text-[#878787] mt-0.5">
                    {t.title}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
