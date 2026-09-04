#!/usr/bin/env python3
"""Generate change-*-stroke-color SVG tool pages from optimize-svg-file.html."""
from pathlib import Path
import re
import json

root = Path(__file__).resolve().parent.parent
template = (root / "optimize-svg-file.html").read_text(encoding="utf-8")

PAGES = [
  {
    "slug": "change-svg-stroke-color",
    "title": "Change SVG Stroke Color Online — Free Tool | getsvgeditor.com",
    "description": "Change SVG stroke color online. Recolor outlines on paths and icons with a live preview — free, in your browser, no upload.",
    "h1": "Change SVG Stroke Color",
    "crumb": "Change stroke color",
    "sub": "Recolor <strong>stroke</strong> on paths, shapes, and icons without rewriting every attribute by hand",
    "og_alt": "Change SVG stroke color in SVGEditor — live preview",
    "app_name": "Change SVG Stroke Color",
    "app_alts": [
      "Change SVG stroke color",
      "SVG stroke color changer",
      "Recolor SVG outline",
      "Edit SVG stroke color online",
    ],
    "app_desc": "Free online tool to change SVG stroke color. Paste the file, click Change stroke color, and preview the recolored outline.",
    "features": [
      "Cycle stroke colors on shapes and paths",
      "Keep fills and geometry intact",
      "Live preview",
      "Runs entirely in the browser — no file upload",
    ],
    "howto_name": "Change the stroke color of an SVG",
    "howto_desc": "Paste stroked SVG markup, recolor outlines, and preview the result in the browser.",
    "howto_click": "Click Change stroke color. Stroke attributes and inherited strokes update to the next palette color.",
    "btn": "Change stroke color",
    "btn_title": "Change the stroke color on this SVG",
    "faq_aria": "Change SVG stroke color FAQ",
    "faqs": [
      (
        "How do I change SVG stroke color online?",
        "Paste or upload the SVG, then click Change stroke color. Outlines update in the source and live preview.",
      ),
      (
        "Does this change fill as well?",
        "No. Only stroke / stroke attributes and inherited strokes are recolored. Fills stay as they are.",
      ),
      (
        "Can I use CSS or currentColor instead?",
        "Yes. Open Change SVG Stroke Color with CSS, currentColor, React, or Tailwind for recipe-focused pages.",
      ),
      (
        "Need path-only or icon-only wording?",
        "Use Change SVG Path Stroke Color or Change SVG Icon Stroke Color for narrower intents.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">CSS recipe? <a href="/change-svg-stroke-color-css">Stroke + CSS</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">currentColor? <a href="/change-svg-stroke-color-currentcolor">Use currentColor</a></span>',
    "guides": [
      ("/change-svg-stroke-color-css", "Stroke color with CSS →"),
      ("/change-svg-stroke-color-javascript", "Stroke color with JS →"),
      ("/change-svg-path-stroke-color", "Path stroke color →"),
      ("/change-svg-icon-stroke-color", "Icon stroke color →"),
    ],
  },
  {
    "slug": "change-svg-stroke-color-css",
    "title": "Change SVG Stroke Color with CSS Online — Free Tool | getsvgeditor.com",
    "description": "Change SVG stroke color with CSS. Switch strokes to currentColor and copy a ready CSS snippet — free, no upload.",
    "h1": "Change SVG Stroke Color with CSS",
    "crumb": "Stroke color CSS",
    "sub": "Set stroke to <code>currentColor</code> and copy a <strong>CSS</strong> color recipe",
    "og_alt": "Change SVG stroke color with CSS in SVGEditor",
    "app_name": "Change SVG Stroke Color with CSS",
    "app_alts": [
      "Change SVG stroke color CSS",
      "SVG stroke color CSS",
      "CSS recolor SVG stroke",
      "SVG currentColor CSS stroke",
    ],
    "app_desc": "Free online tool to prepare SVG stroke for CSS. Applies currentColor and copies a CSS snippet you can paste into your stylesheet.",
    "features": [
      "Applies currentColor to stroke",
      "Copies CSS color recipe",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Change SVG stroke color with CSS",
    "howto_desc": "Prepare stroked SVG for CSS theming with currentColor and a copyable CSS snippet.",
    "howto_click": "Click Apply currentColor + copy CSS. Strokes switch to currentColor and a CSS color rule is copied.",
    "btn": "Apply currentColor + copy CSS",
    "btn_title": "Apply currentColor stroke and copy CSS",
    "faq_aria": "Change SVG stroke color with CSS FAQ",
    "faqs": [
      (
        "How do I change SVG stroke color with CSS?",
        "Paste the SVG, click Apply currentColor + copy CSS, then paste the copied rule into your stylesheet and set color on a parent.",
      ),
      (
        "Why currentColor?",
        "currentColor lets the stroke follow the CSS color property, so one class or parent color can theme the icon.",
      ),
      (
        "Does the path d attribute change?",
        "No. Geometry stays the same; only stroke / color inheritance is prepared for CSS.",
      ),
      (
        "Prefer React or Tailwind?",
        "See Change SVG Stroke Color React or Change SVG Stroke Color Tailwind for framework snippets.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">JS snippet? <a href="/change-svg-stroke-color-javascript">Stroke + JS</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hover? <a href="/change-svg-stroke-color-hover">Stroke hover</a></span>',
    "guides": [
      ("/change-svg-stroke-color", "Change stroke color →"),
      ("/change-svg-stroke-color-currentcolor", "Use currentColor →"),
      ("/change-svg-stroke-color-hover", "Stroke hover recipe →"),
      ("/change-svg-stroke-color-without-editing-svg", "CSS without path edit →"),
    ],
  },
  {
    "slug": "change-svg-stroke-color-javascript",
    "title": "Change SVG Stroke Color with JavaScript Online — Free Tool | getsvgeditor.com",
    "description": "Change SVG stroke color with JavaScript. Recolor outlines and copy a JS snippet — free browser tool, no upload.",
    "h1": "Change SVG Stroke Color with JavaScript",
    "crumb": "Stroke color JS",
    "sub": "Recolor stroke in the markup and copy a <strong>JavaScript</strong> setAttribute snippet",
    "og_alt": "Change SVG stroke color with JavaScript in SVGEditor",
    "app_name": "Change SVG Stroke Color with JavaScript",
    "app_alts": [
      "Change SVG stroke color JavaScript",
      "SVG stroke color JS",
      "JavaScript recolor SVG stroke",
      "setAttribute stroke SVG",
    ],
    "app_desc": "Free online tool to recolor SVG stroke and copy a JavaScript snippet that sets stroke on elements.",
    "features": [
      "Recolors stroke in markup",
      "Copies JS setAttribute recipe",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Change SVG stroke color with JavaScript",
    "howto_desc": "Update stroke colors in SVG and get a copyable JS snippet for runtime recoloring.",
    "howto_click": "Click Recolor stroke + copy JS. Strokes update in the editor and a JS snippet is copied to the clipboard.",
    "btn": "Recolor stroke + copy JS",
    "btn_title": "Recolor stroke and copy JavaScript snippet",
    "faq_aria": "Change SVG stroke color with JavaScript FAQ",
    "faqs": [
      (
        "How do I change SVG stroke color with JavaScript?",
        "Paste the SVG, click Recolor stroke + copy JS, then adapt the copied snippet to query your inline SVG nodes.",
      ),
      (
        "Does this mutate the file in the editor?",
        "Yes. Stroke colors update in Source and preview; the clipboard also gets a small JS example.",
      ),
      (
        "Inline SVG in the DOM?",
        "Use Change Inline SVG Stroke Color for markup aimed at HTML embeds, then wire the JS snippet to those nodes.",
      ),
      (
        "Want CSS instead of JS?",
        "Open Change SVG Stroke Color with CSS for a currentColor + stylesheet approach.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">CSS? <a href="/change-svg-stroke-color-css">Stroke + CSS</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">React? <a href="/change-svg-stroke-color-react">Stroke + React</a></span>',
    "guides": [
      ("/change-svg-stroke-color", "Change stroke color →"),
      ("/change-svg-stroke-color-css", "Stroke + CSS →"),
      ("/change-inline-svg-stroke-color", "Inline stroke →"),
      ("/change-svg-stroke-color-react", "Stroke + React →"),
    ],
  },
  {
    "slug": "change-inline-svg-stroke-color",
    "title": "Change Inline SVG Stroke Color Online — Free Tool | getsvgeditor.com",
    "description": "Change inline SVG stroke color online. Recolor outlines in HTML-embedded SVG markup — free, no upload.",
    "h1": "Change Inline SVG Stroke Color",
    "crumb": "Inline stroke color",
    "sub": "Recolor stroke on <strong>inline</strong> SVG you paste into HTML",
    "og_alt": "Change inline SVG stroke color in SVGEditor",
    "app_name": "Change Inline SVG Stroke Color",
    "app_alts": [
      "Change inline SVG stroke color",
      "Inline SVG stroke recolor",
      "Edit embedded SVG stroke",
      "HTML inline SVG stroke color",
    ],
    "app_desc": "Free online tool to change stroke color on inline SVG markup meant for HTML embeds.",
    "features": [
      "Targets inline / embedded SVG strokes",
      "Keeps path geometry intact",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Change stroke color on inline SVG",
    "howto_desc": "Paste inline SVG from your HTML, recolor the stroke, and copy the updated markup back.",
    "howto_click": "Click Change inline stroke. Stroke colors on the inline graphic update in Source and preview.",
    "btn": "Change inline stroke",
    "btn_title": "Change stroke color on this inline SVG",
    "faq_aria": "Change inline SVG stroke color FAQ",
    "faqs": [
      (
        "How do I change inline SVG stroke color?",
        "Copy the <svg> from your HTML into Source, click Change inline stroke, then paste the updated markup back into the page.",
      ),
      (
        "Is inline SVG different from an img src?",
        "Yes. Inline SVG lives in the DOM so stroke and CSS can target it directly. External SVG files need file-level edits or CSS tricks.",
      ),
      (
        "Can I theme it with currentColor next?",
        "Yes. After recoloring, open Use currentColor or Stroke with CSS to switch to inheritance-based theming.",
      ),
      (
        "Need a JS runtime change?",
        "See Change SVG Stroke Color with JavaScript for a setAttribute snippet.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Hub? <a href="/change-svg-stroke-color">Change stroke color</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">CSS theme? <a href="/change-svg-stroke-color-css">Stroke + CSS</a></span>',
    "guides": [
      ("/change-svg-stroke-color", "Change stroke color →"),
      ("/change-svg-stroke-color-javascript", "Stroke + JS →"),
      ("/change-svg-icon-stroke-color", "Icon stroke →"),
      ("/change-svg-stroke-color-currentcolor", "Use currentColor →"),
    ],
  },
  {
    "slug": "change-svg-stroke-color-hover",
    "title": "Change SVG Stroke Color on Hover Online — Free Tool | getsvgeditor.com",
    "description": "Change SVG stroke color on hover. Apply a currentColor hover recipe and copy CSS — free, no upload.",
    "h1": "Change SVG Stroke Color on Hover",
    "crumb": "Stroke hover",
    "sub": "Prepare stroke for a <strong>hover</strong> color change with currentColor + CSS",
    "og_alt": "Change SVG stroke color on hover in SVGEditor",
    "app_name": "Change SVG Stroke Color on Hover",
    "app_alts": [
      "Change SVG stroke color hover",
      "SVG stroke hover color",
      "Hover recolor SVG outline",
      "SVG icon hover stroke CSS",
    ],
    "app_desc": "Free online tool to prepare SVG stroke for hover theming. Applies currentColor and copies a hover CSS recipe.",
    "features": [
      "Applies currentColor for hover theming",
      "Copies hover CSS recipe",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Change SVG stroke color on hover",
    "howto_desc": "Switch strokes to currentColor and copy a CSS hover recipe for interactive icons.",
    "howto_click": "Click Apply hover recipe. Strokes use currentColor and a :hover CSS snippet is copied.",
    "btn": "Apply hover recipe",
    "btn_title": "Apply hover stroke recipe and copy CSS",
    "faq_aria": "Change SVG stroke color on hover FAQ",
    "faqs": [
      (
        "How do I change SVG stroke color on hover?",
        "Paste the SVG, click Apply hover recipe, then paste the copied CSS so :hover sets a new color on the parent or icon class.",
      ),
      (
        "Why does the SVG need currentColor?",
        "Hover CSS typically changes color; currentColor makes the stroke follow that property without editing every stroke attribute on hover.",
      ),
      (
        "Works with <img> tags?",
        "Hover CSS cannot restyle strokes inside an external img file. Use inline SVG (or a sprite) for hover recolors.",
      ),
      (
        "Want Tailwind hover utilities?",
        "Open Change SVG Stroke Color Tailwind for a stroke-current + utility-class approach.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Base CSS? <a href="/change-svg-stroke-color-css">Stroke + CSS</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Tailwind? <a href="/change-svg-stroke-color-tailwind">Stroke + Tailwind</a></span>',
    "guides": [
      ("/change-svg-stroke-color", "Change stroke color →"),
      ("/change-svg-stroke-color-css", "Stroke + CSS →"),
      ("/change-svg-stroke-color-currentcolor", "Use currentColor →"),
      ("/change-svg-stroke-color-tailwind", "Stroke + Tailwind →"),
    ],
  },
  {
    "slug": "change-svg-stroke-color-currentcolor",
    "title": "Change SVG Stroke to currentColor Online — Free Tool | getsvgeditor.com",
    "description": "Change SVG stroke to currentColor online. Replace hardcoded stroke colors so CSS color can theme the outline — free, no upload.",
    "h1": "Change SVG Stroke to currentColor",
    "crumb": "Stroke currentColor",
    "sub": "Replace hardcoded stroke colors with <code>currentColor</code>",
    "og_alt": "Change SVG stroke to currentColor in SVGEditor",
    "app_name": "Change SVG Stroke to currentColor",
    "app_alts": [
      "Change SVG stroke currentColor",
      "SVG stroke currentColor",
      "Replace stroke with currentColor",
      "SVG inherit stroke color",
    ],
    "app_desc": "Free online tool to switch SVG stroke attributes to currentColor for CSS theming.",
    "features": [
      "Sets stroke to currentColor",
      "Enables CSS color inheritance",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Change SVG stroke to currentColor",
    "howto_desc": "Replace hardcoded stroke colors with currentColor so parent CSS color drives the outline.",
    "howto_click": "Click Use currentColor. Hardcoded stroke colors switch to currentColor in the markup.",
    "btn": "Use currentColor",
    "btn_title": "Switch stroke colors to currentColor",
    "faq_aria": "Change SVG stroke to currentColor FAQ",
    "faqs": [
      (
        "How do I change SVG stroke to currentColor?",
        "Paste the SVG and click Use currentColor. Stroke attributes that were hex or named colors become currentColor.",
      ),
      (
        "What does currentColor do?",
        "The stroke paints with the computed CSS color of the element (or inherited color), so text color and icon stroke can match.",
      ),
      (
        "Do I still need CSS?",
        "Set color on the SVG or a parent. For a ready rule, open Change SVG Stroke Color with CSS.",
      ),
      (
        "Avoid editing path data?",
        "This tool only touches stroke color tokens — see also Change SVG Stroke Color Without Editing SVG.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Copy CSS? <a href="/change-svg-stroke-color-css">Stroke + CSS</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">No path edit? <a href="/change-svg-stroke-color-without-editing-svg">CSS color only</a></span>',
    "guides": [
      ("/change-svg-stroke-color", "Change stroke color →"),
      ("/change-svg-stroke-color-css", "Stroke + CSS →"),
      ("/change-svg-stroke-color-hover", "Stroke hover →"),
      ("/change-svg-stroke-color-react", "Stroke + React →"),
    ],
  },
  {
    "slug": "change-svg-stroke-color-react",
    "title": "Change SVG Stroke Color in React Online — Free Tool | getsvgeditor.com",
    "description": "Change SVG stroke color in React. Apply currentColor and copy a React-friendly snippet — free, no upload.",
    "h1": "Change SVG Stroke Color in React",
    "crumb": "Stroke color React",
    "sub": "Prepare stroke for <strong>React</strong> props / JSX and copy a ready snippet",
    "og_alt": "Change SVG stroke color in React in SVGEditor",
    "app_name": "Change SVG Stroke Color in React",
    "app_alts": [
      "Change SVG stroke color React",
      "React SVG stroke color",
      "JSX SVG stroke currentColor",
      "React icon stroke color",
    ],
    "app_desc": "Free online tool to prepare SVG stroke for React. Applies currentColor and copies a React/JSX color snippet.",
    "features": [
      "Applies currentColor for React theming",
      "Copies React / JSX snippet",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Change SVG stroke color in React",
    "howto_desc": "Switch strokes to currentColor and copy a React snippet for prop-driven icon colors.",
    "howto_click": "Click Apply + copy React. Strokes use currentColor and a React color snippet is copied.",
    "btn": "Apply + copy React",
    "btn_title": "Apply currentColor and copy React snippet",
    "faq_aria": "Change SVG stroke color in React FAQ",
    "faqs": [
      (
        "How do I change SVG stroke color in React?",
        "Paste the SVG, click Apply + copy React, put the markup in a component, and pass color via style or className as in the snippet.",
      ),
      (
        "stroke or strokeWidth in JSX?",
        "React uses camelCase DOM props (stroke, strokeWidth). currentColor still works the same as in HTML.",
      ),
      (
        "Prefer Tailwind classes in React?",
        "Use Change SVG Stroke Color Tailwind for stroke-current utility patterns.",
      ),
      (
        "Need a plain CSS recipe?",
        "Open Change SVG Stroke Color with CSS.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Tailwind? <a href="/change-svg-stroke-color-tailwind">Stroke + Tailwind</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">JS? <a href="/change-svg-stroke-color-javascript">Stroke + JS</a></span>',
    "guides": [
      ("/change-svg-stroke-color", "Change stroke color →"),
      ("/change-svg-stroke-color-css", "Stroke + CSS →"),
      ("/change-svg-stroke-color-currentcolor", "Use currentColor →"),
      ("/change-svg-stroke-color-tailwind", "Stroke + Tailwind →"),
    ],
  },
  {
    "slug": "change-svg-stroke-color-tailwind",
    "title": "Change SVG Stroke Color with Tailwind Online — Free Tool | getsvgeditor.com",
    "description": "Change SVG stroke color with Tailwind. Apply stroke-current ready markup and copy a Tailwind snippet — free, no upload.",
    "h1": "Change SVG Stroke Color with Tailwind",
    "crumb": "Stroke color Tailwind",
    "sub": "Prepare stroke for <strong>Tailwind</strong> <code>stroke-*</code> / text color utilities",
    "og_alt": "Change SVG stroke color with Tailwind in SVGEditor",
    "app_name": "Change SVG Stroke Color with Tailwind",
    "app_alts": [
      "Change SVG stroke color Tailwind",
      "Tailwind SVG stroke color",
      "stroke-current SVG",
      "Tailwind icon stroke",
    ],
    "app_desc": "Free online tool to prepare SVG stroke for Tailwind. Applies currentColor and copies a Tailwind class snippet.",
    "features": [
      "Applies currentColor for stroke-* utilities",
      "Copies Tailwind class recipe",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Change SVG stroke color with Tailwind",
    "howto_desc": "Switch strokes to currentColor and copy Tailwind classes that set the icon color.",
    "howto_click": "Click Apply + copy Tailwind. Strokes use currentColor and a Tailwind class snippet is copied.",
    "btn": "Apply + copy Tailwind",
    "btn_title": "Apply currentColor and copy Tailwind snippet",
    "faq_aria": "Change SVG stroke color with Tailwind FAQ",
    "faqs": [
      (
        "How do I change SVG stroke color with Tailwind?",
        "Paste the SVG, click Apply + copy Tailwind, then add the copied classes (for example text-rose-500 stroke-current) on the SVG or parent.",
      ),
      (
        "stroke-rose-500 vs text color?",
        "Either works. stroke-* sets stroke directly; currentColor + text-* lets stroke follow the text color utility.",
      ),
      (
        "Hover with Tailwind?",
        "Combine with hover:text-* after applying currentColor — or open the dedicated hover recipe page.",
      ),
      (
        "Using React + Tailwind?",
        "This page pairs well with Change SVG Stroke Color React; both use currentColor-friendly markup.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">React? <a href="/change-svg-stroke-color-react">Stroke + React</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hover? <a href="/change-svg-stroke-color-hover">Stroke hover</a></span>',
    "guides": [
      ("/change-svg-stroke-color", "Change stroke color →"),
      ("/change-svg-stroke-color-css", "Stroke + CSS →"),
      ("/change-svg-stroke-color-hover", "Stroke hover →"),
      ("/change-svg-stroke-color-without-editing-svg", "CSS without path edit →"),
    ],
  },
  {
    "slug": "change-svg-path-stroke-color",
    "title": "Change SVG Path Stroke Color Online — Free Tool | getsvgeditor.com",
    "description": "Change SVG path stroke color online. Recolor path outlines while leaving other shapes alone when possible — free, no upload.",
    "h1": "Change SVG Path Stroke Color",
    "crumb": "Path stroke color",
    "sub": "Recolor <strong>path</strong> stroke without rewriting the <code>d</code> attribute",
    "og_alt": "Change SVG path stroke color in SVGEditor",
    "app_name": "Change SVG Path Stroke Color",
    "app_alts": [
      "Change SVG path stroke color",
      "SVG path stroke recolor",
      "Edit path stroke color",
      "Recolor SVG path outline",
    ],
    "app_desc": "Free online tool to change stroke color on SVG path elements with live preview.",
    "features": [
      "Focuses on path stroke color",
      "Leaves path d geometry intact",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Change the stroke color of an SVG path",
    "howto_desc": "Paste SVG with stroked paths, recolor path outlines, and preview the result.",
    "howto_click": "Click Change path stroke. Path stroke colors update while the d attribute stays the same.",
    "btn": "Change path stroke",
    "btn_title": "Change stroke color on SVG paths",
    "faq_aria": "Change SVG path stroke color FAQ",
    "faqs": [
      (
        "How do I change SVG path stroke color?",
        "Paste the SVG and click Change path stroke. Path outlines update in Source and the live preview.",
      ),
      (
        "Will the path d data change?",
        "No. Only stroke color tokens change; coordinates in d are untouched.",
      ),
      (
        "What about rect or circle strokes?",
        "This page is path-focused. For mixed shapes, use the hub Change SVG Stroke Color.",
      ),
      (
        "Icon set at 24×24?",
        "Try Change SVG Icon Stroke Color for UI-icon wording and samples.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Any stroke? <a href="/change-svg-stroke-color">Change stroke color</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Icon? <a href="/change-svg-icon-stroke-color">Icon stroke</a></span>',
    "guides": [
      ("/change-svg-stroke-color", "Change stroke color →"),
      ("/change-svg-icon-stroke-color", "Icon stroke →"),
      ("/change-inline-svg-stroke-color", "Inline stroke →"),
      ("/change-svg-stroke-color-css", "Stroke + CSS →"),
    ],
  },
  {
    "slug": "change-svg-icon-stroke-color",
    "title": "Change SVG Icon Stroke Color Online — Free Tool | getsvgeditor.com",
    "description": "Change SVG icon stroke color online. Recolor outline icons for UI kits with a live preview — free, no upload.",
    "h1": "Change SVG Icon Stroke Color",
    "crumb": "Icon stroke color",
    "sub": "Recolor <strong>outline icons</strong> (stroke-based UI marks)",
    "og_alt": "Change SVG icon stroke color in SVGEditor",
    "app_name": "Change SVG Icon Stroke Color",
    "app_alts": [
      "Change SVG icon stroke color",
      "SVG icon stroke recolor",
      "Outline icon color change",
      "UI icon stroke color online",
    ],
    "app_desc": "Free online tool to change stroke color on SVG outline icons used in UI kits.",
    "features": [
      "Recolors outline icon strokes",
      "Works with 24×24-style icons",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Change the stroke color of an SVG icon",
    "howto_desc": "Paste an outline icon, recolor its stroke, and preview the themed mark.",
    "howto_click": "Click Change icon stroke. Outline strokes on the icon update in Source and preview.",
    "btn": "Change icon stroke",
    "btn_title": "Change stroke color on this SVG icon",
    "faq_aria": "Change SVG icon stroke color FAQ",
    "faqs": [
      (
        "How do I change SVG icon stroke color?",
        "Paste the outline icon and click Change icon stroke. Stroke colors update while fills (if any) stay put.",
      ),
      (
        "Best for Heroicons / Lucide-style icons?",
        "Yes. Stroke-based 24×24 icons are the intended sample — switch to currentColor afterward for theming.",
      ),
      (
        "Theme with CSS or Tailwind next?",
        "Use currentColor, CSS, React, or Tailwind companion pages after the recolor pass.",
      ),
      (
        "Only a single path?",
        "Change SVG Path Stroke Color covers path-focused wording.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">currentColor? <a href="/change-svg-stroke-color-currentcolor">Use currentColor</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Tailwind? <a href="/change-svg-stroke-color-tailwind">Stroke + Tailwind</a></span>',
    "guides": [
      ("/change-svg-stroke-color", "Change stroke color →"),
      ("/change-svg-path-stroke-color", "Path stroke →"),
      ("/change-svg-stroke-color-currentcolor", "Use currentColor →"),
      ("/change-svg-stroke-color-hover", "Stroke hover →"),
    ],
  },
  {
    "slug": "change-svg-stroke-color-without-editing-svg",
    "title": "Change SVG Stroke Color Without Editing SVG Online — Free Tool | getsvgeditor.com",
    "description": "Change SVG stroke color without editing path data. Switch to currentColor so CSS can set the color — free, no upload.",
    "h1": "Change SVG Stroke Color Without Editing SVG",
    "crumb": "Stroke without editing",
    "sub": "Keep path <code>d</code> intact — switch stroke to <strong>currentColor</strong> for CSS control",
    "og_alt": "Change SVG stroke color without editing SVG in SVGEditor",
    "app_name": "Change SVG Stroke Color Without Editing SVG",
    "app_alts": [
      "Change SVG stroke color without editing",
      "SVG stroke color CSS only",
      "Recolor SVG without editing paths",
      "SVG stroke via CSS color",
    ],
    "app_desc": "Free online tool to enable CSS stroke color without rewriting path geometry. Switches stroke to currentColor.",
    "features": [
      "Keeps path d unchanged",
      "Enables CSS color control via currentColor",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Change SVG stroke color without editing the SVG paths",
    "howto_desc": "Switch stroke to currentColor so external CSS can set the color without touching path data.",
    "howto_click": "Click Use CSS color (no path edit). Strokes become currentColor; path d attributes stay the same.",
    "btn": "Use CSS color (no path edit)",
    "btn_title": "Switch stroke to currentColor without editing paths",
    "faq_aria": "Change SVG stroke color without editing SVG FAQ",
    "faqs": [
      (
        "How do I change SVG stroke color without editing the SVG?",
        "In production you set CSS color on a parent. This tool prepares the file by switching stroke to currentColor so that CSS works — path d is not rewritten.",
      ),
      (
        "Is any markup change required?",
        "A one-time stroke→currentColor swap (or root stroke) is usually required for external CSS. Geometry and path commands stay untouched.",
      ),
      (
        "img src files?",
        "External SVG referenced as img cannot be restyled from page CSS. Inline the SVG or use a mask/filter approach.",
      ),
      (
        "Want the CSS snippet too?",
        "Open Change SVG Stroke Color with CSS for a copyable rule after applying currentColor.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Copy CSS? <a href="/change-svg-stroke-color-css">Stroke + CSS</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">currentColor only? <a href="/change-svg-stroke-color-currentcolor">Use currentColor</a></span>',
    "guides": [
      ("/change-svg-stroke-color", "Change stroke color →"),
      ("/change-svg-stroke-color-css", "Stroke + CSS →"),
      ("/change-svg-stroke-color-currentcolor", "Use currentColor →"),
      ("/change-svg-stroke-color-hover", "Stroke hover →"),
    ],
  },
]


def esc(s):
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def json_esc(s):
    return json.dumps(s, ensure_ascii=False)[1:-1]


def faq_schema(faqs):
    items = []
    for q, a in faqs:
        items.append(
            f'''              {{
                "@type": "Question",
                "name": "{json_esc(q)}",
                "acceptedAnswer": {{
                  "@type": "Answer",
                  "text": "{json_esc(a)}"
                }}
              }}'''
        )
    return ",\n".join(items)


def faq_html(faqs):
    blocks = []
    for q, a in faqs:
        blocks.append(
            f"""              <div>
                <dt>{esc(q)}</dt>
                <dd>{esc(a)}</dd>
              </div>"""
        )
    return "\n".join(blocks)


def guides_html(guides):
    return "\n".join(
        f'            <a class="tool-faq-guide" href="{href}">{esc(label)}</a>'
        for href, label in guides
    )


def build_page(p):
    text = template
    slug = p["slug"]
    url = f"https://getsvgeditor.com/{slug}"

    text = text.replace(
        "Optimize SVG File Online — Free Tool | getsvgeditor.com",
        p["title"],
    )
    for _desc_attr in (
        'name="description"',
        'property="og:description"',
        'name="twitter:description"',
    ):
        text = re.sub(
            rf'(<meta\n\s+{_desc_attr}\n\s+content=")[^"]*(")',
            rf'\1{p["description"]}\2',
            text,
            count=1,
        )
        text = re.sub(
            rf'(<meta {_desc_attr} content=")[^"]*(")',
            rf'\1{p["description"]}\2',
            text,
            count=1,
        )

    text = text.replace("https://getsvgeditor.com/optimize-svg-file", url)
    text = text.replace(
        "Optimize an SVG file online. Clean metadata, comments, unused ids, and compact markup for production-ready SVG — free, in your browser.",
        p["description"],
    )
    text = text.replace(
        "Optimize SVG file in SVGEditor",
        p["og_alt"],
    )

    text = text.replace(
        'class="app-page tool-page clean-tool-page" data-clean-intent="optimize-svg-file" data-mobile-mode="preview" data-default-tab="preview"',
        f'class="app-page tool-page stroke-tool-page" data-stroke-intent="{slug}" data-mobile-mode="preview" data-default-tab="preview"',
    )

    text = text.replace(
        'href="/fix-svg-viewbox" aria-current="page"',
        f'href="/{slug}" aria-current="page"',
    )

    text = re.sub(
        r'(<span aria-current="page">)Optimize SVG(</span>)',
        rf'\1{esc(p["crumb"])}\2',
        text,
        count=1,
    )
    text = re.sub(
        r'(<h1 class="tool-title">)Optimize SVG File(</h1>)',
        rf'\1{esc(p["h1"])}\2',
        text,
        count=1,
    )
    text = re.sub(
        r'<p class="tool-sub">[\s\S]*?</p>\n\s*<p class="tool-note">[\s\S]*?</p>',
        f'<p class="tool-sub">{p["sub"]}</p>\n        <p class="tool-note">{p["note_html"]}</p>',
        text,
        count=1,
    )

    old_faq = re.search(r'<div class="tool-faq-panel"[\s\S]*?</details>', text)
    if not old_faq:
        raise SystemExit("FAQ panel not found")
    new_faq = f'''<div class="tool-faq-panel" role="region" aria-label="{esc(p["faq_aria"])}">
            <p class="tool-faq-heading">Quick answers</p>
            <dl class="tool-faq-list">
{faq_html(p["faqs"])}
            </dl>
{guides_html(p["guides"])}
            <p class="tool-faq-legal">
              <a href="/privacy">Privacy</a>
              <span aria-hidden="true">·</span>
              <a href="/terms">Terms</a>
            </p>
          </div>
        </details>'''
    text = text[: old_faq.start()] + new_faq + text[old_faq.end() :]

    text = re.sub(
        r'<button\n\s+type="button"\n\s+class="btn btn-accent"\n\s+id="btn-clean-action"\n\s+title="[^"]*"\n\s*>\n\s*Optimize SVG</button>',
        f'''<button
              type="button"
              class="btn btn-accent"
              id="btn-stroke-action"
              title="{esc(p["btn_title"])}"
            >
              {esc(p["btn"])}</button>''',
        text,
        count=1,
    )

    text = text.replace(
        '<p class="clean-size-stat" id="clean-size-stat" hidden aria-live="polite"></p>',
        "",
    )

    text = text.replace("Optimize SVG File", p["app_name"])

    text = re.sub(
        r'"alternateName": \[[\s\S]*?\],\n\s+"url":',
        '"alternateName": [\n'
        + ",\n".join(f'              "{json_esc(a)}"' for a in p["app_alts"])
        + '\n            ],\n            "url":',
        text,
        count=1,
    )

    text = re.sub(
        r'("description": ")Free online SVG optimizer[^"]*(")',
        rf'\1{json_esc(p["app_desc"])}\2',
        text,
        count=1,
    )

    text = re.sub(
        r'"featureList": \[[\s\S]*?\],\n\s+"publisher"',
        '"featureList": [\n'
        + ",\n".join(f'              "{json_esc(f)}"' for f in p["features"])
        + '\n            ],\n            "publisher"',
        text,
        count=1,
    )

    text = re.sub(
        r'("@id": "'
        + re.escape(url)
        + r'#faq",\n\s+"mainEntity": \[)[\s\S]*?(\]\n\s*\},)',
        rf"\1\n{faq_schema(p['faqs'])}\n            \2",
        text,
        count=1,
    )

    text = re.sub(
        r'"name": "Optimize an SVG file for production"',
        f'"name": "{json_esc(p["howto_name"])}"',
        text,
        count=1,
    )
    text = re.sub(
        r'"description": "Apply a full cleanup and compaction pass to SVG markup."',
        f'"description": "{json_esc(p["howto_desc"])}"',
        text,
        count=1,
    )
    text = text.replace(
        '"name": "SVGEditor Optimize SVG File"',
        f'"name": "SVGEditor {json_esc(p["app_name"])}"',
    )
    text = text.replace(
        f'"name": "SVGEditor {p["app_name"]}"',
        f'"name": "SVGEditor {json_esc(p["app_name"])}"',
    )

    text = re.sub(
        r'"name": "Paste the unoptimized SVG",\n\s+"text": "[^"]*"',
        '"name": "Paste or use the sample SVG",\n                "text": "Open the tool with the sample stroked graphic (viewBox only, no root width or height), or paste your own SVG into Source."',
        text,
        count=1,
    )
    text = re.sub(
        r'"name": "Click Optimize SVG",\n\s+"text": "[^"]*"',
        f'"name": "Click {json_esc(p["btn"])}",\n                "text": "{json_esc(p["howto_click"])}"',
        text,
        count=1,
    )
    text = re.sub(
        r'"name": "Copy or download",\n\s+"text": "[^"]*"',
        '"name": "Download or export",\n                "text": "Download the updated SVG, or export to PNG / React. Conversion stays in the browser."',
        text,
        count=1,
    )

    text = text.replace(
        "Paste or upload an SVG in the Source panel. Download a transparent PNG from the PNG\n                    tab — or export to React and share a link.",
        "Paste or upload a stroked SVG. Click the action button to recolor the stroke.",
    )
    text = text.replace(
        '<a href="/blog/svg-to-png">PNG guide</a>',
        '<a href="/change-svg-stroke-color">Change stroke color</a>',
    )

    out = root / f"{slug}.html"
    out.write_text(text, encoding="utf-8")
    print("wrote", out.name)
    return out


def main():
    assert len(PAGES) == 11
    for p in PAGES:
        build_page(p)
    print("done", len(PAGES))


if __name__ == "__main__":
    main()
