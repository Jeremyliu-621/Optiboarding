"use client";

import { useState } from "react";
import { ToggleLight } from "./ToggleLight";

export interface ReviewSettings {
  autoReview: boolean;
  autoReviewOnDraft: boolean;
  autoReviewOnPush: boolean;
  autoReviewAfterWorkflow: boolean;
  allowApprove: boolean;
  codeSuggestions: boolean;
}

interface Step2SettingsProps {
  onSettingsChange?: (settings: ReviewSettings) => void;
  initialSettings?: Partial<ReviewSettings>;
}

const defaultSettings: ReviewSettings = {
  autoReview: true,
  autoReviewOnDraft: false,
  autoReviewOnPush: false,
  autoReviewAfterWorkflow: false,
  allowApprove: false,
  codeSuggestions: true,
};

export function Step2Settings({
  onSettingsChange,
  initialSettings,
}: Step2SettingsProps) {
  const [settings, setSettings] = useState<ReviewSettings>({
    ...defaultSettings,
    ...initialSettings,
  });

  const handleSettingChange = (key: keyof ReviewSettings, value: boolean) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    onSettingsChange?.(updated);
  };

  return (
    <div className="w-full space-y-6">
      {/* Headline */}
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#0a0a0a] mb-2">
          How should Optibot review your code?
        </h1>
        <p className="text-[14px] text-[#8a8a8a]">
          You can fine-tune these in Settings at any time.
        </p>
      </div>

      {/* Group 1: Trigger Behaviour */}
      <div className="rounded-[10px] overflow-hidden" style={{ backgroundColor: "#f7f7f7" }}>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8a8a8a] px-5 pt-4 pb-3">
          Trigger Behaviour
        </p>
        <div className="divide-y divide-[#ebebeb]">
          <div className="px-5 py-0.5">
            <ToggleLight
              label="Auto review"
              description="Automatically review every PR when it's opened."
              checked={settings.autoReview}
              onChange={(val) => handleSettingChange("autoReview", val)}
            />
          </div>
          <div className="px-5 py-0.5">
            <ToggleLight
              label="Auto review on draft"
              description="Include draft PRs in automatic reviews."
              checked={settings.autoReviewOnDraft}
              onChange={(val) => handleSettingChange("autoReviewOnDraft", val)}
            />
          </div>
          <div className="px-5 py-0.5">
            <ToggleLight
              label="Auto review on push"
              description="Trigger a new review whenever commits are pushed to an open PR."
              checked={settings.autoReviewOnPush}
              onChange={(val) => handleSettingChange("autoReviewOnPush", val)}
            />
          </div>
          <div className="px-5 py-0.5">
            <ToggleLight
              label="Auto review after workflow"
              description="Only trigger a review after CI passes."
              checked={settings.autoReviewAfterWorkflow}
              onChange={(val) => handleSettingChange("autoReviewAfterWorkflow", val)}
            />
          </div>
        </div>
      </div>

      {/* Group 2: Review Style */}
      <div className="rounded-[10px] overflow-hidden" style={{ backgroundColor: "#f7f7f7" }}>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8a8a8a] px-5 pt-4 pb-3">
          Review Style
        </p>
        <div className="divide-y divide-[#ebebeb]">
          <div className="px-5 py-0.5">
            <ToggleLight
              label="Allow approve"
              description="Optibot can approve PRs that pass all checks without human sign-off."
              checked={settings.allowApprove}
              onChange={(val) => handleSettingChange("allowApprove", val)}
            />
          </div>
          <div className="px-5 py-0.5">
            <ToggleLight
              label="Code suggestions"
              description="Generate inline code suggestions alongside review comments."
              checked={settings.codeSuggestions}
              onChange={(val) => handleSettingChange("codeSuggestions", val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
