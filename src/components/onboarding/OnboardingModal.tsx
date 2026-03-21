"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  nextLabel: string;
  backVisible: boolean;
  skipVisible: boolean;
  children: React.ReactNode;
}

export function OnboardingModal({
  isOpen,
  onClose,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSkip,
  nextLabel,
  backVisible,
  skipVisible,
  children,
}: OnboardingModalProps) {
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Layer 1: Base dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(8, 4, 20, 0.65)" }}
            onClick={onClose}
          />

          {/* Layer 2: Gradient aurora + quarter-circle arcs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="fixed inset-0 z-[60] pointer-events-none overflow-hidden"
          >
            {/* Main flowing gradient — vivid violet/rose from bottom-left, blue-purple from top-right */}
            <div
              className="absolute inset-0"
              style={{
                background: [
                  "radial-gradient(ellipse 90% 80% at 10% 95%, hsla(280, 80%, 55%, 0.55), transparent 60%)",
                  "radial-gradient(ellipse 70% 65% at 90% 10%, hsla(250, 70%, 60%, 0.45), transparent 55%)",
                  "radial-gradient(ellipse 60% 50% at 50% 50%, hsla(275, 60%, 50%, 0.25), transparent 50%)",
                  "radial-gradient(ellipse 50% 45% at 5% 30%, hsla(310, 70%, 55%, 0.35), transparent 50%)",
                  "radial-gradient(ellipse 50% 50% at 95% 75%, hsla(265, 75%, 58%, 0.40), transparent 50%)",
                ].join(", "),
              }}
            />

            {/* Quarter-circle arcs — bottom-left corner */}
            <svg
              className="absolute bottom-0 left-0"
              style={{ width: "60vw", height: "60vh" }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 0 100 Q 0 20, 100 20"
                stroke="hsla(275, 70%, 70%, 0.35)"
                strokeWidth="0.5"
              />
              <path
                d="M 0 100 Q 0 40, 100 40"
                stroke="hsla(290, 65%, 65%, 0.25)"
                strokeWidth="0.4"
              />
              <path
                d="M 0 100 Q 0 58, 100 58"
                stroke="hsla(310, 55%, 62%, 0.18)"
                strokeWidth="0.35"
              />
            </svg>

            {/* Quarter-circle arcs — top-right corner */}
            <svg
              className="absolute top-0 right-0"
              style={{ width: "50vw", height: "50vh" }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 100 0 Q 100 80, 0 80"
                stroke="hsla(260, 65%, 70%, 0.30)"
                strokeWidth="0.5"
              />
              <path
                d="M 100 0 Q 100 55, 0 55"
                stroke="hsla(250, 60%, 65%, 0.20)"
                strokeWidth="0.4"
              />
            </svg>

            {/* Vivid colored orbs */}
            <div
              className="absolute rounded-full"
              style={{
                left: "0%",
                bottom: "5%",
                width: "500px",
                height: "500px",
                background: "radial-gradient(circle, hsla(300, 70%, 60%, 0.30), transparent 60%)",
                filter: "blur(80px)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                right: "0%",
                top: "0%",
                width: "450px",
                height: "450px",
                background: "radial-gradient(circle, hsla(250, 80%, 65%, 0.28), transparent 60%)",
                filter: "blur(70px)",
              }}
            />
            {/* Center warm glow */}
            <div
              className="absolute rounded-full"
              style={{
                left: "30%",
                top: "35%",
                width: "400px",
                height: "400px",
                background: "radial-gradient(circle, hsla(275, 55%, 55%, 0.15), transparent 55%)",
                filter: "blur(60px)",
              }}
            />
          </motion.div>

          {/* Layer 3: The modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed z-[60] bg-white rounded-[12px] flex flex-col"
            style={{
              top: "44px",
              left: "44px",
              right: "44px",
              bottom: "44px",
              boxShadow: "0 24px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            {/* Top bar: Logo + Progress */}
            <div className="flex items-center justify-between shrink-0" style={{ padding: "28px 36px 0" }}>
              <div className="flex items-center gap-2">
                <Image
                  src="/optimalaismalllogo.png"
                  alt="Optimal AI"
                  width={22}
                  height={22}
                  className="rounded"
                />
                <span
                  className="text-[16px] font-normal tracking-[-0.02em] text-[#0a0a0a]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Optimal AI
                </span>
              </div>

              <div
                className="h-0.5 rounded-full bg-[#e0e0e0] overflow-hidden"
                style={{ width: "160px" }}
              >
                <motion.div
                  className="h-full bg-[#5b3dc8]"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto onboarding-scroll">
              <div className="min-h-full flex items-center justify-center py-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="border-t border-[#e0e0e0] flex items-center justify-between shrink-0"
              style={{ padding: "20px 36px" }}
            >
              <div>
                {backVisible && (
                  <button
                    onClick={onBack}
                    className="text-[13px] text-[#8a8a8a] hover:text-[#4a4a4a] transition-colors cursor-pointer"
                  >
                    ← Back
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4">
                {skipVisible && (
                  <button
                    onClick={onSkip}
                    className="text-[13px] text-[#8a8a8a] hover:text-[#4a4a4a] transition-colors cursor-pointer"
                  >
                    Skip for now
                  </button>
                )}
                <button
                  onClick={onNext}
                  className="px-6 py-2.5 rounded-[8px] bg-[#5b3dc8] hover:bg-[#4a2fb3] text-white text-[14px] font-medium transition-colors cursor-pointer"
                >
                  {nextLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
