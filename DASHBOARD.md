# DASHBOARD.md — The Dashboard

## Goal

Build a `/dashboard` page that replicates ElevenLabs' dashboard layout but uses our dark purple design system and shows real GitHub data from the authenticated user.

## The ElevenLabs Layout (from screenshot)

Study this layout carefully. Replicate the STRUCTURE, not the content.

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER BAR (full width, fixed top)                         │
│  Logo + "Home" breadcrumb          Feedback | Docs | Avatar │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                  │
│ SIDEBAR  │  MAIN CONTENT                                    │
│ (fixed   │                                                  │
│  left,   │  ┌─ Announcement Banner ──────────────────────┐  │
│  ~220px) │  │ "New: Introducing Flows  >"                │  │
│          │  └────────────────────────────────────────────┘  │
│ • Home   │                                                  │
│ • Voices │  ┌─ Feature Cards Grid (6 cards, 3 cols) ────┐  │
│ • Studio │  │ ┌──────┐ ┌──────┐ ┌──────┐               │  │
│ • Flows  │  │ │ Card │ │ Card │ │ Card │               │  │
│ • Files  │  │ │ icon │ │ icon │ │ icon │               │  │
│          │  │ │ label│ │ label│ │ label│               │  │
│ ──────── │  │ └──────┘ └──────┘ └──────┘               │  │
│ Pinned:  │  │ ┌──────┐ ┌──────┐ ┌──────┐               │  │
│ • TTS    │  │ │ Card │ │ Card │ │ Card │               │  │
│ • STT    │  │ └──────┘ └──────┘ └──────┘               │  │
│ • Voice  │  └────────────────────────────────────────────┘  │
│   Change │                                                  │
│ • Sound  │  ┌─ Two Column Section ───────────────────────┐  │
│   FX     │  │ "Latest from library"  │ "Create or clone" │  │
│ • Image  │  │  • Item with avatar    │  • Voice Design   │  │
│ • Music  │  │  • Item with avatar    │  • Clone Voice    │  │
│          │  │  • Item with avatar    │                   │  │
│ ──────── │  └────────────────────────────────────────────┘  │
│ • More   │                                                  │
│ • Devs   │                                                  │
└──────────┴──────────────────────────────────────────────────┘
```

Key observations from the screenshot:
- **Sidebar**: Fixed left, full height. Logo at top, primary nav items with icons, a divider, "Pinned" section with more items, another divider, bottom items. Items are simple text + icon, no backgrounds on inactive items.
- **Header**: Thin bar across the top (above main content, beside sidebar). Has breadcrumb-style page title on left, utility buttons (Feedback, Docs, Ask) and user avatar on right.
- **Feature cards**: Grid of 6 cards (3 columns on desktop). Each card has a **light/subtle background**, a **large illustration/icon area** taking most of the card, and a **text label** below. Cards have rounded corners and subtle borders. Generous padding inside.
- **Two-column section below**: Left column is a list with avatars and descriptions. Right column has action cards with icons.

## Adapting for Optimal AI

Map this layout to Optibot's features. The structure is identical, the content changes:

### Sidebar Navigation
| ElevenLabs | Optimal AI |
|-----------|-----------|
| Home | Dashboard |
| Voices | Repositories |
| Studio | Reviews |
| Flows | Insights |
| Files | Settings |
| Pinned: TTS, STT, Voice Changer, Sound FX, Image, Music | Pinned: Recent PRs (dynamic — show user's 5 most recent PRs from GitHub, truncated titles) |
| Developers | Documentation |

The sidebar should show the user's **GitHub avatar and name** at the top (from session data).

### Header Bar
- Left: Sidebar toggle (mobile) + "Dashboard" breadcrumb
- Right: "Docs" link + "Feedback" link + user avatar dropdown (with sign out option)

### Feature Cards Grid (6 cards, 2 or 3 columns)
These are the quick-action cards. Each needs:
- A placeholder icon area (just use a coloured div or simple SVG — no external images)
- A label

| Card | Label | Icon placeholder |
|------|-------|-----------------|
| 1 | Review a PR | Code review icon (use a simple SVG or emoji-based placeholder) |
| 2 | View Insights | Chart/dashboard icon |
| 3 | Security Scan | Shield icon |
| 4 | Browse Repos | Folder/repo icon |
| 5 | Team Activity | People icon |
| 6 | Release Notes | Document icon |

The icon areas should be **large and visual** — taking up most of the card, like ElevenLabs'. Not tiny icons with lots of text. Think big placeholder rectangles with a centered icon inside.

### Two-Column Section Below Cards

**Left column: "Recent Activity"**
Pull real data from GitHub API — the user's most recent PR activity. Show:
- PR title (truncated)
- Repo name
- Status (open/merged/closed)
- Relative timestamp
- Small avatar of the PR author

This should fetch real data using the GitHub access token from the session. API endpoint: `GET /user/repos` then `GET /repos/{owner}/{repo}/pulls`.

Alternatively, use the GitHub Events API: `GET /users/{username}/events` to get recent activity across all repos.

**Right column: "Quick Setup"**
Static cards (like ElevenLabs' "Voice Design" / "Clone your Voice"):
- "Connect a Repository" — CTA to add a repo to Optibot
- "Invite Team Members" — CTA to share with team

## GitHub API Integration

### Fetching data
Create API routes or server components that use the session's `accessToken` to call GitHub:

```typescript
// src/lib/github.ts
export async function fetchUserRepos(accessToken: string) {
  const res = await fetch("https://api.github.com/user/repos?sort=updated&per_page=10", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  return res.json();
}

export async function fetchUserProfile(accessToken: string) {
  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  return res.json();
}

export async function fetchUserEvents(accessToken: string, username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/events?per_page=20`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  return res.json();
}

export async function fetchUserOrgs(accessToken: string) {
  const res = await fetch("https://api.github.com/user/orgs", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  return res.json();
}
```

### What to show
- **User profile**: avatar, name, username — displayed in sidebar
- **Repos**: list of repos sorted by recently updated — displayed in sidebar "pinned" section and in the main area
- **Recent events**: PR opens, reviews, merges — displayed in "Recent Activity" list
- **Orgs**: user's organizations — displayed somewhere in the sidebar or profile area

### Loading states
Show skeleton/placeholder states while data loads. Use the same `--bg-elevated` colour for skeleton blocks. No spinners — just subtle pulsing rectangles (Tailwind's `animate-pulse`).

### Error handling
If GitHub API calls fail, show a graceful error message, not a crash. "Couldn't load repositories — try refreshing."

## Design System

Use the EXACT same design system as the landing page. Everything in the dashboard uses the CSS vars from `globals.css`:

- Page background: `var(--bg-deep)`
- Sidebar background: `var(--bg-surface)`
- Cards: `var(--bg-surface)` with no visible border (per COLOR_DIRECTIVE.md — cards are distinguished by background shift, NOT borders)
- Text: `var(--text-primary)`, `var(--text-secondary)`, `var(--text-muted)`
- Accent: `var(--accent)` for active nav items and interactive highlights
- Border (dividers only): `var(--border-subtle)`

### Card styling (matching ElevenLabs)
- Background: `var(--bg-surface)` — slightly lighter than page
- Border radius: `rounded-[8px]` (ElevenLabs uses ~8-12px on cards)
- **No visible border** — differentiated by background colour only
- Hover: `var(--bg-elevated)` background
- Padding: generous — `p-4` to `p-6`
- The icon/illustration area inside each card should have its own slightly different background: `var(--bg-elevated)`

### Sidebar
- Width: `w-[220px]` fixed on desktop, collapsible on mobile
- Background: `var(--bg-surface)`
- Nav items: `text-[14px]`, `text-[var(--text-secondary)]`, padding `px-3 py-2`
- Active nav item: `text-[var(--text-primary)]` with `bg-[var(--bg-elevated)]` and `rounded-[6px]`
- Icons: use Lucide React (already in the project). Size `18px`, colour matches text.
- Dividers: `border-t border-[var(--border-subtle)]` with `my-3`

### Header bar
- Height: `h-12` to `h-14`
- Background: `var(--bg-deep)` (same as page, so it blends)
- Border bottom: `border-b border-[var(--border-subtle)]`
- Stick it to the top within the main content area (not fixed to viewport — it scrolls with content, or is fixed beside the sidebar)

## File Structure

```
src/app/dashboard/
├── page.tsx              — Main dashboard page (server component, checks session)
├── layout.tsx            — Dashboard layout with sidebar + header
└── loading.tsx           — Skeleton loading state

src/components/dashboard/
├── Sidebar.tsx           — Left sidebar navigation
├── Header.tsx            — Top header bar  
├── FeatureCards.tsx       — 6-card grid
├── RecentActivity.tsx    — Left column, real GitHub data
├── QuickSetup.tsx        — Right column, static CTAs
└── UserProfile.tsx       — Avatar + name for sidebar

src/lib/
├── github.ts             — GitHub API helper functions
```

## Rules
- Use the SAME design system as landing page — no new colours, no new fonts
- Cards have NO visible borders — background shift only (per COLOR_DIRECTIVE.md)
- Real GitHub data where specified — don't fake what we can fetch
- Loading skeletons, not spinners
- The landing page (`/`) must remain completely unchanged
- `npm run build` must pass
- Handle the case where GitHub API returns errors gracefully
- The sidebar should be responsive — full sidebar on desktop, hamburger/drawer on mobile
- User's GitHub avatar should use `next/image` with the GitHub avatar URL
