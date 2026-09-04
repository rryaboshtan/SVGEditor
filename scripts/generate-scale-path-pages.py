#!/usr/bin/env python3
"""Generate scale-svg-path-* tool pages from optimize-svg-file.html."""
from pathlib import Path
import re
import json

root = Path(__file__).resolve().parent.parent
template = (root / "optimize-svg-file.html").read_text(encoding="utf-8")

PAGES = [
  {
    "slug": "scale-svg-path-coordinates",
    "title": "Scale SVG Path Coordinates Online — Free Tool | getsvgeditor.com",
    "description": "Scale SVG path coordinates online. Multiply path numbers in the d attribute with a live preview — free, in your browser, no upload.",
    "h1": "Scale SVG Path Coordinates",
    "crumb": "Scale path coordinates",
    "sub": "Multiply numbers in the path <code>d</code> attribute — bake scale into coordinates",
    "og_alt": "Scale SVG path coordinates in SVGEditor — live preview",
    "app_name": "Scale SVG Path Coordinates",
    "app_alts": [
      "Scale SVG path coordinates",
      "SVG path coordinate scale",
      "Multiply SVG path numbers",
      "Scale path d attribute online",
    ],
    "app_desc": "Free online tool to scale SVG path coordinates. Paste the file, click Scale coordinates, and preview the resized path.",
    "features": [
      "Scales numbers inside path d",
      "Updates viewBox to match when needed",
      "Live preview",
      "Runs entirely in the browser — no file upload",
    ],
    "howto_name": "Scale SVG path coordinates",
    "howto_desc": "Paste path markup, scale the coordinates in d, and preview the result in the browser.",
    "howto_click": "Click Scale coordinates. Path numbers are multiplied and the preview updates.",
    "btn": "Scale coordinates",
    "btn_title": "Scale the coordinates in this SVG path",
    "factor_input": None,
    "faq_aria": "Scale SVG path coordinates FAQ",
    "faqs": [
      (
        "How do I scale SVG path coordinates online?",
        "Paste or upload the SVG, then click Scale coordinates. Numbers in the path d attribute are multiplied and the preview updates.",
      ),
      (
        "Is this the same as a transform scale?",
        "No. This rewrites coordinates in d. For transform-free baking, also see Scale SVG Path Without Transform.",
      ),
      (
        "Need a custom factor or percent?",
        "Use Scale SVG Path by Factor or Scale SVG Path by Percentage for numeric inputs.",
      ),
      (
        "Keep the viewBox unchanged?",
        "Open Scale SVG Path Without Changing ViewBox.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">By factor? <a href="/scale-svg-path-by-factor">Scale by factor</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">By %? <a href="/scale-svg-path-by-percentage">Scale by %</a></span>',
    "guides": [
      ("/scale-svg-path-by-factor", "Scale by factor →"),
      ("/scale-svg-path-by-percentage", "Scale by percentage →"),
      ("/scale-svg-path-proportionally", "Scale proportionally →"),
      ("/scale-svg-path-without-transform", "Scale without transform →"),
    ],
  },
  {
    "slug": "scale-svg-path-by-factor",
    "title": "Scale SVG Path by Factor Online — Free Tool | getsvgeditor.com",
    "description": "Scale an SVG path by a factor online. Enter a multiplier (default 1.5), bake it into path coordinates — free, no upload.",
    "h1": "Scale SVG Path by Factor",
    "crumb": "Scale path by factor",
    "sub": "Multiply path coordinates by a <strong>numeric factor</strong> (default 1.5×)",
    "og_alt": "Scale SVG path by factor in SVGEditor",
    "app_name": "Scale SVG Path by Factor",
    "app_alts": [
      "Scale SVG path by factor",
      "SVG path scale multiplier",
      "Multiply SVG path by factor",
      "Scale path d by N",
    ],
    "app_desc": "Free online tool to scale an SVG path by a numeric factor. Set the multiplier and rewrite path coordinates.",
    "features": [
      "Editable scale factor input",
      "Bakes factor into path d",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Scale an SVG path by a factor",
    "howto_desc": "Enter a multiplier and scale path coordinates by that factor.",
    "howto_click": "Set the factor if needed, then click Scale by factor. Path coordinates are multiplied by that value.",
    "btn": "Scale by factor",
    "btn_title": "Scale path coordinates by the factor",
    "factor_input": {
      "label": "Factor",
      "default": "1.5",
      "unit": "×",
      "aria": "Scale factor",
    },
    "faq_aria": "Scale SVG path by factor FAQ",
    "faqs": [
      (
        "How do I scale an SVG path by a factor?",
        "Paste the SVG, set Factor (default 1.5), then click Scale by factor. Path d numbers are multiplied.",
      ),
      (
        "Can I use 0.5 to shrink?",
        "Yes. Any positive factor works — values below 1 shrink, above 1 enlarge.",
      ),
      (
        "Prefer percent instead of a multiplier?",
        "Open Scale SVG Path by Percentage (125% ≈ 1.25×).",
      ),
      (
        "X or Y only?",
        "Use Scale SVG Path X Coordinates or Scale SVG Path Y Coordinates.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">By %? <a href="/scale-svg-path-by-percentage">Scale by %</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hub? <a href="/scale-svg-path-coordinates">Scale coordinates</a></span>',
    "guides": [
      ("/scale-svg-path-coordinates", "Scale coordinates →"),
      ("/scale-svg-path-by-percentage", "Scale by percentage →"),
      ("/scale-svg-path-proportionally", "Scale proportionally →"),
      ("/scale-svg-path-to-specific-size", "Scale to size →"),
    ],
  },
  {
    "slug": "scale-svg-path-by-percentage",
    "title": "Scale SVG Path by Percentage Online — Free Tool | getsvgeditor.com",
    "description": "Scale an SVG path by percentage online. Enter a percent (default 125%), rewrite path coordinates — free, no upload.",
    "h1": "Scale SVG Path by Percentage",
    "crumb": "Scale path by %",
    "sub": "Resize path coordinates by a <strong>percentage</strong> (default 125%)",
    "og_alt": "Scale SVG path by percentage in SVGEditor",
    "app_name": "Scale SVG Path by Percentage",
    "app_alts": [
      "Scale SVG path by percentage",
      "SVG path scale percent",
      "Resize path d by %",
      "Scale SVG path 125%",
    ],
    "app_desc": "Free online tool to scale an SVG path by percentage. Set the percent and bake it into path coordinates.",
    "features": [
      "Editable percentage input",
      "Converts % to a scale factor",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Scale an SVG path by percentage",
    "howto_desc": "Enter a percentage and scale path coordinates accordingly.",
    "howto_click": "Set the percent if needed, then click Scale by %. Path coordinates scale by percent ÷ 100.",
    "btn": "Scale by %",
    "btn_title": "Scale path coordinates by the percentage",
    "factor_input": {
      "label": "%",
      "default": "125",
      "unit": "%",
      "aria": "Scale percentage",
    },
    "faq_aria": "Scale SVG path by percentage FAQ",
    "faqs": [
      (
        "How do I scale an SVG path by percentage?",
        "Paste the SVG, set % (default 125), then click Scale by %. 100% leaves size unchanged; 200% doubles it.",
      ),
      (
        "Is 125% the same as 1.25×?",
        "Yes. Percentage ÷ 100 is the factor applied to path coordinates.",
      ),
      (
        "Want a raw multiplier field?",
        "Use Scale SVG Path by Factor.",
      ),
      (
        "Scale to a pixel size instead?",
        "Open Scale SVG Path to Specific Size.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">By factor? <a href="/scale-svg-path-by-factor">Scale by factor</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">To size? <a href="/scale-svg-path-to-specific-size">Scale to size</a></span>',
    "guides": [
      ("/scale-svg-path-coordinates", "Scale coordinates →"),
      ("/scale-svg-path-by-factor", "Scale by factor →"),
      ("/scale-svg-path-proportionally", "Scale proportionally →"),
      ("/scale-svg-path-to-fit-viewbox", "Scale to fit viewBox →"),
    ],
  },
  {
    "slug": "scale-svg-path-proportionally",
    "title": "Scale SVG Path Proportionally Online — Free Tool | getsvgeditor.com",
    "description": "Scale an SVG path proportionally online. Keep aspect ratio while resizing path coordinates — free, no upload.",
    "h1": "Scale SVG Path Proportionally",
    "crumb": "Scale path proportionally",
    "sub": "Resize path coordinates with a <strong>uniform</strong> X/Y scale",
    "og_alt": "Scale SVG path proportionally in SVGEditor",
    "app_name": "Scale SVG Path Proportionally",
    "app_alts": [
      "Scale SVG path proportionally",
      "Uniform SVG path scale",
      "Keep aspect ratio SVG path",
      "Proportional path d scale",
    ],
    "app_desc": "Free online tool to scale an SVG path proportionally so X and Y stay in sync.",
    "features": [
      "Uniform X/Y scale",
      "Preserves path aspect ratio",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Scale an SVG path proportionally",
    "howto_desc": "Apply the same scale to X and Y path coordinates so the shape keeps its proportions.",
    "howto_click": "Click Scale proportionally. Path coordinates grow or shrink with equal X and Y factors.",
    "btn": "Scale proportionally",
    "btn_title": "Scale path coordinates proportionally",
    "factor_input": None,
    "faq_aria": "Scale SVG path proportionally FAQ",
    "faqs": [
      (
        "How do I scale an SVG path proportionally?",
        "Paste the SVG and click Scale proportionally. X and Y use the same factor so the silhouette stays undistorted.",
      ),
      (
        "What if I only want horizontal stretch?",
        "Use Scale SVG Path X Coordinates for X-only scaling.",
      ),
      (
        "Custom multiplier?",
        "Scale SVG Path by Factor lets you type an exact uniform factor.",
      ),
      (
        "Fit inside the viewBox?",
        "Try Scale SVG Path to Fit ViewBox.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">X only? <a href="/scale-svg-path-x-coordinates">Scale X</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Y only? <a href="/scale-svg-path-y-coordinates">Scale Y</a></span>',
    "guides": [
      ("/scale-svg-path-coordinates", "Scale coordinates →"),
      ("/scale-svg-path-by-factor", "Scale by factor →"),
      ("/scale-svg-path-x-coordinates", "Scale X →"),
      ("/scale-svg-path-y-coordinates", "Scale Y →"),
    ],
  },
  {
    "slug": "scale-svg-path-x-coordinates",
    "title": "Scale SVG Path X Coordinates Online — Free Tool | getsvgeditor.com",
    "description": "Scale SVG path X coordinates online. Stretch or shrink horizontal path numbers only — free, no upload.",
    "h1": "Scale SVG Path X Coordinates",
    "crumb": "Scale path X",
    "sub": "Scale only the <strong>X</strong> numbers in the path <code>d</code> attribute",
    "og_alt": "Scale SVG path X coordinates in SVGEditor",
    "app_name": "Scale SVG Path X Coordinates",
    "app_alts": [
      "Scale SVG path X coordinates",
      "SVG path horizontal scale",
      "Stretch SVG path X",
      "Scale path d X only",
    ],
    "app_desc": "Free online tool to scale only the X coordinates of an SVG path.",
    "features": [
      "Scales X coordinates only",
      "Leaves Y numbers unchanged",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Scale SVG path X coordinates",
    "howto_desc": "Multiply horizontal path coordinates while keeping vertical values the same.",
    "howto_click": "Click Scale X. Horizontal path numbers are scaled; Y stays put.",
    "btn": "Scale X",
    "btn_title": "Scale X coordinates of this SVG path",
    "factor_input": None,
    "faq_aria": "Scale SVG path X coordinates FAQ",
    "faqs": [
      (
        "How do I scale SVG path X coordinates?",
        "Paste the SVG and click Scale X. Only horizontal numbers in d are multiplied.",
      ),
      (
        "Will the shape look stretched?",
        "Yes — X-only scale changes aspect ratio. Use Scale Proportionally for uniform resize.",
      ),
      (
        "Need Y-only instead?",
        "Open Scale SVG Path Y Coordinates.",
      ),
      (
        "Rotate after scaling?",
        "Use Rotate SVG Path when you need a turn instead of (or after) a bake-in scale.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Y only? <a href="/scale-svg-path-y-coordinates">Scale Y</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Uniform? <a href="/scale-svg-path-proportionally">Scale proportionally</a></span>',
    "guides": [
      ("/scale-svg-path-coordinates", "Scale coordinates →"),
      ("/scale-svg-path-y-coordinates", "Scale Y →"),
      ("/scale-svg-path-proportionally", "Scale proportionally →"),
      ("/scale-svg-path-by-factor", "Scale by factor →"),
    ],
  },
  {
    "slug": "scale-svg-path-y-coordinates",
    "title": "Scale SVG Path Y Coordinates Online — Free Tool | getsvgeditor.com",
    "description": "Scale SVG path Y coordinates online. Stretch or shrink vertical path numbers only — free, no upload.",
    "h1": "Scale SVG Path Y Coordinates",
    "crumb": "Scale path Y",
    "sub": "Scale only the <strong>Y</strong> numbers in the path <code>d</code> attribute",
    "og_alt": "Scale SVG path Y coordinates in SVGEditor",
    "app_name": "Scale SVG Path Y Coordinates",
    "app_alts": [
      "Scale SVG path Y coordinates",
      "SVG path vertical scale",
      "Stretch SVG path Y",
      "Scale path d Y only",
    ],
    "app_desc": "Free online tool to scale only the Y coordinates of an SVG path.",
    "features": [
      "Scales Y coordinates only",
      "Leaves X numbers unchanged",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Scale SVG path Y coordinates",
    "howto_desc": "Multiply vertical path coordinates while keeping horizontal values the same.",
    "howto_click": "Click Scale Y. Vertical path numbers are scaled; X stays put.",
    "btn": "Scale Y",
    "btn_title": "Scale Y coordinates of this SVG path",
    "factor_input": None,
    "faq_aria": "Scale SVG path Y coordinates FAQ",
    "faqs": [
      (
        "How do I scale SVG path Y coordinates?",
        "Paste the SVG and click Scale Y. Only vertical numbers in d are multiplied.",
      ),
      (
        "Does this distort circles and arcs?",
        "Yes. Non-uniform scale changes aspect ratio; arcs scale radii accordingly where supported.",
      ),
      (
        "Need X-only instead?",
        "Open Scale SVG Path X Coordinates.",
      ),
      (
        "Uniform scale?",
        "Use Scale SVG Path Proportionally or Scale by Factor.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">X only? <a href="/scale-svg-path-x-coordinates">Scale X</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hub? <a href="/scale-svg-path-coordinates">Scale coordinates</a></span>',
    "guides": [
      ("/scale-svg-path-coordinates", "Scale coordinates →"),
      ("/scale-svg-path-x-coordinates", "Scale X →"),
      ("/scale-svg-path-proportionally", "Scale proportionally →"),
      ("/scale-svg-path-by-percentage", "Scale by percentage →"),
    ],
  },
  {
    "slug": "scale-svg-path-without-transform",
    "title": "Scale SVG Path Without Transform Online — Free Tool | getsvgeditor.com",
    "description": "Scale an SVG path without transform. Bake scale into path d instead of wrapping scale() — free, no upload.",
    "h1": "Scale SVG Path Without Transform",
    "crumb": "Scale without transform",
    "sub": "Bake scale into path <code>d</code> — no <code>transform=&quot;scale(...)&quot;</code> wrapper",
    "og_alt": "Scale SVG path without transform in SVGEditor",
    "app_name": "Scale SVG Path Without Transform",
    "app_alts": [
      "Scale SVG path without transform",
      "Bake SVG path scale into d",
      "SVG path scale no transform",
      "Flatten scale into path data",
    ],
    "app_desc": "Free online tool to scale an SVG path by rewriting coordinates instead of adding a transform.",
    "features": [
      "Rewrites path d instead of scale()",
      "Avoids nested transform groups",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Scale an SVG path without a transform",
    "howto_desc": "Multiply path coordinates so the scale lives in d, not in a transform attribute.",
    "howto_click": "Click Scale without transform. Coordinates in d update; no scale() transform is added.",
    "btn": "Scale without transform",
    "btn_title": "Scale path coordinates without using transform",
    "factor_input": None,
    "faq_aria": "Scale SVG path without transform FAQ",
    "faqs": [
      (
        "How do I scale an SVG path without transform?",
        "Paste the SVG and click Scale without transform. The tool multiplies path coordinates so you do not need transform=\"scale(...)\".",
      ),
      (
        "Why avoid transform?",
        "Some exporters, icon pipelines, and boolean ops prefer flattened geometry with scale baked into d.",
      ),
      (
        "Need rotation without rewriting d?",
        "Rotate SVG Path wraps a rotate transform when you want a turn without editing coordinates.",
      ),
      (
        "Keep the same viewBox?",
        "Open Scale SVG Path Without Changing ViewBox.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Rotate instead? <a href="/rotate-svg-path">Rotate SVG path</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Keep viewBox? <a href="/scale-svg-path-without-changing-viewbox">Scale keep viewBox</a></span>',
    "guides": [
      ("/scale-svg-path-coordinates", "Scale coordinates →"),
      ("/scale-svg-path-without-changing-viewbox", "Scale keep viewBox →"),
      ("/rotate-svg-path", "Rotate SVG path →"),
      ("/scale-svg-path-by-factor", "Scale by factor →"),
    ],
  },
  {
    "slug": "scale-svg-path-without-changing-viewbox",
    "title": "Scale SVG Path Without Changing ViewBox Online — Free Tool | getsvgeditor.com",
    "description": "Scale an SVG path without changing viewBox. Resize path coordinates inside the existing window — free, no upload.",
    "h1": "Scale SVG Path Without Changing ViewBox",
    "crumb": "Scale keep viewBox",
    "sub": "Scale path coordinates while <strong>keeping the viewBox</strong> unchanged",
    "og_alt": "Scale SVG path without changing viewBox in SVGEditor",
    "app_name": "Scale SVG Path Without Changing ViewBox",
    "app_alts": [
      "Scale SVG path without changing viewBox",
      "Scale path keep viewBox",
      "Resize path inside viewBox",
      "SVG path scale fixed viewBox",
    ],
    "app_desc": "Free online tool to scale path coordinates while leaving the SVG viewBox as-is.",
    "features": [
      "Scales path d numbers",
      "Preserves existing viewBox",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Scale an SVG path without changing the viewBox",
    "howto_desc": "Resize path coordinates inside a fixed viewBox window.",
    "howto_click": "Click Scale (keep viewBox). Path coordinates update; the viewBox attribute stays the same.",
    "btn": "Scale (keep viewBox)",
    "btn_title": "Scale path while keeping the viewBox",
    "factor_input": None,
    "faq_aria": "Scale SVG path without changing viewBox FAQ",
    "faqs": [
      (
        "How do I scale a path without changing the viewBox?",
        "Paste the SVG and click Scale (keep viewBox). Path d updates; viewBox width/height/min stay put.",
      ),
      (
        "Will the path clip?",
        "If you enlarge past the window, yes. Shrink or use Scale to Fit ViewBox to stay inside.",
      ),
      (
        "Also avoid transforms?",
        "This page already bakes into d. See Scale Without Transform for the same idea with transform-focused wording.",
      ),
      (
        "Want the viewBox to grow with the path?",
        "Use Scale SVG Path Coordinates (hub) which can retighten the window.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Fit viewBox? <a href="/scale-svg-path-to-fit-viewbox">Scale to fit</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">No transform? <a href="/scale-svg-path-without-transform">Scale without transform</a></span>',
    "guides": [
      ("/scale-svg-path-coordinates", "Scale coordinates →"),
      ("/scale-svg-path-to-fit-viewbox", "Scale to fit viewBox →"),
      ("/scale-svg-path-without-transform", "Scale without transform →"),
      ("/scale-svg-path-to-specific-size", "Scale to size →"),
    ],
  },
  {
    "slug": "scale-svg-path-to-specific-size",
    "title": "Scale SVG Path to Specific Size Online — Free Tool | getsvgeditor.com",
    "description": "Scale an SVG path to a specific size online. Enter a target size in px (default 100) and rewrite coordinates — free, no upload.",
    "h1": "Scale SVG Path to Specific Size",
    "crumb": "Scale path to size",
    "sub": "Resize path so its bounds approach a <strong>target size</strong> (default 100px)",
    "og_alt": "Scale SVG path to specific size in SVGEditor",
    "app_name": "Scale SVG Path to Specific Size",
    "app_alts": [
      "Scale SVG path to specific size",
      "SVG path resize to pixels",
      "Scale path to 100px",
      "SVG path target size",
    ],
    "app_desc": "Free online tool to scale an SVG path to a specific pixel size target.",
    "features": [
      "Editable target size input",
      "Scales path to match target",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Scale an SVG path to a specific size",
    "howto_desc": "Enter a target size and scale path coordinates so the graphic matches that size.",
    "howto_click": "Set Size if needed, then click Scale to size. Path coordinates scale toward the target.",
    "btn": "Scale to size",
    "btn_title": "Scale path to the target size",
    "factor_input": {
      "label": "Size",
      "default": "100",
      "unit": "px",
      "aria": "Target size in pixels",
    },
    "faq_aria": "Scale SVG path to specific size FAQ",
    "faqs": [
      (
        "How do I scale an SVG path to a specific size?",
        "Paste the SVG, set Size in px (default 100), then click Scale to size. Coordinates scale so the path approaches that size.",
      ),
      (
        "Is size width, height, or max side?",
        "The tool uses the path bounding box and scales so the relevant span matches the target size.",
      ),
      (
        "Fit the current viewBox instead?",
        "Open Scale SVG Path to Fit ViewBox.",
      ),
      (
        "Prefer a unitless factor?",
        "Use Scale SVG Path by Factor.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Fit viewBox? <a href="/scale-svg-path-to-fit-viewbox">Scale to fit</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">By factor? <a href="/scale-svg-path-by-factor">Scale by factor</a></span>',
    "guides": [
      ("/scale-svg-path-coordinates", "Scale coordinates →"),
      ("/scale-svg-path-to-fit-viewbox", "Scale to fit viewBox →"),
      ("/scale-svg-path-by-factor", "Scale by factor →"),
      ("/scale-svg-path-by-percentage", "Scale by percentage →"),
    ],
  },
  {
    "slug": "scale-svg-path-to-fit-viewbox",
    "title": "Scale SVG Path to Fit ViewBox Online — Free Tool | getsvgeditor.com",
    "description": "Scale an SVG path to fit the viewBox online. Enlarge or shrink path coordinates to fill the window — free, no upload.",
    "h1": "Scale SVG Path to Fit ViewBox",
    "crumb": "Scale path to fit viewBox",
    "sub": "Scale path coordinates so the graphic <strong>fits the viewBox</strong>",
    "og_alt": "Scale SVG path to fit viewBox in SVGEditor",
    "app_name": "Scale SVG Path to Fit ViewBox",
    "app_alts": [
      "Scale SVG path to fit viewBox",
      "Fit SVG path in viewBox",
      "Scale path fill viewBox",
      "SVG path fit to window",
    ],
    "app_desc": "Free online tool to scale an SVG path so it fits inside the current viewBox.",
    "features": [
      "Fits path bounds to viewBox",
      "Keeps proportional scale",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Scale an SVG path to fit the viewBox",
    "howto_desc": "Scale path coordinates so the artwork fills the existing viewBox window.",
    "howto_click": "Click Scale to fit viewBox. Path coordinates scale to fill the viewBox while keeping proportions.",
    "btn": "Scale to fit viewBox",
    "btn_title": "Scale path to fit the viewBox",
    "factor_input": None,
    "faq_aria": "Scale SVG path to fit viewBox FAQ",
    "faqs": [
      (
        "How do I scale an SVG path to fit the viewBox?",
        "Paste the SVG and click Scale to fit viewBox. The path enlarges or shrinks to sit inside the window.",
      ),
      (
        "Does the viewBox change?",
        "The intent is to fit content to the existing viewBox. Other scale pages may retighten the window instead.",
      ),
      (
        "Tiny icon in a large canvas?",
        "This page is built for that — the sample starts undersized so one click fills the frame.",
      ),
      (
        "Target an exact pixel size?",
        "Use Scale SVG Path to Specific Size.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">To size? <a href="/scale-svg-path-to-specific-size">Scale to size</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Keep viewBox, manual scale? <a href="/scale-svg-path-without-changing-viewbox">Scale keep viewBox</a></span>',
    "guides": [
      ("/scale-svg-path-coordinates", "Scale coordinates →"),
      ("/scale-svg-path-to-specific-size", "Scale to size →"),
      ("/scale-svg-path-without-changing-viewbox", "Scale keep viewBox →"),
      ("/scale-svg-path-proportionally", "Scale proportionally →"),
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


def action_button_html(p):
    fi = p.get("factor_input")
    if fi:
        return f'''<div class="scale-path-factor-group">
              <label class="scale-path-factor-label" for="scale-path-factor-input">{esc(fi["label"])}</label>
              <input type="number" id="scale-path-factor-input" class="scale-path-factor-input" value="{esc(fi["default"])}" step="any" inputmode="decimal" aria-label="{esc(fi["aria"])}" />
              <span class="scale-path-factor-unit" aria-hidden="true">{esc(fi["unit"])}</span>
              <button type="button" class="btn btn-accent" id="btn-scale-path-action" title="{esc(p["btn_title"])}">{esc(p["btn"])}</button>
            </div>'''
    return f'''<button
              type="button"
              class="btn btn-accent"
              id="btn-scale-path-action"
              title="{esc(p["btn_title"])}"
            >
              {esc(p["btn"])}</button>'''


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
        f'class="app-page tool-page scale-path-tool-page" data-scale-path-intent="{slug}" data-mobile-mode="preview" data-default-tab="preview"',
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
        action_button_html(p),
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
        '"name": "Paste or use the sample SVG",\n                "text": "Open the tool with the sample path graphic (viewBox only, no root width or height), or paste your own SVG into Source."',
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
        "Paste or upload an SVG with path data. Click the action button to scale the coordinates.",
    )
    text = text.replace(
        '<a href="/blog/svg-to-png">PNG guide</a>',
        '<a href="/scale-svg-path-coordinates">Scale path coordinates</a>',
    )

    out = root / f"{slug}.html"
    out.write_text(text, encoding="utf-8")
    print("wrote", out.name)
    return out


def main():
    assert len(PAGES) == 10
    for p in PAGES:
        build_page(p)
    print("done", len(PAGES))


if __name__ == "__main__":
    main()
