"use client";

import { motion } from "framer-motion";

export function FeatureGrid() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="max-w-[1300px] mx-auto">

        {/* Featured: Large stat + testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-12 md:gap-16 mb-16"
        >
          {/* Left: Big stat */}
          <div className="md:w-[50%]">
            <div className="text-[56px] md:text-[72px] font-bold tracking-tight leading-none text-black">
              40 hrs<span className="text-[#c0c0c0]">/week</span>
            </div>
            <p className="text-[17px] text-[#878787] mt-3">
              saved in code review for a team of 4 developers
            </p>
          </div>

          {/* Right: Quote */}
          <div className="md:w-[50%] flex flex-col justify-center">
            <blockquote className="text-[20px] md:text-[22px] leading-[1.5] text-black font-medium">
              &ldquo;Optibot is like having a Senior AI Engineer on my team.&rdquo;
            </blockquote>
            <div className="mt-4 text-[14px] text-[#878787]">
              Simon B, Nearfleet
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-[#e2e2e2] mb-12" />

        {/* Supporting stats — inline text, not cards */}
        <div className="flex flex-wrap gap-x-16 gap-y-4 text-[15px] mb-16">
          <div>
            <span className="font-semibold text-black">198 PRs</span>
            <span className="text-[#878787]"> reviewed in 6 weeks — Mpulse</span>
          </div>
          <div>
            <span className="font-semibold text-black">50% faster</span>
            <span className="text-[#878787]"> PR review cycles</span>
          </div>
          <div>
            <span className="font-semibold text-black">3x deploys</span>
            <span className="text-[#878787]"> per day — Prado</span>
          </div>
          <div>
            <span className="font-semibold text-black">2x more</span>
            <span className="text-[#878787]"> security vulnerabilities caught</span>
          </div>
        </div>

        {/* Second testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#fafafa] rounded-[4px] border border-black/[0.04] px-8 md:px-12 py-8 md:py-10"
        >
          <blockquote className="text-[18px] md:text-[20px] leading-[1.6] text-black max-w-[700px]">
            &ldquo;We used to read through every single change. Now we rely on Optibot to highlight the big issues.&rdquo;
          </blockquote>
          <div className="mt-4 text-[14px] text-[#878787]">
            Sam Lee, CEO, Artemis Ops
          </div>
        </motion.div>

      </div>
    </section>
  );
}
