# Requirements: Personal Webpage — CV & Portfolio

## Overview

A single-page personal website that works as an online CV and portfolio. Visitors can learn who you are, see your work, and reach you.

---

## User Stories & Acceptance Criteria

### 1. Hero / Introduction

**As a visitor, I want to immediately see who this person is.**

- AC1.1: Page shows a name, a one-line role/tagline, and a professional photo.
- AC1.2: A primary call-to-action ("Download CV" or "Get in touch") is visible without scrolling.

---

### 2. About Me

**As a visitor, I want to read a short bio.**

- AC2.1: Section contains 1–3 short paragraphs describing background, interests, and values.
- AC2.2: Section is reachable via the navigation menu.

---

### 3. Skills

**As a visitor, I want to see the owner's technical and soft skills.**

- AC3.1: Skills are grouped (e.g. Languages, Tools, Other).
- AC3.2: Each skill is listed with its name; a visual indicator of level is optional but must not mislead.

---

### 4. Experience

**As a visitor, I want to read the work history.**

- AC4.1: Each entry shows: company, role, date range, and 2–4 bullet points of achievements.
- AC4.2: Entries are ordered newest-first.

---

### 5. Education

**As a visitor, I want to see academic background.**

- AC5.1: Each entry shows: institution, degree/certificate, and year(s).
- AC5.2: Entries are ordered newest-first.

---

### 6. Portfolio / Projects

**As a visitor, I want to browse notable projects.**

- AC6.1: Each project card shows: title, short description (≤ 2 sentences), tech stack tags, and an optional link (live demo or repo).
- AC6.2: Cards are scannable at a glance (image or icon, title, tags).
- AC6.3: Clicking a card link opens in a new tab.

---

### 7. Contact

**As a visitor, I want to reach the owner.**

- AC7.1: Page includes a contact section with at least one of: email address, contact form, or LinkedIn/GitHub links.
- AC7.2: Social/profile links open in a new tab.
- AC7.3: If a contact form is present, submitting without a valid email shows an inline error.

---

### 8. Navigation

**As a visitor, I want to move between sections easily.**

- AC8.1: A sticky top navigation bar links to every major section.
- AC8.2: Clicking a nav link scrolls smoothly to the target section.
- AC8.3: The active section is highlighted in the nav as the user scrolls.

---

### 9. Downloadable CV

**As a visitor, I want to download the CV as a PDF.**

- AC9.1: A "Download CV" button is present and links to a PDF file.
- AC9.2: The PDF opens/downloads in the browser without navigating away from the page.

---

### 10. Responsive Design

**As a visitor on any device, I want the page to look good.**

- AC10.1: Layout is usable on viewports from 375 px (mobile) to 1440 px (desktop).
- AC10.2: Navigation collapses to a hamburger menu on mobile.
- AC10.3: Project cards reflow from a grid to a single column on small screens.

---

### 11. Performance & Accessibility

- AC11.1: Page scores ≥ 90 on Lighthouse Performance (desktop).
- AC11.2: All images have descriptive `alt` text.
- AC11.3: Color contrast meets WCAG 2.1 AA.
- AC11.4: Page is keyboard-navigable (focus rings visible, logical tab order).

---

### 12. Localisation (EN / ES)

**As a visitor, I want to read the page in my language.**

- AC12.1: The page is available in English and Spanish.
- AC12.2: On first visit, the displayed language matches the browser's `navigator.language` (e.g. `es-*` → Spanish, anything else → English).
- AC12.3: A visible language toggle (e.g. `EN / ES`) is present in the navigation bar at all times.
- AC12.4: Clicking the toggle switches all UI text and content immediately without a full page reload.
- AC12.5: The chosen language is persisted in `localStorage` and honoured on subsequent visits, overriding the browser default.
- AC12.6: The page `<html lang>` attribute updates to match the active language (`en` or `es`).
- AC12.7: All user-visible strings — nav labels, section headings, button text, bio, job descriptions, project descriptions — are translated. Proper nouns (company names, project titles, tech tags) remain unchanged.
- AC12.8: Both CV PDFs (one per language) are available; the "Download CV" button downloads the PDF matching the active language.
