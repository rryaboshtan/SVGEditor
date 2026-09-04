#!/usr/bin/env python3
"""Generate rotate-* long-tail tool pages from flip-svg-path-horizontally.html."""
from pathlib import Path
import re
import json

root = Path(__file__).resolve().parent.parent
template = (root / "flip-svg-path-horizontally.html").read_text(encoding="utf-8")

PAGES = [
  {
    "slug": "rotate-svg-path",
    "title": "Rotate SVG Path Online — Free Tool | getsvgeditor.com",
    "description": "Rotate an SVG path online around its center. Paste path markup, click Rotate path, and preview the turned graphic — free, no upload.",
    "h1": "Rotate SVG Path",
    "crumb": "Rotate SVG path",
    "sub": "Turn a path around the viewBox center without rewriting the <code>d</code> attribute",
    "og_alt": "Rotate SVG path in SVGEditor — live preview around center",
    "app_name": "Rotate SVG Path",
    "app_alts": ["Rotate SVG path", "Rotate SVG path online", "Turn SVG path", "SVG path rotate tool"],
    "app_desc": "Free online tool to rotate an SVG path around its center. Paste SVG, click Rotate path, and preview the result in your browser.",
    "app_cat": "DeveloperApplication",
    "features": ["Rotate SVG path around center", "No manual path d rewriting", "Live preview", "Runs entirely in the browser — no file upload"],
    "howto_name": "Rotate an SVG path around its center",
    "howto_desc": "Rotate SVG path markup online with a center pivot — no manual coordinate math.",
    "degrees": 90,
    "sample": "path",
    "btn": "Rotate path 90°",
    "btn_title": "Rotate SVG path 90 degrees around center",
    "faq_aria": "Rotate SVG path FAQ",
    "faqs": [
      ("How do I rotate an SVG path online?", "Paste your SVG (or use the sample arrow path), then click Rotate path 90°. The path turns around the viewBox center and the source updates instantly."),
      ("Do I need to rewrite the path d attribute to rotate it?", "No. The tool keeps the original path data and wraps it in a rotate transform around the viewBox center, so you avoid recalculating coordinates."),
      ("Where is the rotation pivot?", "Around the center of the SVG viewBox (or width/height if viewBox is missing). Root width and height attributes are removed so the graphic scales cleanly."),
      ("Want a different angle?", "Use Rotate SVG Path 45° or Rotate SVG Path by Degrees for smaller steps, or change the Angle field on this page."),
    ],
    "note_html": '<span class="tool-note-pair">By degrees? <a href="/rotate-svg-path-by-degrees">Rotate SVG Path by Degrees</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Whole icon? <a href="/rotate-svg-icon">Rotate SVG Icon</a></span>',
    "guides": [
      ("/rotate-svg-path-by-degrees", "Rotate path by degrees →"),
      ("/rotate-svg-path-45-degrees", "Rotate path 45° →"),
      ("/rotate-svg-element", "Rotate SVG element →"),
      ("/rotate-svg-icon", "Rotate SVG icon →"),
    ],
  },
  {
    "slug": "rotate-svg-path-by-degrees",
    "title": "Rotate SVG Path by Degrees Online — Free Tool | getsvgeditor.com",
    "description": "Rotate an SVG path by degrees online. Step the path around its center in 15° increments — free browser tool, no upload.",
    "h1": "Rotate SVG Path by Degrees",
    "crumb": "Rotate path by degrees",
    "sub": "Step a path around the center in <strong>15°</strong> increments",
    "og_alt": "Rotate SVG path by degrees in SVGEditor",
    "app_name": "Rotate SVG Path by Degrees",
    "app_alts": ["Rotate SVG path by degrees", "SVG path rotate degrees", "Turn SVG path by angle", "Rotate path N degrees"],
    "app_desc": "Free online tool to rotate an SVG path by degrees around its center. Each click adds 15° with live preview.",
    "app_cat": "DeveloperApplication",
    "features": ["Rotate SVG path by degrees", "15° step around center", "Live preview", "No file upload"],
    "howto_name": "Rotate an SVG path by degrees",
    "howto_desc": "Incrementally rotate SVG path markup around the center by 15° per click.",
    "degrees": 15,
    "sample": "path",
    "btn": "Rotate +15°",
    "btn_title": "Rotate SVG path by 15 degrees around center",
    "faq_aria": "Rotate SVG path by degrees FAQ",
    "faqs": [
      ("How do I rotate an SVG path by degrees?", "Paste your SVG, change the Angle field if you want (default 15°), then click rotate. Each click adds that step around the viewBox center."),
      ("Can I use exact angles like 45° or 90°?", "Yes. Set the Angle field to any value, or open Rotate SVG Path 45° / Rotate SVG Path for common defaults."),
      ("Does rotating by degrees change the path d data?", "No. A transform group stores the cumulative angle so the original path data stays intact."),
      ("What happens after 360°?", "The rotation resets to 0° and the transform group is removed."),
    ],
    "note_html": '<span class="tool-note-pair">Fixed 45°? <a href="/rotate-svg-path-45-degrees">Rotate SVG Path 45°</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">General path rotate? <a href="/rotate-svg-path">Rotate SVG Path</a></span>',
    "guides": [
      ("/rotate-svg-path", "Rotate SVG path →"),
      ("/rotate-svg-path-45-degrees", "Rotate path 45° →"),
      ("/rotate-svg-element-by-degrees", "Rotate element by degrees →"),
      ("/rotate-svg-icon-by-degrees", "Rotate icon by degrees →"),
    ],
  },
  {
    "slug": "rotate-svg-path-45-degrees",
    "title": "Rotate SVG Path 45 Degrees Online — Free Tool | getsvgeditor.com",
    "description": "Rotate an SVG path 45 degrees online around its center. One-click 45° turns with live preview — free, no upload.",
    "h1": "Rotate SVG Path 45 Degrees",
    "crumb": "Rotate path 45°",
    "sub": "Turn a path <strong>45°</strong> around the viewBox center each click",
    "og_alt": "Rotate SVG path 45 degrees in SVGEditor",
    "app_name": "Rotate SVG Path 45 Degrees",
    "app_alts": ["Rotate SVG path 45 degrees", "SVG path rotate 45", "Turn path 45 degrees", "45 degree SVG path rotate"],
    "app_desc": "Free online tool to rotate an SVG path 45 degrees around its center with live preview.",
    "app_cat": "DeveloperApplication",
    "features": ["Rotate SVG path 45°", "Center pivot", "Live preview", "No file upload"],
    "howto_name": "Rotate an SVG path 45 degrees",
    "howto_desc": "Apply a 45° center rotation to SVG path markup online.",
    "degrees": 45,
    "sample": "path",
    "btn": "Rotate 45°",
    "btn_title": "Rotate SVG path 45 degrees around center",
    "faq_aria": "Rotate SVG path 45 degrees FAQ",
    "faqs": [
      ("How do I rotate an SVG path 45 degrees?", "Paste your SVG, then click Rotate 45°. The Angle field is prefilled to 45° but editable."),
      ("Can I stack multiple 45° turns?", "Yes. Each click adds another 45°. After eight clicks you are back to 0°."),
      ("Is 45° useful for diagonal icons?", "Yes. Designers often use 45° for chevrons, arrows, and diagonal UI marks."),
      ("Need a larger step?", "Open Rotate SVG Path for a 90° default, or set any Angle on Rotate SVG Path by Degrees."),
    ],
    "note_html": '<span class="tool-note-pair">90° default? <a href="/rotate-svg-path">Rotate SVG Path</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">By degrees? <a href="/rotate-svg-path-by-degrees">Rotate by Degrees</a></span>',
    "guides": [
      ("/rotate-svg-path", "Rotate SVG path →"),
      ("/rotate-svg-path-by-degrees", "Rotate by degrees →"),
      ("/rotate-svg-element", "Rotate SVG element →"),
      ("/flip-svg-path-horizontally", "Flip path horizontally →"),
    ],
  },
  {
    "slug": "rotate-svg-element",
    "title": "Rotate SVG Element Online — Free Tool | getsvgeditor.com",
    "description": "Rotate an SVG element or object online around its center. Paste shapes, click Rotate element, and preview — free, no upload.",
    "h1": "Rotate SVG Element",
    "crumb": "Rotate SVG element",
    "sub": "Turn shapes and objects around the viewBox center",
    "og_alt": "Rotate SVG element in SVGEditor — live preview",
    "app_name": "Rotate SVG Element",
    "app_alts": ["Rotate SVG element", "Rotate SVG object", "Turn SVG shape", "SVG element rotate online"],
    "app_desc": "Free online tool to rotate an SVG element or object around its center with live preview.",
    "app_cat": "DesignApplication",
    "features": ["Rotate SVG element / object", "Center pivot", "Live preview", "No file upload"],
    "howto_name": "Rotate an SVG element around its center",
    "howto_desc": "Rotate SVG shapes and objects online around the viewBox center.",
    "degrees": 90,
    "sample": "element",
    "btn": "Rotate element 90°",
    "btn_title": "Rotate SVG element 90 degrees around center",
    "faq_aria": "Rotate SVG element FAQ",
    "faqs": [
      ("How do I rotate an SVG element online?", "Paste SVG with shapes or groups, then click Rotate element 90°. Everything turns around the viewBox center."),
      ("Element vs path — which page should I use?", "Use this page for mixed shapes and objects. Use Rotate SVG Path when you specifically care about path data."),
      ("Does rotation move the pivot with the object?", "The pivot is the viewBox center. That keeps multi-shape artwork aligned as one object."),
      ("Need rotation around center emphasized?", "Open Rotate SVG Element Around Center for that intent."),
    ],
    "note_html": '<span class="tool-note-pair">Around center? <a href="/rotate-svg-element-around-center">Rotate Around Center</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Path? <a href="/rotate-svg-path">Rotate SVG Path</a></span>',
    "guides": [
      ("/rotate-svg-element-by-degrees", "Rotate element by degrees →"),
      ("/rotate-svg-element-90-degrees", "Rotate element 90° →"),
      ("/rotate-svg-element-around-center", "Rotate around center →"),
      ("/rotate-svg-icon", "Rotate SVG icon →"),
    ],
  },
  {
    "slug": "rotate-svg-element-by-degrees",
    "title": "Rotate SVG Element by Degrees Online — Free Tool | getsvgeditor.com",
    "description": "Rotate an SVG element by degrees online. Step shapes around the center in 15° increments — free, no upload.",
    "h1": "Rotate SVG Element by Degrees",
    "crumb": "Rotate element by degrees",
    "sub": "Step an element around the center in <strong>15°</strong> increments",
    "og_alt": "Rotate SVG element by degrees in SVGEditor",
    "app_name": "Rotate SVG Element by Degrees",
    "app_alts": ["Rotate SVG element by degrees", "Rotate SVG object by degrees", "Turn SVG shape by angle"],
    "app_desc": "Free online tool to rotate an SVG element by degrees around its center. Each click adds 15°.",
    "app_cat": "DesignApplication",
    "features": ["Rotate SVG element by degrees", "15° step", "Live preview", "No file upload"],
    "howto_name": "Rotate an SVG element by degrees",
    "howto_desc": "Incrementally rotate SVG elements around the center by 15° per click.",
    "degrees": 15,
    "sample": "element",
    "btn": "Rotate +15°",
    "btn_title": "Rotate SVG element by 15 degrees around center",
    "faq_aria": "Rotate SVG element by degrees FAQ",
    "faqs": [
      ("How do I rotate an SVG element by degrees?", "Paste your SVG, change the Angle field if you want (default 15°), then click rotate. Each click adds that step around the center."),
      ("Can I jump straight to 90°?", "Yes — use Rotate SVG Element 90 Degrees for a quarter-turn button."),
      ("Are groups and nested shapes included?", "Yes. Content inside the rotate group turns together as one object."),
      ("Root width and height?", "They are removed on rotate so the element scales from viewBox alone."),
    ],
    "note_html": '<span class="tool-note-pair">90°? <a href="/rotate-svg-element-90-degrees">Rotate Element 90°</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Path by degrees? <a href="/rotate-svg-path-by-degrees">Rotate Path by Degrees</a></span>',
    "guides": [
      ("/rotate-svg-element", "Rotate SVG element →"),
      ("/rotate-svg-element-90-degrees", "Rotate element 90° →"),
      ("/rotate-svg-element-around-center", "Rotate around center →"),
      ("/rotate-svg-path-by-degrees", "Rotate path by degrees →"),
    ],
  },
  {
    "slug": "rotate-svg-element-90-degrees",
    "title": "Rotate SVG Element 90 Degrees Online — Free Tool | getsvgeditor.com",
    "description": "Rotate an SVG element 90 degrees online around its center. One-click quarter turns for shapes and objects — free, no upload.",
    "h1": "Rotate SVG Element 90 Degrees",
    "crumb": "Rotate element 90°",
    "sub": "Quarter-turn shapes and objects around the center",
    "og_alt": "Rotate SVG element 90 degrees in SVGEditor",
    "app_name": "Rotate SVG Element 90 Degrees",
    "app_alts": ["Rotate SVG element 90 degrees", "Rotate SVG object 90", "Turn SVG shape 90 degrees"],
    "app_desc": "Free online tool to rotate an SVG element 90 degrees around its center with live preview.",
    "app_cat": "DesignApplication",
    "features": ["Rotate SVG element 90°", "Center pivot", "Live preview", "No file upload"],
    "howto_name": "Rotate an SVG element 90 degrees",
    "howto_desc": "Apply a 90° center rotation to SVG elements online.",
    "degrees": 90,
    "sample": "element",
    "btn": "Rotate 90°",
    "btn_title": "Rotate SVG element 90 degrees around center",
    "faq_aria": "Rotate SVG element 90 degrees FAQ",
    "faqs": [
      ("How do I rotate an SVG element 90 degrees?", "Paste your SVG, then click Rotate 90°. Shapes turn a quarter turn around the viewBox center."),
      ("Does this work for grouped objects?", "Yes. Nested groups rotate together inside one transform."),
      ("Element 90° vs icon 90°?", "Same mechanics. Icon pages use a compact UI sample; element pages use mixed shapes."),
      ("Need finer control?", "Use Rotate SVG Element by Degrees for 15° steps."),
    ],
    "note_html": '<span class="tool-note-pair">Around center? <a href="/rotate-svg-element-around-center">Rotate Around Center</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Icon 90°? <a href="/rotate-svg-icon-90-degrees">Rotate Icon 90°</a></span>',
    "guides": [
      ("/rotate-svg-element", "Rotate SVG element →"),
      ("/rotate-svg-element-by-degrees", "Rotate by degrees →"),
      ("/rotate-svg-element-around-center", "Rotate around center →"),
      ("/rotate-svg-icon-90-degrees", "Rotate icon 90° →"),
    ],
  },
  {
    "slug": "rotate-svg-element-around-center",
    "title": "Rotate SVG Element Around Center Online — Free Tool | getsvgeditor.com",
    "description": "Rotate an SVG element around its center online. Pivot on the viewBox midpoint — free browser tool, no upload.",
    "h1": "Rotate SVG Element Around Center",
    "crumb": "Rotate around center",
    "sub": "Pivot shapes on the viewBox midpoint — not a corner origin",
    "og_alt": "Rotate SVG element around center in SVGEditor",
    "app_name": "Rotate SVG Element Around Center",
    "app_alts": ["Rotate SVG element around center", "Rotate SVG object around center", "SVG rotate center pivot"],
    "app_desc": "Free online tool to rotate an SVG element around the viewBox center with live preview.",
    "app_cat": "DesignApplication",
    "features": ["Rotate around viewBox center", "No corner origin drift", "Live preview", "No file upload"],
    "howto_name": "Rotate an SVG element around the center",
    "howto_desc": "Rotate SVG elements using the viewBox center as the pivot point.",
    "degrees": 90,
    "sample": "element",
    "btn": "Rotate around center",
    "btn_title": "Rotate SVG element 90 degrees around viewBox center",
    "faq_aria": "Rotate SVG element around center FAQ",
    "faqs": [
      ("How do I rotate an SVG element around its center?", "Paste your SVG, then click Rotate around center. The tool uses rotate(angle cx cy) with the viewBox midpoint."),
      ("Why not rotate from 0,0?", "A corner origin slides the artwork out of frame. Center pivot keeps the object in place while it turns."),
      ("Is the center the bounding box or the viewBox?", "The viewBox center (or width/height midpoint when viewBox is missing)."),
      ("Same idea for icons?", "Yes — see Rotate SVG Icon Around Center."),
    ],
    "note_html": '<span class="tool-note-pair">Icon center? <a href="/rotate-svg-icon-around-center">Rotate Icon Around Center</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Element 90°? <a href="/rotate-svg-element-90-degrees">Rotate Element 90°</a></span>',
    "guides": [
      ("/rotate-svg-element", "Rotate SVG element →"),
      ("/rotate-svg-element-90-degrees", "Rotate element 90° →"),
      ("/rotate-svg-icon-around-center", "Rotate icon around center →"),
      ("/rotate-svg-path", "Rotate SVG path →"),
    ],
  },
  {
    "slug": "rotate-svg-icon",
    "title": "Rotate SVG Icon Online — Free Tool | getsvgeditor.com",
    "description": "Rotate an SVG icon online around its center. Paste a UI icon, click Rotate icon, and preview — free, no upload.",
    "h1": "Rotate SVG Icon",
    "crumb": "Rotate SVG icon",
    "sub": "Turn UI icons around the viewBox center — no design app",
    "og_alt": "Rotate SVG icon in SVGEditor — live preview",
    "app_name": "Rotate SVG Icon",
    "app_alts": ["Rotate SVG icon", "Rotate icon SVG online", "Turn SVG icon", "SVG icon rotate tool"],
    "app_desc": "Free online tool to rotate an SVG icon around its center with live preview.",
    "app_cat": "DesignApplication",
    "features": ["Rotate SVG icons", "Center pivot", "Live preview", "No file upload"],
    "howto_name": "Rotate an SVG icon around its center",
    "howto_desc": "Rotate SVG icons online around the viewBox center.",
    "degrees": 90,
    "sample": "icon",
    "btn": "Rotate icon 90°",
    "btn_title": "Rotate SVG icon 90 degrees around center",
    "faq_aria": "Rotate SVG icon FAQ",
    "faqs": [
      ("How do I rotate an SVG icon online?", "Paste your icon SVG (or use the sample), then click Rotate icon 90°. The icon turns around the viewBox center."),
      ("Will the icon stay on a 24×24 grid?", "Yes if that is your viewBox. Rotation uses the midpoint so a square icon stays framed."),
      ("Root width and height on icons?", "They are stripped on rotate so CSS can size the icon from viewBox alone."),
      ("Need icon 90° specifically?", "Open Rotate SVG Icon 90 Degrees."),
    ],
    "note_html": '<span class="tool-note-pair">90°? <a href="/rotate-svg-icon-90-degrees">Rotate Icon 90°</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Around center? <a href="/rotate-svg-icon-around-center">Rotate Around Center</a></span>',
    "guides": [
      ("/rotate-svg-icon-by-degrees", "Rotate icon by degrees →"),
      ("/rotate-svg-icon-90-degrees", "Rotate icon 90° →"),
      ("/rotate-svg-icon-around-center", "Rotate around center →"),
      ("/rotate-svg-element", "Rotate SVG element →"),
    ],
  },
  {
    "slug": "rotate-svg-icon-by-degrees",
    "title": "Rotate SVG Icon by Degrees Online — Free Tool | getsvgeditor.com",
    "description": "Rotate an SVG icon by degrees online. Step icons around the center in 15° increments — free, no upload.",
    "h1": "Rotate SVG Icon by Degrees",
    "crumb": "Rotate icon by degrees",
    "sub": "Step an icon around the center in <strong>15°</strong> increments",
    "og_alt": "Rotate SVG icon by degrees in SVGEditor",
    "app_name": "Rotate SVG Icon by Degrees",
    "app_alts": ["Rotate SVG icon by degrees", "Turn icon by angle", "SVG icon rotate degrees"],
    "app_desc": "Free online tool to rotate an SVG icon by degrees around its center. Each click adds 15°.",
    "app_cat": "DesignApplication",
    "features": ["Rotate SVG icon by degrees", "15° step", "Live preview", "No file upload"],
    "howto_name": "Rotate an SVG icon by degrees",
    "howto_desc": "Incrementally rotate SVG icons around the center by 15° per click.",
    "degrees": 15,
    "sample": "icon",
    "btn": "Rotate +15°",
    "btn_title": "Rotate SVG icon by 15 degrees around center",
    "faq_aria": "Rotate SVG icon by degrees FAQ",
    "faqs": [
      ("How do I rotate an SVG icon by degrees?", "Paste your icon, change the Angle field if you want (default 15°), then click rotate. Repeat until it looks right."),
      ("Best for subtle tilts?", "Yes. 15° steps are handy for loading spinners, arrows, and slight UI tilts."),
      ("Want an exact 90° turn?", "Use Rotate SVG Icon 90 Degrees."),
      ("Path markup instead of an icon?", "Use Rotate SVG Path by Degrees."),
    ],
    "note_html": '<span class="tool-note-pair">Icon 90°? <a href="/rotate-svg-icon-90-degrees">Rotate Icon 90°</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Path by degrees? <a href="/rotate-svg-path-by-degrees">Rotate Path by Degrees</a></span>',
    "guides": [
      ("/rotate-svg-icon", "Rotate SVG icon →"),
      ("/rotate-svg-icon-90-degrees", "Rotate icon 90° →"),
      ("/rotate-svg-icon-around-center", "Rotate around center →"),
      ("/rotate-svg-path-by-degrees", "Rotate path by degrees →"),
    ],
  },
  {
    "slug": "rotate-svg-icon-90-degrees",
    "title": "Rotate SVG Icon 90 Degrees Online — Free Tool | getsvgeditor.com",
    "description": "Rotate an SVG icon 90 degrees online around its center. One-click quarter turns for UI icons — free, no upload.",
    "h1": "Rotate SVG Icon 90 Degrees",
    "crumb": "Rotate icon 90°",
    "sub": "Quarter-turn UI icons around the viewBox center",
    "og_alt": "Rotate SVG icon 90 degrees in SVGEditor",
    "app_name": "Rotate SVG Icon 90 Degrees",
    "app_alts": ["Rotate SVG icon 90 degrees", "Turn icon 90 degrees", "Quarter turn SVG icon"],
    "app_desc": "Free online tool to rotate an SVG icon 90 degrees around its center with live preview.",
    "app_cat": "DesignApplication",
    "features": ["Rotate SVG icon 90°", "Center pivot", "Live preview", "No file upload"],
    "howto_name": "Rotate an SVG icon 90 degrees",
    "howto_desc": "Apply a 90° center rotation to SVG icons online.",
    "degrees": 90,
    "sample": "icon",
    "btn": "Rotate 90°",
    "btn_title": "Rotate SVG icon 90 degrees around center",
    "faq_aria": "Rotate SVG icon 90 degrees FAQ",
    "faqs": [
      ("How do I rotate an SVG icon 90 degrees?", "Paste your icon SVG, then click Rotate 90°. The icon turns a quarter turn around the center."),
      ("Useful for directional icons?", "Yes — arrows, carets, and chevrons often need left/right/up/down variants from one asset."),
      ("Does stroke-based icon markup rotate cleanly?", "Yes. Strokes and fills inside the rotate group turn together."),
      ("Around-center wording?", "See Rotate SVG Icon Around Center."),
    ],
    "note_html": '<span class="tool-note-pair">Around center? <a href="/rotate-svg-icon-around-center">Rotate Around Center</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Path? <a href="/rotate-svg-path">Rotate SVG Path</a></span>',
    "guides": [
      ("/rotate-svg-icon", "Rotate SVG icon →"),
      ("/rotate-svg-icon-by-degrees", "Rotate by degrees →"),
      ("/rotate-svg-icon-around-center", "Rotate around center →"),
      ("/rotate-svg-path", "Rotate SVG path →"),
    ],
  },
  {
    "slug": "rotate-svg-icon-around-center",
    "title": "Rotate SVG Icon Around Center Online — Free Tool | getsvgeditor.com",
    "description": "Rotate an SVG icon around its center online. Pivot on the viewBox midpoint so square icons stay framed — free, no upload.",
    "h1": "Rotate SVG Icon Around Center",
    "crumb": "Rotate icon around center",
    "sub": "Pivot icons on the viewBox midpoint so they stay framed",
    "og_alt": "Rotate SVG icon around center in SVGEditor",
    "app_name": "Rotate SVG Icon Around Center",
    "app_alts": ["Rotate SVG icon around center", "SVG icon center rotate", "Pivot icon around center"],
    "app_desc": "Free online tool to rotate an SVG icon around the viewBox center with live preview.",
    "app_cat": "DesignApplication",
    "features": ["Rotate icon around center", "Keeps square icons framed", "Live preview", "No file upload"],
    "howto_name": "Rotate an SVG icon around the center",
    "howto_desc": "Rotate SVG icons using the viewBox center as the pivot point.",
    "degrees": 90,
    "sample": "icon",
    "btn": "Rotate around center",
    "btn_title": "Rotate SVG icon 90 degrees around viewBox center",
    "faq_aria": "Rotate SVG icon around center FAQ",
    "faqs": [
      ("How do I rotate an SVG icon around its center?", "Paste your icon, then click Rotate around center. The pivot is the viewBox midpoint."),
      ("Why center matter for icons?", "Icons are usually square. A corner-origin rotate pushes them out of the 24×24 frame."),
      ("Same for larger illustrations?", "Yes — see Rotate SVG Element Around Center."),
      ("Want 15° steps while staying centered?", "Use Rotate SVG Icon by Degrees."),
    ],
    "note_html": '<span class="tool-note-pair">Element center? <a href="/rotate-svg-element-around-center">Rotate Element Around Center</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Icon 90°? <a href="/rotate-svg-icon-90-degrees">Rotate Icon 90°</a></span>',
    "guides": [
      ("/rotate-svg-icon", "Rotate SVG icon →"),
      ("/rotate-svg-icon-90-degrees", "Rotate icon 90° →"),
      ("/rotate-svg-icon-by-degrees", "Rotate by degrees →"),
      ("/rotate-svg-element-around-center", "Rotate element around center →"),
    ],
  },
]


def esc(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def json_esc(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)[1:-1]


def faq_schema(faqs):
    items = []
    for q, a in faqs:
        items.append(
            f'''                          {{
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
        "Flip SVG Path Horizontally Online — Free Tool | getsvgeditor.com",
        p["title"],
    )
    # Replace ALL description metas (name / og / twitter), multiline and flat.
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

    text = text.replace(
        "https://getsvgeditor.com/flip-svg-path-horizontally",
        url,
    )
    text = text.replace(
        "Flip SVG path horizontally in SVGEditor — live preview without rewriting path data",
        p["og_alt"],
    )

    text = text.replace(
        'class="app-page tool-page mirror-path-page flip-path-page"',
        f'class="app-page tool-page rotate-tool-page" data-rotate-intent="{slug}" data-rotate-degrees="{p["degrees"]}" data-rotate-sample="{p["sample"]}"',
    )

    text = text.replace(
        'href="/flip-svg-path-horizontally" aria-current="page"',
        f'href="/{slug}" aria-current="page"',
    )

    text = re.sub(
        r'(<span aria-current="page">)Flip SVG path(</span>)',
        rf'\1{esc(p["crumb"])}\2',
        text,
        count=1,
    )
    text = re.sub(
        r'(<h1 class="tool-title">)Flip SVG Path Horizontally(</h1>)',
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
        r'<button\n\s+type="button"\n\s+class="btn btn-accent"\n\s+id="btn-mirror-h"\n\s+title="[^"]*"\n\s*>\n\s*Flip horizontally\n\s*</button>',
        f'''<div class="rotate-angle-group">
              <label class="rotate-angle-label" for="rotate-degrees-input">Angle</label>
              <input
                type="number"
                id="rotate-degrees-input"
                class="rotate-degrees-input"
                value="{p["degrees"]}"
                step="any"
                inputmode="decimal"
                aria-label="Rotation angle in degrees"
              />
              <span class="rotate-angle-unit" aria-hidden="true">°</span>
              <button
                type="button"
                class="btn btn-accent"
                id="btn-rotate-action"
                title="Rotate {p["degrees"]}° around the viewBox center"
              >
                Rotate {p["degrees"]}°
              </button>
            </div>''',
        text,
        count=1,
    )

    text = text.replace("Flip SVG Path Horizontally", p["app_name"])

    text = re.sub(
        r'"alternateName": \[[\s\S]*?\],\n\s+"url":',
        '"alternateName": [\n'
        + ",\n".join(f'              "{json_esc(a)}"' for a in p["app_alts"])
        + '\n            ],\n            "url":',
        text,
        count=1,
    )

    text = re.sub(
        r'("description": ")Free online tool to flip an SVG path horizontally[^"]*(")',
        rf'\1{json_esc(p["app_desc"])}\2',
        text,
        count=1,
    )
    text = text.replace(
        '"applicationCategory": "DeveloperApplication"',
        f'"applicationCategory": "{p["app_cat"]}"',
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
        r'"name": "Flip an SVG path horizontally without editing path data"',
        f'"name": "{json_esc(p["howto_name"])}"',
        text,
        count=1,
    )
    text = re.sub(
        r'"description": "Reflect an SVG path left to right online using a transform — no manual d-attribute rewriting."',
        f'"description": "{json_esc(p["howto_desc"])}"',
        text,
        count=1,
    )
    text = text.replace(
        '"name": "SVGEditor Flip SVG Path Horizontally"',
        f'"name": "SVGEditor {json_esc(p["app_name"])}"',
    )
    # After Flip SVG Path Horizontally → app_name replace, HowTo tool name may already be updated.
    text = text.replace(
        f'"name": "SVGEditor {p["app_name"]}"',
        f'"name": "SVGEditor {json_esc(p["app_name"])}"',
    )

    text = re.sub(
        r'"name": "Paste or use the sample path",\n\s+"text": "[^"]*"',
        '"name": "Paste or use the sample",\n                "text": "Open the tool with the sample SVG, or paste your own markup into the Source panel."',
        text,
        count=1,
    )
    text = re.sub(
        r'"name": "Click Flip horizontally",\n\s+"text": "[^"]*"',
        f'"name": "Click {json_esc(p["btn"])}",\n                "text": "Press {json_esc(p["btn"])} to rotate around the viewBox center. Preview and source update together. Root width and height are removed."',
        text,
        count=1,
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
