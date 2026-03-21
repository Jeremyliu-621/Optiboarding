"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { TourContext } from "./TourContext";
import { TOUR_STEPS } from "./TourTypes";
import { TourPanel } from "./TourPanel";

interface TourProviderProps {
  children: React.ReactNode;
  active: boolean;
}

const STORAGE_KEY = "optimal-ai-onboarding-v1";

export function TourProvider({
  children,
  active,
}: TourProviderProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  // When active becomes true, start the tour at step 1
  useEffect(() => {
    if (active && currentStep === 0) {
      setCurrentStep(1);
      saveTourState(1);
      // Navigate to first tour step route
      router.push(TOUR_STEPS[0].route);
    }
  }, [active]);

  const saveTourState = useCallback((step: number, completed: boolean = false) => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const state = stored ? JSON.parse(stored) : {};
      state.tourCurrentStep = step;
      state.tourCompleted = completed;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore errors
    }
  }, []);

  const isActive = active && currentStep > 0;
  const currentTourStep =
    currentStep > 0 && currentStep <= TOUR_STEPS.length
      ? TOUR_STEPS[currentStep - 1]
      : null;

  const goNext = useCallback(() => {
    if (currentStep < TOUR_STEPS.length) {
      const nextStep = TOUR_STEPS[currentStep];
      if (nextStep) {
        setIsNavigating(true);
        router.push(nextStep.route);
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
          saveTourState(currentStep + 1);
          setIsNavigating(false);
        }, 400);
      }
    } else {
      completeTour();
    }
  }, [currentStep, router, saveTourState]);

  const goBack = useCallback(() => {
    if (currentStep > 1) {
      const prevStep = TOUR_STEPS[currentStep - 2];
      if (prevStep) {
        setIsNavigating(true);
        router.push(prevStep.route);
        setTimeout(() => {
          setCurrentStep(currentStep - 1);
          saveTourState(currentStep - 1);
          setIsNavigating(false);
        }, 400);
      }
    }
  }, [currentStep, router, saveTourState]);

  const skipTour = useCallback(() => {
    saveTourState(0, true);
    setCurrentStep(0);
  }, [saveTourState]);

  const completeTour = useCallback(() => {
    saveTourState(0, true);
    setCurrentStep(0);
  }, [saveTourState]);

  const contextValue = {
    isActive,
    currentStep,
    totalSteps: TOUR_STEPS.length,
    goNext,
    goBack,
    skipTour,
    completeTour,
    currentTourStep,
  };

  return (
    <TourContext.Provider value={contextValue}>
      {children}
      <AnimatePresence>
        {isActive && currentTourStep && (
          <>
            {/* Soft gradient wash — bottom half only, flows around tour panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="fixed inset-0 z-[55] pointer-events-none"
              style={{
                background: [
                  "radial-gradient(ellipse 80% 50% at 70% 100%, hsla(275, 60%, 55%, 0.28), transparent 60%)",
                  "radial-gradient(ellipse 60% 45% at 30% 95%, hsla(310, 50%, 55%, 0.18), transparent 55%)",
                  "radial-gradient(ellipse 50% 40% at 90% 85%, hsla(255, 55%, 58%, 0.15), transparent 50%)",
                ].join(", "),
              }}
            />

            <TourPanel step={currentTourStep} stepNumber={currentStep} totalSteps={TOUR_STEPS.length} />
          </>
        )}
      </AnimatePresence>
    </TourContext.Provider>
  );
}
