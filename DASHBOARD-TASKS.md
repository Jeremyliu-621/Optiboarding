# DASHBOARD-TASKS.md

## Goal

Add GitHub OAuth and build a working dashboard at `/dashboard`. The dashboard replicates ElevenLabs' layout structure but uses our dark purple design system and shows real GitHub data. See AUTH.md for auth spec and DASHBOARD.md for the dashboard spec.

The landing page (`/`) must remain completely unchanged.

---

## Phase 1: Auth Setup

- [ ] Install `next-auth`
- [ ] Create `.env.local.example` with all required vars documented
- [ ] Create NextAuth route handler with GitHub provider (scopes: `read:user`, `read:org`, `repo`)
- [ ] Store the GitHub access token in the session via JWT callback
- [ ] Create TypeScript type extensions for NextAuth session
- [ ] Create SessionProvider wrapper component
- [ ] Wrap app layout in SessionProvider
- [ ] Update Navbar "Sign in" to call `signIn("github")`
- [ ] Verify: clicking Sign In starts GitHub OAuth flow (need real GITHUB_ID/SECRET in .env.local to test)

## Phase 2: Dashboard Layout

- [ ] Create `src/app/dashboard/layout.tsx` with sidebar + header + main content area
- [ ] Create `src/app/dashboard/page.tsx` — protected, redirects to `/` if no session
- [ ] Build Sidebar component — logo, nav items with Lucide icons, dividers, user profile at top
- [ ] Build Header component — breadcrumb + utility buttons + avatar
- [ ] Build responsive sidebar (full on desktop, drawer on mobile)
- [ ] Verify: the dashboard layout matches ElevenLabs' structure (sidebar left, header top, main content center)

## Phase 3: Feature Cards

- [ ] Build the 6-card grid (Review a PR, View Insights, Security Scan, Browse Repos, Team Activity, Release Notes)
- [ ] Each card has a large icon/illustration area + label — matching ElevenLabs' proportions
- [ ] Cards use `var(--bg-surface)` with NO visible border, hover state `var(--bg-elevated)`
- [ ] Grid is 3 columns on desktop, 2 on tablet, 1 on mobile

## Phase 4: GitHub Data Integration

- [ ] Create `src/lib/github.ts` with API helper functions (fetchUserProfile, fetchUserRepos, fetchUserEvents, fetchUserOrgs)
- [ ] Fetch user profile — display avatar + name in sidebar
- [ ] Fetch user repos — display in sidebar "Pinned" / recent repos section
- [ ] Fetch user events — display in "Recent Activity" list (PR opens, reviews, merges)
- [ ] Fetch user orgs — display in sidebar or profile area
- [ ] Add loading skeletons for all data-dependent sections
- [ ] Add error handling for failed API calls

## Phase 5: Content Sections

- [ ] Build "Recent Activity" section (left column below cards) — shows real PR/event data from GitHub
- [ ] Build "Quick Setup" section (right column below cards) — static CTA cards
- [ ] Two-column layout matching ElevenLabs' bottom section

## Phase 6: Polish

- [ ] Add sign-out functionality (in avatar dropdown or sidebar)
- [ ] Add `src/app/dashboard/loading.tsx` with full-page skeleton
- [ ] Verify all design system tokens are consistent (check COLOR_DIRECTIVE.md)
- [ ] Test: sign in → dashboard loads with real data → sign out → redirected to `/`
- [ ] `npm run build` — must pass
- [ ] Verify landing page (`/`) is completely unchanged

---

## Environment Variables Needed

Tell the human to set these up:

```
GITHUB_ID=           # From GitHub OAuth App
GITHUB_SECRET=       # From GitHub OAuth App  
NEXTAUTH_URL=        # http://localhost:3000 for dev
NEXTAUTH_SECRET=     # Run: openssl rand -base64 32
```

For Vercel deployment, set the same vars in the Vercel dashboard and update the GitHub OAuth App callback URL to the production domain.

## Next.js Config

Add GitHub's avatar domain to `next.config.ts` for `next/image`:
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};
```

## Rules
- Do NOT touch the landing page or any existing components
- Use the existing design system (CSS vars from globals.css)
- No visible borders on cards — background shift only
- Real GitHub data where specified
- Loading skeletons, not spinners
- Handle errors gracefully
- `npm run build` must pass
