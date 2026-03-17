# CHECKLIST.md — Quick Reference: Before → After

---

## Global Changes

| What | Current | Change To |
|------|---------|-----------|
| Section container bg | `bg-[#f5f5f5]` | `bg-[#f7f7f7]` |
| Section container radius | `rounded-[32px]` | `rounded-[16px]` |
| Section container border | `border border-[#ebebeb]` | `border border-black/[0.04]` |
| Section heading size | `text-[36px]` | `text-[26px]` |
| Section description size | `text-[18px]` | `text-[15px]` |
| Section link size | `text-[16px]` | `text-[14px]` |
| Description margin | `mt-5` | `mt-4` |
| Link margin | `mt-8` | `mt-6` |

---

## Hero.tsx

| What | Current | Change To |
|------|---------|-----------|
| Heading sizes | `text-[0.5rem] ... lg:text-[2rem]` | `text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px]` |
| Mockup card radius | `rounded-[1rem]` | `rounded-[12px]` |

## AgentFeatures.tsx

| What | Current | Change To |
|------|---------|-----------|
| Text column flex | `flex-1` | `flex-[0.45]` + `max-w-[420px]` |
| Mockup column flex | `flex-[1.1]` | `flex-1` |
| Container min-height | (none) | `min-h-[640px]` |

## FeatureGrid.tsx

| What | Current | Change To |
|------|---------|-----------|
| Text column flex | `flex-1` | `flex-[0.45]` |
| Mockup column flex | `flex-[1.2]` | `flex-1` |
| Text max-width | `max-w-[500px]` | `max-w-[400px]` |
| Mockup max-width | `max-w-[540px]` | Remove entirely |
| Mockup padding | `p-8 lg:p-12` | `p-4 lg:p-6` |
| Container min-height | `min-h-[500px]` | `min-h-[580px]` |

## LogoWall.tsx

| What | Current | Change To |
|------|---------|-----------|
| Padding | `py-20` | `py-14` |
| Logo text | `font-bold text-xl md:text-2xl` | `font-semibold text-lg md:text-xl` |

## Footer.tsx

| What | Current | Change To |
|------|---------|-----------|
| CTA heading | `text-4xl md:text-5xl` | `text-[32px] md:text-[40px]` |
| Top padding | `pt-32` | `pt-24` |
| Bottom padding | `pb-16` | `pb-12` |
