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

echo "Built app.min.js embed.min.js styles.min.css fonts.min.css"
wc -c app.min.js embed.min.js styles.min.css fonts.min.css
