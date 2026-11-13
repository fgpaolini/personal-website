# Design: Personal Webpage — CV & Portfolio

## Aesthetic: Terminal / Developer — macOS Style

Pure black/white/gray palette with a single muted terminal green accent. Dark by default, light mode follows `prefers-color-scheme`. Terminal chrome uses macOS conventions (traffic-light dots, rounded corners, centered title) — not Windows. JetBrains Mono throughout. The page reads like a well-crafted macOS terminal session.

---

## Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | [Astro](https://astro.build) v4 | Static output, zero JS by default |
| Styling | Tailwind CSS v3 | Utility-first; custom theme via CSS vars |
| Content | Astro content collections (Markdown) | Separates data from markup |
| Package manager | npm | Default |
| Output | `output: 'static'` | Pure HTML/CSS/JS — host anywhere |

---

## Visual Language

### Colour Palette

Black/white/gray base with a single muted green accent. Dark mode is the default; light mode follows `prefers-color-scheme`.

#### Dark mode (default)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background |
| `--surface` | `#1a1a1a` | Cards, nav, terminal windows |
| `--surface-2` | `#262626` | Hover states, nested surfaces |
| `--border` | `#333333` | Dividers, card borders |
| `--text` | `#e5e5e5` | Body copy |
| `--muted` | `#737373` | Dates, secondary labels |
| `--accent` | `#6ee7a0` | Muted terminal green — prompts, active links |

#### Light mode (`prefers-color-scheme: light`)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#ffffff` | Page background |
| `--surface` | `#f5f5f5` | Cards, nav |
| `--surface-2` | `#e5e5e5` | Hover states |
| `--border` | `#d4d4d4` | Dividers |
| `--text` | `#171717` | Body copy |
| `--muted` | `#737373` | Dates, secondary labels |
| `--accent` | `#16a34a` | Darker green — passes WCAG AA on white |

The accent is the only colour that shifts between modes; everything else is a grayscale inversion. Changing the accent later means updating one CSS variable.

### Terminal Chrome — macOS Style

Terminal-window frames (hero, avatar, any decorative shells) follow macOS conventions:
- **Traffic-light dots**: red `#ff5f57`, yellow `#febc2e`, green `#28c840` — left-aligned.
- **Title bar**: `--surface` background, centered `zsh` or filename label in `--muted` text.
- **Window**: `border-radius: 10px`, `1px solid --border`, subtle `box-shadow`.
- No Windows-style square corners, no text buttons.

### Typography

- **Font**: `JetBrains Mono` via `@fontsource/jetbrains-mono` — self-hosted, monospace throughout.
- Headings: same font, heavier weight, preceded by a `~/` prompt in `--accent`.
- Body: 16–17 px.

### UI Details

- **Prompt prefix**: section titles as `<span aria-hidden="true" class="accent">~/</span>section-name`.
- **Cursor blink**: CSS `@keyframes blink` on a `▋` after the hero tagline — paused on `prefers-reduced-motion: reduce`.
- **Skill tags**: `<code>` chips — `--surface`, `--border`, monospace.
- **Project cards**: file-listing style. Title as `filename`; tags as `<code>` chips; `[live]` `[repo]` bracket links.
- **Scrollbar**: thin webkit scrollbar in `--accent`.
- **Noise texture**: SVG grain at ≤ 3 % opacity, `aria-hidden` — decorative only.

---

## Localisation (i18n)

### Approach: client-side JSON + `localStorage`

No routing change, no separate URLs — one HTML page, language switched in JS. This keeps the site purely static and deployable anywhere.

| Concern | Decision |
|---|---|
| Translation store | `src/i18n/en.json` and `src/i18n/es.json` — flat key/value objects |
| Runtime | Tiny `src/i18n/i18n.ts` module (~30 lines): `detectLang()`, `setLang()`, `t(key)` |
| Auto-detect | `navigator.language.startsWith('es')` → `es`, else `en` |
| Persistence | `localStorage.setItem('lang', 'en' | 'es')` |
| Toggle | `EN / ES` pill in the Nav, updates `<html lang>`, re-renders all `data-i18n` elements |
| Dynamic content | Experience, education, project descriptions translated as fields in their Markdown frontmatter (`title_es`, `description_es`, `bullets_es`) — JS picks the right field at render time |
| CV download | Two PDFs: `public/cv-en.pdf` and `public/cv-es.pdf`; button `href` swaps on language change |

### Translation key structure (`en.json` / `es.json`)

```json
{
  "nav.about": "About",
  "nav.skills": "Skills",
  "nav.experience": "Experience",
  "nav.education": "Education",
  "nav.projects": "Projects",
  "nav.contact": "Contact",
  "nav.download_cv": "Download CV",
  "hero.tagline": "Software Developer",
  "hero.cta_cv": "Download CV",
  "hero.cta_contact": "Get in touch",
  "about.command": "cat about.md",
  "skills.command": "ls skills/",
  "experience.command": "cat experience.log",
  "education.command": "cat education.log",
  "projects.command": "ls projects/",
  "contact.command": "echo $CONTACT_INFO",
  "contact.email_label": "Email",
  ...
}
```

### Content frontmatter with translations

Experience and project Markdown files carry both languages inline:

```yaml
---
company: Acme Corp
role: Senior Software Engineer
role_es: Ingeniero de Software Senior
startDate: "2022-03"
bullets:
  - Built the core API serving 1M requests/day
  - Led migration from monolith to microservices
bullets_es:
  - Construí la API principal con 1M solicitudes/día
  - Lideré la migración de monolito a microservicios
---
```

### `i18n.ts` module

```ts
export type Lang = 'en' | 'es';

export function detectLang(): Lang {
  const stored = localStorage.getItem('lang') as Lang | null;
  if (stored === 'en' || stored === 'es') return stored;
  return navigator.language.startsWith('es') ? 'es' : 'en';
}

export function setLang(lang: Lang) {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n!;
    el.textContent = translations[lang][key] ?? key;
  });
  // update CV href
  const cvLink = document.querySelector<HTMLAnchorElement>('[data-cv-link]');
  if (cvLink) cvLink.href = `/cv-${lang}.pdf`;
}
```

The toggle in Nav calls `setLang` on click; on page load `Base.astro` runs `setLang(detectLang())` in a `<script>` tag.

---

## Project Structure

```
new-project/
├── public/
│   ├── cv.pdf
│   └── images/
│       ├── avatar.jpg          # Optional; shown in terminal-window frame
│       └── projects/           # Project screenshots
├── src/
│   ├── i18n/
│   │   ├── en.json              # English strings
│   │   ├── es.json              # Spanish strings
│   │   └── i18n.ts              # detectLang / setLang / t()
│   ├── content/
│   │   ├── config.ts
│   │   ├── experience/         # One .md per job
│   │   ├── education/          # One .md per degree
│   │   └── projects/           # One .md per project
│   ├── data/
│   │   └── skills.ts           # Plain array — groups + items
│   ├── components/
│   │   ├── Nav.astro           # Sticky top bar, terminal style
│   │   ├── Hero.astro          # Prompt + name + blinking cursor
│   │   ├── About.astro         # Bio as terminal "cat" output
│   │   ├── Skills.astro        # Grouped <code> chips
│   │   ├── Experience.astro    # Timeline / log entries
│   │   ├── Education.astro     # Timeline / log entries
│   │   ├── Projects.astro      # Card grid (file-listing style)
│   │   ├── ProjectCard.astro   # Single card
│   │   └── Contact.astro       # Links with icons
│   ├── layouts/
│   │   └── Base.astro          # <html>, <head>, Nav, footer
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## Page Layout

Single scrolling page, dark throughout (no light mode — the terminal look is the brand):

1. `#hero` — full-viewport intro with blinking cursor
2. `#about`
3. `#skills`
4. `#experience`
5. `#education`
6. `#projects`
7. `#contact`

Nav fixed to top; `IntersectionObserver` highlights the active link.

---

## Component Details

### Nav.astro
- Background: `--surface` with a bottom border in `--border`.
- Logo/name on the left as a prompt: `> fernando@portfolio:~$` (or similar).
- Section links right-aligned; active link in `--accent`.
- **Language toggle**: `EN / ES` pill beside the CV button; calls `setLang()` on click, highlights the active language.
- Mobile: hamburger toggles a full-width dropdown via `<details>`/`<summary>` — no extra JS.
- "Download CV" styled as a terminal button: border, monospace, `--accent` text; `href` swaps to match active language.

### Hero.astro
- Full viewport height, centered.
- Lines animate in like a terminal typing sequence (CSS `animation-delay` stagger, respects `prefers-reduced-motion`).
- Structure:
  ```
  > whoami
  Fernando González
  Software Developer
  ▮
  ```
- CTA: `[download cv]` and `[get in touch]` — bracket-style terminal buttons.
- Optional avatar in a fake terminal window frame (SVG traffic-light dots, fake title bar).

### About.astro
- Section header: `~/about`
- Preceded by a fake command: `$ cat about.md`
- Body: 1–3 paragraphs of bio text.
- Both EN and ES bio text live in `en.json` / `es.json` under keys `about.p1`, `about.p2`, etc. — switched by `setLang()` like all other strings.

### Skills.astro
- Header: `~/skills`
- Groups (e.g. `Languages`, `Tools`, `Other`) as sub-labels.
- Each skill is a `<code>` chip: `border border-[--border] bg-[--surface] px-2 py-0.5 text-sm`.

### Experience.astro / Education.astro
- Header: `~/experience` / `~/education`
- Each entry: date range (muted, right-aligned) + role/company in `--text` + bullet points as `- item` lines.
- Sorted newest-first.
- Vertical left border line in `--border` connecting entries.

### Projects.astro + ProjectCard.astro
- Header: `~/projects`
- Grid: 3 cols desktop → 2 tablet → 1 mobile.
- Card: `--surface` background, `--border` border, monospace text.
  - Top line: `📄 project-name` or `$ ls projects/project-name`
  - Description: 1–2 sentences.
  - Tags: row of `<code>` chips.
  - Links: `[live]` `[repo]` — bracket-style, open in new tab.

### Contact.astro
- Header: `~/contact`
- Fake command: `$ echo $CONTACT_INFO`
- Email as `mailto:` link.
- GitHub and LinkedIn as icon + text links (SVG icons inline).
- All open in new tab.

---

## Content Collection Schemas (`src/content/config.ts`)

```ts
// experience
{
  company: z.string(),
  role: z.string(),
  startDate: z.string(),          // "YYYY-MM"
  endDate: z.string().optional(), // omit → "Present"
  bullets: z.array(z.string()).max(4),
}

// education
{
  institution: z.string(),
  degree: z.string(),
  startYear: z.number(),
  endYear: z.number().optional(),
}

// projects
{
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  image: z.string().optional(),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
}
```

---

## Styling

- **Dark mode default**, light mode via `prefers-color-scheme: light` — both use the same grayscale structure, accent token swaps automatically.
- All colours via CSS custom properties on `:root` with a `@media (prefers-color-scheme: light)` override block; Tailwind extended with them.
- `JetBrains Mono` self-hosted via `@fontsource/jetbrains-mono/latin.css`.
- `scroll-behavior: smooth` on `<html>`; disabled via `prefers-reduced-motion`.
- Blinking cursor: `@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }` — paused when `prefers-reduced-motion: reduce`.

---

## Performance

- Zero runtime JS except the ~20-line `IntersectionObserver` scroll-spy.
- Images via `<Image>` from `astro:assets` (WebP, lazy load).
- Font subset to Latin.

---

## Accessibility

- Semantic HTML throughout (`<header>`, `<main>`, `<section aria-labelledby>`, `<footer>`).
- All `<img>` have `alt`.
- Decorative elements (`aria-hidden="true"`) — prompt characters, fake terminal chrome.
- Skip-to-main link as first focusable element.
- Focus rings visible (Tailwind `ring` on interactive elements, `--accent` colour).
- `--accent` green (`#39d353`) on `--bg` (`#0d1117`) passes WCAG 2.1 AA (contrast ratio ≈ 8.5:1).

---

## Build & Dev Commands

```bash
npm create astro@latest .    # scaffold once
npm install
npm run dev                  # → http://localhost:4321
npm run build                # → dist/
npm run preview
```
