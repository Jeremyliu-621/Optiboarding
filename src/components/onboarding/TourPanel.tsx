"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useTour } from "./TourContext";
import { TourStep } from "./TourTypes";

interface TourPanelProps {
  step: TourStep;
  stepNumber: number;
  totalSteps: number;
}

export function TourPanel({ step, stepNumber, totalSteps }: TourPanelProps) {
  const { goNext, goBack, skipTour } = useTour();

  const progressPercent = (stepNumber / totalSteps) * 100;

  return (
    <div
      style={{
        background: "radial-gradient(ellipse at top left, hsl(275, 20%, 18%) 0%, hsl(275, 15%, 11%) 70%)",
        border: "1px solid hsl(275, 20%, 25%)",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Progress bar at top */}
      <div
        className="absolute h-0.5 rounded-t-[12px] bg-[hsl(275, 10%, 22%)] overflow-hidden"
        style={{ top: 0, left: 0, right: 0 }}
      >
        <motion.div
          className="h-full bg-[#5b3dc8]"
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Step counter */}
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
        Step {stepNumber} of {totalSteps}
      </p>

      {/* Panel title */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`title-${step.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-3">
            {step.panelTitle}
          </h3>
        </motion.div>
      </AnimatePresence>

      {/* Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`desc-${step.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-6">
            {step.panelDescription}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-4 border-t border-[hsl(275, 10%, 22%)]">
        {/* Back button */}
        {stepNumber > 1 && (
          <button
            onClick={goBack}
            className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer"
          >
            ← Back
          </button>
        )}

        {/* Spacer */}
        {stepNumber === 1 && <div />}

        {/* Skip tour link */}
        <button
          onClick={skipTour}
          className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer"
        >
          Skip tour
        </button>

        {/* Next button */}
        <button
          onClick={goNext}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#5b3dc8] hover:bg-[#4a2fb3] text-white text-[12px] font-medium transition-colors cursor-pointer"
        >
          <span>{step.nextLabel}</span>
          {stepNumber < totalSteps && <ChevronRight size={14} />}
        </button>
      </div>
    </div>
  );
}
