#!/usr/bin/env python3
"""Reusable builder for long-tail SEO tool pages cloned from optimize-svg-file.html."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parent.parent
TEMPLATE = (ROOT / "optimize-svg-file.html").read_text(encoding="utf-8")

FAMILY = {
    "gradient": {
        "class": "gradient-tool-page",
        "attr": "data-gradient-intent",
        "btn_id": "btn-gradient-action",
        "keep_size_stat": False,
    },
    "clean": {
        "class": "clean-tool-page",
        "attr": "data-clean-intent",
        "btn_id": "btn-clean-action",
        "keep_size_stat": True,
    },
    "viewbox": {
        "class": "viewbox-tool-page",
        "attr": "data-viewbox-intent",
        "btn_id": "btn-viewbox-action",
        "keep_size_stat": False,
    },
    "vue": {
        "class": "vue-tool-page",
        "attr": "data-vue-intent",
        "btn_id": "btn-vue-action",
        "keep_size_stat": False,
    },
    "anim": {
        "class": "anim-tool-page",
        "attr": "data-anim-intent",
        "btn_id": "btn-anim-action",
        "keep_size_stat": False,
    },
    "style": {
        "class": "style-tool-page",
        "attr": "data-style-intent",
        "btn_id": "btn-style-action",
        "keep_size_stat": False,
    },
}


def note(a_href, a_label, b_href, b_label):
    return (
        f'<span class="tool-note-pair">{a_label}? <a href="{a_href}">{a_label}</a></span>'
        '<span class="tool-note-sep" aria-hidden="true"> · </span>'
        f'<span class="tool-note-pair">{b_label}? <a href="{b_href}">{b_label}</a></span>'
    )


def guides(pairs):
    return [(href, f"{label} →") for href, label in pairs]


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


def guides_html(guide_list):
    return "\n".join(
        f'            <a class="tool-faq-guide" href="{href}">{esc(label)}</a>'
        for href, label in guide_list
    )


def action_button_html(p):
    cfg = FAMILY[p["family"]]
    btn_id = cfg["btn_id"]
    return f'''<button
              type="button"
              class="btn btn-accent"
              id="{btn_id}"
              title="{esc(p["btn_title"])}"
            >
              {esc(p["btn"])}</button>'''


def build_page(p):
    """Clone optimize-svg-file.html and rewrite SEO + tool chrome for page dict p."""
    text = TEMPLATE
    slug = p["slug"]
    family = p["family"]
    if family not in FAMILY:
        raise ValueError(f"Unknown family: {family}")
    cfg = FAMILY[family]
    url = f"https://getsvgeditor.com/{slug}"
    body = (
        f'class="app-page tool-page {cfg["class"]}" '
        f'{cfg["attr"]}="{slug}" '
        f'data-mobile-mode="preview" data-default-tab="preview"'
    )
    hub = p["guides"][0][0]
    hub_label = p["guides"][0][1].replace(" →", "")

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
        body,
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
        raise SystemExit(f"FAQ panel not found for {slug}")
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

    if not cfg["keep_size_stat"]:
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
        '"name": "Paste or use the sample SVG",\n                "text": "Open the tool with the sample graphic (viewBox only, no root width or height), or paste your own markup into Source."',
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
        p["empty"],
    )
    text = text.replace(
        '<a href="/blog/svg-to-png">PNG guide</a>',
        f'<a href="{hub}">{esc(hub_label)}</a>',
    )

    out = ROOT / f"{slug}.html"
    out.write_text(text, encoding="utf-8")
    print("wrote", out.name)
    return out
