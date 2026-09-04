#!/usr/bin/env python3
"""Generate svg-to-base64* long-tail tool pages from optimize-svg-file.html."""
from pathlib import Path
import re
import json

root = Path(__file__).resolve().parent.parent
template = (root / "optimize-svg-file.html").read_text(encoding="utf-8")

PAGES = [
  {
    "slug": "svg-to-base64",
    "title": "SVG to Base64 Online — Free Converter | getsvgeditor.com",
    "description": "Convert SVG to Base64 online. Paste an SVG, preview it, and copy a Base64 data URI — free, in the browser, no upload.",
    "h1": "SVG to Base64",
    "crumb": "SVG to Base64",
    "sub": "Encode SVG markup as a <strong>Base64 data URI</strong> you can paste into CSS or HTML",
    "og_alt": "Convert SVG to Base64 in SVGEditor — live preview and copy",
    "app_name": "SVG to Base64",
    "app_alts": ["SVG to Base64", "SVG to Base64 converter", "Encode SVG as Base64", "SVG Base64 online"],
    "app_desc": "Free online SVG to Base64 converter. Paste SVG, preview it, and copy a Base64 data URI in your browser.",
    "features": ["SVG to Base64 data URI", "Live preview", "Copy in one click", "Runs entirely in the browser — no file upload"],
    "howto_name": "Convert SVG to Base64",
    "howto_desc": "Paste SVG, preview the graphic, then copy a Base64 data URI.",
    "howto_click": "Click Copy Base64 data URI. The Data URI tab shows data:image/svg+xml;base64,… ready to paste.",
    "btn": "Copy Base64 data URI",
    "btn_title": "Copy SVG as a Base64 data URI",
    "faq_aria": "SVG to Base64 FAQ",
    "faqs": [
      ("How do I convert SVG to Base64 online?", "Paste or upload SVG, then click Copy Base64 data URI. The Data URI tab already shows data:image/svg+xml;base64,… — nothing is uploaded."),
      ("What does the sample SVG demonstrate?", "A compact star mark with viewBox only (no root width or height) so the encoded string stays short and scales in CSS or HTML."),
      ("Is SVG to Base64 the same as a data URI?", "Almost. This hub copies the full data URI. Open SVG to Base64 String if you only need the raw encoded characters."),
      ("Can I use the result in CSS and HTML?", "Yes. Use SVG to Base64 CSS or SVG to Base64 HTML Img for ready-to-paste snippets around the same encoding."),
    ],
    "note_html": '<span class="tool-note-pair">Raw string? <a href="/svg-to-base64-string">SVG to Base64 string</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">CSS snippet? <a href="/svg-to-base64-css">SVG to Base64 CSS</a></span>',
    "guides": [
      ("/svg-to-base64-string", "SVG to Base64 string →"),
      ("/svg-to-base64-data-uri", "SVG to Base64 data URI →"),
      ("/svg-to-base64-css", "SVG to Base64 CSS →"),
      ("/svg-to-base64-html", "SVG to Base64 HTML →"),
    ],
  },
  {
    "slug": "svg-to-base64-string",
    "title": "SVG to Base64 String Online — Free Tool | getsvgeditor.com",
    "description": "Convert SVG to a Base64 string online. Copy the raw encoded characters without a data: prefix — free browser tool, no upload.",
    "h1": "SVG to Base64 String",
    "crumb": "SVG to Base64 string",
    "sub": "Copy the <strong>raw Base64 string</strong> — no <code>data:</code> prefix",
    "og_alt": "Convert SVG to a raw Base64 string in SVGEditor",
    "app_name": "SVG to Base64 String",
    "app_alts": ["SVG to Base64 string", "SVG Base64 encode", "Raw SVG Base64", "SVG to Base64 characters"],
    "app_desc": "Free online tool to convert SVG to a raw Base64 string without a data URI prefix.",
    "features": ["Raw Base64 string", "No data: prefix", "Live preview", "No file upload"],
    "howto_name": "Convert SVG to a Base64 string",
    "howto_desc": "Encode SVG markup as raw Base64 characters for APIs and custom prefixes.",
    "howto_click": "Click Copy Base64 string. The output is only the encoded characters, not a data URI.",
    "btn": "Copy Base64 string",
    "btn_title": "Copy SVG as a raw Base64 string",
    "faq_aria": "SVG to Base64 string FAQ",
    "faqs": [
      ("How do I get a Base64 string from SVG?", "Paste the SVG and click Copy Base64 string. You get PHN2Zy… characters only — no data:image prefix."),
      ("When do I want the string instead of a data URI?", "Use the raw string when an API, JSON payload, or custom header already adds the MIME type for you."),
      ("Does the sample include width and height?", "No. Root width and height are omitted so the encoded string does not bake in fixed pixel size."),
      ("Need the data URI wrapper?", "Open SVG to Base64 Data URI to copy data:image/svg+xml;base64, plus the same string."),
    ],
    "note_html": '<span class="tool-note-pair">Full data URI? <a href="/svg-to-base64-data-uri">SVG to Base64 data URI</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Hub? <a href="/svg-to-base64">SVG to Base64</a></span>',
    "guides": [
      ("/svg-to-base64", "SVG to Base64 →"),
      ("/convert-svg-to-base64-string", "Convert SVG to Base64 string →"),
      ("/svg-image-to-base64-string", "SVG image to Base64 string →"),
      ("/svg-to-base64-data-uri", "SVG to Base64 data URI →"),
    ],
  },
  {
    "slug": "svg-to-base64-data-uri",
    "title": "SVG to Base64 Data URI Online — Free Tool | getsvgeditor.com",
    "description": "Convert SVG to a Base64 data URI online. Copy data:image/svg+xml;base64,… for img src or CSS — free, no upload.",
    "h1": "SVG to Base64 Data URI",
    "crumb": "SVG to Base64 data URI",
    "sub": "Copy <code>data:image/svg+xml;base64,...</code> ready for <code>src</code> or <code>url()</code>",
    "og_alt": "Convert SVG to a Base64 data URI in SVGEditor",
    "app_name": "SVG to Base64 Data URI",
    "app_alts": ["SVG to Base64 data URI", "SVG data URI Base64", "data:image/svg+xml;base64", "SVG Base64 data URL"],
    "app_desc": "Free online tool to convert SVG to a Base64 data URI (data:image/svg+xml;base64,...).",
    "features": ["Base64 data URI", "Works in img src and CSS url()", "Live preview", "No file upload"],
    "howto_name": "Convert SVG to a Base64 data URI",
    "howto_desc": "Encode SVG as a data:image/svg+xml;base64 URI for embedding.",
    "howto_click": "Click Copy Base64 data URI. Paste the result into an img src or CSS url().",
    "btn": "Copy Base64 data URI",
    "btn_title": "Copy SVG as a Base64 data URI",
    "faq_aria": "SVG to Base64 data URI FAQ",
    "faqs": [
      ("What is an SVG Base64 data URI?", "It is the SVG file encoded as Base64 after data:image/svg+xml;base64, so a browser can treat the string as an image without a separate file."),
      ("How do I convert SVG to a Base64 data URI?", "Paste the sample or your markup, then click Copy Base64 data URI. The Data URI tab stays on Base64 encoding."),
      ("Why is there no width or height on the sample?", "viewBox alone lets the image scale when you set CSS width/height on the host element. Fixed root size would fight that."),
      ("Want an HTML img tag around it?", "Use SVG to Base64 HTML Img to copy a complete <img src=\"data:…\"> snippet."),
    ],
    "note_html": '<span class="tool-note-pair">HTML img? <a href="/svg-to-base64-html-img">SVG to Base64 HTML img</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Raw string? <a href="/svg-to-base64-string">SVG to Base64 string</a></span>',
    "guides": [
      ("/svg-to-base64", "SVG to Base64 →"),
      ("/convert-svg-to-base64-data-uri", "Convert SVG to Base64 data URI →"),
      ("/svg-base64-data-uri-image", "SVG Base64 data URI image →"),
      ("/svg-to-base64-html-img", "SVG to Base64 HTML img →"),
    ],
  },
  {
    "slug": "svg-to-base64-css",
    "title": "SVG to Base64 CSS Online — Free Tool | getsvgeditor.com",
    "description": "Convert SVG to Base64 CSS online. Copy a background-image rule with a Base64 data URI — free browser tool, no upload.",
    "h1": "SVG to Base64 CSS",
    "crumb": "SVG to Base64 CSS",
    "sub": "Copy a <code>.icon { background-image: url(\"data:…\") }</code> rule",
    "og_alt": "Convert SVG to Base64 CSS in SVGEditor",
    "app_name": "SVG to Base64 CSS",
    "app_alts": ["SVG to Base64 CSS", "SVG CSS data URI", "CSS background SVG Base64", "Encode SVG for CSS"],
    "app_desc": "Free online tool to convert SVG to a CSS rule with a Base64 background-image data URI.",
    "features": ["CSS background-image snippet", "Base64 data URI", "Live preview", "No file upload"],
    "howto_name": "Convert SVG to Base64 CSS",
    "howto_desc": "Wrap an SVG Base64 data URI in a CSS background-image rule.",
    "howto_click": "Click Copy Base64 CSS. You get a class rule with background-image: url(\"data:image/svg+xml;base64,…\").",
    "btn": "Copy Base64 CSS",
    "btn_title": "Copy SVG as a CSS background-image rule",
    "faq_aria": "SVG to Base64 CSS FAQ",
    "faqs": [
      ("How do I put SVG in CSS as Base64?", "Paste the SVG and click Copy Base64 CSS. The snippet is a class with background-image: url(\"data:image/svg+xml;base64,…\")."),
      ("Should I use quotes around the data URI?", "Yes in this snippet. Double quotes wrap the url() value so the Base64 string stays one token."),
      ("Property only, not a class?", "Open SVG to Base64 CSS Background Image for a single background-image declaration."),
      ("Is url-encoded CSS smaller?", "Sometimes. This page stays on Base64 because that is the query intent. The Data URI tab still has a CSS (urlencoded) chip if you want to compare size."),
    ],
    "note_html": '<span class="tool-note-pair">Declaration only? <a href="/svg-to-base64-css-background-image">CSS background-image</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Shorthand? <a href="/svg-to-base64-css-background">CSS background</a></span>',
    "guides": [
      ("/svg-to-base64", "SVG to Base64 →"),
      ("/svg-to-base64-css-background-image", "CSS background-image →"),
      ("/svg-to-base64-css-background", "CSS background →"),
      ("/convert-svg-to-base64-css", "Convert SVG to Base64 CSS →"),
    ],
  },
  {
    "slug": "svg-to-base64-html",
    "title": "SVG to Base64 HTML Online — Free Tool | getsvgeditor.com",
    "description": "Convert SVG to Base64 HTML online. Copy an img tag whose src is a Base64 data URI — free, no upload.",
    "h1": "SVG to Base64 HTML",
    "crumb": "SVG to Base64 HTML",
    "sub": "Copy an <code>&lt;img&gt;</code> whose <code>src</code> is a Base64 data URI",
    "og_alt": "Convert SVG to Base64 HTML in SVGEditor",
    "app_name": "SVG to Base64 HTML",
    "app_alts": ["SVG to Base64 HTML", "SVG Base64 img tag", "Embed SVG as Base64 HTML", "Inline SVG image HTML"],
    "app_desc": "Free online tool to convert SVG to an HTML img tag with a Base64 data URI src.",
    "features": ["HTML img snippet", "Base64 src", "Live preview", "No file upload"],
    "howto_name": "Convert SVG to Base64 HTML",
    "howto_desc": "Embed SVG as an HTML img with a Base64 data URI src.",
    "howto_click": "Click Copy Base64 HTML. You get <img src=\"data:image/svg+xml;base64,…\" alt=\"\" />.",
    "btn": "Copy Base64 HTML",
    "btn_title": "Copy SVG as an HTML img with Base64 src",
    "faq_aria": "SVG to Base64 HTML FAQ",
    "faqs": [
      ("How do I embed SVG as Base64 in HTML?", "Paste the SVG and click Copy Base64 HTML. The snippet is an img tag with a data URI src."),
      ("Why img instead of inline <svg>?", "A data URI img is one attribute — useful in CMS fields, emails that allow data URIs, or when the host only accepts an image URL."),
      ("Does the img keep SVG sharpness?", "Yes at any CSS size, because the payload is still vector. Set width/height on the img, not on the root SVG."),
      ("Need the img wording more specific?", "SVG to Base64 HTML Img uses the same snippet with img-focused copy."),
    ],
    "note_html": '<span class="tool-note-pair">Img-focused? <a href="/svg-to-base64-html-img">SVG to Base64 HTML img</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Data URI only? <a href="/svg-to-base64-data-uri">SVG to Base64 data URI</a></span>',
    "guides": [
      ("/svg-to-base64", "SVG to Base64 →"),
      ("/svg-to-base64-html-img", "SVG to Base64 HTML img →"),
      ("/convert-svg-to-base64-html", "Convert SVG to Base64 HTML →"),
      ("/svg-to-base64-data-uri", "SVG to Base64 data URI →"),
    ],
  },
  {
    "slug": "svg-to-base64-css-background-image",
    "title": "SVG to Base64 CSS Background-Image — Free Tool | getsvgeditor.com",
    "description": "Convert SVG to a CSS background-image Base64 data URI. Copy background-image: url(\"data:…\") — free, no upload.",
    "h1": "SVG to Base64 CSS Background-Image",
    "crumb": "CSS background-image",
    "sub": "Copy a single <code>background-image: url(\"data:…\")</code> declaration",
    "og_alt": "Convert SVG to CSS background-image Base64 in SVGEditor",
    "app_name": "SVG to Base64 CSS Background-Image",
    "app_alts": ["SVG CSS background-image Base64", "background-image data URI SVG", "SVG to CSS background-image", "Base64 SVG background-image"],
    "app_desc": "Free online tool to convert SVG to a CSS background-image declaration with a Base64 data URI.",
    "features": ["background-image declaration", "Base64 data URI", "Live preview", "No file upload"],
    "howto_name": "Convert SVG to a CSS background-image data URI",
    "howto_desc": "Copy a background-image: url() line using Base64-encoded SVG.",
    "howto_click": "Click Copy background-image. Paste the declaration into any CSS rule.",
    "btn": "Copy background-image",
    "btn_title": "Copy background-image: url(Base64 data URI)",
    "faq_aria": "SVG to Base64 CSS background-image FAQ",
    "faqs": [
      ("How do I set background-image from SVG Base64?", "Paste SVG and click Copy background-image. You get one declaration: background-image: url(\"data:image/svg+xml;base64,…\");"),
      ("Why not the background shorthand?", "background-image leaves size, position, and color free. Use SVG to Base64 CSS Background when you want center / contain in one line."),
      ("Will it tile by default?", "Yes — CSS repeats background images. Add background-repeat: no-repeat and a size if you want a single icon."),
      ("Need a full class block?", "SVG to Base64 CSS wraps the same URI in a .icon rule."),
    ],
    "note_html": '<span class="tool-note-pair">Shorthand? <a href="/svg-to-base64-css-background">CSS background</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Class rule? <a href="/svg-to-base64-css">SVG to Base64 CSS</a></span>',
    "guides": [
      ("/svg-to-base64-css", "SVG to Base64 CSS →"),
      ("/svg-to-base64-css-background", "CSS background →"),
      ("/svg-to-base64-css-data-uri", "CSS data URI →"),
      ("/svg-to-base64", "SVG to Base64 →"),
    ],
  },
  {
    "slug": "svg-to-base64-css-background",
    "title": "SVG to Base64 CSS Background — Free Tool | getsvgeditor.com",
    "description": "Convert SVG to a CSS background shorthand with Base64. Copy background: url(\"data:…\") center / contain no-repeat — free, no upload.",
    "h1": "SVG to Base64 CSS Background",
    "crumb": "CSS background",
    "sub": "Copy <code>background: url(\"data:…\") center / contain no-repeat</code>",
    "og_alt": "Convert SVG to CSS background shorthand Base64 in SVGEditor",
    "app_name": "SVG to Base64 CSS Background",
    "app_alts": ["SVG CSS background Base64", "CSS background data URI SVG", "SVG to CSS background", "Base64 SVG background shorthand"],
    "app_desc": "Free online tool to convert SVG to a CSS background shorthand with a centered, contained Base64 data URI.",
    "features": ["background shorthand", "center / contain no-repeat", "Base64 data URI", "No file upload"],
    "howto_name": "Convert SVG to a CSS background shorthand",
    "howto_desc": "Copy a background: url() center / contain no-repeat line with Base64 SVG.",
    "howto_click": "Click Copy CSS background. The shorthand centers the icon and avoids tiling.",
    "btn": "Copy CSS background",
    "btn_title": "Copy background shorthand with Base64 SVG",
    "faq_aria": "SVG to Base64 CSS background FAQ",
    "faqs": [
      ("What does the CSS background snippet include?", "url(), center, contain, and no-repeat so the SVG sits as one icon instead of a repeating tile."),
      ("How is this different from background-image?", "The shorthand also sets position, size, and repeat. background-image only sets the image."),
      ("Can I change contain to cover?", "Yes after you copy. Contain keeps the whole mark visible; cover fills the box and may crop."),
      ("Does the sample SVG have a fixed pixel size?", "No. Root width and height are omitted so contain/cover control the painted size."),
    ],
    "note_html": '<span class="tool-note-pair">Image only? <a href="/svg-to-base64-css-background-image">CSS background-image</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Class? <a href="/svg-to-base64-css">SVG to Base64 CSS</a></span>',
    "guides": [
      ("/svg-to-base64-css-background-image", "CSS background-image →"),
      ("/svg-to-base64-css", "SVG to Base64 CSS →"),
      ("/svg-to-base64-css-data-uri", "CSS data URI →"),
      ("/svg-to-base64", "SVG to Base64 →"),
    ],
  },
  {
    "slug": "svg-to-base64-css-data-uri",
    "title": "SVG to Base64 CSS Data URI Online — Free Tool | getsvgeditor.com",
    "description": "Convert SVG to a Base64 CSS data URI online. Copy url(\"data:image/svg+xml;base64,…\") for stylesheets — free, no upload.",
    "h1": "SVG to Base64 CSS Data URI",
    "crumb": "CSS data URI",
    "sub": "Copy <code>url(\"data:image/svg+xml;base64,…\")</code> for any CSS property",
    "og_alt": "Convert SVG to a CSS data URI in SVGEditor",
    "app_name": "SVG to Base64 CSS Data URI",
    "app_alts": ["SVG CSS data URI", "url() Base64 SVG", "CSS data URI SVG", "SVG to CSS url data URI"],
    "app_desc": "Free online tool to convert SVG to a CSS url() data URI using Base64.",
    "features": ["CSS url() data URI", "Reusable in any property", "Live preview", "No file upload"],
    "howto_name": "Convert SVG to a CSS data URI",
    "howto_desc": "Copy url(\"data:image/svg+xml;base64,…\") for list-style-image, mask-image, or content.",
    "howto_click": "Click Copy CSS data URI. Paste url(\"…\") into background-image, mask-image, or content.",
    "btn": "Copy CSS data URI",
    "btn_title": "Copy url() with a Base64 SVG data URI",
    "faq_aria": "SVG to Base64 CSS data URI FAQ",
    "faqs": [
      ("What is a CSS data URI for SVG?", "The string url(\"data:image/svg+xml;base64,…\") that CSS accepts anywhere a url() image is allowed."),
      ("Where can I paste it besides background-image?", "mask-image, list-style-image, border-image, and generated-content content: url() all accept it."),
      ("Why Base64 instead of UTF-8 in the URI?", "Base64 is what this intent asks for. It avoids quote-escaping SVG markup inside CSS."),
      ("Want the property name included?", "Use SVG to Base64 CSS Background Image for a full declaration."),
    ],
    "note_html": '<span class="tool-note-pair">Full rule? <a href="/svg-to-base64-css">SVG to Base64 CSS</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Declaration? <a href="/svg-to-base64-css-background-image">background-image</a></span>',
    "guides": [
      ("/svg-to-base64-css", "SVG to Base64 CSS →"),
      ("/svg-to-base64-css-background-image", "CSS background-image →"),
      ("/convert-svg-to-base64-css", "Convert SVG to Base64 CSS →"),
      ("/svg-to-base64-data-uri", "SVG to Base64 data URI →"),
    ],
  },
  {
    "slug": "convert-svg-to-base64-css",
    "title": "Convert SVG to Base64 CSS Online — Free Tool | getsvgeditor.com",
    "description": "Convert SVG to Base64 CSS in one click. Paste SVG and copy a stylesheet-ready background-image rule — free, no upload.",
    "h1": "Convert SVG to Base64 CSS",
    "crumb": "Convert to Base64 CSS",
    "sub": "One-click convert: SVG in, <strong>CSS rule</strong> with Base64 <code>url()</code> out",
    "og_alt": "Convert SVG to Base64 CSS rule in SVGEditor",
    "app_name": "Convert SVG to Base64 CSS",
    "app_alts": ["Convert SVG to Base64 CSS", "SVG to CSS Base64 converter", "Encode SVG for stylesheet", "SVG CSS converter Base64"],
    "app_desc": "Free converter from SVG markup to a CSS class using a Base64 data URI.",
    "features": ["One-click CSS convert", "Base64 background-image", "Live preview", "No file upload"],
    "howto_name": "Convert SVG to Base64 CSS",
    "howto_desc": "Turn pasted SVG into a CSS class with a Base64 background-image.",
    "howto_click": "Click Convert to CSS. The Data URI panel shows the class rule; it is also copied.",
    "btn": "Convert to CSS",
    "btn_title": "Convert SVG to a CSS class with Base64 background-image",
    "faq_aria": "Convert SVG to Base64 CSS FAQ",
    "faqs": [
      ("How do I convert SVG to Base64 CSS?", "Paste the SVG and click Convert to CSS. A .icon rule with background-image is copied and shown in the Data URI tab."),
      ("Is convert different from the CSS page?", "Same encoding. This page uses convert wording and a convert button for people searching that verb."),
      ("Can I rename .icon?", "Yes. The class name is a starter — change it after paste to match your design system."),
      ("Need only url()?", "Open SVG to Base64 CSS Data URI."),
    ],
    "note_html": '<span class="tool-note-pair">CSS hub? <a href="/svg-to-base64-css">SVG to Base64 CSS</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">url() only? <a href="/svg-to-base64-css-data-uri">CSS data URI</a></span>',
    "guides": [
      ("/svg-to-base64-css", "SVG to Base64 CSS →"),
      ("/svg-to-base64-css-data-uri", "CSS data URI →"),
      ("/svg-to-base64-css-background", "CSS background →"),
      ("/svg-to-base64", "SVG to Base64 →"),
    ],
  },
  {
    "slug": "convert-svg-to-base64-string",
    "title": "Convert SVG to Base64 String Online — Free Tool | getsvgeditor.com",
    "description": "Convert SVG to a Base64 string in one click. Copy raw encoded characters for APIs and payloads — free, no upload.",
    "h1": "Convert SVG to Base64 String",
    "crumb": "Convert to Base64 string",
    "sub": "One-click convert: SVG in, <strong>raw Base64 characters</strong> out",
    "og_alt": "Convert SVG to a Base64 string in SVGEditor",
    "app_name": "Convert SVG to Base64 String",
    "app_alts": ["Convert SVG to Base64 string", "SVG Base64 converter", "Encode SVG string", "SVG to Base64 encode"],
    "app_desc": "Free converter from SVG markup to a raw Base64 string.",
    "features": ["One-click string convert", "Raw Base64 output", "Live preview", "No file upload"],
    "howto_name": "Convert SVG to a Base64 string",
    "howto_desc": "Turn pasted SVG into raw Base64 characters with one click.",
    "howto_click": "Click Convert to string. The panel shows PHN2Zy… without a data: prefix.",
    "btn": "Convert to string",
    "btn_title": "Convert SVG to a raw Base64 string",
    "faq_aria": "Convert SVG to Base64 string FAQ",
    "faqs": [
      ("How do I convert SVG to a Base64 string?", "Paste markup and click Convert to string. The clipboard gets only the encoded characters."),
      ("Will UTF-8 in the SVG survive encoding?", "Yes. The encoder uses UTF-8 then Base64, so text and non-ASCII attributes stay intact."),
      ("Convert vs SVG to Base64 String?", "Same output. This page matches convert-style searches; the other matches to-string wording."),
      ("Need an image-focused sample?", "SVG Image to Base64 String uses a picture-frame sample and the same raw string output."),
    ],
    "note_html": '<span class="tool-note-pair">To-string wording? <a href="/svg-to-base64-string">SVG to Base64 string</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Image sample? <a href="/svg-image-to-base64-string">SVG image to Base64 string</a></span>',
    "guides": [
      ("/svg-to-base64-string", "SVG to Base64 string →"),
      ("/svg-image-to-base64-string", "SVG image to Base64 string →"),
      ("/convert-svg-to-base64-data-uri", "Convert to data URI →"),
      ("/svg-to-base64", "SVG to Base64 →"),
    ],
  },
  {
    "slug": "svg-image-to-base64-string",
    "title": "SVG Image to Base64 String Online — Free Tool | getsvgeditor.com",
    "description": "Convert an SVG image to a Base64 string online. Encode a vector image as raw Base64 — free browser tool, no upload.",
    "h1": "SVG Image to Base64 String",
    "crumb": "SVG image to Base64 string",
    "sub": "Encode an <strong>SVG image</strong> as a raw Base64 string",
    "og_alt": "Convert an SVG image to a Base64 string in SVGEditor",
    "app_name": "SVG Image to Base64 String",
    "app_alts": ["SVG image to Base64 string", "Encode SVG image Base64", "Vector image Base64", "SVG picture to Base64"],
    "app_desc": "Free online tool to convert an SVG image to a raw Base64 string.",
    "features": ["SVG image sample", "Raw Base64 string", "Live preview", "No file upload"],
    "howto_name": "Convert an SVG image to a Base64 string",
    "howto_desc": "Encode a vector image (not a raster PNG) as raw Base64.",
    "howto_click": "Click Copy image Base64. Output is the raw string for the SVG image markup.",
    "btn": "Copy image Base64",
    "btn_title": "Copy the SVG image as a raw Base64 string",
    "faq_aria": "SVG image to Base64 string FAQ",
    "faqs": [
      ("Does this convert a PNG, or SVG?", "SVG only. The sample is a vector picture frame. Upload another .svg if you want a different image encoded."),
      ("How do I turn an SVG image into a Base64 string?", "Paste or use the sample, then click Copy image Base64. You get raw Base64, not a data URI."),
      ("Why a picture-frame sample?", "It makes the image intent obvious in preview. The encoding is the same for any SVG graphic."),
      ("Want a data URI for an image src?", "Use SVG Base64 Data URI Image."),
    ],
    "note_html": '<span class="tool-note-pair">Data URI image? <a href="/svg-base64-data-uri-image">SVG Base64 data URI image</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Generic string? <a href="/svg-to-base64-string">SVG to Base64 string</a></span>',
    "guides": [
      ("/svg-to-base64-string", "SVG to Base64 string →"),
      ("/convert-svg-to-base64-string", "Convert to Base64 string →"),
      ("/svg-base64-data-uri-image", "SVG Base64 data URI image →"),
      ("/svg-to-base64-html-img", "SVG to Base64 HTML img →"),
    ],
  },
  {
    "slug": "convert-svg-to-base64-data-uri",
    "title": "Convert SVG to Base64 Data URI Online — Free Tool | getsvgeditor.com",
    "description": "Convert SVG to a Base64 data URI in one click. Copy data:image/svg+xml;base64,… — free, no upload.",
    "h1": "Convert SVG to Base64 Data URI",
    "crumb": "Convert to data URI",
    "sub": "One-click convert: SVG in, <code>data:image/svg+xml;base64,...</code> out",
    "og_alt": "Convert SVG to a Base64 data URI in SVGEditor",
    "app_name": "Convert SVG to Base64 Data URI",
    "app_alts": ["Convert SVG to Base64 data URI", "SVG to data URI converter", "Encode SVG data URI", "SVG Base64 data URL convert"],
    "app_desc": "Free converter from SVG markup to a Base64 data URI.",
    "features": ["One-click data URI convert", "Base64 encoding", "Live preview", "No file upload"],
    "howto_name": "Convert SVG to a Base64 data URI",
    "howto_desc": "Turn pasted SVG into data:image/svg+xml;base64,… with one click.",
    "howto_click": "Click Convert to data URI. The string is copied and shown in the Data URI tab.",
    "btn": "Convert to data URI",
    "btn_title": "Convert SVG to a Base64 data URI",
    "faq_aria": "Convert SVG to Base64 data URI FAQ",
    "faqs": [
      ("How do I convert SVG to a Base64 data URI?", "Paste the SVG and click Convert to data URI. The result starts with data:image/svg+xml;base64,"),
      ("Convert vs SVG to Base64 Data URI?", "Same payload. This page uses convert wording; the other uses to-data-URI wording."),
      ("Can I switch to urlencoded?", "The chip is there for comparison. This intent copies Base64 because that is what the query asks for."),
      ("Need an image-oriented sample?", "SVG Base64 Data URI Image uses a photo-mark sample and the same URI shape."),
    ],
    "note_html": '<span class="tool-note-pair">To-data-URI wording? <a href="/svg-to-base64-data-uri">SVG to Base64 data URI</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Image sample? <a href="/svg-base64-data-uri-image">Data URI image</a></span>',
    "guides": [
      ("/svg-to-base64-data-uri", "SVG to Base64 data URI →"),
      ("/svg-base64-data-uri-image", "SVG Base64 data URI image →"),
      ("/convert-svg-to-base64-string", "Convert to string →"),
      ("/svg-to-base64", "SVG to Base64 →"),
    ],
  },
  {
    "slug": "svg-base64-data-uri-image",
    "title": "SVG Base64 Data URI Image Online — Free Tool | getsvgeditor.com",
    "description": "Turn an SVG into a Base64 data URI image. Copy data:image/svg+xml;base64,… for image sources — free, no upload.",
    "h1": "SVG Base64 Data URI Image",
    "crumb": "Base64 data URI image",
    "sub": "Copy a <strong>data URI image</strong> string for any <code>src</code> that accepts images",
    "og_alt": "SVG as a Base64 data URI image in SVGEditor",
    "app_name": "SVG Base64 Data URI Image",
    "app_alts": ["SVG Base64 data URI image", "SVG data URI image", "Base64 SVG image src", "SVG as data URI image"],
    "app_desc": "Free online tool to encode an SVG as a Base64 data URI image string.",
    "features": ["Data URI image string", "Image-oriented sample", "Live preview", "No file upload"],
    "howto_name": "Encode SVG as a Base64 data URI image",
    "howto_desc": "Copy a data URI you can drop into any image src.",
    "howto_click": "Click Copy image data URI. Use it anywhere an image URL is accepted.",
    "btn": "Copy image data URI",
    "btn_title": "Copy SVG as a Base64 data URI image",
    "faq_aria": "SVG Base64 data URI image FAQ",
    "faqs": [
      ("What is a data URI image from SVG?", "A string that starts with data:image/svg+xml;base64, and decodes to the vector graphic — browsers treat it like an image file."),
      ("How do I copy an SVG as a data URI image?", "Use the photo-mark sample or paste your SVG, then click Copy image data URI."),
      ("Is this a raster image?", "No. The MIME type is image/svg+xml, so it stays vector. For PNG, use the PNG tab instead."),
      ("Want an img tag around the URI?", "Open SVG to Base64 HTML Img."),
    ],
    "note_html": '<span class="tool-note-pair">HTML img? <a href="/svg-to-base64-html-img">SVG to Base64 HTML img</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Generic URI? <a href="/svg-to-base64-data-uri">SVG to Base64 data URI</a></span>',
    "guides": [
      ("/svg-to-base64-data-uri", "SVG to Base64 data URI →"),
      ("/convert-svg-to-base64-data-uri", "Convert to data URI →"),
      ("/svg-image-to-base64-string", "SVG image to Base64 string →"),
      ("/svg-to-base64-html-img", "SVG to Base64 HTML img →"),
    ],
  },
  {
    "slug": "convert-svg-to-base64-html",
    "title": "Convert SVG to Base64 HTML Online — Free Tool | getsvgeditor.com",
    "description": "Convert SVG to Base64 HTML in one click. Copy an img tag with a Base64 data URI src — free, no upload.",
    "h1": "Convert SVG to Base64 HTML",
    "crumb": "Convert to Base64 HTML",
    "sub": "One-click convert: SVG in, <code>&lt;img src=\"data:…\"&gt;</code> out",
    "og_alt": "Convert SVG to Base64 HTML in SVGEditor",
    "app_name": "Convert SVG to Base64 HTML",
    "app_alts": ["Convert SVG to Base64 HTML", "SVG to HTML Base64 converter", "SVG img data URI convert", "Encode SVG as HTML img"],
    "app_desc": "Free converter from SVG markup to an HTML img tag with a Base64 src.",
    "features": ["One-click HTML convert", "img with Base64 src", "Live preview", "No file upload"],
    "howto_name": "Convert SVG to Base64 HTML",
    "howto_desc": "Turn pasted SVG into an HTML img tag with a Base64 data URI.",
    "howto_click": "Click Convert to HTML. An img tag is copied and shown in the Data URI tab.",
    "btn": "Convert to HTML",
    "btn_title": "Convert SVG to an HTML img with Base64 src",
    "faq_aria": "Convert SVG to Base64 HTML FAQ",
    "faqs": [
      ("How do I convert SVG to Base64 HTML?", "Paste the SVG and click Convert to HTML. You get <img src=\"data:image/svg+xml;base64,…\" alt=\"\" />."),
      ("Should I fill in alt text?", "Yes before shipping. The empty alt is a placeholder so you can describe the graphic for assistive tech."),
      ("Convert vs SVG to Base64 HTML?", "Same snippet. This page matches convert searches."),
      ("Need img-specific wording?", "SVG to Base64 HTML Img."),
    ],
    "note_html": '<span class="tool-note-pair">HTML hub? <a href="/svg-to-base64-html">SVG to Base64 HTML</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">Img wording? <a href="/svg-to-base64-html-img">SVG to Base64 HTML img</a></span>',
    "guides": [
      ("/svg-to-base64-html", "SVG to Base64 HTML →"),
      ("/svg-to-base64-html-img", "SVG to Base64 HTML img →"),
      ("/convert-svg-to-base64-data-uri", "Convert to data URI →"),
      ("/svg-to-base64", "SVG to Base64 →"),
    ],
  },
  {
    "slug": "svg-to-base64-html-img",
    "title": "SVG to Base64 HTML Img Online — Free Tool | getsvgeditor.com",
    "description": "Convert SVG to a Base64 HTML img tag. Copy <img src=\"data:image/svg+xml;base64,…\"> — free browser tool, no upload.",
    "h1": "SVG to Base64 HTML Img",
    "crumb": "SVG to Base64 HTML img",
    "sub": "Copy <code>&lt;img src=\"data:image/svg+xml;base64,…\"&gt;</code> ready to drop in markup",
    "og_alt": "Convert SVG to a Base64 HTML img tag in SVGEditor",
    "app_name": "SVG to Base64 HTML Img",
    "app_alts": ["SVG to Base64 HTML img", "SVG img Base64", "HTML img data URI SVG", "Inline SVG img Base64"],
    "app_desc": "Free online tool to convert SVG to an HTML img element with a Base64 data URI.",
    "features": ["HTML img tag", "Base64 data URI src", "Live preview", "No file upload"],
    "howto_name": "Convert SVG to a Base64 HTML img",
    "howto_desc": "Copy an img element whose src is a Base64 SVG data URI.",
    "howto_click": "Click Copy HTML img. Paste the tag into HTML; add alt text before production.",
    "btn": "Copy HTML img",
    "btn_title": "Copy an HTML img tag with Base64 SVG src",
    "faq_aria": "SVG to Base64 HTML img FAQ",
    "faqs": [
      ("How do I make an HTML img from SVG Base64?", "Paste SVG and click Copy HTML img. The tag uses src=\"data:image/svg+xml;base64,…\"."),
      ("Do I need width and height on the img?", "Optional. The sample SVG has no root width/height, so you size the img in HTML or CSS."),
      ("Will this work in Markdown?", "If the host allows data URI images, yes. Many READMEs block them — then keep a .svg file instead."),
      ("Want the URI without the tag?", "SVG Base64 Data URI Image copies only the image string."),
    ],
    "note_html": '<span class="tool-note-pair">HTML hub? <a href="/svg-to-base64-html">SVG to Base64 HTML</a></span><span class="tool-note-sep" aria-hidden="true"> · </span><span class="tool-note-pair">URI only? <a href="/svg-base64-data-uri-image">Data URI image</a></span>',
    "guides": [
      ("/svg-to-base64-html", "SVG to Base64 HTML →"),
      ("/convert-svg-to-base64-html", "Convert to Base64 HTML →"),
      ("/svg-base64-data-uri-image", "Data URI image →"),
      ("/svg-to-base64", "SVG to Base64 →"),
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
        'class="app-page tool-page clean-tool-page" data-clean-intent="optimize-svg-file" data-mobile-mode="preview" data-default-tab="preview"',
        f'class="app-page tool-page base64-tool-page" data-base64-intent="{slug}" data-mobile-mode="preview" data-default-tab="data-uri"',
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
        f'''<button
              type="button"
              class="btn btn-accent"
              id="btn-base64-action"
              title="{esc(p["btn_title"])}"
            >
              {esc(p["btn"])}</button>''',
        text,
        count=1,
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
        '"name": "Paste or use the sample SVG",\n                "text": "Open the tool with the sample graphic (viewBox only, no root width or height), or paste your own SVG into Source."',
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
        '"name": "Paste the result",\n                "text": "Drop the copied Base64, data URI, CSS, or HTML into your project. Conversion stays in the browser."',
        text,
        count=1,
    )

    text = text.replace(
        "Paste or upload an SVG in the Source panel. Download a transparent PNG from the PNG\n                    tab — or export to React and share a link.",
        "Paste or upload an SVG. The Data URI tab shows the Base64 result for this page’s intent.",
    )
    text = text.replace(
        '<a href="/blog/svg-to-png">PNG guide</a>',
        '<a href="/svg-to-base64">SVG to Base64</a>',
    )

    out = root / f"{slug}.html"
    out.write_text(text, encoding="utf-8")
    print("wrote", out.name)
    return out


def main():
    assert len(PAGES) == 15
    for p in PAGES:
        build_page(p)
    print("done", len(PAGES))


if __name__ == "__main__":
    main()
