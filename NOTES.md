# NOTES.md — ElevenLabs Study Notes

## Observations from Screenshots

### Home Dashboard (Screenshot 2)
- **Announcement banner**: "New — Introducing Flows >" at very top, pill-shaped with green "New" badge + arrow, dismissible
- **Workspace label**: "Jeremy's Workspace" in small muted text above greeting
- **Greeting**: "Good morning, J li" — time-aware, personalized with name
- **6 Feature cards**:
  - LARGE (~180px tall) with colorful illustrations filling most of the card
  - Labels below illustrations: "Instant speech", "Audiobook", "Image & Video", "ElevenAgents", "Music", "Dubbed video"
  - Each card has a distinct illustration with multiple colors (not monochrome)
  - Cards have subtle gray background, generous rounded corners
  - Illustrations are ~70% of card height, label is ~30%
  - Icons/badges overlap the illustration (small colored circles)
- **Two-column bottom**: "Latest from the library" (left, list with avatars) + "Create or clone a voice" (right, action cards with icons)
- Clean, spacious layout with lots of whitespace

### Text to Speech (Screenshot 1)
- **Large text area** dominates the center — clean, minimal, inviting placeholder text
- **Right sidebar**: Settings/History tabs, voice selector, model selector, sliders (Speed, Stability, Similarity)
- **"Get started with" prompt chips**: 9 suggestion pills with icons at bottom
  - "Narrate a story", "Tell a silly joke", "Record an advertisement"
  - Pill-shaped, outlined, with small icon prefix
  - Light gray border, generous padding, subtle hover states
- **Promotional card**: "Try Studio 3.0" with gradient thumbnail image

### Voices Explore (Screenshot 3)
- **Search bar**: Full-width with search icon, placeholder "Search library voices..."
- **Filter chips**: Horizontal scrollable row
  - Pill-shaped with icon prefix: "Language ▾", "Accent ▾", "Conversational", "Narration", "Characters", etc.
  - Active state: filled/bordered, inactive: outlined
  - Smooth horizontal scroll with arrow buttons
- **Promotional banner**: Full-width, dark background with face thumbnails, "Legendary voices" text + "Learn more" button
- **Trending voices**: 3-column grid, each with avatar (circular), name, category, language flag
- **"Handpicked for your use case"**: Horizontal carousel cards with images

### Voices Filtered (Screenshot 4)
- **List view**: Clean rows with:
  - Circular avatar (32px)
  - Name + description (truncated)
  - Language with flag icon + count
  - Category label
  - Age indicator
  - Popularity count (34.9K)
  - Action icons (play, save, more)
- **Row hover**: Subtle background change
- **Dense but readable**: Good information density without feeling cramped

## Key Techniques to Steal

1. **Colorful card illustrations** — Our cards use tiny 24px icons. Need large, colorful SVG illustrations (48-80px) that fill the card
2. **Announcement banner** — We have nothing. Add "NEW — Introducing Optibot v2" dismissible banner
3. **Workspace label** — Small org label above the greeting
4. **Prompt chips for onboarding** — "Get started with" style action suggestions
5. **Filter chips with icons** — Pill-shaped, icon-prefixed category filters
6. **Two-column bottom layout** — Recent activity + quick actions side by side
7. **Rich list items** — Avatars, metadata, hover states, action buttons
8. **Generous whitespace** — Don't pack things tight
9. **Each card has unique visual identity** — Distinguishable at a glance by color/illustration
10. **Promotional/upsell cards** — Contextual promotions within the flow

## Mapping to Our Dashboard

| ElevenLabs | Ours | Action |
|---|---|---|
| Colorful feature cards | Grey icon cards | Add accent colors + larger icons per card |
| Announcement banner | Nothing | Add dismissible "NEW" banner |
| Workspace label | Nothing | Add org name above greeting |
| Prompt chips | Nothing | Add onboarding chips/checklist |
| Filter chips | Plain tabs | Upgrade to pill-shaped tabs with icons |
| Rich list items | Flat repo lists | Add hover states, icons, metadata |
| Two-column bottom | Already have | Polish the layout |
| Card illustrations | Tiny icons | Create SVG illustrations or large icon compositions |
