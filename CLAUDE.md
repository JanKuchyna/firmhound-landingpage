# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static landing page for **FirmHound** — a B2B market intelligence platform marketed as "The Intelligent Market Atelier". No build step, no dependencies, no framework.

## Development

Serve the files with any static server:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .

# Or open index.html directly in a browser
```

## Architecture

Single-page site with three files:

- **`index.html`** — All content, semantic HTML5, 9 sections (navbar, ticker, hero, features, showcase, pricing, CTA, contact, footer)
- **`styles.css`** — All styles (~970 lines), single breakpoint at 768px for mobile
- **`script.js`** — Mobile nav toggle, smooth scroll polyfill, contact form with simulated submission, navbar scroll shadow

## Design System

**Colors:**
- Primary accent: `#C8601A` (rust/copper)
- Dark background: `#1C1009`
- Light background: `#FAFAF8`
- Muted text: `#6B5E54`

**Typography:**
- Headings/branding: Playfair Display (serif, loaded from Google Fonts)
- Body: Inter (sans-serif)

**Layout:**
- Container max-width: 1100px
- CSS Grid for multi-column sections, Flexbox for nav/forms
- Border-radius: 12px (cards), 8px (inputs/buttons)

## Key Notes

- The `.claude/skills/` directory contains marketing skill prompts — not application code.
- The contact form simulates submission (no backend). Real form handling would require adding a service (e.g., Formspree, Netlify Forms).
- CSS-drawn charts in the hero section use SVG `background` properties on pseudo-elements — they're decorative, not data-driven.
- Brand language: editorial, premium, professional. Avoid casual or startup-y copy changes.
