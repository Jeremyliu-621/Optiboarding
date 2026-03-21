"use client";

import { useState, useEffect } from "react";
import { useTour } from "../TourContext";
import { OVERLAY_DEFINITIONS } from "../overlays/overlayDefs";

export function usePageOverlay() {
  const { currentStep, isActive } = useTour();
  const [isDismissed, setIsDismissed] = useState(false);

  // Reset dismissed state when tour step changes
  useEffect(() => {
    setIsDismissed(false);
  }, [currentStep]);

  const overlayDef =
    isActive && currentStep > 0 && currentStep <= 6
      ? OVERLAY_DEFINITIONS[currentStep]
      : null;

  const shouldShowOverlay =
    overlayDef && isActive && !isDismissed;

  return {
    overlayDef,
    shouldShowOverlay,
    onDismiss: () => setIsDismissed(true),
  };
}
