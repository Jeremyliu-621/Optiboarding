# PLAN.md — Dashboard All-Night Build

## Phase 1: Dashboard Home Overhaul (HIGH IMPACT)
1. Announcement banner ("NEW — Introducing Optibot v2 >") — dismissible, localStorage
2. Workspace label above greeting
3. Redesign FeatureCards with unique accent colors + larger icons + SVG illustration compositions
4. Polish hover states (lift, glow, color shift)
5. Improve bottom section layout

## Phase 2: Onboarding Flow
1. Welcome modal on first visit (localStorage check)
2. Setup checklist (Connect GitHub ✓ | Add repo | Configure Optibot | Invite teammate)
3. Personality in empty states across all pages

## Phase 3: Page Transitions & Micro-interactions
1. Framer Motion AnimatePresence in dashboard layout for page transitions
2. Hover states on EVERY interactive element
3. Focus states on all form elements
4. Subtle pulse on Optibot "Active" indicator

## Phase 4: Page-by-Page Polish
1. Integrations: Brand colors per tab, connected vs not-connected visual distinction
2. Configuration: Satisfying toggle animations, section dividers
3. Insights: Colored stat cards, rich empty state
4. Codebase Map: Interactive hover, visual connections
5. Organization: Polished forms, smooth tab transitions
6. Optibot: Glowing Active indicator, colored status badges

## Phase 5: Loading & Error States
1. Skeleton loaders on every data section
2. Error states with retry buttons

## Phase 6: Responsive Polish
1. Sidebar collapse on tablet
2. Feature cards reflow
3. Forms stack

## Phase 7: Evaluate & Iterate
1. Run 3 evaluator agents
2. Find gaps, fix them
3. Compare against ElevenLabs again
