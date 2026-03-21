# Optimal AI — Onboarding & Guided Tour: Build Tasks

## Overview
This is a multi-phase overnight build job. You are implementing two distinct but related systems:

**Phase 1: First-Login Onboarding Modal Flow**
A Stripe-inspired multi-step modal sequence that fires once when a new user authenticates for the first time. Large, full-screen-dimmed modals. Polished, whitespace-rich, confidence-inspiring.

**Phase 2: Post-Onboarding Guided Tour**
After onboarding completes, a contextual in-app guidance system walks the user through the dashboard — highlighting sidebar items, opening pages, and showing explanatory overlays with gradient panels. Stripe's "Next, verify your business" overlay meets a sidebar walkthrough.

## Task Files (execute in order)
```
ONBOARD_00_audit.md              — Explore repo, understand existing onboarding, map files
ONBOARD_01_modal_foundation.md   — Build the modal shell: overlay, sizing, logo, progress, nav
ONBOARD_02_step_github.md        — Step 1: Connect GitHub + optional other apps
ONBOARD_03_step_settings.md      — Step 2: Configure default review settings
ONBOARD_04_step_sandbox.md       — Step 3: Get started summary screen (Stripe Step 3 clone)
ONBOARD_05_integration.md        — Wire modal into auth flow, persistence, state management
ONBOARD_06_tour_foundation.md    — Build the guided tour engine: spotlight, tooltips, overlays
ONBOARD_07_tour_steps.md         — Define all tour steps: dashboard → optibot → insights → settings → guidelines → codebase map
ONBOARD_08_tour_page_overlays.md — Per-page gradient explanation panels (image 5 reference)
ONBOARD_09_polish_iteration.md   — Full QA pass, animation polish, edge cases
ONBOARD_10_final_audit.md        — Final cross-system audit
```

## Reference Images (study these before building)
- Image 1: Stripe Step 1 — large modal, white bg, logo TL, progress bar TR, form fields, bottom nav bar
- Image 2: Stripe Step 2 — same modal, radio option cards, "Back" link bottom left, "Skip / Continue" bottom right
- Image 3: Stripe Step 3 — two-column layout, numbered steps left, UI preview mockup right, "Go to sandbox" CTA
- Image 4: Stripe post-onboarding dashboard — gradient overlay panel bottom-right, highlighted setup steps, real content behind it
- Image 5: Optibot settings panel — clean dark card, section title, toggle rows with label + description
- Image 6: Optimal AI dashboard home (current state)
- Image 7: Optimal AI dashboard with "Getting Started" checklist visible

## Non-Negotiable Rules
- The modal uses a WHITE background (not the dark design system) — this is intentional. Onboarding is a distinct visual context, like Stripe's.
- The guided tour overlays MUST respect the existing dark design system — they sit ON TOP of the dashboard
- No `window.alert()`, no `window.confirm()`
- All state persisted via localStorage key `optimal-ai-onboarding-v1` — structure defined in ONBOARD_05
- Every interactive element must work — no placeholder handlers
- Iterate on each component until it matches the quality bar. Don't move on if it looks vibe-coded.
