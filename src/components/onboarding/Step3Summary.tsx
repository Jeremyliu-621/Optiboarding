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

  // The 6 feature cards from the actual dashboard, with their accent colors
  const featureCards = [
    { label: "Review a PR",      accent: "hsl(275, 55%, 65%)" },
    { label: "View Insights",    accent: "hsl(220, 65%, 60%)" },
    { label: "Security Scan",    accent: "hsl(38, 70%, 55%)"  },
    { label: "Browse Repos",     accent: "hsl(175, 55%, 50%)" },
    { label: "Team Activity",    accent: "hsl(10, 65%, 58%)"  },
    { label: "Release Notes",    accent: "hsl(290, 50%, 58%)" },
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

          {/* Numbered Steps List */}
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

        {/* Right Column: Dashboard Preview Mockup — no tilt */}
        <div className="relative flex items-center justify-center">
          {/* Subtle purple halo behind the panel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at center, hsla(275, 35%, 55%, 0.12), transparent 70%)",
            }}
          />

          {/* Dashboard mockup panel */}
          <div
            className="w-full rounded-[10px] overflow-hidden relative"
            style={{
              backgroundColor: "hsl(275, 15%, 7%)",
              border: "1px solid hsl(275, 10%, 15%)",
              boxShadow: "0 16px 48px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* Header bar */}
            <div
              className="flex items-center justify-between px-3 py-2.5 border-b"
              style={{
                backgroundColor: "hsl(275, 14%, 8%)",
                borderColor: "hsl(275, 10%, 14%)",
              }}
            >
              <div className="flex items-center gap-1.5">
                {/* Logo dot */}
                <div
                  className="w-3.5 h-3.5 rounded-sm"
                  style={{ backgroundColor: "hsl(275, 35%, 40%)" }}
                />
                <span className="text-[9px] font-medium text-white opacity-70">
                  Optimal AI
                </span>
              </div>
              {/* Fake search bar */}
              <div
                className="h-4 w-20 rounded-[4px]"
                style={{ backgroundColor: "hsl(275, 10%, 14%)" }}
              />
            </div>

            <div className="flex" style={{ minHeight: "200px" }}>
              {/* Sidebar */}
              <div
                className="w-9 shrink-0 border-r pt-3 px-2 space-y-2.5"
                style={{
                  backgroundColor: "hsl(275, 14%, 8%)",
                  borderColor: "hsl(275, 10%, 14%)",
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-[3px]"
                    style={{ backgroundColor: "hsl(275, 12%, 22%)" }}
                  />
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-3 space-y-2.5">
                {/* Greeting row */}
                <div className="space-y-1 mb-3">
                  <div
                    className="h-2 w-16 rounded-full"
                    style={{ backgroundColor: "hsl(275, 10%, 18%)" }}
                  />
                  <div
                    className="h-3.5 w-28 rounded-full"
                    style={{ backgroundColor: "hsl(275, 10%, 22%)" }}
                  />
                </div>

                {/* 2×3 feature cards grid — matches actual dashboard layout */}
                <div className="grid grid-cols-3 gap-1.5">
                  {featureCards.map((card) => (
                    <div
                      key={card.label}
                      className="rounded-[6px] p-1.5 flex flex-col gap-1.5"
                      style={{ backgroundColor: "hsl(275, 12%, 12%)" }}
                    >
                      {/* Colored icon square */}
                      <div
                        className="w-5 h-5 rounded-[4px]"
                        style={{
                          backgroundColor: card.accent
                            .replace("hsl(", "hsla(")
                            .replace(")", ", 0.18)"),
                        }}
                      >
                        <div
                          className="w-2.5 h-2.5 rounded-full m-auto mt-[5px]"
                          style={{
                            backgroundColor: card.accent
                              .replace("hsl(", "hsla(")
                              .replace(")", ", 0.7)"),
                          }}
                        />
                      </div>
                      {/* Label bar */}
                      <div
                        className="h-1.5 w-10 rounded-full"
                        style={{ backgroundColor: "hsl(275, 10%, 22%)" }}
                      />
                      {/* Description bar */}
                      <div
                        className="h-1 w-8 rounded-full"
                        style={{ backgroundColor: "hsl(275, 10%, 18%)" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Activity row below cards */}
                <div className="space-y-1.5 pt-1">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: "hsl(275, 12%, 20%)" }}
                      />
                      <div
                        className="h-1.5 rounded-full flex-1"
                        style={{ backgroundColor: "hsl(275, 10%, 16%)" }}
                      />
                      <div
                        className="h-1.5 w-8 rounded-full"
                        style={{ backgroundColor: "hsl(275, 10%, 14%)" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
