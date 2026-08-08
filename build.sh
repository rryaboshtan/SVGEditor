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

stamp_assets() {
  local file="$1"
  local tmp
  tmp="$(mktemp)"
  sed -E \
    -e "s|(href=\"/?styles\\.min\\.css)(\\?v=[^\"]*)?\"|\\1?v=${ASSET_V}\"|g" \
    -e "s|(href=\"/?fonts\\.min\\.css)(\\?v=[^\"]*)?\"|\\1?v=${ASSET_V}\"|g" \
    -e "s|(src=\"/?app\\.min\\.js)(\\?v=[^\"]*)?\"|\\1?v=${ASSET_V}\"|g" \
    -e "s|(src=\"/?embed\\.min\\.js)(\\?v=[^\"]*)?\"|\\1?v=${ASSET_V}\"|g" \
    -e "s|(src=\"/?gtag-config\\.js)(\\?v=[^\"]*)?\"|\\1?v=${ASSET_V}\"|g" \
    "$file" >"$tmp"
  mv "$tmp" "$file"
}

for html in index.html svg-to-react.html svg-to-png.html embed.html privacy.html terms.html 404.html blog/*.html; do
  if [[ -f "$html" ]]; then
    stamp_assets "$html"
  fi
done

echo "Built app.min.js embed.min.js styles.min.css fonts.min.css"
echo "Asset cache version: v=${ASSET_V}"
wc -c app.min.js embed.min.js styles.min.css fonts.min.css
