# Responsive Web Dev Cheatsheet

## Responsive layout fundamentals (non-negotiable)

1. Mobile-first CSS: start with small screens, layer up with media queries.

2. Flexbox + Grid fluency:
  - Grid for page/layout structure (2D)
  - Flexbox for components (1D)

3. Fluid sizing:
  - Use clamp() for typography and spacing [https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp]
  - Prefer %, rem, vw, fr over fixed pixels for layout []

4. Modern units:
  - Know dvh/svh/lvh for mobile viewport issues (address bar resizing). [https://medium.com/@tharunbalaji110/understanding-mobile-viewport-units-a-complete-guide-to-svh-lvh-and-dvh-0c905d96e21a]

5. Responsive images:
  - srcset / sizes, picture for art direction, lazy loading.

## Image formats

### Quick decision table

| Use case | Best format | Fallbacks | Notes |
|---|---|---|---|
| Photos / product images | **AVIF** | WebP → JPEG | Best compression/quality |
| Screenshots | **WebP** or **AVIF** | PNG | WebP often looks great; AVIF smallest |
| Icons / logos / UI illustrations | **SVG** | PNG (only if needed) | Crisp at any size, styleable |
| Images with transparency | **WebP** | PNG | PNG only if WebP not possible |
| Animations | **MP4/WebM** | GIF (last resort) | Video is *much* smaller than GIF |
| Print assets | PNG/JPEG (high quality) | — | Depends on requirements |

### Format notes

#### ✅ AVIF (photos)
- Use for: hero images, photography, e-commerce, marketing visuals
- Pros: smallest files, great quality, supports transparency
- Cons: needs fallbacks for some older environments
- Rule of thumb: **AVIF first choice for photos**

#### ✅ WebP (everything practical)
- Use for: general web images, screenshots, photos, transparency
- Pros: strong compression, wide support, fast decoding
- Rule of thumb: **WebP is your best “safe default”**

#### ⚠️ JPEG (legacy fallback)
- Use for: fallback when AVIF/WebP isn’t available
- Cons: larger files, no transparency, compression artifacts
- Rule of thumb: **JPEG only as fallback**

#### ⚠️ PNG (only when you really need it)
- Use for: pixel-perfect assets, legacy needs, or when WebP isn’t possible
- Pros: lossless, transparency
- Cons: huge files compared to WebP/AVIF
- Rule of thumb: **Prefer WebP over PNG for transparency**

#### ✅ SVG (icons/logos/UI)
- Use for: logos, icons, simple illustrations
- Pros: infinite resolution, tiny, CSS styleable
- Cons: not for photos
- Rule of thumb: **UI assets = SVG**

#### 🚫 GIF (avoid)
- Use for: basically never (unless forced)
- Better: MP4/WebM, Lottie
- Rule of thumb: **If it moves, use video**

---

### The correct responsive delivery pattern

```html
<picture>
  <source srcset="/img/photo.avif" type="image/avif">
  <source srcset="/img/photo.webp" type="image/webp">
  <img
    src="/img/photo.jpg"
    alt="Describe the image for accessibility"
    loading="lazy"
    decoding="async"
    width="1200"
    height="800"
  >
</picture>
```

#### Why this is best:
  - Browser picks the best supported format
  - AVIF/WebP users get faster loads
  - JPEG fallback keeps it compatible
  - width/height prevents layout shift (CLS) (width & height are used only to calculate the ratio)

### Must-do image performance checklist
  - Always include width and height (or reserve space via CSS) to prevent layout shift.
  - Use loading="lazy" for images below the fold.
  - Use decoding="async" for smoother rendering.
  - Use srcset + sizes for responsive images (don’t ship a 2000px image to a 375px phone).
  - Prefer AVIF/WebP over PNG/JPEG when possible.
  - Don’t upscale images with CSS (serve the correct size instead).


## Modern viewport height units: dvh, svh, lvh

Mobile browsers change viewport height while you scroll because the address bar / toolbars appear & disappear.
Classic 100vh often causes:
  - content getting cut off
  - jumps when browser UI collapses/expands
  - “full screen” sections that aren’t truly full screen

### What each unit means
| Unit  | Meaning                                    | Best for                                 |
| ----- | ------------------------------------------ | ---------------------------------------- |
| `svh` | **Small Viewport Height** (minimum)        | safest layouts that must never be hidden |
| `lvh` | **Large Viewport Height** (maximum)        | immersive hero sections / visuals        |
| `dvh` | **Dynamic Viewport Height** (changes live) | app shells, dashboards, mobile web apps  |

### Practical recommendations
- Best default for app layouts: 100dvh
```CSS
.app-shell {
  min-height: 100dvh;
}
```

- Safest “never hide content”: min-height: 100svh
```CSS
.page {
  min-height: 100svh;
}
```

- Big hero visuals (use carefully): height: 100lvh
```CSS
.hero {
  height: 100lvh;
}
```

- Safe fallback pattern:
```CSS
.app-shell {
  min-height: 100vh;   /* fallback */
  min-height: 100dvh;  /* modern */
}
```
Browsers that support dvh will use it.

### Common beginner rule
1. Building an app-like layout? Use dvh.
2. Want to guarantee nothing gets cut off? Use svh.
3. Want maximum visual fullness? Use lvh, but be careful with content overflow.



## Logical properties for better internationalization (RTL + writing modes)

Logical properties make spacing and layout adapt automatically to:
- LTR languages (English, Swedish, Turkish)
- RTL languages (Arabic, Hebrew)
- (Advanced) vertical writing modes

Instead of “left/right/top/bottom”, you style based on:
- inline direction = where text flows
- block direction = where lines stack

### Key terms
| Term     | Meaning                                        |
| -------- | ---------------------------------------------- |
| `inline` | text direction (LTR or RTL)                    |
| `block`  | line stacking direction (usually top → bottom) |



### Useful logical properties
| Physical (old)   | Logical (recommended)  |
| ---------------- | ---------------------- |
| `margin-left`    | `margin-inline-start`  |
| `margin-right`   | `margin-inline-end`    |
| `padding-left`   | `padding-inline-start` |
| `padding-right`  | `padding-inline-end`   |
| `margin-top`     | `margin-block-start`   |
| `margin-bottom`  | `margin-block-end`     |
| `padding-top`    | `padding-block-start`  |
| `padding-bottom` | `padding-block-end`    |
| `left`           | `inset-inline-start`   |
| `right`          | `inset-inline-end`     |
| `width`          | `inline-size`          |
| `height`         | `block-size`           |
