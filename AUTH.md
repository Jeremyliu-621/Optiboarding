# AUTH.md — GitHub OAuth

## Goal

Add GitHub OAuth to the site. After signing in, the user is redirected to `/dashboard`. The landing page (`/`) remains public. The dashboard is protected — unauthenticated users get redirected to sign in.

## Approach

Use **NextAuth.js** (the `next-auth` package). It's the standard for Next.js, handles OAuth flow, sessions, and has a built-in GitHub provider.

## Setup Steps

### 1. Install dependencies
```bash
npm install next-auth
```

### 2. Create GitHub OAuth App
The human will need to create a GitHub OAuth App at https://github.com/settings/developers with:
- **Homepage URL**: `http://localhost:3000` (dev) / `https://yourdomain.vercel.app` (prod)
- **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github` (dev) / `https://yourdomain.vercel.app/api/auth/callback/github` (prod)

Store the Client ID and Client Secret in `.env.local`:
```
GITHUB_ID=your_client_id
GITHUB_SECRET=your_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=any_random_string_here
```

Create a `.env.local.example` file documenting these vars so the human knows what to fill in.

### 3. NextAuth route handler
Create `src/app/api/auth/[...nextauth]/route.ts`:
```typescript
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: "read:user read:org repo",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

The `repo` and `read:org` scopes give us access to repos, PRs, and org info. The access token is stored in the session so the dashboard can call the GitHub API.

### 4. Session provider
Wrap the app in a SessionProvider. Create `src/components/Providers.tsx`:
```typescript
"use client";
import { SessionProvider } from "next-auth/react";
export function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```
Use it in `layout.tsx`.

### 5. Auth buttons
- The "Sign in" link in the Navbar should call `signIn("github")`
- The "Get Started — Free" button on the landing page should also call `signIn("github")`
- The dashboard should have a sign-out option via `signOut()`

### 6. Route protection
The `/dashboard` page should check for a session. If no session, redirect to `/` or show a sign-in prompt.

Use `getServerSession` in the dashboard's server component, or use `useSession` client-side with a redirect.

### 7. TypeScript types
Extend the NextAuth types to include `accessToken`:
```typescript
// src/types/next-auth.d.ts
import NextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    accessToken: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
```

### 8. Vercel deployment
On Vercel, set these environment variables:
- `GITHUB_ID`
- `GITHUB_SECRET`
- `NEXTAUTH_URL` = your production URL
- `NEXTAUTH_SECRET` = a random secret (generate with `openssl rand -base64 32`)

Update the GitHub OAuth App's callback URL to the production domain.

## What to Create

- `src/app/api/auth/[...nextauth]/route.ts`
- `src/components/Providers.tsx`
- `src/types/next-auth.d.ts`
- `.env.local.example`
- Update `src/app/layout.tsx` to use Providers
- Update `src/components/Navbar.tsx` to use signIn/signOut
- Create `src/app/dashboard/page.tsx` (the protected dashboard page)

## Rules
- Keep the landing page (`/`) completely unchanged and public
- The dashboard is a NEW route (`/dashboard`)
- Auth should be seamless — click "Sign in", GitHub OAuth flow, redirect to dashboard
- Handle loading states and errors gracefully
- Use the SAME design system (CSS vars, fonts, colours) from the landing page
