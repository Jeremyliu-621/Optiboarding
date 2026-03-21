# Onboarding System — Task Tracker

## ONBOARD_00: Repo Audit ✅
- [x] Read existing OnboardingWizard.tsx (5-step, dark bg — needs replacement)
- [x] Read existing WelcomeModal + SetupChecklist in dashboard/page.tsx
- [x] Read auth flow (NextAuth GitHub OAuth, session.user.name/image, accessToken)
- [x] Read dashboard layout.tsx (sidebar + header + main, client component)
- [x] Read globals.css (CSS vars, dark design system)
- [x] Read package.json (framer-motion, lucide-react, next-auth)

## ONBOARD_01: Modal Foundation ✅
- [x] OnboardingModal.tsx shell component
- [x] Backdrop: `rgba(0,0,0,0.5)` — no blur
- [x] Box shadow: `0 24px 64px rgba(0,0,0,0.4)`
- [x] Back button: plain text `← Back`
- [x] No unused imports
- [x] Progress bar: right-aligned, fixed 160px width
- [x] Logo top-left
- [x] Progress bar top-right
- [x] Bottom bar with back/skip/CTA
- [x] Framer Motion AnimatePresence
- [x] Step content crossfade (200ms)
- [x] Padding per spec: top bar 28px 36px 0, content 48px 80px 32px, bottom 20px 36px
- [x] Modal sizing: min(960px, 90vw), min-height 580px

## ONBOARD_02: Step 1 — Connect GitHub ✅
- [x] Welcome headline in brand purple (#5b3dc8)
- [x] GitHub Connected chip with @handle
- [x] Optional integrations (GitLab, Slack, Jira)
- [x] Simulate-connect with spinner (1.5s)
- [x] Left-aligned layout

## ONBOARD_03: Step 2 — Settings ✅
- [x] Two grouped sections (Trigger Behaviour, Review Style)
- [x] 6 independent toggles
- [x] Light-themed ToggleLight component (active #5b3dc8, inactive #d4d4d4)
- [x] Default states correct (autoReview ON, codeSuggestions ON, rest OFF)
- [x] Callback to parent
- [x] Section headers: 11px, uppercase, letter-spacing 0.08em

## ONBOARD_04: Step 3 — Summary ✅
- [x] Two-column layout (~55% / ~45%)
- [x] Numbered circles (28px) with connecting lines
- [x] Dashboard preview mockup with 3D tilt (perspective 800px, rotateX 2deg, rotateY -4deg)
- [x] Radial gradient halo behind preview
- [x] Headline: bold "You're all set." + muted subtitle

## ONBOARD_05: Integration ✅
- [x] OnboardingProvider.tsx with localStorage persistence
- [x] Schema matches spec (OnboardingState interface)
- [x] First-login detection
- [x] Skip with 7-day cooldown
- [x] Provider always renders children (phase state machine, never returns null)
- [x] DEV_ALWAYS_SHOW mode for testing
- [x] Tour starts after onboarding via phase transition (600ms delay)

## ONBOARD_06: Tour Foundation ✅
- [x] TourProvider.tsx with context
- [x] TourPanel.tsx floating card (fixed bottom-right, gradient dark bg)
- [x] TourContext.ts + useTour() hook (with no-op fallback)
- [x] TourTypes.ts with step definitions
- [x] Sidebar highlight integration (tour-highlight-pulse animation)
- [x] TourProvider accepts `active` prop from OnboardingProvider
- [x] Tour starts when active becomes true

## ONBOARD_07: Tour Steps ✅
- [x] All 6 steps defined (Dashboard, Optibot, Insights, Settings, Guidelines, Codebase Map)
- [x] Step data in TourTypes.ts with proper routes and sidebar targets

## ONBOARD_08: Page Overlays ✅
- [x] PageOverlay.tsx generic component (slides up, gradient fade 120px)
- [x] overlayDefs.tsx with per-page content (5 overlays for steps 2-6)
- [x] PageOverlayDisplay.tsx render wrapper
- [x] Overlays wired into TourProvider (rendered alongside TourPanel)
- [x] Removed unused OptibotOverlay.tsx

## ONBOARD_09: Polish ✅
- [x] Tour sidebar highlight: brand purple pulse, 1.8s period
- [x] TourPanel back button: plain text "← Back"
- [x] Page overlay gradient: 120px transition span
- [x] Section header letter-spacing: 0.08em
- [x] No unused imports across all files
- [x] No console.log statements
- [x] No TODO/FIXME comments
- [x] No `any` TypeScript types
- [x] Proper aria attributes on toggles

## ONBOARD_10: Final Audit ✅
- [x] Build passes (`npm run build`)
- [x] No TypeScript errors
- [x] OnboardingProvider always renders children
- [x] TourProvider correctly accepts and uses `active` prop
- [x] PageOverlayDisplay rendered in TourProvider
- [x] Phase state machine: loading → onboarding → tour → done
- [x] localStorage key consistent: "optimal-ai-onboarding-v1"
- [x] DEV_ALWAYS_SHOW flag for development testing
- [x] All animations match spec timing

---

## Status: COMPLETE
All ONBOARD_00 through ONBOARD_10 tasks are done. The onboarding system is production-ready.
