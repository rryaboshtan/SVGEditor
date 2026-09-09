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

python3 - <<'PY'
from pathlib import Path

css = Path("styles.css").read_text(encoding="utf-8")
workspace_start = css.index("/* ——— Workspace ——— */")
download_start = css.index("/* ——— SVG editor download landing page ——— */")
home_css = css[:css.index("/* ——— Legal pages ——— */")] + css[workspace_start:download_start]
Path("styles.home.css").write_text(home_css, encoding="utf-8")
PY
npx --yes esbuild styles.home.css --minify --outfile=styles.home.body.min.css
cat fonts-syne.min.css styles.home.body.min.css > styles.home.min.css
rm -f styles.home.css styles.home.body.min.css

TMP_APP="$(mktemp --suffix=.js)"
TMP_EMBED="$(mktemp --suffix=.js)"
trap 'rm -f "$TMP_APP" "$TMP_EMBED"' EXIT

cat vendor/lz-string.min.js svg-sanitize.js share-codec.js batch-longtail-intents.js script.js >"$TMP_APP"
npx --yes esbuild "$TMP_APP" --minify --outfile=app.min.js

cat vendor/lz-string.min.js svg-sanitize.js share-codec.js embed.js >"$TMP_EMBED"
npx --yes esbuild "$TMP_EMBED" --minify --outfile=embed.min.js

ASSET_V="$(cat app.min.js embed.min.js styles.min.css fonts.min.css fonts-mono.min.css gtag-config.js | sha256sum | cut -c1-10)"
HOME_ASSET_V="$(cat app.min.js styles.home.min.css fonts.min.css fonts-mono.min.css gtag-config.js | sha256sum | cut -c1-10)"

python3 - "$ASSET_V" "$HOME_ASSET_V" <<'PY'
import pathlib, re, sys

asset_v = sys.argv[1]
home_asset_v = sys.argv[2]
css = pathlib.Path("styles.min.css").read_text(encoding="utf-8").replace("</", "<\\/")
style_tag = f'<style id="app-css">{css}</style>'
home_css = pathlib.Path("styles.home.min.css").read_text(encoding="utf-8").replace("</", "<\\/")
home_style_tag = f'<style id="app-css">{home_css}</style>'
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

def stamp_misc(text: str, version: str) -> str:
    repls = [
        (r'(href="/?fonts\.min\.css)(\?v=[^"]*)?"', rf'\1?v={version}"'),
        (r'(href="/?fonts-mono\.min\.css)(\?v=[^"]*)?"', rf'\1?v={version}"'),
        (r'(src="/?app\.min\.js)(\?v=[^"]*)?"', rf'\1?v={version}"'),
        (r'(src="/?embed\.min\.js)(\?v=[^"]*)?"', rf'\1?v={version}"'),
        (r'(src="/?gtag-config\.js)(\?v=[^"]*)?"', rf'\1?v={version}"'),
    ]
    for pat, rep in repls:
        text = re.sub(pat, rep, text)
    return text

slot_re = re.compile(r'[ \t]*<!--\s*fonts-mono-slot\s*-->\s*\n?')

def apply_css(text: str, home: bool = False) -> str:
    current_style_tag = home_style_tag if home else style_tag
    if style_re.search(text):
        text = style_re.sub(current_style_tag, text, count=1)
    elif link_re.search(text):
        text = link_re.sub(current_style_tag + "\n    ", text, count=1)

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
    "mirror-svg-path-horizontally.html",
    "mirror-svg-path-vertically.html",
    "mirror-svg-horizontally.html",
    "mirror-svg-vertically.html",
    "flip-svg-path-horizontally.html",
    "flip-svg-path-vertically.html",
    "flip-svg-horizontally.html",
    "flip-svg-vertically.html",
    "rotate-svg-path.html",
    "rotate-svg-path-by-degrees.html",
    "rotate-svg-path-45-degrees.html",
    "rotate-svg-element.html",
    "rotate-svg-element-by-degrees.html",
    "rotate-svg-element-90-degrees.html",
    "rotate-svg-element-around-center.html",
    "rotate-svg-icon.html",
    "rotate-svg-icon-by-degrees.html",
    "rotate-svg-icon-90-degrees.html",
    "rotate-svg-icon-around-center.html",
    "fix-svg-viewbox.html",
    "remove-svg-viewbox-whitespace.html",
    "fix-svg-viewbox-not-working.html",
    "fix-svg-viewbox-cropping.html",
    "fit-svg-to-viewbox.html",
    "calculate-svg-viewbox.html",
    "change-svg-viewbox.html",
    "strip-svg-metadata.html",
    "remove-comments-from-svg.html",
    "remove-unused-ids-from-svg.html",
    "clean-svg-file.html",
    "reduce-svg-file-size.html",
    "optimize-svg-file.html",
    "svg-to-base64.html",
    "svg-to-base64-string.html",
    "svg-to-base64-data-uri.html",
    "svg-to-base64-css.html",
    "svg-to-base64-html.html",
    "svg-to-base64-css-background-image.html",
    "svg-to-base64-css-background.html",
    "svg-to-base64-css-data-uri.html",
    "svg-image-to-base64-string.html",
    "svg-base64-data-uri-image.html",
    "svg-to-base64-html-img.html",
    "remove-background-from-svg.html",
    "remove-white-background-from-svg.html",
    "remove-transparent-background-from-svg.html",
    "make-svg-background-transparent.html",
    "remove-white-space-from-svg.html",
    "remove-background-color-from-svg.html",
    "remove-solid-background-from-svg.html",
    "remove-colored-background-from-svg.html",
    "change-svg-stroke-color.html",
    "change-svg-stroke-color-css.html",
    "change-svg-stroke-color-javascript.html",
    "change-inline-svg-stroke-color.html",
    "change-svg-stroke-color-hover.html",
    "change-svg-stroke-color-currentcolor.html",
    "change-svg-stroke-color-react.html",
    "change-svg-stroke-color-tailwind.html",
    "change-svg-path-stroke-color.html",
    "change-svg-icon-stroke-color.html",
    "change-svg-stroke-color-without-editing-svg.html",
    "scale-svg-path-coordinates.html",
    "scale-svg-path-by-factor.html",
    "scale-svg-path-by-percentage.html",
    "scale-svg-path-proportionally.html",
    "scale-svg-path-x-coordinates.html",
    "scale-svg-path-y-coordinates.html",
    "scale-svg-path-without-transform.html",
    "scale-svg-path-without-changing-viewbox.html",
    "scale-svg-path-to-specific-size.html",
    "scale-svg-path-to-fit-viewbox.html",
    "translate-svg-path-coordinates.html",
    "translate-svg-path-coordinates-horizontally.html",
    "translate-svg-path-coordinates-vertically.html",
    "translate-svg-path-coordinates-without-transform.html",
    "translate-svg-path-coordinates-to-origin.html",
    "center-svg-path.html",
    "svg-gradient-generator.html",
    "svg-linear-gradient-generator.html",
    "svg-linear-gradient-code-generator.html",
    "svg-gradient-generator-from-colors.html",
    "svg-gradient-angle-generator.html",
    "svg-gradient-with-opacity.html",
    "multi-color-svg-gradient-generator.html",
    "multi-color-svg-linear-gradient-generator.html",
    "multi-color-svg-radial-gradient-generator.html",
    "custom-multi-color-svg-gradient-generator.html",
    "multi-color-svg-background-gradient-generator.html",
    "svg-text-gradient-generator.html",
    "svg-text-gradient-for-developers.html",
    "svg-text-linear-gradient.html",
    "svg-text-radial-gradient.html",
    "animated-svg-text-gradient.html",
    "neon-svg-text-gradient.html",
    "transparent-svg-text-gradient.html",
    "custom-color-svg-text-gradient.html",
    "svg-text-gradient-copy-css.html",
    "svg-text-gradient-export-svg.html",
    "svg-text-gradient-for-web-design.html",
    "invert-svg-gradient-colors.html",
    "invert-svg-gradient-direction.html",
    "reverse-svg-gradient-stops.html",
    "extract-colors-from-svg-gradient.html",
    "svg-gradient-color-picker-from-code.html",
    "extract-svg-gradient-stops.html",
    "svg-gradient-fill-transparent-to-color.html",
    "svg-linear-gradient-fade-to-transparent.html",
    "svg-gradient-transparent-edges.html",
    "svg-fade-out-gradient-generator.html",
    "transparent-to-color-gradient-svg-code.html",
    "convert-css-linear-gradient-to-svg.html",
    "transform-css-gradient-to-svg-code.html",
    "css-to-svg-gradient-generator.html",
    "export-css-gradient-as-svg.html",
    "simplify-svg-path-data-online.html",
    "reduce-svg-path-nodes-online.html",
    "compress-svg-path-data.html",
    "remove-redundant-svg-path-points.html",
    "reverse-svg-path-direction.html",
    "change-svg-path-winding-order.html",
    "round-svg-path-decimals-online.html",
    "truncate-svg-path-numbers-online.html",
    "convert-svg-absolute-to-relative-path-commands.html",
    "convert-svg-relative-to-absolute-path-commands.html",
    "change-svg-path-commands-to-lowercase-relative.html",
    "svg-gradient-stroke-code-generator.html",
    "svg-gradient-border-css-code-generator.html",
    "svg-linear-gradient-stroke-generator.html",
    "svg-radial-gradient-stroke-generator.html",
    "svg-linear-gradient-stroke-code-generator.html",
    "svg-circle-gradient-stroke-generator.html",
    "svg-path-gradient-stroke-generator.html",
    "svg-icon-gradient-stroke-generator.html",
    "svg-rounded-rectangle-gradient-border-generator.html",
    "svg-rainbow-gradient-stroke-generator.html",
    "svg-multicolor-stroke-generator.html",
    "svg-gradient-border-generator-with-transparent-fill.html",
    "svg-gradient-border-generator-for-text.html",
    "responsive-svg-background-gradient-generator.html",
    "sanitize-svg-online.html",
    "remove-script-from-svg.html",
    "remove-event-handlers-from-svg.html",
    "remove-embedded-html-from-svg.html",
    "remove-unused-svg-elements.html",
    "remove-unnecessary-svg-attributes.html",
    "crop-svg-online.html",
    "crop-svg-to-custom-dimensions.html",
    "crop-svg-to-selected-area.html",
    "crop-svg-to-square.html",
    "crop-svg-to-circle.html",
    "crop-svg-to-specific-aspect-ratio.html",
    "crop-svg-without-changing-viewbox.html",
    "crop-svg-canvas-online.html",
    "remove-width-and-height-from-svg.html",
    "set-svg-width-height-from-viewbox.html",
    "add-viewbox-to-svg.html",
    "svg-to-vue.html",
    "svg-to-vue-typescript.html",
    "svg-to-vue-composition-api.html",
    "svg-to-vue-options-api.html",
    "svg-to-vue-single-file-component.html",
    "svg-to-vue-jsx.html",
    "convert-svg-icon-to-vue.html",
    "svg-to-vue-nuxt.html",
    "svg-animation-timing-function-editor.html",
    "svg-animation-sequence-generator.html",
    "svg-animation-stagger-generator.html",
    "svg-animation-dasharray-generator.html",
    "svg-animation-dashoffset-generator.html",
    "svg-drawing-animation-generator.html",
    "svg-reveal-animation-generator.html",
    "svg-spinner-animation-generator.html",
    "svg-pulse-animation-generator.html",
    "svg-bounce-animation-generator.html",
    "svg-rotate-animation-generator.html",
    "svg-scale-animation-generator.html",
    "svg-floating-animation-generator.html",
    "svg-wiggle-animation-generator.html",
    "svg-shake-animation-generator.html",
    "svg-wave-animation-generator.html",
    "svg-animation-path-editor.html",
    "convert-svg-inline-styles-to-presentation-attributes.html",
    "convert-svg-presentation-attributes-to-inline-styles.html",
    "convert-svg-css-classes-to-attributes.html",
    "remove-style-tags-from-svg.html",
    "remove-hardcoded-fill-from-svg-paths.html",
    "convert-svg-fill-to-currentcolor.html",
    "remove-empty-groups-from-svg.html",
    "remove-unused-defs-from-svg.html",
    "fix-svg-gradient-stretch-in-flexbox.html",
    "fix-svg-gradient-stretch-in-css-grid.html",
    "set-svg-preserveaspectratio-for-flexbox.html",
    "svg-gradient-objectboundingbox-stretch-fix.html",
    "set-svg-preserveaspectratio-online.html",
    "svg-preserveaspectratio-meet-slice-none.html",
    "svg-to-svelte.html",
    "svg-to-svelte-typescript.html",
    "svg-to-svelte-single-file-component.html",
    "svg-icon-to-svelte.html",
    "svg-to-sveltekit.html",
    "svg-to-react-native.html",
    "svg-to-react-native-svg-component.html",
    "svg-to-react-native-jsx.html",
    "paste-svg-to-react-native-online.html",
    "svg-react-native-component-generator.html",
    "svg-to-react-native-typescript.html",
    "svg-icon-to-react-native.html",
    "convert-svg-icon-to-react-native-svg.html",
    "figma-svg-to-react-native.html",
    "convert-figma-svg-export-to-react-native.html",
    "svg-logo-to-react-native.html",
    "svg-illustration-to-react-native.html",
    "svg-to-expo-react-native.html",
    "convert-svg-to-expo-svg-component.html",
    "svg-to-react-native-android.html",
    "svg-to-react-native-ios.html",
    "svg-to-svgxml-react-native.html",
    "svg-string-to-react-native-component.html",
    "inline-svg-to-react-native-svg.html",
    "svg-path-to-react-native.html",
    "convert-svg-path-to-react-native-svg-path.html",
    "svg-circle-to-react-native.html",
    "svg-rect-to-react-native.html",
    "convert-svg-lineargradient-to-react-native.html",
    "convert-svg-attributes-to-react-native-props.html",
    "camelcase-svg-attributes-for-react-native.html",
    "svg-to-react-native-currentcolor.html",
    "convert-svg-fill-to-color-prop-react-native.html",
    "svg-icon-with-size-props-react-native.html",
    "responsive-svg-icon-react-native-component.html",
    "svg-to-react-native-with-viewbox.html",
    "optimize-svg-for-react-native.html",
    "remove-unsupported-svg-for-react-native.html",
    "svgr-native-svg-to-react-native-online.html",
    "svg-to-react-native-functional-component.html",
    "svg-to-react-native-forwardref-component.html",
    "fix-svg-clipping-online.html",
    "make-svg-scale-with-container.html",
    "make-svg-responsive-online.html",
    "remove-xml-declaration-from-svg.html",
    "clean-illustrator-svg-online.html",
    "clean-figma-svg-online.html",
    "remove-hidden-layers-from-svg.html",
    "strip-inline-styles-from-svg.html",
    "change-svg-fill-color-with-css.html",
    "convert-svg-colors-to-css-variables.html",
    "change-svg-fill-color-on-hover.html",
    "make-svg-icon-monochrome-online.html",
    "convert-svg-presentation-attributes-to-css.html",
    "convert-svg-attributes-to-css-classes.html",
    "remove-svg-presentation-attributes.html",
    "remove-empty-attributes-from-svg.html",
    "remove-data-attributes-from-svg.html",
    "bake-svg-transforms-into-path.html",
    "convert-svg-stroke-to-path.html",
    "skew-svg-path-online.html",
    "close-open-svg-paths-online.html",
    "merge-svg-paths-online.html",
    "offset-svg-path-online.html",
    "convert-svg-text-to-path.html",
    "split-compound-svg-paths.html",
    "ungroup-svg-paths-online.html",
    "unite-svg-paths-online.html",
    "subtract-svg-paths-online.html",
    "intersect-svg-paths-online.html",
    "create-compound-svg-path.html",
    "convert-svg-arcs-to-cubic-curves.html",
    "convert-svg-to-transparent-png.html",
    "svg-to-png-high-resolution.html",
    "svg-icon-to-png-converter.html",
    "svg-logo-to-png-online.html",
    "svg-to-png-custom-size.html",
    "svg-to-retina-png-online.html",
    "svg-code-to-png-online.html",
    "inline-svg-to-png-converter.html",
    "export-svg-as-transparent-png.html",
    "svg-to-png-without-background.html",
    "svg-favicon-to-png-converter.html",
    "svg-illustration-to-png-online.html",
    "download-svg-as-png-online.html",
    "paste-svg-export-as-png.html",
    "svg-to-png-512-pixels.html",
    "convert-svg-path-to-png.html",
    "svg-to-png-for-email.html",
    "svg-to-apple-touch-icon.html",
    "svg-to-png-2x-scale.html",
    "batch-convert-svg-to-png.html",
    "fix-svg-stretching-in-flexbox.html",
    "prevent-svg-distortion-in-css-grid.html",
    "remove-inkscape-namespaces-from-svg.html",
    "remove-sodipodi-attributes-from-svg.html",
    "clean-sketch-svg-export-online.html",
    "remove-unused-svg-namespaces-online.html",
    "crop-svg-to-bounding-box.html",
    "calculate-svg-bounding-box-online.html",
    "convert-svg-colors-to-currentcolor.html",
    "remove-hardcoded-stroke-from-svg.html",
    "change-svg-fill-and-stroke-on-hover.html",
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
    is_home = path == "index.html"
    updated = stamp_misc(original, home_asset_v if is_home else asset_v)
    if p.name != "embed.html":
        updated = apply_css(updated, home=is_home)
    if updated != original:
        p.write_text(updated, encoding="utf-8")
PY

echo "Built app.min.js embed.min.js styles.min.css styles.home.min.css fonts.min.css fonts-mono.min.css"
echo "Asset cache version: v=${ASSET_V}"
echo "Critical CSS inlined (Syne + styles); mono fonts deferred"
wc -c app.min.js embed.min.js styles.min.css styles.home.min.css fonts.min.css fonts-mono.min.css
