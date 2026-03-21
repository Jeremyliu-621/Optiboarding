# Onboarding System — Task Tracker

## ONBOARD_00: Repo Audit
- [x] Read existing OnboardingWizard.tsx (5-step, dark bg — needs replacement)
- [x] Read existing WelcomeModal + SetupChecklist in dashboard/page.tsx
- [x] Read auth flow (NextAuth GitHub OAuth, session.user.name/image, accessToken)
- [x] Read dashboard layout.tsx (sidebar + header + main, client component)
- [x] Read globals.css (CSS vars, dark design system)
- [x] Read package.json (framer-motion, lucide-react, next-auth)

## ONBOARD_01: Modal Foundation
- [x] Created OnboardingModal.tsx shell component
- [x] Backdrop: `rgba(0,0,0,0.5)` — no blur (fixed)
- [x] Box shadow: `0 24px 64px rgba(0,0,0,0.4)` (fixed)
- [x] Back button: plain text `← Back` (fixed, removed ChevronLeft)
- [x] Removed unused `SkipForward` import (fixed)
- [x] Progress bar: right-aligned, fixed 160px width (fixed)
- [x] Logo top-left ✓
- [x] Progress bar top-right ✓
- [x] Bottom bar with back/skip/CTA ✓
- [x] Framer Motion AnimatePresence ✓
- [x] Step content crossfade ✓
- [x] Padding per spec: top bar 28px 36px 0, content 48px 80px 32px, bottom 20px 36px ✓

## ONBOARD_02: Step 1 — Connect GitHub
- [x] Welcome headline in brand purple ✓
- [x] GitHub Connected chip with @handle ✓
- [x] Optional integrations (GitLab, Slack, Jira) ✓
- [x] Simulate-connect with spinner ✓
- [x] Left-aligned layout ✓

## ONBOARD_03: Step 2 — Settings
- [x] Two grouped sections (Trigger Behaviour, Review Style) ✓
- [x] 6 independent toggles ✓
- [x] Light-themed ToggleLight component ✓
- [x] Default states correct ✓
- [x] Callback to parent ✓

## ONBOARD_04: Step 3 — Summary
- [x] Two-column layout ✓
- [x] Numbered circles with connecting lines ✓
- [x] Dashboard preview mockup with 3D tilt ✓
- [x] Radial gradient halo ✓
- [x] Headline: bold "You're all set." + muted subtitle ✓

## ONBOARD_05: Integration
- [x] OnboardingProvider.tsx with localStorage persistence ✓
- [x] Schema matches spec (OnboardingState interface) ✓
- [x] First-login detection ✓
- [x] Skip with 7-day cooldown ✓
- [x] Provider always renders children (phase state machine, never returns null) ✓
- [x] DEV_ALWAYS_SHOW mode for testing ✓
- [x] Tour starts after onboarding via phase transition (600ms delay) ✓

## ONBOARD_06: Tour Foundation
- [x] TourProvider.tsx with context ✓
- [x] TourPanel.tsx floating card ✓
- [x] TourContext.ts + useTour() hook ✓
- [x] TourTypes.ts with step definitions ✓
- [x] Sidebar highlight integration ✓
- [x] TourProvider accepts `active` prop from OnboardingProvider ✓
- [x] Tour starts when active becomes true ✓

## ONBOARD_07: Tour Steps
- [x] All 6 steps defined ✓
- [ ] Step data could be moved to src/lib/tourSteps.ts (minor refactor)

## ONBOARD_08: Page Overlays
- [x] PageOverlay.tsx generic component ✓
- [x] overlayDefs.tsx with per-page content ✓
- [x] PageOverlayDisplay.tsx render wrapper ✓
- [x] Overlays wired into TourProvider (rendered alongside TourPanel) ✓
- [ ] PageOverlay left position: hardcoded 220px — should be dynamic based on sidebar collapsed state

## ONBOARD_09: Polish
- [ ] Whitespace/padding audit against Stripe reference
- [ ] Animation timing audit (see spec for exact durations)
- [ ] Toggle appearance on white bg verification
- [ ] Sidebar highlight pulse animation (1.5-2s period, subtle)
- [ ] Tour panel gradient contrast check
- [ ] Page overlay gradient fade smoothness (100-120px transition)
- [ ] Right-column CSS previews readability check

## ONBOARD_10: Final Audit
- [ ] End-to-end flow test (clear localStorage, full 3-step onboarding, full 6-step tour)
- [ ] All animations feel smooth and intentional
- [ ] No layout shifts on overlay dismiss
- [ ] Tour state persists correctly in localStorage
- [ ] Skip cooldown works (7 days)
- [ ] Build passes

---

## Next Steps (Priority Order)
1. ~~Fix OnboardingProvider~~ ✓ Done
2. ~~Add DEV_ALWAYS_SHOW~~ ✓ Done
3. ~~Fix OnboardingModal visuals~~ ✓ Done
4. ~~Wire page overlays into TourProvider~~ ✓ Done
5. ~~Fix tour start timing~~ ✓ Done
6. Polish pass per ONBOARD_09 — IN PROGRESS
7. End-to-end flow test per ONBOARD_10
