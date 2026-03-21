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
- [ ] **FIX**: Backdrop uses backdrop-blur-md — spec says `rgba(0,0,0,0.5)` only, keep subtle blur
- [ ] **FIX**: Box shadow too weak — spec says try `0 24px 64px rgba(0,0,0,0.4)`
- [ ] **FIX**: "← Back" should be plain text `← Back`, not ChevronLeft icon
- [ ] **FIX**: Unused `SkipForward` import
- [ ] **FIX**: Progress bar should be right-aligned (not flex-1 with mx-12)
- [x] Logo top-left ✓
- [x] Progress bar top-right ✓
- [x] Bottom bar with back/skip/CTA ✓
- [x] Framer Motion AnimatePresence ✓
- [x] Step content crossfade ✓

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
- [ ] **FIX**: Headline should match Stripe style — bold first line, muted second line

## ONBOARD_05: Integration
- [x] OnboardingProvider.tsx with localStorage persistence ✓
- [x] Schema matches spec (OnboardingState interface) ✓
- [x] First-login detection ✓
- [x] Skip with 7-day cooldown ✓
- [ ] **CRITICAL FIX**: Provider returns null when loading — kills all children
- [ ] **FIX**: Always show modal for testing (dev mode)
- [ ] **FIX**: Tour doesn't actually start after onboarding finishes

## ONBOARD_06: Tour Foundation
- [x] TourProvider.tsx with context ✓
- [x] TourPanel.tsx floating card ✓
- [x] TourContext.ts + useTour() hook ✓
- [x] TourTypes.ts with step definitions ✓
- [x] Sidebar highlight integration ✓
- [ ] **FIX**: Tour start after onboarding doesn't work (timing issue)
- [ ] **FIX**: TourProvider doesn't react to initialTourStep changes

## ONBOARD_07: Tour Steps
- [x] All 6 steps defined ✓
- [ ] **FIX**: Step data should be in src/lib/tourSteps.ts (spec says this)
- [ ] Page overlays not wired up to actual pages

## ONBOARD_08: Page Overlays
- [x] PageOverlay.tsx generic component ✓
- [x] overlayDefs.tsx with per-page content ✓
- [x] PageOverlayDisplay.tsx render wrapper ✓
- [ ] **CRITICAL FIX**: Overlays not rendered anywhere — need to wire into TourProvider
- [ ] **FIX**: PageOverlay position needs to account for sidebar width

## ONBOARD_09: Polish
- [ ] Not started — all fixes above must happen first

## ONBOARD_10: Final Audit
- [ ] Not started

---

## Next Steps (Priority Order)
1. Fix OnboardingProvider so it always renders children (never returns null for layout)
2. Add DEV_ALWAYS_SHOW mode so modal + tour always appear
3. Fix OnboardingModal visual issues (shadow, back button text, progress bar)
4. Wire page overlays into TourProvider so they actually render
5. Fix tour start timing after onboarding completes
6. Polish pass per ONBOARD_09
7. End-to-end flow test per ONBOARD_10
