"use client";

import { createContext, useContext } from "react";
import { TourContextValue } from "./TourTypes";

export const TourContext = createContext<TourContextValue | null>(null);

export function useTour(): TourContextValue {
  const context = useContext(TourContext);
  if (!context) {
    // Return a no-op context if not inside TourProvider
    return {
      isActive: false,
      currentStep: 0,
      totalSteps: 0,
      goNext: () => {},
      goBack: () => {},
      skipTour: () => {},
      completeTour: () => {},
      currentTourStep: null,
    };
  }
  return context;
}
