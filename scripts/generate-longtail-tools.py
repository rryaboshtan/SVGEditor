#!/usr/bin/env python3
"""Generate gradient-edit and path-edit long-tail tool pages."""
from pathlib import Path
import re
import json

root = Path(__file__).resolve().parent.parent
template = (root / "optimize-svg-file.html").read_text(encoding="utf-8")


def note(a_href, a_label, b_href, b_label):
    return (
        f'<span class="tool-note-pair">{a_label}? <a href="{a_href}">{a_label}</a></span>'
        '<span class="tool-note-sep" aria-hidden="true"> · </span>'
        f'<span class="tool-note-pair">{b_label}? <a href="{b_href}">{b_label}</a></span>'
    )


def guides(pairs):
    return [(href, f"{label} →") for href, label in pairs]


CLUSTERS = {
    "invert": [
        "/invert-svg-gradient-colors",
        "/invert-svg-gradient-direction",
        "/reverse-svg-gradient-stops",
    ],
    "extract": [
        "/extract-colors-from-svg-gradient",
        "/svg-gradient-color-picker-from-code",
        "/extract-svg-gradient-stops",
    ],
    "fade": [
        "/svg-gradient-fill-transparent-to-color",
        "/svg-linear-gradient-fade-to-transparent",
        "/svg-gradient-transparent-edges",
        "/svg-fade-out-gradient-generator",
        "/transparent-to-color-gradient-svg-code",
    ],
    "css": [
        "/convert-css-linear-gradient-to-svg",
        "/transform-css-gradient-to-svg-code",
        "/css-to-svg-gradient-generator",
        "/export-css-gradient-as-svg",
    ],
    "simplify": [
        "/simplify-svg-path-data-online",
        "/reduce-svg-path-nodes-online",
        "/compress-svg-path-data",
        "/remove-redundant-svg-path-points",
    ],
    "reverse": [
        "/reverse-svg-path-direction",
        "/change-svg-path-winding-order",
    ],
    "round": [
        "/round-svg-path-decimals-online",
        "/truncate-svg-path-numbers-online",
    ],
    "absrel": [
        "/convert-svg-absolute-to-relative-path-commands",
        "/convert-svg-relative-to-absolute-path-commands",
        "/change-svg-path-commands-to-lowercase-relative",
    ],
}

LABEL = {
    "/invert-svg-gradient-colors": "Invert colors",
    "/invert-svg-gradient-direction": "Invert direction",
    "/reverse-svg-gradient-stops": "Reverse stops",
    "/extract-colors-from-svg-gradient": "Extract colors",
    "/svg-gradient-color-picker-from-code": "Color picker",
    "/extract-svg-gradient-stops": "Extract stops",
    "/svg-gradient-fill-transparent-to-color": "Transparent to color",
    "/svg-linear-gradient-fade-to-transparent": "Fade to transparent",
    "/svg-gradient-transparent-edges": "Transparent edges",
    "/svg-fade-out-gradient-generator": "Fade-out generator",
    "/transparent-to-color-gradient-svg-code": "Transparent-to-color code",
    "/convert-css-linear-gradient-to-svg": "CSS to SVG",
    "/transform-css-gradient-to-svg-code": "Transform CSS",
    "/css-to-svg-gradient-generator": "CSS generator",
    "/export-css-gradient-as-svg": "Export CSS as SVG",
    "/simplify-svg-path-data-online": "Simplify path",
    "/reduce-svg-path-nodes-online": "Reduce nodes",
    "/compress-svg-path-data": "Compress path",
    "/remove-redundant-svg-path-points": "Remove extra points",
    "/reverse-svg-path-direction": "Reverse path direction",
    "/change-svg-path-winding-order": "Change winding",
    "/round-svg-path-decimals-online": "Round decimals",
    "/truncate-svg-path-numbers-online": "Truncate numbers",
    "/convert-svg-absolute-to-relative-path-commands": "Absolute → relative",
    "/convert-svg-relative-to-absolute-path-commands": "Relative → absolute",
    "/change-svg-path-commands-to-lowercase-relative": "Lowercase relative",
}


FALLBACK_GUIDES = {
    "round": ["/simplify-svg-path-data-online", "/compress-svg-path-data"],
    "reverse": ["/reverse-svg-path-direction", "/change-svg-path-winding-order", "/simplify-svg-path-data-online"],
    "extract": ["/extract-svg-gradient-stops", "/svg-gradient-color-picker-from-code"],
}


def cluster_guides(cluster, slug):
    hrefs = [h for h in CLUSTERS[cluster] if h != f"/{slug}"]
    for h in FALLBACK_GUIDES.get(cluster, []):
        if h != f"/{slug}" and h not in hrefs:
            hrefs.append(h)
    return guides([(h, LABEL[h]) for h in hrefs[:4]])


def cluster_note(cluster, slug):
    hrefs = [h for h in CLUSTERS[cluster] if h != f"/{slug}"]
    for h in FALLBACK_GUIDES.get(cluster, []):
        if h != f"/{slug}" and h not in hrefs:
            hrefs.append(h)
    if len(hrefs) < 2:
        raise ValueError(f"cluster_note needs 2 links for {cluster}/{slug}, got {hrefs}")
    a, b = hrefs[0], hrefs[1]
    return note(a, LABEL[a], b, LABEL[b])


def page(family, cluster, slug, title, description, h1, crumb, sub, og_alt, app_name, app_alts, app_desc, features, howto_name, howto_desc, howto_click, btn, btn_title, faqs, empty, factor_input=None):
    return {
        "family": family,
        "cluster": cluster,
        "slug": slug,
        "title": title,
        "description": description,
        "h1": h1,
        "crumb": crumb,
        "sub": sub,
        "og_alt": og_alt,
        "app_name": app_name,
        "app_alts": app_alts,
        "app_desc": app_desc,
        "features": features,
        "howto_name": howto_name,
        "howto_desc": howto_desc,
        "howto_click": howto_click,
        "btn": btn,
        "btn_title": btn_title,
        "faq_aria": f"{h1} FAQ",
        "faqs": faqs,
        "note_html": cluster_note(cluster, slug),
        "guides": cluster_guides(cluster, slug),
        "empty": empty,
        "factor_input": factor_input,
    }


PAGES = [
    page(
        "gradient", "invert", "invert-svg-gradient-colors",
        "Invert SVG Gradient Colors Online — Free Tool | getsvgeditor.com",
        "Invert SVG gradient colors online. Reverse, flip, or swap the stop-color sequence while offsets stay put — free live preview, no upload.",
        "Invert SVG Gradient Colors", "Invert gradient colors",
        "Reverse the <code>stop-color</code> sequence — first hue moves to the last offset, last to the first. Reverse, flip, and swap mean the same action here",
        "Invert SVG gradient colors in SVGEditor",
        "Invert SVG Gradient Colors",
        ["Invert SVG gradient colors", "Reverse SVG gradient colors", "Flip SVG gradient colors", "Swap SVG gradient colors"],
        "Free online tool to invert SVG gradient color order. Paste linearGradient or radialGradient markup and reverse the palette without moving offsets.",
        ["Reverses stop-color order", "Offsets and extra attrs stay", "Same result as reverse, flip, or swap", "No upload"],
        "Invert SVG gradient colors",
        "Reverse the color list on existing gradient stops.",
        "Click Invert colors. Offsets stay; colors are assigned from last to first.",
        "Invert colors", "Invert the gradient color sequence",
        [
            ("How do I invert SVG gradient colors online?", "Paste or use the sample, then click Invert colors. The first stop keeps its offset but receives the last color. Reverse, flip, and swap search terms land on this same tool."),
            ("Does invert SVG gradient colors change direction?", "No. Only stop-color values move. Use Invert SVG Gradient Direction to reverse x1/x2, radial focus, or gradientTransform."),
            ("How is invert colors different from reverse stops?", "Invert colors rewrites stop-color only. Reverse SVG Gradient Stops reorders the <stop> elements themselves, including offset, opacity, and extra attributes."),
            ("Is the inverted gradient still valid SVG?", "Yes. The tool rewrites stop-color values only and strips root width/height so viewBox stays the source of truth."),
        ],
        "Paste a multi-stop gradient. Click Invert colors to reverse the palette.",
    ),
    page(
        "gradient", "invert", "invert-svg-gradient-direction",
        "Invert SVG Gradient Direction Online — Free Tool | getsvgeditor.com",
        "Invert SVG gradient direction online. Swap the gradient axis (x1/x2, y1/y2) without touching colors — free, live preview, no upload.",
        "Invert SVG Gradient Direction", "Invert gradient direction",
        "Swap the gradient vector — left-to-right becomes right-to-left, without rewriting colors",
        "Invert SVG gradient direction in SVGEditor",
        "Invert SVG Gradient Direction",
        ["Invert SVG gradient direction", "Reverse SVG gradient axis", "Flip linearGradient x1 x2", "Invert radial gradient focus"],
        "Free online tool to invert SVG gradient direction. Swap the axis of linearGradient or the focus of radialGradient.",
        ["Swaps linear x1/x2 and y1/y2", "Swaps radial fx/fy with cx/cy", "Appends rotate(180) to gradientTransform", "Does not change stops"],
        "Invert SVG gradient direction",
        "Reverse the gradient axis while keeping the same stop colors.",
        "Click Invert direction. The gradient vector flips and the fade runs the other way.",
        "Invert direction", "Invert the gradient axis",
        [
            ("How do I invert SVG gradient direction?", "Paste a gradient SVG and click Invert direction. linearGradient swaps its endpoints; radialGradient swaps focus and center. An existing gradientTransform gets rotate(180) appended. Stops are not rewritten."),
            ("Do stop offsets change when I invert direction?", "No. Offsets stay. The paint line runs the opposite way, which looks like a reversed fade."),
            ("Need to reverse the color list instead?", "Open Invert SVG Gradient Colors to reorder stop-color values, or Reverse SVG Gradient Stops to move the stop elements."),
            ("Can I invert a radial gradient too?", "Yes. Focus (fx, fy) and center (cx, cy) are swapped so the highlight moves."),
        ],
        "Paste a left-to-right gradient. Click Invert direction to flip the axis.",
    ),
    page(
        "gradient", "invert", "reverse-svg-gradient-stops",
        "Reverse SVG Gradient Stops Online — Free Tool | getsvgeditor.com",
        "Reverse SVG gradient stops online. Flip stop order including offsets — free, in your browser, no upload.",
        "Reverse SVG Gradient Stops", "Reverse gradient stops",
        "Reverse the <code>&lt;stop&gt;</code> elements themselves — offset, stop-color, stop-opacity, extra attributes, and source order",
        "Reverse SVG gradient stops in SVGEditor",
        "Reverse SVG Gradient Stops",
        ["Reverse SVG gradient stops", "Reorder SVG stop elements", "Reverse stop-opacity list", "Flip gradient stop markup"],
        "Free online tool to reverse SVG gradient stop elements, including offsets, opacity, and extra attributes.",
        ["Reorders stop elements in the markup", "Offsets travel, then remapped to slots", "Keeps stop-opacity and extra attrs", "Does not change x1/x2"],
        "Reverse SVG gradient stops",
        "Move the <stop> nodes so the fade is mirrored and the source order is reversed.",
        "Click Reverse stops. Each stop element moves, carrying color, opacity, and extra attributes; offsets are remapped to the original slots.",
        "Reverse stops", "Reverse gradient stop elements",
        [
            ("How do I reverse SVG gradient stops?", "Click Reverse stops. The last <stop> node moves to the first slot, taking stop-color, stop-opacity, and extra attributes with it."),
            ("What happens to uneven offsets like 28%?", "The stop element moves. Offsets are then remapped to the original slots so a 28% stop lands in the complementary position."),
            ("Want to keep percentages and only move colors?", "Use Invert SVG Gradient Colors. That rewrites stop-color only."),
            ("Does reversing stops invert x1/x2?", "No. The vector and gradientTransform stay. Combine with Invert SVG Gradient Direction if you need geometry."),
        ],
        "Paste a gradient with uneven offsets. Click Reverse stops to reverse the stop elements.",
    ),
    page(
        "gradient", "extract", "extract-colors-from-svg-gradient",
        "Extract Colors from SVG Gradient Online — Free Tool | getsvgeditor.com",
        "Extract colors from an SVG gradient online. Copy unique stop-color hex values and see swatches — free, no upload.",
        "Extract Colors from SVG Gradient", "Extract gradient colors",
        "Read every <code>stop-color</code>, copy the unique hex list, and show swatches on the preview",
        "Extract colors from SVG gradient in SVGEditor",
        "Extract Colors from SVG Gradient",
        ["Extract colors from SVG gradient", "Get colors from SVG gradient", "Parse SVG gradient colors", "Copy SVG gradient hex"],
        "Free online tool to extract colors from SVG gradients. Copies unique stop-color values and draws swatches.",
        ["Copies unique hex colors", "Adds preview swatches", "Linear and radial", "No upload"],
        "Extract colors from an SVG gradient",
        "Collect unique stop-color values and copy them to the clipboard.",
        "Click Extract colors. Unique colors are copied and a swatch row is added to the SVG.",
        "Extract colors", "Extract unique gradient colors",
        [
            ("How do I extract colors from an SVG gradient?", "Click Extract colors. Unique stop-color values are copied as a list and drawn as swatches."),
            ("Are duplicate stops listed twice?", "No. The clipboard list is unique. Get colors / parse colors searches land here; use Extract SVG Gradient Stops if you need every offset."),
            ("Does extraction change the fill?", "The gradient stays. A small swatch row is appended so you can see the palette."),
            ("Can I extract from radialGradient?", "Yes. Any linearGradient or radialGradient in defs is scanned."),
        ],
        "Paste a gradient SVG. Click Extract colors to copy the palette.",
    ),
    page(
        "gradient", "extract", "svg-gradient-color-picker-from-code",
        "SVG Gradient Color Picker from Code — Free Tool | getsvgeditor.com",
        "Pick colors from SVG gradient code online. Read stop-color values from markup and show swatches — free, no upload.",
        "SVG Gradient Color Picker from Code", "Gradient color picker",
        "Treat the source as a <strong>color picker</strong> — click once to lift hex values from the markup",
        "SVG gradient color picker from code in SVGEditor",
        "SVG Gradient Color Picker from Code",
        ["SVG gradient color picker from code", "Pick colors from SVG markup", "Hex picker for linearGradient", "Read gradient colors from code"],
        "Free online SVG gradient color picker. Reads stop-color from code and copies the palette.",
        ["Picks colors from markup", "No eyedropper plugin", "Copies hex list", "Live swatches"],
        "Pick colors from SVG gradient code",
        "Use the source panel as a color picker for gradient stops.",
        "Click Pick colors. Hex values from the code are copied and shown as swatches.",
        "Pick colors", "Pick colors from gradient code",
        [
            ("How does the SVG gradient color picker from code work?", "It reads stop-color attributes in the source — not pixels — then copies hex values."),
            ("Do I need to select a stop in the preview?", "No. One click scans all gradients in the markup."),
            ("Can I pick from a path filled with url(#pick)?", "Yes. The defs gradient behind that fill is what gets read."),
            ("Want a visual fade instead of a list?", "Keep the preview open; swatches sit on the graphic after you pick."),
        ],
        "Paste gradient markup. Click Pick colors to lift hex values from the code.",
    ),
    page(
        "gradient", "extract", "extract-svg-gradient-stops",
        "Extract SVG Gradient Stops Online — Free Tool | getsvgeditor.com",
        "Extract SVG gradient stops online. Copy every offset, color, and opacity — free table from your markup, no upload.",
        "Extract SVG Gradient Stops", "Extract gradient stops",
        "Export the full stop list — not just unique hues — including repeated colors at different offsets",
        "Extract SVG gradient stops in SVGEditor",
        "Extract SVG Gradient Stops",
        ["Extract SVG gradient stops", "Copy SVG stop list", "Export linearGradient stops", "SVG gradient stop table"],
        "Free online tool to extract SVG gradient stops as a complete offset/color/opacity list.",
        ["Every stop, not just unique colors", "Includes gradient id", "Copies the table", "No upload"],
        "Extract SVG gradient stops",
        "Copy the complete stop list for hand-off to CSS or another SVG.",
        "Click Extract stops. All stops are copied as offset / color / opacity rows.",
        "Extract stops", "Extract the full gradient stop list",
        [
            ("How do I extract SVG gradient stops?", "Click Extract stops. Every stop is copied with offset, color, opacity, and id."),
            ("Why not just extract unique colors?", "Design tokens often need the 35% / 68% positions, not only the hex set."),
            ("Does extract stops rewrite the gradient?", "Only a swatch legend is added. Stop markup is unchanged."),
            ("Can I extract four-stop rainbows?", "Yes. All four (or more) rows appear in the copied table."),
        ],
        "Paste a multi-stop gradient. Click Extract stops to copy every row.",
    ),
    page(
        "gradient", "fade", "svg-gradient-fill-transparent-to-color",
        "SVG Gradient Fill Transparent to Color — Free Tool | getsvgeditor.com",
        "Make an SVG gradient fill from transparent to color online. Apply a fade-in fill with live preview — free, no upload.",
        "SVG Gradient Fill Transparent to Color", "Transparent to color",
        "Build a fill that starts <strong>transparent</strong> and ends on a solid color",
        "SVG gradient fill transparent to color in SVGEditor",
        "SVG Gradient Fill Transparent to Color",
        ["SVG gradient fill transparent to color", "Fade in SVG fill", "Transparent start linearGradient", "SVG opacity 0 to 1 fill"],
        "Free online tool to apply an SVG gradient fill from transparent to a solid color.",
        ["0 → 1 stop-opacity", "Paints shapes with the new fill", "Live preview", "No upload"],
        "Apply a transparent-to-color SVG gradient fill",
        "Replace the current fill with a linear fade from clear to a color.",
        "Click Fade in. A linearGradient from transparent to color is attached to shapes.",
        "Fade in", "Apply transparent-to-color gradient fill",
        [
            ("How do I make an SVG gradient fill transparent to color?", "Click Fade in. A linearGradient with stop-opacity 0 then 1 is applied as the fill."),
            ("Will the checkerboard preview show the fade?", "Yes. Use the transparent canvas so the incoming color is obvious."),
            ("Need the opposite fade?", "Open SVG Linear Gradient Fade to Transparent."),
            ("Can I copy CSS for this fill?", "Use Transparent to Color Gradient SVG Code to copy a CSS snippet too."),
        ],
        "Paste a solid shape. Click Fade in for a transparent-to-color fill.",
    ),
    page(
        "gradient", "fade", "svg-linear-gradient-fade-to-transparent",
        "SVG Linear Gradient Fade to Transparent — Free Tool | getsvgeditor.com",
        "Create an SVG linear gradient that fades to transparent online. Soften the trailing edge of a fill — free, no upload.",
        "SVG Linear Gradient Fade to Transparent", "Fade to transparent",
        "Apply a linear fade that starts solid and <strong>ends transparent</strong>",
        "SVG linear gradient fade to transparent in SVGEditor",
        "SVG Linear Gradient Fade to Transparent",
        ["SVG linear gradient fade to transparent", "Dissolve SVG fill", "linearGradient to alpha 0", "SVG fade out fill"],
        "Free online tool to apply an SVG linear gradient that fades to transparent.",
        ["Solid to transparent stops", "linearGradient only", "Live preview", "No upload"],
        "Fade an SVG linear gradient to transparent",
        "Attach a left-to-right fade that ends at stop-opacity 0.",
        "Click Fade out. Shapes receive a linearGradient that dissolves to transparent.",
        "Fade out", "Apply a fade-to-transparent linear gradient",
        [
            ("How do I make an SVG linear gradient fade to transparent?", "Click Fade out. The last stop uses stop-opacity 0 so the fill dissolves."),
            ("Is this a mask or a gradient?", "A gradient. No mask element is added — only defs + fill=url(#...)."),
            ("Need both edges clear?", "Use SVG Gradient Transparent Edges."),
            ("Does fade to transparent work on text?", "Yes if the file has a text or shape target. The sample uses a rect."),
        ],
        "Paste a solid bar. Click Fade out to dissolve the trailing edge.",
    ),
    page(
        "gradient", "fade", "svg-gradient-transparent-edges",
        "SVG Gradient Transparent Edges Online — Free Tool | getsvgeditor.com",
        "Make an SVG gradient with transparent edges online. Soften both sides of a fill — free live preview, no upload.",
        "SVG Gradient Transparent Edges", "Transparent edges",
        "Fade <strong>both edges</strong> to transparent and keep the middle opaque",
        "SVG gradient transparent edges in SVGEditor",
        "SVG Gradient Transparent Edges",
        ["SVG gradient transparent edges", "Soft edge SVG fill", "Vignette linearGradient", "Transparent sides SVG bar"],
        "Free online tool to apply an SVG gradient with transparent edges and a solid center.",
        ["Opacity 0 / 1 / 0", "Softens both sides", "Live preview", "No upload"],
        "Apply transparent edges to an SVG gradient",
        "Create a three-stop fade that is clear on both ends.",
        "Click Soft edges. Stops at 0% and 100% are transparent; 50% is solid.",
        "Soft edges", "Apply transparent gradient edges",
        [
            ("How do I make SVG gradient transparent edges?", "Click Soft edges. The fill is clear at both ends and solid in the middle."),
            ("Is this the same as a CSS vignette?", "Similar look, SVG stops. You can copy the markup into any icon or banner."),
            ("Can I keep one edge solid?", "Use Fade in or Fade out instead of both-edge softening."),
            ("Will transparent edges show on a white PNG export?", "Yes — edges become the PNG background. Preview on checkerboard first."),
        ],
        "Paste a solid bar. Click Soft edges to clear both sides.",
    ),
    page(
        "gradient", "fade", "svg-fade-out-gradient-generator",
        "SVG Fade Out Gradient Generator — Free Tool | getsvgeditor.com",
        "Generate an SVG fade-out gradient online. Multi-stop dissolve from color to transparent — free, no upload.",
        "SVG Fade Out Gradient Generator", "Fade-out generator",
        "Generate a <strong>multi-stop</strong> fade-out — solid, mid opacity, then clear",
        "SVG fade out gradient generator in SVGEditor",
        "SVG Fade Out Gradient Generator",
        ["SVG fade out gradient generator", "Generate SVG dissolve", "Three-stop fade out SVG", "Online SVG fade generator"],
        "Free online SVG fade-out gradient generator. Builds a multi-stop dissolve you can download.",
        ["Three-stop fade-out", "Generated defs + fill", "Live preview", "No upload"],
        "Generate an SVG fade-out gradient",
        "Create a longer dissolve than a two-stop fade.",
        "Click Generate fade-out. A mid-stop at ~55% eases the dissolve.",
        "Generate fade-out", "Generate a multi-stop fade-out gradient",
        [
            ("How does the SVG fade out gradient generator work?", "Click Generate fade-out. A three-stop linearGradient eases from opaque to clear."),
            ("Why three stops instead of two?", "A mid opacity stop looks less abrupt than a two-stop linear drop."),
            ("Can I generate fade-out on my own icon?", "Yes. Paste any SVG with a shape; the fill is replaced."),
            ("Need CSS output too?", "Generate here, then copy Source — or use the transparent-to-color code page."),
        ],
        "Paste a shape. Click Generate fade-out for a multi-stop dissolve.",
    ),
    page(
        "gradient", "fade", "transparent-to-color-gradient-svg-code",
        "Transparent to Color Gradient SVG Code — Free Tool | getsvgeditor.com",
        "Get transparent-to-color gradient SVG code online. Apply the fade and copy CSS — free, in your browser.",
        "Transparent to Color Gradient SVG Code", "Transparent-to-color code",
        "Apply the fade and <strong>copy CSS</strong> plus ready SVG markup",
        "Transparent to color gradient SVG code in SVGEditor",
        "Transparent to Color Gradient SVG Code",
        ["Transparent to color gradient SVG code", "Copy SVG fade CSS", "transparent linear-gradient SVG", "SVG code for alpha fade"],
        "Free online tool to generate transparent-to-color gradient SVG code and copy a CSS snippet.",
        ["Writes SVG gradient markup", "Copies CSS linear-gradient", "Live preview", "No upload"],
        "Get transparent-to-color gradient SVG code",
        "Apply the fade and copy a CSS companion snippet.",
        "Click Apply + copy CSS. The SVG updates and a CSS linear-gradient with transparent is copied.",
        "Apply + copy CSS", "Apply fade and copy CSS snippet",
        [
            ("How do I get transparent to color gradient SVG code?", "Click Apply + copy CSS. Source holds the SVG; the clipboard gets a CSS linear-gradient."),
            ("Is the CSS identical to the SVG?", "It is a companion snippet (transparent, then the color). Tweak angle in CSS if needed."),
            ("Can I paste this into a React component?", "Yes. Copy the SVG from Source or export the React tab."),
            ("Want only the SVG, no CSS?", "Use SVG Gradient Fill Transparent to Color."),
        ],
        "Paste a shape. Click Apply + copy CSS for markup plus a CSS snippet.",
    ),
    page(
        "gradient", "css", "convert-css-linear-gradient-to-svg",
        "Convert CSS Linear Gradient to SVG Online — Free Tool | getsvgeditor.com",
        "Convert a CSS linear-gradient to SVG online. Paste CSS, get linearGradient markup and a preview — free, no upload.",
        "Convert CSS Linear Gradient to SVG", "CSS linear to SVG",
        "Paste <code>linear-gradient(...)</code> and get a real <strong>SVG linearGradient</strong>",
        "Convert CSS linear gradient to SVG in SVGEditor",
        "Convert CSS Linear Gradient to SVG",
        ["Convert CSS linear gradient to SVG", "CSS linear gradient to SVG converter", "CSS linear-gradient to linearGradient", "Paste CSS get SVG"],
        "Free online converter from CSS linear-gradient() to SVG linearGradient markup.",
        ["Parses linear-gradient()", "Builds viewBox SVG (no width/height)", "Maps deg and to-right", "No upload"],
        "Convert a CSS linear gradient to SVG",
        "Turn a CSS linear-gradient() string into SVG defs and a preview rect.",
        "Click Convert to SVG. The CSS function is parsed and written as linearGradient stops.",
        "Convert to SVG", "Convert CSS linear-gradient to SVG",
        [
            ("How do I convert a CSS linear gradient to SVG?", "Keep the sample comment or paste linear-gradient(...) and click Convert to SVG."),
            ("Are CSS color stops supported?", "Hex and rgb-like tokens in the function are copied onto SVG stops. Angle or to right/left/top/bottom is mapped."),
            ("Does the output include width and height on the root?", "No. Only viewBox, so the graphic scales cleanly."),
            ("Looking for a CSS linear gradient to SVG converter?", "This is that converter — convert and converter queries share this page."),
        ],
        "Paste CSS linear-gradient() (see the sample comment). Click Convert to SVG.",
    ),
    page(
        "gradient", "css", "transform-css-gradient-to-svg-code",
        "Transform CSS Gradient to SVG Code — Free Tool | getsvgeditor.com",
        "Transform a CSS gradient to SVG code online. Output downloadable linearGradient markup — free, copies the SVG.",
        "Transform CSS Gradient to SVG Code", "Transform CSS to SVG",
        "Transform CSS <code>to right</code> gradients into copy-ready SVG source",
        "Transform CSS gradient to SVG code in SVGEditor",
        "Transform CSS Gradient to SVG Code",
        ["Transform CSS gradient to SVG code", "to right CSS to SVG", "CSS gradient transform SVG", "Copy SVG from CSS gradient"],
        "Free online tool to transform a CSS gradient into SVG code and copy the markup.",
        ["Supports to right syntax", "Copies full SVG", "Preview rect", "No upload"],
        "Transform a CSS gradient to SVG code",
        "Emit SVG markup from a CSS gradient and copy it.",
        "Click Transform + copy. The SVG is written and the full document is copied.",
        "Transform + copy", "Transform CSS gradient and copy SVG",
        [
            ("How do I transform a CSS gradient to SVG code?", "Click Transform + copy. The CSS function becomes a complete SVG document on the clipboard."),
            ("Does to right work?", "Yes. to right maps to a horizontal SVG vector."),
            ("What is copied — CSS or SVG?", "The SVG document, ready to paste into a file or component."),
            ("Can I transform a three-color CSS fade?", "Yes. Each color becomes a stop."),
        ],
        "Paste to-right CSS (see the sample). Click Transform + copy.",
    ),
    page(
        "gradient", "css", "css-to-svg-gradient-generator",
        "CSS to SVG Gradient Generator — Free Tool | getsvgeditor.com",
        "Generate an SVG gradient from CSS online. Multi-stop linear-gradient() to SVG — free live preview, no upload.",
        "CSS to SVG Gradient Generator", "CSS → SVG generator",
        "Generate SVG from a <strong>multi-stop</strong> CSS linear-gradient()",
        "CSS to SVG gradient generator in SVGEditor",
        "CSS to SVG Gradient Generator",
        ["CSS to SVG gradient generator", "Generate SVG from CSS stops", "Multi-stop CSS to SVG", "CSS gradient generator SVG"],
        "Free CSS to SVG gradient generator for multi-stop linear-gradient() strings.",
        ["Multi-stop CSS input", "Generated SVG preview", "Evenly spaced stops", "No upload"],
        "Generate an SVG gradient from CSS",
        "Build an SVG document from a CSS multi-stop gradient.",
        "Click Generate SVG. Colors from the CSS function become evenly spaced SVG stops.",
        "Generate SVG", "Generate SVG from CSS gradient",
        [
            ("How do I use the CSS to SVG gradient generator?", "Paste linear-gradient() with two or more colors, then click Generate SVG."),
            ("Are stops spaced evenly?", "Yes, unless you later edit offsets in Source."),
            ("Can I generate from 45deg CSS?", "Yes. The angle is mapped onto the SVG vector."),
            ("Does the generator keep my original SVG artwork?", "It writes a clean preview rect so the CSS fade is obvious. Paste your own CSS anytime."),
        ],
        "Paste a multi-stop CSS gradient. Click Generate SVG.",
    ),
    page(
        "gradient", "css", "export-css-gradient-as-svg",
        "Export CSS Gradient as SVG Online — Free Tool | getsvgeditor.com",
        "Export a CSS gradient as SVG online. Download-ready markup from linear-gradient() — free, copies SVG, no upload.",
        "Export CSS Gradient as SVG", "Export CSS as SVG",
        "Export CSS <code>linear-gradient()</code> as a downloadable SVG file",
        "Export CSS gradient as SVG in SVGEditor",
        "Export CSS Gradient as SVG",
        ["Export CSS gradient as SVG", "Download CSS gradient SVG", "CSS linear-gradient export SVG", "Save CSS fade as SVG"],
        "Free online tool to export a CSS gradient as SVG and copy the document.",
        ["Writes a complete SVG", "Copies markup for download", "Maps 180deg fades", "No upload"],
        "Export a CSS gradient as SVG",
        "Turn CSS into an SVG you can download from the editor.",
        "Click Export SVG. Markup is generated and copied; use Download for a file.",
        "Export SVG", "Export CSS gradient as SVG markup",
        [
            ("How do I export a CSS gradient as SVG?", "Click Export SVG, then Download in the toolbar. The clipboard also gets the SVG."),
            ("Will 180deg export top-to-bottom?", "The angle is mapped to the SVG vector so a 180deg CSS fade reads as a vertical SVG gradient."),
            ("Can I export after editing stops?", "Export first, then tweak Source and download again."),
            ("Is export uploaded anywhere?", "No. Generation and download stay in the browser."),
        ],
        "Paste CSS (sample uses 180deg). Click Export SVG, then Download.",
    ),
    page(
        "path", "simplify", "simplify-svg-path-data-online",
        "Simplify SVG Path Data Online — Free Tool | getsvgeditor.com",
        "Simplify SVG path data online. Reduce noisy polylines with a tolerance and live preview — free, no upload.",
        "Simplify SVG Path Data Online", "Simplify path data",
        "Reduce a noisy polyline with Douglas–Peucker — set tolerance, keep the silhouette",
        "Simplify SVG path data online in SVGEditor",
        "Simplify SVG Path Data Online",
        ["Simplify SVG path data online", "Optimize SVG path data", "Douglas Peucker SVG path", "Online SVG path simplifier"],
        "Free online tool to simplify SVG path data. Samples the path and drops points inside the tolerance.",
        ["Tolerance input", "Fewer nodes", "Live preview", "No upload"],
        "Simplify SVG path data online",
        "Sample the path and drop points that sit close to the simplified polyline.",
        "Set tolerance if needed, then click Simplify. Extra nodes disappear; the shape stays close.",
        "Simplify", "Simplify the path data",
        [
            ("How do I simplify SVG path data online?", "Paste a path, set Tol, click Simplify. Points within the tolerance of the simplified line are removed."),
            ("Will curves stay cubic?", "Simplification samples the rendered path and rewrites a polyline. Fine for noisy traces; keep a copy if you need C commands."),
            ("What tolerance should I start with?", "2px on the sample. Raise it to drop more nodes; lower it to stay closer."),
            ("Looking for optimize SVG path data?", "Same tool — optimize and simplify queries share this page. For near-duplicates only, use Remove Redundant SVG Path Points."),
        ],
        "Paste a noisy polyline. Click Simplify to drop extra nodes.",
        {"label": "Tol", "default": "2", "unit": "px", "aria": "Simplify tolerance in px"},
    ),
    page(
        "path", "simplify", "reduce-svg-path-nodes-online",
        "Reduce SVG Path Nodes Online — Free Tool | getsvgeditor.com",
        "Reduce SVG path nodes online. Cut point count on a long polyline — free, tolerance control, no upload.",
        "Reduce SVG Path Nodes Online", "Reduce path nodes",
        "Cut the point count on a long <code>L</code> chain without redrawing by hand",
        "Reduce SVG path nodes online in SVGEditor",
        "Reduce SVG Path Nodes Online",
        ["Reduce SVG path nodes online", "Fewer SVG path points", "Cut path node count", "Thin SVG polyline"],
        "Free online tool to reduce SVG path nodes on long polylines.",
        ["Cuts node count", "Editable tolerance", "Live preview", "No upload"],
        "Reduce SVG path nodes online",
        "Thin a long L-command chain.",
        "Click Reduce nodes. The polyline is simplified to fewer corners.",
        "Reduce nodes", "Reduce the number of path nodes",
        [
            ("How do I reduce SVG path nodes online?", "Set Tol and click Reduce nodes. Nearby colinear samples collapse."),
            ("Will reduce nodes close an open path?", "No. Open polylines stay open."),
            ("What if I reduce too far?", "Undo in the editor or lower Tol and run again on the original paste."),
            ("Need integer coordinates after reducing?", "Follow up with Round SVG Path Decimals Online (set Dec to 0)."),
        ],
        "Paste a many-node polyline. Click Reduce nodes.",
        {"label": "Tol", "default": "3", "unit": "px", "aria": "Node reduction tolerance"},
    ),
    page(
        "path", "simplify", "compress-svg-path-data",
        "Compress SVG Path Data Online — Free Tool | getsvgeditor.com",
        "Compress SVG path data online. Rewrite a verbose path into fewer nodes — free, in your browser, no upload.",
        "Compress SVG Path Data", "Compress path data",
        "Rewrite a verbose path into a lighter <code>d</code> string",
        "Compress SVG path data in SVGEditor",
        "Compress SVG Path Data",
        ["Compress SVG path data", "Shorter SVG path d", "Compact path commands", "Compress polyline SVG"],
        "Free online tool to compress SVG path data by simplifying the geometry.",
        ["Shorter d strings", "Tolerance control", "Live preview", "No upload"],
        "Compress SVG path data",
        "Produce a lighter path string from a verbose polyline.",
        "Click Compress. The path is resampled and shortened.",
        "Compress", "Compress the path data",
        [
            ("How do I compress SVG path data?", "Click Compress. Extra geometry is dropped so the d attribute shrinks."),
            ("Is this gzip?", "No. It is a geometric compress — fewer commands — not HTTP compression."),
            ("Will compress break fill-rule holes?", "It rewrites each path separately. Complex compound holes may need a lighter tolerance."),
            ("Want smaller files overall?", "Run Optimize SVG File after you like the path."),
        ],
        "Paste a verbose path. Click Compress to shorten d.",
        {"label": "Tol", "default": "2", "unit": "px", "aria": "Compress tolerance"},
    ),
    page(
        "path", "simplify", "remove-redundant-svg-path-points",
        "Remove Redundant SVG Path Points Online — Free Tool | getsvgeditor.com",
        "Remove redundant SVG path points online. Drop zero-length segments and stacked vertices — free, no upload.",
        "Remove Redundant SVG Path Points", "Remove extra points",
        "Drop zero-length segments and stacked vertices from <code>d</code>",
        "Remove redundant SVG path points in SVGEditor",
        "Remove Redundant SVG Path Points",
        ["Remove redundant SVG path points", "Clean up SVG path coordinates", "Drop zero-length path segments", "Remove stacked SVG vertices"],
        "Free online tool to remove redundant SVG path points and zero-length segments.",
        ["Drops L to the same point", "Keeps meaningful corners", "Live preview", "No upload"],
        "Remove redundant SVG path points",
        "Delete vertices that do not move the pen.",
        "Click Remove extras. Repeated coordinates are stripped from the path.",
        "Remove extras", "Remove redundant path points",
        [
            ("How do I remove redundant SVG path points?", "Click Remove extras. Segments shorter than ε are omitted."),
            ("What counts as redundant?", "An L command that lands on (almost) the same point as the previous command."),
            ("Will Z still close the path?", "Yes. Closepath commands are not treated as duplicates."),
            ("Clean up path coordinates?", "Same intent — clean-up / near-duplicate queries land here. Then simplify if you still need fewer nodes."),
        ],
        "Paste a path with stacked vertices. Click Remove extras.",
        {"label": "ε", "default": "0.2", "unit": "px", "aria": "Redundant-point epsilon"},
    ),
    page(
        "path", "reverse", "reverse-svg-path-direction",
        "Reverse SVG Path Direction Online — Free Tool | getsvgeditor.com",
        "Reverse SVG path direction online. Turn a chevron’s drawing order around — free, in your browser, no upload.",
        "Reverse SVG Path Direction", "Reverse path direction",
        "Turn a chevron’s drawing order around — start becomes end",
        "Reverse SVG path direction in SVGEditor",
        "Reverse SVG Path Direction",
        ["Reverse SVG path direction", "Invert SVG path direction", "Flip SVG path direction online", "Reverse SVG path node order"],
        "Free online tool to reverse SVG path direction on open strokes.",
        ["Reverses open paths", "Keeps stroke attributes", "Live preview", "No upload"],
        "Reverse SVG path direction",
        "Rewrite an open path so it is drawn backwards.",
        "Click Reverse direction. The chevron is redrawn from the opposite end.",
        "Reverse direction", "Reverse the path direction",
        [
            ("How do I reverse SVG path direction?", "Click Reverse direction. Absolute commands are reversed and serialized back."),
            ("Is reverse different from invert or flip path direction?", "Same action. Invert, flip, and reverse node order all land on this tool."),
            ("Will stroke-linecap look different?", "Caps stay, but dashoffset and markers follow the new start."),
            ("Can I reverse only one path in a group?", "The tool reverses every path. Split the SVG first if you need one."),
        ],
        "Paste a chevron. Click Reverse direction to draw it backwards.",
    ),
    page(
        "path", "reverse", "change-svg-path-winding-order",
        "Change SVG Path Winding Order Online — Free Tool | getsvgeditor.com",
        "Change SVG path winding order online. Flip evenodd/nonzero fill by reversing the outline — free, no upload.",
        "Change SVG Path Winding Order", "Change winding order",
        "Flip outline winding — useful with <code>fill-rule</code> holes and evenodd",
        "Change SVG path winding order in SVGEditor",
        "Change SVG Path Winding Order",
        ["Change SVG path winding order", "SVG path clockwise counter clockwise converter", "CW to CCW SVG path", "Flip SVG fill winding"],
        "Free online tool to change SVG path winding order by reversing the outline.",
        ["Reverses closed outlines", "Helps evenodd holes", "Live preview", "No upload"],
        "Change SVG path winding order",
        "Reverse a closed path so winding (clockwise vs counter-clockwise) flips.",
        "Click Change winding. The diamond outline is reversed.",
        "Change winding", "Change the path winding order",
        [
            ("How do I change SVG path winding order?", "Click Change winding. The closed outline is reversed, which flips clockwise vs counter-clockwise."),
            ("Will fill-rule evenodd look different?", "If two subpaths rely on opposite winding, reversing one changes the hole. The sample is a single diamond."),
            ("Does this set fill-rule?", "No. It only rewrites d. Add fill-rule in Source if you need it."),
            ("Need a CW / CCW converter?", "Same action — clockwise/counter-clockwise queries land on this winding tool."),
        ],
        "Paste a closed shape. Click Change winding to flip orientation.",
    ),
    page(
        "path", "round", "round-svg-path-decimals-online",
        "Round SVG Path Decimals Online — Free Tool | getsvgeditor.com",
        "Round SVG path decimals online. Cut long floats in d to a chosen precision — free live preview, no upload.",
        "Round SVG Path Decimals Online", "Round path decimals",
        "Cut long floats in <code>d</code> to a chosen number of decimal places",
        "Round SVG path decimals online in SVGEditor",
        "Round SVG Path Decimals Online",
        ["Round SVG path decimals online", "Round SVG path coordinates precision", "Reduce SVG path decimal places", "Round SVG coordinate digits"],
        "Free online tool to round SVG path decimals to a chosen precision.",
        ["Editable decimal places", "Rewrites every number in d", "Live preview", "No upload"],
        "Round SVG path decimals online",
        "Shorten over-precise coordinates in path data.",
        "Set decimals, then click Round decimals. Numbers are rounded in place.",
        "Round decimals", "Round decimals in the path",
        [
            ("How do I round SVG path decimals online?", "Set Dec (default 2) and click Round decimals. Each number in d is rounded."),
            ("Will 2 decimals break a logo?", "Usually no. Drop to 1 or 0 only if you want a chunkier path."),
            ("Does rounding change viewBox?", "No. Root width/height are stripped; viewBox is left as-is."),
            ("Need truncate instead of round?", "Use Truncate SVG Path Numbers for a shorter default (1 decimal). Optimize/reduce/precision queries stay on this rounder."),
        ],
        "Paste a path with long floats. Click Round decimals.",
        {"label": "Dec", "default": "2", "unit": "d.p.", "aria": "Decimal places"},
    ),
    page(
        "path", "round", "truncate-svg-path-numbers-online",
        "Truncate SVG Path Numbers Online — Free Tool | getsvgeditor.com",
        "Truncate SVG path numbers online. Keep one decimal (or your value) — free, in your browser, no upload.",
        "Truncate SVG Path Numbers Online", "Truncate path numbers",
        "Keep a short fractional part — default <strong>1</strong> decimal place",
        "Truncate SVG path numbers online in SVGEditor",
        "Truncate SVG Path Numbers Online",
        ["Truncate SVG path numbers online", "Short SVG path numbers", "One decimal SVG path", "Truncate path floats"],
        "Free online tool to truncate SVG path numbers to a short fractional part.",
        ["Default 1 decimal", "Editable places", "Live preview", "No upload"],
        "Truncate SVG path numbers online",
        "Shorten fractional path numbers aggressively.",
        "Click Truncate. Numbers are rounded to one decimal by default.",
        "Truncate", "Truncate path numbers",
        [
            ("How do I truncate SVG path numbers online?", "Click Truncate. Default keeps one decimal place."),
            ("Is truncate the same as floor?", "It rounds to N places (standard rounding), then strips trailing zeros."),
            ("Why start at 1 place?", "This page is for aggressive shrinkage. Use 2–3 on the other rounding tools."),
            ("Will 1 place look stepped?", "On large viewBoxes, rarely. On tiny icons, preview first."),
        ],
        "Paste tiny fractions. Click Truncate to keep one decimal.",
        {"label": "Dec", "default": "1", "unit": "d.p.", "aria": "Places to keep when truncating"},
    ),
    page(
        "path", "absrel", "convert-svg-absolute-to-relative-path-commands",
        "Convert SVG Absolute to Relative Path Commands — Free Tool | getsvgeditor.com",
        "Convert SVG absolute path commands to relative online. M/L become m/l after the first move — free, no upload.",
        "Convert SVG Absolute to Relative Path Commands", "Absolute → relative",
        "Turn uppercase <code>M L C</code> into relative <code>m l c</code> after the first move",
        "Convert SVG absolute to relative path commands in SVGEditor",
        "Convert SVG Absolute to Relative Path Commands",
        ["Convert SVG absolute to relative path commands", "SVG path relative vs absolute converter", "SVG absolute to relative coordinates converter", "M L to m l converter"],
        "Free online converter from SVG absolute path commands to relative ones.",
        ["Keeps first M absolute", "Rest become relative", "Live preview", "No upload"],
        "Convert SVG absolute to relative path commands",
        "Rewrite a fully absolute path using relative letters.",
        "Click To relative. Coordinates after the first move become deltas.",
        "To relative", "Convert absolute commands to relative",
        [
            ("How do I convert SVG absolute to relative path commands?", "Click To relative. The first M stays; later commands use lowercase deltas."),
            ("Why keep the first M absolute?", "A rooted start plus relative steps is the usual hand-written style."),
            ("Does the preview move?", "No. Geometry is equivalent."),
            ("Absolute coordinates converter?", "Same conversion — abs→rel coordinates and transform queries use this page."),
        ],
        "Paste an absolute path. Click To relative.",
    ),
    page(
        "path", "absrel", "convert-svg-relative-to-absolute-path-commands",
        "Convert SVG Relative to Absolute Path Commands — Free Tool | getsvgeditor.com",
        "Convert SVG relative path commands to absolute online. Expand m/l deltas to M/L — free live preview, no upload.",
        "Convert SVG Relative to Absolute Path Commands", "Relative → absolute",
        "Expand lowercase <code>m l</code> deltas into uppercase user-space coordinates",
        "Convert SVG relative to absolute path commands in SVGEditor",
        "Convert SVG Relative to Absolute Path Commands",
        ["Convert SVG relative to absolute path commands", "Relative to absolute SVG path", "Expand m l to M L", "Absolute path converter"],
        "Free online converter from SVG relative path commands to absolute coordinates.",
        ["Expands deltas to user space", "Uppercase commands", "Live preview", "No upload"],
        "Convert SVG relative to absolute path commands",
        "Turn a relative path into absolute coordinates.",
        "Click To absolute. Every point is stored in user space.",
        "To absolute", "Convert relative commands to absolute",
        [
            ("How do I convert SVG relative to absolute path commands?", "Click To absolute. Lowercase deltas become uppercase coordinates."),
            ("Why convert to absolute?", "Easier to edit by hand and to compare with viewBox numbers."),
            ("Is z converted?", "Z/z both close the subpath; output uses Z."),
            ("Can I convert back?", "Yes — use Convert SVG Absolute to Relative Path Commands."),
        ],
        "Paste a relative path. Click To absolute.",
    ),
    page(
        "path", "absrel", "change-svg-path-commands-to-lowercase-relative",
        "Change SVG Path Commands to Lowercase Relative — Free Tool | getsvgeditor.com",
        "Change SVG path commands to lowercase relative online. Cubics become c/s — free live preview, no upload.",
        "Change SVG Path Commands to Lowercase Relative", "Lowercase relative",
        "Force lowercase relative commands on a cubic path",
        "Change SVG path commands to lowercase relative in SVGEditor",
        "Change SVG Path Commands to Lowercase Relative",
        ["Change SVG path commands to lowercase relative", "Lowercase relative SVG path", "C to c converter", "Relative cubics online"],
        "Free online tool to change SVG path commands to lowercase relative form.",
        ["Lowercase relative cubics", "First M kept", "Live preview", "No upload"],
        "Change SVG path commands to lowercase relative",
        "Rewrite uppercase cubics as relative c/s.",
        "Click To lowercase. The S-curve is stored with relative letters.",
        "To lowercase", "Change commands to lowercase relative",
        [
            ("How do I change SVG path commands to lowercase relative?", "Click To lowercase. After the first M, commands are relative and lowercase."),
            ("Is lowercase always relative?", "In SVG, yes — a vs A, c vs C."),
            ("Does Z become z?", "Yes on this rewrite."),
            ("Need absolute instead?", "Use Convert SVG Relative to Absolute Path Commands for the one-way expand."),
        ],
        "Paste an uppercase cubic. Click To lowercase.",
    ),
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


def guides_html(guide_list):
    return "\n".join(
        f'            <a class="tool-faq-guide" href="{href}">{esc(label)}</a>'
        for href, label in guide_list
    )


def action_button_html(p):
    btn_id = "btn-gradient-action" if p["family"] == "gradient" else "btn-path-edit-action"
    fi = p.get("factor_input")
    if fi:
        return f'''<div class="scale-path-factor-group">
              <label class="scale-path-factor-label" for="scale-path-factor-input">{esc(fi["label"])}</label>
              <input type="number" id="scale-path-factor-input" class="scale-path-factor-input" value="{esc(fi["default"])}" step="any" inputmode="decimal" aria-label="{esc(fi["aria"])}" />
              <span class="scale-path-factor-unit" aria-hidden="true">{esc(fi["unit"])}</span>
              <button type="button" class="btn btn-accent" id="{btn_id}" title="{esc(p["btn_title"])}">{esc(p["btn"])}</button>
            </div>'''
    return f'''<button
              type="button"
              class="btn btn-accent"
              id="{btn_id}"
              title="{esc(p["btn_title"])}"
            >
              {esc(p["btn"])}</button>'''


def build_page(p):
    text = template
    slug = p["slug"]
    url = f"https://getsvgeditor.com/{slug}"
    if p["family"] == "gradient":
        body = f'class="app-page tool-page gradient-tool-page" data-gradient-intent="{slug}" data-mobile-mode="preview" data-default-tab="preview"'
        hub = "/svg-gradient-generator"
        hub_label = "SVG gradient generator"
    else:
        body = f'class="app-page tool-page path-edit-tool-page" data-path-edit-intent="{slug}" data-mobile-mode="preview" data-default-tab="preview"'
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

    out = root / f"{slug}.html"
    out.write_text(text, encoding="utf-8")
    print("wrote", out.name)
    return out


def main():
    assert len(PAGES) == 26, len(PAGES)
    questions = [q for p in PAGES for q, _ in p["faqs"]]
    dups = [q for q in questions if questions.count(q) > 1]
    assert len(questions) == len(set(questions)), dups
    for p in PAGES:
        assert isinstance(p["faqs"][0], tuple), p["slug"]
        build_page(p)
    print("done", len(PAGES))


if __name__ == "__main__":
    main()
