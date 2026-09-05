/* Long-tail tool intents — maps + pure transforms (loaded before script.js).
 * DOM wiring runs via initBatchLongtailIntents() after the editor exists.
 */
/* eslint-disable no-var */
var BATCH_RAINBOW_COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#a855f7",
];
var BATCH_MULTI_COLORS = ["#0ea5e9", "#a855f7", "#f43f5e", "#22c55e", "#f59e0b"];

var BATCH_GRADIENT_DEFAULT_SVGS = {
  "svg-gradient-stroke-code-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120" role="img" aria-label="Stroke ready for gradient">\n' +
    '  <rect x="24" y="28" width="172" height="64" rx="18" fill="none" stroke="#0ea5e9" stroke-width="10"/>\n' +
    "</svg>",
  "svg-gradient-border-css-code-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120" role="img" aria-label="Border for CSS gradient snippet">\n' +
    '  <rect x="20" y="24" width="180" height="72" rx="20" fill="none" stroke="#38bdf8" stroke-width="12"/>\n' +
    "</svg>",
  "svg-linear-gradient-stroke-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120" role="img" aria-label="Linear gradient stroke sample">\n' +
    '  <path d="M28 88 L70 32 H150 L192 88 Z" fill="none" stroke="#0ea5e9" stroke-width="10" stroke-linejoin="round"/>\n' +
    "</svg>",
  "svg-radial-gradient-stroke-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" role="img" aria-label="Radial gradient stroke sample">\n' +
    '  <circle cx="90" cy="90" r="58" fill="none" stroke="#a855f7" stroke-width="12"/>\n' +
    "</svg>",
  "svg-linear-gradient-stroke-code-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120" role="img" aria-label="Linear stroke code sample">\n' +
    '  <ellipse cx="110" cy="60" rx="78" ry="36" fill="none" stroke="#22d3ee" stroke-width="10"/>\n' +
    "</svg>",
  "svg-circle-gradient-stroke-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-label="Circle gradient stroke">\n' +
    '  <circle cx="80" cy="80" r="52" fill="none" stroke="#0ea5e9" stroke-width="12"/>\n' +
    "</svg>",
  "svg-path-gradient-stroke-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140" role="img" aria-label="Path gradient stroke">\n' +
    '  <path d="M24 100 C60 20 140 20 176 100" fill="none" stroke="#38bdf8" stroke-width="10" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-icon-gradient-stroke-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Icon gradient stroke">\n' +
    '  <path d="M28 62 L48 28 L68 62 Z" fill="none" stroke="#0ea5e9" stroke-width="8" stroke-linejoin="round"/>\n' +
    '  <circle cx="48" cy="68" r="10" fill="none" stroke="#0ea5e9" stroke-width="8"/>\n' +
    "</svg>",
  "svg-rounded-rectangle-gradient-border-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 140" role="img" aria-label="Rounded rect gradient border">\n' +
    '  <rect x="24" y="24" width="192" height="92" rx="28" fill="none" stroke="#22d3ee" stroke-width="12"/>\n' +
    "</svg>",
  "svg-rainbow-gradient-stroke-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="Rainbow stroke sample">\n' +
    '  <path d="M28 88 Q120 8 212 88" fill="none" stroke="#94a3b8" stroke-width="12" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-multicolor-stroke-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120" role="img" aria-label="Multicolor stroke sample">\n' +
    '  <polyline points="24,90 70,30 120,78 170,34 196,90" fill="none" stroke="#64748b" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    "</svg>",
  "svg-gradient-border-generator-with-transparent-fill":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140" role="img" aria-label="Transparent fill gradient border">\n' +
    '  <rect x="28" y="28" width="164" height="84" rx="22" fill="none" stroke="#0ea5e9" stroke-width="12"/>\n' +
    "</svg>",
  "svg-gradient-border-generator-for-text":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" role="img" aria-label="Text gradient border sample">\n' +
    '  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-family="Syne, Segoe UI, sans-serif" font-size="48" font-weight="700" fill="#0ea5e9">Border</text>\n' +
    "</svg>",
  "responsive-svg-background-gradient-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Responsive background gradient frame">\n' +
    '  <rect data-svgeditor-bg="1" x="0" y="0" width="320" height="180" rx="18" fill="#0f172a"/>\n' +
    '  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" fill="#e2e8f0" font-family="Syne, Segoe UI, sans-serif" font-size="26" font-weight="700">Background</text>\n' +
    "</svg>",
};

var BATCH_CLEAN_DEFAULT_SVGS = {
  "sanitize-svg-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" role="img" aria-label="SVG with demo hazards — click Sanitize">\n' +
    '  <rect x="20" y="24" width="160" height="72" rx="14" fill="#0ea5e9" onclick="alert(1)"/>\n' +
    '  <text x="100" y="68" text-anchor="middle" fill="#031018" font-family="Segoe UI,sans-serif" font-size="16" font-weight="700">sanitize me</text>\n' +
    "  <script>/* demo inert */<\/script>\n" +
    '  <foreignObject x="8" y="8" width="40" height="20"><div xmlns="http://www.w3.org/1999/xhtml">demo</div></foreignObject>\n' +
    "</svg>",
  "remove-script-from-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" role="img" aria-label="SVG with demo script — click Remove script">\n' +
    '  <circle cx="100" cy="60" r="36" fill="#22d3ee"/>\n' +
    "  <script type=\"text/javascript\">/* demo: remove me */<\/script>\n" +
    "</svg>",
  "remove-event-handlers-from-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" role="img" aria-label="SVG with onclick — click Remove handlers">\n' +
    '  <rect x="24" y="28" width="152" height="64" rx="16" fill="#0284c7" onclick="void(0)" onmouseover="void(0)"/>\n' +
    '  <text x="100" y="66" text-anchor="middle" fill="#e0f2fe" font-family="Segoe UI,sans-serif" font-size="16" font-weight="700" onclick="void(0)">handlers</text>\n' +
    "</svg>",
  "remove-embedded-html-from-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140" role="img" aria-label="SVG with foreignObject — click Remove HTML">\n' +
    '  <rect x="16" y="20" width="188" height="100" rx="14" fill="#0ea5e9"/>\n' +
    '  <foreignObject x="40" y="48" width="140" height="44"><div xmlns="http://www.w3.org/1999/xhtml" style="font:700 16px sans-serif;color:#031018">demo</div></foreignObject>\n' +
    "</svg>",
  "remove-unused-svg-elements":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 140" role="img" aria-label="SVG with unused ids — click Remove unused">\n' +
    "  <defs>\n" +
    '    <linearGradient id="keep-grad" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#67e8f9"/><stop offset="1" stop-color="#2563eb"/></linearGradient>\n' +
    '    <linearGradient id="dead-grad" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#f43f5e"/><stop offset="1" stop-color="#fb7185"/></linearGradient>\n' +
    "  </defs>\n" +
    '  <circle id="hero" cx="80" cy="70" r="40" fill="url(#keep-grad)"/>\n' +
    '  <g id="empty-shell"></g>\n' +
    '  <path id="unused-spark" d="M20 20 H40" fill="none" stroke="#fff" opacity="0"/>\n' +
    "</svg>",
  "remove-unnecessary-svg-attributes":
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 160 110" inkscape:version="1.3" data-name="Layer 1" enable-background="new 0 0 160 110" role="img" aria-label="SVG with junk attrs — click Remove attrs">\n' +
    "  <metadata>tool leftovers</metadata>\n" +
    '  <rect x="20" y="22" width="120" height="66" rx="14" fill="#0ea5e9"/>\n' +
    "</svg>",
};

var BATCH_VIEWBOX_DEFAULT_SVGS = {
  "crop-svg-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" role="img" aria-label="Loose canvas — click Crop">\n' +
    '  <rect x="150" y="110" width="100" height="80" rx="12" fill="#0ea5e9"/>\n' +
    "</svg>",
  "crop-svg-canvas-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 280" role="img" aria-label="Canvas crop sample">\n' +
    '  <circle cx="180" cy="140" r="36" fill="#22d3ee"/>\n' +
    '  <path d="M150 140 H210" stroke="#031018" stroke-width="6" stroke-linecap="round"/>\n' +
    "</svg>",
  "crop-svg-to-selected-area":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" role="img" aria-label="Selected area crop sample">\n' +
    '  <rect x="40" y="40" width="40" height="40" fill="#64748b" opacity="0.35"/>\n' +
    '  <rect x="120" y="90" width="90" height="60" rx="10" fill="#38bdf8"/>\n' +
    "</svg>",
  "crop-svg-to-custom-dimensions":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" role="img" aria-label="Custom dimensions crop">\n' +
    '  <ellipse cx="150" cy="100" rx="50" ry="30" fill="#a855f7"/>\n' +
    "</svg>",
  "crop-svg-to-square":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" role="img" aria-label="Crop to square sample">\n' +
    '  <rect x="90" y="50" width="100" height="60" rx="8" fill="#0ea5e9"/>\n' +
    "</svg>",
  "crop-svg-to-circle":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" role="img" aria-label="Crop to circle sample">\n' +
    '  <rect x="60" y="40" width="120" height="100" fill="#22c55e"/>\n' +
    "</svg>",
  "crop-svg-to-specific-aspect-ratio":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Crop to 16:9 sample">\n' +
    '  <circle cx="100" cy="100" r="40" fill="#f59e0b"/>\n' +
    "</svg>",
  "crop-svg-without-changing-viewbox":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" role="img" aria-label="Clip without changing viewBox">\n' +
    '  <rect x="110" y="70" width="80" height="60" rx="10" fill="#0ea5e9"/>\n' +
    "</svg>",
  "remove-width-and-height-from-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" width="160" height="100" role="img" aria-label="Has width/height — click Remove">\n' +
    '  <rect x="20" y="20" width="120" height="60" rx="12" fill="#0284c7"/>\n' +
    "</svg>",
  "set-svg-width-height-from-viewbox":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="viewBox only — click Set width/height">\n' +
    '  <rect x="24" y="24" width="192" height="72" rx="14" fill="#0ea5e9"/>\n' +
    "</svg>",
  "add-viewbox-to-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Missing viewBox — click Add viewBox">\n' +
    '  <rect x="10" y="12" width="140" height="70" rx="12" fill="#22d3ee"/>\n' +
    '  <circle cx="160" cy="48" r="28" fill="#38bdf8"/>\n' +
    "</svg>",
};

var BATCH_VUE_DEFAULT_SVGS = {
  "svg-to-vue":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Icon for Vue SFC">\n' +
    '  <path fill="#42b883" d="M12 2 L2 20 H7 L12 10 L17 20 H22 Z"/>\n' +
    "</svg>",
  "convert-svg-icon-to-vue":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Convert icon to Vue">\n' +
    '  <circle cx="12" cy="12" r="9" fill="none" stroke="#42b883" stroke-width="2"/>\n' +
    '  <path d="M8 12 L11 15 L16 9" fill="none" stroke="#42b883" stroke-width="2" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-to-vue-typescript":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Vue TypeScript icon">\n' +
    '  <rect x="3" y="3" width="18" height="18" rx="4" fill="#35495e"/>\n' +
    '  <path d="M8 16 V8 H12" fill="none" stroke="#42b883" stroke-width="2"/>\n' +
    "</svg>",
  "svg-to-vue-composition-api":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Composition API icon">\n' +
    '  <path fill="#42b883" d="M4 18 L12 4 L20 18 H15 L12 12 L9 18 Z"/>\n' +
    "</svg>",
  "svg-to-vue-options-api":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Options API icon">\n' +
    '  <circle cx="12" cy="12" r="8" fill="#35495e"/>\n' +
    '  <circle cx="12" cy="12" r="3" fill="#42b883"/>\n' +
    "</svg>",
  "svg-to-vue-single-file-component":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="SFC icon">\n' +
    '  <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="#42b883" stroke-width="2"/>\n' +
    '  <path d="M8 9 H16 M8 12 H14 M8 15 H12" stroke="#42b883" stroke-width="1.5" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-to-vue-jsx":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Vue JSX icon">\n' +
    '  <path fill="#42b883" d="M5 19 L12 5 L19 19 H14.5 L12 13 L9.5 19 Z"/>\n' +
    "</svg>",
  "svg-to-vue-nuxt":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Nuxt icon sample">\n' +
    '  <path fill="#00DC82" d="M3 18 L9 6 L15 18 H3 Z"/>\n' +
    '  <path fill="#00DC82" opacity="0.55" d="M11 18 L15 10 L21 18 H11 Z"/>\n' +
    "</svg>",
};

var BATCH_ANIM_DEFAULT_SVGS = {
  "svg-animation-timing-function-editor":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" role="img" aria-label="Timing function sample">\n' +
    '  <rect x="70" y="40" width="60" height="40" rx="10" fill="#0ea5e9"/>\n' +
    "</svg>",
  "svg-animation-sequence-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 100" role="img" aria-label="Sequence animation sample">\n' +
    '  <circle cx="50" cy="50" r="18" fill="#0ea5e9"/>\n' +
    '  <circle cx="120" cy="50" r="18" fill="#22d3ee"/>\n' +
    '  <circle cx="190" cy="50" r="18" fill="#a855f7"/>\n' +
    "</svg>",
  "svg-animation-stagger-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 100" role="img" aria-label="Stagger animation sample">\n' +
    '  <rect x="30" y="30" width="40" height="40" rx="8" fill="#0ea5e9"/>\n' +
    '  <rect x="100" y="30" width="40" height="40" rx="8" fill="#22d3ee"/>\n' +
    '  <rect x="170" y="30" width="40" height="40" rx="8" fill="#38bdf8"/>\n' +
    "</svg>",
  "svg-animation-dasharray-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" role="img" aria-label="Dasharray animation sample">\n' +
    '  <path d="M24 80 C60 20 140 20 176 80" fill="none" stroke="#0ea5e9" stroke-width="8" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-animation-dashoffset-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" role="img" aria-label="Dashoffset animation sample">\n' +
    '  <circle cx="100" cy="60" r="36" fill="none" stroke="#22d3ee" stroke-width="8"/>\n' +
    "</svg>",
  "svg-drawing-animation-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140" role="img" aria-label="Drawing animation sample">\n' +
    '  <path d="M30 100 L70 40 L110 90 L160 35" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    "</svg>",
  "svg-reveal-animation-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" role="img" aria-label="Reveal animation sample">\n' +
    '  <rect x="40" y="30" width="120" height="60" rx="12" fill="#0ea5e9"/>\n' +
    "</svg>",
  "svg-spinner-animation-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Spinner sample">\n' +
    '  <circle cx="60" cy="60" r="36" fill="none" stroke="#334155" stroke-width="10"/>\n' +
    '  <circle cx="60" cy="60" r="36" fill="none" stroke="#0ea5e9" stroke-width="10" stroke-linecap="round" stroke-dasharray="40 200"/>\n' +
    "</svg>",
  "svg-pulse-animation-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Pulse sample">\n' +
    '  <circle cx="60" cy="60" r="28" fill="#0ea5e9"/>\n' +
    "</svg>",
  "svg-bounce-animation-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 140" role="img" aria-label="Bounce sample">\n' +
    '  <circle cx="60" cy="40" r="22" fill="#22d3ee"/>\n' +
    "</svg>",
  "svg-rotate-animation-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Rotate sample">\n' +
    '  <path d="M60 20 L72 50 H100 L78 68 L88 98 L60 80 L32 98 L42 68 L20 50 H48 Z" fill="#a855f7"/>\n' +
    "</svg>",
  "svg-scale-animation-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Scale sample">\n' +
    '  <rect x="35" y="35" width="50" height="50" rx="10" fill="#0ea5e9"/>\n' +
    "</svg>",
  "svg-floating-animation-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 140" role="img" aria-label="Floating sample">\n' +
    '  <ellipse cx="60" cy="70" rx="36" ry="24" fill="#38bdf8"/>\n' +
    "</svg>",
  "svg-wiggle-animation-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Wiggle sample">\n' +
    '  <path d="M30 70 Q60 30 90 70" fill="none" stroke="#f59e0b" stroke-width="10" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-shake-animation-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Shake sample">\n' +
    '  <rect x="35" y="40" width="50" height="40" rx="8" fill="#f43f5e"/>\n' +
    "</svg>",
  "svg-wave-animation-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" role="img" aria-label="Wave sample">\n' +
    '  <path d="M10 50 Q40 20 70 50 T130 50 T190 50" fill="none" stroke="#0ea5e9" stroke-width="8" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-animation-path-editor":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140" role="img" aria-label="Path motion sample">\n' +
    '  <path id="batch-motion-path" d="M30 100 C70 20 150 20 190 100" fill="none" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/>\n' +
    '  <circle r="10" fill="#0ea5e9"><animateMotion dur="3s" repeatCount="indefinite" path="M30 100 C70 20 150 20 190 100"/></circle>\n' +
    "</svg>",
};

var BATCH_STYLE_DEFAULT_SVGS = {
  "convert-svg-inline-styles-to-presentation-attributes":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" role="img" aria-label="Inline styles sample">\n' +
    '  <rect x="20" y="20" width="120" height="60" rx="12" style="fill:#0ea5e9;stroke:#031018;stroke-width:4"/>\n' +
    "</svg>",
  "convert-svg-presentation-attributes-to-inline-styles":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" role="img" aria-label="Presentation attrs sample">\n' +
    '  <circle cx="80" cy="50" r="32" fill="#22d3ee" stroke="#031018" stroke-width="4"/>\n' +
    "</svg>",
  "convert-svg-css-classes-to-attributes":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" role="img" aria-label="CSS class sample">\n' +
    "  <style>.mark{fill:#0ea5e9;stroke:#031018;stroke-width:3}</style>\n" +
    '  <rect class="mark" x="24" y="22" width="112" height="56" rx="12"/>\n' +
    "</svg>",
  "remove-style-tags-from-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" role="img" aria-label="Style tag sample">\n' +
    "  <style>rect{fill:#a855f7}</style>\n" +
    '  <rect x="24" y="22" width="112" height="56" rx="12" fill="#0ea5e9"/>\n' +
    "</svg>",
  "remove-hardcoded-fill-from-svg-paths":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Hardcoded fill paths">\n' +
    '  <path fill="#ef4444" d="M20 90 L60 20 L100 90 Z"/>\n' +
    '  <path fill="#3b82f6" d="M40 70 H80 V95 H40 Z"/>\n' +
    "</svg>",
  "convert-svg-fill-to-currentcolor":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Fill to currentColor">\n' +
    '  <circle cx="60" cy="60" r="36" fill="#0ea5e9"/>\n' +
    '  <path fill="#0284c7" d="M48 60 L58 70 L76 48" />\n' +
    "</svg>",
  "remove-empty-groups-from-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" role="img" aria-label="Empty groups sample">\n' +
    "  <g id=\"empty-a\"></g>\n" +
    '  <g><g></g></g>\n' +
    '  <rect x="30" y="24" width="80" height="52" rx="10" fill="#0ea5e9"/>\n' +
    "</svg>",
  "remove-unused-defs-from-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" role="img" aria-label="Unused defs sample">\n' +
    "  <defs>\n" +
    '    <linearGradient id="used"><stop stop-color="#67e8f9"/><stop offset="1" stop-color="#2563eb"/></linearGradient>\n' +
    '    <radialGradient id="unused"><stop stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>\n' +
    "  </defs>\n" +
    '  <rect x="24" y="28" width="92" height="64" rx="12" fill="url(#used)"/>\n' +
    "</svg>",
};

function batchBodyAttr(name) {
  return (document.body && document.body.getAttribute(name)) || "";
}

function getBatchLongtailStartup() {
  var gradient = batchBodyAttr("data-gradient-intent");
  if (gradient && BATCH_GRADIENT_DEFAULT_SVGS[gradient]) {
    return {
      svg: BATCH_GRADIENT_DEFAULT_SVGS[gradient],
      status: "Sample SVG — click the action button to apply a gradient stroke",
    };
  }
  var clean = batchBodyAttr("data-clean-intent");
  if (clean && BATCH_CLEAN_DEFAULT_SVGS[clean]) {
    return {
      svg: BATCH_CLEAN_DEFAULT_SVGS[clean],
      status: "Sample SVG — click the action button to sanitize / clean it",
    };
  }
  var viewbox = batchBodyAttr("data-viewbox-intent");
  if (viewbox && BATCH_VIEWBOX_DEFAULT_SVGS[viewbox]) {
    return {
      svg: BATCH_VIEWBOX_DEFAULT_SVGS[viewbox],
      status: "Sample SVG — click the action button to crop / fix viewBox",
    };
  }
  var vue = batchBodyAttr("data-vue-intent");
  if (vue && BATCH_VUE_DEFAULT_SVGS[vue]) {
    return {
      svg: BATCH_VUE_DEFAULT_SVGS[vue],
      status: "Sample SVG — click the action button to convert to Vue",
    };
  }
  var anim = batchBodyAttr("data-anim-intent");
  if (anim && BATCH_ANIM_DEFAULT_SVGS[anim]) {
    return {
      svg: BATCH_ANIM_DEFAULT_SVGS[anim],
      status: "Sample SVG — click the action button to add animation",
    };
  }
  var styleIntent = batchBodyAttr("data-style-intent");
  if (styleIntent && BATCH_STYLE_DEFAULT_SVGS[styleIntent]) {
    return {
      svg: BATCH_STYLE_DEFAULT_SVGS[styleIntent],
      status: "Sample SVG — click the action button to rewrite styles",
    };
  }
  return null;
}

function batchExtractSource(markup) {
  var source =
    typeof extractSvgMarkup === "function"
      ? extractSvgMarkup(markup) || String(markup || "").trim()
      : String(markup || "").trim();
  if (!source) throw new Error("Paste an SVG first");
  return source;
}

function batchParseSvgRaw(markup) {
  var source = batchExtractSource(markup);
  var parser = new DOMParser();
  var doc = parser.parseFromString(source, "image/svg+xml");
  if (doc.querySelector("parsererror")) throw new Error("Invalid SVG markup");
  var svg = doc.documentElement;
  if (!svg || String(svg.localName || "").toLowerCase() !== "svg") {
    throw new Error("Root element must be <svg>");
  }
  return document.importNode(svg, true);
}

function batchSerialize(svg) {
  var raw =
    typeof prettySerializeSvg === "function"
      ? prettySerializeSvg(svg)
      : new XMLSerializer().serializeToString(svg);
  return typeof formatSvgReadableMarkup === "function"
    ? formatSvgReadableMarkup(raw)
    : raw;
}

function batchStripRoot(svg) {
  if (typeof stripRootSvgSizeAttrs === "function") stripRootSvgSizeAttrs(svg);
  else {
    svg.removeAttribute("width");
    svg.removeAttribute("height");
  }
}

function batchEnsureDefs(svg) {
  if (typeof ensureSvgDefs === "function") return ensureSvgDefs(svg);
  var defs = svg.querySelector("defs");
  if (!defs) {
    defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svg.insertBefore(defs, svg.firstChild);
  }
  return defs;
}

function batchPaintStroke(svg, paint, strokeWidth, fillValue) {
  var tags = "path,rect,circle,ellipse,polygon,polyline,line,text";
  Array.prototype.forEach.call(svg.querySelectorAll(tags), function (el) {
    if (el.getAttribute("data-svgeditor-bg") === "1") return;
    el.setAttribute("stroke", paint);
    el.setAttribute("stroke-width", String(strokeWidth || 10));
    if (fillValue != null) el.setAttribute("fill", fillValue);
  });
}

function batchEnsureRoundedRect(svg) {
  var rect = svg.querySelector("rect");
  if (!rect) {
    Array.prototype.forEach.call(
      svg.querySelectorAll("path,circle,ellipse,polygon,polyline,line,text"),
      function (el) {
        if (el.parentNode) el.parentNode.removeChild(el);
      }
    );
    rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "24");
    rect.setAttribute("y", "24");
    rect.setAttribute("width", "192");
    rect.setAttribute("height", "92");
    rect.setAttribute("rx", "28");
    svg.appendChild(rect);
  }
  if (!rect.getAttribute("rx")) rect.setAttribute("rx", "24");
  return rect;
}

function batchEnsureCircle(svg) {
  var circle = svg.querySelector("circle");
  if (!circle) {
    Array.prototype.forEach.call(
      svg.querySelectorAll("path,rect,ellipse,polygon,polyline,line,text"),
      function (el) {
        if (el.parentNode) el.parentNode.removeChild(el);
      }
    );
    circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "80");
    circle.setAttribute("cy", "80");
    circle.setAttribute("r", "52");
    svg.appendChild(circle);
  }
  return circle;
}

function batchStrokeCssSnippet(colors, angle, borderMode) {
  var stops = (colors || []).join(", ");
  if (borderMode) {
    return (
      ".gradient-border {\n" +
      "  border: 4px solid transparent;\n" +
      "  border-image: linear-gradient(" +
      angle +
      "deg, " +
      stops +
      ") 1;\n" +
      "}"
    );
  }
  return (
    ".gradient-stroke {\n" +
    "  /* SVG stroke uses url(#svgeditor-grad); CSS recipe: */\n" +
    "  background: linear-gradient(" +
    angle +
    "deg, " +
    stops +
    ");\n" +
    "}"
  );
}

function applyBatchGradientStrokeMarkup(markup, intent, angleOverride) {
  if (!BATCH_GRADIENT_DEFAULT_SVGS[intent]) {
    throw new Error("Unknown gradient stroke intent");
  }
  var svg =
    typeof parseSvg === "function" ? parseSvg(markup) : batchParseSvgRaw(markup);
  batchStripRoot(svg);

  var isRadial = intent.indexOf("radial") !== -1;
  var isRainbow = intent.indexOf("rainbow") !== -1;
  var isMulti =
    intent.indexOf("multicolor") !== -1 || intent.indexOf("multi-color") !== -1;
  var isText = intent.indexOf("for-text") !== -1 || intent.indexOf("text") !== -1;
  var isBg = intent === "responsive-svg-background-gradient-generator";
  var isCircle = intent.indexOf("circle") !== -1;
  var isRounded = intent.indexOf("rounded-rectangle") !== -1;
  var isTransparent =
    intent.indexOf("transparent-fill") !== -1 ||
    intent.indexOf("border") !== -1 ||
    isText;
  var wantsCss =
    intent.indexOf("code") !== -1 || intent.indexOf("css") !== -1;

  var colors = isRainbow
    ? BATCH_RAINBOW_COLORS.slice()
    : isMulti
      ? BATCH_MULTI_COLORS.slice()
      : typeof nextGradientColors === "function"
        ? nextGradientColors(2)
        : ["#0ea5e9", "#a855f7"];
  var angle =
    angleOverride != null && Number.isFinite(angleOverride) ? angleOverride : 90;

  if (typeof removeGradientArtifacts === "function") removeGradientArtifacts(svg);
  var defs = batchEnsureDefs(svg);

  if (typeof createEditorGradient === "function") {
    createEditorGradient(defs, {
      kind: isRadial ? "radial" : "linear",
      colors: colors,
      angle: angle,
    });
  } else {
    var grad = document.createElementNS(
      "http://www.w3.org/2000/svg",
      isRadial ? "radialGradient" : "linearGradient"
    );
    grad.setAttribute("id", "svgeditor-grad");
    if (!isRadial) {
      grad.setAttribute("x1", "0%");
      grad.setAttribute("y1", "0%");
      grad.setAttribute("x2", "100%");
      grad.setAttribute("y2", "0%");
    }
    colors.forEach(function (c, i) {
      var stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      stop.setAttribute(
        "offset",
        String(colors.length === 1 ? 0 : (i / (colors.length - 1)) * 100) + "%"
      );
      stop.setAttribute("stop-color", c);
      grad.appendChild(stop);
    });
    defs.appendChild(grad);
  }

  var paint = "url(#svgeditor-grad)";
  if (isBg) {
    var rect =
      typeof ensureBackgroundRect === "function"
        ? ensureBackgroundRect(svg)
        : svg.querySelector("rect[data-svgeditor-bg]") ||
          svg.querySelector("rect");
    if (rect) rect.setAttribute("fill", paint);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  } else {
    if (isText && typeof ensureTextSample === "function") {
      ensureTextSample(svg, { label: "Border", fontSize: "48" });
    } else if (isRounded) {
      batchEnsureRoundedRect(svg);
    } else if (isCircle) {
      batchEnsureCircle(svg);
    }
    batchPaintStroke(
      svg,
      paint,
      isRainbow || isMulti ? 12 : 10,
      isTransparent || !isBg ? "none" : null
    );
    if (isText) {
      Array.prototype.forEach.call(svg.querySelectorAll("text"), function (t) {
        t.setAttribute("stroke", paint);
        t.setAttribute("stroke-width", "3");
        t.setAttribute("paint-order", "stroke fill");
        if (!t.getAttribute("fill") || t.getAttribute("fill") === paint) {
          t.setAttribute("fill", "none");
        }
      });
    }
  }

  var status = isBg
    ? "Responsive background gradient applied"
    : isRadial
      ? "Radial gradient stroke applied"
      : isRainbow
        ? "Rainbow gradient stroke applied"
        : isMulti
          ? "Multicolor gradient stroke applied"
          : "Gradient stroke applied";
  var snippet = "";
  if (wantsCss) {
    snippet = batchStrokeCssSnippet(
      colors,
      angle,
      intent.indexOf("border") !== -1
    );
  }

  return {
    markup: batchSerialize(svg),
    status: status,
    colors: colors,
    angle: angle,
    snippet: snippet,
  };
}

function batchRemoveOnAttrs(svg) {
  Array.prototype.forEach.call(
    [svg].concat(Array.from(svg.querySelectorAll("*"))),
    function (el) {
      if (!el.attributes) return;
      Array.from(el.attributes).forEach(function (attr) {
        if (/^on/i.test(attr.name)) el.removeAttribute(attr.name);
      });
    }
  );
}

function batchRemoveTags(svg, names) {
  var set = {};
  names.forEach(function (n) {
    set[n] = true;
  });
  Array.from(svg.querySelectorAll("*")).forEach(function (el) {
    var local = String(el.localName || "").toLowerCase();
    if (set[local] && el.parentNode) el.parentNode.removeChild(el);
  });
}

function applyBatchCleanSanitizeMarkup(markup, intent) {
  if (!BATCH_CLEAN_DEFAULT_SVGS[intent]) {
    throw new Error("Unknown clean sanitize intent");
  }
  var beforeLen = batchExtractSource(markup).length;
  var out;
  var status = "SVG cleaned";

  if (intent === "sanitize-svg-online") {
    var sanitized =
      typeof sanitizeSvgSource === "function"
        ? sanitizeSvgSource(markup)
        : typeof SvgSanitize !== "undefined"
          ? SvgSanitize.sanitizeMarkupOrThrow(batchExtractSource(markup))
          : batchExtractSource(markup);
    var svgSan =
      typeof parseSvg === "function" ? parseSvg(sanitized) : batchParseSvgRaw(sanitized);
    batchStripRoot(svgSan);
    out = batchSerialize(svgSan);
    status = "SVG sanitized — scripts, handlers, and unsafe nodes removed";
  } else if (intent === "remove-script-from-svg") {
    var svgScript = batchParseSvgRaw(markup);
    batchRemoveTags(svgScript, ["script"]);
    if (typeof SvgSanitize !== "undefined") {
      SvgSanitize.sanitizeElement(svgScript);
    }
    batchStripRoot(svgScript);
    out = batchSerialize(svgScript);
    status = "Script tags removed";
  } else if (intent === "remove-event-handlers-from-svg") {
    var svgEv = batchParseSvgRaw(markup);
    batchRemoveOnAttrs(svgEv);
    batchStripRoot(svgEv);
    out = batchSerialize(svgEv);
    status = "Event handler attributes removed";
  } else if (intent === "remove-embedded-html-from-svg") {
    var svgHtml = batchParseSvgRaw(markup);
    batchRemoveTags(svgHtml, [
      "foreignobject",
      "iframe",
      "embed",
      "object",
      "applet",
      "video",
      "audio",
    ]);
    batchStripRoot(svgHtml);
    out = batchSerialize(svgHtml);
    status = "Embedded HTML nodes removed";
  } else if (intent === "remove-unused-svg-elements") {
    var svgUnused =
      typeof parseSvg === "function" ? parseSvg(markup) : batchParseSvgRaw(markup);
    if (typeof removeUnusedSvgIds === "function") {
      removeUnusedSvgIds(svgUnused, { removeOrphanDefs: true });
    }
    if (typeof removeEmptySvgContainers === "function") {
      removeEmptySvgContainers(svgUnused);
    }
    batchStripRoot(svgUnused);
    out = batchSerialize(svgUnused);
    status = "Unused elements and empty groups removed";
  } else if (intent === "remove-unnecessary-svg-attributes") {
    var svgAttr =
      typeof parseSvg === "function" ? parseSvg(markup) : batchParseSvgRaw(markup);
    if (typeof stripSvgMetadataAndEditorJunk === "function") {
      stripSvgMetadataAndEditorJunk(svgAttr);
    }
    batchStripRoot(svgAttr);
    out = batchSerialize(svgAttr);
    status = "Unnecessary attributes and metadata removed";
  } else {
    throw new Error("Unknown clean sanitize intent");
  }

  var afterLen = out.length;
  var saved = Math.max(0, beforeLen - afterLen);
  var pct = beforeLen > 0 ? Math.round((saved / beforeLen) * 100) : 0;
  return {
    markup: out,
    status: status,
    beforeLen: beforeLen,
    afterLen: afterLen,
    saved: saved,
    pct: pct,
  };
}

function batchFormatVb(n) {
  if (typeof formatViewBoxNumber === "function") return formatViewBoxNumber(n);
  var t = Math.round(n * 1000) / 1000;
  return Object.is(t, -0) ? "0" : String(t);
}

function batchSetViewBox(svg, x, y, w, h) {
  var vb =
    batchFormatVb(x) +
    " " +
    batchFormatVb(y) +
    " " +
    batchFormatVb(w) +
    " " +
    batchFormatVb(h);
  svg.setAttribute("viewBox", vb);
  return vb;
}

function batchEnsureClassToken(el, token) {
  var parts = String(el.getAttribute("class") || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.indexOf(token) === -1) parts.push(token);
  el.setAttribute("class", parts.join(" "));
}

function batchWrapContentForClip(svg, clipUrl) {
  var existing = svg.querySelector("g[data-svgeditor-crop-root]");
  if (existing) {
    existing.setAttribute("clip-path", clipUrl);
    return existing;
  }
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("data-svgeditor-crop-root", "1");
  g.setAttribute("clip-path", clipUrl);
  var kids = Array.from(svg.childNodes).filter(function (n) {
    if (n.nodeType !== 1) return true;
    var t = String(n.localName || "").toLowerCase();
    return t !== "defs" && t !== "style" && t !== "title" && t !== "desc";
  });
  kids.forEach(function (n) {
    g.appendChild(n);
  });
  svg.appendChild(g);
  return g;
}

function batchClearRootClip(svg) {
  svg.removeAttribute("clip-path");
  svg.removeAttribute("clipPath");
}

function applyBatchCropMarkup(markup, intent) {
  if (!BATCH_VIEWBOX_DEFAULT_SVGS[intent]) {
    throw new Error("Unknown crop / viewBox intent");
  }
  var svg =
    typeof parseSvg === "function" ? parseSvg(markup) : batchParseSvgRaw(markup);
  var viewBox = svg.getAttribute("viewBox") || "";
  var status = "Crop applied";

  if (intent === "remove-width-and-height-from-svg") {
    batchStripRoot(svg);
    status = "Root width and height removed";
    return { markup: batchSerialize(svg), viewBox: viewBox || "(unchanged)", status: status };
  }

  if (intent === "set-svg-width-height-from-viewbox") {
    var box =
      typeof getSvgViewBoxBox === "function" ? getSvgViewBoxBox(svg) : null;
    if (!box) throw new Error("SVG needs a valid viewBox to set width/height");
    svg.setAttribute("width", batchFormatVb(box.width));
    svg.setAttribute("height", batchFormatVb(box.height));
    status = "width/height set from viewBox (" + box.width + "×" + box.height + ")";
    return {
      markup: batchSerialize(svg),
      viewBox: svg.getAttribute("viewBox") || "",
      status: status,
    };
  }

  if (intent === "add-viewbox-to-svg") {
    if (!svg.getAttribute("viewBox")) {
      if (typeof applyContentViewBox === "function") {
        viewBox = applyContentViewBox(svg, { padRatio: 0.02 });
      } else {
        var bbAdd = measureSvgContentBBox(svg);
        if (!bbAdd) throw new Error("Could not measure SVG content for viewBox");
        viewBox = batchSetViewBox(svg, bbAdd.x, bbAdd.y, bbAdd.width, bbAdd.height);
      }
      status = "viewBox added: " + viewBox;
    } else {
      viewBox = svg.getAttribute("viewBox");
      status = "viewBox already present: " + viewBox;
    }
    batchStripRoot(svg);
    return { markup: batchSerialize(svg), viewBox: viewBox, status: status };
  }

  // Drop previous crop clips before measuring / re-applying.
  var defsPrep = svg.querySelector("defs");
  if (defsPrep) {
    Array.prototype.forEach.call(
      defsPrep.querySelectorAll(
        "#svgeditor-crop-clip, #svgeditor-circle-clip, [data-svgeditor-crop-clip]"
      ),
      function (node) {
        if (node.parentNode) node.parentNode.removeChild(node);
      }
    );
  }
  batchClearRootClip(svg);
  var prevCropGroup = svg.querySelector("g[data-svgeditor-crop-root]");
  if (prevCropGroup) {
    prevCropGroup.removeAttribute("clip-path");
  }

  if (intent === "crop-svg-without-changing-viewbox") {
    var bbClip = measureSvgContentBBox(svg);
    if (!bbClip) throw new Error("Could not measure SVG content");
    var defs = batchEnsureDefs(svg);
    var clip = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clip.setAttribute("id", "svgeditor-crop-clip");
    clip.setAttribute("data-svgeditor-crop-clip", "1");
    var clipRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    clipRect.setAttribute("x", batchFormatVb(bbClip.x));
    clipRect.setAttribute("y", batchFormatVb(bbClip.y));
    clipRect.setAttribute("width", batchFormatVb(bbClip.width));
    clipRect.setAttribute("height", batchFormatVb(bbClip.height));
    clip.appendChild(clipRect);
    defs.appendChild(clip);
    batchWrapContentForClip(svg, "url(#svgeditor-crop-clip)");
    batchStripRoot(svg);
    viewBox = svg.getAttribute("viewBox") || "";
    status = "Content clipped — viewBox unchanged (" + viewBox + ")";
    return { markup: batchSerialize(svg), viewBox: viewBox, status: status };
  }

  var bbox = measureSvgContentBBox(svg);
  if (!bbox || !(bbox.width > 0) || !(bbox.height > 0)) {
    throw new Error("Could not measure SVG content for crop");
  }
  var cx = bbox.x + bbox.width / 2;
  var cy = bbox.y + bbox.height / 2;

  if (
    intent === "crop-svg-online" ||
    intent === "crop-svg-canvas-online" ||
    intent === "crop-svg-to-selected-area"
  ) {
    if (typeof applyContentViewBox === "function") {
      viewBox = applyContentViewBox(svg, { padRatio: 0.02, padPx: 1 });
    } else {
      viewBox = batchSetViewBox(svg, bbox.x, bbox.y, bbox.width, bbox.height);
      batchStripRoot(svg);
    }
    status = "Cropped to content viewBox " + viewBox;
  } else if (intent === "crop-svg-to-custom-dimensions") {
    var tw = 200;
    var th = 120;
    viewBox = batchSetViewBox(svg, cx - tw / 2, cy - th / 2, tw, th);
    batchStripRoot(svg);
    status = "Cropped to custom " + tw + "×" + th + " viewBox";
  } else if (intent === "crop-svg-to-square") {
    var side = Math.max(bbox.width, bbox.height) * 1.04;
    viewBox = batchSetViewBox(svg, cx - side / 2, cy - side / 2, side, side);
    batchStripRoot(svg);
    status = "Cropped to square viewBox " + viewBox;
  } else if (intent === "crop-svg-to-circle") {
    // Inscribe: use the shorter side so the circle is fully filled by content.
    var sideC = Math.min(bbox.width, bbox.height);
    var x0 = cx - sideC / 2;
    var y0 = cy - sideC / 2;
    viewBox = batchSetViewBox(svg, x0, y0, sideC, sideC);
    var defsC = batchEnsureDefs(svg);
    var clipC = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clipC.setAttribute("id", "svgeditor-circle-clip");
    clipC.setAttribute("data-svgeditor-crop-clip", "1");
    var circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circ.setAttribute("cx", batchFormatVb(cx));
    circ.setAttribute("cy", batchFormatVb(cy));
    circ.setAttribute("r", batchFormatVb(sideC / 2));
    clipC.appendChild(circ);
    defsC.appendChild(clipC);
    batchWrapContentForClip(svg, "url(#svgeditor-circle-clip)");
    batchStripRoot(svg);
    status = "Cropped to circle (" + batchFormatVb(sideC) + "×" + batchFormatVb(sideC) + ")";
  } else if (intent === "crop-svg-to-specific-aspect-ratio") {
    var aspect = 16 / 9;
    var contentAspect = bbox.width / bbox.height;
    var vw;
    var vh;
    if (contentAspect > aspect) {
      vw = bbox.width * 1.04;
      vh = vw / aspect;
    } else {
      vh = bbox.height * 1.04;
      vw = vh * aspect;
    }
    viewBox = batchSetViewBox(svg, cx - vw / 2, cy - vh / 2, vw, vh);
    batchStripRoot(svg);
    status = "Cropped to 16:9 viewBox " + viewBox;
  } else {
    throw new Error("Unknown crop / viewBox intent");
  }

  return { markup: batchSerialize(svg), viewBox: viewBox, status: status };
}

function batchIndentSvg(markup, spaces) {
  var pad = Array(spaces + 1).join(" ");
  return String(markup || "")
    .trim()
    .split("\n")
    .map(function (line) {
      return pad + line;
    })
    .join("\n");
}

function applyBatchVueMarkup(markup, intent) {
  if (!BATCH_VUE_DEFAULT_SVGS[intent]) {
    throw new Error("Unknown Vue intent");
  }
  var svg =
    typeof parseSvg === "function" ? parseSvg(markup) : batchParseSvgRaw(markup);
  batchStripRoot(svg);
  var svgMarkup = batchSerialize(svg);
  var indented = batchIndentSvg(svgMarkup, 2);
  var code;
  var status = "Converted to Vue";

  if (intent === "svg-to-vue-jsx") {
    code =
      "import { h } from 'vue'\n\n" +
      "export default function Icon(props) {\n" +
      "  return (\n" +
      indented.replace(/^(\s*)<svg\b/, "$1<svg {...props}") +
      "\n  )\n" +
      "}\n";
    status = "Converted to Vue JSX / h() render";
  } else if (intent === "svg-to-vue-options-api") {
    code =
      "<template>\n" +
      indented +
      "\n</template>\n\n" +
      "<script>\n" +
      "export default {\n" +
      "  name: 'SvgIcon',\n" +
      "  props: {\n" +
      "    title: { type: String, default: '' },\n" +
      "  },\n" +
      "}\n" +
      "</script>\n";
    status = "Converted to Vue Options API SFC";
  } else if (intent === "svg-to-vue-typescript") {
    code =
      "<template>\n" +
      indented +
      "\n</template>\n\n" +
      '<script lang="ts" setup>\n' +
      "defineProps<{ title?: string }>()\n" +
      "</script>\n";
    status = "Converted to Vue TypeScript SFC";
  } else if (
    intent === "svg-to-vue-composition-api" ||
    intent === "svg-to-vue" ||
    intent === "convert-svg-icon-to-vue" ||
    intent === "svg-to-vue-single-file-component"
  ) {
    code =
      "<template>\n" +
      indented +
      "\n</template>\n\n" +
      "<script setup>\n" +
      "defineProps({\n" +
      "  title: { type: String, default: '' },\n" +
      "})\n" +
      "</script>\n";
    status =
      intent === "svg-to-vue-composition-api"
        ? "Converted to Vue Composition API SFC"
        : intent === "svg-to-vue-single-file-component"
          ? "Converted to Vue single-file component"
          : "Converted to Vue SFC";
  } else if (intent === "svg-to-vue-nuxt") {
    code =
      "<template>\n" +
      indented +
      "\n</template>\n\n" +
      "<script setup>\n" +
      "// Nuxt-friendly icon component\n" +
      "defineProps({\n" +
      "  title: { type: String, default: '' },\n" +
      "})\n" +
      "</script>\n";
    status = "Converted to Nuxt-friendly Vue component";
  } else {
    code =
      "<template>\n" + indented + "\n</template>\n\n<script setup>\n</script>\n";
  }

  return { code: code, status: status, markup: svgMarkup };
}

function batchEnsureAnimStyle(svg, cssText) {
  var style = svg.querySelector("style[data-svgeditor-anim]");
  if (!style) {
    style = document.createElementNS("http://www.w3.org/2000/svg", "style");
    style.setAttribute("data-svgeditor-anim", "1");
    var defs = batchEnsureDefs(svg);
    defs.appendChild(style);
  }
  style.textContent = cssText;
  return style;
}

function batchWrapAnimGroup(svg) {
  var existing = svg.querySelector("g[data-svgeditor-anim-root]");
  if (existing) return existing;
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("data-svgeditor-anim-root", "1");
  g.setAttribute("class", "svgeditor-anim");
  var kids = Array.from(svg.childNodes).filter(function (n) {
    if (n.nodeType !== 1) return true;
    var t = String(n.localName || "").toLowerCase();
    return t !== "defs" && t !== "style" && t !== "title" && t !== "desc";
  });
  kids.forEach(function (n) {
    g.appendChild(n);
  });
  svg.appendChild(g);
  return g;
}

function applyBatchAnimMarkup(markup, intent) {
  if (!BATCH_ANIM_DEFAULT_SVGS[intent]) {
    throw new Error("Unknown animation intent");
  }
  var svg =
    typeof parseSvg === "function" ? parseSvg(markup) : batchParseSvgRaw(markup);
  batchStripRoot(svg);
  var status = "Animation applied";
  var g;

  if (
    intent === "svg-animation-dasharray-generator" ||
    intent === "svg-animation-dashoffset-generator" ||
    intent === "svg-drawing-animation-generator"
  ) {
    batchEnsureAnimStyle(
      svg,
      "@keyframes svgeditor-dash {\n" +
        "  to { stroke-dashoffset: 0; }\n" +
        "}\n" +
        ".svgeditor-draw {\n" +
        "  stroke-dasharray: 240;\n" +
        "  stroke-dashoffset: 240;\n" +
        "  animation: svgeditor-dash 2.2s ease forwards;\n" +
        "}\n"
    );
    Array.prototype.forEach.call(
      svg.querySelectorAll("path,circle,ellipse,polyline,line,rect"),
      function (el) {
        if (String(el.getAttribute("fill") || "") !== "none" && !el.getAttribute("stroke")) {
          return;
        }
        batchEnsureClassToken(el, "svgeditor-draw");
        if (!el.getAttribute("fill")) el.setAttribute("fill", "none");
        if (!el.getAttribute("stroke")) el.setAttribute("stroke", "#0ea5e9");
        if (!el.getAttribute("stroke-width")) el.setAttribute("stroke-width", "8");
      }
    );
    status = "Stroke drawing / dash animation applied";
  } else if (
    intent === "svg-spinner-animation-generator" ||
    intent === "svg-rotate-animation-generator"
  ) {
    batchEnsureAnimStyle(
      svg,
      "@keyframes svgeditor-spin {\n" +
        "  to { transform: rotate(360deg); }\n" +
        "}\n" +
        ".svgeditor-anim { transform-origin: center; animation: svgeditor-spin 1.2s linear infinite; }\n"
    );
    g = batchWrapAnimGroup(svg);
    g.setAttribute("class", "svgeditor-anim");
    status = "Rotate / spinner animation applied";
  } else if (intent === "svg-pulse-animation-generator") {
    batchEnsureAnimStyle(
      svg,
      "@keyframes svgeditor-pulse {\n" +
        "  0%,100% { transform: scale(1); opacity: 1; }\n" +
        "  50% { transform: scale(1.12); opacity: 0.75; }\n" +
        "}\n" +
        ".svgeditor-anim { transform-origin: center; animation: svgeditor-pulse 1.4s ease-in-out infinite; }\n"
    );
    batchWrapAnimGroup(svg);
    status = "Pulse animation applied";
  } else if (intent === "svg-bounce-animation-generator") {
    batchEnsureAnimStyle(
      svg,
      "@keyframes svgeditor-bounce {\n" +
        "  0%,100% { transform: translateY(0); }\n" +
        "  50% { transform: translateY(-18px); }\n" +
        "}\n" +
        ".svgeditor-anim { animation: svgeditor-bounce 0.9s ease-in-out infinite; }\n"
    );
    batchWrapAnimGroup(svg);
    status = "Bounce animation applied";
  } else if (intent === "svg-scale-animation-generator") {
    batchEnsureAnimStyle(
      svg,
      "@keyframes svgeditor-scale {\n" +
        "  0%,100% { transform: scale(1); }\n" +
        "  50% { transform: scale(1.2); }\n" +
        "}\n" +
        ".svgeditor-anim { transform-origin: center; animation: svgeditor-scale 1.2s ease-in-out infinite; }\n"
    );
    batchWrapAnimGroup(svg);
    status = "Scale animation applied";
  } else if (intent === "svg-floating-animation-generator") {
    batchEnsureAnimStyle(
      svg,
      "@keyframes svgeditor-float {\n" +
        "  0%,100% { transform: translateY(0); }\n" +
        "  50% { transform: translateY(-10px); }\n" +
        "}\n" +
        ".svgeditor-anim { animation: svgeditor-float 2.4s ease-in-out infinite; }\n"
    );
    batchWrapAnimGroup(svg);
    status = "Floating animation applied";
  } else if (intent === "svg-wiggle-animation-generator") {
    batchEnsureAnimStyle(
      svg,
      "@keyframes svgeditor-wiggle {\n" +
        "  0%,100% { transform: rotate(0deg); }\n" +
        "  25% { transform: rotate(-6deg); }\n" +
        "  75% { transform: rotate(6deg); }\n" +
        "}\n" +
        ".svgeditor-anim { transform-origin: center; animation: svgeditor-wiggle 0.7s ease-in-out infinite; }\n"
    );
    batchWrapAnimGroup(svg);
    status = "Wiggle animation applied";
  } else if (intent === "svg-shake-animation-generator") {
    batchEnsureAnimStyle(
      svg,
      "@keyframes svgeditor-shake {\n" +
        "  0%,100% { transform: translateX(0); }\n" +
        "  25% { transform: translateX(-6px); }\n" +
        "  75% { transform: translateX(6px); }\n" +
        "}\n" +
        ".svgeditor-anim { animation: svgeditor-shake 0.45s ease-in-out infinite; }\n"
    );
    batchWrapAnimGroup(svg);
    status = "Shake animation applied";
  } else if (intent === "svg-wave-animation-generator") {
    batchEnsureAnimStyle(
      svg,
      "@keyframes svgeditor-wave {\n" +
        "  0%,100% { transform: translateY(0); }\n" +
        "  50% { transform: translateY(-8px); }\n" +
        "}\n" +
        ".svgeditor-anim { animation: svgeditor-wave 1.6s ease-in-out infinite; }\n"
    );
    batchWrapAnimGroup(svg);
    status = "Wave animation applied";
  } else if (intent === "svg-reveal-animation-generator") {
    batchEnsureAnimStyle(
      svg,
      "@keyframes svgeditor-reveal {\n" +
        "  from { opacity: 0; clip-path: inset(0 100% 0 0); }\n" +
        "  to { opacity: 1; clip-path: inset(0 0 0 0); }\n" +
        "}\n" +
        ".svgeditor-anim { animation: svgeditor-reveal 1.4s ease forwards; }\n"
    );
    batchWrapAnimGroup(svg);
    status = "Reveal animation applied";
  } else if (
    intent === "svg-animation-stagger-generator" ||
    intent === "svg-animation-sequence-generator"
  ) {
    batchEnsureAnimStyle(
      svg,
      "@keyframes svgeditor-pop {\n" +
        "  0%,100% { transform: scale(1); opacity: 0.55; }\n" +
        "  40% { transform: scale(1.15); opacity: 1; }\n" +
        "}\n" +
        ".svgeditor-stagger { transform-origin: center; animation: svgeditor-pop 1.6s ease-in-out infinite; }\n"
    );
    var shapes = Array.from(
      svg.querySelectorAll("path,rect,circle,ellipse,polygon,polyline")
    );
    shapes.forEach(function (el, i) {
      batchEnsureClassToken(el, "svgeditor-stagger");
      el.style.animationDelay = i * (intent.indexOf("sequence") !== -1 ? 0.35 : 0.18) + "s";
    });
    status =
      intent.indexOf("sequence") !== -1
        ? "Sequence animation delays applied"
        : "Stagger animation delays applied";
  } else if (intent === "svg-animation-timing-function-editor") {
    batchEnsureAnimStyle(
      svg,
      "@keyframes svgeditor-ease-demo {\n" +
        "  0%,100% { transform: translateX(0); }\n" +
        "  50% { transform: translateX(28px); }\n" +
        "}\n" +
        ".svgeditor-anim {\n" +
        "  animation: svgeditor-ease-demo 1.8s cubic-bezier(0.68,-0.55,0.27,1.55) infinite;\n" +
        "}\n"
    );
    batchWrapAnimGroup(svg);
    status = "cubic-bezier timing function applied";
  } else if (intent === "svg-animation-path-editor") {
    var motionPath = svg.querySelector("path");
    var d =
      (motionPath && motionPath.getAttribute("d")) ||
      "M30 100 C70 20 150 20 190 100";
    if (motionPath) {
      motionPath.setAttribute("fill", "none");
      if (!motionPath.getAttribute("stroke")) {
        motionPath.setAttribute("stroke", "#64748b");
        motionPath.setAttribute("stroke-width", "3");
        motionPath.setAttribute("stroke-dasharray", "6 6");
      }
    }
    var mover = svg.querySelector("circle[r]");
    if (!mover) {
      mover = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      mover.setAttribute("r", "10");
      mover.setAttribute("fill", "#0ea5e9");
      svg.appendChild(mover);
    }
    Array.from(mover.querySelectorAll("animateMotion")).forEach(function (n) {
      if (n.parentNode) n.parentNode.removeChild(n);
    });
    var am = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
    am.setAttribute("dur", "3s");
    am.setAttribute("repeatCount", "indefinite");
    am.setAttribute("path", d);
    mover.appendChild(am);
    status = "animateMotion along path applied";
  } else {
    throw new Error("Unknown animation intent");
  }

  return { markup: batchSerialize(svg), status: status };
}

var BATCH_PRESENTATION_PROPS = [
  "fill",
  "stroke",
  "stroke-width",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-dasharray",
  "stroke-opacity",
  "fill-opacity",
  "opacity",
  "font-family",
  "font-size",
  "font-weight",
  "text-anchor",
  "dominant-baseline",
];

function batchParseStyleDecl(styleText) {
  var map = {};
  String(styleText || "")
    .split(";")
    .forEach(function (part) {
      var i = part.indexOf(":");
      if (i < 0) return;
      var key = part.slice(0, i).trim().toLowerCase();
      var val = part.slice(i + 1).trim();
      if (key && val) map[key] = val;
    });
  return map;
}

function batchStyleToString(map) {
  return Object.keys(map)
    .map(function (k) {
      return k + ":" + map[k];
    })
    .join(";");
}

function applyBatchStyleMarkup(markup, intent) {
  if (!BATCH_STYLE_DEFAULT_SVGS[intent]) {
    throw new Error("Unknown style intent");
  }
  var svg =
    typeof parseSvg === "function" ? parseSvg(markup) : batchParseSvgRaw(markup);
  var status = "Styles updated";

  if (intent === "convert-svg-inline-styles-to-presentation-attributes") {
    Array.from(svg.querySelectorAll("[style]")).forEach(function (el) {
      var map = batchParseStyleDecl(el.getAttribute("style"));
      Object.keys(map).forEach(function (key) {
        if (BATCH_PRESENTATION_PROPS.indexOf(key) !== -1) {
          el.setAttribute(key, map[key]);
          delete map[key];
        }
      });
      var left = batchStyleToString(map);
      if (left) el.setAttribute("style", left);
      else el.removeAttribute("style");
    });
    status = "Inline styles converted to presentation attributes";
  } else if (intent === "convert-svg-presentation-attributes-to-inline-styles") {
    Array.from(svg.querySelectorAll("*")).forEach(function (el) {
      var map = batchParseStyleDecl(el.getAttribute("style"));
      var changed = false;
      BATCH_PRESENTATION_PROPS.forEach(function (prop) {
        if (el.hasAttribute(prop)) {
          map[prop] = el.getAttribute(prop);
          el.removeAttribute(prop);
          changed = true;
        }
      });
      if (changed) el.setAttribute("style", batchStyleToString(map));
    });
    status = "Presentation attributes converted to inline styles";
  } else if (intent === "convert-svg-css-classes-to-attributes") {
    var rules = {};
    Array.from(svg.querySelectorAll("style")).forEach(function (styleEl) {
      var css = styleEl.textContent || "";
      var re = /\.([A-Za-z_][\w-]*)\s*\{([^}]*)\}/g;
      var m;
      while ((m = re.exec(css))) {
        rules[m[1]] = batchParseStyleDecl(m[2]);
      }
    });
    Array.from(svg.querySelectorAll("[class]")).forEach(function (el) {
      String(el.getAttribute("class") || "")
        .trim()
        .split(/\s+/)
        .forEach(function (cls) {
          var decl = rules[cls];
          if (!decl) return;
          Object.keys(decl).forEach(function (key) {
            if (BATCH_PRESENTATION_PROPS.indexOf(key) !== -1) {
              el.setAttribute(key, decl[key]);
            }
          });
        });
      el.removeAttribute("class");
    });
    Array.from(svg.querySelectorAll("style")).forEach(function (styleEl) {
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    });
    status = "CSS classes applied as attributes";
  } else if (intent === "remove-style-tags-from-svg") {
    Array.from(svg.querySelectorAll("style")).forEach(function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    status = "Style tags removed";
  } else if (intent === "remove-hardcoded-fill-from-svg-paths") {
    Array.from(svg.querySelectorAll("path[fill], polygon[fill], circle[fill], rect[fill]")).forEach(
      function (el) {
        var fill = el.getAttribute("fill");
        if (!fill || fill === "none" || fill.indexOf("url(") === 0) return;
        el.setAttribute("fill", "currentColor");
      }
    );
    status = "Hardcoded fills set to currentColor";
  } else if (intent === "convert-svg-fill-to-currentcolor") {
    Array.from(svg.querySelectorAll("[fill]")).forEach(function (el) {
      var fill = el.getAttribute("fill");
      if (!fill || fill === "none" || fill.indexOf("url(") === 0) return;
      el.setAttribute("fill", "currentColor");
    });
    Array.from(svg.querySelectorAll("[style]")).forEach(function (el) {
      var map = batchParseStyleDecl(el.getAttribute("style"));
      if (map.fill && map.fill !== "none" && map.fill.indexOf("url(") !== 0) {
        map.fill = "currentColor";
        el.setAttribute("style", batchStyleToString(map));
      }
    });
    status = "Fills converted to currentColor";
  } else if (intent === "remove-empty-groups-from-svg") {
    if (typeof removeEmptySvgContainers === "function") {
      removeEmptySvgContainers(svg);
    } else {
      var guard = 0;
      while (guard < 8) {
        guard += 1;
        var changed = false;
        Array.from(svg.querySelectorAll("g")).forEach(function (el) {
          if (el.childNodes && el.childNodes.length) return;
          if (el.parentNode) {
            el.parentNode.removeChild(el);
            changed = true;
          }
        });
        if (!changed) break;
      }
    }
    status = "Empty groups removed";
  } else if (intent === "remove-unused-defs-from-svg") {
    if (typeof removeUnusedSvgIds === "function") {
      removeUnusedSvgIds(svg, { removeOrphanDefs: true });
    }
    if (typeof removeEmptySvgContainers === "function") {
      removeEmptySvgContainers(svg);
    }
    status = "Unused defs removed";
  } else {
    throw new Error("Unknown style intent");
  }

  batchStripRoot(svg);
  return { markup: batchSerialize(svg), status: status };
}

function initBatchLongtailIntents() {
  var vueBtn = document.getElementById("btn-vue-action");
  var vueIntent = batchBodyAttr("data-vue-intent");
  if (vueIntent) {
    var tabReact = document.getElementById("tab-react");
    var tabRn = document.getElementById("tab-react-native");
    var reactPanel = document.getElementById("panel-view-react");
    var vueLabel =
      vueIntent.indexOf("nuxt") !== -1
        ? "Nuxt component"
        : vueIntent.indexOf("jsx") !== -1
          ? "Vue JSX"
          : "Vue component";
    if (tabReact) {
      tabReact.textContent = "Vue";
      tabReact.removeAttribute("aria-label");
    }
    if (tabRn) {
      tabRn.hidden = true;
      tabRn.setAttribute("aria-hidden", "true");
      tabRn.style.display = "none";
    }
    if (reactPanel) {
      var labelEl = reactPanel.querySelector(".code-output-label");
      if (labelEl) labelEl.textContent = vueLabel;
    }
  }
  if (vueBtn && vueIntent) {
    vueBtn.addEventListener("click", function () {
      var raw =
        (typeof extractSvgMarkup === "function"
          ? extractSvgMarkup(editor.value)
          : null) || editor.value.trim();
      if (!raw) {
        setStatus("empty", "Paste an SVG first");
        return;
      }
      try {
        var result = applyBatchVueMarkup(raw, vueIntent);
        if (typeof applyMirroredEditorMarkup === "function") {
          applyMirroredEditorMarkup(result.markup, result.status);
        }
        if (typeof reactOutput !== "undefined" && reactOutput) {
          reactOutput.textContent = result.code;
        }
        if (typeof setActiveTab === "function") setActiveTab("react");
        if (typeof copyTextToClipboard === "function") {
          copyTextToClipboard(result.code)
            .then(function () {
              if (typeof flashCopyButton === "function") {
                flashCopyButton(vueBtn, "Copied");
              }
              setStatus("ok", result.status + " — Vue code copied");
            })
            .catch(function () {
              setStatus("ok", result.status);
            });
        }
      } catch (err) {
        setStatus("error", (err && err.message) || "Could not convert to Vue");
      }
    });
  }

  var animBtn = document.getElementById("btn-anim-action");
  var animIntent = batchBodyAttr("data-anim-intent");
  if (animBtn && animIntent) {
    animBtn.addEventListener("click", function () {
      var raw =
        (typeof extractSvgMarkup === "function"
          ? extractSvgMarkup(editor.value)
          : null) || editor.value.trim();
      if (!raw) {
        setStatus("empty", "Paste an SVG first");
        return;
      }
      try {
        var result = applyBatchAnimMarkup(raw, animIntent);
        applyMirroredEditorMarkup(result.markup, result.status);
      } catch (err) {
        setStatus("error", (err && err.message) || "Could not add animation");
      }
    });
  }

  var styleBtn = document.getElementById("btn-style-action");
  var styleIntent = batchBodyAttr("data-style-intent");
  if (styleBtn && styleIntent) {
    styleBtn.addEventListener("click", function () {
      var raw =
        (typeof extractSvgMarkup === "function"
          ? extractSvgMarkup(editor.value)
          : null) || editor.value.trim();
      if (!raw) {
        setStatus("empty", "Paste an SVG first");
        return;
      }
      try {
        var result = applyBatchStyleMarkup(raw, styleIntent);
        applyMirroredEditorMarkup(result.markup, result.status);
      } catch (err) {
        setStatus("error", (err && err.message) || "Could not rewrite styles");
      }
    });
  }
}

if (typeof globalThis !== "undefined") {
  globalThis.getBatchLongtailStartup = getBatchLongtailStartup;
  globalThis.applyBatchGradientStrokeMarkup = applyBatchGradientStrokeMarkup;
  globalThis.applyBatchCleanSanitizeMarkup = applyBatchCleanSanitizeMarkup;
  globalThis.applyBatchCropMarkup = applyBatchCropMarkup;
  globalThis.applyBatchVueMarkup = applyBatchVueMarkup;
  globalThis.applyBatchAnimMarkup = applyBatchAnimMarkup;
  globalThis.applyBatchStyleMarkup = applyBatchStyleMarkup;
  globalThis.initBatchLongtailIntents = initBatchLongtailIntents;
  globalThis.BATCH_GRADIENT_DEFAULT_SVGS = BATCH_GRADIENT_DEFAULT_SVGS;
  globalThis.BATCH_CLEAN_DEFAULT_SVGS = BATCH_CLEAN_DEFAULT_SVGS;
  globalThis.BATCH_VIEWBOX_DEFAULT_SVGS = BATCH_VIEWBOX_DEFAULT_SVGS;
  globalThis.BATCH_VUE_DEFAULT_SVGS = BATCH_VUE_DEFAULT_SVGS;
  globalThis.BATCH_ANIM_DEFAULT_SVGS = BATCH_ANIM_DEFAULT_SVGS;
  globalThis.BATCH_STYLE_DEFAULT_SVGS = BATCH_STYLE_DEFAULT_SVGS;
}
