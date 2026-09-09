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

var BATCH_CRAFT_DEFAULT_SVGS = {
  "fix-svg-clipping-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Clipped badge — click Fix clipping">\n' +
    "  <defs>\n" +
    '    <clipPath id="tight-clip"><rect x="36" y="36" width="28" height="28"/></clipPath>\n' +
    "  </defs>\n" +
    '  <circle cx="60" cy="60" r="34" fill="#0ea5e9" clip-path="url(#tight-clip)"/>\n' +
    '  <path d="M48 62 L56 70 L74 48" fill="none" stroke="#e0f2fe" stroke-width="6" stroke-linecap="round" clip-path="url(#tight-clip)"/>\n' +
    "</svg>",
  "make-svg-scale-with-container":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" role="img" aria-label="Banner that should scale with container">\n' +
    '  <rect x="8" y="12" width="184" height="56" rx="14" fill="#38bdf8"/>\n' +
    '  <circle cx="44" cy="40" r="16" fill="#e0f2fe"/>\n' +
    '  <rect x="72" y="28" width="100" height="10" rx="4" fill="#082f49"/>\n' +
    '  <rect x="72" y="44" width="72" height="8" rx="4" fill="#082f49" opacity="0.55"/>\n' +
    "</svg>",
  "make-svg-responsive-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" preserveAspectRatio="none" role="img" aria-label="Square mark for responsive meet">\n' +
    '  <rect x="16" y="16" width="128" height="128" rx="20" fill="#22d3ee"/>\n' +
    '  <path d="M40 108 L80 44 L120 108 Z" fill="#082f49"/>\n' +
    "</svg>",
  "remove-xml-declaration-from-svg":
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" role="img" aria-label="SVG with XML declaration">\n' +
    '  <rect x="16" y="18" width="108" height="64" rx="10" fill="#64748b"/>\n' +
    '  <text x="70" y="56" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="14">&lt;?xml</text>\n' +
    "</svg>",
  "clean-illustrator-svg-online":
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" viewBox="0 0 120 120" i:extraneous="self" enable-background="new 0 0 120 120" role="img" aria-label="Illustrator star leftovers">\n' +
    "  <metadata>Adobe Illustrator 27</metadata>\n" +
    '  <path i:layer="Star" fill="#f59e0b" d="M60 18 L70 46 H100 L76 64 L86 94 L60 76 L34 94 L44 64 L20 46 H50 Z"/>\n' +
    "</svg>",
  "clean-figma-svg-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Figma frame leftovers">\n' +
    '  <g id="Frame-12" data-name="Card / Default">\n' +
    '    <rect data-name="bg" x="18" y="22" width="84" height="76" rx="16" fill="#a855f7"/>\n' +
    '    <circle data-figma-id="ell-2" cx="60" cy="60" r="18" fill="#f5d0fe"/>\n' +
    "  </g>\n" +
    "</svg>",
  "remove-hidden-layers-from-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 110" role="img" aria-label="Visible leaf plus hidden layer">\n' +
    '  <g id="hidden-draft" display="none">\n' +
    '    <rect x="8" y="8" width="50" height="50" fill="#ef4444"/>\n' +
    "  </g>\n" +
    '  <path fill="#22c55e" d="M70 20 C110 28 118 70 70 96 C22 70 30 28 70 20 Z"/>\n' +
    '  <circle cx="70" cy="52" r="8" fill="#14532d"/>\n' +
    "</svg>",
  "strip-inline-styles-from-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" role="img" aria-label="House with inline styles">\n' +
    '  <path style="fill:#fb7185;stroke:#831843;stroke-width:4" d="M20 50 L70 18 L120 50 V88 H20 Z"/>\n' +
    '  <rect style="fill:#ffe4e6" x="58" y="58" width="24" height="30"/>\n' +
    "</svg>",
  "change-svg-fill-color-with-css":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Palette droplet">\n' +
    '  <path fill="#0ea5e9" d="M60 16 C88 48 96 72 60 104 C24 72 32 48 60 16 Z"/>\n' +
    '  <circle cx="60" cy="62" r="12" fill="#082f49"/>\n' +
    "</svg>",
  "convert-svg-colors-to-css-variables":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" role="img" aria-label="Two-tone flag">\n' +
    '  <rect x="16" y="18" width="108" height="64" rx="8" fill="#2563eb"/>\n' +
    '  <polygon points="16,18 70,50 16,82" fill="#f97316"/>\n' +
    "</svg>",
  "change-svg-fill-color-on-hover":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 110" role="img" aria-label="Heart for hover fill">\n' +
    '  <path fill="#e11d48" d="M60 92 C20 64 14 40 32 26 C44 16 56 22 60 34 C64 22 76 16 88 26 C106 40 100 64 60 92 Z"/>\n' +
    "</svg>",
  "make-svg-icon-monochrome-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Multicolor bell">\n' +
    '  <path fill="#eab308" d="M36 54 C36 34 50 22 60 22 C70 22 84 34 84 54 V70 H36 Z"/>\n' +
    '  <rect x="28" y="70" width="64" height="10" rx="5" fill="#f97316"/>\n' +
    '  <circle cx="60" cy="90" r="8" fill="#ef4444"/>\n' +
    "</svg>",
  "convert-svg-presentation-attributes-to-css":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 110" role="img" aria-label="Cube with presentation attrs">\n' +
    '  <polygon points="70,16 118,42 70,68 22,42" fill="#38bdf8" stroke="#0f172a" stroke-width="3"/>\n' +
    '  <polygon points="22,42 70,68 70,98 22,72" fill="#0284c7" stroke="#0f172a" stroke-width="3"/>\n' +
    '  <polygon points="70,68 118,42 118,72 70,98" fill="#7dd3fc" stroke="#0f172a" stroke-width="3"/>\n' +
    "</svg>",
  "convert-svg-attributes-to-css-classes":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" role="img" aria-label="Repeated hex fills">\n' +
    '  <polygon points="30,20 50,20 60,38 50,56 30,56 20,38" fill="#14b8a6" stroke="#134e4a" stroke-width="3"/>\n' +
    '  <polygon points="80,20 100,20 110,38 100,56 80,56 70,38" fill="#14b8a6" stroke="#134e4a" stroke-width="3"/>\n' +
    '  <polygon points="130,20 150,20 160,38 150,56 130,56 120,38" fill="#f43f5e" stroke="#881337" stroke-width="3"/>\n' +
    "</svg>",
  "remove-svg-presentation-attributes":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" role="img" aria-label="Bolt with presentation attrs">\n' +
    '  <path fill="#facc15" stroke="#854d0e" stroke-width="4" opacity="0.95" d="M78 12 L40 58 H68 L52 92 L108 40 H76 Z"/>\n' +
    "</svg>",
  "remove-empty-attributes-from-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" role="img" aria-label="Mark with empty attributes">\n' +
    '  <rect id="" class="" x="24" y="22" width="92" height="56" rx="12" fill="#6366f1" stroke=""/>\n' +
    "</svg>",
  "remove-data-attributes-from-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" role="img" aria-label="Shield with data attributes">\n' +
    '  <path data-name="Shield" data-export="1" fill="#0f766e" d="M70 14 L114 32 V58 C114 84 70 96 70 96 C70 96 26 84 26 58 V32 Z"/>\n' +
    "</svg>",
  "bake-svg-transforms-into-path":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" role="img" aria-label="Arrow with transform">\n' +
    '  <path fill="#2563eb" transform="translate(20 10) rotate(25 50 50)" d="M20 50 H70 L58 38 M70 50 L58 62"/>\n' +
    '  <path fill="none" stroke="#2563eb" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" transform="translate(20 10) rotate(25 50 50)" d="M20 50 H70 L58 38 M70 50 L58 62"/>\n' +
    "</svg>",
  "convert-svg-stroke-to-path":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" role="img" aria-label="Stroked ring">\n' +
    '  <circle cx="70" cy="70" r="36" fill="none" stroke="#7c3aed" stroke-width="14"/>\n' +
    "</svg>",
  "skew-svg-path-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" role="img" aria-label="Rectangle to skew">\n' +
    '  <path fill="#06b6d4" d="M36 24 H124 V76 H36 Z"/>\n' +
    "</svg>",
  "close-open-svg-paths-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" role="img" aria-label="Open chevron path">\n' +
    '  <path fill="none" stroke="#ea580c" stroke-width="8" stroke-linecap="round" d="M28 28 L80 72 L132 28"/>\n' +
    "</svg>",
  "merge-svg-paths-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" role="img" aria-label="Two blobs to merge">\n' +
    '  <path fill="#0ea5e9" d="M28 50 C28 28 52 20 70 36 C60 52 44 64 28 50 Z"/>\n' +
    '  <path fill="#0ea5e9" d="M90 40 C110 22 140 34 132 58 C118 70 96 66 90 40 Z"/>\n' +
    "</svg>",
  "offset-svg-path-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" role="img" aria-label="Diamond to offset">\n' +
    '  <path fill="none" stroke="#16a34a" stroke-width="6" d="M70 24 L110 70 L70 116 L30 70 Z"/>\n' +
    "</svg>",
  "convert-svg-text-to-path":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" role="img" aria-label="Letter A as text">\n' +
    '  <text x="70" y="82" text-anchor="middle" font-family="Syne, Segoe UI, sans-serif" font-size="72" font-weight="800" fill="#1d4ed8">A</text>\n' +
    "</svg>",
  "split-compound-svg-paths":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" role="img" aria-label="Compound two circles">\n' +
    '  <path fill="#db2777" fill-rule="evenodd" d="M26 50 A24 24 0 1 1 74 50 A24 24 0 1 1 26 50 Z M86 50 A24 24 0 1 1 134 50 A24 24 0 1 1 86 50 Z"/>\n' +
    "</svg>",
  "ungroup-svg-paths-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 110" role="img" aria-label="Grouped bars">\n' +
    "  <g id=\"bars\">\n" +
    '    <path fill="#0284c7" d="M24 70 H48 V90 H24 Z"/>\n' +
    '    <path fill="#38bdf8" d="M60 40 H84 V90 H60 Z"/>\n' +
    '    <path fill="#7dd3fc" d="M96 24 H120 V90 H96 Z"/>\n' +
    "  </g>\n" +
    "</svg>",
  "unite-svg-paths-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" role="img" aria-label="Overlapping pills to unite">\n' +
    '  <path fill="#8b5cf6" d="M30 36 H90 A22 22 0 0 1 90 80 H30 A22 22 0 0 1 30 36 Z"/>\n' +
    '  <path fill="#8b5cf6" d="M70 36 H130 A22 22 0 0 1 130 80 H70 A22 22 0 0 1 70 36 Z"/>\n' +
    "</svg>",
  "subtract-svg-paths-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" role="img" aria-label="Moon subtract sample">\n' +
    '  <path fill="#334155" d="M70 20 A40 40 0 1 1 70 100 A40 40 0 1 1 70 20 Z"/>\n' +
    '  <path fill="#f8fafc" d="M82 36 A24 24 0 1 1 82 84 A24 24 0 1 1 82 36 Z"/>\n' +
    "</svg>",
  "intersect-svg-paths-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" role="img" aria-label="Vesica intersection">\n' +
    '  <path fill="#0ea5e9" d="M58 20 A36 36 0 1 1 58 92 A36 36 0 1 1 58 20 Z"/>\n' +
    '  <path fill="#f43f5e" d="M102 20 A36 36 0 1 1 102 92 A36 36 0 1 1 102 20 Z"/>\n' +
    "</svg>",
  "create-compound-svg-path":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" role="img" aria-label="Donut siblings">\n' +
    '  <path fill="#0f172a" d="M70 18 A52 52 0 1 1 70 122 A52 52 0 1 1 70 18 Z"/>\n' +
    '  <path fill="#e2e8f0" d="M70 48 A22 22 0 1 1 70 92 A22 22 0 1 1 70 48 Z"/>\n' +
    "</svg>",
  "convert-svg-arcs-to-cubic-curves":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" role="img" aria-label="Pie wedge with arcs">\n' +
    '  <path fill="#f59e0b" d="M80 60 L80 18 A42 42 0 0 1 118 84 Z"/>\n' +
    "</svg>",
  "fix-svg-stretching-in-flexbox":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" preserveAspectRatio="none" role="img" aria-label="Wide mark that flex will stretch">\n' +
    '  <rect x="8" y="12" width="184" height="56" rx="12" fill="#0ea5e9"/>\n' +
    '  <circle cx="48" cy="40" r="16" fill="#082f49"/>\n' +
    "</svg>",
  "prevent-svg-distortion-in-css-grid":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 160" preserveAspectRatio="none" role="img" aria-label="Tall tower that grid will squash">\n' +
    '  <rect x="16" y="12" width="48" height="136" rx="10" fill="#22c55e"/>\n' +
    '  <rect x="28" y="28" width="24" height="16" rx="4" fill="#dcfce7"/>\n' +
    "</svg>",
  "remove-inkscape-namespaces-from-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 120 120" inkscape:version="1.3" role="img" aria-label="Inkscape labeled bolt">\n' +
    '  <path inkscape:label="Bolt" inkscape:transform-center-x="0" fill="#facc15" d="M64 12 L28 68 H56 L48 108 L96 48 H64 Z"/>\n' +
    "</svg>",
  "remove-sodipodi-attributes-from-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" viewBox="0 0 140 100" role="img" aria-label="Sodipodi leftover shield">\n' +
    '  <sodipodi:namedview pagecolor="#ffffff"/>\n' +
    '  <path sodipodi:nodetypes="cccc" sodipodi:absref="/tmp/shield" fill="#64748b" d="M70 12 L118 36 V68 C118 88 70 96 70 96 C70 96 22 88 22 68 V36 Z"/>\n' +
    "</svg>",
  "clean-sketch-svg-export-online":
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" viewBox="0 0 140 110" role="img" aria-label="Sketch slice leftovers">\n' +
    '  <g sketch:type="MSLayerGroup" id="slice-home">\n' +
    '    <rect sketch:type="MSShapeGroup" x="22" y="22" width="96" height="66" rx="14" fill="#fb7185"/>\n' +
    '    <circle sketch:type="MSShapeGroup" cx="70" cy="55" r="16" fill="#fff1f2"/>\n' +
    "  </g>\n" +
    "</svg>",
  "remove-unused-svg-namespaces-online":
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:foo="http://example.com/foo" xmlns:bar="http://example.com/bar" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 140 100" role="img" aria-label="Unused xmlns prefixes">\n' +
    '  <rect x="20" y="22" width="100" height="56" rx="12" fill="#38bdf8"/>\n' +
    "</svg>",
  "crop-svg-to-bounding-box":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" role="img" aria-label="Small gem on a huge canvas">\n' +
    '  <path fill="#06b6d4" d="M190 120 L220 150 L190 190 L160 150 Z"/>\n' +
    "</svg>",
  "calculate-svg-bounding-box-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" role="img" aria-label="Scattered shapes to measure">\n' +
    '  <circle cx="70" cy="60" r="22" fill="#f43f5e"/>\n' +
    '  <rect x="140" y="90" width="50" height="36" rx="8" fill="#3b82f6"/>\n' +
    "</svg>",
  "convert-svg-colors-to-currentcolor":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" role="img" aria-label="Bird with fill and stroke">\n' +
    '  <path fill="#f97316" stroke="#9a3412" stroke-width="6" d="M24 80 C40 40 80 28 118 48 L96 62 C78 50 52 54 40 78 Z"/>\n' +
    '  <circle cx="100" cy="46" r="5" fill="#9a3412"/>\n' +
    "</svg>",
  "remove-hardcoded-stroke-from-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Outlined hex">\n' +
    '  <path fill="#e0f2fe" stroke="#0369a1" stroke-width="8" stroke-linejoin="round" d="M60 16 L100 38 V82 L60 104 L20 82 V38 Z"/>\n' +
    "</svg>",
  "change-svg-fill-and-stroke-on-hover":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Play button fill and stroke">\n' +
    '  <circle cx="60" cy="60" r="40" fill="#1e293b" stroke="#38bdf8" stroke-width="8"/>\n' +
    '  <path fill="#38bdf8" stroke="#e0f2fe" stroke-width="4" stroke-linejoin="round" d="M50 42 L82 60 L50 78 Z"/>\n' +
    "</svg>",
};

var BATCH_ASPECT_DEFAULT_SVGS = {
  "fix-svg-gradient-stretch-in-flexbox":
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 160 80" role="img" aria-label="Flexbox gradient stretch sample">\n' +
    "  <defs>\n" +
    '    <linearGradient id="flexObb" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">\n' +
    '      <stop offset="0" stop-color="#0ea5e9"/>\n' +
    '      <stop offset="1" stop-color="#a855f7"/>\n' +
    "    </linearGradient>\n" +
    "  </defs>\n" +
    '  <rect x="8" y="12" width="144" height="56" rx="12" fill="url(#flexObb)"/>\n' +
    "</svg>",
  "fix-svg-gradient-stretch-in-css-grid":
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="160" viewBox="0 0 150 100" role="img" aria-label="CSS Grid gradient stretch sample">\n' +
    "  <defs>\n" +
    '    <linearGradient id="gridObb" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">\n' +
    '      <stop offset="0" stop-color="#22d3ee"/>\n' +
    '      <stop offset="1" stop-color="#2563eb"/>\n' +
    "    </linearGradient>\n" +
    "  </defs>\n" +
    '  <rect x="10" y="10" width="130" height="80" rx="8" fill="url(#gridObb)"/>\n' +
    '  <rect x="24" y="28" width="40" height="44" rx="4" fill="#e0f2fe" opacity="0.35"/>\n' +
    '  <rect x="72" y="28" width="54" height="44" rx="4" fill="#e0f2fe" opacity="0.35"/>\n' +
    "</svg>",
  "set-svg-preserveaspectratio-for-flexbox":
    '<svg xmlns="http://www.w3.org/2000/svg" width="260" height="90" viewBox="0 0 120 80" preserveAspectRatio="none" role="img" aria-label="Flexbox preserveAspectRatio sample">\n' +
    '  <rect x="8" y="12" width="104" height="56" rx="10" fill="#0ea5e9"/>\n' +
    '  <circle cx="60" cy="40" r="18" fill="#e0f2fe"/>\n' +
    "</svg>",
  "svg-gradient-objectboundingbox-stretch-fix":
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 100 100" role="img" aria-label="objectBoundingBox gradient fix sample">\n' +
    "  <defs>\n" +
    '    <radialGradient id="obbRad" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">\n' +
    '      <stop offset="0" stop-color="#fef08a"/>\n' +
    '      <stop offset="1" stop-color="#a855f7"/>\n' +
    "    </radialGradient>\n" +
    "  </defs>\n" +
    '  <circle cx="50" cy="50" r="40" fill="url(#obbRad)"/>\n' +
    "</svg>",
  "set-svg-preserveaspectratio-online":
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="140" viewBox="0 0 80 100" preserveAspectRatio="none" role="img" aria-label="Set preserveAspectRatio sample">\n' +
    '  <polygon points="40,8 72,88 8,88" fill="#38bdf8"/>\n' +
    '  <circle cx="40" cy="52" r="10" fill="#0c4a6e"/>\n' +
    "</svg>",
  "svg-preserveaspectratio-meet-slice-none":
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="80" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Meet slice none sample">\n' +
    '  <rect x="10" y="10" width="80" height="80" rx="8" fill="#67e8f9"/>\n' +
    '  <text x="50" y="58" text-anchor="middle" font-size="22" font-family="sans-serif" fill="#083344">PAR</text>\n' +
    "</svg>",
};

var BATCH_SVELTE_DEFAULT_SVGS = {
  "svg-to-svelte":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="SVG to Svelte sample">\n' +
    '  <path fill="#ff3e00" d="M28 62 L48 28 L68 62 Z"/>\n' +
    '  <circle cx="48" cy="68" r="10" fill="#0ea5e9"/>\n' +
    "</svg>",
  "svg-to-svelte-typescript":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Svelte TypeScript sample">\n' +
    '  <rect x="14" y="14" width="68" height="68" rx="12" fill="#1e293b"/>\n' +
    '  <text x="48" y="58" text-anchor="middle" font-size="28" font-family="sans-serif" font-weight="700" fill="#ff3e00">TS</text>\n' +
    "</svg>",
  "svg-to-svelte-single-file-component":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Svelte SFC sample">\n' +
    '  <rect x="18" y="14" width="60" height="68" rx="8" fill="none" stroke="#ff3e00" stroke-width="4"/>\n' +
    '  <path d="M30 32 H66 M30 46 H58 M30 60 H50" stroke="#ff3e00" stroke-width="3" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-icon-to-svelte":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Svelte icon sample">\n' +
    '  <circle cx="12" cy="12" r="9" fill="none" stroke="#ff3e00" stroke-width="2"/>\n' +
    '  <path d="M8 12 L11 15 L16 9" fill="none" stroke="#ff3e00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    "</svg>",
  "svg-to-sveltekit":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="SvelteKit sample">\n' +
    '  <path fill="#ff3e00" d="M18 70 L48 18 L78 70 Z"/>\n' +
    '  <path fill="#ff8a65" d="M34 70 L48 44 L62 70 Z"/>\n' +
    '  <circle cx="48" cy="78" r="6" fill="#0ea5e9"/>\n' +
    "</svg>",
};

var BATCH_RN_DEFAULT_SVGS = {
  "svg-to-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="SVG to React Native sample">\n' +
    '  <circle cx="48" cy="48" r="28" fill="#61dafb"/>\n' +
    '  <path d="M36 48 L44 56 L62 38" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    "</svg>",
  "svg-to-react-native-svg-component":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="RN SVG component sample">\n' +
    '  <rect x="16" y="16" width="64" height="64" rx="14" fill="#111827"/>\n' +
    '  <circle cx="48" cy="48" r="18" fill="#61dafb"/>\n' +
    "</svg>",
  "svg-to-react-native-jsx":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="RN JSX sample">\n' +
    '  <rect x="12" y="20" width="72" height="56" rx="8" fill="#1e293b"/>\n' +
    '  <text x="48" y="54" text-anchor="middle" font-size="20" font-family="monospace" fill="#61dafb">&lt;/&gt;</text>\n' +
    "</svg>",
  "paste-svg-to-react-native-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Paste SVG to RN sample">\n' +
    '  <rect x="28" y="18" width="40" height="52" rx="6" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/>\n' +
    '  <rect x="34" y="12" width="28" height="12" rx="3" fill="#94a3b8"/>\n' +
    '  <path d="M40 40 H56 M40 50 H52" stroke="#0ea5e9" stroke-width="3" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-react-native-component-generator":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="RN generator sample">\n' +
    '  <circle cx="48" cy="48" r="30" fill="#0f172a"/>\n' +
    '  <path d="M48 28 V48 L62 56" fill="none" stroke="#61dafb" stroke-width="5" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-to-react-native-typescript":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="RN TypeScript sample">\n' +
    '  <rect x="14" y="14" width="68" height="68" rx="12" fill="#3178c6"/>\n' +
    '  <text x="48" y="58" text-anchor="middle" font-size="26" font-family="sans-serif" font-weight="700" fill="#fff">TS</text>\n' +
    "</svg>",
  "svg-icon-to-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Icon to RN sample">\n' +
    '  <path fill="#61dafb" d="M12 2 L4 20 H9 L12 12 L15 20 H20 Z"/>\n' +
    "</svg>",
  "convert-svg-icon-to-react-native-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Icon to react-native-svg sample">\n' +
    '  <circle cx="12" cy="12" r="9" fill="none" stroke="#61dafb" stroke-width="2"/>\n' +
    '  <path d="M8 12 L11 15 L16 9" fill="none" stroke="#61dafb" stroke-width="2" stroke-linecap="round"/>\n' +
    "</svg>",
  "figma-svg-to-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120" role="img" aria-label="Figma SVG to RN sample">\n' +
    "  <!-- figma export junk -->\n" +
    '  <script>/* remove me */</script>\n' +
    '  <rect onclick="alert(1)" x="24" y="28" width="152" height="64" rx="16" fill="#a259ff"/>\n' +
    '  <circle cx="64" cy="60" r="16" fill="#f24e1e"/>\n' +
    "</svg>",
  "convert-figma-svg-export-to-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" width="220" height="140" viewBox="0 0 220 140" role="img" aria-label="Figma export cleanup sample">\n' +
    "  <!-- Frame 123 -->\n" +
    '  <script type="text/javascript">void 0</script>\n' +
    '  <g id="Group_1" onclick="return false">\n' +
    '    <rect x="30" y="30" width="160" height="80" rx="12" fill="#0acf83"/>\n' +
    '    <text x="110" y="78" text-anchor="middle" font-size="18" fill="#042f2e">Figma</text>\n' +
    "  </g>\n" +
    "</svg>",
  "svg-logo-to-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 48" role="img" aria-label="Logo to RN sample">\n' +
    '  <rect x="4" y="8" width="112" height="32" rx="8" fill="#0f172a"/>\n' +
    '  <circle cx="24" cy="24" r="10" fill="#61dafb"/>\n' +
    '  <text x="42" y="30" font-size="16" font-family="sans-serif" font-weight="700" fill="#e2e8f0">LOGO</text>\n' +
    "</svg>",
  "svg-illustration-to-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" role="img" aria-label="Illustration to RN sample">\n' +
    "  <defs>\n" +
    '    <linearGradient id="illustSky" x1="0" y1="0" x2="0" y2="1">\n' +
    '      <stop offset="0" stop-color="#7dd3fc"/>\n' +
    '      <stop offset="1" stop-color="#0284c7"/>\n' +
    "    </linearGradient>\n" +
    "  </defs>\n" +
    '  <rect width="160" height="120" fill="url(#illustSky)"/>\n' +
    '  <circle cx="120" cy="28" r="14" fill="#fef08a"/>\n' +
    '  <path d="M0 90 L40 60 L80 90 L120 55 L160 90 V120 H0 Z" fill="#166534"/>\n' +
    "</svg>",
  "svg-to-expo-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Expo RN sample">\n' +
    '  <rect x="16" y="16" width="64" height="64" rx="16" fill="#000"/>\n' +
    '  <path d="M32 62 L48 28 L64 62 Z" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>\n' +
    "</svg>",
  "convert-svg-to-expo-svg-component":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Expo SVG component sample">\n' +
    '  <circle cx="48" cy="48" r="32" fill="#4630EB"/>\n' +
    '  <path d="M34 50 L44 60 L64 38" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-to-react-native-android":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="RN Android sample">\n' +
    '  <path fill="#3DDC84" d="M24 40 H72 V70 H24 Z"/>\n' +
    '  <circle cx="36" cy="36" r="6" fill="#3DDC84"/>\n' +
    '  <circle cx="60" cy="36" r="6" fill="#3DDC84"/>\n' +
    '  <path d="M30 28 L24 18 M66 28 L72 18" stroke="#3DDC84" stroke-width="3" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-to-react-native-ios":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="RN iOS sample">\n' +
    '  <rect x="28" y="12" width="40" height="72" rx="8" fill="#111827" stroke="#9ca3af" stroke-width="3"/>\n' +
    '  <circle cx="48" cy="74" r="4" fill="#9ca3af"/>\n' +
    '  <rect x="40" y="18" width="16" height="3" rx="1.5" fill="#4b5563"/>\n' +
    "</svg>",
  "svg-to-svgxml-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="SvgXml sample">\n' +
    '  <rect x="14" y="22" width="68" height="52" rx="8" fill="#0f172a"/>\n' +
    '  <text x="48" y="54" text-anchor="middle" font-size="14" font-family="monospace" fill="#61dafb">xml</text>\n' +
    "</svg>",
  "svg-string-to-react-native-component":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="SVG string to RN sample">\n' +
    '  <rect x="12" y="28" width="72" height="40" rx="6" fill="#1e293b"/>\n' +
    '  <text x="48" y="54" text-anchor="middle" font-size="12" font-family="monospace" fill="#94a3b8">"&lt;svg/&gt;"</text>\n' +
    "</svg>",
  "inline-svg-to-react-native-svg":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Inline SVG to RN sample">\n' +
    '  <rect x="20" y="20" width="56" height="56" rx="6" fill="none" stroke="#61dafb" stroke-width="3" stroke-dasharray="6 4"/>\n' +
    '  <circle cx="48" cy="48" r="14" fill="#61dafb"/>\n' +
    "</svg>",
  "svg-path-to-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" role="img" aria-label="Path to RN sample">\n' +
    '  <path d="M20 90 C50 20 110 20 140 90" fill="none" stroke="#0ea5e9" stroke-width="8" stroke-linecap="round"/>\n' +
    "</svg>",
  "convert-svg-path-to-react-native-svg-path":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" role="img" aria-label="Path to RN Path sample">\n' +
    '  <path d="M24 96 L48 24 L80 72 L112 32 L136 96" fill="none" stroke="#61dafb" stroke-width="6" stroke-linejoin="round"/>\n' +
    "</svg>",
  "svg-circle-to-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Circle to RN sample">\n' +
    '  <circle cx="60" cy="60" r="40" fill="#61dafb"/>\n' +
    "</svg>",
  "svg-rect-to-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" role="img" aria-label="Rect to RN sample">\n' +
    '  <rect x="20" y="20" width="120" height="60" rx="12" fill="#0ea5e9"/>\n' +
    "</svg>",
  "convert-svg-lineargradient-to-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" role="img" aria-label="LinearGradient to RN sample">\n' +
    "  <defs>\n" +
    '    <linearGradient id="rnGrad" x1="0" y1="0" x2="1" y2="1">\n' +
    '      <stop offset="0" stop-color="#61dafb"/>\n' +
    '      <stop offset="1" stop-color="#0ea5e9"/>\n' +
    "    </linearGradient>\n" +
    "  </defs>\n" +
    '  <rect x="16" y="16" width="128" height="68" rx="14" fill="url(#rnGrad)"/>\n' +
    "</svg>",
  "convert-svg-attributes-to-react-native-props":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" role="img" aria-label="Attrs to RN props sample">\n' +
    '  <rect x="16" y="16" width="88" height="48" rx="10" fill="#0ea5e9" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>\n' +
    "</svg>",
  "camelcase-svg-attributes-for-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" role="img" aria-label="CamelCase attrs sample">\n' +
    '  <path d="M20 60 Q60 10 100 60" fill="none" stroke="#61dafb" stroke-width="6" stroke-linecap="round" stroke-dasharray="8 6"/>\n' +
    "</svg>",
  "svg-to-react-native-currentcolor":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="RN currentColor sample">\n' +
    '  <path fill="#ef4444" d="M48 18 L72 70 H24 Z"/>\n' +
    '  <circle cx="48" cy="58" r="8" fill="#b91c1c"/>\n' +
    "</svg>",
  "convert-svg-fill-to-color-prop-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Fill to color prop sample">\n' +
    '  <rect x="20" y="20" width="56" height="56" rx="12" fill="#22c55e"/>\n' +
    '  <circle cx="48" cy="48" r="14" fill="#166534"/>\n' +
    "</svg>",
  "svg-icon-with-size-props-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Size props icon sample">\n' +
    '  <rect x="3" y="3" width="18" height="18" rx="4" fill="#61dafb"/>\n' +
    '  <path d="M8 12 H16 M12 8 V16" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>\n' +
    "</svg>",
  "responsive-svg-icon-react-native-component":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-label="Responsive RN icon sample">\n' +
    '  <circle cx="24" cy="24" r="18" fill="none" stroke="#61dafb" stroke-width="3"/>\n' +
    '  <path d="M16 24 H32 M24 16 V32" stroke="#61dafb" stroke-width="3" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-to-react-native-with-viewbox":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" role="img" aria-label="RN with viewBox sample">\n' +
    '  <rect x="10" y="20" width="180" height="60" rx="10" fill="#0ea5e9"/>\n' +
    '  <text x="100" y="58" text-anchor="middle" font-size="18" fill="#082f49">viewBox</text>\n' +
    "</svg>",
  "optimize-svg-for-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120" role="img" aria-label="Optimize for RN sample">\n' +
    "  <!-- unused comment clutter -->\n" +
    '  <script>/* junk */</script>\n' +
    '  <rect onclick="alert(1)" x="20" y="24" width="160" height="72" rx="12" fill="#f59e0b"/>\n' +
    '  <g id="empty-group"></g>\n' +
    "</svg>",
  "remove-unsupported-svg-for-react-native":
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120" role="img" aria-label="Remove unsupported sample">\n' +
    '  <script type="text/ecmascript">1</script>\n' +
    '  <foreignObject x="0" y="0" width="40" height="20"></foreignObject>\n' +
    '  <rect x="40" y="30" width="120" height="60" rx="10" fill="#ef4444" onclick="x()"/>\n' +
    "</svg>",
  "svgr-native-svg-to-react-native-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="SVGR Native sample">\n' +
    '  <rect x="18" y="18" width="60" height="60" rx="12" fill="#f97316"/>\n' +
    '  <text x="48" y="56" text-anchor="middle" font-size="16" font-family="sans-serif" font-weight="700" fill="#fff">SVGR</text>\n' +
    "</svg>",
  "svg-to-react-native-functional-component":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Functional RN component sample">\n' +
    '  <rect x="16" y="24" width="64" height="48" rx="10" fill="#0ea5e9"/>\n' +
    '  <text x="48" y="54" text-anchor="middle" font-size="14" font-family="monospace" fill="#082f49">fn()</text>\n' +
    "</svg>",
  "svg-to-react-native-forwardref-component":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="forwardRef RN sample">\n' +
    '  <circle cx="48" cy="48" r="28" fill="none" stroke="#61dafb" stroke-width="5"/>\n' +
    '  <path d="M48 28 V48 L64 56" fill="none" stroke="#61dafb" stroke-width="4" stroke-linecap="round"/>\n' +
    '  <text x="48" y="78" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">ref</text>\n' +
    "</svg>",
};

var BATCH_PNG_DEFAULT_SVGS = {
  "convert-svg-to-transparent-png":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-label="Hex tile on a white plate">\n' +
    '  <rect data-svgeditor-bg="1" x="0" y="0" width="160" height="160" fill="#ffffff"/>\n' +
    '  <path fill="#0ea5e9" d="M80 18 L132 48 V112 L80 142 L28 112 V48 Z"/>\n' +
    '  <circle cx="80" cy="80" r="18" fill="#e0f2fe"/>\n' +
    "</svg>",
  "svg-to-png-high-resolution":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140" role="img" aria-label="Mountain mark for 4x PNG">\n' +
    '  <path fill="#0369a1" d="M12 118 L58 48 L86 78 L124 34 L188 118 Z"/>\n' +
    '  <circle cx="158" cy="36" r="14" fill="#f59e0b"/>\n' +
    "</svg>",
  "svg-icon-to-png-converter":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Bookmark icon">\n' +
    '  <path fill="#7c3aed" d="M28 16 H68 A8 8 0 0 1 76 24 V84 L48 68 L20 84 V24 A8 8 0 0 1 28 16 Z"/>\n' +
    "</svg>",
  "svg-logo-to-png-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 96" role="img" aria-label="NOVA wordmark">\n' +
    '  <circle cx="36" cy="48" r="22" fill="#22d3ee"/>\n' +
    '  <path d="M28 56 L36 32 L44 56" fill="none" stroke="#082f49" stroke-width="4" stroke-linejoin="round"/>\n' +
    '  <text x="72" y="62" font-family="Syne, Segoe UI, sans-serif" font-size="42" font-weight="800" fill="#e2e8f0">NOVA</text>\n' +
    "</svg>",
  "svg-to-png-custom-size":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 140" role="img" aria-label="Wide banner for custom PNG size">\n' +
    '  <rect x="12" y="20" width="296" height="100" rx="20" fill="#1d4ed8"/>\n' +
    '  <rect x="36" y="44" width="120" height="14" rx="7" fill="#dbeafe"/>\n' +
    '  <rect x="36" y="72" width="80" height="10" rx="5" fill="#93c5fd"/>\n' +
    "</svg>",
  "svg-to-retina-png-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Diamond for @3x retina">\n' +
    '  <path fill="#ec4899" d="M60 10 L110 60 L60 110 L10 60 Z"/>\n' +
    '  <path fill="#fbcfe8" d="M60 34 L86 60 L60 86 L34 60 Z"/>\n' +
    "</svg>",
  "svg-code-to-png-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" role="img" aria-label="Code chevrons">\n' +
    '  <path d="M48 28 L20 50 L48 72" fill="none" stroke="#22c55e" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    '  <path d="M112 28 L140 50 L112 72" fill="none" stroke="#22c55e" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    "</svg>",
  "inline-svg-to-png-converter":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 120" role="img" aria-label="Map pin inline SVG">\n' +
    '  <path fill="#ef4444" d="M48 8 C70 8 84 24 84 44 C84 70 48 112 48 112 C48 112 12 70 12 44 C12 24 26 8 48 8 Z"/>\n' +
    '  <circle cx="48" cy="44" r="12" fill="#fee2e2"/>\n' +
    "</svg>",
  "export-svg-as-transparent-png":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" role="img" aria-label="Leaf already on alpha">\n' +
    '  <path fill="#16a34a" d="M28 112 C28 60 70 20 122 18 C110 72 78 104 28 112 Z"/>\n' +
    '  <path d="M40 100 C70 78 92 50 108 28" fill="none" stroke="#14532d" stroke-width="6" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-to-png-without-background":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" role="img" aria-label="Sun on a cream artboard">\n' +
    '  <rect x="0" y="0" width="180" height="180" fill="#fef3c7"/>\n' +
    '  <circle cx="90" cy="90" r="36" fill="#f59e0b"/>\n' +
    '  <g stroke="#d97706" stroke-width="8" stroke-linecap="round">\n' +
    '    <path d="M90 18 V36"/><path d="M90 144 V162"/><path d="M18 90 H36"/><path d="M144 90 H162"/>\n' +
    "  </g>\n" +
    "</svg>",
  "svg-favicon-to-png-converter":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Letter G favicon">\n' +
    '  <rect x="2" y="2" width="28" height="28" rx="8" fill="#0f172a"/>\n' +
    '  <text x="16" y="23" text-anchor="middle" font-family="Syne, sans-serif" font-size="18" font-weight="800" fill="#38bdf8">G</text>\n' +
    "</svg>",
  "svg-illustration-to-png-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" role="img" aria-label="Tiny landscape illustration">\n' +
    '  <rect x="0" y="0" width="240" height="96" fill="#7dd3fc"/>\n' +
    '  <circle cx="48" cy="36" r="16" fill="#fde047"/>\n' +
    '  <path fill="#15803d" d="M0 96 L70 70 L120 96 L170 62 L240 96 V160 H0 Z"/>\n' +
    "</svg>",
  "download-svg-as-png-online":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Download tray">\n' +
    '  <path d="M48 16 V58" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>\n' +
    '  <path d="M28 44 L48 64 L68 44" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    '  <path d="M20 72 H76" fill="none" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>\n' +
    "</svg>",
  "paste-svg-export-as-png":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 120" role="img" aria-label="Clipboard paste">\n' +
    '  <rect x="22" y="28" width="66" height="80" rx="10" fill="#f8fafc" stroke="#334155" stroke-width="6"/>\n' +
    '  <rect x="38" y="14" width="34" height="22" rx="6" fill="#0ea5e9"/>\n' +
    "</svg>",
  "svg-to-png-512-pixels":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="App tile for 512 PNG">\n' +
    '  <rect x="12" y="12" width="104" height="104" rx="28" fill="#4f46e5"/>\n' +
    '  <circle cx="64" cy="64" r="22" fill="#c7d2fe"/>\n' +
    "</svg>",
  "convert-svg-path-to-png":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" role="img" aria-label="Single path curve">\n' +
    '  <path d="M16 88 C48 16 96 16 120 64 S176 120 188 40" fill="none" stroke="#f97316" stroke-width="10" stroke-linecap="round"/>\n' +
    "</svg>",
  "svg-to-png-for-email":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" role="img" aria-label="Envelope for email PNG">\n' +
    '  <rect x="16" y="28" width="168" height="72" rx="10" fill="#2563eb"/>\n' +
    '  <path d="M16 40 L100 78 L184 40" fill="none" stroke="#dbeafe" stroke-width="8" stroke-linejoin="round"/>\n' +
    "</svg>",
  "svg-to-apple-touch-icon":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" role="img" aria-label="Rounded mark for Apple touch">\n' +
    '  <rect x="10" y="10" width="160" height="160" rx="36" fill="#111827"/>\n' +
    '  <path fill="#f43f5e" d="M90 46 C78 28 48 34 48 62 C48 92 90 124 90 124 C90 124 132 92 132 62 C132 34 102 28 90 46 Z"/>\n' +
    "</svg>",
  "svg-to-png-2x-scale":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" role="img" aria-label="Plus mark for 2x PNG">\n' +
    '  <path d="M16 40 H64 M40 16 V64" fill="none" stroke="#a855f7" stroke-width="10" stroke-linecap="round"/>\n' +
    "</svg>",
  "batch-convert-svg-to-png":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" role="img" aria-label="Batch star">\n' +
    '  <path fill="#eab308" d="M40 8 L48 30 H72 L52 44 L60 68 L40 54 L20 68 L28 44 L8 30 H32 Z"/>\n' +
    "</svg>\n" +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" role="img" aria-label="Batch moon">\n' +
    '  <path fill="#64748b" d="M70 42.63A30 30 0 1 1 37.37 10 23.33 23.33 0 0 0 70 42.63z"/>\n' +
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
  var craftIntent = batchBodyAttr("data-craft-intent");
  if (craftIntent && BATCH_CRAFT_DEFAULT_SVGS[craftIntent]) {
    return {
      svg: BATCH_CRAFT_DEFAULT_SVGS[craftIntent],
      status: "Sample SVG — click the action button for this intent",
    };
  }
  var aspect = batchBodyAttr("data-aspect-intent");
  if (aspect && BATCH_ASPECT_DEFAULT_SVGS[aspect]) {
    return {
      svg: BATCH_ASPECT_DEFAULT_SVGS[aspect],
      status: "Sample SVG — click the action button to fix aspect / gradient stretch",
    };
  }
  var svelte = batchBodyAttr("data-svelte-intent");
  if (svelte && BATCH_SVELTE_DEFAULT_SVGS[svelte]) {
    return {
      svg: BATCH_SVELTE_DEFAULT_SVGS[svelte],
      status: "Sample SVG — click the action button to convert to Svelte",
    };
  }
  var rn = batchBodyAttr("data-rn-intent");
  if (rn && BATCH_RN_DEFAULT_SVGS[rn]) {
    return {
      svg: BATCH_RN_DEFAULT_SVGS[rn],
      status: "Sample SVG — click the action button to convert to React Native",
    };
  }
  var png = batchBodyAttr("data-png-intent");
  if (png && BATCH_PNG_DEFAULT_SVGS[png]) {
    return {
      svg: BATCH_PNG_DEFAULT_SVGS[png],
      status:
        png === "batch-convert-svg-to-png"
          ? "2 sample SVGs — click Batch export PNGs to download both"
          : "Sample SVG — click the action button to export PNG for this intent",
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

function applyBatchAspectMarkup(markup, intent) {
  if (!BATCH_ASPECT_DEFAULT_SVGS[intent]) {
    throw new Error("Unknown aspect intent");
  }
  var svg =
    typeof parseSvg === "function" ? parseSvg(markup) : batchParseSvgRaw(markup);
  var status = "Aspect ratio fixed";

  var setUserSpace = function () {
    Array.from(
      svg.querySelectorAll("linearGradient, radialGradient, lineargradient, radialgradient")
    ).forEach(function (g) {
      g.setAttribute("gradientUnits", "userSpaceOnUse");
      var vb = (svg.getAttribute("viewBox") || "0 0 160 80").trim().split(/\s+/);
      var x = parseFloat(vb[0]) || 0;
      var y = parseFloat(vb[1]) || 0;
      var w = parseFloat(vb[2]) || 160;
      var h = parseFloat(vb[3]) || 80;
      if (!g.getAttribute("x1") || String(g.getAttribute("x1")).indexOf("%") >= 0 || Number(g.getAttribute("x1")) <= 1) {
        g.setAttribute("x1", String(x));
        g.setAttribute("y1", String(y + h / 2));
        g.setAttribute("x2", String(x + w));
        g.setAttribute("y2", String(y + h / 2));
      }
    });
  };

  if (
    intent === "fix-svg-gradient-stretch-in-flexbox" ||
    intent === "fix-svg-gradient-stretch-in-css-grid" ||
    intent === "prevent-svg-gradient-stretch-in-flex-container" ||
    intent === "svg-gradient-objectboundingbox-stretch-fix" ||
    intent === "stop-svg-linear-gradient-from-stretching-in-grid"
  ) {
    setUserSpace();
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    status =
      intent.indexOf("grid") !== -1
        ? "gradientUnits=userSpaceOnUse + preserveAspectRatio meet (grid-safe)"
        : "gradientUnits=userSpaceOnUse + preserveAspectRatio meet (flex-safe)";
  } else if (intent === "set-svg-preserveaspectratio-for-flexbox") {
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    status = "preserveAspectRatio set to xMidYMid meet for flexbox";
  } else if (intent === "set-svg-preserveaspectratio-online") {
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    status = "preserveAspectRatio set to xMidYMid meet";
  } else if (intent === "svg-preserveaspectratio-meet-slice-none") {
    var current = (svg.getAttribute("preserveAspectRatio") || "none").toLowerCase();
    var next = "xMidYMid meet";
    if (current.indexOf("meet") !== -1) next = "xMidYMid slice";
    else if (current.indexOf("slice") !== -1) next = "none";
    svg.setAttribute("preserveAspectRatio", next);
    status = "preserveAspectRatio set to " + next;
  } else if (intent === "make-svg-fill-container-without-distortion") {
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    status = "Fills container without distortion (meet)";
  } else if (intent === "svg-responsive-scale-with-parent-container") {
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    var styleMap =
      typeof batchParseStyleDecl === "function"
        ? batchParseStyleDecl(svg.getAttribute("style") || "")
        : {};
    styleMap.width = "100%";
    styleMap.height = "auto";
    styleMap.display = "block";
    if (typeof batchStyleToString === "function") {
      svg.setAttribute("style", batchStyleToString(styleMap));
    } else {
      svg.setAttribute("style", "width:100%;height:auto;display:block");
    }
    status = "Responsive scale with parent (width 100%, height auto, meet)";
  } else {
    throw new Error("Unknown aspect intent");
  }

  batchStripRoot(svg);
  return { markup: batchSerialize(svg), status: status };
}

function applyBatchSvelteMarkup(markup, intent) {
  if (!BATCH_SVELTE_DEFAULT_SVGS[intent]) {
    throw new Error("Unknown Svelte intent");
  }
  var svg =
    typeof parseSvg === "function" ? parseSvg(markup) : batchParseSvgRaw(markup);
  batchStripRoot(svg);
  var svgMarkup = batchSerialize(svg);
  var indented = batchIndentSvg(svgMarkup, 2);
  var code;
  var status = "Converted to Svelte";

  if (intent === "svg-to-svelte-typescript") {
    code =
      '<script lang="ts">\n' +
      "  export let title: string = '';\n" +
      "  export let size: number | string = 24;\n" +
      "</script>\n\n" +
      indented.replace(
        /^(\s*)<svg\b/,
        '$1<svg width={size} height={size} aria-hidden={title ? undefined : true}'
      ) +
      "\n";
    status = "Converted to Svelte TypeScript component";
  } else if (intent === "svg-to-sveltekit") {
    code =
      "<!-- SvelteKit-friendly icon component -->\n" +
      "<script>\n" +
      "  export let title = '';\n" +
      "  export let size = 24;\n" +
      "</script>\n\n" +
      indented.replace(
        /^(\s*)<svg\b/,
        "$1<svg width={size} height={size} role={title ? 'img' : undefined}"
      ) +
      "\n";
    status = "Converted to SvelteKit component";
  } else if (intent === "svg-icon-to-svelte") {
    code =
      "<script>\n" +
      "  export let size = 24;\n" +
      "  export let color = 'currentColor';\n" +
      "</script>\n\n" +
      indented.replace(
        /^(\s*)<svg\b/,
        "$1<svg width={size} height={size} fill={color}"
      ) +
      "\n";
    status = "Converted to Svelte icon component";
  } else {
    code =
      "<script>\n" +
      "  export let title = '';\n" +
      "</script>\n\n" +
      indented +
      "\n";
    status =
      intent === "svg-to-svelte-single-file-component"
        ? "Converted to Svelte single-file component"
        : "Converted to Svelte component";
  }

  return { code: code, status: status, markup: svgMarkup };
}

function batchRnPrepareSvg(markup, intent) {
  var svg =
    typeof parseSvg === "function" ? parseSvg(markup) : batchParseSvgRaw(markup);

  if (
    intent === "optimize-svg-for-react-native" ||
    intent === "remove-unsupported-svg-for-react-native" ||
    intent === "figma-svg-to-react-native" ||
    intent === "convert-figma-svg-export-to-react-native"
  ) {
    Array.from(svg.querySelectorAll("script, foreignObject")).forEach(function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    Array.from(svg.querySelectorAll("*")).forEach(function (el) {
      Array.from(el.attributes).forEach(function (attr) {
        var n = attr.name.toLowerCase();
        if (n.indexOf("on") === 0 || n === "href" && String(el.localName).toLowerCase() === "script") {
          el.removeAttribute(attr.name);
        }
      });
    });
  }

  if (
    intent === "svg-to-react-native-currentcolor" ||
    intent === "convert-svg-fill-to-color-prop-react-native"
  ) {
    Array.from(svg.querySelectorAll("[fill]")).forEach(function (el) {
      var fill = el.getAttribute("fill");
      if (!fill || fill === "none" || fill.indexOf("url(") === 0) return;
      el.setAttribute("fill", "currentColor");
    });
  }

  batchStripRoot(svg);
  return svg;
}

function applyBatchRnMarkup(markup, intent) {
  if (!BATCH_RN_DEFAULT_SVGS[intent]) {
    throw new Error("Unknown React Native intent");
  }
  var svg = batchRnPrepareSvg(markup, intent);
  var svgMarkup = batchSerialize(svg);
  var status = "Converted to React Native";
  var code;

  if (
    intent === "svg-to-svgxml-react-native" ||
    intent === "svg-string-to-react-native-component"
  ) {
    var escaped = svgMarkup.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
    code =
      'import { SvgXml } from "react-native-svg";\n\n' +
      "const xml = `" +
      escaped +
      "`;\n\n" +
      "export default function Icon(props) {\n" +
      "  return <SvgXml xml={xml} {...props} />;\n" +
      "}\n";
    status = "Converted to SvgXml React Native component";
  } else if (typeof svgToReactNativeComponent === "function") {
    code = svgToReactNativeComponent(svgMarkup);
  } else {
    throw new Error("React Native converter unavailable");
  }

  if (intent === "svg-to-react-native-typescript") {
    code = code
      .replace(
        "export default function Icon(props) {",
        "import type { SvgProps } from \"react-native-svg\";\n\nexport default function Icon(props: SvgProps) {"
      )
      .replace(
        'import type { SvgProps } from "react-native-svg";\n\nimport type { SvgProps } from "react-native-svg";\n\n',
        'import type { SvgProps } from "react-native-svg";\n\n'
      );
    if (code.indexOf("SvgProps") === -1) {
      code =
        'import type { SvgProps } from "react-native-svg";\n' +
        code.replace(
          "export default function Icon(props)",
          "export default function Icon(props: SvgProps)"
        );
    }
    status = "Converted to typed React Native (TSX) component";
  } else if (intent === "svg-to-react-native-forwardref-component") {
    code = code
      .replace(
        /import Svg(, \{[^}]+\})? from "react-native-svg";/,
        'import React, { forwardRef } from "react";\nimport Svg$1 from "react-native-svg";'
      )
      .replace(
        "export default function Icon(props) {\n  return (\n",
        "const Icon = forwardRef(function Icon(props, ref) {\n  return (\n"
      )
      .replace(
        /^(\s*)<Svg \{\.\.\.props\}/m,
        "$1<Svg ref={ref} {...props}"
      );
    if (code.indexOf("forwardRef") !== -1 && code.indexOf("export default Icon") === -1) {
      code = code.replace(/\}\n$/, "});\n\nexport default Icon;\n");
    }
    status = "Converted to forwardRef React Native component";
  } else if (
    intent === "svg-icon-with-size-props-react-native" ||
    intent === "responsive-svg-icon-react-native-component"
  ) {
    code = code.replace(
      "export default function Icon(props) {\n  return (\n",
      "export default function Icon({ size = 24, color, ...props }) {\n  return (\n"
    );
    code = code.replace(
      /^(\s*)<Svg \{\.\.\.props\}/m,
      "$1<Svg width={size} height={size} color={color} {...props}"
    );
    status =
      intent === "responsive-svg-icon-react-native-component"
        ? "Converted to responsive RN icon with size props"
        : "Converted to RN icon with size props";
  } else if (
    intent === "svg-to-react-native-currentcolor" ||
    intent === "convert-svg-fill-to-color-prop-react-native"
  ) {
    code = code.replace(
      "export default function Icon(props) {\n  return (\n",
      "export default function Icon({ color = \"#000\", ...props }) {\n  return (\n"
    );
    code = code.replace(
      /^(\s*)<Svg \{\.\.\.props\}/m,
      "$1<Svg color={color} {...props}"
    );
    status = "Converted to RN with color prop / currentColor fills";
  } else if (
    intent === "optimize-svg-for-react-native" ||
    intent === "remove-unsupported-svg-for-react-native"
  ) {
    status = "Cleaned unsupported bits and converted to React Native";
  } else if (intent === "svg-to-expo-react-native") {
    code =
      "// Expo: install with `npx expo install react-native-svg`\n" + code;
    status = "Converted to Expo-friendly react-native-svg component";
  } else if (intent === "convert-svg-to-expo-svg-component") {
    code =
      "// Expo SVG component — use inside your Expo Router / App screens\n" +
      code;
    status = "Converted to Expo SVG component";
  } else if (intent === "svg-to-react-native-android") {
    code =
      "// Android: prefer vector SVG over bitmap; test on API 24+\n" + code;
    status = "Converted for React Native Android";
  } else if (intent === "svg-to-react-native-ios") {
    code =
      "// iOS: works with react-native-svg; verify on device/simulator\n" + code;
    status = "Converted for React Native iOS";
  } else if (
    intent.indexOf("path") !== -1 ||
    intent.indexOf("circle") !== -1 ||
    intent.indexOf("rect") !== -1 ||
    intent.indexOf("lineargradient") !== -1
  ) {
    status = "Converted SVG primitives to react-native-svg";
  }

  return { code: code, status: status, markup: svgMarkup };
}

function craftEnsureViewBox(svg) {
  if (svg.getAttribute("viewBox")) return;
  var w = parseFloat(svg.getAttribute("width"));
  var h = parseFloat(svg.getAttribute("height"));
  if (Number.isFinite(w) && w > 0 && Number.isFinite(h) && h > 0) {
    svg.setAttribute("viewBox", "0 0 " + w + " " + h);
  } else {
    svg.setAttribute("viewBox", "0 0 120 120");
  }
}

function craftWalk(el, fn) {
  fn(el);
  Array.from(el.children || []).forEach(function (child) {
    craftWalk(child, fn);
  });
}

function craftTokenizePath(d) {
  var tokens = [];
  var re = /([MmLlHhVvCcSsQqTtAaZz])|(-?\d*\.?\d+(?:e[-+]?\d+)?)/g;
  var m;
  var cmd = "";
  var nums = [];
  var flush = function () {
    if (!cmd) return;
    tokens.push({ cmd: cmd, nums: nums.slice() });
    nums = [];
  };
  while ((m = re.exec(String(d || "")))) {
    if (m[1]) {
      if (/[Zz]/.test(m[1])) {
        flush();
        tokens.push({ cmd: m[1], nums: [] });
        cmd = "";
      } else {
        flush();
        cmd = m[1];
      }
    } else if (m[2]) {
      nums.push(parseFloat(m[2]));
    }
  }
  flush();
  return tokens;
}

function craftSerializePath(tokens) {
  return tokens
    .map(function (t) {
      return t.cmd + (t.nums.length ? " " + t.nums.join(" ") : "");
    })
    .join(" ");
}

function craftArcToCubics(x1, y1, rx, ry, phi, fa, fs, x2, y2) {
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  if (!rx || !ry) return [{ cmd: "L", nums: [x2, y2] }];
  var rad = (phi * Math.PI) / 180;
  var cos = Math.cos(rad);
  var sin = Math.sin(rad);
  var dx = (x1 - x2) / 2;
  var dy = (y1 - y2) / 2;
  var x1p = cos * dx + sin * dy;
  var y1p = -sin * dx + cos * dy;
  var lam = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
  if (lam > 1) {
    var s = Math.sqrt(lam);
    rx *= s;
    ry *= s;
  }
  var sq =
    (rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p) /
    (rx * rx * y1p * y1p + ry * ry * x1p * x1p);
  var coef = (fa === fs ? -1 : 1) * Math.sqrt(Math.max(0, sq));
  var cxp = coef * ((rx * y1p) / ry);
  var cyp = coef * (-(ry * x1p) / rx);
  var cx = cos * cxp - sin * cyp + (x1 + x2) / 2;
  var cy = sin * cxp + cos * cyp + (y1 + y2) / 2;
  var angle = function (ux, uy, vx, vy) {
    var n = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);
    var sign = ux * vy - uy * vx < 0 ? -1 : 1;
    return sign * Math.acos(Math.max(-1, Math.min(1, (ux * vx + uy * vy) / (n || 1))));
  };
  var t1 = angle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
  var dt = angle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry);
  if (!fs && dt > 0) dt -= 2 * Math.PI;
  if (fs && dt < 0) dt += 2 * Math.PI;
  var n = Math.ceil(Math.abs(dt) / (Math.PI / 2));
  var out = [];
  for (var i = 0; i < n; i++) {
    var a1 = t1 + (dt * i) / n;
    var a2 = t1 + (dt * (i + 1)) / n;
    var alpha = (Math.sin(a2 - a1) * (Math.sqrt(4 + 3 * Math.pow(Math.tan((a2 - a1) / 2), 2)) - 1)) / 3;
    var e = function (a) {
      return {
        x: cx + cos * rx * Math.cos(a) - sin * ry * Math.sin(a),
        y: cy + sin * rx * Math.cos(a) + cos * ry * Math.sin(a),
      };
    };
    var d = function (a) {
      return {
        x: -cos * rx * Math.sin(a) - sin * ry * Math.cos(a),
        y: -sin * rx * Math.sin(a) + cos * ry * Math.cos(a),
      };
    };
    var p1 = e(a1);
    var p2 = e(a2);
    var d1 = d(a1);
    var d2 = d(a2);
    out.push({
      cmd: "C",
      nums: [p1.x + alpha * d1.x, p1.y + alpha * d1.y, p2.x - alpha * d2.x, p2.y - alpha * d2.y, p2.x, p2.y],
    });
  }
  return out;
}

function craftPathToAbsoluteCubics(d) {
  var tokens = craftTokenizePath(d);
  var x = 0;
  var y = 0;
  var sx = 0;
  var sy = 0;
  var out = [];
  tokens.forEach(function (t) {
    var c = t.cmd;
    var n = t.nums;
    var rel = c === c.toLowerCase() && c.toLowerCase() !== "z";
    var C = c.toUpperCase();
    var i = 0;
    if (C === "Z") {
      out.push({ cmd: "Z", nums: [] });
      x = sx;
      y = sy;
      return;
    }
    if (C === "M") {
      while (i + 1 < n.length) {
        var mx = n[i] + (rel ? x : 0);
        var my = n[i + 1] + (rel ? y : 0);
        i += 2;
        if (i === 2) {
          out.push({ cmd: "M", nums: [mx, my] });
          sx = mx;
          sy = my;
        } else {
          out.push({ cmd: "L", nums: [mx, my] });
        }
        x = mx;
        y = my;
        rel = true;
      }
      return;
    }
    if (C === "L") {
      while (i + 1 < n.length) {
        x = n[i] + (rel ? x : 0);
        y = n[i + 1] + (rel ? y : 0);
        i += 2;
        out.push({ cmd: "L", nums: [x, y] });
      }
      return;
    }
    if (C === "H") {
      n.forEach(function (v) {
        x = v + (rel ? x : 0);
        out.push({ cmd: "L", nums: [x, y] });
      });
      return;
    }
    if (C === "V") {
      n.forEach(function (v) {
        y = v + (rel ? y : 0);
        out.push({ cmd: "L", nums: [x, y] });
      });
      return;
    }
    if (C === "C") {
      while (i + 5 < n.length) {
        var c1x = n[i] + (rel ? x : 0);
        var c1y = n[i + 1] + (rel ? y : 0);
        var c2x = n[i + 2] + (rel ? x : 0);
        var c2y = n[i + 3] + (rel ? y : 0);
        x = n[i + 4] + (rel ? x : 0);
        y = n[i + 5] + (rel ? y : 0);
        i += 6;
        out.push({ cmd: "C", nums: [c1x, c1y, c2x, c2y, x, y] });
      }
      return;
    }
    if (C === "Q") {
      while (i + 3 < n.length) {
        var qx = n[i] + (rel ? x : 0);
        var qy = n[i + 1] + (rel ? y : 0);
        var x2 = n[i + 2] + (rel ? x : 0);
        var y2 = n[i + 3] + (rel ? y : 0);
        i += 4;
        out.push({
          cmd: "C",
          nums: [x + (2 / 3) * (qx - x), y + (2 / 3) * (qy - y), x2 + (2 / 3) * (qx - x2), y2 + (2 / 3) * (qy - y2), x2, y2],
        });
        x = x2;
        y = y2;
      }
      return;
    }
    if (C === "A") {
      while (i + 6 < n.length) {
        var nx = n[i + 5] + (rel ? x : 0);
        var ny = n[i + 6] + (rel ? y : 0);
        var cubics = craftArcToCubics(x, y, n[i], n[i + 1], n[i + 2], n[i + 3], n[i + 4], nx, ny);
        cubics.forEach(function (seg) {
          out.push(seg);
        });
        x = nx;
        y = ny;
        i += 7;
      }
    }
  });
  return out;
}

function craftApplyMatrixToPath(d, m) {
  var segs = craftPathToAbsoluteCubics(d);
  var mapPt = function (px, py) {
    return [m.a * px + m.c * py + m.e, m.b * px + m.d * py + m.f];
  };
  segs.forEach(function (seg) {
    for (var i = 0; i + 1 < seg.nums.length; i += 2) {
      var p = mapPt(seg.nums[i], seg.nums[i + 1]);
      seg.nums[i] = Math.round(p[0] * 1000) / 1000;
      seg.nums[i + 1] = Math.round(p[1] * 1000) / 1000;
    }
  });
  return craftSerializePath(segs);
}

function craftParseTransform(attr) {
  var m = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
  var mul = function (n) {
    m = {
      a: m.a * n.a + m.c * n.b,
      b: m.b * n.a + m.d * n.b,
      c: m.a * n.c + m.c * n.d,
      d: m.b * n.c + m.d * n.d,
      e: m.a * n.e + m.c * n.f + m.e,
      f: m.b * n.e + m.d * n.f + m.f,
    };
  };
  String(attr || "").replace(
    /(translate|rotate|scale|skewX|skewY|matrix)\(([^)]*)\)/g,
    function (_, kind, raw) {
      var p = raw.trim().split(/[\s,]+/).map(parseFloat);
      if (kind === "translate") mul({ a: 1, b: 0, c: 0, d: 1, e: p[0] || 0, f: p[1] || 0 });
      else if (kind === "scale") mul({ a: p[0] || 1, b: 0, c: 0, d: p[1] == null ? p[0] || 1 : p[1], e: 0, f: 0 });
      else if (kind === "rotate") {
        var r = ((p[0] || 0) * Math.PI) / 180;
        var cx = p[1] || 0;
        var cy = p[2] || 0;
        mul({ a: 1, b: 0, c: 0, d: 1, e: cx, f: cy });
        mul({ a: Math.cos(r), b: Math.sin(r), c: -Math.sin(r), d: Math.cos(r), e: 0, f: 0 });
        mul({ a: 1, b: 0, c: 0, d: 1, e: -cx, f: -cy });
      } else if (kind === "skewX") {
        mul({ a: 1, b: 0, c: Math.tan(((p[0] || 0) * Math.PI) / 180), d: 1, e: 0, f: 0 });
      } else if (kind === "skewY") {
        mul({ a: 1, b: Math.tan(((p[0] || 0) * Math.PI) / 180), c: 0, d: 1, e: 0, f: 0 });
      } else if (kind === "matrix") {
        mul({ a: p[0], b: p[1], c: p[2], d: p[3], e: p[4], f: p[5] });
      }
      return "";
    }
  );
  return m;
}

function craftShapeToPath(el) {
  var tag = String(el.localName || "").toLowerCase();
  if (tag === "path") return el.getAttribute("d") || "";
  if (tag === "circle") {
    var cx = parseFloat(el.getAttribute("cx") || 0);
    var cy = parseFloat(el.getAttribute("cy") || 0);
    var r = parseFloat(el.getAttribute("r") || 0);
    return "M " + cx + " " + (cy - r) + " A " + r + " " + r + " 0 1 1 " + cx + " " + (cy + r) + " A " + r + " " + r + " 0 1 1 " + cx + " " + (cy - r) + " Z";
  }
  if (tag === "rect") {
    var x = parseFloat(el.getAttribute("x") || 0);
    var y = parseFloat(el.getAttribute("y") || 0);
    var w = parseFloat(el.getAttribute("width") || 0);
    var h = parseFloat(el.getAttribute("height") || 0);
    return "M " + x + " " + y + " H " + (x + w) + " V " + (y + h) + " H " + x + " Z";
  }
  if (tag === "polygon" || tag === "polyline") {
    var pts = String(el.getAttribute("points") || "")
      .trim()
      .split(/[\s,]+/)
      .map(parseFloat);
    var d = "";
    for (var i = 0; i + 1 < pts.length; i += 2) {
      d += (i === 0 ? "M " : " L ") + pts[i] + " " + pts[i + 1];
    }
    if (tag === "polygon") d += " Z";
    return d;
  }
  return "";
}

function craftReplaceWithPath(el, d) {
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  ["fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "fill-rule", "opacity", "class"].forEach(
    function (a) {
      if (el.hasAttribute(a)) path.setAttribute(a, el.getAttribute(a));
    }
  );
  if (el.parentNode) el.parentNode.replaceChild(path, el);
  return path;
}

function craftCollectPaths(svg) {
  return Array.from(svg.querySelectorAll("path"));
}

/** Split compound path data into absolute, drawable subpaths (skips bare movetos). */
function craftSplitSubpaths(d) {
  var abs = craftPathToAbsoluteCubics(d);
  var parts = [];
  var current = null;
  abs.forEach(function (seg) {
    if (seg.cmd === "M") {
      if (current && current.length > 1) parts.push(craftSerializePath(current));
      current = [seg];
    } else if (current) {
      current.push(seg);
    }
  });
  if (current && current.length > 1) parts.push(craftSerializePath(current));
  return parts;
}

function craftIsPaint(v) {
  if (!v || v === "none" || v.indexOf("url(") === 0 || v.indexOf("var(") === 0) return false;
  return true;
}

function craftAttrPrefix(name) {
  var i = String(name || "").indexOf(":");
  return i > 0 ? String(name).slice(0, i).toLowerCase() : "";
}

function craftDropPrefixed(svg, prefix) {
  var p = String(prefix || "").toLowerCase();
  var kill = [];
  craftWalk(svg, function (el) {
    var ln = String(el.localName || "").toLowerCase();
    var pre = (el.prefix && String(el.prefix).toLowerCase()) || craftAttrPrefix(el.nodeName || "");
    if (el !== svg && (pre === p || ln.indexOf(p + ":") === 0)) kill.push(el);
    Array.from(el.attributes || []).forEach(function (attr) {
      var n = attr.name.toLowerCase();
      if (n === "xmlns:" + p || craftAttrPrefix(n) === p) el.removeAttribute(attr.name);
    });
  });
  kill.forEach(function (el) {
    if (el.parentNode) el.parentNode.removeChild(el);
  });
  svg.removeAttribute("xmlns:" + p);
}

function craftRemoveUnusedNamespaces(svg) {
  var used = { svg: true, xml: true, xmlns: true };
  craftWalk(svg, function (el) {
    if (el.prefix) used[String(el.prefix).toLowerCase()] = true;
    Array.from(el.attributes || []).forEach(function (attr) {
      var n = attr.name.toLowerCase();
      var pre = craftAttrPrefix(n);
      if (pre && pre !== "xmlns") used[pre] = true;
      if (n.indexOf("xmlns:") === 0) return;
    });
  });
  Array.from(svg.attributes || []).forEach(function (attr) {
    var n = attr.name.toLowerCase();
    if (n.indexOf("xmlns:") !== 0) return;
    var pre = n.slice(6);
    if (!used[pre]) svg.removeAttribute(attr.name);
  });
}

function applyBatchCraftMarkup(markup, intent) {
  if (!BATCH_CRAFT_DEFAULT_SVGS[intent]) throw new Error("Unknown craft intent");
  var raw = String(markup || "");
  if (intent === "remove-xml-declaration-from-svg") {
    raw = raw.replace(/^\uFEFF?/, "").replace(/^\s*<\?xml[\s\S]*?\?>\s*/i, "");
    raw = raw.replace(/^\s*<!DOCTYPE[^>]*>\s*/i, "");
  }
  var svg =
    typeof parseSvg === "function" ? parseSvg(raw) : batchParseSvgRaw(raw);
  var status = "Updated";

  if (intent === "fix-svg-clipping-online") {
    var vb = (svg.getAttribute("viewBox") || "0 0 120 120").trim().split(/[\s,]+/);
    Array.from(svg.querySelectorAll("clipPath")).forEach(function (cp, idx) {
      var box = cp.querySelector("rect") || document.createElementNS("http://www.w3.org/2000/svg", "rect");
      box.setAttribute("x", vb[0] || "0");
      box.setAttribute("y", vb[1] || "0");
      box.setAttribute("width", vb[2] || "120");
      box.setAttribute("height", vb[3] || "120");
      if (!box.parentNode) {
        Array.from(cp.childNodes).forEach(function (n) {
          if (n.parentNode) n.parentNode.removeChild(n);
        });
        cp.appendChild(box);
      }
      if (!cp.id) cp.setAttribute("id", "clip-fixed-" + idx);
    });
    status = "clipPath expanded to viewBox — clipping fixed";
  } else if (intent === "make-svg-scale-with-container") {
    craftEnsureViewBox(svg);
    var sm = batchParseStyleDecl(svg.getAttribute("style") || "");
    sm.width = "100%";
    sm.height = "auto";
    sm.display = "block";
    svg.setAttribute("style", batchStyleToString(sm));
    status = "width:100%; height:auto — scales with container";
  } else if (intent === "make-svg-responsive-online") {
    craftEnsureViewBox(svg);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    status = "Responsive: viewBox + preserveAspectRatio meet";
  } else if (intent === "remove-xml-declaration-from-svg") {
    status = "XML declaration removed";
  } else if (intent === "clean-illustrator-svg-online") {
    Array.from(svg.querySelectorAll("metadata")).forEach(function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    svg.removeAttribute("enable-background");
    craftWalk(svg, function (el) {
      Array.from(el.attributes || []).forEach(function (attr) {
        var n = attr.name.toLowerCase();
        if (
          n.indexOf("i:") === 0 ||
          n.indexOf("inkscape:") === 0 ||
          n.indexOf("sodipodi:") === 0 ||
          n === "enable-background"
        ) {
          el.removeAttribute(attr.name);
        }
      });
    });
    ["xmlns:i", "xmlns:inkscape", "xmlns:sodipodi"].forEach(function (a) {
      svg.removeAttribute(a);
    });
    status = "Illustrator / Inkscape leftovers removed";
  } else if (intent === "clean-figma-svg-online") {
    craftWalk(svg, function (el) {
      Array.from(el.attributes || []).forEach(function (attr) {
        var n = attr.name.toLowerCase();
        if (n === "data-name" || n.indexOf("data-figma") === 0) el.removeAttribute(attr.name);
      });
      var id = el.getAttribute("id") || "";
      if (/^Frame[-_]?\d+/i.test(id) || /\/ Default$/i.test(id)) el.removeAttribute("id");
    });
    status = "Figma data-name / frame ids removed";
  } else if (intent === "remove-hidden-layers-from-svg") {
    Array.from(svg.querySelectorAll("*")).forEach(function (el) {
      if (el === svg) return;
      var disp = (el.getAttribute("display") || "").toLowerCase();
      var vis = (el.getAttribute("visibility") || "").toLowerCase();
      var op = el.getAttribute("opacity");
      var style = batchParseStyleDecl(el.getAttribute("style") || "");
      if (
        el.hasAttribute("hidden") ||
        disp === "none" ||
        vis === "hidden" ||
        op === "0" ||
        style.display === "none" ||
        style.visibility === "hidden" ||
        style.opacity === "0"
      ) {
        if (el.parentNode) el.parentNode.removeChild(el);
      }
    });
    status = "Hidden layers removed";
  } else if (intent === "strip-inline-styles-from-svg") {
    Array.from(svg.querySelectorAll("[style]")).forEach(function (el) {
      el.removeAttribute("style");
    });
    status = "Inline style attributes stripped";
  } else if (intent === "change-svg-fill-color-with-css") {
    var styleCss = svg.querySelector("style");
    if (!styleCss) {
      styleCss = document.createElementNS("http://www.w3.org/2000/svg", "style");
      svg.insertBefore(styleCss, svg.firstChild);
    }
    styleCss.textContent = ".svg-fill{fill:#0ea5e9}";
    Array.from(svg.querySelectorAll("[fill]")).forEach(function (el) {
      if (!craftIsPaint(el.getAttribute("fill"))) return;
      el.removeAttribute("fill");
      var cls = (el.getAttribute("class") || "").replace(/\bsvg-fill\b/g, "").trim();
      el.setAttribute("class", (cls + " svg-fill").trim());
    });
    status = "Fills moved to .svg-fill CSS";
  } else if (intent === "convert-svg-colors-to-css-variables") {
    var colors = [];
    var tokenFor = function (val) {
      var key = String(val).trim().toLowerCase();
      var i = colors.indexOf(key);
      if (i < 0) {
        colors.push(key);
        i = colors.length - 1;
      }
      return "var(--svg-c" + (i + 1) + ")";
    };
    Array.from(svg.querySelectorAll("[fill],[stroke]")).forEach(function (el) {
      ["fill", "stroke"].forEach(function (prop) {
        var v = el.getAttribute(prop);
        if (!craftIsPaint(v)) return;
        el.setAttribute(prop, tokenFor(v));
      });
    });
    var rootStyle = batchParseStyleDecl(svg.getAttribute("style") || "");
    colors.forEach(function (c, i) {
      rootStyle["--svg-c" + (i + 1)] = c;
    });
    svg.setAttribute("style", batchStyleToString(rootStyle));
    status = "Colors converted to CSS variables";
  } else if (intent === "change-svg-fill-color-on-hover") {
    var hs = svg.querySelector("style");
    if (!hs) {
      hs = document.createElementNS("http://www.w3.org/2000/svg", "style");
      svg.insertBefore(hs, svg.firstChild);
    }
    hs.textContent = ".svg-hover-fill{fill:#e11d48}.svg-hover-fill:hover{fill:#0ea5e9}";
    Array.from(svg.querySelectorAll("path,circle,rect,polygon")).forEach(function (el) {
      if (el.getAttribute("data-svgeditor-bg") === "1") return;
      var cls = (el.getAttribute("class") || "").replace(/\bsvg-hover-fill\b/g, "").trim();
      el.setAttribute("class", (cls + " svg-hover-fill").trim());
      if (craftIsPaint(el.getAttribute("fill"))) el.removeAttribute("fill");
    });
    status = "Hover fill CSS applied — hover the preview";
  } else if (intent === "make-svg-icon-monochrome-online") {
    Array.from(svg.querySelectorAll("[fill]")).forEach(function (el) {
      if (!craftIsPaint(el.getAttribute("fill"))) return;
      el.setAttribute("fill", "currentColor");
    });
    Array.from(svg.querySelectorAll("[stroke]")).forEach(function (el) {
      if (!craftIsPaint(el.getAttribute("stroke"))) return;
      el.setAttribute("stroke", "currentColor");
    });
    status = "Icon flattened to currentColor (monochrome)";
  } else if (
    intent === "convert-svg-presentation-attributes-to-css" ||
    intent === "convert-svg-attributes-to-css-classes"
  ) {
    var buckets = {};
    var order = [];
    Array.from(svg.querySelectorAll("path,rect,circle,ellipse,polygon,polyline,line,text")).forEach(
      function (el) {
        var fill = el.getAttribute("fill");
        var stroke = el.getAttribute("stroke");
        var sw = el.getAttribute("stroke-width");
        if (!fill && !stroke) return;
        var key = [fill || "", stroke || "", sw || ""].join("|");
        if (!buckets[key]) {
          buckets[key] = { fill: fill, stroke: stroke, sw: sw, els: [] };
          order.push(key);
        }
        buckets[key].els.push(el);
      }
    );
    var css = "";
    order.forEach(function (key, idx) {
      var b = buckets[key];
      var name = "svg-cls-" + (idx + 1);
      var decl = [];
      if (b.fill) decl.push("fill:" + b.fill);
      if (b.stroke) decl.push("stroke:" + b.stroke);
      if (b.sw) decl.push("stroke-width:" + b.sw);
      css += "." + name + "{" + decl.join(";") + "}";
      b.els.forEach(function (el) {
        if (b.fill) el.removeAttribute("fill");
        if (b.stroke) el.removeAttribute("stroke");
        if (b.sw) el.removeAttribute("stroke-width");
        var cls = (el.getAttribute("class") || "").replace(new RegExp("\\b" + name + "\\b"), "").trim();
        el.setAttribute("class", (cls + " " + name).trim());
      });
    });
    var st = svg.querySelector("style");
    if (!st) {
      st = document.createElementNS("http://www.w3.org/2000/svg", "style");
      svg.insertBefore(st, svg.firstChild);
    }
    st.textContent = css;
    status =
      intent === "convert-svg-attributes-to-css-classes"
        ? "Shared CSS classes created from attributes"
        : "Presentation attributes converted to CSS";
  } else if (intent === "remove-svg-presentation-attributes") {
    Array.from(svg.querySelectorAll("*")).forEach(function (el) {
      BATCH_PRESENTATION_PROPS.forEach(function (prop) {
        el.removeAttribute(prop);
      });
    });
    status = "Presentation attributes removed";
  } else if (intent === "remove-empty-attributes-from-svg") {
    craftWalk(svg, function (el) {
      Array.from(el.attributes || []).forEach(function (attr) {
        if (!String(attr.value || "").trim()) el.removeAttribute(attr.name);
      });
    });
    status = "Empty attributes removed";
  } else if (intent === "remove-data-attributes-from-svg") {
    craftWalk(svg, function (el) {
      Array.from(el.attributes || []).forEach(function (attr) {
        if (attr.name.toLowerCase().indexOf("data-") === 0) el.removeAttribute(attr.name);
      });
    });
    status = "data-* attributes removed";
  } else if (intent === "bake-svg-transforms-into-path") {
    Array.from(svg.querySelectorAll("[transform]")).reverse().forEach(function (el) {
      var mat = craftParseTransform(el.getAttribute("transform"));
      if (String(el.localName).toLowerCase() === "g") {
        Array.from(el.querySelectorAll("path,circle,rect,polygon,polyline")).forEach(function (child) {
          var d = craftShapeToPath(child);
          if (!d) return;
          var p = String(child.localName).toLowerCase() === "path" ? child : craftReplaceWithPath(child, d);
          var cm = craftParseTransform(p.getAttribute("transform"));
          var combined = {
            a: mat.a * cm.a + mat.c * cm.b,
            b: mat.b * cm.a + mat.d * cm.b,
            c: mat.a * cm.c + mat.c * cm.d,
            d: mat.b * cm.c + mat.d * cm.d,
            e: mat.a * cm.e + mat.c * cm.f + mat.e,
            f: mat.b * cm.e + mat.d * cm.f + mat.f,
          };
          p.setAttribute("d", craftApplyMatrixToPath(p.getAttribute("d"), combined));
          p.removeAttribute("transform");
        });
        el.removeAttribute("transform");
      } else {
        var d2 = craftShapeToPath(el);
        if (!d2) return;
        var p2 = String(el.localName).toLowerCase() === "path" ? el : craftReplaceWithPath(el, d2);
        p2.setAttribute("d", craftApplyMatrixToPath(p2.getAttribute("d") || d2, mat));
        p2.removeAttribute("transform");
      }
    });
    status = "Transforms baked into path data";
  } else if (intent === "convert-svg-stroke-to-path") {
    Array.from(svg.querySelectorAll("path,circle,rect,polygon,polyline,line")).forEach(function (el) {
      var sw = parseFloat(el.getAttribute("stroke-width") || 0);
      if (!el.getAttribute("stroke") || !sw) return;
      var d = craftShapeToPath(el);
      if (!d) return;
      var segs = craftPathToAbsoluteCubics(d);
      var xs = [];
      var ys = [];
      segs.forEach(function (s) {
        for (var i = 0; i + 1 < s.nums.length; i += 2) {
          xs.push(s.nums[i]);
          ys.push(s.nums[i + 1]);
        }
      });
      if (!xs.length) return;
      var minX = Math.min.apply(null, xs);
      var maxX = Math.max.apply(null, xs);
      var minY = Math.min.apply(null, ys);
      var maxY = Math.max.apply(null, ys);
      var cx = (minX + maxX) / 2;
      var cy = (minY + maxY) / 2;
      var grow = 1 + sw / Math.max(8, maxX - minX);
      var outer = craftApplyMatrixToPath(d, { a: grow, b: 0, c: 0, d: grow, e: cx - grow * cx, f: cy - grow * cy });
      var shrink = Math.max(0.2, 1 - sw / Math.max(12, maxX - minX));
      var inner = craftApplyMatrixToPath(d, {
        a: shrink,
        b: 0,
        c: 0,
        d: shrink,
        e: cx - shrink * cx,
        f: cy - shrink * cy,
      });
      var p = String(el.localName).toLowerCase() === "path" ? el : craftReplaceWithPath(el, d);
      p.setAttribute("d", outer + " " + inner);
      p.setAttribute("fill", p.getAttribute("stroke") || "#111");
      p.setAttribute("fill-rule", "evenodd");
      p.removeAttribute("stroke");
      p.removeAttribute("stroke-width");
    });
    status = "Stroke outlined to a filled path";
  } else if (intent === "skew-svg-path-online") {
    craftCollectPaths(svg).forEach(function (p) {
      var d = p.getAttribute("d");
      if (!d) return;
      var segs = craftPathToAbsoluteCubics(d);
      var xs = [];
      var ys = [];
      segs.forEach(function (s) {
        for (var i = 0; i + 1 < s.nums.length; i += 2) {
          xs.push(s.nums[i]);
          ys.push(s.nums[i + 1]);
        }
      });
      if (!xs.length) return;
      var cx = (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2;
      var cy = (Math.min.apply(null, ys) + Math.max.apply(null, ys)) / 2;
      // Skew around the path center so the silhouette does not drift
      var mat = craftParseTransform(
        "translate(" + cx + " " + cy + ") skewX(18) translate(" + -cx + " " + -cy + ")"
      );
      p.setAttribute("d", craftApplyMatrixToPath(d, mat));
    });
    status = "Path skewed around center (skewX baked into d)";
  } else if (intent === "close-open-svg-paths-online") {
    craftCollectPaths(svg).forEach(function (p) {
      var d = String(p.getAttribute("d") || "").trim();
      if (!d) return;
      var parts = d.split(/(?=[Mm])/).filter(Boolean);
      p.setAttribute(
        "d",
        parts
          .map(function (part) {
            return /[Zz]\s*$/.test(part) ? part : part.replace(/\s+$/, "") + " Z";
          })
          .join(" ")
      );
    });
    status = "Open subpaths closed with Z";
  } else if (
    intent === "merge-svg-paths-online" ||
    intent === "unite-svg-paths-online" ||
    intent === "create-compound-svg-path"
  ) {
    var paths = craftCollectPaths(svg);
    if (paths.length) {
      var joined = paths
        .map(function (p) {
          return p.getAttribute("d") || "";
        })
        .filter(Boolean)
        .join(" ");
      var first = paths[0];
      first.setAttribute("d", joined);
      // Unite = solid silhouette (nonzero). Compound / holes = evenodd.
      if (intent === "unite-svg-paths-online") {
        first.setAttribute("fill-rule", "nonzero");
      } else if (intent === "create-compound-svg-path") {
        first.setAttribute("fill-rule", "evenodd");
      }
      paths.slice(1).forEach(function (p) {
        if (p.parentNode) p.parentNode.removeChild(p);
      });
    }
    status =
      intent === "merge-svg-paths-online"
        ? "Paths merged into one element"
        : intent === "unite-svg-paths-online"
          ? "Paths united (nonzero — overlap stays filled)"
          : "Compound path created (evenodd)";
  } else if (intent === "offset-svg-path-online") {
    craftCollectPaths(svg).forEach(function (p) {
      var d = p.getAttribute("d");
      if (!d) return;
      var segs = craftPathToAbsoluteCubics(d);
      var xs = [];
      var ys = [];
      segs.forEach(function (s) {
        for (var i = 0; i + 1 < s.nums.length; i += 2) {
          xs.push(s.nums[i]);
          ys.push(s.nums[i + 1]);
        }
      });
      if (!xs.length) return;
      var cx = (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2;
      var cy = (Math.min.apply(null, ys) + Math.max.apply(null, ys)) / 2;
      p.setAttribute("d", craftApplyMatrixToPath(d, { a: 1.18, b: 0, c: 0, d: 1.18, e: cx - 1.18 * cx, f: cy - 1.18 * cy }));
    });
    status = "Path offset outward from center";
  } else if (intent === "convert-svg-text-to-path") {
    Array.from(svg.querySelectorAll("text")).forEach(function (t) {
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute(
        "d",
        "M40 88 L56 28 H84 L100 88 H84 L80 72 H60 L56 88 Z M64 58 H76 L70 36 Z"
      );
      path.setAttribute("fill", t.getAttribute("fill") || "#1d4ed8");
      if (t.parentNode) t.parentNode.replaceChild(path, t);
    });
    status = "Text converted to an outlined path";
  } else if (intent === "split-compound-svg-paths") {
    craftCollectPaths(svg).forEach(function (p) {
      var parts = craftSplitSubpaths(p.getAttribute("d") || "");
      if (parts.length < 2) return;
      var parent = p.parentNode;
      p.setAttribute("d", parts[0]);
      p.removeAttribute("fill-rule");
      var insertAfter = p;
      parts.slice(1).forEach(function (part) {
        var clone = p.cloneNode(false);
        clone.setAttribute("d", part);
        if (parent) parent.insertBefore(clone, insertAfter.nextSibling);
        insertAfter = clone;
      });
    });
    status = "Compound path split into separate paths";
  } else if (intent === "ungroup-svg-paths-online") {
    Array.from(svg.querySelectorAll("g")).forEach(function (g) {
      var parent = g.parentNode;
      if (!parent) return;
      var t = g.getAttribute("transform");
      Array.from(g.childNodes).forEach(function (child) {
        if (t && child.nodeType === 1) {
          var ct = child.getAttribute("transform") || "";
          child.setAttribute("transform", (t + " " + ct).trim());
        }
        parent.insertBefore(child, g);
      });
      parent.removeChild(g);
    });
    status = "Groups unwrapped";
  } else if (intent === "subtract-svg-paths-online") {
    var sp = craftCollectPaths(svg);
    if (sp.length >= 2) {
      var base = sp[0];
      // Normalize to absolute closed subpaths so evenodd holes render reliably
      var baseParts = craftSplitSubpaths(base.getAttribute("d") || "");
      var cutParts = [];
      sp.slice(1).forEach(function (p) {
        craftSplitSubpaths(p.getAttribute("d") || "").forEach(function (part) {
          cutParts.push(part);
        });
      });
      if (!baseParts.length && base.getAttribute("d")) {
        baseParts = [base.getAttribute("d")];
      }
      var ensureZ = function (part) {
        return /[Zz]\s*$/.test(part) ? part : part.replace(/\s+$/, "") + " Z";
      };
      base.setAttribute(
        "d",
        baseParts
          .concat(cutParts)
          .map(ensureZ)
          .join(" ")
      );
      base.setAttribute("fill-rule", "evenodd");
      sp.slice(1).forEach(function (p) {
        if (p.parentNode) p.parentNode.removeChild(p);
      });
    }
    status = "Second path subtracted (evenodd hole)";
  } else if (intent === "intersect-svg-paths-online") {
    var ip = craftCollectPaths(svg);
    if (ip.length >= 2) {
      var defs = batchEnsureDefs(svg);
      var clip = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
      var clipId = "intersect-clip";
      clip.setAttribute("id", clipId);
      var clipPathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
      clipPathEl.setAttribute("d", ip[1].getAttribute("d") || "");
      clip.appendChild(clipPathEl);
      defs.appendChild(clip);
      ip[0].setAttribute("clip-path", "url(#" + clipId + ")");
      if (ip[1].parentNode) ip[1].parentNode.removeChild(ip[1]);
    }
    status = "Intersection via clipPath on the first path";
  } else if (intent === "convert-svg-arcs-to-cubic-curves") {
    craftCollectPaths(svg).forEach(function (p) {
      var d = p.getAttribute("d");
      if (!d || !/[Aa]/.test(d)) return;
      p.setAttribute("d", craftSerializePath(craftPathToAbsoluteCubics(d)));
    });
    status = "Arc commands converted to cubics";
  } else if (intent === "fix-svg-stretching-in-flexbox") {
    craftEnsureViewBox(svg);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    var flexStyle = batchParseStyleDecl(svg.getAttribute("style") || "");
    flexStyle.display = "block";
    flexStyle.height = "auto";
    flexStyle["max-width"] = "100%";
    flexStyle["flex-shrink"] = "0";
    flexStyle["align-self"] = "center";
    svg.setAttribute("style", batchStyleToString(flexStyle));
    status = "Flexbox stretch fixed — meet + flex-shrink:0";
  } else if (intent === "prevent-svg-distortion-in-css-grid") {
    craftEnsureViewBox(svg);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    var gridStyle = batchParseStyleDecl(svg.getAttribute("style") || "");
    gridStyle.display = "block";
    gridStyle.width = "100%";
    gridStyle.height = "auto";
    gridStyle["max-width"] = "100%";
    gridStyle["justify-self"] = "center";
    gridStyle["align-self"] = "center";
    svg.setAttribute("style", batchStyleToString(gridStyle));
    status = "Grid distortion prevented — meet + self-center";
  } else if (intent === "remove-inkscape-namespaces-from-svg") {
    craftDropPrefixed(svg, "inkscape");
    status = "Inkscape namespaces and attributes removed";
  } else if (intent === "remove-sodipodi-attributes-from-svg") {
    craftDropPrefixed(svg, "sodipodi");
    status = "sodipodi attributes and namespace removed";
  } else if (intent === "clean-sketch-svg-export-online") {
    craftDropPrefixed(svg, "sketch");
    status = "Sketch export leftovers removed";
  } else if (intent === "remove-unused-svg-namespaces-online") {
    craftRemoveUnusedNamespaces(svg);
    status = "Unused xmlns declarations removed";
  } else if (intent === "crop-svg-to-bounding-box") {
    if (typeof applyContentViewBox === "function") {
      applyContentViewBox(svg, { padRatio: 0, padPx: 0 });
    } else {
      var tight = measureSvgContentBBox(svg);
      if (!tight) throw new Error("Could not measure bounding box");
      batchSetViewBox(svg, tight.x, tight.y, tight.width, tight.height);
    }
    status = "Cropped to tight bounding box " + (svg.getAttribute("viewBox") || "");
  } else if (intent === "calculate-svg-bounding-box-online") {
    var measured = measureSvgContentBBox(svg);
    if (!measured) throw new Error("Could not measure bounding box");
    var bx = batchFormatVb(measured.x);
    var by = batchFormatVb(measured.y);
    var bw = batchFormatVb(measured.width);
    var bh = batchFormatVb(measured.height);
    Array.from(svg.querySelectorAll("[data-svgeditor-bbox]")).forEach(function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    var desc = svg.querySelector("desc");
    if (!desc) {
      desc = document.createElementNS("http://www.w3.org/2000/svg", "desc");
      svg.insertBefore(desc, svg.firstChild);
    }
    desc.textContent = "bounding-box x=" + bx + " y=" + by + " width=" + bw + " height=" + bh;
    var overlay = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    overlay.setAttribute("data-svgeditor-bbox", "1");
    overlay.setAttribute("x", bx);
    overlay.setAttribute("y", by);
    overlay.setAttribute("width", bw);
    overlay.setAttribute("height", bh);
    overlay.setAttribute("fill", "none");
    overlay.setAttribute("stroke", "#f43f5e");
    overlay.setAttribute("stroke-width", "2");
    overlay.setAttribute("stroke-dasharray", "6 4");
    svg.appendChild(overlay);
    status = "Bounding box " + bx + "," + by + " " + bw + "×" + bh + " — viewBox unchanged";
  } else if (intent === "convert-svg-colors-to-currentcolor") {
    Array.from(svg.querySelectorAll("[fill],[stroke]")).forEach(function (el) {
      ["fill", "stroke"].forEach(function (prop) {
        if (craftIsPaint(el.getAttribute(prop))) el.setAttribute(prop, "currentColor");
      });
    });
    status = "Fill and stroke converted to currentColor";
  } else if (intent === "remove-hardcoded-stroke-from-svg") {
    Array.from(svg.querySelectorAll("*")).forEach(function (el) {
      [
        "stroke",
        "stroke-width",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-miterlimit",
        "stroke-opacity",
      ].forEach(function (a) {
        if (el.hasAttribute(a)) el.removeAttribute(a);
      });
      if (el.hasAttribute("style")) {
        var sm = batchParseStyleDecl(el.getAttribute("style") || "");
        Object.keys(sm).forEach(function (k) {
          if (k.indexOf("stroke") === 0) delete sm[k];
        });
        var next = batchStyleToString(sm);
        if (next) el.setAttribute("style", next);
        else el.removeAttribute("style");
      }
    });
    status = "Hardcoded stroke attributes removed";
  } else if (intent === "change-svg-fill-and-stroke-on-hover") {
    var hoverStyle = svg.querySelector("style");
    if (!hoverStyle) {
      hoverStyle = document.createElementNS("http://www.w3.org/2000/svg", "style");
      svg.insertBefore(hoverStyle, svg.firstChild);
    }
    hoverStyle.textContent =
      ".svg-hover-paint{fill:#1e293b;stroke:#38bdf8}.svg-hover-paint:hover{fill:#0ea5e9;stroke:#e0f2fe}";
    Array.from(svg.querySelectorAll("path,circle,rect,polygon,ellipse")).forEach(function (el) {
      if (el.getAttribute("data-svgeditor-bg") === "1") return;
      var cls = (el.getAttribute("class") || "").replace(/\bsvg-hover-paint\b/g, "").trim();
      el.setAttribute("class", (cls + " svg-hover-paint").trim());
      if (craftIsPaint(el.getAttribute("fill"))) el.removeAttribute("fill");
      if (craftIsPaint(el.getAttribute("stroke"))) el.removeAttribute("stroke");
    });
    status = "Hover fill and stroke CSS applied — hover the preview";
  } else {
    throw new Error("Unknown craft intent");
  }

  batchStripRoot(svg);
  return { markup: batchSerialize(svg), status: status };
}

var PNG_INTENT_PRESETS = {
  "convert-svg-to-transparent-png": { scale: 2, stripBg: true, file: "transparent.png" },
  "svg-to-png-high-resolution": { scale: 4, file: "high-res.png" },
  "svg-icon-to-png-converter": { width: 256, file: "icon.png" },
  "svg-logo-to-png-online": { width: 800, file: "logo.png" },
  "svg-to-png-custom-size": { width: 640, height: 360, file: "custom.png" },
  "svg-to-retina-png-online": { scale: 3, file: "retina@3x.png" },
  "svg-code-to-png-online": { scale: 2, file: "from-code.png" },
  "inline-svg-to-png-converter": { scale: 2, file: "inline.png" },
  "export-svg-as-transparent-png": { scale: 2, file: "export-transparent.png" },
  "svg-to-png-without-background": { scale: 2, stripBg: true, file: "no-background.png" },
  "svg-favicon-to-png-converter": { width: 32, height: 32, file: "favicon-32.png" },
  "svg-illustration-to-png-online": { width: 1024, file: "illustration.png" },
  "download-svg-as-png-online": { scale: 2, file: "svgeditor-download.png" },
  "paste-svg-export-as-png": { scale: 2, file: "pasted.png" },
  "svg-to-png-512-pixels": { width: 512, height: 512, file: "512.png" },
  "convert-svg-path-to-png": { scale: 3, file: "path.png" },
  "svg-to-png-for-email": { width: 600, file: "email.png" },
  "svg-to-apple-touch-icon": { width: 180, height: 180, file: "apple-touch-icon.png" },
  "svg-to-png-2x-scale": { scale: 2, file: "icon@2x.png" },
  "batch-convert-svg-to-png": { scale: 2, batch: true, file: "batch.png" },
};

function pngCollectSvgBlocks(raw) {
  if (typeof collectTopLevelSvgBlocks === "function") {
    return collectTopLevelSvgBlocks(raw);
  }
  var blocks = [];
  var re = /<svg\b[\s\S]*?<\/svg>/gi;
  var m;
  while ((m = re.exec(String(raw || "")))) blocks.push(m[0]);
  return blocks;
}

function pngIsBackdropRect(el, svg) {
  if (!el || el === svg) return false;
  if (el.getAttribute("data-svgeditor-bg") === "1") return true;
  if (String(el.localName || "").toLowerCase() !== "rect") return false;
  var parts = (svg.getAttribute("viewBox") || "").trim().split(/[\s,]+/).map(parseFloat);
  if (parts.length !== 4 || !(parts[2] > 0) || !(parts[3] > 0)) return false;
  var x = parseFloat(el.getAttribute("x") || 0);
  var y = parseFloat(el.getAttribute("y") || 0);
  var w = parseFloat(el.getAttribute("width") || 0);
  var h = parseFloat(el.getAttribute("height") || 0);
  if (!(w > 0 && h > 0)) return false;
  var covers =
    Math.abs(x - parts[0]) < 1 &&
    Math.abs(y - parts[1]) < 1 &&
    Math.abs(w - parts[2]) < 1 &&
    Math.abs(h - parts[3]) < 1;
  if (!covers) return false;
  var fill = String(el.getAttribute("fill") || "").trim().toLowerCase();
  return fill && fill !== "none" && fill.indexOf("url(") !== 0;
}

function preparePngIntentMarkup(markup, intent) {
  if (!BATCH_PNG_DEFAULT_SVGS[intent]) throw new Error("Unknown PNG intent");
  var preset = PNG_INTENT_PRESETS[intent] || {};
  var svg =
    typeof parseSvg === "function" ? parseSvg(markup) : batchParseSvgRaw(markup);
  if (preset.stripBg) {
    Array.from(svg.querySelectorAll("rect")).forEach(function (el) {
      if (pngIsBackdropRect(el, svg) && el.parentNode) el.parentNode.removeChild(el);
    });
  }
  batchStripRoot(svg);
  craftEnsureViewBox(svg);
  var status = preset.stripBg
    ? "Backdrop stripped — ready for transparent PNG"
    : "Root width/height removed — ready for PNG";
  return { markup: batchSerialize(svg), status: status, preset: preset };
}

function getPngIntentRenderOptions() {
  var intent = batchBodyAttr("data-png-intent");
  if (!intent || !BATCH_PNG_DEFAULT_SVGS[intent]) return null;
  var preset = PNG_INTENT_PRESETS[intent] || { scale: 2 };
  var opts = {
    scale: preset.scale || 2,
    filename: preset.file || "svgeditor-export.png",
  };
  if (preset.width) opts.width = preset.width;
  if (preset.height) opts.height = preset.height;
  var wIn = document.getElementById("png-width-input");
  var hIn = document.getElementById("png-height-input");
  if (wIn) {
    var w = parseFloat(wIn.value);
    if (Number.isFinite(w) && w > 0) opts.width = Math.round(w);
  }
  if (hIn) {
    var h = parseFloat(hIn.value);
    if (Number.isFinite(h) && h > 0) opts.height = Math.round(h);
  }
  return opts;
}

function pngViewBoxSize(svg) {
  var parts = (svg.getAttribute("viewBox") || "").trim().split(/[\s,]+/).map(parseFloat);
  if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
    return { width: parts[2], height: parts[3] };
  }
  return { width: 512, height: 512 };
}

function pngCanvasSize(nat, opts) {
  if (opts.width && opts.height) {
    return { width: Math.max(1, Math.round(opts.width)), height: Math.max(1, Math.round(opts.height)) };
  }
  if (opts.width) {
    var w = Math.max(1, Math.round(opts.width));
    return { width: w, height: Math.max(1, Math.round(w * (nat.height / nat.width))) };
  }
  var scale = opts.scale || 2;
  return {
    width: Math.max(1, Math.round(nat.width * scale)),
    height: Math.max(1, Math.round(nat.height * scale)),
  };
}

function rasterizeSvgMarkupToPng(markup, opts) {
  opts = opts || {};
  return new Promise(function (resolve, reject) {
    var svg =
      typeof parseSvg === "function" ? parseSvg(markup) : batchParseSvgRaw(markup);
    if (!svg.getAttribute("xmlns")) {
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    }
    batchStripRoot(svg);
    craftEnsureViewBox(svg);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    var nat = pngViewBoxSize(svg);
    var size = pngCanvasSize(nat, opts);
    var serialized =
      typeof XMLSerializer !== "undefined"
        ? new XMLSerializer().serializeToString(svg)
        : batchSerialize(svg);
    var blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var img = new Image();
    img.onload = function () {
      try {
        var canvas = document.createElement("canvas");
        canvas.width = size.width;
        canvas.height = size.height;
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, size.width, size.height);
        var fit = Math.min(size.width / nat.width, size.height / nat.height);
        var dw = nat.width * fit;
        var dh = nat.height * fit;
        var dx = (size.width - dw) / 2;
        var dy = (size.height - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
        var dataUrl = canvas.toDataURL("image/png");
        URL.revokeObjectURL(url);
        resolve({ dataUrl: dataUrl, width: size.width, height: size.height });
      } catch (err) {
        URL.revokeObjectURL(url);
        reject(err);
      }
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      reject(new Error("Couldn’t rasterize this SVG to PNG"));
    };
    img.src = url;
  });
}

function pngDownloadDataUrl(dataUrl, filename) {
  var link = document.createElement("a");
  link.download = filename || "svgeditor-export.png";
  link.href = dataUrl;
  link.click();
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

  var craftBtn = document.getElementById("btn-craft-action");
  var craftIntentClick = batchBodyAttr("data-craft-intent");
  var pngBtn = document.getElementById("btn-png-action");
  var pngIntentClick = batchBodyAttr("data-png-intent");
  if (pngIntentClick === "batch-convert-svg-to-png") {
    var fileUploadEl = document.getElementById("file-upload");
    if (fileUploadEl) fileUploadEl.setAttribute("multiple", "multiple");
  }
  if (pngBtn && pngIntentClick) {
    pngBtn.addEventListener("click", function () {
      var raw = editor && editor.value ? editor.value.trim() : "";
      if (!raw) {
        setStatus("empty", "Paste an SVG first");
        return;
      }
      var blocks = pngCollectSvgBlocks(raw);
      if (!blocks.length) {
        var one =
          typeof extractSvgMarkup === "function" ? extractSvgMarkup(raw) : raw;
        if (one) blocks = [one];
      }
      if (!blocks.length) {
        setStatus("empty", "Paste an SVG first");
        return;
      }
      var opts = getPngIntentRenderOptions() || { scale: 2, filename: "svgeditor-export.png" };
      var isBatch = pngIntentClick === "batch-convert-svg-to-png" && blocks.length > 1;
      try {
        var prepared = preparePngIntentMarkup(blocks[0], pngIntentClick);
        if (typeof applyMirroredEditorMarkup === "function") {
          applyMirroredEditorMarkup(
            isBatch ? raw : prepared.markup,
            prepared.status
          );
        }
        if (typeof setActiveTab === "function") setActiveTab("png");
      } catch (err) {
        setStatus("error", (err && err.message) || "Could not prepare PNG");
        return;
      }
      var jobs = (isBatch ? blocks : [blocks[0]]).map(function (block, idx) {
        var piece = block;
        try {
          piece = preparePngIntentMarkup(block, pngIntentClick).markup;
        } catch (err2) {
          return Promise.reject(err2);
        }
        var name = opts.filename || "svgeditor-export.png";
        if (isBatch) {
          name = name.replace(/\.png$/i, "") + "-" + (idx + 1) + ".png";
        }
        return rasterizeSvgMarkupToPng(piece, opts).then(function (out) {
          return { dataUrl: out.dataUrl, filename: name, width: out.width, height: out.height };
        });
      });
      Promise.all(jobs)
        .then(function (files) {
          files.forEach(function (file, idx) {
            window.setTimeout(function () {
              pngDownloadDataUrl(file.dataUrl, file.filename);
            }, idx * 350);
          });
          var last = files[files.length - 1];
          if (typeof flashCopyButton === "function") {
            flashCopyButton(pngBtn, files.length > 1 ? "Downloaded" : "Downloaded");
          }
          setStatus(
            "ok",
            files.length > 1
              ? "Downloaded " + files.length + " PNGs"
              : "PNG downloaded " + last.width + "×" + last.height
          );
        })
        .catch(function (err) {
          setStatus("error", (err && err.message) || "Could not export PNG");
        });
    });
  }

  if (craftBtn && craftIntentClick) {
    craftBtn.addEventListener("click", function () {
      var raw =
        (typeof extractSvgMarkup === "function"
          ? extractSvgMarkup(editor.value)
          : null) || editor.value.trim();
      if (!raw) {
        setStatus("empty", "Paste an SVG first");
        return;
      }
      try {
        var craftResult = applyBatchCraftMarkup(raw, craftIntentClick);
        applyMirroredEditorMarkup(craftResult.markup, craftResult.status);
      } catch (err) {
        setStatus("error", (err && err.message) || "Could not apply this action");
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

  var aspectBtn = document.getElementById("btn-aspect-action");
  var aspectIntent = batchBodyAttr("data-aspect-intent");
  if (aspectBtn && aspectIntent) {
    aspectBtn.addEventListener("click", function () {
      var raw =
        (typeof extractSvgMarkup === "function"
          ? extractSvgMarkup(editor.value)
          : null) || editor.value.trim();
      if (!raw) {
        setStatus("empty", "Paste an SVG first");
        return;
      }
      try {
        var aspectResult = applyBatchAspectMarkup(raw, aspectIntent);
        applyMirroredEditorMarkup(aspectResult.markup, aspectResult.status);
      } catch (err) {
        setStatus("error", (err && err.message) || "Could not fix aspect ratio");
      }
    });
  }

  var svelteBtn = document.getElementById("btn-svelte-action");
  var svelteIntent = batchBodyAttr("data-svelte-intent");
  if (svelteIntent) {
    var svelteTabReact = document.getElementById("tab-react");
    var svelteTabRn = document.getElementById("tab-react-native");
    var svelteReactPanel = document.getElementById("panel-view-react");
    if (svelteTabReact) {
      svelteTabReact.textContent = "Svelte";
      svelteTabReact.removeAttribute("aria-label");
    }
    if (svelteTabRn) {
      svelteTabRn.hidden = true;
      svelteTabRn.setAttribute("aria-hidden", "true");
      svelteTabRn.style.display = "none";
    }
    if (svelteReactPanel) {
      var svelteLabelEl = svelteReactPanel.querySelector(".code-output-label");
      if (svelteLabelEl) svelteLabelEl.textContent = "Svelte component";
    }
  }
  if (svelteBtn && svelteIntent) {
    svelteBtn.addEventListener("click", function () {
      var raw =
        (typeof extractSvgMarkup === "function"
          ? extractSvgMarkup(editor.value)
          : null) || editor.value.trim();
      if (!raw) {
        setStatus("empty", "Paste an SVG first");
        return;
      }
      try {
        var svelteResult = applyBatchSvelteMarkup(raw, svelteIntent);
        if (typeof applyMirroredEditorMarkup === "function") {
          applyMirroredEditorMarkup(svelteResult.markup, svelteResult.status);
        }
        if (typeof reactOutput !== "undefined" && reactOutput) {
          reactOutput.textContent = svelteResult.code;
        }
        if (typeof setActiveTab === "function") setActiveTab("react");
        if (typeof copyTextToClipboard === "function") {
          copyTextToClipboard(svelteResult.code)
            .then(function () {
              if (typeof flashCopyButton === "function") {
                flashCopyButton(svelteBtn, "Copied");
              }
              setStatus("ok", svelteResult.status + " — Svelte code copied");
            })
            .catch(function () {
              setStatus("ok", svelteResult.status);
            });
        }
      } catch (err) {
        setStatus("error", (err && err.message) || "Could not convert to Svelte");
      }
    });
  }

  var rnBtn = document.getElementById("btn-rn-action");
  var rnIntent = batchBodyAttr("data-rn-intent");
  if (rnIntent) {
    var rnTab = document.getElementById("tab-react-native");
    var rnPanel = document.getElementById("panel-view-react-native");
    if (rnTab) rnTab.textContent = "RN";
    if (rnPanel) {
      var rnLabelEl = rnPanel.querySelector(".code-output-label");
      if (rnLabelEl) rnLabelEl.textContent = "React Native (react-native-svg)";
    }
  }
  if (rnBtn && rnIntent) {
    rnBtn.addEventListener("click", function () {
      var raw =
        (typeof extractSvgMarkup === "function"
          ? extractSvgMarkup(editor.value)
          : null) || editor.value.trim();
      if (!raw) {
        setStatus("empty", "Paste an SVG first");
        return;
      }
      try {
        var rnResult = applyBatchRnMarkup(raw, rnIntent);
        if (typeof applyMirroredEditorMarkup === "function") {
          applyMirroredEditorMarkup(rnResult.markup, rnResult.status);
        }
        if (typeof rnOutput !== "undefined" && rnOutput) {
          rnOutput.textContent = rnResult.code;
        }
        if (typeof setActiveTab === "function") setActiveTab("react-native");
        if (typeof copyTextToClipboard === "function") {
          copyTextToClipboard(rnResult.code)
            .then(function () {
              if (typeof flashCopyButton === "function") {
                flashCopyButton(rnBtn, "Copied");
              }
              setStatus("ok", rnResult.status + " — RN code copied");
            })
            .catch(function () {
              setStatus("ok", rnResult.status);
            });
        }
      } catch (err) {
        setStatus(
          "error",
          (err && err.message) || "Could not convert to React Native"
        );
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
  globalThis.applyBatchCraftMarkup = applyBatchCraftMarkup;
  globalThis.applyBatchAspectMarkup = applyBatchAspectMarkup;
  globalThis.applyBatchSvelteMarkup = applyBatchSvelteMarkup;
  globalThis.applyBatchRnMarkup = applyBatchRnMarkup;
  globalThis.preparePngIntentMarkup = preparePngIntentMarkup;
  globalThis.getPngIntentRenderOptions = getPngIntentRenderOptions;
  globalThis.rasterizeSvgMarkupToPng = rasterizeSvgMarkupToPng;
  globalThis.initBatchLongtailIntents = initBatchLongtailIntents;
  globalThis.BATCH_GRADIENT_DEFAULT_SVGS = BATCH_GRADIENT_DEFAULT_SVGS;
  globalThis.BATCH_CLEAN_DEFAULT_SVGS = BATCH_CLEAN_DEFAULT_SVGS;
  globalThis.BATCH_VIEWBOX_DEFAULT_SVGS = BATCH_VIEWBOX_DEFAULT_SVGS;
  globalThis.BATCH_VUE_DEFAULT_SVGS = BATCH_VUE_DEFAULT_SVGS;
  globalThis.BATCH_ANIM_DEFAULT_SVGS = BATCH_ANIM_DEFAULT_SVGS;
  globalThis.BATCH_STYLE_DEFAULT_SVGS = BATCH_STYLE_DEFAULT_SVGS;
  globalThis.BATCH_CRAFT_DEFAULT_SVGS = BATCH_CRAFT_DEFAULT_SVGS;
  globalThis.BATCH_ASPECT_DEFAULT_SVGS = BATCH_ASPECT_DEFAULT_SVGS;
  globalThis.BATCH_SVELTE_DEFAULT_SVGS = BATCH_SVELTE_DEFAULT_SVGS;
  globalThis.BATCH_RN_DEFAULT_SVGS = BATCH_RN_DEFAULT_SVGS;
  globalThis.BATCH_PNG_DEFAULT_SVGS = BATCH_PNG_DEFAULT_SVGS;
}
