#!/usr/bin/env python3
"""Generate svg-gradient-* tool pages from optimize-svg-file.html."""
from pathlib import Path
import re
import json

root = Path(__file__).resolve().parent.parent
template = (root / "optimize-svg-file.html").read_text(encoding="utf-8")

PAGES = [
  {
    "slug": "svg-gradient-generator",
    "title": "SVG Gradient Generator Online — Free Tool | getsvgeditor.com",
    "description": "Generate SVG gradients online. Paste markup, apply linear or radial fills with a live preview — free, in your browser, no upload.",
    "h1": "SVG Gradient Generator",
    "crumb": "SVG gradient generator",
    "sub": "Add <strong>linear or radial</strong> gradient fills to SVG shapes with one click",
    "og_alt": "SVG gradient generator in SVGEditor — live preview",
    "app_name": "SVG Gradient Generator",
    "app_alts": [
      "SVG gradient generator",
      "Generate SVG gradient",
      "SVG linear radial gradient",
      "Online SVG gradient tool",
    ],
    "app_desc": "Free online SVG gradient generator. Paste SVG, click Apply gradient, and preview linear or radial fills in the browser.",
    "features": [
      "Linear and radial gradient fills",
      "Live preview",
      "Editable source markup",
      "Runs entirely in the browser — no file upload",
    ],
    "howto_name": "Generate an SVG gradient",
    "howto_desc": "Paste SVG markup and apply a gradient fill with instant preview.",
    "howto_click": "Click Apply gradient. Gradient defs and fill references update and the preview refreshes.",
    "btn": "Apply gradient",
    "btn_title": "Apply a gradient fill to this SVG",
    "angle_input": False,
    "faq_aria": "SVG gradient generator FAQ",
    "faqs": [
      (
        "How do I generate an SVG gradient online?",
        "Paste or upload the SVG, then click Apply gradient. The tool inserts gradient defs and updates fill references with a live preview.",
      ),
      (
        "What types of SVG gradients does this tool support?",
        "Linear and radial gradients. Use SVG Linear Gradient Generator or multi-color pages for specialized presets.",
      ),
      (
        "Can I preview the gradient before downloading?",
        "Yes. The Output panel updates immediately after you click the action button.",
      ),
      (
        "Does gradient generation work without uploading files?",
        "Yes. Paste markup into Source or use the sample — everything runs locally in your browser.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Multi-color? <a href="/multi-color-svg-gradient-generator">Multi-color gradient</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Text? <a href="/svg-text-gradient-generator">SVG text gradient</a></span>',
    "guides": [
      ("/svg-linear-gradient-generator", "Linear gradient →"),
      ("/multi-color-svg-gradient-generator", "Multi-color gradient →"),
      ("/svg-text-gradient-generator", "Text gradient →"),
      ("/svg-gradient-angle-generator", "Gradient angle →"),
    ],
  },
  {
    "slug": "svg-linear-gradient-generator",
    "title": "SVG Linear Gradient Generator Online — Free Tool | getsvgeditor.com",
    "description": "Generate SVG linear gradients online. Apply top-to-bottom or angled linear fills with live preview — free, no upload.",
    "h1": "SVG Linear Gradient Generator",
    "crumb": "Linear gradient",
    "sub": "Create a <strong>linearGradient</strong> fill along a straight axis",
    "og_alt": "SVG linear gradient generator in SVGEditor",
    "app_name": "SVG Linear Gradient Generator",
    "app_alts": [
      "SVG linear gradient generator",
      "Linear gradient SVG",
      "SVG linearGradient tool",
      "Generate linear SVG fill",
    ],
    "app_desc": "Free online tool to generate SVG linear gradients. Paste SVG, apply a linear fill, and preview the result.",
    "features": [
      "linearGradient defs and fill refs",
      "Adjustable gradient direction",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Generate an SVG linear gradient",
    "howto_desc": "Apply a linear gradient fill to SVG shapes with instant preview.",
    "howto_click": "Click Apply linear gradient. A linearGradient definition is added and shapes pick up the new fill.",
    "btn": "Apply linear gradient",
    "btn_title": "Apply a linear gradient fill to this SVG",
    "angle_input": False,
    "faq_aria": "SVG linear gradient generator FAQ",
    "faqs": [
      (
        "How do I create a linear gradient in SVG?",
        "Paste the SVG and click Apply linear gradient. The tool writes a linearGradient in defs and sets fill=\"url(#...)\" on targets.",
      ),
      (
        "What is the difference between linear and radial SVG gradients?",
        "Linear fades along a line between two points. Radial radiates from a center — try Multi-Color SVG Radial Gradient Generator.",
      ),
      (
        "Can I adjust linear gradient direction in the preview?",
        "Yes. Use SVG Gradient Angle Generator to set an exact degree value for the gradient axis.",
      ),
      (
        "Will the linear gradient work in all modern browsers?",
        "Yes. linearGradient is part of the SVG 1.1 spec and is widely supported in browsers and design tools.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Need code? <a href="/svg-linear-gradient-code-generator">Linear gradient code</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hub? <a href="/svg-gradient-generator">SVG gradient generator</a></span>',
    "guides": [
      ("/svg-gradient-generator", "SVG gradient generator →"),
      ("/svg-linear-gradient-code-generator", "Linear gradient code →"),
      ("/svg-gradient-angle-generator", "Gradient angle →"),
      ("/multi-color-svg-linear-gradient-generator", "Multi-color linear →"),
    ],
  },
  {
    "slug": "svg-linear-gradient-code-generator",
    "title": "SVG Linear Gradient Code Generator — Free Tool | getsvgeditor.com",
    "description": "Generate SVG linear gradient code online. Get ready-to-paste linearGradient markup and CSS — free, in your browser.",
    "h1": "SVG Linear Gradient Code Generator",
    "crumb": "Linear gradient code",
    "sub": "Output <strong>linearGradient</strong> markup you can copy into any SVG or component",
    "og_alt": "SVG linear gradient code generator in SVGEditor",
    "app_name": "SVG Linear Gradient Code Generator",
    "app_alts": [
      "SVG linear gradient code generator",
      "linearGradient markup generator",
      "SVG gradient code online",
      "Copy SVG linear gradient",
    ],
    "app_desc": "Free online tool to generate SVG linear gradient code. Apply the gradient and copy defs markup from Source.",
    "features": [
      "Readable linearGradient source",
      "Copy-friendly defs block",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Generate SVG linear gradient code",
    "howto_desc": "Produce linearGradient markup ready to paste into projects.",
    "howto_click": "Click Apply + copy CSS. Gradient defs appear in Source; copy the markup or use the CSS output tab.",
    "btn": "Apply + copy CSS",
    "btn_title": "Apply linear gradient and prepare CSS-ready output",
    "angle_input": False,
    "faq_aria": "SVG linear gradient code generator FAQ",
    "faqs": [
      (
        "How do I generate SVG linear gradient code?",
        "Paste SVG, click Apply + copy CSS, then copy the linearGradient block from the Source panel.",
      ),
      (
        "Can I copy the linearGradient markup to clipboard?",
        "Yes. Select the defs section in Source after applying, or use export tabs for formatted output.",
      ),
      (
        "Does this tool output valid defs and fill references?",
        "Yes. Stops, offsets, and fill=\"url(#id)\" references are wired so the preview renders immediately.",
      ),
      (
        "Can I paste existing SVG and add linear gradient code?",
        "Yes. Open any SVG in Source — the tool adds gradient defs without stripping your existing structure.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Visual linear? <a href="/svg-linear-gradient-generator">Linear gradient generator</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">From colors? <a href="/svg-gradient-generator-from-colors">Gradient from colors</a></span>',
    "guides": [
      ("/svg-linear-gradient-generator", "Linear gradient →"),
      ("/svg-gradient-generator-from-colors", "Gradient from colors →"),
      ("/svg-text-gradient-copy-css", "Text gradient CSS →"),
      ("/svg-gradient-generator", "SVG gradient generator →"),
    ],
  },
  {
    "slug": "svg-gradient-generator-from-colors",
    "title": "SVG Gradient Generator From Colors — Free Tool | getsvgeditor.com",
    "description": "Build SVG gradients from hex colors online. Pick a palette and generate gradient stops — free, no upload.",
    "h1": "SVG Gradient Generator From Colors",
    "crumb": "Gradient from colors",
    "sub": "Turn a <strong>color palette</strong> into gradient stops on your SVG",
    "og_alt": "SVG gradient generator from colors in SVGEditor",
    "app_name": "SVG Gradient Generator From Colors",
    "app_alts": [
      "SVG gradient generator from colors",
      "SVG gradient from hex",
      "Color palette SVG gradient",
      "Build gradient from colors",
    ],
    "app_desc": "Free online tool to build SVG gradients from hex colors. Apply stops derived from your palette with live preview.",
    "features": [
      "Palette-driven gradient stops",
      "Hex-friendly color input",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Generate an SVG gradient from colors",
    "howto_desc": "Convert a color list into gradient stops on SVG shapes.",
    "howto_click": "Click Apply from colors. Stops are generated from the palette and wired into gradient defs.",
    "btn": "Apply from colors",
    "btn_title": "Apply a gradient built from your color palette",
    "angle_input": False,
    "faq_aria": "SVG gradient generator from colors FAQ",
    "faqs": [
      (
        "How do I build an SVG gradient from hex colors?",
        "Paste SVG, set your colors if prompted, then click Apply from colors. Stops are written into linearGradient or radialGradient defs.",
      ),
      (
        "How many color stops can I use in one gradient?",
        "Two or more. For rich blends open Multi-Color SVG Gradient Generator.",
      ),
      (
        "Can I start from a two-color brand palette?",
        "Yes. Two-stop gradients are ideal for simple brand fades between primary and accent hues.",
      ),
      (
        "Does the tool pick stop offsets automatically?",
        "Yes. Stops are spaced evenly unless you open Custom Multi-Color SVG Gradient Generator for manual offsets.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Multi-color? <a href="/multi-color-svg-gradient-generator">Multi-color gradient</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Custom stops? <a href="/custom-multi-color-svg-gradient-generator">Custom multi-color</a></span>',
    "guides": [
      ("/svg-gradient-generator", "SVG gradient generator →"),
      ("/multi-color-svg-gradient-generator", "Multi-color gradient →"),
      ("/custom-multi-color-svg-gradient-generator", "Custom multi-color →"),
      ("/svg-gradient-with-opacity", "Gradient with opacity →"),
    ],
  },
  {
    "slug": "svg-gradient-angle-generator",
    "title": "SVG Gradient Angle Generator Online — Free Tool | getsvgeditor.com",
    "description": "Set SVG linear gradient angle online. Enter degrees (default 90°) and apply the angled fill — free, no upload.",
    "h1": "SVG Gradient Angle Generator",
    "crumb": "Gradient angle",
    "sub": "Control <strong>linear gradient direction</strong> with a degree angle (default 90°)",
    "og_alt": "SVG gradient angle generator in SVGEditor",
    "app_name": "SVG Gradient Angle Generator",
    "app_alts": [
      "SVG gradient angle generator",
      "SVG linear gradient angle",
      "Rotate SVG gradient",
      "Gradient degrees SVG",
    ],
    "app_desc": "Free online tool to set SVG linear gradient angle in degrees. Enter the angle and apply the fill.",
    "features": [
      "Editable angle in degrees",
      "Updates linearGradient vector",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Set an SVG gradient angle",
    "howto_desc": "Rotate a linear gradient axis by entering a degree value.",
    "howto_click": "Set Angle if needed, then click Apply angle. The linearGradient x1/y1/x2/y2 vector updates to match the degrees.",
    "btn": "Apply angle",
    "btn_title": "Apply the gradient at the specified angle",
    "angle_input": True,
    "faq_aria": "SVG gradient angle generator FAQ",
    "faqs": [
      (
        "How do I set the angle of an SVG linear gradient?",
        "Paste SVG, enter Angle (default 90), then click Apply angle. The gradient axis rotates to that bearing.",
      ),
      (
        "What angle values produce a top-to-bottom fade?",
        "90° runs top to bottom in the default coordinate system. 0° is left-to-right; 180° is bottom-to-top.",
      ),
      (
        "Can I type a custom degree value for the gradient?",
        "Yes. The Angle field accepts any number — decimals work for fine-tuned design specs.",
      ),
      (
        "Does gradient angle affect radial gradients on this page?",
        "No. This page targets linearGradient vectors. Use Multi-Color SVG Radial Gradient Generator for radial fills.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Linear? <a href="/svg-linear-gradient-generator">Linear gradient</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hub? <a href="/svg-gradient-generator">SVG gradient generator</a></span>',
    "guides": [
      ("/svg-linear-gradient-generator", "Linear gradient →"),
      ("/svg-gradient-generator", "SVG gradient generator →"),
      ("/svg-linear-gradient-code-generator", "Linear gradient code →"),
      ("/multi-color-svg-linear-gradient-generator", "Multi-color linear →"),
    ],
  },
  {
    "slug": "svg-gradient-with-opacity",
    "title": "SVG Gradient With Opacity Online — Free Tool | getsvgeditor.com",
    "description": "Create SVG gradients with opacity online. Fade stops to transparent with stop-opacity — free, in your browser.",
    "h1": "SVG Gradient With Opacity",
    "crumb": "Gradient with opacity",
    "sub": "Blend <strong>semi-transparent stops</strong> using stop-opacity on gradient fills",
    "og_alt": "SVG gradient with opacity in SVGEditor",
    "app_name": "SVG Gradient With Opacity",
    "app_alts": [
      "SVG gradient with opacity",
      "Transparent SVG gradient",
      "SVG gradient stop-opacity",
      "Fade SVG gradient",
    ],
    "app_desc": "Free online tool for SVG gradients with opacity. Apply transparent stops and preview over the checkerboard.",
    "features": [
      "stop-opacity on gradient stops",
      "Transparent fade support",
      "Live preview on checkerboard",
      "No file upload",
    ],
    "howto_name": "Create an SVG gradient with opacity",
    "howto_desc": "Add semi-transparent or fading stops to SVG gradient fills.",
    "howto_click": "Click Apply gradient with opacity. Stops include stop-opacity so the fill fades over the background.",
    "btn": "Apply gradient with opacity",
    "btn_title": "Apply a gradient with transparent stops",
    "angle_input": False,
    "faq_aria": "SVG gradient with opacity FAQ",
    "faqs": [
      (
        "How do I add opacity to an SVG gradient?",
        "Paste SVG and click Apply gradient with opacity. Stops use stop-opacity so the fill can fade in or out.",
      ),
      (
        "Can gradient stops use rgba or stop-opacity?",
        "This tool uses stop-opacity on solid stop-color values — the standard SVG approach for alpha on stops.",
      ),
      (
        "Will semi-transparent gradients show the checkerboard preview?",
        "Yes. Toggle the preview background swatches to see transparency against light, dark, or checkerboard.",
      ),
      (
        "Can I fade a gradient to fully transparent?",
        "Yes. Set the final stop stop-opacity to 0 for a clean fade to invisible.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Text fade? <a href="/transparent-svg-text-gradient">Transparent text gradient</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hub? <a href="/svg-gradient-generator">SVG gradient generator</a></span>',
    "guides": [
      ("/svg-gradient-generator", "SVG gradient generator →"),
      ("/transparent-svg-text-gradient", "Transparent text gradient →"),
      ("/svg-gradient-generator-from-colors", "Gradient from colors →"),
      ("/multi-color-svg-background-gradient-generator", "Background gradient →"),
    ],
  },
  {
    "slug": "multi-color-svg-gradient-generator",
    "title": "Multi Color SVG Gradient Generator — Free Tool | getsvgeditor.com",
    "description": "Generate multi-color SVG gradients online. Three or more stops with live preview — free, no upload.",
    "h1": "Multi Color SVG Gradient Generator",
    "crumb": "Multi-color gradient",
    "sub": "Build rich <strong>multi-stop</strong> gradients with three or more hues",
    "og_alt": "Multi color SVG gradient generator in SVGEditor",
    "app_name": "Multi Color SVG Gradient Generator",
    "app_alts": [
      "Multi color SVG gradient generator",
      "Multi-stop SVG gradient",
      "Rainbow SVG gradient",
      "Three color SVG gradient",
    ],
    "app_desc": "Free online multi-color SVG gradient generator. Apply vibrant multi-stop fills with instant preview.",
    "features": [
      "Three or more color stops",
      "Linear or radial modes",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Generate a multi-color SVG gradient",
    "howto_desc": "Apply a multi-stop gradient fill to SVG shapes.",
    "howto_click": "Click Apply multi-color gradient. Multiple stops are added to gradient defs and linked from fills.",
    "btn": "Apply multi-color gradient",
    "btn_title": "Apply a multi-color gradient fill",
    "angle_input": False,
    "faq_aria": "Multi color SVG gradient generator FAQ",
    "faqs": [
      (
        "How do I create a multi-color SVG gradient?",
        "Paste SVG and click Apply multi-color gradient. Three or more stops are written into defs with even spacing.",
      ),
      (
        "What is the minimum number of colors for a multi-stop gradient?",
        "Three or more distinct stops qualify as multi-color. Two-stop fades use SVG Gradient Generator From Colors.",
      ),
      (
        "Can multi-color gradients be linear or radial?",
        "Yes. Open Multi-Color SVG Linear Gradient Generator or Multi-Color SVG Radial Gradient Generator for type-specific presets.",
      ),
      (
        "Are multi-color gradients good for hero backgrounds?",
        "Yes. Pair with Multi-Color SVG Background Gradient Generator to cover the full viewBox.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Linear? <a href="/multi-color-svg-linear-gradient-generator">Multi-color linear</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Radial? <a href="/multi-color-svg-radial-gradient-generator">Multi-color radial</a></span>',
    "guides": [
      ("/multi-color-svg-linear-gradient-generator", "Multi-color linear →"),
      ("/multi-color-svg-radial-gradient-generator", "Multi-color radial →"),
      ("/custom-multi-color-svg-gradient-generator", "Custom multi-color →"),
      ("/multi-color-svg-background-gradient-generator", "Background gradient →"),
    ],
  },
  {
    "slug": "multi-color-svg-linear-gradient-generator",
    "title": "Multi Color SVG Linear Gradient Generator — Free Tool | getsvgeditor.com",
    "description": "Create multi-color linear SVG gradients online. Rich multi-stop linear fills — free, in your browser.",
    "h1": "Multi Color SVG Linear Gradient Generator",
    "crumb": "Multi-color linear",
    "sub": "Linear <strong>multi-stop</strong> blends along a straight axis",
    "og_alt": "Multi color SVG linear gradient generator in SVGEditor",
    "app_name": "Multi Color SVG Linear Gradient Generator",
    "app_alts": [
      "Multi color SVG linear gradient generator",
      "Multi-stop linear SVG",
      "Linear rainbow SVG gradient",
      "Three color linear gradient SVG",
    ],
    "app_desc": "Free online tool for multi-color linear SVG gradients. Apply multi-stop linear fills with live preview.",
    "features": [
      "Multi-stop linearGradient",
      "Evenly spaced color stops",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Generate a multi-color linear SVG gradient",
    "howto_desc": "Apply a linear gradient with three or more color stops.",
    "howto_click": "Click Apply linear multi-color. A linearGradient with multiple stops replaces flat fills on targets.",
    "btn": "Apply linear multi-color",
    "btn_title": "Apply a multi-color linear gradient",
    "angle_input": False,
    "faq_aria": "Multi color SVG linear gradient generator FAQ",
    "faqs": [
      (
        "How do I make a multi-color linear SVG gradient?",
        "Paste SVG and click Apply linear multi-color. Stops are placed along the linear axis with distinct hues.",
      ),
      (
        "Can I space three or more colors evenly along the line?",
        "Yes. Default spacing distributes stops from 0% to 100%. Custom offsets live on Custom Multi-Color SVG Gradient Generator.",
      ),
      (
        "Does a multi-color linear gradient work on text fills?",
        "Yes. Apply to text elements or open SVG Text Linear Gradient for text-focused samples.",
      ),
      (
        "Can I reuse the same multi-color defs on several shapes?",
        "Yes. One linearGradient id can fill many paths, rects, and text nodes via fill=\"url(#...)\".",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Radial? <a href="/multi-color-svg-radial-gradient-generator">Multi-color radial</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hub? <a href="/multi-color-svg-gradient-generator">Multi-color gradient</a></span>',
    "guides": [
      ("/multi-color-svg-gradient-generator", "Multi-color gradient →"),
      ("/multi-color-svg-radial-gradient-generator", "Multi-color radial →"),
      ("/custom-multi-color-svg-gradient-generator", "Custom multi-color →"),
      ("/svg-text-linear-gradient", "Text linear gradient →"),
    ],
  },
  {
    "slug": "multi-color-svg-radial-gradient-generator",
    "title": "Multi Color SVG Radial Gradient Generator — Free Tool | getsvgeditor.com",
    "description": "Generate multi-color radial SVG gradients online. Spotlight and orb fills with live preview — free, no upload.",
    "h1": "Multi Color SVG Radial Gradient Generator",
    "crumb": "Multi-color radial",
    "sub": "Radial <strong>multi-stop</strong> blends radiating from a center point",
    "og_alt": "Multi color SVG radial gradient generator in SVGEditor",
    "app_name": "Multi Color SVG Radial Gradient Generator",
    "app_alts": [
      "Multi color SVG radial gradient generator",
      "Multi-stop radial SVG",
      "Radial rainbow SVG gradient",
      "SVG radialGradient multi color",
    ],
    "app_desc": "Free online tool for multi-color radial SVG gradients. Apply multi-stop radial fills with instant preview.",
    "features": [
      "Multi-stop radialGradient",
      "Center-weighted color blends",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Generate a multi-color radial SVG gradient",
    "howto_desc": "Apply a radial gradient with three or more color stops.",
    "howto_click": "Click Apply radial multi-color. A radialGradient with multiple stops replaces flat fills on targets.",
    "btn": "Apply radial multi-color",
    "btn_title": "Apply a multi-color radial gradient",
    "angle_input": False,
    "faq_aria": "Multi color SVG radial gradient generator FAQ",
    "faqs": [
      (
        "How do I create a multi-color radial SVG gradient?",
        "Paste SVG and click Apply radial multi-color. Stops radiate from the gradient center outward.",
      ),
      (
        "Where is the center point of a radial multi-color gradient?",
        "Default cx/cy sit at the viewBox center. Edit Source to nudge the focal point for spotlight effects.",
      ),
      (
        "Can radial gradients blend four or more hues?",
        "Yes. Add as many stops as you need — Custom Multi-Color SVG Gradient Generator helps with manual placement.",
      ),
      (
        "Are radial multi-color gradients suitable for spotlight effects?",
        "Yes. They work well for orbs, badges, and vignette-style background washes.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Linear? <a href="/multi-color-svg-linear-gradient-generator">Multi-color linear</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Background? <a href="/multi-color-svg-background-gradient-generator">Background gradient</a></span>',
    "guides": [
      ("/multi-color-svg-gradient-generator", "Multi-color gradient →"),
      ("/multi-color-svg-linear-gradient-generator", "Multi-color linear →"),
      ("/multi-color-svg-background-gradient-generator", "Background gradient →"),
      ("/svg-text-radial-gradient", "Text radial gradient →"),
    ],
  },
  {
    "slug": "custom-multi-color-svg-gradient-generator",
    "title": "Custom Multi Color SVG Gradient Generator — Free Tool | getsvgeditor.com",
    "description": "Design custom multi-color SVG gradients online. Control stops and offsets — free, in your browser, no upload.",
    "h1": "Custom Multi Color SVG Gradient Generator",
    "crumb": "Custom multi-color",
    "sub": "Fine-tune <strong>stop colors and offsets</strong> on multi-color gradients",
    "og_alt": "Custom multi color SVG gradient generator in SVGEditor",
    "app_name": "Custom Multi Color SVG Gradient Generator",
    "app_alts": [
      "Custom multi color SVG gradient generator",
      "Custom SVG gradient stops",
      "Manual SVG gradient offsets",
      "Designer SVG gradient tool",
    ],
    "app_desc": "Free online tool to design custom multi-color SVG gradients with manual stop control.",
    "features": [
      "Custom stop offsets",
      "Multi-color palette control",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Design a custom multi-color SVG gradient",
    "howto_desc": "Apply a multi-stop gradient with designer-controlled offsets.",
    "howto_click": "Click Apply custom gradient. Stops and offsets are written for a tailored multi-color blend.",
    "btn": "Apply custom gradient",
    "btn_title": "Apply a custom multi-color gradient",
    "angle_input": False,
    "faq_aria": "Custom multi color SVG gradient generator FAQ",
    "faqs": [
      (
        "How do I design a custom multi-color SVG gradient?",
        "Paste SVG and click Apply custom gradient. Edit stop offsets in Source after applying for precise control.",
      ),
      (
        "Can I control each stop offset manually?",
        "Yes. Adjust offset attributes on each stop element in the Source panel after the initial apply.",
      ),
      (
        "Is there a preset for rainbow or sunset palettes?",
        "The default apply uses a vibrant multi-stop preset. Tweak stop-color values to match your palette.",
      ),
      (
        "Can custom multi-color gradients be exported as standalone SVG?",
        "Yes. Download the file after applying — defs and fills stay self-contained in the SVG.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">From colors? <a href="/svg-gradient-generator-from-colors">Gradient from colors</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hub? <a href="/multi-color-svg-gradient-generator">Multi-color gradient</a></span>',
    "guides": [
      ("/multi-color-svg-gradient-generator", "Multi-color gradient →"),
      ("/multi-color-svg-linear-gradient-generator", "Multi-color linear →"),
      ("/multi-color-svg-radial-gradient-generator", "Multi-color radial →"),
      ("/svg-gradient-generator-from-colors", "Gradient from colors →"),
    ],
  },
  {
    "slug": "multi-color-svg-background-gradient-generator",
    "title": "Multi Color SVG Background Gradient Generator — Free Tool | getsvgeditor.com",
    "description": "Generate multi-color SVG background gradients online. Full-viewBox washes for heroes and cards — free, no upload.",
    "h1": "Multi Color SVG Background Gradient Generator",
    "crumb": "Background gradient",
    "sub": "Cover the <strong>full viewBox</strong> with a multi-color gradient background",
    "og_alt": "Multi color SVG background gradient generator in SVGEditor",
    "app_name": "Multi Color SVG Background Gradient Generator",
    "app_alts": [
      "Multi color SVG background gradient generator",
      "SVG hero gradient background",
      "Full bleed SVG gradient",
      "SVG card background gradient",
    ],
    "app_desc": "Free online tool for multi-color SVG background gradients. Fill the canvas with a multi-stop wash.",
    "features": [
      "Full-viewBox gradient rect",
      "Multi-stop background blends",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Generate a multi-color SVG background gradient",
    "howto_desc": "Apply a multi-stop gradient that covers the entire SVG canvas.",
    "howto_click": "Click Apply background gradient. A background rect with a multi-color gradient fill covers the viewBox.",
    "btn": "Apply background gradient",
    "btn_title": "Apply a multi-color background gradient",
    "angle_input": False,
    "faq_aria": "Multi color SVG background gradient generator FAQ",
    "faqs": [
      (
        "How do I generate a multi-color background gradient in SVG?",
        "Paste SVG and click Apply background gradient. A rect behind your artwork fills the viewBox with a multi-stop gradient.",
      ),
      (
        "Should the gradient cover the full viewBox for backgrounds?",
        "Yes. A full-bleed rect ensures the gradient scales with the SVG coordinate system.",
      ),
      (
        "Can I use multi-color gradients behind icons or text?",
        "Yes. Layer foreground elements above the gradient rect in document order.",
      ),
      (
        "Do background gradients increase SVG file size much?",
        "Gradient defs are compact — a few stops add minimal bytes compared to raster backgrounds.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Multi-color? <a href="/multi-color-svg-gradient-generator">Multi-color gradient</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">General hub? <a href="/svg-gradient-generator">SVG gradient generator</a></span>',
    "guides": [
      ("/multi-color-svg-gradient-generator", "Multi-color gradient →"),
      ("/multi-color-svg-linear-gradient-generator", "Multi-color linear →"),
      ("/svg-gradient-with-opacity", "Gradient with opacity →"),
      ("/svg-text-gradient-for-web-design", "Text gradient for design →"),
    ],
  },
  {
    "slug": "svg-text-gradient-generator",
    "title": "SVG Text Gradient Generator Online — Free Tool | getsvgeditor.com",
    "description": "Generate SVG text gradients online. Apply gradient fills to live text elements — free, in your browser.",
    "h1": "SVG Text Gradient Generator",
    "crumb": "Text gradient",
    "sub": "Fill <strong>&lt;text&gt;</strong> elements with gradient paint — no path conversion required",
    "og_alt": "SVG text gradient generator in SVGEditor",
    "app_name": "SVG Text Gradient Generator",
    "app_alts": [
      "SVG text gradient generator",
      "Gradient text SVG",
      "SVG text fill gradient",
      "Text gradient online",
    ],
    "app_desc": "Free online SVG text gradient generator. Apply gradient fills to text with live preview.",
    "features": [
      "Gradient fill on text elements",
      "No outline conversion",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Generate an SVG text gradient",
    "howto_desc": "Apply a gradient fill to SVG text elements.",
    "howto_click": "Click Apply text gradient. Gradient defs are linked via fill=\"url(#...)\" on text nodes.",
    "btn": "Apply text gradient",
    "btn_title": "Apply a gradient fill to SVG text",
    "angle_input": False,
    "faq_aria": "SVG text gradient generator FAQ",
    "faqs": [
      (
        "How do I apply a gradient to SVG text?",
        "Paste SVG with text elements and click Apply text gradient. fill=\"url(#...)\" references a gradient in defs.",
      ),
      (
        "Does gradient text require converting letters to paths?",
        "No. Native text elements keep their font data — only the fill attribute changes.",
      ),
      (
        "Can I preview gradient fills on live text elements?",
        "Yes. The preview renders text with the gradient fill immediately after you apply.",
      ),
      (
        "Will gradient text remain selectable in the SVG source?",
        "Yes. Text stays as text in the markup — useful for edits and accessibility tooling.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Developers? <a href="/svg-text-gradient-for-developers">Text gradient for devs</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Design? <a href="/svg-text-gradient-for-web-design">Text gradient for design</a></span>',
    "guides": [
      ("/svg-text-linear-gradient", "Text linear gradient →"),
      ("/svg-text-radial-gradient", "Text radial gradient →"),
      ("/svg-text-gradient-for-developers", "For developers →"),
      ("/svg-text-gradient-for-web-design", "For web design →"),
    ],
  },
  {
    "slug": "svg-text-gradient-for-developers",
    "title": "SVG Text Gradient for Developers — Free Tool | getsvgeditor.com",
    "description": "SVG text gradient tool for developers. Inspect defs, copy markup, export components — free, no upload.",
    "h1": "SVG Text Gradient for Developers",
    "crumb": "Text gradient for devs",
    "sub": "Developer-focused <strong>gradient text</strong> with readable defs and export paths",
    "og_alt": "SVG text gradient for developers in SVGEditor",
    "app_name": "SVG Text Gradient for Developers",
    "app_alts": [
      "SVG text gradient for developers",
      "Dev SVG text gradient",
      "React SVG text gradient",
      "SVG text gradient markup",
    ],
    "app_desc": "Free online SVG text gradient tool for developers. Apply fills and inspect gradient defs in Source.",
    "features": [
      "Inspectable gradient defs",
      "React and PNG export tabs",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Apply an SVG text gradient as a developer",
    "howto_desc": "Generate gradient text markup ready for apps and component libraries.",
    "howto_click": "Click Apply dev text gradient. Review defs in Source and export via React or download tabs.",
    "btn": "Apply dev text gradient",
    "btn_title": "Apply gradient text with developer-friendly output",
    "angle_input": False,
    "faq_aria": "SVG text gradient for developers FAQ",
    "faqs": [
      (
        "How do developers add gradient fills to SVG text?",
        "Paste SVG, click Apply dev text gradient, then copy the defs block and fill refs from Source into your component.",
      ),
      (
        "Does the tool output defs IDs safe for React components?",
        "Yes. IDs are simple and unique within the document — rename if you embed multiple SVGs on one page.",
      ),
      (
        "Can I inspect the linearGradient markup in Source?",
        "Yes. Every apply updates Source so you can read stops, offsets, and fill references directly.",
      ),
      (
        "Is gradient text accessible compared to CSS background-clip?",
        "SVG text stays real text in the DOM when inlined — often better for screen readers than background-clip tricks.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Copy CSS? <a href="/svg-text-gradient-copy-css">Text gradient copy CSS</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Export? <a href="/svg-text-gradient-export-svg">Export SVG</a></span>',
    "guides": [
      ("/svg-text-gradient-generator", "Text gradient →"),
      ("/svg-text-gradient-copy-css", "Copy CSS →"),
      ("/svg-text-gradient-export-svg", "Export SVG →"),
      ("/svg-text-linear-gradient", "Text linear gradient →"),
    ],
  },
  {
    "slug": "svg-text-linear-gradient",
    "title": "SVG Text Linear Gradient Online — Free Tool | getsvgeditor.com",
    "description": "Apply linear gradients to SVG text online. Diagonal and vertical text fades — free, in your browser.",
    "h1": "SVG Text Linear Gradient",
    "crumb": "Text linear gradient",
    "sub": "Linear gradient fills on <strong>headline text</strong> elements",
    "og_alt": "SVG text linear gradient in SVGEditor",
    "app_name": "SVG Text Linear Gradient",
    "app_alts": [
      "SVG text linear gradient",
      "Linear gradient SVG text",
      "Text linearGradient fill",
      "Diagonal text gradient SVG",
    ],
    "app_desc": "Free online tool to apply linear gradients to SVG text with live preview.",
    "features": [
      "linearGradient on text fills",
      "Diagonal and axis-aligned presets",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Apply a linear gradient to SVG text",
    "howto_desc": "Fill text elements with a linearGradient reference.",
    "howto_click": "Click Apply linear text gradient. Text nodes receive fill=\"url(#...)\" pointing at a linearGradient def.",
    "btn": "Apply linear text gradient",
    "btn_title": "Apply a linear gradient to SVG text",
    "angle_input": False,
    "faq_aria": "SVG text linear gradient FAQ",
    "faqs": [
      (
        "How do I create a linear gradient on SVG text?",
        "Paste SVG with text and click Apply linear text gradient. A linearGradient def drives the text fill.",
      ),
      (
        "Can linear text gradients run diagonally across letters?",
        "Yes. Adjust the linearGradient vector in Source or start from SVG Gradient Angle Generator for degree control.",
      ),
      (
        'Does fill="url(#id)" work on tspan elements too?',
        "Yes. Apply to the parent text or set fill on individual tspans for multi-line effects.",
      ),
      (
        "What sample text does the linear text gradient page use?",
        "A headline-style text element sized for the viewBox so the gradient span is easy to preview.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Radial text? <a href="/svg-text-radial-gradient">Text radial gradient</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hub? <a href="/svg-text-gradient-generator">Text gradient</a></span>',
    "guides": [
      ("/svg-text-gradient-generator", "Text gradient →"),
      ("/svg-text-radial-gradient", "Text radial gradient →"),
      ("/svg-linear-gradient-generator", "Linear gradient →"),
      ("/custom-color-svg-text-gradient", "Custom color text →"),
    ],
  },
  {
    "slug": "svg-text-radial-gradient",
    "title": "SVG Text Radial Gradient Online — Free Tool | getsvgeditor.com",
    "description": "Apply radial gradients to SVG text online. Glow and spotlight text fills — free, no upload.",
    "h1": "SVG Text Radial Gradient",
    "crumb": "Text radial gradient",
    "sub": "Radial gradient fills centered on <strong>letterforms</strong>",
    "og_alt": "SVG text radial gradient in SVGEditor",
    "app_name": "SVG Text Radial Gradient",
    "app_alts": [
      "SVG text radial gradient",
      "Radial gradient SVG text",
      "Text radialGradient fill",
      "Glow text gradient SVG",
    ],
    "app_desc": "Free online tool to apply radial gradients to SVG text with live preview.",
    "features": [
      "radialGradient on text fills",
      "Center-weighted text glow",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Apply a radial gradient to SVG text",
    "howto_desc": "Fill text elements with a radialGradient reference.",
    "howto_click": "Click Apply radial text gradient. Text nodes receive fill=\"url(#...)\" pointing at a radialGradient def.",
    "btn": "Apply radial text gradient",
    "btn_title": "Apply a radial gradient to SVG text",
    "angle_input": False,
    "faq_aria": "SVG text radial gradient FAQ",
    "faqs": [
      (
        "How do I apply a radial gradient to SVG text?",
        "Paste SVG with text and click Apply radial text gradient. A radialGradient def drives the text fill.",
      ),
      (
        "Can radial gradients create a glow inside letterforms?",
        "Yes. Bright center stops fading outward mimic an inner glow on bold display type.",
      ),
      (
        "Where should the radial center sit for headline text?",
        "Center cx/cy on the text bounding box works for most headlines — nudge in Source for asymmetric effects.",
      ),
      (
        "Does radial text gradient work on outlined stroke text?",
        "Fill gradients apply to fill paint. For stroke gradients use stroke=\"url(#...)\" on text with a visible stroke width.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Linear text? <a href="/svg-text-linear-gradient">Text linear gradient</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Neon? <a href="/neon-svg-text-gradient">Neon text gradient</a></span>',
    "guides": [
      ("/svg-text-gradient-generator", "Text gradient →"),
      ("/svg-text-linear-gradient", "Text linear gradient →"),
      ("/neon-svg-text-gradient", "Neon text gradient →"),
      ("/multi-color-svg-radial-gradient-generator", "Multi-color radial →"),
    ],
  },
  {
    "slug": "animated-svg-text-gradient",
    "title": "Animated SVG Text Gradient Online — Free Tool | getsvgeditor.com",
    "description": "Create animated SVG text gradients online. Shifting gradient stops with motion — free, in your browser.",
    "h1": "Animated SVG Text Gradient",
    "crumb": "Animated text gradient",
    "sub": "Add <strong>motion</strong> to gradient fills on SVG text",
    "og_alt": "Animated SVG text gradient in SVGEditor",
    "app_name": "Animated SVG Text Gradient",
    "app_alts": [
      "Animated SVG text gradient",
      "Moving gradient SVG text",
      "SVG text gradient animation",
      "Animated text fill SVG",
    ],
    "app_desc": "Free online tool for animated SVG text gradients. Apply shifting gradient fills with live preview.",
    "features": [
      "Animated gradient stops",
      "Live motion preview",
      "Editable animation markup",
      "No file upload",
    ],
    "howto_name": "Create an animated SVG text gradient",
    "howto_desc": "Apply a gradient fill with animation on SVG text.",
    "howto_click": "Click Apply animated gradient. Gradient stops or offsets animate for a moving text fill effect.",
    "btn": "Apply animated gradient",
    "btn_title": "Apply an animated gradient to SVG text",
    "angle_input": False,
    "faq_aria": "Animated SVG text gradient FAQ",
    "faqs": [
      (
        "How do I animate a gradient on SVG text?",
        "Paste SVG with text and click Apply animated gradient. Animation elements shift stops or offsets over time.",
      ),
      (
        "Does animation use SMIL or CSS on this page?",
        "The tool adds SVG-native animation markup compatible with SMIL-capable viewers and many modern browsers.",
      ),
      (
        "Can animated text gradients loop smoothly?",
        "Yes. Default animation timing loops for continuous hero and loading text effects.",
      ),
      (
        "Will animated gradient text affect SVG performance?",
        "Lightweight stop animations are efficient. Heavy filters plus animation may cost more on low-end devices.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Neon? <a href="/neon-svg-text-gradient">Neon text gradient</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hub? <a href="/svg-text-gradient-generator">Text gradient</a></span>',
    "guides": [
      ("/svg-text-gradient-generator", "Text gradient →"),
      ("/neon-svg-text-gradient", "Neon text gradient →"),
      ("/svg-text-linear-gradient", "Text linear gradient →"),
      ("/svg-text-gradient-for-web-design", "For web design →"),
    ],
  },
  {
    "slug": "neon-svg-text-gradient",
    "title": "Neon SVG Text Gradient Online — Free Tool | getsvgeditor.com",
    "description": "Create neon SVG text gradients online. Bright multi-stop glow fills for display type — free, no upload.",
    "h1": "Neon SVG Text Gradient",
    "crumb": "Neon text gradient",
    "sub": "Vivid <strong>neon-style</strong> gradient fills on display text",
    "og_alt": "Neon SVG text gradient in SVGEditor",
    "app_name": "Neon SVG Text Gradient",
    "app_alts": [
      "Neon SVG text gradient",
      "Neon glow SVG text",
      "Bright text gradient SVG",
      "Cyberpunk SVG text gradient",
    ],
    "app_desc": "Free online neon SVG text gradient tool. Apply bright glowing gradient fills with live preview.",
    "features": [
      "High-contrast neon stop palette",
      "Glow-friendly gradient setup",
      "Live preview on dark bg",
      "No file upload",
    ],
    "howto_name": "Create a neon SVG text gradient",
    "howto_desc": "Apply a bright neon-style gradient fill to SVG text.",
    "howto_click": "Click Apply neon gradient. Hot cyan and magenta stops create a neon display-type fill on text.",
    "btn": "Apply neon gradient",
    "btn_title": "Apply a neon-style gradient to SVG text",
    "angle_input": False,
    "faq_aria": "Neon SVG text gradient FAQ",
    "faqs": [
      (
        "How do I make neon-style gradient SVG text?",
        "Paste SVG with display text and click Apply neon gradient. Saturated stops simulate a neon tube color shift.",
      ),
      (
        "Do neon gradients combine bright stops with glow filters?",
        "The preset focuses on gradient stops. Add feGaussianBlur filters in Source for extra outer glow.",
      ),
      (
        "Can I preview neon text on a dark background?",
        "Yes. Switch the preview swatch to black so bright stops pop like a real neon sign.",
      ),
      (
        "Are neon text gradients suitable for logos and badges?",
        "Yes. Export the SVG and scale cleanly — vector text with gradients stays sharp at any size.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Animated? <a href="/animated-svg-text-gradient">Animated text gradient</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Custom colors? <a href="/custom-color-svg-text-gradient">Custom color text</a></span>',
    "guides": [
      ("/svg-text-gradient-generator", "Text gradient →"),
      ("/animated-svg-text-gradient", "Animated text gradient →"),
      ("/custom-color-svg-text-gradient", "Custom color text →"),
      ("/svg-text-radial-gradient", "Text radial gradient →"),
    ],
  },
  {
    "slug": "transparent-svg-text-gradient",
    "title": "Transparent SVG Text Gradient Online — Free Tool | getsvgeditor.com",
    "description": "Fade SVG text with transparent gradients online. Opaque-to-clear text fills — free, in your browser.",
    "h1": "Transparent SVG Text Gradient",
    "crumb": "Transparent text gradient",
    "sub": "Fade text with <strong>transparent stops</strong> on gradient fills",
    "og_alt": "Transparent SVG text gradient in SVGEditor",
    "app_name": "Transparent SVG Text Gradient",
    "app_alts": [
      "Transparent SVG text gradient",
      "Fade SVG text gradient",
      "SVG text gradient opacity",
      "Ghost text gradient SVG",
    ],
    "app_desc": "Free online tool for transparent SVG text gradients. Fade letterforms with stop-opacity fills.",
    "features": [
      "Transparent gradient stops on text",
      "Checkerboard preview support",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Create a transparent SVG text gradient",
    "howto_desc": "Apply a fading gradient fill with transparent stops on text.",
    "howto_click": "Click Apply transparent gradient. Text fills use stop-opacity so letterforms fade to clear.",
    "btn": "Apply transparent gradient",
    "btn_title": "Apply a transparent gradient to SVG text",
    "angle_input": False,
    "faq_aria": "Transparent SVG text gradient FAQ",
    "faqs": [
      (
        "How do I fade SVG text with a transparent gradient?",
        "Paste SVG with text and click Apply transparent gradient. Stops use stop-opacity for a smooth fade.",
      ),
      (
        "Can text gradients fade from opaque to fully clear?",
        "Yes. End stops at stop-opacity=\"0\" leave letterforms invisible at that edge.",
      ),
      (
        "Will transparent gradient text show the preview checkerboard?",
        "Yes. Use the checkerboard swatch to verify alpha against a neutral pattern.",
      ),
      (
        "Can I overlay transparent gradient text on photography?",
        "Yes. Export the SVG and place it over images — transparent stops reveal the layer beneath.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Shape opacity? <a href="/svg-gradient-with-opacity">Gradient with opacity</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hub? <a href="/svg-text-gradient-generator">Text gradient</a></span>',
    "guides": [
      ("/svg-text-gradient-generator", "Text gradient →"),
      ("/svg-gradient-with-opacity", "Gradient with opacity →"),
      ("/svg-text-linear-gradient", "Text linear gradient →"),
      ("/svg-text-gradient-for-web-design", "For web design →"),
    ],
  },
  {
    "slug": "custom-color-svg-text-gradient",
    "title": "Custom Color SVG Text Gradient — Free Tool | getsvgeditor.com",
    "description": "Pick custom colors for SVG text gradients online. Brand hex stops on text fills — free, no upload.",
    "h1": "Custom Color SVG Text Gradient",
    "crumb": "Custom color text",
    "sub": "Apply <strong>your brand colors</strong> as gradient stops on text",
    "og_alt": "Custom color SVG text gradient in SVGEditor",
    "app_name": "Custom Color SVG Text Gradient",
    "app_alts": [
      "Custom color SVG text gradient",
      "Brand color text gradient SVG",
      "Hex text gradient SVG",
      "Custom stops SVG text",
    ],
    "app_desc": "Free online tool for custom-color SVG text gradients. Wire brand hex values into text gradient stops.",
    "features": [
      "Custom hex stop colors",
      "Multi-stop text gradients",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Apply a custom-color SVG text gradient",
    "howto_desc": "Set brand colors as gradient stops on SVG text fills.",
    "howto_click": "Click Apply custom colors. Stop colors update to your palette and link to text fill references.",
    "btn": "Apply custom colors",
    "btn_title": "Apply custom brand colors to SVG text gradient",
    "angle_input": False,
    "faq_aria": "Custom color SVG text gradient FAQ",
    "faqs": [
      (
        "How do I pick custom colors for SVG text gradients?",
        "Paste SVG with text, click Apply custom colors, then edit stop-color values in Source for exact hex codes.",
      ),
      (
        "Can brand hex values be applied to text gradient stops?",
        "Yes. Replace stop-color attributes with your brand palette after applying.",
      ),
      (
        "Does custom color mode support more than two stops?",
        "Yes. Add extra stop elements in defs for tri-color and rainbow headline effects.",
      ),
      (
        "Can I match text gradient colors to a UI theme?",
        "Yes. Mirror CSS custom property values into stop-color for consistent design systems.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">From colors? <a href="/svg-gradient-generator-from-colors">Gradient from colors</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Neon? <a href="/neon-svg-text-gradient">Neon text gradient</a></span>',
    "guides": [
      ("/svg-text-gradient-generator", "Text gradient →"),
      ("/svg-gradient-generator-from-colors", "Gradient from colors →"),
      ("/neon-svg-text-gradient", "Neon text gradient →"),
      ("/svg-text-linear-gradient", "Text linear gradient →"),
    ],
  },
  {
    "slug": "svg-text-gradient-copy-css",
    "title": "SVG Text Gradient Copy CSS — Free Tool | getsvgeditor.com",
    "description": "Copy CSS for SVG text gradients online. Get background-clip fallbacks and SVG markup — free, no upload.",
    "h1": "SVG Text Gradient Copy CSS",
    "crumb": "Text gradient CSS",
    "sub": "Apply gradient text and <strong>copy CSS</strong> for HTML fallbacks",
    "og_alt": "SVG text gradient copy CSS in SVGEditor",
    "app_name": "SVG Text Gradient Copy CSS",
    "app_alts": [
      "SVG text gradient copy CSS",
      "CSS text gradient from SVG",
      "Copy gradient text CSS",
      "background-clip text gradient",
    ],
    "app_desc": "Free online tool to copy CSS for SVG text gradients alongside the SVG markup.",
    "features": [
      "CSS output for gradient text",
      "SVG defs in Source",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Copy CSS for an SVG text gradient",
    "howto_desc": "Generate gradient text and copy equivalent CSS for HTML headings.",
    "howto_click": "Click Apply + copy CSS. SVG gradient text is applied and CSS appears in the export output tab.",
    "btn": "Apply + copy CSS",
    "btn_title": "Apply text gradient and prepare CSS output",
    "angle_input": False,
    "faq_aria": "SVG text gradient copy CSS FAQ",
    "faqs": [
      (
        "How do I copy CSS for an SVG text gradient?",
        "Paste SVG, click Apply + copy CSS, then open the export tab for background-clip rules matching your gradient.",
      ),
      (
        "Can CSS background-clip mimic the SVG text gradient?",
        "Yes. linear-gradient in CSS with background-clip: text approximates the SVG fill for HTML headings.",
      ),
      (
        "Does copied CSS include fallback solid colors?",
        "Yes. A solid color fallback covers browsers that lack background-clip: text support.",
      ),
      (
        "When should I use SVG gradient vs CSS for text?",
        "Use SVG for logos and precise vector exports; use CSS for responsive HTML headlines in component libraries.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Devs? <a href="/svg-text-gradient-for-developers">Text gradient for devs</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Code? <a href="/svg-linear-gradient-code-generator">Linear gradient code</a></span>',
    "guides": [
      ("/svg-text-gradient-for-developers", "For developers →"),
      ("/svg-linear-gradient-code-generator", "Linear gradient code →"),
      ("/svg-text-gradient-generator", "Text gradient →"),
      ("/svg-text-linear-gradient", "Text linear gradient →"),
    ],
  },
  {
    "slug": "svg-text-gradient-export-svg",
    "title": "SVG Text Gradient Export SVG — Free Tool | getsvgeditor.com",
    "description": "Export SVG with gradient text online. Download production-ready files — free, in your browser.",
    "h1": "SVG Text Gradient Export SVG",
    "crumb": "Export gradient text",
    "sub": "Apply gradient text and <strong>download</strong> a self-contained SVG file",
    "og_alt": "SVG text gradient export SVG in SVGEditor",
    "app_name": "SVG Text Gradient Export SVG",
    "app_alts": [
      "SVG text gradient export SVG",
      "Download gradient text SVG",
      "Export SVG text gradient",
      "Save gradient text SVG",
    ],
    "app_desc": "Free online tool to export SVG files with gradient text applied. Download after previewing.",
    "features": [
      "Download gradient text SVG",
      "Self-contained defs",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Export SVG with gradient text",
    "howto_desc": "Apply gradient fills to text and download the finished SVG.",
    "howto_click": "Click Apply + export SVG. Gradient defs are applied — use Download to save the file.",
    "btn": "Apply + export SVG",
    "btn_title": "Apply text gradient and prepare SVG export",
    "angle_input": False,
    "faq_aria": "SVG text gradient export SVG FAQ",
    "faqs": [
      (
        "How do I export SVG with gradient text applied?",
        "Paste SVG, click Apply + export SVG, then click Download to save the updated file.",
      ),
      (
        "Can I download the file after applying text gradient?",
        "Yes. Download saves the current Source markup including defs and text fill references.",
      ),
      (
        "Are gradient defs included in the exported SVG?",
        "Yes. linearGradient or radialGradient blocks stay in defs inside the downloaded file.",
      ),
      (
        "Does export preserve viewBox and font-family on text?",
        "Yes. Only fill attributes and defs change — layout and typography attributes remain intact.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Copy CSS? <a href="/svg-text-gradient-copy-css">Text gradient copy CSS</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hub? <a href="/svg-text-gradient-generator">Text gradient</a></span>',
    "guides": [
      ("/svg-text-gradient-generator", "Text gradient →"),
      ("/svg-text-gradient-copy-css", "Copy CSS →"),
      ("/svg-text-gradient-for-developers", "For developers →"),
      ("/svg-text-gradient-for-web-design", "For web design →"),
    ],
  },
  {
    "slug": "svg-text-gradient-for-web-design",
    "title": "SVG Text Gradient for Web Design — Free Tool | getsvgeditor.com",
    "description": "SVG text gradient tool for web designers. Crisp hero type and shareable previews — free, no upload.",
    "h1": "SVG Text Gradient for Web Design",
    "crumb": "Text gradient for design",
    "sub": "Designer-friendly <strong>gradient headlines</strong> that scale on any screen",
    "og_alt": "SVG text gradient for web design in SVGEditor",
    "app_name": "SVG Text Gradient for Web Design",
    "app_alts": [
      "SVG text gradient for web design",
      "Designer SVG text gradient",
      "Hero text gradient SVG",
      "Web design gradient type",
    ],
    "app_desc": "Free online SVG text gradient tool for web designers. Create scalable gradient headlines with live preview.",
    "features": [
      "Scalable gradient headlines",
      "Share link support",
      "Live preview",
      "No file upload",
    ],
    "howto_name": "Create an SVG text gradient for web design",
    "howto_desc": "Apply gradient fills to display type for web and marketing layouts.",
    "howto_click": "Click Apply design gradient. Text receives a polished multi-stop fill suited for hero sections.",
    "btn": "Apply design gradient",
    "btn_title": "Apply a web-design-ready gradient to SVG text",
    "angle_input": False,
    "faq_aria": "SVG text gradient for web design FAQ",
    "faqs": [
      (
        "How do web designers create SVG text gradients quickly?",
        "Paste headline SVG, click Apply design gradient, and preview instantly — no desktop app required.",
      ),
      (
        "Can gradient text scale crisply on retina displays?",
        "Yes. Vector text with gradient fills stays sharp at 2× and 3× pixel densities.",
      ),
      (
        "Are SVG text gradients better than raster hero titles?",
        "Often yes — one SVG file scales to any width without exporting multiple PNG sizes.",
      ),
      (
        "Can I share a gradient text SVG link with clients?",
        "Yes. Use Share to generate a preview link clients can open in the browser.",
      ),
    ],
    "note_html": '<span class="tool-note-pair">Export? <a href="/svg-text-gradient-export-svg">Export SVG</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Backgrounds? <a href="/multi-color-svg-background-gradient-generator">Background gradient</a></span>',
    "guides": [
      ("/svg-text-gradient-generator", "Text gradient →"),
      ("/svg-text-gradient-export-svg", "Export SVG →"),
      ("/multi-color-svg-background-gradient-generator", "Background gradient →"),
      ("/neon-svg-text-gradient", "Neon text gradient →"),
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


def action_button_html(p):
    if p.get("angle_input"):
        return f'''<div class="scale-path-factor-group">
              <label class="scale-path-factor-label" for="gradient-angle-input">Angle</label>
              <input type="number" id="gradient-angle-input" class="scale-path-factor-input" value="90" step="any" inputmode="decimal" aria-label="Gradient angle" />
              <span class="scale-path-factor-unit" aria-hidden="true">°</span>
              <button type="button" class="btn btn-accent" id="btn-gradient-action" title="{esc(p["btn_title"])}">{esc(p["btn"])}</button>
            </div>'''
    return f'''<button
              type="button"
              class="btn btn-accent"
              id="btn-gradient-action"
              title="{esc(p["btn_title"])}"
            >
              {esc(p["btn"])}</button>'''


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
        f'class="app-page tool-page gradient-tool-page" data-gradient-intent="{slug}" data-mobile-mode="preview" data-default-tab="preview"',
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
        '"name": "Paste or use the sample SVG",\n                "text": "Open the tool with the sample graphic, or paste your own SVG into Source."',
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
        "Paste or upload an SVG. Click the action button to apply a gradient.",
    )
    text = text.replace(
        '<a href="/blog/svg-to-png">PNG guide</a>',
        '<a href="/svg-gradient-generator">SVG gradient generator</a>',
    )

    out = root / f"{slug}.html"
    out.write_text(text, encoding="utf-8")
    print("wrote", out.name)
    return out


def main():
    assert len(PAGES) == 22
    questions = [q for p in PAGES for q, _ in p["faqs"]]
    assert len(questions) == len(set(questions)), "duplicate FAQ questions"
    for p in PAGES:
        build_page(p)
    print("done", len(PAGES))


if __name__ == "__main__":
    main()
