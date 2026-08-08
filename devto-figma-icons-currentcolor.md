
<!--
Dev.to / Hashnode: put Title in the UI field only — do NOT paste a # Title into the body.

Title: currentColor SVG icons in React: fix dark mode and #000 exports
Meta description: Hard-coded #000 SVG icons vanish on dark UI. How to structure React SVG with currentColor, viewBox, and props — plus paste-JSX vs SVGR and a merge checklist.
Slug: currentcolor-svg-icons-react-dark-mode
Tags: react, svg, typescript, webdev
Canonical (if your site owns the post): https://getsvgeditor.com/blog/svg-currentcolor-dark-ui
Also link: https://getsvgeditor.com/svg-to-react

Body starts below. Delete this HTML comment before publishing.
-->

You know the pattern: the app ships on a light theme, icons look fine, nobody thinks about tokens. Later someone flips the UI to dark — black background, same icons — and half the toolbar vanishes. Not because CSS “broke.” Because the SVG still has `fill="#000000"` (or a hard-coded grey), and you never wired color through a variable / `currentColor` in the first place.

Easy to run into on a real project: theming arrives later, the icon keeps a fixed paint value, the theme flips, and the icon disappears on the new background.

This is not a “use a better icon pack” problem. It is a **contract** problem: the SVG was authored as **paint on a canvas**, but your app needs a **glyph that inherits color**.

Below: how Figma/`#000` exports lie, how to structure React SVG icons with `currentColor`, when paste-JSX beats SVGR, and a 60-second merge checklist. For a worked browser path (paste → React / RN), use the [SVG to React converter](https://getsvgeditor.com/svg-to-react) on [getsvgeditor.com](https://getsvgeditor.com) — then still review paint yourself.

## Why Figma SVG exports break dark mode (`#000` and friends)

Most design tools give you something like:

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill="#000000" d="M12 2L2 7l10 5 10-5-10-5z"/>
  <path fill="#000000" d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
</svg>
```

`#000` is not “default.” It is a **hard theme choice**. Same trap with `#111`, `#1A1A1A`, `black`, or “almost black” greys from auto-export. Grep the file for those before you merge — that search catches more dark-mode bugs than another icon library.

Related sizing bugs (viewBox vs `width` vs CSS) are a separate contract; if the icon is the wrong *size* as well as the wrong *color*, fix geometry first, then paint.

## Three contracts for an SVG icon: paint, glyph, bitmap

Pick one. Mixing them is how icon systems rot.

- **Paint** — fixed colors in the file. Use for illustrations and logos with real brand hues.
- **Glyph** — shape only; color from CSS / props. Use for UI chrome (nav, buttons, inputs).
- **Bitmap handoff** — PNG/WebP for email, decks, or a CMS that rejects SVG.

UI chrome should almost always be a **glyph**. That is what `currentColor` is for. When you truly need a bitmap, size it with CSS slot × DPR — see the [SVG to PNG guide](https://getsvgeditor.com/blog/svg-to-png).

## React SVG icon component with currentColor (pattern that works)

```tsx
import type { SVGProps } from "react";

export default function LayersIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

Why this shape:

1. **`currentColor`** — fill/stroke follow `color` / Tailwind text classes. One source of truth with the theme.
2. **`{...props}` on the root** — callers own `className`, size, tests, and a11y overrides without editing the file.
3. **`viewBox` kept** — width/height become layout knobs, not geometry.
4. **`aria-hidden` by default** — decorative; the **button** (or link) gets the accessible name.

```tsx
<button type="button" aria-label="Layers">
  <LayersIcon className="text-sky-300" />
</button>
```

If Figma left a `<title>` inside the SVG, remove it when the control already has a name — otherwise screen readers announce twice.

**Stroke vs fill trap:** some Figma exports use `fill`, some use `stroke`, some mix both. Put `currentColor` on the attribute that actually paints. Leaving `fill="#000"` on a “stroke icon” is a classic silent miss in review.

## Dark mode SVG icons: one glyph, theme via CSS

Wrong fix: ship `icon-dark.svg` and `icon-light.svg`.  
Right fix: one glyph, theme via CSS.

```tsx
<nav className="text-slate-700 dark:text-slate-200">
  <LayersIcon className="h-5 w-5" />
</nav>
```

Multi-color product marks (logo with two brand hues) are **paint**, not glyphs. Do not force those through `currentColor`. Keep them as static SVG / `<img>`, or pass explicit props (`accent`, `muted`) if you truly need theming.

## React Native SVG icons: same contract, numeric props

React Native does not render HTML SVG. You want `react-native-svg`, and **numbers**, not strings:

```tsx
import Svg, { Path } from "react-native-svg";

export default function LayersIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} {...props}>
      <Path
        d="M12 2L2 7l10 5 10-5-10-5z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </Svg>
  );
}
```

`width="24"` vs `width={24}` is a classic RN footgun. Hand ports often forget one prop and fail in weird, quiet ways. If you generate JSX, emit numbers. The [SVG → React Native path](https://getsvgeditor.com/svg-to-react) in SVGEditor maps tags and numeric props in the browser — still verify `currentColor` / paint yourself.

## Paste-JSX vs SVGR for SVG to React — pick by volume

Neither is “more professional.”

- **SVGR (or similar) in the bundler** — dozens of `.svg` files land in the repo every week.
- **Paste JSX** — one-off icon, design handoff, shareable preview, or you also need React Native output without wiring a pipeline.
- **`<img>` / static asset** — huge illustration that never recolors. Do not componentize it.

Paste-JSX wins when you do not want to touch Vite / webpack / Next config for a single mark. Open [SVGEditor’s SVG to React tool](https://getsvgeditor.com/svg-to-react), paste SVG, copy React / RN JSX. SVGR wins when icons are a pipeline. Longer playbook: [Convert SVG to React (JSX)](https://getsvgeditor.com/blog/svg-to-react).

Before you trust any converter output, check three things yourself:

1. kebab-case → JSX (`stroke-width` → `strokeWidth`)
2. `{...props}` on the root `<svg>` / `<Svg>`
3. gradient / clip `id`s unique per file (two icons with `id="paint0"` on one page will fight)

Do **not** expect a converter to invent `currentColor` for you or uniquify every Figma `id` across your whole set. That is still your review.

## SVG icon bundle cost (the part people skip)

A React icon is **JavaScript in your bundle**.

- 40 toolbar icons as components → usually fine  
- one 200KB illustration inlined as JSX → you paid a tax for nothing  

Rule of thumb:

- **Chrome** → component + `currentColor`  
- **Marketing / email / CMS** → PNG or static SVG when the destination cannot theme  

`next/image` is the wrong hammer for interactive icons. It will not give you prop-driven stroke/fill the way an inline component does.

## Next.js App Router and SVG icon components

Icon components **without hooks** are valid Server Components — they are just JSX. Colocate named files under `components/icons/` so unused icons tree-shake. Avoid a mega `icons.tsx` barrel that re-exports the world and drags everything into the graph.

## Checklist: merge a React SVG icon in 60 seconds

1. Grep for `#000` / `#fff` / `black` / `white` that should be themeable → `currentColor` (or props)  
2. `currentColor` is on the paint that actually renders (`fill` and/or `stroke`)  
3. `viewBox` present  
4. Root spreads `{...props}`  
5. Decorative → `aria-hidden`; meaningful → name the control  
6. Gradient / clip `id`s unique per file  
7. RN path uses numeric props  
8. Full illustration → static asset, not a component  

## FAQ: currentColor, dark UI, and React SVG

### Why do my SVG icons disappear in dark mode?

Hard-coded fills/strokes (`#000`, `#111`, `black`) stay black when the background turns dark. UI chrome icons need a **glyph** contract: paint via `currentColor` (or theme props), not fixed hex in the file.

### Should every SVG use currentColor?

No. Brand logos and multi-hue illustrations are **paint**. Toolbar / nav / button icons are **glyphs** and should use `currentColor` (or explicit theme props).

### Does SVGR automatically fix currentColor?

Usually not in a way you can blindly trust. Pipelines can rewrite attributes, but Figma’s `#000` / mixed stroke+fill exports still need a human pass. Converters also won’t uniquify every `id` across your set.

### Paste-JSX or SVGR — which should I use?

SVGR (or similar) when icons are a steady stream of `.svg` files in the repo. Paste-JSX when you need one component, a live preview, or React Native output without touching the bundler — e.g. [getsvgeditor.com/svg-to-react](https://getsvgeditor.com/svg-to-react).

### How do I theme SVG icons with Tailwind?

Put `currentColor` on the painting attribute, then set color on a parent or via `className` (`text-slate-700 dark:text-slate-200`). One glyph file; theme owns the paint.

### What about React Native?

Use `react-native-svg`, keep `viewBox`, pass **numeric** `width`/`height`, and theme stroke/fill the same way you would on web (`currentColor` or props). String sizes are a common silent break.

If you have a sharper rule for icon reviews, drop it in the comments.
