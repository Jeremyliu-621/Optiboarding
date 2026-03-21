"use client";

export function Step3Summary() {
  const steps = [
    {
      number: 1,
      title: "Review your first PR",
      description:
        "Open a pull request and Optibot will post a review within minutes.",
    },
    {
      number: 2,
      title: "Explore your codebase",
      description:
        "Use the Codebase Map to see coverage and where issues cluster.",
    },
    {
      number: 3,
      title: "Invite your team",
      description:
        "Add teammates from Organization to share Optibot across your workspace.",
    },
  ];

  return (
    <div className="w-full max-w-[820px] mx-auto">
      <div className="grid grid-cols-[1fr_1fr] gap-16 items-center">
        {/* Left Column: Text Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#0a0a0a] mb-1.5">
              You&#39;re all set.
            </h1>
            <p className="text-[15px] text-[#8a8a8a] leading-relaxed">
              Start reviewing code with full codebase context.
            </p>
          </div>

          {/* Numbered Steps List — compact spacing like Stripe */}
          <div className="relative">
            {steps.map((step, index) => (
              <div key={step.number} className="flex gap-3.5">
                {/* Circle + Connecting Line */}
                <div className="flex flex-col items-center">
                  <div className="w-[26px] h-[26px] rounded-full bg-[#5b3dc8] flex items-center justify-center text-white text-[12px] font-semibold shrink-0 relative z-10">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px bg-[#d4c0f0] flex-1 my-1" />
                  )}
                </div>

                {/* Step Content */}
                <div className="pt-0.5 pb-5">
                  <p className="text-[14px] font-semibold text-[#0a0a0a]">
                    {step.title}
                  </p>
                  <p className="text-[13px] text-[#8a8a8a] mt-0.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Dashboard Preview Mockup */}
        <div className="relative flex items-center justify-center">
          {/* Subtle radial gradient halo behind panel */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 400px 400px at center, rgba(91, 61, 200, 0.15), transparent 70%)",
            }}
          />

          {/* Dashboard mockup panel with 3D tilt */}
          <div
            className="w-full rounded-[12px] overflow-hidden relative"
            style={{
              aspectRatio: "4/3",
              backgroundColor: "hsl(275, 15%, 7%)",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
              transform: "perspective(800px) rotateX(2deg) rotateY(-4deg)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Mock Sidebar */}
            <div
              className="absolute top-0 left-0 w-10 h-full border-r"
              style={{ borderColor: "hsl(275, 10%, 15%)" }}
            >
              <div className="p-2.5 space-y-3 pt-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "hsl(275, 15%, 25%)" }}
                  />
                ))}
              </div>
            </div>

            {/* Mock Content Area */}
            <div className="ml-10 p-3 space-y-3">
              {/* Mock Header */}
              <div className="flex items-center justify-between">
                <div
                  className="h-4 w-24 rounded"
                  style={{ backgroundColor: "hsl(275, 10%, 15%)" }}
                />
                <div
                  className="h-4 w-16 rounded"
                  style={{ backgroundColor: "hsl(275, 10%, 15%)" }}
                />
              </div>

              {/* Mock Feature Cards Grid */}
              <div className="grid grid-cols-3 gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-12 rounded-[6px]"
                    style={{ backgroundColor: "hsl(275, 10%, 15%)" }}
                  />
                ))}
              </div>

              {/* Mock Stat Row */}
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 flex-1 rounded"
                    style={{ backgroundColor: "hsl(275, 10%, 15%)" }}
                  />
                ))}
              </div>
            </div>

            {/* Small Optimal AI Logo */}
            <div className="absolute top-2.5 left-12 text-white text-[9px] font-medium opacity-60">
              Optimal AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
