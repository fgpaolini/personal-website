# Tasks: Personal Webpage — CV & Portfolio

Each task is independently completable and maps to one or more acceptance criteria from requirements.md.

---

## Phase 1 — Scaffold

- [x] 1. Initialise Astro v4 project in the workspace root
  - Run `npm create astro@latest . -- --template minimal --typescript strict --no-install` then `npm install`
  - Add Tailwind CSS: `npx astro add tailwind`
  - Add `@fontsource/jetbrains-mono`: `npm install @fontsource/jetbrains-mono`
  - Confirm `npm run dev` starts without errors
  - **Refs**: all ACs (foundation)

- [x] 2. Configure Tailwind with the terminal theme tokens
  - Extend `tailwind.config.mjs` with custom colours that mirror the CSS variables (`bg`, `surface`, `surface-2`, `border`, `text`, `muted`, `accent`)
  - Add CSS custom properties to a global `src/styles/global.css`: dark-mode defaults on `:root`, light-mode overrides in `@media (prefers-color-scheme: light)`
  - Import `global.css` and JetBrains Mono in `src/layouts/Base.astro`
  - Set `font-family: 'JetBrains Mono', monospace` as the base body font
  - **Refs**: AC10, AC11.3

- [x] 3. Create `Base.astro` layout
  - `<html lang="en">` (updated at runtime by i18n)
  - `<head>`: charset, viewport, title, meta description, font import, global CSS
  - Skip-to-main link as the first focusable element
  - `<slot />` inside `<main id="main-content">`
  - Smooth scroll (`scroll-behavior: smooth`) disabled via `prefers-reduced-motion`
  - Custom thin webkit scrollbar in `--accent`
  - **Refs**: AC11.2, AC11.4

---

## Phase 2 — i18n

- [x] 4. Create i18n module (`src/i18n/`)
  - `src/i18n/en.json` — all English UI strings (nav labels, section headings, button text, hero lines, about paragraphs, contact labels, fake terminal commands)
  - `src/i18n/es.json` — all Spanish equivalents
  - `src/i18n/i18n.ts` — exports `detectLang()`, `setLang(lang)`, `t(key)`
    - `detectLang`: checks `localStorage('lang')` first, falls back to `navigator.language.startsWith('es')`
    - `setLang`: writes `localStorage`, updates `document.documentElement.lang`, updates all `[data-i18n]` elements, swaps CV link href
  - **Refs**: AC12.1–AC12.8

- [x] 5. Wire i18n initialisation into `Base.astro`
  - Add an inline `<script>` at the end of `<body>` that imports and calls `setLang(detectLang())` on page load
  - Ensures correct language renders before first paint (no flash)
  - **Refs**: AC12.2, AC12.5, AC12.6

---

## Phase 3 — Navigation

- [x] 6. Build `Nav.astro`
  - Fixed top bar: `--surface` background, `1px solid --border` bottom border
  - Left: prompt logo `> name@portfolio:~$` (plain text, links to `#hero`)
  - Right: section links with `data-i18n` keys, language toggle `EN / ES` pill, "Download CV" button with `data-cv-link`
  - Language toggle: clicking `EN` calls `setLang('en')`, clicking `ES` calls `setLang('es')`; active language rendered in `--accent`
  - Mobile (< 768 px): hamburger via `<details>`/`<summary>`, full-width dropdown
  - `IntersectionObserver` script: observes each `<section>`, adds `active` class to matching nav link
  - **Refs**: AC8.1–AC8.3, AC12.3–AC12.4, AC12.7

---

## Phase 4 — Content Collections

- [x] 7. Define content collection schemas (`src/content/config.ts`)
  - `experience`: `company`, `role`, `role_es`, `startDate` (YYYY-MM), `endDate?`, `bullets[]`, `bullets_es[]`
  - `education`: `institution`, `degree`, `degree_es`, `startYear`, `endYear?`
  - `projects`: `title`, `description`, `description_es`, `tags[]`, `image?`, `liveUrl?`, `repoUrl?`
  - **Refs**: AC4, AC5, AC6

- [x] 8. Add placeholder content files
  - `src/content/experience/` — at least 1 sample `.md` file with both EN and ES fields
  - `src/content/education/` — at least 1 sample `.md` file
  - `src/content/projects/` — at least 2 sample `.md` files
  - `src/data/skills.ts` — sample skill groups array (Languages, Tools, Other)
  - `public/cv-en.pdf` and `public/cv-es.pdf` — placeholder PDFs (can be empty; real ones replaced later)
  - **Refs**: AC3, AC4, AC5, AC6, AC9

---

## Phase 5 — Sections

- [x] 9. Build `Hero.astro`
  - Full viewport height, vertically centered
  - macOS terminal window frame: `border-radius: 10px`, title bar with traffic-light dots (red `#ff5f57`, yellow `#febc2e`, green `#28c840`), centered `zsh` label
  - Lines staggered in with CSS `animation-delay` (respects `prefers-reduced-motion`)
  - Structure:
    ```
    > whoami
    [name]
    [tagline — data-i18n="hero.tagline"]
    ▋  ← blinking cursor
    ```
  - CTA buttons: `[download cv]` (`data-cv-link`, `download`) and `[get in touch]` (scrolls to `#contact`)
  - Optional avatar rendered inside the terminal frame
  - **Refs**: AC1.1, AC1.2, AC12.7

- [x] 10. Build `About.astro`
  - Section id `#about`, `aria-labelledby` pointing to heading
  - Header: `~/about`, fake command `$ cat about.md`
  - Bio paragraphs each have `data-i18n="about.p1"`, `about.p2`, etc.
  - **Refs**: AC2.1, AC2.2, AC12.7

- [x] 11. Build `Skills.astro`
  - Section id `#skills`
  - Reads from `src/data/skills.ts`
  - Group labels with `data-i18n`; each skill as `<code>` chip
  - **Refs**: AC3.1, AC3.2, AC12.7

- [x] 12. Build `Experience.astro`
  - Section id `#experience`
  - Reads from content collection, sorted newest-first by `startDate`
  - Vertical timeline: left border line in `--border`
  - Each entry: `role` / `role_es` (switched by active lang), company, date range (`--muted`), bullet points
  - Bullet toggle handled by `setLang` via `data-i18n` on each bullet `<li>`
  - **Refs**: AC4.1, AC4.2, AC12.7

- [x] 13. Build `Education.astro`
  - Section id `#education`
  - Reads from content collection, sorted newest-first
  - Same timeline style as Experience
  - `degree` / `degree_es` switched by active lang
  - **Refs**: AC5.1, AC5.2, AC12.7

- [x] 14. Build `ProjectCard.astro` and `Projects.astro`
  - Section id `#projects`
  - Card: `--surface` background, `--border` border, `border-radius: 6px`
  - Top line: `filename` title; description with `data-i18n` or `data-i18n-content` for dynamic content fields
  - Tags: row of `<code>` chips
  - Links: `[live]` and `[repo]` bracket buttons, `target="_blank" rel="noopener noreferrer"`
  - Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
  - **Refs**: AC6.1–AC6.3, AC10.3, AC12.7

- [x] 15. Build `Contact.astro`
  - Section id `#contact`
  - Fake command: `$ echo $CONTACT_INFO`
  - Email as `mailto:` link
  - GitHub and LinkedIn as inline SVG icon + text links, `target="_blank" rel="noopener noreferrer"`
  - All labels have `data-i18n`
  - **Refs**: AC7.1, AC7.2, AC12.7

---

## Phase 6 — Assembly & Polish

- [x] 16. Assemble `src/pages/index.astro`
  - Import `Base.astro` layout and all section components
  - Sections in order: Hero, About, Skills, Experience, Education, Projects, Contact
  - **Refs**: AC8.1

- [x] 17. Responsive polish
  - Verify layout on 375 px, 768 px, 1280 px, 1440 px viewports
  - Nav hamburger works on mobile
  - Project grid reflows correctly
  - Terminal window in Hero scales gracefully
  - **Refs**: AC10.1–AC10.3

- [x] 18. Accessibility audit
  - Add `alt` to all `<img>` tags
  - Add `aria-hidden="true"` to all decorative elements (prompt characters, traffic-light dots, cursor)
  - Verify skip-to-main link is first focusable element
  - Verify focus rings visible on all interactive elements (keyboard tab through the page)
  - Verify `<html lang>` updates when language is toggled
  - **Refs**: AC11.2–AC11.4, AC12.6

- [x] 19. Performance check
  - Run `npm run build && npm run preview`
  - Run Lighthouse on the preview (desktop); confirm score ≥ 90
  - Confirm all images use `<Image>` from `astro:assets` (WebP, lazy load)
  - **Refs**: AC11.1

---

## Phase 7 — CV Download

- [x] 20. Wire up CV download
  - Place real (or final placeholder) PDFs at `public/cv-en.pdf` and `public/cv-es.pdf`
  - Confirm "Download CV" button in Nav and Hero both carry `data-cv-link`
  - Confirm `setLang` swaps both hrefs correctly
  - Confirm download triggers in browser without navigating away
  - **Refs**: AC9.1, AC9.2, AC12.8
