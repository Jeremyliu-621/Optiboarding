# CHANGELOG.md

## Previous Session (2026-03-17)
- Hero mockup animation, font consistency, scroll animation removal, spacing fixes

---

## Session: 2026-03-19 Dashboard All-Night Build

### Starting State
- Functional but boring dashboard with grey cards, flat lists, no animations
- Working auth, GitHub data, sidebar navigation
- Dark purple design system in place
- All pages built but visually flat

### Phase 1: Dashboard Home Overhaul
- **FeatureCards**: Complete redesign with per-card gradient backgrounds, SVG illustration compositions (circles, rectangles, arcs), 28px icons in translucent containers, lift + shadow + brightness hover effects
- **Announcement banner**: "NEW — Introducing Optibot v2" with purple badge, links to /dashboard/optibot, dismissible via localStorage
- **Workspace label**: Added org name above time-aware greeting
- **Onboarding welcome modal**: Fires on first visit, shows avatar + welcome message, stored in localStorage
- **Setup checklist**: Progress bar + 4 pill items (Connect GitHub ✓, Add repo, Configure, Invite), all linked to target pages, dismissible

### Phase 2: Page Transitions & Micro-interactions
- **Layout**: Added Framer Motion AnimatePresence with fade+slide transitions on page navigation
- **TabBar**: Animated underline using Framer Motion layoutId spring animation
- **Toggle**: Added CSS transition classes (toggle-track, toggle-thumb) with shadow
- **CSS**: Added pulse-glow keyframes, focus-ring styles, toggle animation classes

### Phase 3: Page-by-Page Polish
- **Optibot**: Pulsing green "Active" indicator, colored stat card icons (purple/blue/orange), green left border on status card, stats now derive from real review count
- **Insights**: Colored icon circles per stat card, grid pattern background in chart area, richer empty state with dual-icon header
- **Integrations/GitHub**: Green left border on connected card, language color dots + language name on each repo row, "View stats" links to Insights, Active badge uses green instead of purple
- **Integrations/GitLab**: Orange-tinted icon background, fixed duplicate Shield icon → GitMerge
- **Integrations/Slack**: Purple-tinted icon background, each feature card uses its own icon (Bell/MessageSquare/Terminal/Hash) instead of generic Check
- **Codebase Map**: Dot grid background pattern, SVG connection lines between nodes, hover cards lift with shadow, connection handles use accent color
- **Organization**: Added "Popular" badge to Pro plan card
- **Configuration/Settings**: Added "Saved" indicator on toggle change, asterisk footnote explaining billing impact

### Phase 4: Component Upgrades
- **StatCard**: Added iconColor/iconBg props for per-card color customization, hover state
- **FeatureCard**: Added hover lift + shadow, iconColor/iconBg props
- **FormInput/FormTextarea**: Added focus shadow ring (purple glow)
- **EmptyState**: Enhanced with larger icon container
- **QuickSetup**: Items are now links to target pages
- **RecentActivity**: Added user avatars from GitHub API, proper empty state with icon + CTA link, retry button on error
- **Header**: Dynamic page title from pathname

### Phase 5: Responsive & Infrastructure
- **Layout**: Responsive sidebar — no left margin on mobile (<1024px), proper padding scale (px-4/sm:px-6/lg:px-8)
- **Sidebar**: Added plan/usage indicator (Free plan 0/50 with progress bar)

### Evaluator Round 1 Results
- New User: 6/10 → Fixed dead-end buttons, removed fake stats, added navigation to all CTAs
- Design Critic: 7/10 → Added micro-accent borders, increased illustration opacity, diversified icons
- ElevenLabs Comparison: Added avatars to activity, colored badges, plan indicator

### Phase 6: Command Palette & Navigation (continued session)
- **Header**: Added search bar with ⌘K shortcut + command palette overlay with page navigation, filtering, ESC to close
- **Header**: Added notification bell icon (coming soon state), converted Docs to external link, Feedback to mailto
- **Header**: Responsive — search bar hidden on small screens, text labels hidden on mobile
- **Sidebar**: Added sign-out button (LogOut icon) next to user profile in both expanded and collapsed states
- **FeatureCards**: Diversified illustrations — 6 unique shape variants (circles, hexagonal, waves, grid, orbital, diamond) instead of same circles everywhere
- **FeatureCards**: Added Framer Motion staggered mount animation (fade + slide up, 60ms stagger)
- **FeatureCards**: Fixed Release Notes href → /dashboard/configuration/guidelines (was /dashboard/insights)

### Phase 7: Trust & Dead-End Fixes (Evaluator Round 2)
- **Setup checklist**: All items now start done:false, track real completion via localStorage per-item. Shows completion count (0/3)
- **Setup checklist**: Removed "Add a repository" (redundant with "Connect GitHub"), now 3 items
- **Notification bell**: Removed misleading red dot, added "coming soon" tooltip
- **ARIA labels**: Added to bell icon, sidebar sign-out buttons, sidebar collapse toggle
- **Codebase Map**: "Save Map" button → disabled with "Coming soon" tooltip
- **Slack**: "Connect workspace" → disabled with "coming soon" text
- **GitLab/Jira**: Form submits now show "Connection saved — verification pending" instead of silent console.log
- **Organization General**: Form shows "Saved" indicator on submit
- **Organization Billing**: "Contact Support" → mailto link
- **Organization Plans**: "Contact Sales" → mailto link, "Upgrade" shows tooltip
- **Organization**: Removed unused imports (Building2, Zap)

### Evaluator Round 2 Results
- New User: 6.5/10 → Fixed all actionable findings (dead ends, trust issues, ARIA)
- Design Critic: Rate limited
- ElevenLabs Comparison: Rate limited

### Phase 8: Navigation & Hub Pages
- **Integrations hub page**: Replaced redirect with proper hub showing all 4 integrations as cards with icons, connection status, descriptions, and chevron links
- **Configuration hub page**: Replaced redirect with proper hub showing Settings and Guidelines with colored icons and descriptions
- **Sidebar section headings**: "Integrations" and "Configuration" now clickable links to their hub pages
- **Command palette**: Added Integrations and Configuration hub pages to search results
- **Header pageTitles**: Added entries for /dashboard/integrations and /dashboard/configuration

### Phase 9: Keyboard Navigation & Accessibility
- **Command palette**: Full arrow key navigation (↑/↓ to cycle, Enter to select), active item highlight with accent color icon, ↵ hint on focused item, mouse hover updates active index, query reset resets active index
- **RepoSelector**: Added keyboard navigation (Arrow keys, Enter, Escape), ARIA attributes (aria-haspopup, aria-expanded, aria-label, role=listbox, role=option, aria-selected), mouse hover updates active index

### Phase 10: Loading & Visual Polish
- **Shimmer animation**: Added CSS shimmer keyframes (gradient sweep) as premium alternative to animate-pulse. Applied to all loading skeletons across dashboard: layout skeleton, RecentActivity, Optibot reviews, GitHub repos, Codebase Map nodes, Organization members/general tab
- **Accent glow**: Added .accent-glow CSS utility class for subtle purple glow
- **Insights chart**: Added decorative SVG chart lines (3 faint curves in accent/blue/green) behind the empty state for visual character
- **Optibot empty state**: Upgraded with decorative concentric circles, accent-colored Bot icon in accent-muted container, CTA link to connect repository
- **QuickSetup**: Redesigned with colored icon containers (green/purple/blue), numbered steps (Step 1/2/3), hover accent color on labels, added "Configure Optibot" as step 2
- **RecentActivity**: Added Framer Motion staggered mount animation (fade + slide left, 40ms stagger) for activity items

### Build Status
`npm run build` ✓ passes — 0 errors, all 17 routes generated
