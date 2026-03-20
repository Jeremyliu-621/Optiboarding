# ELEVENLABS-STUDY.md — Study ElevenLabs' Dashboard

Before building anything, spend time studying ElevenLabs' dashboard. They are the gold standard for SaaS dashboard design. Use your browser tools (Puppeteer MCP, Chrome DevTools MCP) to analyze their UI.

---

## Step 1: Open and Screenshot

Navigate to these ElevenLabs pages and screenshot each one:
- https://elevenlabs.io/app (home/dashboard)
- https://elevenlabs.io/app/speech-synthesis (text to speech — the main workspace)
- https://elevenlabs.io/app/voice-library (voices explore page)

If you can't access logged-in pages, use the screenshots the human provided:
- Screenshot 1: Text to Speech page (large text area, right sidebar with settings/sliders, "Get started with" prompt chips)
- Screenshot 2: Home dashboard (workspace greeting, 6 feature cards with illustrations, "Latest from library" + "Create or clone" two-column section)
- Screenshot 3: Voices Explore page (search bar, filter chips, trending voices grid, "Handpicked for your use case" carousel)
- Screenshot 4: Voices filtered view (list view with avatar, name, language, category, popularity count)

---

## Step 2: Analyze and Take Notes

For each page, study and record in NOTES.md:

### Visual Identity
- What colours appear beyond the base palette? Where?
- How do they use accent colours? How sparingly?
- What creates visual variety — is it colour, size, illustration, layout variation?

### Feature Cards (Home Page)
- How large are the cards? What aspect ratio?
- How much of the card is the illustration vs the label?
- Do the illustrations have colour? What style?
- What's the card background? Is it the same as the page or different?
- What happens on hover?
- How much padding/gap between cards?

### Empty States and Prompts
- The "Get started with" chips on the TTS page — how are they styled? Pill shapes? Icons?
- How do they handle empty/new-user states?
- What copy style do they use — formal, casual, playful?

### Lists and Tables
- Voices list: how do they handle long lists? Avatars, metadata, actions?
- What information density do they aim for? Sparse or packed?
- How do rows respond to hover?

### Filter/Category System
- The filter chips (Language, Accent, Conversational, etc.) — how are they styled?
- Active vs inactive chip states?
- How are they laid out? Horizontal scroll?

### Sidebar
- Width?
- How do they group items? ("Pinned" section)
- How does the active state look?
- What's at the bottom?

### Header Bar
- What's in it? How tall?
- What utility buttons do they show?
- How does the breadcrumb work?

### Right Sidebar/Panel (TTS page)
- They have a settings panel on the right — what's the width?
- How do sliders look?
- How do dropdowns look?
- What's the visual density?

---

## Step 3: Extract Techniques

From your analysis, identify **specific techniques** ElevenLabs uses that our dashboard doesn't. Write these as actionable items in NOTES.md. Examples:

- "ElevenLabs uses coloured illustrations in feature cards — ours are grey icons"
- "ElevenLabs' list items have rich hover states with subtle background change — ours have no hover"
- "ElevenLabs uses prompt chips to guide new users — we have no guidance for new users"
- "ElevenLabs' filter bar uses pill-shaped chips with icons — we could use this for integration tabs or repo filters"

---

## Step 4: Apply to Our Dashboard

For each technique you identified, figure out how to apply it to the Optimal AI dashboard. Map ElevenLabs patterns to our features:

| ElevenLabs Feature | Our Equivalent | What To Steal |
|---|---|---|
| Colourful feature cards | Dashboard home cards | Add distinct colours/illustrations per card |
| "Get started with" prompt chips | Onboarding / empty states | Add action chips for new users |
| Voice avatar + metadata list | Recent Activity / Repo list | Richer list items with more visual info |
| Filter chips bar | Integration tabs / repo filters | Pill-shaped, icon-prefixed filter UI |
| Right settings panel | Configuration page | Slider/toggle design language |
| Trending/curated sections | Dashboard home | "Most active repos" or "Recent highlights" section |

---

## Step 5: Inspect Specific Values (if browser access works)

If you can access ElevenLabs in the browser via Puppeteer/DevTools:

- Measure their card border-radius, padding, gap
- Get their exact hover state background change
- Measure their sidebar width
- Get their filter chip styling (border-radius, padding, font-size)
- Study their skeleton loading states
- Look at their page transition animations

Record all values in NOTES.md. Use them as reference (adapted to our dark purple palette).

---

## Reminder

You're not copying ElevenLabs. You're studying what makes their dashboard feel alive and applying those principles to a completely different product in a completely different colour scheme. The specific visual choices should be yours — but the *level of polish* should match theirs.
