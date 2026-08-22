#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

npx --yes esbuild fonts-syne.css --minify --outfile=fonts-syne.min.css
npx --yes esbuild fonts-mono.css --minify --outfile=fonts-mono.min.css
# Full bundle for embed.html
cat fonts-syne.min.css fonts-mono.min.css > fonts.min.css

npx --yes esbuild styles.css --minify --outfile=styles.body.min.css
# Critical CSS: Syne + app styles (mono stays out of the first paint path)
cat fonts-syne.min.css styles.body.min.css > styles.min.css
rm -f styles.body.min.css

TMP_APP="$(mktemp --suffix=.js)"
TMP_EMBED="$(mktemp --suffix=.js)"
trap 'rm -f "$TMP_APP" "$TMP_EMBED"' EXIT

cat vendor/lz-string.min.js svg-sanitize.js share-codec.js script.js >"$TMP_APP"
npx --yes esbuild "$TMP_APP" --minify --outfile=app.min.js

cat vendor/lz-string.min.js svg-sanitize.js share-codec.js embed.js >"$TMP_EMBED"
npx --yes esbuild "$TMP_EMBED" --minify --outfile=embed.min.js

ASSET_V="$(cat app.min.js embed.min.js styles.min.css fonts.min.css fonts-mono.min.css gtag-config.js | sha256sum | cut -c1-10)"

python3 - "$ASSET_V" <<'PY'
import pathlib, re, sys

asset_v = sys.argv[1]
css = pathlib.Path("styles.min.css").read_text(encoding="utf-8").replace("</", "<\\/")
style_tag = f'<style id="app-css">{css}</style>'
# No inline onload — CSP blocks event handlers; gtag-config.js promotes media=all.
mono_block = (
    f'<link id="fonts-mono" rel="stylesheet" href="/fonts-mono.min.css?v={asset_v}" '
    f'media="print" />\n'
    f'    <noscript><link rel="stylesheet" href="/fonts-mono.min.css?v={asset_v}" /></noscript>'
)

link_re = re.compile(
    r'[ \t]*<link\s+rel="stylesheet"\s+href="/?styles\.min\.css(?:\?v=[^"]*)?"\s*/?>\s*\n?',
    re.I,
)
style_re = re.compile(r'<style id="app-css">.*?</style>', re.S)
mono_re = re.compile(
    r'[ \t]*<link\s+(?:[^>]*\s)?href="/?fonts-mono\.min\.css(?:\?v=[^"]*)?"[^>]*>\s*'
    r'(?:\n?\s*<noscript>\s*<link\s+rel="stylesheet"\s+href="/?fonts-mono\.min\.css(?:\?v=[^"]*)?"\s*/?>\s*</noscript>\s*)*',
    re.I,
)

def stamp_misc(text: str) -> str:
    repls = [
        (r'(href="/?fonts\.min\.css)(\?v=[^"]*)?"', rf'\1?v={asset_v}"'),
        (r'(href="/?fonts-mono\.min\.css)(\?v=[^"]*)?"', rf'\1?v={asset_v}"'),
        (r'(src="/?app\.min\.js)(\?v=[^"]*)?"', rf'\1?v={asset_v}"'),
        (r'(src="/?embed\.min\.js)(\?v=[^"]*)?"', rf'\1?v={asset_v}"'),
        (r'(src="/?gtag-config\.js)(\?v=[^"]*)?"', rf'\1?v={asset_v}"'),
    ]
    for pat, rep in repls:
        text = re.sub(pat, rep, text)
    return text

slot_re = re.compile(r'[ \t]*<!--\s*fonts-mono-slot\s*-->\s*\n?')

def apply_css(text: str) -> str:
    if style_re.search(text):
        text = style_re.sub(style_tag, text, count=1)
    elif link_re.search(text):
        text = link_re.sub(style_tag + "\n    ", text, count=1)

    if mono_re.search(text):
        text = mono_re.sub(mono_block + "\n    ", text, count=1)
    elif slot_re.search(text):
        text = slot_re.sub(mono_block + "\n    ", text, count=1)
    elif 'id="app-css"' in text:
        text = style_re.sub(style_tag + "\n    " + mono_block, text, count=1)
    return text

files = [
    "index.html",
    "svg-editor-download.html",
    "svg-icon-editor.html",
    "svg-animation-editor.html",
    "svg-to-react.html",
    "svg-to-png.html",
    "embed.html",
    "privacy.html",
    "terms.html",
    "404.html",
]
files += sorted(str(p) for p in pathlib.Path("blog").glob("*.html"))

for path in files:
    p = pathlib.Path(path)
    if not p.is_file():
        continue
    original = p.read_text(encoding="utf-8")
    updated = stamp_misc(original)
    if p.name != "embed.html":
        updated = apply_css(updated)
    if updated != original:
        p.write_text(updated, encoding="utf-8")
PY

echo "Built app.min.js embed.min.js styles.min.css fonts.min.css fonts-mono.min.css"
echo "Asset cache version: v=${ASSET_V}"
echo "Critical CSS inlined (Syne + styles); mono fonts deferred"
wc -c app.min.js embed.min.js styles.min.css fonts.min.css fonts-mono.min.css
