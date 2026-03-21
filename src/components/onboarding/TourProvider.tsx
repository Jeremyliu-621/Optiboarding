"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { TourContext } from "./TourContext";
import { TOUR_STEPS } from "./TourTypes";
import { TourPanel } from "./TourPanel";

interface TourProviderProps {
  children: React.ReactNode;
  active: boolean;
}

const STORAGE_KEY = "optimal-ai-onboarding-v1";
const DISMISS_DURATION = 600; // ms — card + aurora fade together

export function TourProvider({
  children,
  active,
}: TourProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const dismissTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // When active becomes true, start the tour at step 1
  useEffect(() => {
    if (active && currentStep === 0) {
      setCurrentStep(1);
      saveTourState(1);
      // Navigate to first tour step route
      router.push(TOUR_STEPS[0].route);
    }
  }, [active]);

  // Cancel tour when user navigates away via sidebar
  useEffect(() => {
    if (!isActive || isNavigating || dismissing) return;

    const expectedRoute = currentTourStep?.route;
    if (expectedRoute && pathname !== expectedRoute) {
      dismiss();
    }
  }, [pathname]);

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

  /** Shared dismiss logic — fade everything out, then clean up */
  const dismiss = useCallback(() => {
    if (dismissing) return;
    setDismissing(true);
    clearTimeout(dismissTimer.current);
    dismissTimer.current = setTimeout(() => {
      saveTourState(0, true);
      setCurrentStep(0);
      setDismissing(false);
    }, DISMISS_DURATION);
  }, [dismissing, saveTourState]);

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
      dismiss();
    }
  }, [currentStep, router, saveTourState, dismiss]);

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

  const skipTour = useCallback(() => dismiss(), [dismiss]);
  const completeTour = useCallback(() => dismiss(), [dismiss]);

  const contextValue = {
    isActive: isActive && !dismissing,
    currentStep,
    totalSteps: TOUR_STEPS.length,
    goNext,
    goBack,
    skipTour,
    completeTour,
    currentTourStep,
  };

  // Show overlays while active OR while dismiss animation is playing
  const showOverlays = (isActive && currentTourStep) || dismissing;

  return (
    <TourContext.Provider value={contextValue}>
      {children}

      {showOverlays && (
        <>
          {/* Soft gradient wash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: dismissing ? 0 : 1 }}
            transition={{ duration: dismissing ? 0.6 : 1, ease: "easeOut" }}
            className="fixed inset-0 z-[55] pointer-events-none"
            style={{
              background: [
                "radial-gradient(ellipse 80% 50% at 70% 100%, hsla(275, 60%, 55%, 0.28), transparent 60%)",
                "radial-gradient(ellipse 60% 45% at 30% 95%, hsla(310, 50%, 55%, 0.18), transparent 55%)",
                "radial-gradient(ellipse 50% 40% at 90% 85%, hsla(255, 55%, 58%, 0.15), transparent 50%)",
              ].join(", "),
            }}
          />

          {/* Tour panel card */}
          {currentTourStep && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: dismissing ? 0 : 1,
                y: dismissing ? 16 : 0,
              }}
              transition={{ duration: dismissing ? 0.5 : 0.3, ease: "easeOut" }}
              className="fixed bottom-8 right-8 z-[56] w-[360px]"
            >
              <TourPanel
                step={currentTourStep}
                stepNumber={currentStep}
                totalSteps={TOUR_STEPS.length}
              />
            </motion.div>
          )}
        </>
      )}
    </TourContext.Provider>
  );
}
