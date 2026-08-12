#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

npx --yes esbuild fonts.css --minify --outfile=fonts.min.css
npx --yes esbuild styles.css --minify --outfile=styles.body.min.css
cat fonts.min.css styles.body.min.css > styles.min.css
rm -f styles.body.min.css

TMP_APP="$(mktemp --suffix=.js)"
TMP_EMBED="$(mktemp --suffix=.js)"
trap 'rm -f "$TMP_APP" "$TMP_EMBED"' EXIT

cat vendor/lz-string.min.js svg-sanitize.js share-codec.js script.js >"$TMP_APP"
npx --yes esbuild "$TMP_APP" --minify --outfile=app.min.js

cat vendor/lz-string.min.js svg-sanitize.js share-codec.js embed.js >"$TMP_EMBED"
npx --yes esbuild "$TMP_EMBED" --minify --outfile=embed.min.js

# Cache-bust query from content hash so CDN/browsers never keep stale JS/CSS
ASSET_V="$(cat app.min.js embed.min.js styles.min.css fonts.min.css gtag-config.js | sha256sum | cut -c1-10)"

# Inline styles.min.css into HTML to remove the render-blocking CSS round-trip (~13 KiB).
# Fonts use absolute /fonts/ URLs so inlined CSS works from /blog/* too.
python3 - "$ASSET_V" <<'PY'
import pathlib, re, sys

asset_v = sys.argv[1]
css = pathlib.Path("styles.min.css").read_text(encoding="utf-8")
css = css.replace("</", "<\\/")
style_tag = f'<style id="app-css">{css}</style>'
link_re = re.compile(
    r'[ \t]*<link\s+rel="stylesheet"\s+href="/?styles\.min\.css(?:\?v=[^"]*)?"\s*/?>\s*\n?',
    re.I,
)
style_re = re.compile(r'<style id="app-css">.*?</style>', re.S)

def stamp_misc(text: str) -> str:
    repls = [
        (r'(href="/?fonts\.min\.css)(\?v=[^"]*)?"', rf'\1?v={asset_v}"'),
        (r'(src="/?app\.min\.js)(\?v=[^"]*)?"', rf'\1?v={asset_v}"'),
        (r'(src="/?embed\.min\.js)(\?v=[^"]*)?"', rf'\1?v={asset_v}"'),
        (r'(src="/?gtag-config\.js)(\?v=[^"]*)?"', rf'\1?v={asset_v}"'),
    ]
    for pat, rep in repls:
        text = re.sub(pat, rep, text)
    return text

def apply_css(text: str) -> str:
    if style_re.search(text):
        return style_re.sub(style_tag, text, count=1)
    if link_re.search(text):
        return link_re.sub(style_tag + "\n    ", text, count=1)
    return text

files = [
    "index.html",
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
    # embed keeps a separate fonts stylesheet; do not inline full app CSS there
    if p.name != "embed.html":
        updated = apply_css(updated)
    if updated != original:
        p.write_text(updated, encoding="utf-8")
PY

echo "Built app.min.js embed.min.js styles.min.css fonts.min.css"
echo "Asset cache version: v=${ASSET_V}"
echo "Inlined styles.min.css into HTML (render-blocking CSS removed)"
wc -c app.min.js embed.min.js styles.min.css fonts.min.css
