"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { OnboardingModal } from "./OnboardingModal";
import { Step1Connect } from "./Step1Connect";
import { Step2Settings, type ReviewSettings } from "./Step2Settings";
import { Step3Summary } from "./Step3Summary";
import { TourProvider } from "./TourProvider";

// ── DEV: set to true to always show onboarding + tour on every load ──
const DEV_ALWAYS_SHOW = true;

export interface OnboardingState {
  completed: boolean;
  skipped: boolean;
  skippedAt: string | null;
  completedAt: string | null;
  currentStep: number;
  connectedIntegrations: {
    github: boolean;
    gitlab: boolean;
    slack: boolean;
    jira: boolean;
  };
  reviewSettings: ReviewSettings;
  tourCompleted: boolean;
  tourCurrentStep: number;
}

const DEFAULT_STATE: OnboardingState = {
  completed: false,
  skipped: false,
  skippedAt: null,
  completedAt: null,
  currentStep: 1,
  connectedIntegrations: {
    github: true,
    gitlab: false,
    slack: false,
    jira: false,
  },
  reviewSettings: {
    autoReview: true,
    autoReviewOnDraft: false,
    autoReviewOnPush: false,
    autoReviewAfterWorkflow: false,
    allowApprove: false,
    codeSuggestions: true,
  },
  tourCompleted: false,
  tourCurrentStep: 0,
};

const STORAGE_KEY = "optimal-ai-onboarding-v1";
const SKIP_COOLDOWN_DAYS = 7;

function loadOnboardingState(): OnboardingState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  if (DEV_ALWAYS_SHOW) return DEFAULT_STATE;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_STATE;

    const state = JSON.parse(stored) as OnboardingState;

    if (state.skipped && state.skippedAt) {
      const skippedDate = new Date(state.skippedAt);
      const now = new Date();
      const daysPassed =
        (now.getTime() - skippedDate.getTime()) / (1000 * 60 * 60 * 24);

      if (daysPassed > SKIP_COOLDOWN_DAYS) {
        return {
          ...DEFAULT_STATE,
          connectedIntegrations: state.connectedIntegrations,
          reviewSettings: state.reviewSettings,
        };
      }
    }

    return state;
  } catch {
    return DEFAULT_STATE;
  }
}

function saveOnboardingState(state: OnboardingState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

interface OnboardingProviderProps {
  children: React.ReactNode;
}

type FlowPhase = "loading" | "onboarding" | "tour" | "done";

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const { data: session, status } = useSession();
  const [phase, setPhase] = useState<FlowPhase>("loading");
  const [onboardingState, setOnboardingState] =
    useState<OnboardingState>(DEFAULT_STATE);

  // Initialize on mount
  useEffect(() => {
    if (status === "loading") return;

    const state = loadOnboardingState();
    setOnboardingState(state);

    if (DEV_ALWAYS_SHOW) {
      setPhase("onboarding");
      return;
    }

    if (status !== "authenticated") {
      setPhase("done");
      return;
    }

    if (!state.completed && !state.skipped) {
      setPhase("onboarding");
    } else if (state.completed && !state.tourCompleted) {
      setPhase("tour");
    } else {
      setPhase("done");
    }
  }, [status]);

  const updateState = useCallback(
    (updates: Partial<OnboardingState>) => {
      setOnboardingState((prev) => {
        const newState = { ...prev, ...updates };
        saveOnboardingState(newState);
        return newState;
      });
    },
    []
  );

  const handleNext = useCallback(() => {
    setOnboardingState((prev) => {
      if (prev.currentStep < 3) {
        const newState = { ...prev, currentStep: prev.currentStep + 1 };
        saveOnboardingState(newState);
        return newState;
      } else {
        // Final step — close modal, start tour
        const newState = {
          ...prev,
          completed: true,
          completedAt: new Date().toISOString(),
          currentStep: 3,
          tourCurrentStep: 1,
        };
        saveOnboardingState(newState);
        // Transition to tour after animation
        setTimeout(() => setPhase("tour"), 600);
        setPhase("done"); // close modal immediately, tour starts after delay
        return newState;
      }
    });
  }, []);

  const handleBack = useCallback(() => {
    setOnboardingState((prev) => {
      if (prev.currentStep > 1) {
        const newState = { ...prev, currentStep: prev.currentStep - 1 };
        saveOnboardingState(newState);
        return newState;
      }
      return prev;
    });
  }, []);

  const handleSkip = useCallback(() => {
    updateState({
      skipped: true,
      skippedAt: new Date().toISOString(),
    });
    setPhase("done");
  }, [updateState]);

  const handleIntegrationsChange = useCallback(
    (integrations: Record<string, boolean>) => {
      updateState({
        connectedIntegrations: {
          github: true,
          gitlab: integrations.gitlab || false,
          slack: integrations.slack || false,
          jira: integrations.jira || false,
        },
      });
    },
    [updateState]
  );

  const handleSettingsChange = useCallback(
    (settings: ReviewSettings) => {
      updateState({ reviewSettings: settings });
    },
    [updateState]
  );

  // Step visibility
  const backVisible = onboardingState.currentStep > 1;
  const skipVisible = onboardingState.currentStep < 3;
  const stepLabels: Record<number, string> = {
    1: "Continue",
    2: "Continue",
    3: "Go to dashboard",
  };

  // Step content
  const getStepContent = () => {
    switch (onboardingState.currentStep) {
      case 1:
        return (
          <Step1Connect
            githubUsername={session?.user?.name || undefined}
            onIntegrationsChange={handleIntegrationsChange}
          />
        );
      case 2:
        return (
          <Step2Settings
            initialSettings={onboardingState.reviewSettings}
            onSettingsChange={handleSettingsChange}
          />
        );
      case 3:
        return <Step3Summary />;
      default:
        return null;
    }
  };

  const showModal = phase === "onboarding";
  const tourActive = phase === "tour";

  return (
    <TourProvider active={tourActive}>
      {children}
      {showModal && (
        <OnboardingModal
          isOpen={true}
          onClose={handleSkip}
          currentStep={onboardingState.currentStep}
          totalSteps={3}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
          nextLabel={
            stepLabels[onboardingState.currentStep] || "Continue"
          }
          backVisible={backVisible}
          skipVisible={skipVisible}
        >
          {getStepContent()}
        </OnboardingModal>
      )}
    </TourProvider>
  );
}
