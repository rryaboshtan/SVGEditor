#!/usr/bin/env python3
"""Register batch long-tail HTML pages in build.sh and sitemap.xml."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
slugs = [
    s.strip()
    for s in (root / "scripts" / "_batch_slugs.txt").read_text(encoding="utf-8").splitlines()
    if s.strip()
]

# --- build.sh ---
build = root / "build.sh"
text = build.read_text(encoding="utf-8")
marker = '    "change-svg-path-commands-to-lowercase-relative.html",\n'
insert = "".join(f'    "{s}.html",\n' for s in slugs)
if any(f'"{s}.html"' in text for s in slugs[:3]):
    print("build.sh already has batch pages")
else:
    if marker not in text:
        raise SystemExit("build.sh marker not found")
    text = text.replace(marker, marker + insert, 1)
    build.write_text(text, encoding="utf-8")
    print("build.sh: added", len(slugs), "files")

# --- sitemap.xml ---
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
            "    <lastmod>2026-09-05T12:00:00+03:00</lastmod>\n"
            "    <changefreq>weekly</changefreq>\n"
            "    <priority>0.85</priority>\n"
            "  </url>"
        )
    block = "\n".join(entries) + "\n"
    # Insert before first blog URL (or before privacy)
    m = re.search(r"  <url>\n    <loc>https://getsvgeditor.com/blog/", smap)
    if not m:
        m = re.search(r"  <url>\n    <loc>https://getsvgeditor.com/privacy</loc>", smap)
    if not m:
        raise SystemExit("sitemap insert point not found")
    smap = smap[: m.start()] + block + smap[m.start() :]
    sm.write_text(smap, encoding="utf-8")
    print("sitemap: added", len(new_slugs), "urls")

# Verify HTML files exist
missing = [s for s in slugs if not (root / f"{s}.html").is_file()]
if missing:
    raise SystemExit("missing html: " + ", ".join(missing[:10]))
print("ok", len(slugs), "pages registered")
