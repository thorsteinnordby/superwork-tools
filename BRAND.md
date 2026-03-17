# Superwork Brand Guidelines for Developers

This document provides quick reference for implementing the Superwork brand identity in code. For the complete brand guidelines, visit [superworks.com](https://superworks.com).

## Overview

Superwork replaces the friction of ad-hoc consulting with a dedicated HubSpot team delivered as a subscription. Our identity is built on the logic of the **Execution Engine** — a system designed for speed, precision, and continuous output.

**Tagline:** Intelligent Tools For Dynamic Teams

---

## Color System

### Primary Colors

Use these for the most important brand elements:

| Token | Hex | Usage |
|---|---|---|
| `sw-white` | `#ffffff` | Primary base, main backgrounds, card fills |
| `sw-midnight-500` | `#1c1e31` | Primary dark background, hero sections |
| `sw-green-500` | `#bfe937` | **Action color** - primary buttons, CTAs |

### Midnight Scale (Backgrounds & Grays)

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `sw-midnight-100` | `#e8e9eb` | `bg-sw-midnight-100` | Subtle backgrounds, light mode cards |
| `sw-midnight-200` | `#d1d2d6` | `bg-sw-midnight-200` | Divider lines, ghost button borders |
| `sw-midnight-300` | `#2e3352` | `bg-sw-midnight-300` | Secondary UI, icon containers |
| `sw-midnight-400` | `#252942` | `bg-sw-midnight-400` | Captions, metadata, secondary text |
| `sw-midnight-500` | `#1c1e31` | `bg-sw-midnight-500` | **Primary dark background** |
| `sw-midnight-600` | `#151726` | `bg-sw-midnight-600` | Deep sections, sidebars |
| `sw-midnight-700` | `#0e101a` | `bg-sw-midnight-700` | Contrast cards on dark BGs |
| `sw-midnight-800` | `#07080d` | `bg-sw-midnight-800` | Overlays, deep shadows |

### Green Scale (Action & Success)

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `sw-green-100` | `#f0f5e5` | `bg-sw-green-100` | Success state backgrounds |
| `sw-green-300` | `#e0f1ab` | `bg-sw-green-300` | Secondary icons, graphic accents |
| `sw-green-500` | `#bfe937` | `bg-sw-green-500` | **Primary action color** - buttons, CTAs |
| `sw-green-700` | `#99bf2e` | `bg-sw-green-700` | Hover state for green buttons |
| `sw-green-900` | `#71891a` | `bg-sw-green-900` | High-contrast text on light green |

### Violet Scale (Secondary Logic)

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `sw-violet-100` | `#f0f0fa` | `bg-sw-violet-100` | Info cards (automation, reporting) |
| `sw-violet-300` | `#a6a8e1` | `bg-sw-violet-300` | Graphic accents, secondary tiers |
| `sw-violet-500` | `#6a6dcd` | `bg-sw-violet-500` | **Secondary logic** - inline links, secondary CTAs |
| `sw-violet-700` | `#4e50a4` | `bg-sw-violet-700` | Hover state for violet buttons |
| `sw-violet-900` | `#26274f` | `bg-sw-violet-900` | High-contrast text on light violet |

### Neutral Scale (Text & UI)

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `sw-neutral-200` | `#ebebeb` | `bg-sw-neutral-200` | Ghost buttons, dividers |
| `sw-neutral-300` | `#d6d6d6` | `text-sw-neutral-300` | Placeholder text, disabled states |
| `sw-neutral-400` | `#8f8f8f` | `text-sw-neutral-400` | Captions, metadata, secondary text |
| `sw-neutral-500` | `#222222` | `text-sw-neutral-500` | **Primary text color** |
| `sw-neutral-700` | `#1a1a1a` | `bg-sw-neutral-700` | Secondary sections, dark UI cards |
| `sw-neutral-800` | `#141414` | `bg-sw-neutral-800` | Footers, dark mode containers |
| `sw-neutral-900` | `#000000` | `text-sw-neutral-900` | Headlines, heavy emphasis |

---

## Typography

### Font Families

```tsx
// Next.js font setup (already implemented in layout.tsx)
import { Space_Grotesk, Nunito_Sans } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-body",
});
```

**Primary Font: Space Grotesk** - Use for all headings and headlines
**Secondary Font: Nunito Sans** - Use for body text, UI elements, and buttons

### Type Scale

Use these predefined classes for consistent typography:

| Class | Font | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|---|
| `text-h1` | Space Grotesk | 56px | 700 | 110% | -2% | Hero slogans, main landing titles |
| `text-h2` | Space Grotesk | 40px | 700 | 120% | -1% | Section titles (e.g., "Our Process") |
| `text-h3` | Space Grotesk | 32px | 600 | 125% | -1% | Card headers, dashboard widgets |
| `text-body-lead` | Nunito Sans | 24px | 300 | 150% | 0% | Lead paragraph under H1 |
| `text-body-primary` | Nunito Sans | 18px | 400 | 160% | 0% | Blog posts, articles, long-form |
| `text-body-base` | Nunito Sans | 16px | 400 | 150% | 0% | Default UI text, descriptions |
| `text-body-compact` | Nunito Sans | 14px | 400 | 140% | 0% | Dense data tables, sidebars |
| `text-label` | Nunito Sans | 14px | 700 | 140% | +1% | Form labels, tab headers |
| `text-meta` | Nunito Sans | 12px | 600 | 130% | +2% | Timestamps, tooltips, tags |
| `.btn` | Nunito Sans | 14px | 700 | 100% | +2% | CTAs (always uppercase) |
| `.link` | Nunito Sans | inherit | 700 | inherit | 0% | Inline links (with underline) |
| `.nav-item` | Nunito Sans | 16px | 600 | 100% | 0% | Menu links |

### Typography Examples

```tsx
// Hero headline
<h1 className="font-heading text-h1 text-sw-neutral-500">
  Your Hero Title
</h1>

// Section title
<h2 className="font-heading text-h2 text-sw-neutral-500">
  Section Title
</h2>

// Card title
<h3 className="font-heading text-h3 text-sw-neutral-500">
  Card Title
</h3>

// Body text
<p className="text-body-base text-sw-neutral-500">
  Default paragraph text goes here.
</p>

// Primary CTA button
<button className="btn rounded-lg bg-sw-green-500 px-5 py-2.5 text-sw-midnight-500 transition-all hover:-translate-y-0.5 hover:bg-sw-green-700 hover:shadow-btn-green">
  Get Started
</button>

// Secondary link button
<a href="#" className="link text-sw-violet-500">
  Learn more
</a>

// Label
<label className="text-label text-sw-neutral-500">
  Email Address
</label>

// Metadata/timestamp
<span className="text-meta text-sw-neutral-400">
  Updated 2 hours ago
</span>
```

---

## Shadows

Pre-configured shadow utilities:

| Class | Value | Usage |
|---|---|---|
| `shadow-card` | `0 1px 3px rgba(28, 30, 49, 0.06)` | Default card shadow |
| `shadow-card-hover` | `0 8px 24px rgba(28, 30, 49, 0.12)` | Card hover state |
| `shadow-nav` | `0 2px 8px rgba(28, 30, 49, 0.15)` | Navigation bar |
| `shadow-btn-green` | `0 4px 12px rgba(191, 233, 55, 0.3)` | Green button hover effect |

---

## Component Patterns

### Primary Action Button

```tsx
<button className="btn inline-flex items-center gap-1.5 rounded-lg bg-sw-green-500 px-5 py-2.5 text-sw-midnight-500 transition-all hover:-translate-y-0.5 hover:bg-sw-green-700 hover:shadow-btn-green">
  Get Started
  <svg>...</svg>
</button>
```

### Secondary Action Button

```tsx
<button className="btn rounded-lg border border-sw-midnight-200 bg-sw-midnight-100 px-5 py-2.5 text-sw-neutral-500 transition-all hover:bg-sw-midnight-200">
  Learn More
</button>
```

### Badge/Tag

```tsx
<span className="rounded-full bg-sw-green-500 px-3 py-1 text-meta text-sw-midnight-500">
  Free Tool
</span>
```

### Card

```tsx
<div className="rounded-lg border border-sw-midnight-200 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-sw-violet-500 hover:shadow-card-hover">
  {/* Card content */}
</div>
```

### Dark Card/Section

```tsx
<div className="rounded-lg bg-sw-midnight-500 p-7 shadow-card-hover">
  <h3 className="font-heading text-body-primary font-bold text-white">
    Section Title
  </h3>
  <p className="text-body-compact text-sw-neutral-400">
    Description text
  </p>
</div>
```

---

## Grid System

### Desktop Grid
- **Width:** 1440px (`max-w-grid-desktop`)
- **Columns:** 12 columns at 98px
- **Gutter:** 24px (`gap-gutter-desktop`)

### Mobile Grid
- **Width:** 375px (`max-w-grid-mobile`)
- **Columns:** 4 columns at 85px
- **Gutter:** 4px (`gap-gutter-mobile`)

---

## Best Practices

### DO:
✅ Use `Space Grotesk` for all headings and page titles
✅ Use `Nunito Sans` for body text, UI elements, and buttons
✅ Use `sw-green-500` for primary actions and CTAs
✅ Use `sw-violet-500` for secondary actions and inline links
✅ Use `text-sw-neutral-500` as the default text color
✅ Use the pre-defined typography classes (`text-h1`, `text-body-base`, etc.)
✅ Add hover states with `-translate-y-0.5` for interactive elements
✅ Use the `btn` class for all button text (ensures uppercase + proper spacing)

### DON'T:
❌ Mix font families (e.g., don't use Space Grotesk for body text)
❌ Use arbitrary font sizes — stick to the type scale
❌ Use pure black (`#000000`) as primary text (use `sw-neutral-500` instead)
❌ Create new shadow values — use the predefined utilities
❌ Use green for anything other than primary actions
❌ Forget to add transition states to interactive elements

---

## Quick Reference

### Common Patterns

```tsx
// Page header
<div className="px-6 py-16">
  <div className="mx-auto max-w-3xl text-center">
    <span className="mb-4 inline-block rounded-full bg-sw-green-500 px-3 py-1 text-meta text-sw-midnight-500">
      Category
    </span>
    <h1 className="mb-3 font-heading text-h2 text-sw-neutral-500">
      Page Title
    </h1>
    <p className="mb-12 text-body-primary text-sw-neutral-400">
      Lead description text
    </p>
  </div>
</div>

// Tool card
<Link
  href="/tools/example"
  className="group flex items-center gap-5 rounded-lg border border-sw-midnight-200 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-sw-violet-500 hover:shadow-card-hover"
>
  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sw-violet-500/8 text-sw-violet-500">
    {/* Icon */}
  </div>
  <div className="min-w-0 flex-1">
    <h2 className="font-heading text-body-base font-bold text-sw-neutral-500">
      Tool Name
    </h2>
    <p className="text-body-compact text-sw-neutral-400">
      Tool description
    </p>
  </div>
</Link>
```

---

## Resources

- **Complete Brand Guidelines:** [superworks.com](https://superworks.com)
- **Color Palette:** See `src/app/globals.css` for CSS variables
- **Tailwind Config:** See `tailwind.config.ts` for utility classes
- **Font Setup:** See `src/app/layout.tsx` for Next.js font configuration

---

**Last Updated:** March 2026
**Maintained by:** Superwork Design Team
