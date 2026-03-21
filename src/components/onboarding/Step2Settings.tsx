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
    <div className="w-full max-w-[540px] mx-auto space-y-6">
      {/* Headline */}
      <div>
        <h1
          className="text-[28px] font-bold tracking-[-0.02em] mb-2"
          style={{ color: "hsl(275, 8%, 88%)" }}
        >
          How should Optibot review your code?
        </h1>
        <p className="text-[14px]" style={{ color: "hsl(275, 6%, 58%)" }}>
          You can fine-tune these in Settings at any time.
        </p>
      </div>

      {/* Group 1: Trigger Behaviour */}
      <div
        className="rounded-[10px] overflow-hidden"
        style={{ background: "hsl(275, 10%, 16%)", border: "1px solid hsl(275, 10%, 22%)" }}
      >
        <p
          className="text-[11px] font-semibold uppercase px-5 pt-4 pb-3"
          style={{ letterSpacing: "0.08em", color: "hsl(275, 5%, 42%)" }}
        >
          Trigger Behaviour
        </p>
        <div style={{ borderTop: "1px solid hsl(275, 8%, 20%)" }}>
          {[
            { key: "autoReview" as const, label: "Auto review", description: "Automatically review every PR when it's opened." },
            { key: "autoReviewOnDraft" as const, label: "Auto review on draft", description: "Include draft PRs in automatic reviews." },
            { key: "autoReviewOnPush" as const, label: "Auto review on push", description: "Trigger a new review whenever commits are pushed to an open PR." },
            { key: "autoReviewAfterWorkflow" as const, label: "Auto review after workflow", description: "Only trigger a review after CI passes." },
          ].map((item, i) => (
            <div
              key={item.key}
              className="px-5 py-0.5"
              style={i > 0 ? { borderTop: "1px solid hsl(275, 8%, 20%)" } : undefined}
            >
              <ToggleLight
                label={item.label}
                description={item.description}
                checked={settings[item.key]}
                onChange={(val) => handleSettingChange(item.key, val)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Group 2: Review Style */}
      <div
        className="rounded-[10px] overflow-hidden"
        style={{ background: "hsl(275, 10%, 16%)", border: "1px solid hsl(275, 10%, 22%)" }}
      >
        <p
          className="text-[11px] font-semibold uppercase px-5 pt-4 pb-3"
          style={{ letterSpacing: "0.08em", color: "hsl(275, 5%, 42%)" }}
        >
          Review Style
        </p>
        <div style={{ borderTop: "1px solid hsl(275, 8%, 20%)" }}>
          {[
            { key: "allowApprove" as const, label: "Allow approve", description: "Optibot can approve PRs that pass all checks without human sign-off." },
            { key: "codeSuggestions" as const, label: "Code suggestions", description: "Generate inline code suggestions alongside review comments." },
          ].map((item, i) => (
            <div
              key={item.key}
              className="px-5 py-0.5"
              style={i > 0 ? { borderTop: "1px solid hsl(275, 8%, 20%)" } : undefined}
            >
              <ToggleLight
                label={item.label}
                description={item.description}
                checked={settings[item.key]}
                onChange={(val) => handleSettingChange(item.key, val)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
