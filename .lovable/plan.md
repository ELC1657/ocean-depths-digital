

## Improvements: Content & Storytelling + Visual Polish

### What's changing

We'll enhance the site in two dimensions: stronger narrative flow and more refined micro-interactions that make the site feel alive and premium.

---

### 1. Scroll-triggered reveal animations

Add an `IntersectionObserver`-based hook so sections and elements fade/slide in as the user scrolls down, rather than everything appearing at once. Each section heading, text block, card, and image will animate in with staggered delays.

**Files**: new `src/hooks/use-scroll-reveal.tsx`, updates to `Index.tsx`

---

### 2. Richer storytelling content

- **Hero**: Add a subtle animated stat counter strip below the tagline (e.g., "200+ Shipwrecks Explored · 15 Countries · 25 Years of Discovery") that counts up on scroll.
- **Mission quote section**: Add a thin decorative compass rose divider and a brief supporting paragraph beneath the quote for context.
- **About section**: Rewrite copy to be more narrative-driven — open with a hook about mystery, then build to the mission. Add a "key stats" row (years active, wrecks documented, artifacts recovered).
- **Expeditions**: Add a depth/detail indicator and a short "highlight" fact per card (e.g., "47 artifacts recovered"). Add a subtle timeline connector between cards on desktop.

---

### 3. Navigation underline animation

Add a sleek animated underline that slides in from the left on hover for each nav link — a clean, modern micro-interaction.

**File**: `src/index.css` (new `.nav-link-underline` utility)

---

### 4. Parallax-lite hero background

Make the hero background image scroll at a slower rate than the content using a simple CSS `background-attachment: fixed` or a lightweight transform-based parallax via the scroll handler already in place.

**File**: `Index.tsx` hero section

---

### 5. Card hover depth effects

Enhance expedition cards with a subtle 3D tilt on hover using CSS `perspective` and `rotateX/rotateY` transforms, plus a soft glow beneath cards on hover.

**File**: `src/index.css` (enhance `.card-modern`)

---

### 6. Animated number counters

Create a reusable `<Counter>` component that animates from 0 to a target number when it scrolls into view, used in the stats strip and about section.

**File**: new `src/components/Counter.tsx`

---

### 7. Image reveal effect

Images slide in with a colored overlay that wipes away, revealing the photo underneath — adds a cinematic quality.

**File**: `src/index.css` (new `.image-reveal` utility), applied in `Index.tsx`

---

### Technical details

| Area | Approach |
|------|----------|
| Scroll reveals | Custom `useScrollReveal` hook using `IntersectionObserver` with `threshold: 0.1`, applies CSS classes |
| Counter | `requestAnimationFrame` loop with easing, triggered by intersection |
| Card tilt | Pure CSS with `transform-style: preserve-3d`, `perspective(800px)`, mouse-position-based via CSS `:hover` approximation or a small `onMouseMove` handler |
| Parallax | `transform: translateY(calc(var(--scroll) * 0.3))` updated via scroll listener already present |
| Nav underline | `::after` pseudo-element with `scaleX` transition from 0 to 1 |
| Image reveal | `::after` overlay with `translateX` animation triggered by intersection |

All changes stay within existing file patterns — no new dependencies needed.

