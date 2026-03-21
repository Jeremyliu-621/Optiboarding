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
          {/* Layer 1: Dark backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(0,0,0,0.55)" }}
            onClick={onClose}
          />

          {/* Layer 2: Flowing gradient aurora — draws eye toward the modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 z-[60] pointer-events-none"
          >
            {/* Primary gradient flow: bottom-left to center-right */}
            <div
              className="absolute inset-0"
              style={{
                background: [
                  "radial-gradient(ellipse 70% 60% at 20% 85%, hsla(275, 50%, 40%, 0.35), transparent 70%)",
                  "radial-gradient(ellipse 60% 50% at 80% 20%, hsla(275, 40%, 50%, 0.20), transparent 70%)",
                  "radial-gradient(ellipse 50% 40% at 50% 50%, hsla(290, 45%, 35%, 0.15), transparent 60%)",
                  "radial-gradient(ellipse 40% 50% at 15% 30%, hsla(320, 40%, 40%, 0.12), transparent 60%)",
                  "radial-gradient(ellipse 35% 40% at 85% 75%, hsla(260, 50%, 45%, 0.18), transparent 60%)",
                ].join(", "),
              }}
            />

            {/* Quarter-circle arcs — geometric brand elements */}
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              {/* Bottom-left arc — large, sweeps upward */}
              <path
                d="M 0 100% Q 0 65%, 35% 65%"
                fill="none"
                stroke="hsla(275, 45%, 55%, 0.12)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M 0 100% Q 0 58%, 42% 58%"
                fill="none"
                stroke="hsla(275, 45%, 55%, 0.07)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />

              {/* Top-right arc — complementary sweep */}
              <path
                d="M 100% 0 Q 100% 35%, 65% 35%"
                fill="none"
                stroke="hsla(275, 40%, 60%, 0.10)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M 100% 0 Q 100% 42%, 58% 42%"
                fill="none"
                stroke="hsla(275, 40%, 60%, 0.06)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Quarter-circle arcs with viewBox for proper scaling */}
            <svg
              className="absolute bottom-0 left-0 w-[55%] h-[55%]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 0 100 Q 0 30, 100 30"
                stroke="hsla(275, 45%, 55%, 0.13)"
                strokeWidth="0.4"
              />
              <path
                d="M 0 100 Q 0 45, 100 45"
                stroke="hsla(290, 40%, 50%, 0.08)"
                strokeWidth="0.3"
              />
              <path
                d="M 0 100 Q 0 60, 100 60"
                stroke="hsla(320, 35%, 50%, 0.06)"
                strokeWidth="0.3"
              />
            </svg>

            <svg
              className="absolute top-0 right-0 w-[45%] h-[45%]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 100 0 Q 100 70, 0 70"
                stroke="hsla(275, 40%, 60%, 0.10)"
                strokeWidth="0.4"
              />
              <path
                d="M 100 0 Q 100 55, 0 55"
                stroke="hsla(260, 45%, 55%, 0.06)"
                strokeWidth="0.3"
              />
            </svg>

            {/* Subtle warm accent glow — rose/magenta, very faint */}
            <div
              className="absolute"
              style={{
                left: "5%",
                bottom: "15%",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "radial-gradient(circle, hsla(330, 50%, 45%, 0.12), transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div
              className="absolute"
              style={{
                right: "10%",
                top: "10%",
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: "radial-gradient(circle, hsla(260, 60%, 50%, 0.10), transparent 70%)",
                filter: "blur(50px)",
              }}
            />
          </motion.div>

          {/* Layer 3: The modal itself */}
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
              boxShadow: "0 24px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.06)",
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
