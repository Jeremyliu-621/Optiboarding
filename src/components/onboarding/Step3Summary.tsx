"use client";

interface Step3SummaryProps {
  // No props needed for summary step
}

export function Step3Summary({}: Step3SummaryProps) {
  const steps = [
    {
      number: 1,
      title: "Review your first PR",
      description:
        "Open a pull request and Optibot will automatically post a review within minutes.",
    },
    {
      number: 2,
      title: "Explore your codebase",
      description:
        "Use the Codebase Map to see which files are covered and where issues are concentrated.",
    },
    {
      number: 3,
      title: "Invite your team",
      description:
        "Add teammates from the Organization page to share Optibot across your workspace.",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-12 items-center min-h-[480px]">
        {/* Left Column: Text Content */}
        <div className="space-y-8">
          <div>
            <h1 className="text-[32px] font-bold tracking-[-0.02em] text-[#0a0a0a] mb-2">
              You're all set.
            </h1>
            <p className="text-[14px] text-[#8a8a8a]">
              Start reviewing code with full codebase context.
            </p>
          </div>

          {/* Numbered Steps List */}
          <div className="relative space-y-6">
            {steps.map((step, index) => (
              <div key={step.number} className="flex gap-4">
                {/* Circle + Connecting Line */}
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-[#5b3dc8] flex items-center justify-center text-white text-sm font-semibold shrink-0 relative z-10">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className="w-0.5 bg-[#d4c0f0] flex-1 mt-2"
                      style={{ minHeight: "60px" }}
                    />
                  )}
                </div>

                {/* Step Content */}
                <div className="pt-1 pb-2">
                  <p className="text-[14px] font-semibold text-[#0a0a0a]">
                    {step.title}
                  </p>
                  <p className="text-[13px] text-[#8a8a8a] mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Dashboard Preview Mockup */}
        <div className="relative h-full flex items-center justify-center">
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
            className="w-full h-80 rounded-[12px] overflow-hidden relative"
            style={{
              backgroundColor: "hsl(275, 15%, 7%)",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
              transform: "perspective(800px) rotateX(2deg) rotateY(-4deg)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Mock Sidebar */}
            <div
              className="absolute top-0 left-0 w-12 h-full border-r"
              style={{ borderColor: "hsl(275, 10%, 15%)" }}
            >
              <div className="p-3 space-y-4 pt-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: "hsl(275, 15%, 25%)" }}
                  />
                ))}
              </div>
            </div>

            {/* Mock Content Area */}
            <div className="ml-12 p-4 space-y-4">
              {/* Mock Header */}
              <div className="flex items-center justify-between">
                <div
                  className="h-6 w-32 rounded"
                  style={{ backgroundColor: "hsl(275, 10%, 15%)" }}
                />
                <div
                  className="h-6 w-24 rounded"
                  style={{ backgroundColor: "hsl(275, 10%, 15%)" }}
                />
              </div>

              {/* Mock Feature Cards Grid */}
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 rounded-[8px]"
                    style={{ backgroundColor: "hsl(275, 10%, 15%)" }}
                  />
                ))}
              </div>

              {/* Mock Stat Row */}
              <div className="flex gap-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 flex-1 rounded"
                    style={{ backgroundColor: "hsl(275, 10%, 15%)" }}
                  />
                ))}
              </div>
            </div>

            {/* Small Optimal AI Logo in top-left corner of panel */}
            <div className="absolute top-3 left-16 text-white text-[10px] font-medium opacity-60">
              Optimal AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
