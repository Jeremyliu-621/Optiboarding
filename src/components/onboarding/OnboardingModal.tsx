"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number; // 1, 2, or 3
  totalSteps: number; // 3
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
          {/* Backdrop — covers EVERYTHING including sidebar (z-[60] > sidebar z-50) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
            onClick={onClose}
          />

          {/* Modal — full-viewport inset panel like Stripe, equal margin on all sides */}
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
              boxShadow: "0 24px 64px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Top bar: Logo + Progress */}
            <div className="flex items-center justify-between shrink-0" style={{ padding: "28px 36px 0" }}>
              {/* Logo on left */}
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

              {/* Progress bar on right */}
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

            {/* Content area — vertically centered, generous horizontal padding */}
            <div className="flex-1 overflow-y-auto flex items-center justify-center" style={{ padding: "32px 0" }}>
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

            {/* Bottom bar */}
            <div
              className="border-t border-[#e0e0e0] flex items-center justify-between shrink-0"
              style={{ padding: "20px 36px" }}
            >
              {/* Back link (left) */}
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

              {/* Skip + CTA (right) */}
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
