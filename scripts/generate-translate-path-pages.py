#!/usr/bin/env python3
"""Generate translate-svg-path-* tool pages from optimize-svg-file.html."""
from pathlib import Path
import re
import json

root = Path(__file__).resolve().parent.parent
template = (root / "optimize-svg-file.html").read_text(encoding="utf-8")

PAGES = [
  {
    "slug": "translate-svg-path-coordinates",
    "title": "Translate SVG Path Coordinates Online — Free Tool | getsvgeditor.com",
    "description": "Translate SVG path coordinates online. Shift path numbers in the d attribute by X and Y — live preview, free, in your browser, no upload.",
    "h1": "Translate SVG Path Coordinates",
    "crumb": "Translate path coordinates",
    "sub": "Shift numbers in the path <code>d</code> attribute by <strong>X</strong> and <strong>Y</strong>",
    "og_alt": "Translate SVG path coordinates in SVGEditor — live preview",
    "app_name": "Translate SVG Path Coordinates",
    "app_alts": [
      "Translate SVG path coordinates",
      "SVG path coordinate offset",
      "Move SVG path d attribute",
      "Shift path coordinates online",
    ],
    "app_desc": "Free online tool to translate SVG path coordinates. Paste the file, set X/Y offsets, click Translate, and preview the shifted path.",
    "features": [
      "Shifts numbers inside path d",
      "Editable X and Y offset inputs",
      "Live preview",
      "Runs entirely in the browser — no file upload",
    ],
    "howto_name": "Translate SVG path coordinates",
    "howto_desc": "Paste path markup, set horizontal and vertical offsets, and preview the result in the browser.",
    "howto_click": "Set X and Y if needed, then click Translate. Path coordinates shift by those amounts and the preview updates.",
    "btn": "Translate",
    "btn_title": "Translate the coordinates in this SVG path",
    "offset_input": "dx_dy",
    "dx_default": 24,
    "dy_default": 16,
    "faq_aria": "Translate SVG path coordinates FAQ",
    "faqs": [
      (
        "How do I translate SVG path coordinates online?",
        "Paste or upload the SVG, set X and Y offsets (defaults 24 and 16), then click Translate. Numbers in the path d attribute shift and the preview updates.",
      ),
      (
        "Is this the same as a transform translate?",
        "This page rewrites coordinates in d. For baking an existing translate() away, see Translate SVG Path Without Transform.",
      ),
      (
        "Need horizontal or vertical only?",
        "Open Translate SVG Path Coordinates Horizontally or Translate SVG Path Coordinates Vertically for a single-axis offset.",
      ),
      (
        "Want to center the path instead?",
        "Use Center SVG Path to move the graphic to the middle of the viewBox.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">X only? <a href="/translate-svg-path-coordinates-horizontally">Translate horizontally</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Y only? <a href="/translate-svg-path-coordinates-vertically">Translate vertically</a></span>',
    "guides": [
      ("/translate-svg-path-coordinates-horizontally", "Translate horizontally →"),
      ("/translate-svg-path-coordinates-vertically", "Translate vertically →"),
      ("/translate-svg-path-coordinates-without-transform", "Bake translate →"),
      ("/center-svg-path", "Center path →"),
    ],
  },
  {
    "slug": "translate-svg-path-coordinates-horizontally",
    "title": "Translate SVG Path Coordinates Horizontally Online — Free Tool | getsvgeditor.com",
    "description": "Translate SVG path coordinates horizontally online. Shift path X numbers by a pixel offset (default 28px) — free, no upload.",
    "h1": "Translate SVG Path Coordinates Horizontally",
    "crumb": "Translate path horizontally",
    "sub": "Shift only the <strong>X</strong> numbers in the path <code>d</code> attribute",
    "og_alt": "Translate SVG path coordinates horizontally in SVGEditor",
    "app_name": "Translate SVG Path Coordinates Horizontally",
    "app_alts": [
      "Translate SVG path horizontally",
      "SVG path X offset",
      "Shift SVG path left or right",
      "Move path d X coordinates",
    ],
    "app_desc": "Free online tool to translate SVG path coordinates horizontally. Set a pixel offset and shift X values in path d.",
    "features": [
      "Shifts X coordinates only",
      "Editable horizontal offset input",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Translate SVG path coordinates horizontally",
    "howto_desc": "Shift horizontal path coordinates by a pixel offset while Y stays unchanged.",
    "howto_click": "Set the offset if needed, then click Translate X. Horizontal path numbers shift; vertical values stay put.",
    "btn": "Translate X",
    "btn_title": "Translate X coordinates of this SVG path",
    "offset_input": "offset",
    "offset_default": "28",
    "offset_label": "X",
    "offset_aria": "Horizontal translate offset in pixels",
    "faq_aria": "Translate SVG path horizontally FAQ",
    "faqs": [
      (
        "How do I translate SVG path X coordinates?",
        "Paste the SVG, set the X offset in px (default 28), then click Translate X. Only horizontal numbers in d are shifted.",
      ),
      (
        "Does vertical position change?",
        "No. This intent shifts X only — Y coordinates in the path d attribute stay the same.",
      ),
      (
        "Can I use negative values to shift left?",
        "Yes. Enter a negative offset to move the path left instead of right.",
      ),
      (
        "Need both X and Y at once?",
        "Open Translate SVG Path Coordinates for combined X/Y offset inputs.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Y only? <a href="/translate-svg-path-coordinates-vertically">Translate vertically</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hub? <a href="/translate-svg-path-coordinates">Translate coordinates</a></span>',
    "guides": [
      ("/translate-svg-path-coordinates", "Translate coordinates →"),
      ("/translate-svg-path-coordinates-vertically", "Translate vertically →"),
      ("/translate-svg-path-coordinates-to-origin", "Move to origin →"),
      ("/center-svg-path", "Center path →"),
    ],
  },
  {
    "slug": "translate-svg-path-coordinates-vertically",
    "title": "Translate SVG Path Coordinates Vertically Online — Free Tool | getsvgeditor.com",
    "description": "Translate SVG path coordinates vertically online. Shift path Y numbers by a pixel offset (default 28px) — free, no upload.",
    "h1": "Translate SVG Path Coordinates Vertically",
    "crumb": "Translate path vertically",
    "sub": "Shift only the <strong>Y</strong> numbers in the path <code>d</code> attribute",
    "og_alt": "Translate SVG path coordinates vertically in SVGEditor",
    "app_name": "Translate SVG Path Coordinates Vertically",
    "app_alts": [
      "Translate SVG path vertically",
      "SVG path Y offset",
      "Shift SVG path up or down",
      "Move path d Y coordinates",
    ],
    "app_desc": "Free online tool to translate SVG path coordinates vertically. Set a pixel offset and shift Y values in path d.",
    "features": [
      "Shifts Y coordinates only",
      "Editable vertical offset input",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Translate SVG path coordinates vertically",
    "howto_desc": "Shift vertical path coordinates by a pixel offset while X stays unchanged.",
    "howto_click": "Set the offset if needed, then click Translate Y. Vertical path numbers shift; horizontal values stay put.",
    "btn": "Translate Y",
    "btn_title": "Translate Y coordinates of this SVG path",
    "offset_input": "offset",
    "offset_default": "28",
    "offset_label": "Y",
    "offset_aria": "Vertical translate offset in pixels",
    "faq_aria": "Translate SVG path vertically FAQ",
    "faqs": [
      (
        "How do I translate SVG path Y coordinates?",
        "Paste the SVG, set the Y offset in px (default 28), then click Translate Y. Only vertical numbers in d are shifted.",
      ),
      (
        "Does horizontal position change?",
        "No. This intent shifts Y only — X coordinates in the path d attribute stay the same.",
      ),
      (
        "Can I shift upward with a negative offset?",
        "Yes. A negative Y offset moves the path up; positive values move it down.",
      ),
      (
        "Need both axes at once?",
        "Open Translate SVG Path Coordinates for combined X/Y offset inputs.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">X only? <a href="/translate-svg-path-coordinates-horizontally">Translate horizontally</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Center? <a href="/center-svg-path">Center path</a></span>',
    "guides": [
      ("/translate-svg-path-coordinates", "Translate coordinates →"),
      ("/translate-svg-path-coordinates-horizontally", "Translate horizontally →"),
      ("/translate-svg-path-coordinates-without-transform", "Bake translate →"),
      ("/center-svg-path", "Center path →"),
    ],
  },
  {
    "slug": "translate-svg-path-coordinates-without-transform",
    "title": "Translate SVG Path Without Transform Online — Free Tool | getsvgeditor.com",
    "description": "Translate an SVG path without transform. Bake translate into path d instead of translate() — free, no upload.",
    "h1": "Translate SVG Path Without Transform",
    "crumb": "Translate without transform",
    "sub": "Bake translate into path <code>d</code> — no <code>transform=&quot;translate(...)&quot;</code> wrapper",
    "og_alt": "Translate SVG path without transform in SVGEditor",
    "app_name": "Translate SVG Path Without Transform",
    "app_alts": [
      "Translate SVG path without transform",
      "Bake SVG path translate into d",
      "SVG path translate no transform",
      "Flatten translate into path data",
    ],
    "app_desc": "Free online tool to translate an SVG path by rewriting coordinates instead of relying on a translate transform.",
    "features": [
      "Rewrites path d instead of translate()",
      "Strips translate from transform when present",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Translate an SVG path without a transform",
    "howto_desc": "Shift path coordinates so the offset lives in d, not in a transform attribute.",
    "howto_click": "Set X and Y if needed, then click Bake translate. Coordinates in d update and translate() is removed from transform.",
    "btn": "Bake translate",
    "btn_title": "Translate path coordinates without using transform",
    "offset_input": "dx_dy",
    "dx_default": 16,
    "dy_default": 12,
    "faq_aria": "Translate SVG path without transform FAQ",
    "faqs": [
      (
        "How do I translate an SVG path without a transform attribute?",
        "Paste the SVG, set X/Y offsets (defaults 16 and 12), then click Bake translate. Path d is rewritten so you do not need transform=\"translate(...)\".",
      ),
      (
        "Why bake translate into path d?",
        "Some exporters, icon pipelines, and boolean ops prefer flattened geometry with offsets baked into d.",
      ),
      (
        "Will existing translate() transforms be removed?",
        "Yes. After baking, translate() is stripped from the path transform attribute when present.",
      ),
      (
        "Prefer keeping transform and not editing d?",
        "Use Rotate SVG Path or other transform-based tools when you want a wrapper instead of rewriting coordinates.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Hub? <a href="/translate-svg-path-coordinates">Translate coordinates</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">To origin? <a href="/translate-svg-path-coordinates-to-origin">Move to origin</a></span>',
    "guides": [
      ("/translate-svg-path-coordinates", "Translate coordinates →"),
      ("/translate-svg-path-coordinates-horizontally", "Translate horizontally →"),
      ("/translate-svg-path-coordinates-vertically", "Translate vertically →"),
      ("/translate-svg-path-coordinates-to-origin", "Move to origin →"),
    ],
  },
  {
    "slug": "translate-svg-path-coordinates-to-origin",
    "title": "Translate SVG Path to Origin Online — Free Tool | getsvgeditor.com",
    "description": "Move an SVG path to the origin online. Shift path coordinates so the bounding box starts at (0, 0) — free, no upload.",
    "h1": "Translate SVG Path to Origin",
    "crumb": "Move path to origin",
    "sub": "Shift path coordinates so the graphic sits at <strong>(0, 0)</strong>",
    "og_alt": "Translate SVG path to origin in SVGEditor",
    "app_name": "Translate SVG Path to Origin",
    "app_alts": [
      "Translate SVG path to origin",
      "Move SVG path to 0 0",
      "SVG path origin align",
      "Shift path to top-left origin",
    ],
    "app_desc": "Free online tool to move an SVG path to the origin by shifting coordinates so the path bounds start at (0, 0).",
    "features": [
      "Computes offset from path bounds",
      "Rewrites path d to origin",
      "Retightens viewBox to content",
      "No file upload",
    ],
    "howto_name": "Move an SVG path to the origin",
    "howto_desc": "Measure path bounds and shift coordinates so the top-left of the graphic lands at (0, 0).",
    "howto_click": "Click Move to origin. Path coordinates shift by the negative of the current bounds origin.",
    "btn": "Move to origin",
    "btn_title": "Move this SVG path to the origin at 0, 0",
    "offset_input": None,
    "faq_aria": "Translate SVG path to origin FAQ",
    "faqs": [
      (
        "What does move to origin mean for a path?",
        "The tool measures the path bounding box and shifts every coordinate so the top-left of that box lands at (0, 0).",
      ),
      (
        "Does the viewBox change?",
        "Yes. After moving to origin, the viewBox retightens around the shifted content.",
      ),
      (
        "How is origin (0, 0) determined?",
        "Origin is the SVG coordinate system's top-left — the path's minimum X and Y from its bounding box are subtracted.",
      ),
      (
        "Want to center in the viewBox instead?",
        "Open Center SVG Path to place the graphic in the middle of the existing viewBox window.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Center? <a href="/center-svg-path">Center path</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hub? <a href="/translate-svg-path-coordinates">Translate coordinates</a></span>',
    "guides": [
      ("/center-svg-path", "Center path →"),
      ("/translate-svg-path-coordinates", "Translate coordinates →"),
      ("/translate-svg-path-coordinates-without-transform", "Bake translate →"),
      ("/translate-svg-path-coordinates-horizontally", "Translate horizontally →"),
    ],
  },
  {
    "slug": "center-svg-path",
    "title": "Center SVG Path Online — Free Tool | getsvgeditor.com",
    "description": "Center an SVG path in the viewBox online. Shift path coordinates so the graphic sits in the middle — free, no upload.",
    "h1": "Center SVG Path",
    "crumb": "Center SVG path",
    "sub": "Shift path coordinates so the graphic is <strong>centered in the viewBox</strong>",
    "og_alt": "Center SVG path in viewBox in SVGEditor",
    "app_name": "Center SVG Path",
    "app_alts": [
      "Center SVG path",
      "Center path in viewBox",
      "SVG path center align",
      "Move path to viewBox center",
    ],
    "app_desc": "Free online tool to center an SVG path inside the current viewBox by shifting path coordinates.",
    "features": [
      "Centers path in viewBox",
      "Keeps viewBox unchanged",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Center an SVG path in the viewBox",
    "howto_desc": "Measure path bounds and shift coordinates so the graphic sits in the middle of the viewBox.",
    "howto_click": "Click Center path. Path coordinates shift so the bounding box aligns with the viewBox center.",
    "btn": "Center path",
    "btn_title": "Center this SVG path in the viewBox",
    "offset_input": None,
    "faq_aria": "Center SVG path FAQ",
    "faqs": [
      (
        "How do I center an SVG path in the viewBox?",
        "Paste the SVG and click Center path. The tool measures path bounds and shifts coordinates to the viewBox center.",
      ),
      (
        "Does centering change the viewBox?",
        "No. The viewBox window stays the same — only path coordinates in d are shifted.",
      ),
      (
        "What if the path is already centered?",
        "The computed offset is near zero and the path stays visually unchanged.",
      ),
      (
        "Need a fixed pixel offset instead?",
        "Use Translate SVG Path Coordinates for manual X/Y offsets, or Translate Horizontally / Vertically for one axis.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Translate? <a href="/translate-svg-path-coordinates">Translate coordinates</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">To origin? <a href="/translate-svg-path-coordinates-to-origin">Move to origin</a></span>',
    "guides": [
      ("/translate-svg-path-coordinates", "Translate coordinates →"),
      ("/translate-svg-path-coordinates-to-origin", "Move to origin →"),
      ("/translate-svg-path-coordinates-horizontally", "Translate horizontally →"),
      ("/translate-svg-path-coordinates-vertically", "Translate vertically →"),
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
    inp = p.get("offset_input")
    if inp == "dx_dy":
        return f'''<div class="translate-path-offset-group">
              <label class="scale-path-factor-label" for="translate-path-dx-input">X</label>
              <input type="number" id="translate-path-dx-input" class="scale-path-factor-input" value="{esc(str(p["dx_default"]))}" step="any" inputmode="decimal" aria-label="Translate X" />
              <label class="scale-path-factor-label" for="translate-path-dy-input">Y</label>
              <input type="number" id="translate-path-dy-input" class="scale-path-factor-input" value="{esc(str(p["dy_default"]))}" step="any" inputmode="decimal" aria-label="Translate Y" />
              <button type="button" class="btn btn-accent" id="btn-translate-path-action" title="{esc(p["btn_title"])}">{esc(p["btn"])}</button>
            </div>'''
    if inp == "offset":
        return f'''<div class="scale-path-factor-group">
              <label class="scale-path-factor-label" for="translate-path-offset-input">{esc(p["offset_label"])}</label>
              <input type="number" id="translate-path-offset-input" class="scale-path-factor-input" value="{esc(p["offset_default"])}" step="any" inputmode="decimal" aria-label="{esc(p["offset_aria"])}" />
              <span class="scale-path-factor-unit" aria-hidden="true">px</span>
              <button type="button" class="btn btn-accent" id="btn-translate-path-action" title="{esc(p["btn_title"])}">{esc(p["btn"])}</button>
            </div>'''
    return f'''<button
              type="button"
              class="btn btn-accent"
              id="btn-translate-path-action"
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
        f'class="app-page tool-page translate-path-tool-page" data-translate-path-intent="{slug}" data-mobile-mode="preview" data-default-tab="preview"',
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
        "Paste or upload an SVG with path data. Click the action button to translate the coordinates.",
    )
    text = text.replace(
        '<a href="/blog/svg-to-png">PNG guide</a>',
        '<a href="/translate-svg-path-coordinates">Translate path coordinates</a>',
    )

    out = root / f"{slug}.html"
    out.write_text(text, encoding="utf-8")
    print("wrote", out.name)
    return out


def main():
    assert len(PAGES) == 6
    for p in PAGES:
        build_page(p)
    print("done", len(PAGES))


if __name__ == "__main__":
    main()
