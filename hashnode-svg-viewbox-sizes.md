<!--
Hashnode / Dev.to: put Title in the UI field only — do NOT paste a # Title into the body.

Title: SVG viewBox vs width and CSS: why your icon size breaks
Meta description: Why a Figma SVG looks tiny, huge, or soft as PNG. viewBox vs width/height vs CSS/props, React sizing pitfalls, and a 1×/2×/3× retina table.
Slug: svg-viewbox-vs-width-css-icon-size
Tags: svg, viewBox, react, png, webdev, javascript
Canonical (if cross-posting): https://getsvgeditor.com/blog/svg-viewbox-size

Body starts below. Delete this HTML comment before publishing.
-->

You export a 24×24 icon from Figma. In the browser it lands as a postage stamp, a billboard, or a crisp path trapped inside a soft PNG. The file is rarely “broken.” It is telling **three size stories at once** — and your toolchain picked the wrong narrator.

Most tips collapse that into *“keep the viewBox.”* Necessary. Not sufficient. If you ship a design system, wrap SVG as React JSX, or rasterize PNG for email, you need to know which size is the **contract** — and which two are only defaults.

This piece covers: `viewBox` vs `width`/`height` vs CSS, why React “breaks” icon size, how to size retina PNG (1×/2×/3×), and a 60-second audit.

## SVG viewBox vs width/height vs CSS — three sizes

A typical design-tool export looks harmless:

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
>
  <path d="…" />
</svg>
```

Three independent signals:

| Signal | Job | Who listens |
| --- | --- | --- |
| **`viewBox`** | Internal coordinate system: “this drawing lives in a 24×24 user space.” | Renderers, `preserveAspectRatio`, every sane icon pipeline |
| **`width` / `height` attributes** | Default **presentation** size when nothing else wins | Browser (if CSS is silent), some PNG rasterizers, naïve copy-paste |
| **CSS / props** (`className`, `width={32}`) | What **this instance** should be in the app | React, layout, design tokens |

When they disagree, you get the classics:

- Looks right as `<img src="icon.svg">`, wrong as inline JSX
- `<Icon width={16} />` appears to do nothing (CSS or attribute order wins instead)
- Retina PNG looks soft because you rasterized the **attribute** size, not the CSS size you actually show
- `viewBox="0 0 24 24"` while paths were drawn in `0…100` → empty padding or a clipped glyph

**Rule of thumb:** `viewBox` is the contract. Attributes are a default. Props/CSS are the instance.

## How SVG sizing works: authoring space, mapping, pixels

Think of SVG like a canvas API with XML syntax:

1. **Authoring space** — numbers in `d`, `cx`, `x`, … live in `viewBox` units.
2. **Mapping** — the renderer maps that box onto a viewport (CSS box or raster grid).
3. **Pixels** — only appear when something asks for a bitmap: PNG, `<canvas>`, screenshot, PDF flatten.

If the mapping is wrong, tweaking `stroke-width` will not save you — fix `viewBox` and where it projects first.

### Example: padding inside a 24×24 frame

Design tools love “frame is 24, glyph is ~16, centered”:

```xml
<svg width="24" height="24" viewBox="0 0 24 24">
  <!-- glyph roughly occupies 4…20 on both axes -->
  <path d="M8 6h8v12H8z" />
</svg>
```

| What you do | Result |
| --- | --- |
| Inline in a 24px button | Looks fine |
| Rasterize at 24×24, then show the PNG at 16 CSS px | Soft edges |
| Drop `width`/`height`, keep `viewBox`, size with CSS/props | Sharp at any px size |

Icon systems want the third row.

### Why viewBox “doesn’t work”: lying coordinates

```xml
<!-- paths authored in 0…100 space, viewBox lies -->
<svg width="24" height="24" viewBox="0 0 24 24">
  <circle cx="50" cy="50" r="40" />
</svg>
```

The circle’s center sits outside the declared box. You “fix” size in CSS and still see a clipped disc. The **`viewBox` contract** was wrong — not the button styles.

## Why React breaks SVG icon size

Browsers forgive messy HTML. React surfaces the conflict as prop order:

```jsx
// File default: 24. Call site: 16. Who wins?
export function Icon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <path d="…" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  );
}

<Icon width={16} height={16} className="text-slate-700" />
```

With `{...props}` last, `16` wins. Put the spread earlier and the call site silently loses. Teams can burn a week on “broken icons” before someone diffs attribute order.

A cleaner default for UI chrome:

```jsx
export function Icon({ size = 24, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path d="…" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  );
}
```

Keep `viewBox` stable. Expose **one** size API. Do not also hard-code a second size in CSS and a third in the PNG pipeline.

On React Native the same idea shows up as numeric props (`width={24}` on `<Svg>`). Same contract: `viewBox` in the asset, size at the call site. Need JSX / RN from markup quickly? Run it through the [SVG → React converter](https://getsvgeditor.com/svg-to-react) and check props against the live preview.

## Why PNG from SVG looks soft on retina

PNG ignores your design tokens. It only knows **how many pixels you asked the rasterizer for**.

Failure mode I still see in handoffs:

1. SVG `width`/`height` attributes say 24×24  
2. You export a 24×24 PNG  
3. You display it at 48 CSS pixels on a 2× screen **without** a 2× asset  
4. Someone files “SVG looks bad”

SVG was fine. You baked the wrong pixel budget. For transparency and 2× detail, see the [SVG to PNG guide](https://getsvgeditor.com/blog/svg-to-png).

### Table: CSS size → DPR → PNG

| CSS slot | DPR | PNG you should export |
| --- | --- | --- |
| 24×24 | 1× | 24×24 |
| 24×24 | 2× | 48×48 |
| 16×16 | 2× | 32×32 |
| 24×24 | 3× | 72×72 |

Never upscale a 16px PNG in CSS and call it retina.

### Checklist before you export SVG to PNG

1. `viewBox` matches real path bounds (no surprise crop)  
2. Decide **CSS display size** first (email template, CMS block, whatever)  
3. Multiply by the DPR you care about, then export  
4. Prefer transparency; flatten to white only if the host requires it  
5. If the host can take SVG (modern web UI), you often don’t need PNG

When an export looks “soft” but the paths are fine, stop guessing: paste the markup, nudge `width`/`height` against the preview, then download 1×/2× from the PNG tab. That loop is easy in the [online SVG → PNG tool](https://getsvgeditor.com/svg-to-png) on [getsvgeditor.com](https://getsvgeditor.com) — same file, three sizes, visible mapping.

## Inline SVG vs img vs React component

| Approach | Size control | Theming | Wins when |
| --- | --- | --- | --- |
| `<img src="*.svg">` | CSS on the image box | Weak (`currentColor` won’t theme the file) | Static logos, CMS |
| Inline SVG | CSS + attributes | Strong | One-off art in a page |
| React / RN component | props + tokens | Strong | Design-system icons, repeated chrome |

Size bugs appear in all three. Components just make the contract explicit: **`viewBox` in the file, size at the call site**.

## 60-second SVG icon audit

1. Honest root `viewBox`? Don’t invent `0 0 24 24` if the art is `0 0 20 20`.  
2. Do `width`/`height` attributes duplicate a size CSS already sets? Remove or align to the default token.  
3. In JSX, can callers override `size` and `aria-*` via `{...props}` order?  
4. Hard-coded `#000` on UI chrome? Prefer `currentColor` (wrong color + wrong size = “the icon is broken”).  
5. Need PNG? CSS size → × DPR → rasterize. Never upscale a tiny bitmap.

## Standardize SVG sizing once per team

Write it down; stop rediscovering it in PR review:

- **Authoring:** one square `viewBox` (24 *or* 20 — pick one).  
- **Web:** components with `size` + `currentColor`; no per-instance path edits.  
- **Email / older hosts:** PNG at 2×, template sized to the 1× CSS slot.  
- **Pipeline:** SVGR (or equivalent) for a steady stream of `.svg` files; paste-to-JSX when you need one component and a live preview now.

Three sizes will always exist. Production only stays calm when **one** of them is allowed to argue.

## FAQ: SVG sizing questions

### What is the difference between viewBox and width/height in SVG?

`viewBox` defines the drawing’s **coordinate system**. `width`/`height` are only a default **presentation** size until CSS or props override them. For icons, the contract is `viewBox`; instance size belongs outside the file.

### Why does a Figma SVG look the wrong size in the browser?

Three signals usually ship together: `viewBox`, `width`/`height` attributes, and CSS. The design tool exports all of them; the app listens to a different one than the designer assumed. The glyph may also not fill the full 24×24 frame.

### Why is PNG from SVG blurry on Retina?

You rasterized 1× (e.g. 24×24) but display it in a 24 CSS px slot on a 2× screen — not enough pixels. Export 48×48 for a 24×24 CSS slot at DPR 2.

### I have a viewBox, but the icon is clipped. Why?

Path / `cx` / `cy` coordinates don’t match the declared `viewBox` (classic: art in `0…100`, box `0 0 24 24`). Fix `viewBox` to the real bounds — not the button size in CSS.

### How should I size SVG in React?

Keep a stable `viewBox`, expose one API like `size`, and order `{...props}` so callers can override size and `aria-*`. Don’t also hard-code a third size in CSS and a fourth in the PNG pipeline.

### When should I keep SVG vs export PNG?

Modern web UI and theming → SVG / component. PNG → email, older CMS, or hosts that won’t take SVG. Then compute CSS slot × DPR and export a transparent bitmap on purpose.
