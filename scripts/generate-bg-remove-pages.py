#!/usr/bin/env python3
"""Generate remove-*-background / white-space SVG tool pages from optimize-svg-file.html."""
from pathlib import Path
import re
import json

root = Path(__file__).resolve().parent.parent
template = (root / "optimize-svg-file.html").read_text(encoding="utf-8")

PAGES = [
  {
    "slug": "remove-background-from-svg",
    "title": "Remove Background from SVG Online — Free Tool | getsvgeditor.com",
    "description": "Remove a background from an SVG online. Strip solid full-bleed plates and keep the icon transparent — free, in your browser, no upload.",
    "h1": "Remove Background from SVG",
    "crumb": "Remove background",
    "sub": "Strip the solid full-bleed plate so the SVG sits on a <strong>transparent</strong> canvas",
    "og_alt": "Remove background from SVG in SVGEditor — live preview",
    "app_name": "Remove Background from SVG",
    "app_alts": [
      "Remove background from SVG",
      "SVG background remover",
      "Delete SVG background",
      "SVG transparent background tool",
    ],
    "app_desc": "Free online tool to remove a solid background from SVG. Paste the file, click Remove background, and preview a transparent canvas.",
    "features": [
      "Remove full-bleed background rects",
      "Keep artwork vectors intact",
      "Live preview",
      "Runs entirely in the browser — no file upload",
    ],
    "howto_name": "Remove a background from an SVG",
    "howto_desc": "Paste SVG with a solid plate, remove the background layer, and keep the icon transparent.",
    "howto_click": "Click Remove background. Full-bleed background shapes are deleted and root width/height are cleared.",
    "btn": "Remove background",
    "btn_title": "Remove the solid background from this SVG",
    "faq_aria": "Remove background from SVG FAQ",
    "faqs": [
      (
        "How do I remove a background from an SVG online?",
        "Paste or upload the SVG, then click Remove background. The tool deletes full-bleed background rectangles and clears root size attributes.",
      ),
      (
        "What counts as an SVG background?",
        "A rectangle that covers the whole viewBox (often the first child), or a background / fill set on the root. Foreground icons and paths stay.",
      ),
      (
        "Will the artwork stay vector after removing the background?",
        "Yes. Only the background layer is removed. Paths, icons, and gradients on the mark are unchanged.",
      ),
      (
        "Need a white-only or color-only pass?",
        "Use Remove White Background from SVG or Remove Colored Background from SVG for narrower filters.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">White only? <a href="/remove-white-background-from-svg">Remove white background</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Make transparent? <a href="/make-svg-background-transparent">Make SVG background transparent</a></span>',
    "guides": [
      ("/remove-white-background-from-svg", "Remove white background →"),
      ("/make-svg-background-transparent", "Make background transparent →"),
      ("/remove-solid-background-from-svg", "Remove solid background →"),
      ("/remove-colored-background-from-svg", "Remove colored background →"),
    ],
  },
  {
    "slug": "remove-white-background-from-svg",
    "title": "Remove White Background from SVG Online — Free Tool | getsvgeditor.com",
    "description": "Remove a white background from an SVG online. Delete #fff full-bleed plates and keep the graphic transparent — free, no upload.",
    "h1": "Remove White Background from SVG",
    "crumb": "Remove white background",
    "sub": "Delete <strong>white / near-white</strong> full-bleed plates without touching the icon",
    "og_alt": "Remove white background from SVG in SVGEditor",
    "app_name": "Remove White Background from SVG",
    "app_alts": [
      "Remove white background from SVG",
      "SVG white background remover",
      "Delete white SVG canvas",
      "SVG remove #fff background",
    ],
    "app_desc": "Free online tool to remove a white background from SVG. Targets white and near-white full-bleed rectangles only.",
    "features": [
      "Targets white / near-white backgrounds",
      "Leaves colored artwork alone",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Remove a white background from an SVG",
    "howto_desc": "Strip white export plates from SVG markup while keeping the icon.",
    "howto_click": "Click Remove white background. Only white or near-white full-bleed rectangles are deleted.",
    "btn": "Remove white background",
    "btn_title": "Remove the white background rectangle from this SVG",
    "faq_aria": "Remove white background from SVG FAQ",
    "faqs": [
      (
        "How do I remove a white background from an SVG?",
        "Paste the SVG and click Remove white background. White and near-white full-bleed rects are removed so the canvas shows through.",
      ),
      (
        "Does near-white (#f8fafc) count?",
        "Yes. The tool treats very light grays as white export plates so soft off-white canvases are cleared too.",
      ),
      (
        "What if my background is teal or navy?",
        "Use Remove Colored Background from SVG — this page only targets white plates.",
      ),
      (
        "Does the sample include root width and height?",
        "No. Samples use viewBox only so sizing stays CSS-friendly after the white plate is gone.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Any background? <a href="/remove-background-from-svg">Remove background</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Whitespace too? <a href="/remove-white-space-from-svg">Remove white space</a></span>',
    "guides": [
      ("/remove-background-from-svg", "Remove background →"),
      ("/remove-white-space-from-svg", "Remove white space →"),
      ("/make-svg-background-transparent", "Make transparent →"),
      ("/remove-background-color-from-svg", "Remove background color →"),
    ],
  },
  {
    "slug": "remove-transparent-background-from-svg",
    "title": "Remove Transparent Background from SVG Online — Free Tool | getsvgeditor.com",
    "description": "Remove a transparent background layer from an SVG. Strip invisible full-bleed rects left by exporters — free browser tool, no upload.",
    "h1": "Remove Transparent Background from SVG",
    "crumb": "Remove transparent background",
    "sub": "Strip <strong>invisible full-bleed</strong> rectangles exporters leave behind",
    "og_alt": "Remove transparent background layer from SVG in SVGEditor",
    "app_name": "Remove Transparent Background from SVG",
    "app_alts": [
      "Remove transparent background from SVG",
      "SVG remove invisible background",
      "Delete transparent SVG rect",
      "Clean transparent SVG canvas",
    ],
    "app_desc": "Free online tool to remove transparent or invisible full-bleed background rectangles from SVG markup.",
    "features": [
      "Removes fill=none / transparent plates",
      "Cleans export spacer layers",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Remove a transparent background layer from an SVG",
    "howto_desc": "Delete invisible full-bleed rectangles that act as a transparent background layer.",
    "howto_click": "Click Remove transparent background. Invisible full-bleed rects are deleted; root width/height are cleared.",
    "btn": "Remove transparent background",
    "btn_title": "Remove invisible transparent background layers",
    "faq_aria": "Remove transparent background from SVG FAQ",
    "faqs": [
      (
        "What is a transparent background in SVG?",
        "Often an invisible full-bleed <rect fill=\"none\"> (or opacity 0) that exporters keep as a canvas. It does not paint, but it still sits in the markup.",
      ),
      (
        "How do I remove a transparent background from an SVG?",
        "Paste the file and click Remove transparent background. Invisible full-bleed rectangles are stripped out.",
      ),
      (
        "I actually want a solid plate gone so the SVG is see-through — which page?",
        "Use Make SVG Background Transparent or Remove Background from SVG for opaque plates.",
      ),
      (
        "Does this rasterize the SVG?",
        "No. Everything stays vector markup edited in your browser.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Want see-through art? <a href="/make-svg-background-transparent">Make background transparent</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Solid plate? <a href="/remove-background-from-svg">Remove background</a></span>',
    "guides": [
      ("/make-svg-background-transparent", "Make background transparent →"),
      ("/remove-background-from-svg", "Remove background →"),
      ("/remove-solid-background-from-svg", "Remove solid background →"),
      ("/remove-white-space-from-svg", "Remove white space →"),
    ],
  },
  {
    "slug": "make-svg-background-transparent",
    "title": "Make SVG Background Transparent Online — Free Tool | getsvgeditor.com",
    "description": "Make an SVG background transparent online. Clear solid plates so the checkerboard shows through — free, no upload.",
    "h1": "Make SVG Background Transparent",
    "crumb": "Make background transparent",
    "sub": "Clear solid plates so the canvas is truly <strong>transparent</strong>",
    "og_alt": "Make SVG background transparent in SVGEditor",
    "app_name": "Make SVG Background Transparent",
    "app_alts": [
      "Make SVG background transparent",
      "SVG transparent background",
      "Clear SVG background",
      "SVG see-through background",
    ],
    "app_desc": "Free online tool to make an SVG background transparent by removing solid full-bleed plates.",
    "features": [
      "Clears opaque background plates",
      "Transparent canvas for icons",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Make an SVG background transparent",
    "howto_desc": "Remove solid background layers so the SVG renders on a transparent canvas.",
    "howto_click": "Click Make transparent. Opaque full-bleed backgrounds are removed and root size attributes are cleared.",
    "btn": "Make transparent",
    "btn_title": "Make the SVG background transparent",
    "faq_aria": "Make SVG background transparent FAQ",
    "faqs": [
      (
        "How do I make an SVG background transparent?",
        "Paste the SVG and click Make transparent. Solid full-bleed rectangles are removed so the preview checkerboard shows through.",
      ),
      (
        "Is transparency the same as deleting the background?",
        "For SVG, yes in practice: removing the opaque plate leaves empty pixels transparent in browsers and PNG export.",
      ),
      (
        "Will PNG export keep the transparency?",
        "Yes. Open the PNG tab after clearing the plate — the download keeps an alpha channel.",
      ),
      (
        "White plate only?",
        "Open Remove White Background from SVG for a white-only filter.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">White plate? <a href="/remove-white-background-from-svg">Remove white background</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Colored plate? <a href="/remove-colored-background-from-svg">Remove colored background</a></span>',
    "guides": [
      ("/remove-background-from-svg", "Remove background →"),
      ("/remove-white-background-from-svg", "Remove white background →"),
      ("/remove-solid-background-from-svg", "Remove solid background →"),
      ("/remove-transparent-background-from-svg", "Remove transparent background →"),
    ],
  },
  {
    "slug": "remove-white-space-from-svg",
    "title": "Remove White Space from SVG Online — Free Tool | getsvgeditor.com",
    "description": "Remove white space from an SVG online. Clear white plates and tighten the viewBox to the artwork — free, no upload.",
    "h1": "Remove White Space from SVG",
    "crumb": "Remove white space",
    "sub": "Clear white plates and <strong>tighten the viewBox</strong> to the artwork",
    "og_alt": "Remove white space from SVG in SVGEditor",
    "app_name": "Remove White Space from SVG",
    "app_alts": [
      "Remove white space from SVG",
      "SVG crop whitespace",
      "Trim SVG padding",
      "SVG remove empty space",
    ],
    "app_desc": "Free online tool to remove white space from SVG by clearing background plates and fitting the viewBox to content.",
    "features": [
      "Removes white background plates",
      "Tightens viewBox to content",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Remove white space from an SVG",
    "howto_desc": "Delete white canvas padding and snap the viewBox tightly around the graphic.",
    "howto_click": "Click Remove white space. Background plates are cleared and the viewBox snaps to the artwork with no padding.",
    "btn": "Remove white space",
    "btn_title": "Remove white space and tighten the viewBox",
    "faq_aria": "Remove white space from SVG FAQ",
    "faqs": [
      (
        "How do I remove white space from an SVG?",
        "Paste the SVG and click Remove white space. White plates are cleared and the viewBox tightens to the artwork.",
      ),
      (
        "Is this the same as Remove SVG viewBox Whitespace?",
        "Related. This page also clears white background rectangles before trimming. The viewBox tool focuses only on the coordinate window.",
      ),
      (
        "Will strokes get clipped?",
        "Bounds follow geometry. Very thick strokes may need a tiny manual pad after a zero-padding trim.",
      ),
      (
        "Only the white plate, no crop?",
        "Use Remove White Background from SVG.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">ViewBox only? <a href="/remove-svg-viewbox-whitespace">Remove viewBox whitespace</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">White plate? <a href="/remove-white-background-from-svg">Remove white background</a></span>',
    "guides": [
      ("/remove-white-background-from-svg", "Remove white background →"),
      ("/remove-svg-viewbox-whitespace", "Remove viewBox whitespace →"),
      ("/remove-background-from-svg", "Remove background →"),
      ("/fit-svg-to-viewbox", "Fit SVG to viewBox →"),
    ],
  },
  {
    "slug": "remove-background-color-from-svg",
    "title": "Remove Background Color from SVG Online — Free Tool | getsvgeditor.com",
    "description": "Remove background color from an SVG online. Strip solid canvas fills and keep icons on transparency — free, no upload.",
    "h1": "Remove Background Color from SVG",
    "crumb": "Remove background color",
    "sub": "Strip the solid <strong>canvas fill</strong> so only the graphic remains",
    "og_alt": "Remove background color from SVG in SVGEditor",
    "app_name": "Remove Background Color from SVG",
    "app_alts": [
      "Remove background color from SVG",
      "SVG remove canvas fill",
      "Delete SVG background fill",
      "SVG clear background color",
    ],
    "app_desc": "Free online tool to remove background color from SVG by deleting solid full-bleed fill rectangles.",
    "features": [
      "Removes canvas background fills",
      "Keeps foreground colors",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Remove background color from an SVG",
    "howto_desc": "Clear solid canvas fills that act as a background color behind the icon.",
    "howto_click": "Click Remove background color. Full-bleed colored fills used as the canvas are deleted.",
    "btn": "Remove background color",
    "btn_title": "Remove the background color fill from this SVG",
    "faq_aria": "Remove background color from SVG FAQ",
    "faqs": [
      (
        "How do I remove background color from an SVG?",
        "Paste the SVG and click Remove background color. Solid full-bleed fills that paint the canvas are removed.",
      ),
      (
        "Will icon fills change?",
        "No. Only rectangles that cover the whole viewBox (typical background plates) are targeted.",
      ),
      (
        "Root style background-color too?",
        "Yes. Inline background / background-color on the root svg is cleared when present.",
      ),
      (
        "Need white-only targeting?",
        "Open Remove White Background from SVG.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Colored plate? <a href="/remove-colored-background-from-svg">Remove colored background</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Solid plate? <a href="/remove-solid-background-from-svg">Remove solid background</a></span>',
    "guides": [
      ("/remove-colored-background-from-svg", "Remove colored background →"),
      ("/remove-solid-background-from-svg", "Remove solid background →"),
      ("/remove-background-from-svg", "Remove background →"),
      ("/make-svg-background-transparent", "Make transparent →"),
    ],
  },
  {
    "slug": "remove-solid-background-from-svg",
    "title": "Remove Solid Background from SVG Online — Free Tool | getsvgeditor.com",
    "description": "Remove a solid background from an SVG online. Delete opaque full-bleed rectangles and keep the mark transparent — free, no upload.",
    "h1": "Remove Solid Background from SVG",
    "crumb": "Remove solid background",
    "sub": "Delete <strong>opaque full-bleed</strong> rectangles behind the mark",
    "og_alt": "Remove solid background from SVG in SVGEditor",
    "app_name": "Remove Solid Background from SVG",
    "app_alts": [
      "Remove solid background from SVG",
      "SVG solid background remover",
      "Delete opaque SVG plate",
      "SVG remove flat background",
    ],
    "app_desc": "Free online tool to remove a solid opaque background from SVG markup.",
    "features": [
      "Targets opaque full-bleed plates",
      "Works for dark and light solids",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Remove a solid background from an SVG",
    "howto_desc": "Strip opaque full-bleed rectangles used as a solid background plate.",
    "howto_click": "Click Remove solid background. Opaque full-bleed rectangles are deleted and root size is cleared.",
    "btn": "Remove solid background",
    "btn_title": "Remove the solid opaque background from this SVG",
    "faq_aria": "Remove solid background from SVG FAQ",
    "faqs": [
      (
        "How do I remove a solid background from an SVG?",
        "Paste the SVG and click Remove solid background. Opaque rectangles that cover the viewBox are removed.",
      ),
      (
        "Dark navy plates too?",
        "Yes. Any opaque solid — white, gray, navy, or brand color — counts if it covers the canvas.",
      ),
      (
        "What about gradients as backgrounds?",
        "Gradient fills on full-bleed rects are left alone for safety. Flatten to a solid first, or edit the rect manually.",
      ),
      (
        "Prefer color-aware wording?",
        "Try Remove Colored Background from SVG.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Colored focus? <a href="/remove-colored-background-from-svg">Remove colored background</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">General? <a href="/remove-background-from-svg">Remove background</a></span>',
    "guides": [
      ("/remove-background-from-svg", "Remove background →"),
      ("/remove-colored-background-from-svg", "Remove colored background →"),
      ("/remove-background-color-from-svg", "Remove background color →"),
      ("/make-svg-background-transparent", "Make transparent →"),
    ],
  },
  {
    "slug": "remove-colored-background-from-svg",
    "title": "Remove Colored Background from SVG Online — Free Tool | getsvgeditor.com",
    "description": "Remove a colored background from an SVG online. Strip non-white canvas plates and keep the icon transparent — free, no upload.",
    "h1": "Remove Colored Background from SVG",
    "crumb": "Remove colored background",
    "sub": "Strip <strong>non-white</strong> canvas plates (teal, navy, brand fills)",
    "og_alt": "Remove colored background from SVG in SVGEditor",
    "app_name": "Remove Colored Background from SVG",
    "app_alts": [
      "Remove colored background from SVG",
      "SVG remove colored canvas",
      "Delete brand-color SVG background",
      "SVG clear non-white background",
    ],
    "app_desc": "Free online tool to remove a colored (non-white) background from SVG.",
    "features": [
      "Targets non-white opaque plates",
      "Leaves white canvases for the white tool",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Remove a colored background from an SVG",
    "howto_desc": "Delete non-white full-bleed background plates while keeping the foreground graphic.",
    "howto_click": "Click Remove colored background. Non-white opaque full-bleed rectangles are deleted.",
    "btn": "Remove colored background",
    "btn_title": "Remove the colored background plate from this SVG",
    "faq_aria": "Remove colored background from SVG FAQ",
    "faqs": [
      (
        "How do I remove a colored background from an SVG?",
        "Paste the SVG and click Remove colored background. Non-white opaque full-bleed rectangles are stripped.",
      ),
      (
        "Why skip white?",
        "White export plates are handled on Remove White Background from SVG so each intent stays distinct.",
      ),
      (
        "Brand teal or magenta plates?",
        "Yes — any opaque non-white canvas color that covers the viewBox is a candidate.",
      ),
      (
        "Want every solid plate regardless of color?",
        "Use Remove Solid Background from SVG or Remove Background from SVG.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">White plate? <a href="/remove-white-background-from-svg">Remove white background</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Any solid? <a href="/remove-solid-background-from-svg">Remove solid background</a></span>',
    "guides": [
      ("/remove-white-background-from-svg", "Remove white background →"),
      ("/remove-solid-background-from-svg", "Remove solid background →"),
      ("/remove-background-color-from-svg", "Remove background color →"),
      ("/remove-background-from-svg", "Remove background →"),
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
        f'class="app-page tool-page bg-remove-tool-page" data-bg-remove-intent="{slug}" data-mobile-mode="preview" data-default-tab="preview"',
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
              id="btn-bg-remove-action"
              title="{esc(p["btn_title"])}"
            >
              {esc(p["btn"])}</button>''',
        text,
        count=1,
    )

    # Hide clean size stat (not used on these pages)
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
        '"name": "Paste or use the sample SVG",\n                "text": "Open the tool with the sample graphic (viewBox only, no root width or height), or paste your own SVG into Source."',
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
        "Paste or upload an SVG with a background plate. Click the action button to clear it.",
    )
    text = text.replace(
        '<a href="/blog/svg-to-png">PNG guide</a>',
        '<a href="/remove-background-from-svg">Remove background</a>',
    )

    out = root / f"{slug}.html"
    out.write_text(text, encoding="utf-8")
    print("wrote", out.name)
    return out


def main():
    assert len(PAGES) == 8
    for p in PAGES:
        build_page(p)
    print("done", len(PAGES))


if __name__ == "__main__":
    main()
