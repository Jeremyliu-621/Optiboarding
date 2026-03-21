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

          {/* The modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed z-[60] rounded-[12px] flex flex-col"
            style={{
              top: "44px",
              left: "44px",
              right: "44px",
              bottom: "44px",
              background: "hsl(275, 12%, 11%)",
              boxShadow: "0 24px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px hsl(275, 15%, 20%)",
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
                  className="text-[16px] font-normal tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-heading)", color: "hsl(275, 8%, 82%)" }}
                >
                  Optimal AI
                </span>
              </div>

              <div
                className="overflow-hidden rounded-full h-0.5"
                style={{ width: "160px", background: "hsl(275, 10%, 20%)" }}
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
              className="flex items-center justify-between shrink-0"
              style={{ padding: "20px 36px", borderTop: "1px solid hsl(275, 10%, 20%)" }}
            >
              <div>
                {backVisible && (
                  <button
                    onClick={onBack}
                    className="text-[13px] transition-colors cursor-pointer"
                    style={{ color: "hsl(275, 6%, 55%)" }}
                  >
                    ← Back
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4">
                {skipVisible && (
                  <button
                    onClick={onSkip}
                    className="text-[13px] transition-colors cursor-pointer"
                    style={{ color: "hsl(275, 6%, 55%)" }}
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
