#!/usr/bin/env python3
"""Register PNG + new craft slugs in build.sh and sitemap.xml."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
slug_files = [
    root / "scripts" / "_png_intent_slugs.txt",
    root / "scripts" / "_craft_slugs.txt",
]
slugs = []
for path in slug_files:
    if not path.is_file():
        continue
    for line in path.read_text(encoding="utf-8").splitlines():
        s = line.strip()
        if s and s not in slugs:
            slugs.append(s)

build = root / "build.sh"
text = build.read_text(encoding="utf-8")
missing_html = [s for s in slugs if f'"{s}.html"' not in text]
if missing_html:
    marker = '    "convert-svg-arcs-to-cubic-curves.html",\n'
    if marker not in text:
        raise SystemExit("build.sh marker not found")
    insert = "".join(f'    "{s}.html",\n' for s in missing_html)
    text = text.replace(marker, marker + insert, 1)
    build.write_text(text, encoding="utf-8")
    print("build.sh: added", len(missing_html), "files")
else:
    print("build.sh already has these pages")

sm = root / "sitemap.xml"
smap = sm.read_text(encoding="utf-8")
existing = set(re.findall(r"<loc>https://getsvgeditor.com/([^<]+)</loc>", smap))
new_slugs = [s for s in slugs if s not in existing]
if not new_slugs:
    print("sitemap: nothing to add")
else:
    entries = []
    for s in new_slugs:
        entries.append(
            "  <url>\n"
            f"    <loc>https://getsvgeditor.com/{s}</loc>\n"
            "    <lastmod>2026-09-10T02:10:00+03:00</lastmod>\n"
            "    <changefreq>weekly</changefreq>\n"
            "    <priority>0.85</priority>\n"
            "  </url>"
        )
    block = "\n".join(entries) + "\n"
    m = re.search(r"  <url>\n    <loc>https://getsvgeditor.com/blog/", smap)
    if not m:
        m = re.search(r"  <url>\n    <loc>https://getsvgeditor.com/privacy</loc>", smap)
    if not m:
        raise SystemExit("sitemap insert point not found")
    smap = smap[: m.start()] + block + smap[m.start() :]
    sm.write_text(smap, encoding="utf-8")
    print("sitemap: added", len(new_slugs), "urls")

missing = [s for s in slugs if not (root / f"{s}.html").is_file()]
if missing:
    raise SystemExit("missing html: " + ", ".join(missing[:10]))
print("ok", len(slugs), "slugs checked")
