const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="plate" x1="24" y1="12" x2="176" y2="188" gradientUnits="userSpaceOnUse">
      <stop stop-color="#071526"/>
      <stop offset="0.55" stop-color="#0B1B33"/>
      <stop offset="1" stop-color="#0E3A5C"/>
    </linearGradient>
    <linearGradient id="bracket" x1="36" y1="44" x2="164" y2="156" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A5F3FC"/>
      <stop offset="0.45" stop-color="#38BDF8"/>
      <stop offset="1" stop-color="#2563EB"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="50" fill="url(#plate)"/>
  <rect x="5" y="5" width="190" height="190" rx="45" stroke="#67E8F9" stroke-opacity="0.18" fill="none"/>
  <path d="M64 51L34 100L64 149" stroke="url(#bracket)" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M136 51L166 100L136 149" stroke="url(#bracket)" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="100" cy="100" r="35" stroke="#38BDF8" stroke-opacity="0.28" stroke-width="6" fill="none"/>
  <circle cx="100" cy="100" r="24" stroke="#7DD3FC" stroke-width="9" fill="none"/>
  <circle cx="100" cy="100" r="11.5" fill="#F0F9FF"/>
  <circle cx="100" cy="100" r="5" fill="#0369A1"/>
</svg>`;

const ICON_DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3v18"/>
  <path d="M3 12h18"/>
  <circle cx="12" cy="12" r="8"/>
</svg>`;

const ANIMATION_DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" width="360" height="240" role="img" aria-label="Animated gradient wave">
  <style>
    .wave { stroke-dasharray: 12 8; animation: flow 2.8s linear infinite; }
    .orb { transform-box: fill-box; transform-origin: center; animation: float 2.4s ease-in-out infinite; }
    .orb-two { animation-delay: -.8s; }
    .orb-three { animation-delay: -1.6s; }
    @keyframes flow { to { stroke-dashoffset: -40; } }
    @keyframes float { 0%, 100% { transform: translateY(12px) scale(.88); opacity: .55; } 50% { transform: translateY(-10px) scale(1.08); opacity: 1; } }
  </style>
  <defs>
    <linearGradient id="wave-gradient" x1="20" y1="20" x2="220" y2="140" gradientUnits="userSpaceOnUse">
      <stop stop-color="#22d3ee"/><stop offset=".5" stop-color="#a5f3fc"/><stop offset="1" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="240" height="160" rx="28" fill="#071526"/>
  <path class="wave" d="M18 92c24-52 48 52 72 0s48-52 72 0 48 52 60 0" fill="none" stroke="url(#wave-gradient)" stroke-width="7" stroke-linecap="round"/>
  <path d="M18 92c24-52 48 52 72 0s48-52 72 0 48 52 60 0" fill="none" stroke="#e0f2fe" stroke-opacity=".18" stroke-width="2"/>
  <circle class="orb" cx="48" cy="48" r="10" fill="#67e8f9"/>
  <circle class="orb orb-two" cx="120" cy="112" r="7" fill="#a5f3fc"/>
  <circle class="orb orb-three" cx="194" cy="48" r="9" fill="#818cf8"/>
</svg>`;

/** Asymmetric arrow so a horizontal mirror is obvious in the preview. */
const MIRROR_DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 140" width="360" height="210" role="img" aria-label="Arrow path pointing right — click Mirror horizontally to flip">
  <defs>
    <linearGradient id="mirror-stroke" x1="36" y1="28" x2="210" y2="112" gradientUnits="userSpaceOnUse">
      <stop stop-color="#67e8f9"/>
      <stop offset="0.55" stop-color="#38bdf8"/>
      <stop offset="1" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="240" height="140" rx="24" fill="#071526"/>
  <rect x="10" y="10" width="220" height="120" rx="18" fill="none" stroke="#67e8f9" stroke-opacity="0.16"/>
  <line x1="120" y1="22" x2="120" y2="118" stroke="#7dd3fc" stroke-opacity="0.28" stroke-width="1.5" stroke-dasharray="4 6"/>
  <path d="M48 70 H168 L132 40 M168 70 L132 100" fill="none" stroke="url(#mirror-stroke)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="48" cy="70" r="7" fill="#a5f3fc"/>
</svg>`;

/** Asymmetric arrow so a vertical mirror is obvious in the preview. */
const MIRROR_V_DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 240" width="210" height="360" role="img" aria-label="Arrow path pointing up — click Mirror vertically to flip">
  <defs>
    <linearGradient id="mirror-v-stroke" x1="28" y1="36" x2="112" y2="210" gradientUnits="userSpaceOnUse">
      <stop stop-color="#67e8f9"/>
      <stop offset="0.55" stop-color="#38bdf8"/>
      <stop offset="1" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="140" height="240" rx="24" fill="#071526"/>
  <rect x="10" y="10" width="120" height="220" rx="18" fill="none" stroke="#67e8f9" stroke-opacity="0.16"/>
  <line x1="22" y1="120" x2="118" y2="120" stroke="#7dd3fc" stroke-opacity="0.28" stroke-width="1.5" stroke-dasharray="4 6"/>
  <path d="M70 192 V72 L40 108 M70 72 L100 108" fill="none" stroke="url(#mirror-v-stroke)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="70" cy="192" r="7" fill="#a5f3fc"/>
</svg>`;

const editor = document.getElementById("editor");
const editorHighlight = document.getElementById("editor-highlight");
const lineNumbers = document.getElementById("line-numbers");
const workspace = document.getElementById("tool");
const splitter = document.getElementById("splitter");
const canvas = document.getElementById("preview-canvas");
const empty = document.getElementById("preview-empty");
const status = document.getElementById("preview-status");

const EMPTY_IDLE_HTML =
  '<div class="preview-empty-inner">' +
  '<p class="preview-empty-title">Live SVG preview</p>' +
  '<p class="preview-empty-body">' +
  "Paste or upload an SVG in the Source panel. Export to React, React Native, PNG, or a Data URI — or share a link." +
  "</p>" +
  '<p class="preview-empty-links">' +
  '<a href="/svg-to-react">React tool</a>' +
  " · " +
  '<a href="/svg-to-png">PNG tool</a>' +
  "</p>" +
  "</div>";

const clearSampleBtn = document.getElementById("btn-clear-sample");
const shareNoticeDismiss = document.getElementById("share-notice-dismiss");
let showingStartupSample = false;

function showEmptyIdle() {
  if (!empty) return;
  empty.classList.remove("is-message");
  empty.innerHTML = EMPTY_IDLE_HTML;
  empty.hidden = false;
}

function showEmptyMessage(message) {
  if (!empty) return;
  empty.classList.add("is-message");
  empty.innerHTML =
    '<div class="preview-empty-inner">' +
    '<p class="preview-empty-title">' +
    escapeHtml(message) +
    "</p>" +
    "</div>";
  empty.hidden = false;
}
const clearBtn = document.getElementById("btn-clear");
const uploadBtn = document.getElementById("btn-upload");
const mirrorHBtn = document.getElementById("btn-mirror-h");
const mirrorVBtn = document.getElementById("btn-mirror-v");
const rotateActionBtn = document.getElementById("btn-rotate-action");
const downloadSvgBtn = document.getElementById("btn-download-svg");
const copyLinkBtn = document.getElementById("btn-copy-link");
const copyIframeBtn = document.getElementById("btn-copy-iframe");
const fileUpload = document.getElementById("file-upload");
const previewStage = document.getElementById("preview-stage");
const zoomInBtn = document.getElementById("zoom-in");
const zoomOutBtn = document.getElementById("zoom-out");
const zoomResetBtn = document.getElementById("zoom-reset");
const bgButtons = document.querySelectorAll(".toolbar-swatch[data-bg]");

const SVG_NS = "http://www.w3.org/2000/svg";
const ZOOM_MIN = 0.25;
const ZOOM_MAX = 10;
const ZOOM_STEP = 0.25;

let previewZoom = 1;
let previewPanX = 0;
let previewPanY = 0;

/** Definition / non-painted tags — highlight via elements that reference them. */
const DEF_TAGS = new Set([
  "defs",
  "style",
  "script",
  "title",
  "desc",
  "metadata",
  "lineargradient",
  "radialgradient",
  "stop",
  "clippath",
  "mask",
  "pattern",
  "marker",
  "symbol",
  "filter",
  "fegaussianblur",
  "feoffset",
  "femerge",
  "femergenode",
  "feflood",
  "feblend",
  "fecomposite",
  "fecolormatrix",
  "feturbulence",
  "fedisplacementmap",
  "femorphology",
  "feconvolvematrix",
  "fespecularlighting",
  "fediffuselighting",
  "feimage",
  "fetile",
  "fecomponenttransfer",
  "fefunca",
  "fefuncr",
  "fefuncg",
  "fefuncb",
]);

const SKIP_SELECT = new Set(["defs", "style", "script", "title", "desc", "metadata"]);

const RESOURCE_TAGS = new Set([
  "lineargradient",
  "radialgradient",
  "filter",
  "clippath",
  "mask",
  "pattern",
  "marker",
]);

const REF_ATTRS = [
  "fill",
  "stroke",
  "filter",
  "clip-path",
  "mask",
  "marker-start",
  "marker-mid",
  "marker-end",
  "href",
  "xlink:href",
];

let elementRanges = [];
let selectedIndex = -1;
let selectedPaintTargets = [];
let highlightEl = null;
let highlightLayer = null;
let previewSvg = null;
/** Spotlight only after the user picks a concrete child element. */
let inspectActive = false;

function setStatus(state, message) {
  status.dataset.state = state;
  status.textContent = message;
  status.classList.remove("is-flashing");
  // Restart pulse without forced reflow (avoid offsetWidth flush).
  requestAnimationFrame(function () {
    status.classList.remove("is-flashing");
    requestAnimationFrame(function () {
      status.classList.add("is-flashing");
    });
  });
}

function extractSvgMarkup(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const match = trimmed.match(/<svg\b[\s\S]*<\/svg>/i);
  return match ? match[0] : trimmed;
}

/** Clean markup string for share / download / data-URI (may re-serialize). */
function sanitizeSvgSource(raw, options) {
  const markup = extractSvgMarkup(raw) || String(raw || "").trim();
  if (!markup) return null;
  if (typeof SvgSanitize === "undefined") return markup;
  return SvgSanitize.sanitizeMarkupOrThrow(markup, options);
}

function parseSvg(markup) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(markup, "image/svg+xml");
  const parsedError = doc.querySelector("parsererror");
  if (parsedError) {
    throw new Error("Invalid SVG markup");
  }

  const svg = doc.documentElement;
  if (!svg || svg.localName.toLowerCase() !== "svg") {
    throw new Error("Root element must be <svg>");
  }

  let stripped = 0;
  if (typeof SvgSanitize !== "undefined") {
    stripped = SvgSanitize.sanitizeElement(svg) || 0;
  }

  const node = document.importNode(svg, true);
  node.__svgStripped = stripped;
  return node;
}

let editorMetricsCache = null;
let editorWidthStale = true;
let lineNumbersRaf = 0;
let editorChromeRaf = 0;
let highlightPosRaf = 0;

function invalidateEditorMetrics() {
  editorWidthStale = true;
}

function getEditorMetrics() {
  if (editorMetricsCache && !editorWidthStale) return editorMetricsCache;
  if (editorMetricsCache && editorWidthStale) {
    editorMetricsCache.contentWidth = Math.max(
      1,
      editor.clientWidth - editorMetricsCache.paddingLeft - editorMetricsCache.paddingRight
    );
    editorWidthStale = false;
    return editorMetricsCache;
  }
  const style = window.getComputedStyle(editor);
  const paddingLeft = parseFloat(style.paddingLeft) || 0;
  const paddingRight = parseFloat(style.paddingRight) || 0;
  editorMetricsCache = {
    paddingLeft: paddingLeft,
    paddingRight: paddingRight,
    contentWidth: Math.max(1, editor.clientWidth - paddingLeft - paddingRight),
    font: style.fontWeight + " " + style.fontSize + " " + style.fontFamily,
    fontSize: parseFloat(style.fontSize) || 14,
    lineHeight: parseFloat(style.lineHeight) || 21,
    paddingTop: parseFloat(style.paddingTop) || 0,
    paddingBottom: parseFloat(style.paddingBottom) || 0,
  };
  editorWidthStale = false;
  return editorMetricsCache;
}

/** Prefer ResizeObserver content box so we don't flush layout via clientWidth. */
function setEditorContentWidthFromBox(contentBoxWidth) {
  const width = Math.max(1, Number(contentBoxWidth) || 0);
  if (!editorMetricsCache) {
    getEditorMetrics();
  }
  if (!editorMetricsCache) return;
  editorMetricsCache.contentWidth = Math.max(
    1,
    width - editorMetricsCache.paddingLeft - editorMetricsCache.paddingRight
  );
  editorWidthStale = false;
}

function getEditorContentWidth() {
  return getEditorMetrics().contentWidth;
}

/** Visual rows a logical line occupies with soft-wrap. */
function countVisualRows(lineText, contentWidth) {
  if (!lineText) return 1;
  const width = measureEditorLineWidth(editor, lineText);
  const avail = contentWidth == null ? getEditorContentWidth() : contentWidth;
  return Math.max(1, Math.ceil(width / avail));
}

/**
 * Walk source markup and collect each element's [start, end) range
 * in document order (same order as DOM tree walker).
 */
function collectElementRanges(source) {
  const ranges = [];
  const stack = [];
  const re = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<\/?([A-Za-z][\w:.-]*)(\s[^>]*)?(\/?)>/g;
  let match;

  while ((match = re.exec(source)) !== null) {
    const full = match[0];
    if (full.startsWith("<!--") || full.startsWith("<![CDATA[")) continue;

    const name = match[1].toLowerCase().replace(/^.*:/, "");
    const selfClosing = Boolean(match[3]) || full.endsWith("/>");
    const isClose = full.startsWith("</");
    const start = match.index;
    const end = match.index + full.length;

    if (isClose) {
      for (let i = stack.length - 1; i >= 0; i -= 1) {
        if (stack[i].name === name) {
          const opened = stack.splice(i, 1)[0];
          opened.closeStart = start;
          opened.end = end;
          break;
        }
      }
      continue;
    }

    const entry = {
      name: name,
      start: start,
      openEnd: end,
      closeStart: selfClosing ? start : -1,
      end: end,
      index: ranges.length,
    };
    ranges.push(entry);

    if (!selfClosing) {
      stack.push(entry);
    }
  }

  return ranges;
}

function caretOnTagText(range, caret, selEnd) {
  function inOpening(pos) {
    return pos >= range.start && pos <= range.openEnd;
  }

  function inClosing(pos) {
    if (range.closeStart < 0) return false;
    return pos >= range.closeStart && pos <= range.end;
  }

  function onTag(pos) {
    if (range.closeStart < 0) {
      return pos >= range.start && pos <= range.end;
    }
    return inOpening(pos) || inClosing(pos);
  }

  if (selEnd === caret) {
    return onTag(caret);
  }

  const openOverlaps = range.start < selEnd && range.openEnd > caret;
  const closeOverlaps =
    range.closeStart >= 0 && range.closeStart < selEnd && range.end > caret;
  const selfOverlaps = range.closeStart < 0 && range.start < selEnd && range.end > caret;
  return openOverlaps || closeOverlaps || selfOverlaps;
}

function listPreviewElements(svgRoot) {
  const list = [];
  const walker = document.createTreeWalker(svgRoot, NodeFilter.SHOW_ELEMENT);
  let node = walker.currentNode;
  while (node) {
    list.push(node);
    node = walker.nextNode();
  }
  return list;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function resolveResourceNode(node) {
  if (!(node instanceof Element)) return null;
  if (node.id) return node;

  let parent = node.parentElement;
  while (parent && parent !== previewSvg) {
    const name = parent.localName.toLowerCase();
    if (RESOURCE_TAGS.has(name) && parent.id) return parent;
    parent = parent.parentElement;
  }
  return node.id ? node : null;
}

function elementReferencesId(el, id) {
  const pattern = new RegExp("url\\(\\s*['\"]?#" + escapeRegExp(id) + "['\"]?\\s*\\)", "i");
  const hashPattern = new RegExp("^#" + escapeRegExp(id) + "$", "i");

  for (let i = 0; i < REF_ATTRS.length; i += 1) {
    const attr = REF_ATTRS[i];
    const value = el.getAttribute(attr);
    if (!value) continue;
    if (pattern.test(value) || hashPattern.test(value.trim())) return true;
  }

  // presentation attributes sometimes live in style=""
  const style = el.getAttribute("style");
  if (style && pattern.test(style)) return true;

  return false;
}

function findPaintTargets(defNode) {
  const resource = resolveResourceNode(defNode);
  if (!resource || !resource.id || !previewSvg) return [];

  const id = resource.id;
  const targets = [];
  const nodes = listPreviewElements(previewSvg);

  for (let i = 0; i < nodes.length; i += 1) {
    const el = nodes[i];
    if (el === resource || resource.contains(el)) continue;
    if (DEF_TAGS.has(el.localName.toLowerCase())) continue;
    if (elementReferencesId(el, id)) targets.push(el);
  }

  return targets;
}

function getHighlightTargets(node) {
  if (!(node instanceof Element)) return [];
  const name = node.localName.toLowerCase();

  if (DEF_TAGS.has(name)) {
    return findPaintTargets(node);
  }

  return [node];
}

function ensureHighlightBox() {
  if (highlightEl && highlightLayer) return highlightEl;

  highlightLayer = document.createElement("div");
  highlightLayer.className = "svg-highlight-layer";
  highlightLayer.setAttribute("aria-hidden", "true");

  highlightEl = document.createElement("div");
  highlightEl.className = "svg-highlight";
  highlightEl.hidden = true;

  highlightLayer.appendChild(highlightEl);
  previewStage.appendChild(highlightLayer);
  return highlightEl;
}

function clearHighlight() {
  selectedIndex = -1;
  selectedPaintTargets = [];
  inspectActive = false;
  if (previewSvg) {
    previewSvg.classList.remove("is-inspecting");
    previewSvg.querySelectorAll(".is-selected").forEach(function (node) {
      node.classList.remove("is-selected");
    });
  }
  const box = ensureHighlightBox();
  box.hidden = true;
  if (previewSvg) setStatus("ok", "Live preview");
}

function positionHighlightTargets(targets) {
  const box = ensureHighlightBox();
  if (!targets || !targets.length) {
    box.hidden = true;
    return;
  }

  const stageRect = previewStage.getBoundingClientRect();
  let minL = Infinity;
  let minT = Infinity;
  let maxR = -Infinity;
  let maxB = -Infinity;
  let any = false;

  for (let i = 0; i < targets.length; i += 1) {
    const target = targets[i];
    if (!previewStage.contains(target)) continue;
    let rect;
    try {
      rect = target.getBoundingClientRect();
    } catch {
      continue;
    }
    if (!rect || (rect.width < 0.5 && rect.height < 0.5)) continue;
    any = true;
    minL = Math.min(minL, rect.left);
    minT = Math.min(minT, rect.top);
    maxR = Math.max(maxR, rect.right);
    maxB = Math.max(maxB, rect.bottom);
  }

  if (!any) {
    box.hidden = true;
    return;
  }

  const pad = 6;
  box.style.left = minL - stageRect.left - pad + "px";
  box.style.top = minT - stageRect.top - pad + "px";
  box.style.width = Math.max(maxR - minL + pad * 2, 8) + "px";
  box.style.height = Math.max(maxB - minT + pad * 2, 8) + "px";
  box.hidden = false;
}

function isSpotlightIndex(index) {
  if (index < 0 || index >= elementRanges.length) return false;
  const range = elementRanges[index];
  if (index === 0 && range.name === "svg") return false;
  if (SKIP_SELECT.has(range.name)) return false;
  return true;
}

function applySelection(index) {
  if (!previewSvg || !isSpotlightIndex(index)) {
    clearHighlight();
    return;
  }

  const nodes = listPreviewElements(previewSvg);
  const sourceNode = nodes[index];
  if (!sourceNode) {
    clearHighlight();
    return;
  }

  const paintTargets = getHighlightTargets(sourceNode);
  if (!paintTargets.length) {
    clearHighlight();
    const tag = elementRanges[index].name;
    setStatus("ok", "No visible paint for <" + tag + ">");
    return;
  }

  selectedIndex = index;
  selectedPaintTargets = paintTargets;
  inspectActive = true;
  previewSvg.classList.add("is-inspecting");
  previewSvg.querySelectorAll(".is-selected").forEach(function (node) {
    node.classList.remove("is-selected");
  });
  paintTargets.forEach(function (node) {
    node.classList.add("is-selected");
  });

  scheduleHighlightPosition();

  const tag = elementRanges[index].name;
  const resource = resolveResourceNode(sourceNode);
  const idLabel = resource && resource.id ? " #" + resource.id : "";
  const via = DEF_TAGS.has(sourceNode.localName.toLowerCase()) ? " → usage" : "";
  setStatus("ok", "Selected <" + tag + ">" + idLabel + via);
}

function selectionFromCaret() {
  if (!elementRanges.length) {
    clearHighlight();
    return;
  }

  const caret = editor.selectionStart;
  const selEnd = editor.selectionEnd;

  let best = -1;
  for (let i = 0; i < elementRanges.length; i += 1) {
    const range = elementRanges[i];
    if (!caretOnTagText(range, caret, selEnd)) continue;
    best = i;
  }

  if (!isSpotlightIndex(best)) {
    clearHighlight();
    return;
  }

  if (best === selectedIndex && inspectActive) {
    scheduleHighlightPosition();
    return;
  }

  applySelection(best);
}

function renderPreview(source, options) {
  const renderOptions = options || {};
  const markup = extractSvgMarkup(source);
  const sourceOffset = markup ? source.indexOf(markup) : 0;
  const wasInspecting = inspectActive;

  if (!markup) {
    canvas.replaceChildren();
    showEmptyIdle();
    previewSvg = null;
    elementRanges = [];
    clearHighlight();
    setStatus("empty", "Waiting for SVG");
    updateExports(null);
    return;
  }

  try {
    const svg = parseSvg(markup);
    const stripped = svg.__svgStripped || 0;

    if (!svg.hasAttribute("xmlns")) {
      svg.setAttribute("xmlns", SVG_NS);
    }

    const ranges = collectElementRanges(markup).map(function (range) {
      const offset = Math.max(sourceOffset, 0);
      return {
        name: range.name,
        start: range.start + offset,
        openEnd: range.openEnd + offset,
        closeStart: range.closeStart < 0 ? -1 : range.closeStart + offset,
        end: range.end + offset,
        index: range.index,
      };
    });

    const nodes = listPreviewElements(svg);
    // Element→editor mapping is only safe if we didn't remove nodes mid-tree
    if (stripped === 0) {
      nodes.forEach(function (node, index) {
        node.setAttribute("data-el-index", String(index));
        if (!DEF_TAGS.has(node.localName.toLowerCase()) && node.style) {
          node.style.cursor = "pointer";
        }
      });
      elementRanges = ranges;
    } else {
      elementRanges = [];
      clearHighlight();
    }

    canvas.replaceChildren(svg);
    empty.hidden = true;
    previewSvg = svg;
    applyPreviewZoom();

    let exportMarkup = markup;
    try {
      exportMarkup = sanitizeSvgSource(markup) || markup;
    } catch (err) {
      exportMarkup = new XMLSerializer().serializeToString(svg);
    }

    if (renderOptions.deferExports) {
      // Let the preview paint first; React/PNG/Data URI exports are not part
      // of the initial viewport and otherwise delay the first meaningful paint.
      latestMarkup = exportMarkup;
      const exportWork = function () {
        // A user edit may have rendered a newer document while this idle
        // callback was waiting; never replace its exports with stale data.
        if (latestMarkup !== exportMarkup) return;
        try {
          updateExports(exportMarkup);
        } catch (err) {
          console.error(err);
        }
      };
      if (typeof requestIdleCallback === "function") {
        requestIdleCallback(exportWork, { timeout: 1500 });
      } else {
        window.setTimeout(exportWork, 0);
      }
    } else {
      try {
        updateExports(exportMarkup);
      } catch (err) {
        console.error(err);
      }
    }

    if (stripped > 0) {
      setStatus("ok", "Removed unsafe SVG parts");
    } else {
      setStatus("ok", typeof activeTab !== "undefined" ? tabStatusLabel(activeTab) : "Live preview");
    }

    if (wasInspecting && stripped === 0) {
      requestAnimationFrame(selectionFromCaret);
    } else {
      selectedIndex = -1;
      inspectActive = false;
      const box = ensureHighlightBox();
      box.hidden = true;
    }
  } catch {
    canvas.replaceChildren();
      showEmptyMessage("Couldn’t parse this SVG. Check for a missing tag or a typo.");
    previewSvg = null;
    elementRanges = [];
    clearHighlight();
    setStatus("error", "Invalid SVG");
    try {
      updateExports(null);
    } catch (err) {
      /* ignore */
    }
  }
}

function updateLineNumbers() {
  if (!lineNumbers) return;
  const lines = editor.value.split("\n");
  const contentWidth = getEditorContentWidth();
  const parts = [];
  for (let i = 0; i < lines.length; i += 1) {
    const rows = countVisualRows(lines[i], contentWidth);
    let block = String(i + 1);
    for (let r = 1; r < rows; r += 1) {
      block += "\n";
    }
    parts.push(block);
  }
  lineNumbers.textContent = parts.join("\n") || "1";
}

function scheduleUpdateLineNumbers() {
  if (lineNumbersRaf) return;
  lineNumbersRaf = requestAnimationFrame(function () {
    lineNumbersRaf = 0;
    updateLineNumbers();
  });
}

function scheduleHighlightPosition() {
  if (!inspectActive) return;
  if (highlightPosRaf) return;
  highlightPosRaf = requestAnimationFrame(function () {
    highlightPosRaf = 0;
    if (inspectActive) positionHighlightTargets(selectedPaintTargets);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function highlightAttrs(attrs) {
  if (!attrs) return "";
  return attrs.replace(
    /([^\s=<>/]+)(\s*=\s*)("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[^\s"'=<>`]+)|(\s+)|([^\s])/g,
    function (full, name, eq, val, ws, other) {
      if (name) {
        return (
          '<span class="tok-attr">' +
          escapeHtml(name) +
          '</span><span class="tok-punct">' +
          escapeHtml(eq) +
          '</span><span class="tok-string">' +
          escapeHtml(val) +
          "</span>"
        );
      }
      if (ws) return ws;
      return '<span class="tok-punct">' + escapeHtml(other) + "</span>";
    }
  );
}

function highlightTag(tag) {
  const m = tag.match(/^(<\/?)([A-Za-z_][\w:.-]*)([\s\S]*?)(\/?>)$/);
  if (!m) return escapeHtml(tag);
  return (
    '<span class="tok-punct">' +
    escapeHtml(m[1]) +
    '</span><span class="tok-tag">' +
    escapeHtml(m[2]) +
    "</span>" +
    highlightAttrs(m[3]) +
    '<span class="tok-punct">' +
    escapeHtml(m[4]) +
    "</span>"
  );
}

function highlightMarkup(source) {
  let out = "";
  let i = 0;
  const code = String(source || "");

  while (i < code.length) {
    if (code.startsWith("<!--", i)) {
      const end = code.indexOf("-->", i + 4);
      const endIdx = end === -1 ? code.length : end + 3;
      out += '<span class="tok-comment">' + escapeHtml(code.slice(i, endIdx)) + "</span>";
      i = endIdx;
      continue;
    }

    if (code[i] === "<") {
      const close = code.indexOf(">", i + 1);
      if (close === -1) {
        out += escapeHtml(code.slice(i));
        break;
      }
      out += highlightTag(code.slice(i, close + 1));
      i = close + 1;
      continue;
    }

    const next = code.indexOf("<", i);
    const end = next === -1 ? code.length : next;
    out += '<span class="tok-text">' + escapeHtml(code.slice(i, end)) + "</span>";
    i = end;
  }

  return out;
}

function updateSyntaxHighlight() {
  if (!editorHighlight) return;
  editorHighlight.innerHTML = highlightMarkup(editor.value) + "\n";
}

function syncEditorChromeScroll() {
  if (lineNumbers) lineNumbers.scrollTop = editor.scrollTop;
  if (editorHighlight) {
    editorHighlight.scrollTop = editor.scrollTop;
    editorHighlight.scrollLeft = editor.scrollLeft;
  }
}

function refreshEditorChrome() {
  // Read scroll before DOM writes so we don't force a synchronous reflow.
  const scrollTop = editor.scrollTop;
  const scrollLeft = editor.scrollLeft;
  updateLineNumbers();
  updateSyntaxHighlight();
  if (lineNumbers) lineNumbers.scrollTop = scrollTop;
  if (editorHighlight) {
    editorHighlight.scrollTop = scrollTop;
    editorHighlight.scrollLeft = scrollLeft;
  }
}

function scheduleRefreshEditorChrome() {
  if (editorChromeRaf) return;
  editorChromeRaf = requestAnimationFrame(function () {
    editorChromeRaf = 0;
    refreshEditorChrome();
  });
}

function syncLineNumbersScroll() {
  syncEditorChromeScroll();
}

function applyPreviewZoom() {
  canvas.style.setProperty("--preview-zoom", String(previewZoom));
  canvas.style.setProperty("--preview-x", previewPanX + "px");
  canvas.style.setProperty("--preview-y", previewPanY + "px");
  if (zoomResetBtn) {
    zoomResetBtn.textContent = Math.round(previewZoom * 100) + "%";
  }
  if (inspectActive) {
    scheduleHighlightPosition();
  }
}

function setPreviewZoom(next) {
  previewZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(next * 100) / 100));
  applyPreviewZoom();
}

function resetPreviewView() {
  previewZoom = 1;
  previewPanX = 0;
  previewPanY = 0;
  applyPreviewZoom();
}

function setCanvasBackground(mode) {
  previewStage.dataset.bg = mode;
  bgButtons.forEach(function (btn) {
    const active = btn.getAttribute("data-bg") === mode;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

let frame = 0;
function scheduleRender() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(function () {
    renderPreview(editor.value);
  });
}

let selectFrame = 0;
function scheduleSelection() {
  cancelAnimationFrame(selectFrame);
  selectFrame = requestAnimationFrame(selectionFromCaret);
}

const MAX_HISTORY = 80;
const HISTORY_IDLE_MS = 400;
let history = [];
let historyIndex = -1;
let applyingHistory = false;
let historyTimer = 0;
/** Becomes true only after a real edit (type / clear / tab). */
let userEdited = false;
/** Skip inspect updates while restoring history or handling undo keys. */
let suppressSelectionSync = false;

function snapshotEditor() {
  return {
    value: editor.value,
    selectionStart: editor.selectionStart,
    selectionEnd: editor.selectionEnd,
  };
}

function commitHistory() {
  if (applyingHistory) return;
  const snap = snapshotEditor();
  const current = history[historyIndex];
  if (current && current.value === snap.value) return;

  history = history.slice(0, historyIndex + 1);
  history.push(snap);
  if (history.length > MAX_HISTORY) {
    history.shift();
  }
  historyIndex = history.length - 1;
}

function scheduleCommitHistory() {
  if (applyingHistory) return;
  clearTimeout(historyTimer);
  historyTimer = setTimeout(commitHistory, HISTORY_IDLE_MS);
}

function flushHistory() {
  clearTimeout(historyTimer);
  commitHistory();
}

function applyEditorState(state) {
  editor.value = state.value;
  const max = editor.value.length;
  const start = Math.min(state.selectionStart ?? max, max);
  const end = Math.min(state.selectionEnd ?? max, max);
  suppressSelectionSync = true;
  editor.focus();
  editor.setSelectionRange(start, end);
  if (state.value.trim()) {
    empty.hidden = true;
  } else {
    showEmptyIdle();
  }
  clearHighlight();
  scheduleRefreshEditorChrome();
  scheduleRender();
  requestAnimationFrame(function () {
    suppressSelectionSync = false;
  });
}

function undoEdit() {
  clearTimeout(historyTimer);
  const current = history[historyIndex];
  const snap = snapshotEditor();

  // Revert uncommitted typing to the last committed snapshot
  if (current && snap.value !== current.value) {
    applyingHistory = true;
    applyEditorState(current);
    applyingHistory = false;
    return true;
  }

  if (historyIndex <= 0) return false;
  historyIndex -= 1;
  applyingHistory = true;
  applyEditorState(history[historyIndex]);
  applyingHistory = false;
  return true;
}

function redoEdit() {
  clearTimeout(historyTimer);
  if (historyIndex >= history.length - 1) return false;
  historyIndex += 1;
  applyingHistory = true;
  applyEditorState(history[historyIndex]);
  applyingHistory = false;
  return true;
}

function canUndo() {
  if (!userEdited) return false;
  if (historyIndex > 0) return true;
  const current = history[historyIndex];
  return Boolean(current && current.value !== editor.value);
}

function canRedo() {
  return userEdited && historyIndex < history.length - 1;
}

function refreshSampleChip() {
  if (!clearSampleBtn) return;
  clearSampleBtn.hidden = !(showingStartupSample && !userEdited && editor.value.trim());
}

function markUserEdited() {
  userEdited = true;
  showingStartupSample = false;
  refreshSampleChip();
}

function scheduleSelectionSafe() {
  if (suppressSelectionSync || applyingHistory) return;
  scheduleSelection();
}

editor.addEventListener("input", function () {
  markUserEdited();
  scheduleRefreshEditorChrome();
  scheduleRender();
  scheduleCommitHistory();
});
editor.addEventListener("scroll", syncEditorChromeScroll);
editor.addEventListener("keyup", function (event) {
  scheduleUpdateLineNumbers();
  const key = event.key.toLowerCase();
  if (event.ctrlKey || event.metaKey || key === "control" || key === "meta" || key === "z" || key === "y") {
    return;
  }
  scheduleSelectionSafe();
});
editor.addEventListener("select", scheduleSelectionSafe);

let measureCtx = null;
let clearBecauseEmptyClick = false;
let suppressEditorSelect = false;

function getMeasureContext(textarea) {
  if (!measureCtx) {
    measureCtx = document.createElement("canvas").getContext("2d");
  }
  const metrics = textarea === editor ? getEditorMetrics() : null;
  if (metrics) {
    measureCtx.font = metrics.font;
  } else {
    const style = window.getComputedStyle(textarea);
    measureCtx.font = style.fontWeight + " " + style.fontSize + " " + style.fontFamily;
  }
  return measureCtx;
}

function measureEditorLineWidth(textarea, lineText) {
  const ctx = getMeasureContext(textarea);
  const tabSize = 2;
  const expanded = lineText.replace(/\t/g, Array(tabSize + 1).join(" "));
  return ctx.measureText(expanded).width;
}

function isClickPastLineText(textarea, clientX, clientY) {
  const rect = textarea.getBoundingClientRect();
  const metrics = textarea === editor ? getEditorMetrics() : null;
  const style = metrics ? null : window.getComputedStyle(textarea);
  const paddingLeft = metrics ? metrics.paddingLeft : parseFloat(style.paddingLeft) || 0;
  const paddingTop = metrics ? metrics.paddingTop : parseFloat(style.paddingTop) || 0;
  const paddingBottom = metrics
    ? metrics.paddingBottom
    : parseFloat(style.paddingBottom) || 0;

  const x = clientX - rect.left + textarea.scrollLeft - paddingLeft;
  const y = clientY - rect.top + textarea.scrollTop - paddingTop;

  const fontSize = metrics ? metrics.fontSize : parseFloat(style.fontSize) || 14;
  let lineHeight = metrics ? metrics.lineHeight : parseFloat(style.lineHeight);
  if (!lineHeight || Number.isNaN(lineHeight)) lineHeight = fontSize * 1.7;

  const lines = textarea.value.split("\n");
  const lineIndex = Math.floor(y / lineHeight);

  if (lineIndex < 0 || lineIndex >= lines.length) return true;

  const lineText = lines[lineIndex];
  const textWidth = measureEditorLineWidth(textarea, lineText);
  return x > textWidth + 8;
}

editor.addEventListener("pointerdown", function (event) {
  clearBecauseEmptyClick = isClickPastLineText(editor, event.clientX, event.clientY);
});

editor.addEventListener("mouseup", function () {
  if (clearBecauseEmptyClick) {
    clearBecauseEmptyClick = false;
    suppressEditorSelect = true;
    clearHighlight();
    return;
  }
  scheduleSelectionSafe();
});

editor.addEventListener("click", function () {
  if (suppressEditorSelect) {
    suppressEditorSelect = false;
    return;
  }
  scheduleSelectionSafe();
});

document.addEventListener("pointerdown", function (event) {
  if (!inspectActive) return;
  if (event.target === editor) return;
  if (previewSvg && previewSvg.contains(event.target) && event.target !== previewSvg) return;
  if (event.target === canvas) return;
  clearHighlight();
});

editor.addEventListener("keydown", function (event) {
  const mod = event.ctrlKey || event.metaKey;
  const key = event.key.toLowerCase();

  if (mod && key === "z" && !event.shiftKey && !event.altKey) {
    event.preventDefault();
    if (canUndo()) undoEdit();
    return;
  }

  if (mod && ((key === "z" && event.shiftKey) || key === "y") && !event.altKey) {
    event.preventDefault();
    if (canRedo()) redoEdit();
    return;
  }

  if (event.key === "Escape") {
    editor.blur();
    return;
  }

  if (event.key === "Tab") {
    // Indent only when text is selected; otherwise let Tab move focus (a11y).
    if (editor.selectionStart === editor.selectionEnd) return;
    event.preventDefault();
    markUserEdited();
    flushHistory();
    const selectionStart = editor.selectionStart;
    const selectionEnd = editor.selectionEnd;
    const value = editor.value;
    editor.value = value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);
    editor.selectionStart = editor.selectionEnd = selectionStart + 2;
    commitHistory();
    scheduleRender();
    scheduleRefreshEditorChrome();
    return;
  }

  if (mod) return;
  scheduleSelectionSafe();
});

if (zoomInBtn) {
  zoomInBtn.addEventListener("click", function () {
    setPreviewZoom(previewZoom + ZOOM_STEP);
  });
}
if (zoomOutBtn) {
  zoomOutBtn.addEventListener("click", function () {
    setPreviewZoom(previewZoom - ZOOM_STEP);
  });
}
if (zoomResetBtn) {
  zoomResetBtn.addEventListener("click", function () {
    resetPreviewView();
  });
}

bgButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    setCanvasBackground(btn.getAttribute("data-bg"));
  });
});

function clearEditorContents() {
  markUserEdited();
  flushHistory();
  if (!editor.value.length) return;
  editor.value = "";
  showEmptyIdle();
  clearHighlight();
  editor.focus();
  editor.setSelectionRange(0, 0);
  commitHistory();
  scheduleRender();
  scheduleRefreshEditorChrome();
  setStatus("empty", "Editor cleared — paste SVG to start");
}

if (clearBtn) {
  clearBtn.addEventListener("click", clearEditorContents);
}

if (clearSampleBtn) {
  clearSampleBtn.addEventListener("click", clearEditorContents);
}

const MIRROR_GROUP_ATTR = "data-svgeditor-mirror";

function getSvgMirrorWidth(svg) {
  const vb = svg.getAttribute("viewBox");
  if (vb) {
    const parts = vb.trim().split(/[\s,]+/);
    if (parts.length === 4) {
      const width = parseFloat(parts[2]);
      if (Number.isFinite(width) && width > 0) return width;
    }
  }
  const widthAttr = parseFloat(svg.getAttribute("width"));
  if (Number.isFinite(widthAttr) && widthAttr > 0) return widthAttr;
  return null;
}

function getSvgMirrorHeight(svg) {
  const vb = svg.getAttribute("viewBox");
  if (vb) {
    const parts = vb.trim().split(/[\s,]+/);
    if (parts.length === 4) {
      const height = parseFloat(parts[3]);
      if (Number.isFinite(height) && height > 0) return height;
    }
  }
  const heightAttr = parseFloat(svg.getAttribute("height"));
  if (Number.isFinite(heightAttr) && heightAttr > 0) return heightAttr;
  return null;
}

function prettySerializeSvg(svg) {
  return new XMLSerializer().serializeToString(svg);
}

function wrapOrUnwrapMirrorGroup(svg, axis, transform) {
  const existing = Array.from(svg.children).find(function (child) {
    return (
      child.nodeType === 1 &&
      child.localName.toLowerCase() === "g" &&
      child.getAttribute(MIRROR_GROUP_ATTR) === axis
    );
  });

  if (existing) {
    while (existing.firstChild) {
      svg.insertBefore(existing.firstChild, existing);
    }
    svg.removeChild(existing);
    return;
  }

  const ns = "http://www.w3.org/2000/svg";
  const group = document.createElementNS(ns, "g");
  group.setAttribute(MIRROR_GROUP_ATTR, axis);
  group.setAttribute("transform", transform);

  const move = [];
  Array.from(svg.childNodes).forEach(function (node) {
    if (node.nodeType !== 1) {
      move.push(node);
      return;
    }
    const name = node.localName.toLowerCase();
    if (name === "defs" || name === "style" || name === "title" || name === "desc" || name === "metadata") {
      return;
    }
    move.push(node);
  });
  move.forEach(function (node) {
    group.appendChild(node);
  });
  svg.appendChild(group);
}

function mirrorSvgMarkupHorizontally(markup) {
  const svg = parseSvg(markup);
  const width = getSvgMirrorWidth(svg);
  if (width == null) {
    throw new Error("Need a viewBox or width to mirror horizontally");
  }
  wrapOrUnwrapMirrorGroup(svg, "horizontal", "translate(" + width + " 0) scale(-1 1)");
  return prettySerializeSvg(svg);
}

function mirrorSvgMarkupVertically(markup) {
  const svg = parseSvg(markup);
  const height = getSvgMirrorHeight(svg);
  if (height == null) {
    throw new Error("Need a viewBox or height to mirror vertically");
  }
  wrapOrUnwrapMirrorGroup(svg, "vertical", "translate(0 " + height + ") scale(1 -1)");
  return prettySerializeSvg(svg);
}

function applyMirroredEditorMarkup(nextMarkup, statusMsg) {
  markUserEdited();
  flushHistory();
  editor.value = nextMarkup;
  editor.focus();
  editor.setSelectionRange(0, 0);
  commitHistory();
  scheduleRefreshEditorChrome();
  renderPreview(nextMarkup);
  setStatus("ok", statusMsg);
  maybeShowOutputOnMobile();
}

if (mirrorHBtn) {
  mirrorHBtn.addEventListener("click", function () {
    const raw = extractSvgMarkup(editor.value) || editor.value.trim();
    if (!raw) {
      setStatus("empty", "Paste an SVG path first");
      return;
    }
    try {
      const next = mirrorSvgMarkupHorizontally(raw);
      const flipped = next.indexOf(MIRROR_GROUP_ATTR + '="horizontal"') !== -1;
      const useFlip = document.body.classList.contains("flip-path-page");
      applyMirroredEditorMarkup(
        next,
        flipped
          ? useFlip
            ? "Flipped horizontally — click again to flip back"
            : "Mirrored horizontally — click again to flip back"
          : useFlip
            ? "Flip removed — original orientation"
            : "Mirror removed — original orientation"
      );
    } catch (err) {
      setStatus("error", (err && err.message) || "Could not mirror this SVG");
    }
  });
}

if (mirrorVBtn) {
  mirrorVBtn.addEventListener("click", function () {
    const raw = extractSvgMarkup(editor.value) || editor.value.trim();
    if (!raw) {
      setStatus("empty", "Paste an SVG path first");
      return;
    }
    try {
      const next = mirrorSvgMarkupVertically(raw);
      const flipped = next.indexOf(MIRROR_GROUP_ATTR + '="vertical"') !== -1;
      const useFlip = document.body.classList.contains("flip-path-page");
      applyMirroredEditorMarkup(
        next,
        flipped
          ? useFlip
            ? "Flipped vertically — click again to flip back"
            : "Mirrored vertically — click again to flip back"
          : useFlip
            ? "Flip removed — original orientation"
            : "Mirror removed — original orientation"
      );
    } catch (err) {
      setStatus("error", (err && err.message) || "Could not mirror this SVG");
    }
  });
}

const ROTATE_GROUP_ATTR = "data-svgeditor-rotate";

/** Asymmetric arrow path — rotation around the center is obvious. */
const ROTATE_PATH_DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Arrow path pointing right — click to rotate around center">
  <defs>
    <linearGradient id="rotate-path-stroke" x1="40" y1="40" x2="170" y2="160" gradientUnits="userSpaceOnUse">
      <stop stop-color="#67e8f9"/>
      <stop offset="0.55" stop-color="#38bdf8"/>
      <stop offset="1" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="28" fill="#071526"/>
  <rect x="12" y="12" width="176" height="176" rx="20" fill="none" stroke="#67e8f9" stroke-opacity="0.16"/>
  <circle cx="100" cy="100" r="4" fill="#a5f3fc"/>
  <line x1="100" y1="28" x2="100" y2="172" stroke="#7dd3fc" stroke-opacity="0.22" stroke-width="1.5" stroke-dasharray="4 6"/>
  <line x1="28" y1="100" x2="172" y2="100" stroke="#7dd3fc" stroke-opacity="0.22" stroke-width="1.5" stroke-dasharray="4 6"/>
  <path d="M48 100 H148 L118 70 M148 100 L118 130" fill="none" stroke="url(#rotate-path-stroke)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/** Mixed shapes so “rotate SVG element / object” feels distinct from a lone path. */
const ROTATE_ELEMENT_DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Pointer element — click to rotate around center">
  <defs>
    <linearGradient id="rotate-el-fill" x1="36" y1="40" x2="168" y2="160" gradientUnits="userSpaceOnUse">
      <stop stop-color="#22d3ee"/>
      <stop offset="1" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="28" fill="#071526"/>
  <circle cx="100" cy="100" r="4" fill="#a5f3fc"/>
  <rect x="52" y="78" width="96" height="44" rx="12" fill="url(#rotate-el-fill)"/>
  <polygon points="148,100 118,72 118,128" fill="#67e8f9"/>
  <circle cx="68" cy="100" r="10" fill="#031018"/>
</svg>`;

/** Compact UI icon without root width/height — good for icon-rotate intents. */
const ROTATE_ICON_DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Navigation icon pointing up — click to rotate">
  <path d="M12 19V5"/>
  <path d="M5 12l7-7 7 7"/>
  <circle cx="12" cy="12" r="9" stroke-opacity="0.35"/>
</svg>`;

const ROTATE_DEFAULT_SVGS = {
  path: ROTATE_PATH_DEFAULT_SVG,
  element: ROTATE_ELEMENT_DEFAULT_SVG,
  icon: ROTATE_ICON_DEFAULT_SVG,
};

function getSvgViewBoxBox(svg) {
  const vb = svg.getAttribute("viewBox");
  if (vb) {
    const parts = vb.trim().split(/[\s,]+/);
    if (parts.length === 4) {
      const minX = parseFloat(parts[0]);
      const minY = parseFloat(parts[1]);
      const width = parseFloat(parts[2]);
      const height = parseFloat(parts[3]);
      if (
        Number.isFinite(minX) &&
        Number.isFinite(minY) &&
        Number.isFinite(width) &&
        Number.isFinite(height) &&
        width > 0 &&
        height > 0
      ) {
        return { minX: minX, minY: minY, width: width, height: height };
      }
    }
  }
  const widthAttr = parseFloat(svg.getAttribute("width"));
  const heightAttr = parseFloat(svg.getAttribute("height"));
  if (Number.isFinite(widthAttr) && widthAttr > 0 && Number.isFinite(heightAttr) && heightAttr > 0) {
    return { minX: 0, minY: 0, width: widthAttr, height: heightAttr };
  }
  return null;
}

function normalizeRotationDegrees(deg) {
  let n = deg % 360;
  if (n < 0) n += 360;
  if (Object.is(n, -0) || Math.abs(n) < 1e-9) return 0;
  return Math.round(n * 1000) / 1000;
}

function formatRotationDegrees(deg) {
  const n = normalizeRotationDegrees(deg);
  if (n === 0) return "0";
  return String(n);
}

function findRotateGroup(svg) {
  return Array.from(svg.children).find(function (child) {
    return (
      child.nodeType === 1 &&
      child.localName.toLowerCase() === "g" &&
      child.hasAttribute(ROTATE_GROUP_ATTR)
    );
  });
}

function unwrapRotateGroup(svg, group) {
  while (group.firstChild) {
    svg.insertBefore(group.firstChild, group);
  }
  svg.removeChild(group);
}

function wrapRotateGroup(svg, degrees, cx, cy) {
  const ns = "http://www.w3.org/2000/svg";
  const group = document.createElementNS(ns, "g");
  group.setAttribute(ROTATE_GROUP_ATTR, formatRotationDegrees(degrees));
  group.setAttribute(
    "transform",
    "rotate(" + formatRotationDegrees(degrees) + " " + formatViewBoxNumber(cx) + " " + formatViewBoxNumber(cy) + ")"
  );

  const move = [];
  Array.from(svg.childNodes).forEach(function (node) {
    if (node.nodeType !== 1) {
      move.push(node);
      return;
    }
    const name = node.localName.toLowerCase();
    if (name === "defs" || name === "style" || name === "title" || name === "desc" || name === "metadata") {
      return;
    }
    move.push(node);
  });
  move.forEach(function (node) {
    group.appendChild(node);
  });
  svg.appendChild(group);
}

function rotateSvgMarkupAroundCenter(markup, addDegrees) {
  const svg = parseSvg(markup);
  svg.removeAttribute("width");
  svg.removeAttribute("height");

  const box = getSvgViewBoxBox(svg);
  if (!box) {
    throw new Error("Need a viewBox (or width and height) to rotate around the center");
  }

  const step = Number(addDegrees);
  if (!Number.isFinite(step) || step === 0) {
    throw new Error("Rotation degrees must be a non-zero number");
  }

  const existing = findRotateGroup(svg);
  let current = 0;
  if (existing) {
    current = parseFloat(existing.getAttribute(ROTATE_GROUP_ATTR)) || 0;
    unwrapRotateGroup(svg, existing);
  }

  const next = normalizeRotationDegrees(current + step);
  if (next === 0) {
    return { markup: prettySerializeSvg(svg), degrees: 0 };
  }

  const cx = box.minX + box.width / 2;
  const cy = box.minY + box.height / 2;
  wrapRotateGroup(svg, next, cx, cy);
  return { markup: prettySerializeSvg(svg), degrees: next };
}

const rotateIntent =
  (document.body && document.body.getAttribute("data-rotate-intent")) || "";
const rotateDegreesAttr =
  (document.body && document.body.getAttribute("data-rotate-degrees")) || "";
const rotateDegreesInput = document.getElementById("rotate-degrees-input");

function formatAngleInputLabel(n) {
  if (!Number.isFinite(n)) return "";
  const rounded = Math.round(n * 1000) / 1000;
  if (Object.is(rounded, -0)) return "0";
  return String(rounded);
}

function getRotateStepFromUi() {
  if (rotateDegreesInput) {
    const typed = parseFloat(String(rotateDegreesInput.value).trim());
    if (Number.isFinite(typed)) return typed;
  }
  const fallback = parseFloat(rotateDegreesAttr);
  if (Number.isFinite(fallback)) return fallback;
  return null;
}

function syncRotateActionLabel() {
  if (!rotateActionBtn) return;
  const step = getRotateStepFromUi();
  if (!Number.isFinite(step) || step === 0) {
    rotateActionBtn.textContent = "Rotate";
    rotateActionBtn.title = "Enter a non-zero angle, then rotate around center";
    return;
  }
  const label = formatAngleInputLabel(step);
  rotateActionBtn.textContent = "Rotate " + label + "°";
  rotateActionBtn.title = "Rotate " + label + "° around the viewBox center";
}

if (rotateDegreesInput && rotateIntent) {
  const preset = parseFloat(rotateDegreesAttr);
  if (Number.isFinite(preset) && String(rotateDegreesInput.value).trim() === "") {
    rotateDegreesInput.value = formatAngleInputLabel(preset);
  }
  ["input", "change"].forEach(function (evt) {
    rotateDegreesInput.addEventListener(evt, syncRotateActionLabel);
  });
  rotateDegreesInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (rotateActionBtn) rotateActionBtn.click();
    }
  });
  syncRotateActionLabel();
}

if (rotateActionBtn && rotateIntent) {
  rotateActionBtn.addEventListener("click", function () {
    const raw = extractSvgMarkup(editor.value) || editor.value.trim();
    if (!raw) {
      setStatus("empty", "Paste an SVG first");
      return;
    }
    const step = getRotateStepFromUi();
    if (!Number.isFinite(step) || step === 0) {
      setStatus("error", "Enter a non-zero angle in degrees");
      if (rotateDegreesInput) rotateDegreesInput.focus();
      return;
    }
    try {
      const result = rotateSvgMarkupAroundCenter(raw, step);
      const label = formatAngleInputLabel(step);
      const signed = step > 0 ? "+" + label : label;
      applyMirroredEditorMarkup(
        result.markup,
        result.degrees === 0
          ? "Rotation cleared — back to 0° (width/height removed)"
          : "Rotated " + signed + "° around center → " + formatRotationDegrees(result.degrees) + "° total"
      );
    } catch (err) {
      setStatus("error", (err && err.message) || "Could not rotate this SVG");
    }
  });
}

function formatViewBoxNumber(n) {
  if (!Number.isFinite(n)) return "0";
  const rounded = Math.round(n * 1000) / 1000;
  if (Object.is(rounded, -0)) return "0";
  return String(rounded);
}

/** Half-stroke (and miter/cap) inset — getBBox() ignores stroke paint. */
function strokeOutsetForElement(el) {
  let stroke = el.getAttribute("stroke") || "";
  let strokeWidth = el.getAttribute("stroke-width") || "";
  let linejoin = el.getAttribute("stroke-linejoin") || "";
  let linecap = el.getAttribute("stroke-linecap") || "";
  let miterlimit = el.getAttribute("stroke-miterlimit") || "";
  try {
    const cs = window.getComputedStyle(el);
    if (!stroke) stroke = cs.stroke || "";
    if (!strokeWidth) strokeWidth = cs.strokeWidth || "";
    if (!linejoin) linejoin = cs.strokeLinejoin || "";
    if (!linecap) linecap = cs.strokeLinecap || "";
    if (!miterlimit) miterlimit = cs.strokeMiterlimit || "";
  } catch (err) {
    /* keep attribute values */
  }

  if (!stroke || stroke === "none") return 0;

  // Prefer unitless/user-space attribute values; computed style may be px-scaled.
  const attrSw = el.getAttribute("stroke-width");
  let sw = NaN;
  if (attrSw && !/%/.test(attrSw)) sw = parseFloat(attrSw);
  if (!(sw > 0)) sw = parseFloat(strokeWidth);
  if (!(sw > 0)) return 0;

  let outset = sw / 2;
  const tag = (el.tagName || "").toLowerCase();
  const isPolyline =
    tag === "path" || tag === "polyline" || tag === "polygon" || tag === "line";
  if (isPolyline && String(linejoin).toLowerCase() === "miter") {
    const ml = parseFloat(miterlimit);
    if (ml > 1) outset = Math.max(outset, (sw / 2) * ml);
  }
  if (isPolyline && String(linecap).toLowerCase() === "square") {
    outset = Math.max(outset, (sw / 2) * Math.SQRT2);
  }
  return outset;
}

function measureSvgContentBBox(svg) {
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:absolute;left:-99999px;top:0;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none";
  const clone = svg.cloneNode(true);
  clone.setAttribute("viewBox", "-100000 -100000 200000 200000");
  clone.removeAttribute("width");
  clone.removeAttribute("height");
  clone.style.overflow = "visible";
  document.body.appendChild(host);
  host.appendChild(clone);

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const nodes = clone.querySelectorAll(
    "path,rect,circle,ellipse,line,polyline,polygon,text,use,image"
  );
  nodes.forEach(function (el) {
    try {
      const b = el.getBBox();
      if (!b) return;
      const pad = strokeOutsetForElement(el);
      // Lines / strokes can have zero width or height in the geometric box.
      if (!(b.width > 0 || b.height > 0 || pad > 0)) return;
      minX = Math.min(minX, b.x - pad);
      minY = Math.min(minY, b.y - pad);
      maxX = Math.max(maxX, b.x + b.width + pad);
      maxY = Math.max(maxY, b.y + b.height + pad);
    } catch (err) {
      /* skip unmeasurable nodes */
    }
  });

  let bbox = null;
  if (Number.isFinite(minX) && maxX > minX && maxY > minY) {
    bbox = { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  } else {
    try {
      const rootBox = clone.getBBox();
      if (rootBox && rootBox.width > 0 && rootBox.height > 0) {
        bbox = {
          x: rootBox.x,
          y: rootBox.y,
          width: rootBox.width,
          height: rootBox.height,
        };
      }
    } catch (err) {
      bbox = null;
    }
  }

  document.body.removeChild(host);
  return bbox;
}

function stripRootSvgSizeAttrs(svg) {
  svg.removeAttribute("width");
  svg.removeAttribute("height");
}

function applyContentViewBox(svg, options) {
  options = options || {};
  const padRatio = options.padRatio != null ? options.padRatio : 0;
  const padPx = options.padPx != null ? options.padPx : 0;
  const overflowVisible = options.overflowVisible === true;
  const bbox = measureSvgContentBBox(svg);
  if (!bbox || !(bbox.width > 0) || !(bbox.height > 0)) {
    throw new Error("Could not measure SVG content for viewBox");
  }
  const padX = bbox.width * padRatio + padPx;
  const padY = bbox.height * padRatio + padPx;
  const x = bbox.x - padX;
  const y = bbox.y - padY;
  const w = bbox.width + padX * 2;
  const h = bbox.height + padY * 2;
  const vb =
    formatViewBoxNumber(x) +
    " " +
    formatViewBoxNumber(y) +
    " " +
    formatViewBoxNumber(w) +
    " " +
    formatViewBoxNumber(h);
  svg.setAttribute("viewBox", vb);
  if (overflowVisible) {
    svg.setAttribute("overflow", "visible");
  }
  stripRootSvgSizeAttrs(svg);
  return vb;
}

function isInvalidViewBox(svg) {
  const vb = svg.getAttribute("viewBox");
  if (!vb) return true;
  const parts = vb.trim().split(/[\s,]+/);
  if (parts.length !== 4) return true;
  const nums = parts.map(function (p) {
    return parseFloat(p);
  });
  return nums.some(function (n) {
    return !Number.isFinite(n);
  }) || !(nums[2] > 0) || !(nums[3] > 0);
}

function fixSvgViewBoxMarkup(markup, intent) {
  const svg = parseSvg(markup);
  let padRatio = 0.02;
  let padPx = 0;
  let overflowVisible = false;
  if (intent === "remove-svg-viewbox-whitespace") {
    padRatio = 0;
  } else if (intent === "fix-svg-viewbox-cropping") {
    // Generous inset so thick strokes don't look clipped against the frame.
    padRatio = 0.1;
    padPx = 2;
    overflowVisible = true;
  } else if (intent === "fit-svg-to-viewbox") {
    padRatio = 0.02;
  } else if (intent === "calculate-svg-viewbox") {
    padRatio = 0;
  } else if (intent === "change-svg-viewbox") {
    padRatio = 0.02;
  } else if (intent === "fix-svg-viewbox-not-working") {
    if (isInvalidViewBox(svg)) svg.removeAttribute("viewBox");
    padRatio = 0.02;
  } else if (intent === "fix-svg-viewbox") {
    padRatio = 0.02;
  }
  const viewBox = applyContentViewBox(svg, {
    padRatio: padRatio,
    padPx: padPx,
    overflowVisible: overflowVisible,
  });
  return { markup: prettySerializeSvg(svg), viewBox: viewBox };
}

const VIEWBOX_DEFAULT_SVGS = {
  "fix-svg-viewbox": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" role="img" aria-label="Star with a broken viewBox — click Fix viewBox">
  <defs>
    <linearGradient id="vb-fix-fill" x1="40" y1="30" x2="160" y2="140" gradientUnits="userSpaceOnUse">
      <stop stop-color="#67e8f9"/>
      <stop offset="1" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <path fill="url(#vb-fix-fill)" d="M100 36 L112 72 L150 72 L120 94 L132 130 L100 108 L68 130 L80 94 L50 72 L88 72 Z"/>
</svg>`,
  "remove-svg-viewbox-whitespace": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" aria-label="Tiny icon in a huge viewBox — click Remove whitespace">
  <rect x="176" y="176" width="48" height="48" rx="10" fill="#22d3ee"/>
  <path d="M188 200 H212 M200 188 V212" stroke="#031018" stroke-width="4" stroke-linecap="round"/>
</svg>`,
  "fix-svg-viewbox-not-working": `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" role="img" aria-label="SVG with no viewBox — click Fix viewBox">
  <rect x="20" y="24" width="160" height="72" rx="14" fill="#0ea5e9"/>
  <text x="100" y="68" text-anchor="middle" fill="#031018" font-family="Segoe UI,sans-serif" font-size="18" font-weight="700">no viewBox</text>
</svg>`,
  "fix-svg-viewbox-cropping": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="60" height="60" role="img" aria-label="Cropped ring — click Fix cropping">
  <circle cx="48" cy="48" r="36" fill="none" stroke="#67e8f9" stroke-width="10"/>
  <circle cx="48" cy="48" r="14" fill="#22d3ee"/>
</svg>`,
  "fit-svg-to-viewbox": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200" role="img" aria-label="Loose artwork — click Fit to viewBox">
  <path d="M118 78 H182 L162 98 H138 Z" fill="#38bdf8"/>
  <circle cx="150" cy="118" r="22" fill="#67e8f9"/>
</svg>`,
  "calculate-svg-viewbox": `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160" role="img" aria-label="Shapes without viewBox — click Calculate viewBox">
  <ellipse cx="70" cy="80" rx="42" ry="28" fill="#0ea5e9"/>
  <rect x="120" y="48" width="70" height="70" rx="12" fill="#22d3ee"/>
  <path d="M210 40 L235 120 L185 120 Z" fill="#67e8f9"/>
</svg>`,
  "change-svg-viewbox": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-label="Outdated 24x24 viewBox — click Change viewBox">
  <g transform="translate(40 20)">
    <rect width="80" height="50" rx="8" fill="#0284c7"/>
    <path d="M16 25 H64" stroke="#e0f2fe" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>`,
};

const viewboxActionBtn = document.getElementById("btn-viewbox-action");
const viewboxIntent =
  (document.body && document.body.getAttribute("data-viewbox-intent")) || "";

if (viewboxActionBtn && viewboxIntent) {
  viewboxActionBtn.addEventListener("click", function () {
    const raw = extractSvgMarkup(editor.value) || editor.value.trim();
    if (!raw) {
      setStatus("empty", "Paste an SVG first");
      return;
    }
    try {
      const result = fixSvgViewBoxMarkup(raw, viewboxIntent);
      applyMirroredEditorMarkup(
        result.markup,
        "viewBox set to " + result.viewBox + " — width/height removed"
      );
    } catch (err) {
      setStatus("error", (err && err.message) || "Could not update viewBox");
    }
  });
}

function parseCssColorChannels(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw || raw === "none" || raw === "transparent" || raw.indexOf("url(") === 0) {
    return null;
  }
  if (raw === "white" || raw === "#fff" || raw === "#ffffff") {
    return { r: 255, g: 255, b: 255, a: 1 };
  }
  if (raw === "black" || raw === "#000" || raw === "#000000") {
    return { r: 0, g: 0, b: 0, a: 1 };
  }
  const hex = raw.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) {
      h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    }
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return { r: r, g: g, b: b, a: a };
  }
  const rgb = raw.match(
    /^rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*,\s*([0-9.]+))?\s*\)$/
  );
  if (rgb) {
    return {
      r: Number(rgb[1]),
      g: Number(rgb[2]),
      b: Number(rgb[3]),
      a: rgb[4] != null ? Number(rgb[4]) : 1,
    };
  }
  return null;
}

function colorLuma(c) {
  return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
}

function isNearWhiteColor(c) {
  return c && c.a > 0.05 && colorLuma(c) >= 240 && c.r >= 230 && c.g >= 230 && c.b >= 230;
}

function isSolidOpaqueColor(c) {
  return c && c.a >= 0.92;
}

function isColoredOpaqueColor(c) {
  return isSolidOpaqueColor(c) && !isNearWhiteColor(c);
}

function isTransparentOrNoneFill(fill) {
  const raw = String(fill || "").trim().toLowerCase();
  return !raw || raw === "none" || raw === "transparent";
}

function readSvgCanvas(svg) {
  const vb = svg.getAttribute("viewBox");
  if (vb) {
    const parts = vb.trim().split(/[\s,]+/).map(Number);
    if (
      parts.length === 4 &&
      parts.every(function (n) {
        return Number.isFinite(n);
      }) &&
      parts[2] > 0 &&
      parts[3] > 0
    ) {
      return { x: parts[0], y: parts[1], width: parts[2], height: parts[3] };
    }
  }
  const w = parseFloat(svg.getAttribute("width"));
  const h = parseFloat(svg.getAttribute("height"));
  if (w > 0 && h > 0) return { x: 0, y: 0, width: w, height: h };
  return { x: 0, y: 0, width: 100, height: 100 };
}

function elementOpacity(el) {
  const op = parseFloat(el.getAttribute("opacity"));
  if (Number.isFinite(op)) return op;
  const fo = parseFloat(el.getAttribute("fill-opacity"));
  if (Number.isFinite(fo)) return fo;
  return 1;
}

function resolveElementFill(el) {
  let fill = el.getAttribute("fill");
  if (!fill && el.hasAttribute("style")) {
    const style = el.getAttribute("style") || "";
    const m = style.match(/(?:^|;)\s*fill\s*:\s*([^;]+)/i);
    if (m) fill = m[1].trim();
  }
  if (!fill || fill === "inherit") fill = "#000000";
  return fill;
}

function rectCoversCanvas(el, canvas) {
  if (!el || String(el.tagName || "").toLowerCase() !== "rect") return false;
  const x = parseFloat(el.getAttribute("x") || "0");
  const y = parseFloat(el.getAttribute("y") || "0");
  let w = parseFloat(el.getAttribute("width") || "0");
  let h = parseFloat(el.getAttribute("height") || "0");
  if (String(el.getAttribute("width") || "").indexOf("%") >= 0) w = canvas.width;
  if (String(el.getAttribute("height") || "").indexOf("%") >= 0) h = canvas.height;
  if (!(w > 0) || !(h > 0)) return false;
  const tolX = Math.max(1, canvas.width * 0.02);
  const tolY = Math.max(1, canvas.height * 0.02);
  return (
    x <= canvas.x + tolX &&
    y <= canvas.y + tolY &&
    x + w >= canvas.x + canvas.width - tolX &&
    y + h >= canvas.y + canvas.height - tolY
  );
}

function clearRootBackgroundStyles(svg) {
  let changed = false;
  ["style", "fill"].forEach(function (attr) {
    const val = svg.getAttribute(attr);
    if (!val) return;
    if (attr === "fill") {
      const c = parseCssColorChannels(val);
      if (isSolidOpaqueColor(c) || isTransparentOrNoneFill(val)) {
        svg.removeAttribute("fill");
        changed = true;
      }
      return;
    }
    const next = String(val)
      .replace(/(?:^|;)\s*background(?:-color)?\s*:[^;]*/gi, "")
      .replace(/^;+|;+$/g, "")
      .trim();
    if (next !== String(val).trim()) {
      if (next) svg.setAttribute("style", next);
      else svg.removeAttribute("style");
      changed = true;
    }
  });
  return changed;
}

function backgroundRectMatches(el, intent, canvas) {
  if (!rectCoversCanvas(el, canvas)) return false;
  const fill = resolveElementFill(el);
  const opacity = elementOpacity(el);
  const channels = parseCssColorChannels(fill);
  const effective = channels
    ? { r: channels.r, g: channels.g, b: channels.b, a: channels.a * opacity }
    : null;

  if (intent === "remove-transparent-background-from-svg") {
    return (
      isTransparentOrNoneFill(fill) ||
      opacity <= 0.08 ||
      (effective && effective.a <= 0.08)
    );
  }
  if (intent === "remove-white-background-from-svg") {
    return isNearWhiteColor(effective);
  }
  if (intent === "remove-colored-background-from-svg") {
    return isColoredOpaqueColor(effective);
  }
  if (
    intent === "remove-solid-background-from-svg" ||
    intent === "remove-background-color-from-svg" ||
    intent === "make-svg-background-transparent" ||
    intent === "remove-background-from-svg" ||
    intent === "remove-white-space-from-svg"
  ) {
    if (isTransparentOrNoneFill(fill) && intent === "remove-white-space-from-svg") {
      return true;
    }
    return isSolidOpaqueColor(effective);
  }
  return isSolidOpaqueColor(effective);
}

function collectBackgroundRects(svg, intent) {
  const canvas = readSvgCanvas(svg);
  const found = [];
  const kids = Array.prototype.slice.call(svg.children || []);
  kids.forEach(function (el, index) {
    const tag = String(el.tagName || "").toLowerCase();
    if (tag === "rect" && backgroundRectMatches(el, intent, canvas)) {
      // Prefer early siblings — typical export background layer.
      if (index < 3 || found.length === 0) found.push(el);
    }
    if (tag === "g" && index === 0) {
      const nested = Array.prototype.slice.call(el.children || []);
      nested.forEach(function (child, nestedIndex) {
        if (
          nestedIndex < 2 &&
          String(child.tagName || "").toLowerCase() === "rect" &&
          backgroundRectMatches(child, intent, canvas)
        ) {
          found.push(child);
        }
      });
    }
  });
  return found;
}

function removeSvgBackgroundMarkup(markup, intent) {
  const source = extractSvgMarkup(markup) || String(markup || "").trim();
  if (!source) throw new Error("Paste an SVG first");
  const svg = parseSvg(source);
  let removed = 0;

  if (clearRootBackgroundStyles(svg)) removed += 1;

  collectBackgroundRects(svg, intent).forEach(function (el) {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
      removed += 1;
    }
  });

  let viewBox = null;
  if (intent === "remove-white-space-from-svg") {
    viewBox = applyContentViewBox(svg, { padRatio: 0, padPx: 0 });
  } else {
    stripRootSvgSizeAttrs(svg);
  }

  const out = formatSvgReadableMarkup(prettySerializeSvg(svg));
  let status = "Background removed";
  if (intent === "remove-white-background-from-svg") {
    status = removed
      ? "White background removed"
      : "No white background found — root size cleared";
  } else if (intent === "remove-transparent-background-from-svg") {
    status = removed
      ? "Transparent background layer removed"
      : "No transparent background layer found — root size cleared";
  } else if (intent === "make-svg-background-transparent") {
    status = removed
      ? "Background cleared — SVG is transparent"
      : "Already transparent — root size cleared";
  } else if (intent === "remove-white-space-from-svg") {
    status =
      "Whitespace trimmed" +
      (viewBox ? " — viewBox " + viewBox : "") +
      (removed ? "; background cleared" : "");
  } else if (intent === "remove-background-color-from-svg") {
    status = removed
      ? "Background color removed"
      : "No background color found — root size cleared";
  } else if (intent === "remove-solid-background-from-svg") {
    status = removed
      ? "Solid background removed"
      : "No solid background found — root size cleared";
  } else if (intent === "remove-colored-background-from-svg") {
    status = removed
      ? "Colored background removed"
      : "No colored background found — root size cleared";
  } else {
    status = removed
      ? "Background removed from SVG"
      : "No background layer found — root size cleared";
  }

  return { markup: out, status: status, removed: removed, viewBox: viewBox };
}

const BG_REMOVE_DEFAULT_SVGS = {
  "remove-background-from-svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" role="img" aria-label="Icon on a solid plate — click Remove background">
  <rect x="0" y="0" width="160" height="120" fill="#e2e8f0"/>
  <circle cx="80" cy="60" r="34" fill="#0ea5e9"/>
  <path d="M64 62 L76 74 L100 46" fill="none" stroke="#031018" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "remove-white-background-from-svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" role="img" aria-label="Star on white canvas — click Remove white background">
  <rect width="140" height="140" fill="#ffffff"/>
  <path d="M70 22 L82 54 L116 54 L88 74 L98 108 L70 88 L42 108 L52 74 L24 54 L58 54 Z" fill="#0284c7"/>
</svg>`,
  "remove-transparent-background-from-svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" role="img" aria-label="Graphic with invisible full-bleed rect — click Remove transparent background">
  <rect x="0" y="0" width="160" height="100" fill="none"/>
  <rect x="24" y="22" width="112" height="56" rx="12" fill="#22d3ee"/>
  <circle cx="56" cy="50" r="14" fill="#031018"/>
  <circle cx="104" cy="50" r="14" fill="#031018"/>
</svg>`,
  "make-svg-background-transparent": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Badge with gray plate — click Make transparent">
  <rect width="120" height="120" rx="0" fill="#94a3b8"/>
  <circle cx="60" cy="60" r="36" fill="#67e8f9"/>
  <circle cx="60" cy="60" r="14" fill="#031018"/>
</svg>`,
  "remove-white-space-from-svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220" role="img" aria-label="Tiny mark in a large white frame — click Remove white space">
  <rect width="300" height="220" fill="#ffffff"/>
  <rect x="126" y="86" width="48" height="48" rx="10" fill="#0ea5e9"/>
  <path d="M138 110 H162 M150 98 V122" stroke="#031018" stroke-width="4" stroke-linecap="round"/>
</svg>`,
  "remove-background-color-from-svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 100" role="img" aria-label="Shapes on a colored fill — click Remove background color">
  <rect x="0" y="0" width="150" height="100" fill="#fef3c7"/>
  <ellipse cx="52" cy="50" rx="28" ry="22" fill="#0ea5e9"/>
  <rect x="88" y="28" width="40" height="44" rx="8" fill="#0284c7"/>
</svg>`,
  "remove-solid-background-from-svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130" role="img" aria-label="Solid slate behind a gem — click Remove solid background">
  <rect width="130" height="130" fill="#1e293b"/>
  <path d="M65 18 L108 65 L65 112 L22 65 Z" fill="#38bdf8"/>
</svg>`,
  "remove-colored-background-from-svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" role="img" aria-label="Icon on a teal plate — click Remove colored background">
  <rect width="160" height="110" fill="#0f766e"/>
  <path d="M36 70 L80 28 L124 70 V92 H36 Z" fill="#ecfeff"/>
  <rect x="68" y="70" width="24" height="22" fill="#0f766e"/>
</svg>`,
};

const bgRemoveActionBtn = document.getElementById("btn-bg-remove-action");
const bgRemoveIntent =
  (document.body && document.body.getAttribute("data-bg-remove-intent")) || "";

if (bgRemoveActionBtn && bgRemoveIntent) {
  bgRemoveActionBtn.addEventListener("click", function () {
    const raw = extractSvgMarkup(editor.value) || editor.value.trim();
    if (!raw) {
      setStatus("empty", "Paste an SVG first");
      return;
    }
    try {
      const result = removeSvgBackgroundMarkup(raw, bgRemoveIntent);
      applyMirroredEditorMarkup(result.markup, result.status);
    } catch (err) {
      setStatus("error", (err && err.message) || "Could not remove background");
    }
  });
}

const STROKE_COLOR_PALETTE = [
  "#0ea5e9",
  "#f43f5e",
  "#22c55e",
  "#f59e0b",
  "#a855f7",
  "#06b6d4",
];

function nextStrokePaletteColor(current) {
  const cur = String(current || "").trim().toLowerCase();
  let idx = -1;
  for (let i = 0; i < STROKE_COLOR_PALETTE.length; i++) {
    if (STROKE_COLOR_PALETTE[i].toLowerCase() === cur) {
      idx = i;
      break;
    }
  }
  return STROKE_COLOR_PALETTE[(idx + 1) % STROKE_COLOR_PALETTE.length];
}

function elementHasPaintStroke(el) {
  const tag = String(el.tagName || "").toLowerCase();
  if (
    tag !== "path" &&
    tag !== "line" &&
    tag !== "polyline" &&
    tag !== "polygon" &&
    tag !== "circle" &&
    tag !== "ellipse" &&
    tag !== "rect" &&
    tag !== "g" &&
    tag !== "svg"
  ) {
    return false;
  }
  const stroke = el.getAttribute("stroke");
  if (stroke && stroke !== "none") return true;
  if (el.hasAttribute("style") && /(?:^|;)\s*stroke\s*:/i.test(el.getAttribute("style") || "")) {
    return true;
  }
  return tag === "svg" || tag === "g";
}

function setElementStrokeColor(el, color, mode) {
  const tag = String(el.tagName || "").toLowerCase();
  if (tag === "defs" || tag === "style" || tag === "metadata" || tag === "title" || tag === "desc") {
    return false;
  }
  let changed = false;
  if (el.hasAttribute("style")) {
    const style = el.getAttribute("style") || "";
    if (/(?:^|;)\s*stroke\s*:/i.test(style)) {
      const next = style.replace(/(?:^|;)\s*stroke\s*:[^;]*/i, function (m) {
        const lead = m.charAt(0) === ";" ? ";" : "";
        return lead + " stroke: " + color;
      });
      el.setAttribute("style", next.replace(/^;\s*/, "").trim());
      changed = true;
    }
  }
  const stroke = el.getAttribute("stroke");
  const isShape =
    tag === "path" ||
    tag === "line" ||
    tag === "polyline" ||
    tag === "polygon" ||
    tag === "circle" ||
    tag === "ellipse" ||
    tag === "rect";
  if (mode === "paths-only" && tag !== "path") return changed;
  if (stroke && stroke !== "none") {
    el.setAttribute("stroke", color);
    changed = true;
  } else if ((mode === "force" || mode === "icon") && (isShape || tag === "svg")) {
    if (tag === "svg" || isShape) {
      el.setAttribute("stroke", color);
      if (tag === "svg" && !el.getAttribute("fill")) el.setAttribute("fill", "none");
      changed = true;
    }
  } else if (isShape && (stroke === null || stroke === "") && mode === "shapes") {
    /* skip unstroked filled shapes */
  }
  return changed;
}

function rewriteSvgStrokeColor(markup, intent, preferredColor) {
  const source = extractSvgMarkup(markup) || String(markup || "").trim();
  if (!source) throw new Error("Paste an SVG first");
  const svg = parseSvg(source);
  stripRootSvgSizeAttrs(svg);

  let mode = "shapes";
  if (intent === "change-svg-path-stroke-color") mode = "paths-only";
  if (
    intent === "change-svg-icon-stroke-color" ||
    intent === "change-inline-svg-stroke-color"
  ) {
    mode = "icon";
  }

  const useCurrent =
    intent === "change-svg-stroke-color-currentcolor" ||
    intent === "change-svg-stroke-color-css" ||
    intent === "change-svg-stroke-color-hover" ||
    intent === "change-svg-stroke-color-react" ||
    intent === "change-svg-stroke-color-tailwind" ||
    intent === "change-svg-stroke-color-without-editing-svg";

  let sampleStroke = preferredColor || "#f43f5e";
  if (!useCurrent) {
    const probe = svg.querySelector("[stroke]");
    sampleStroke = nextStrokePaletteColor(probe ? probe.getAttribute("stroke") : sampleStroke);
  } else {
    sampleStroke = "currentColor";
  }

  let count = 0;
  const walk = function (node) {
    if (!node || node.nodeType !== 1) return;
    const tag = String(node.tagName || "").toLowerCase();
    if (tag === "defs" || tag === "style") return;
    if (setElementStrokeColor(node, sampleStroke, mode === "paths-only" ? "paths-only" : mode === "icon" ? "force" : "shapes")) {
      if (elementHasPaintStroke(node) || node.getAttribute("stroke") === sampleStroke) count += 1;
    }
    Array.prototype.forEach.call(node.children || [], walk);
  };
  walk(svg);

  if (useCurrent && !svg.getAttribute("stroke")) {
    svg.setAttribute("stroke", "currentColor");
    if (!svg.getAttribute("fill")) svg.setAttribute("fill", "none");
  }

  const out = formatSvgReadableMarkup(prettySerializeSvg(svg));
  return {
    markup: out,
    color: sampleStroke,
    count: count,
    status: useCurrent
      ? "Stroke set to currentColor — control color from CSS / parent"
      : "Stroke color set to " + sampleStroke,
  };
}

function strokeRecipeSnippet(intent, color) {
  const c = color || "#f43f5e";
  switch (intent) {
    case "change-svg-stroke-color-css":
      return (
        "/* Parent or class controls stroke via currentColor */\n" +
        ".icon {\n  color: " +
        c +
        ";\n}\n.icon svg {\n  stroke: currentColor;\n  fill: none;\n}"
      );
    case "change-svg-stroke-color-javascript":
      return (
        "const svg = document.querySelector('svg');\n" +
        "svg.querySelectorAll('[stroke]').forEach((el) => {\n" +
        "  if (el.getAttribute('stroke') !== 'none') el.setAttribute('stroke', '" +
        c +
        "');\n" +
        "});"
      );
    case "change-svg-stroke-color-hover":
      return (
        ".icon {\n  color: #0ea5e9;\n}\n.icon:hover {\n  color: " +
        c +
        ";\n}\n.icon svg {\n  stroke: currentColor;\n  transition: color .15s ease;\n}"
      );
    case "change-svg-stroke-color-currentcolor":
      return (
        "<!-- SVG uses stroke=\"currentColor\" -->\n" +
        "<span style=\"color: " +
        c +
        "\">\n  <!-- paste SVG here -->\n</span>"
      );
    case "change-svg-stroke-color-react":
      return (
        "export function Icon({ color = '" +
        c +
        "', ...props }) {\n" +
        "  return (\n" +
        "    <svg stroke={color} fill=\"none\" {...props}>\n" +
        "      {/* paths */}\n" +
        "    </svg>\n" +
        "  );\n}"
      );
    case "change-svg-stroke-color-tailwind":
      return (
        "<span className=\"text-sky-500 hover:text-rose-500\">\n" +
        "  <svg className=\"stroke-current fill-none\" {/* … */} />\n" +
        "</span>"
      );
    case "change-svg-stroke-color-without-editing-svg":
      return (
        "/* Recolor without rewriting path d — use currentColor */\n" +
        ".btn:hover svg { color: " +
        c +
        "; }\n" +
        "/* SVG markup keeps stroke=\"currentColor\" */"
      );
    default:
      return "";
  }
}

const STROKE_DEFAULT_SVGS = {
  "change-svg-stroke-color": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" role="img" aria-label="Stroked shapes — click to change stroke color">
  <rect x="18" y="18" width="84" height="84" rx="16" stroke="#0ea5e9" stroke-width="6"/>
  <circle cx="60" cy="60" r="22" stroke="#0ea5e9" stroke-width="6"/>
  <path d="M40 60 H80" stroke="#0ea5e9" stroke-width="6" stroke-linecap="round"/>
</svg>`,
  "change-svg-stroke-color-css": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" role="img" aria-label="currentColor stroke for CSS">
  <circle cx="48" cy="48" r="28"/>
  <path d="M48 28 V68 M28 48 H68"/>
</svg>`,
  "change-svg-stroke-color-javascript": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" fill="none" role="img" aria-label="Stroked polyline — click to recolor via JS-style update">
  <polyline points="12,64 36,20 60,52 84,16 108,48" stroke="#0ea5e9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "change-inline-svg-stroke-color": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" role="img" aria-label="Inline SVG heart outline — click to change stroke">
  <path d="M50 82 C50 82 16 60 16 38 C16 26 26 18 38 18 C44 18 49 21 50 26 C51 21 56 18 62 18 C74 18 84 26 84 38 C84 60 50 82 50 82 Z" stroke="#0ea5e9" stroke-width="5" stroke-linejoin="round"/>
</svg>`,
  "change-svg-stroke-color-hover": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Hover-ready icon stroke">
  <path d="M28 48 H68"/>
  <path d="M48 28 L68 48 L48 68"/>
</svg>`,
  "change-svg-stroke-color-currentcolor": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none" stroke="#0ea5e9" stroke-width="6" stroke-linecap="round" role="img" aria-label="Hardcoded stroke — click to switch to currentColor">
  <rect x="20" y="20" width="56" height="56" rx="12"/>
  <path d="M36 48 H60"/>
</svg>`,
  "change-svg-stroke-color-react": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none" stroke="#0ea5e9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="React-ready star outline">
  <path d="M48 16 L56 38 H80 L60 52 L68 76 L48 62 L28 76 L36 52 L16 38 H40 Z"/>
</svg>`,
  "change-svg-stroke-color-tailwind": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none" stroke="#0ea5e9" stroke-width="6" stroke-linecap="round" role="img" aria-label="Tailwind stroke-current sample">
  <circle cx="48" cy="48" r="26"/>
  <path d="M48 30 V48 L60 60"/>
</svg>`,
  "change-svg-path-stroke-color": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" fill="none" role="img" aria-label="Path stroke sample — click to recolor path only">
  <rect x="8" y="8" width="144" height="84" rx="14" stroke="#64748b" stroke-width="2" stroke-dasharray="4 6"/>
  <path d="M28 70 C48 20 70 20 90 50 S130 80 140 36" stroke="#0ea5e9" stroke-width="8" stroke-linecap="round"/>
</svg>`,
  "change-svg-icon-stroke-color": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="UI icon — click to change stroke color">
  <path d="M12 3v18"/>
  <path d="M5 12h14"/>
  <circle cx="12" cy="12" r="9"/>
</svg>`,
  "change-svg-stroke-color-without-editing-svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none" stroke="#0ea5e9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Keep path d — switch stroke to currentColor">
  <path d="M22 48 H74"/>
  <path d="M48 22 V74"/>
  <rect x="22" y="22" width="52" height="52" rx="10"/>
</svg>`,
};

const strokeActionBtn = document.getElementById("btn-stroke-action");
const strokeIntent =
  (document.body && document.body.getAttribute("data-stroke-intent")) || "";

if (strokeActionBtn && strokeIntent) {
  strokeActionBtn.addEventListener("click", function () {
    const raw = extractSvgMarkup(editor.value) || editor.value.trim();
    if (!raw) {
      setStatus("empty", "Paste an SVG first");
      return;
    }
    try {
      const recipeColor = "#f43f5e";
      const result = rewriteSvgStrokeColor(raw, strokeIntent, recipeColor);
      applyMirroredEditorMarkup(result.markup, result.status);
      const snippet = strokeRecipeSnippet(strokeIntent, result.color === "currentColor" ? recipeColor : result.color);
      if (snippet) {
        copyTextToClipboard(snippet)
          .then(function () {
            flashCopyButton(strokeActionBtn, "Copied");
            setStatus("ok", result.status + " — snippet copied");
          })
          .catch(function () {
            setStatus("ok", result.status);
          });
      }
    } catch (err) {
      setStatus("error", (err && err.message) || "Could not change stroke color");
    }
  });
}

function formatPathNumber(n) {
  if (!Number.isFinite(n)) return "0";
  const r = Math.round(n * 1000) / 1000;
  if (Object.is(r, -0)) return "0";
  return String(r);
}

function tokenizePathData(d) {
  const tokens = [];
  const re = /([MmLlHhVvCcSsQqTtAaZz])|([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)/g;
  let m;
  while ((m = re.exec(String(d || "")))) {
    if (m[1]) tokens.push({ type: "cmd", value: m[1] });
    else tokens.push({ type: "num", value: parseFloat(m[2]) });
  }
  return tokens;
}

function scaleSvgPathData(d, sx, sy, ox, oy) {
  ox = ox || 0;
  oy = oy || 0;
  const tokens = tokenizePathData(d);
  if (!tokens.length) return d;
  const out = [];
  let cmd = "";
  let nums = [];

  function flush() {
    if (!cmd) return;
    const upper = cmd.toUpperCase();
    const abs = cmd === upper;
    const scaled = nums.slice();
    const mapPairFrom = function (start) {
      for (let i = start; i + 1 < scaled.length; i += 2) {
        if (abs) {
          scaled[i] = ox + (scaled[i] - ox) * sx;
          scaled[i + 1] = oy + (scaled[i + 1] - oy) * sy;
        } else {
          scaled[i] = scaled[i] * sx;
          scaled[i + 1] = scaled[i + 1] * sy;
        }
      }
    };

    if (upper === "H") {
      for (let i = 0; i < scaled.length; i++) {
        scaled[i] = abs ? ox + (scaled[i] - ox) * sx : scaled[i] * sx;
      }
    } else if (upper === "V") {
      for (let i = 0; i < scaled.length; i++) {
        scaled[i] = abs ? oy + (scaled[i] - oy) * sy : scaled[i] * sy;
      }
    } else if (upper === "A") {
      for (let i = 0; i + 6 < scaled.length; i += 7) {
        scaled[i] = scaled[i] * Math.abs(sx);
        scaled[i + 1] = scaled[i + 1] * Math.abs(sy);
        if (abs) {
          scaled[i + 5] = ox + (scaled[i + 5] - ox) * sx;
          scaled[i + 6] = oy + (scaled[i + 6] - oy) * sy;
        } else {
          scaled[i + 5] = scaled[i + 5] * sx;
          scaled[i + 6] = scaled[i + 6] * sy;
        }
      }
    } else if (upper !== "Z") {
      mapPairFrom(0);
    }

    out.push(cmd);
    scaled.forEach(function (n, idx) {
      if (idx) out.push(" ");
      else out.push("");
      out.push(formatPathNumber(n));
    });
    cmd = "";
    nums = [];
  }

  tokens.forEach(function (tok) {
    if (tok.type === "cmd") {
      flush();
      cmd = tok.value;
      if (cmd.toUpperCase() === "Z") {
        out.push(cmd);
        cmd = "";
      }
    } else {
      nums.push(tok.value);
    }
  });
  flush();
  return out.join("").replace(/ -/g, "-").replace(/,/g, " ");
}

function forEachPathElement(svg, fn) {
  Array.prototype.forEach.call(svg.querySelectorAll("path"), function (path) {
    const d = path.getAttribute("d");
    if (d) fn(path, d);
  });
}

function measurePathsBBox(svg) {
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:absolute;left:-99999px;top:0;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";
  const clone = svg.cloneNode(true);
  host.appendChild(clone);
  document.body.appendChild(host);
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  Array.prototype.forEach.call(clone.querySelectorAll("path"), function (path) {
    try {
      const b = path.getBBox();
      if (!b || (!(b.width > 0) && !(b.height > 0))) return;
      minX = Math.min(minX, b.x);
      minY = Math.min(minY, b.y);
      maxX = Math.max(maxX, b.x + b.width);
      maxY = Math.max(maxY, b.y + b.height);
    } catch (err) {
      /* skip */
    }
  });
  document.body.removeChild(host);
  if (!Number.isFinite(minX) || !(maxX > minX) || !(maxY > minY)) return null;
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

function scaleSvgPathMarkup(markup, intent, factorOverride) {
  const source = extractSvgMarkup(markup) || String(markup || "").trim();
  if (!source) throw new Error("Paste an SVG first");
  const svg = parseSvg(source);
  const paths = svg.querySelectorAll("path");
  if (!paths.length) throw new Error("No <path> elements found to scale");

  let sx = 1.25;
  let sy = 1.25;
  let keepViewBox = false;
  let originMode = "viewbox"; // or bbox
  let status = "Path scaled";

  if (intent === "scale-svg-path-by-factor") {
    sx = sy = factorOverride != null ? factorOverride : 1.5;
    status = "Path scaled ×" + formatPathNumber(sx);
  } else if (intent === "scale-svg-path-by-percentage") {
    const pct = factorOverride != null ? factorOverride : 125;
    sx = sy = pct / 100;
    status = "Path scaled to " + formatPathNumber(pct) + "%";
  } else if (intent === "scale-svg-path-proportionally") {
    sx = sy = factorOverride != null ? factorOverride : 1.25;
    status = "Path scaled proportionally ×" + formatPathNumber(sx);
  } else if (intent === "scale-svg-path-x-coordinates") {
    sx = factorOverride != null ? factorOverride : 1.35;
    sy = 1;
    status = "Path X coordinates scaled ×" + formatPathNumber(sx);
  } else if (intent === "scale-svg-path-y-coordinates") {
    sx = 1;
    sy = factorOverride != null ? factorOverride : 1.35;
    status = "Path Y coordinates scaled ×" + formatPathNumber(sy);
  } else if (intent === "scale-svg-path-without-transform") {
    sx = sy = factorOverride != null ? factorOverride : 1.25;
    status = "Path d rewritten (no transform attribute)";
  } else if (intent === "scale-svg-path-without-changing-viewbox") {
    sx = sy = factorOverride != null ? factorOverride : 1.25;
    keepViewBox = true;
    status = "Path scaled — viewBox unchanged";
  } else if (intent === "scale-svg-path-coordinates") {
    sx = sy = factorOverride != null ? factorOverride : 1.25;
    status = "Path coordinates scaled ×" + formatPathNumber(sx);
  } else if (intent === "scale-svg-path-to-specific-size") {
    originMode = "bbox";
    const bbox = measurePathsBBox(svg);
    if (!bbox) throw new Error("Could not measure path bounds");
    const target = factorOverride != null ? factorOverride : 100;
    const longSide = Math.max(bbox.width, bbox.height) || 1;
    sx = sy = target / longSide;
    status = "Path scaled to about " + formatPathNumber(target) + "px";
  } else if (intent === "scale-svg-path-to-fit-viewbox") {
    originMode = "bbox";
    keepViewBox = true;
    const vb = getSvgViewBoxBox(svg) || { minX: 0, minY: 0, width: 100, height: 100 };
    const bbox = measurePathsBBox(svg);
    if (!bbox) throw new Error("Could not measure path bounds");
    const pad = 0.08;
    const fitW = vb.width * (1 - pad * 2);
    const fitH = vb.height * (1 - pad * 2);
    sx = sy = Math.min(fitW / (bbox.width || 1), fitH / (bbox.height || 1));
    // After uniform scale about bbox center, translate into viewBox center via coordinate rewrite:
    // done in second pass below.
    status = "Path scaled to fit viewBox";
  }

  let ox = 0;
  let oy = 0;
  if (originMode === "bbox" || intent === "scale-svg-path-to-fit-viewbox") {
    const bbox = measurePathsBBox(svg);
    if (bbox) {
      ox = bbox.x + bbox.width / 2;
      oy = bbox.y + bbox.height / 2;
    }
  } else {
    const vb = getSvgViewBoxBox(svg);
    if (vb) {
      ox = vb.minX + vb.width / 2;
      oy = vb.minY + vb.height / 2;
    }
  }

  forEachPathElement(svg, function (path, d) {
    path.setAttribute("d", scaleSvgPathData(d, sx, sy, ox, oy));
    if (intent === "scale-svg-path-without-transform") {
      const tr = path.getAttribute("transform");
      if (tr && /scale\s*\(/i.test(tr)) {
        const cleaned = tr
          .replace(/scale\s*\([^)]*\)/gi, "")
          .replace(/\s{2,}/g, " ")
          .trim();
        if (cleaned) path.setAttribute("transform", cleaned);
        else path.removeAttribute("transform");
      }
    }
  });

  if (intent === "scale-svg-path-to-fit-viewbox") {
    const vb = getSvgViewBoxBox(svg) || { minX: 0, minY: 0, width: 100, height: 100 };
    const bbox2 = measurePathsBBox(svg);
    if (bbox2) {
      const dx = vb.minX + vb.width / 2 - (bbox2.x + bbox2.width / 2);
      const dy = vb.minY + vb.height / 2 - (bbox2.y + bbox2.height / 2);
      forEachPathElement(svg, function (path, d) {
        path.setAttribute("d", translatePathData(d, dx, dy));
      });
    }
  }

  if (!keepViewBox && intent !== "scale-svg-path-without-changing-viewbox" && intent !== "scale-svg-path-to-fit-viewbox") {
    try {
      applyContentViewBox(svg, { padRatio: 0.04, padPx: 0 });
    } catch (err) {
      stripRootSvgSizeAttrs(svg);
    }
  } else {
    stripRootSvgSizeAttrs(svg);
  }

  return {
    markup: formatSvgReadableMarkup(prettySerializeSvg(svg)),
    status: status,
    sx: sx,
    sy: sy,
  };
}

function translatePathData(d, dx, dy) {
  const tokens = tokenizePathData(d);
  if (!tokens.length) return d;
  const out = [];
  let cmd = "";
  let nums = [];

  function flush() {
    if (!cmd) return;
    const upper = cmd.toUpperCase();
    const abs = cmd === upper;
    const shifted = nums.slice();
    if (abs) {
      if (upper === "H") {
        for (let i = 0; i < shifted.length; i++) shifted[i] += dx;
      } else if (upper === "V") {
        for (let i = 0; i < shifted.length; i++) shifted[i] += dy;
      } else if (upper === "A") {
        for (let i = 0; i + 6 < shifted.length; i += 7) {
          shifted[i + 5] += dx;
          shifted[i + 6] += dy;
        }
      } else if (upper !== "Z") {
        for (let i = 0; i + 1 < shifted.length; i += 2) {
          shifted[i] += dx;
          shifted[i + 1] += dy;
        }
      }
    }
    out.push(cmd);
    shifted.forEach(function (n, idx) {
      out.push(idx ? " " : "");
      out.push(formatPathNumber(n));
    });
    cmd = "";
    nums = [];
  }

  tokens.forEach(function (tok) {
    if (tok.type === "cmd") {
      flush();
      cmd = tok.value;
      if (cmd.toUpperCase() === "Z") {
        out.push(cmd);
        cmd = "";
      }
    } else nums.push(tok.value);
  });
  flush();
  return out.join("");
}

const SCALE_PATH_DEFAULT_SVGS = {
  "scale-svg-path-coordinates": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Arrow path — click to scale coordinates">
  <path d="M30 60 H78 L60 42 M78 60 L60 78" fill="none" stroke="#0ea5e9" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "scale-svg-path-by-factor": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Chevron path — click to scale by factor">
  <path d="M40 36 L72 60 L40 84" fill="none" stroke="#22d3ee" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "scale-svg-path-by-percentage": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Corner path — click to scale by percentage">
  <path d="M34 34 H78 V78" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "scale-svg-path-proportionally": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" role="img" aria-label="Wave path — click to scale proportionally">
  <path d="M16 60 C36 20 52 20 70 50 S104 90 124 40" fill="none" stroke="#0ea5e9" stroke-width="7" stroke-linecap="round"/>
</svg>`,
  "scale-svg-path-x-coordinates": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" role="img" aria-label="Wide arrow — click to scale X only">
  <path d="M24 50 H100 L80 32 M100 50 L80 68" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "scale-svg-path-y-coordinates": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" role="img" aria-label="Tall arrow — click to scale Y only">
  <path d="M50 116 V40 L32 60 M50 40 L68 60" fill="none" stroke="#a855f7" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "scale-svg-path-without-transform": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Path with transform noise — click to bake scale into d">
  <path transform="scale(1)" d="M36 60 L60 36 L84 60 L60 84 Z" fill="none" stroke="#06b6d4" stroke-width="6" stroke-linejoin="round"/>
</svg>`,
  "scale-svg-path-without-changing-viewbox": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Keep viewBox — scale path inside">
  <rect x="8" y="8" width="104" height="104" rx="12" fill="none" stroke="#64748b" stroke-dasharray="4 5"/>
  <path d="M40 60 H80 L66 46 M80 60 L66 74" fill="none" stroke="#0ea5e9" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "scale-svg-path-to-specific-size": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Small path — click to scale to ~100px">
  <path d="M90 100 H118 L108 90 M118 100 L108 110" fill="none" stroke="#f43f5e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "scale-svg-path-to-fit-viewbox": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-label="Tiny path in large viewBox — click to fit">
  <rect x="4" y="4" width="152" height="152" rx="14" fill="none" stroke="#334155" stroke-dasharray="5 6"/>
  <path d="M70 80 H96 L86 70 M96 80 L86 90" fill="none" stroke="#22c55e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
};

const scalePathActionBtn = document.getElementById("btn-scale-path-action");
const scalePathIntent =
  (document.body && document.body.getAttribute("data-scale-path-intent")) || "";
const scalePathFactorInput = document.getElementById("scale-path-factor-input");

if (scalePathActionBtn && scalePathIntent) {
  scalePathActionBtn.addEventListener("click", function () {
    const raw = extractSvgMarkup(editor.value) || editor.value.trim();
    if (!raw) {
      setStatus("empty", "Paste an SVG first");
      return;
    }
    let factor = null;
    if (scalePathFactorInput) {
      const n = parseFloat(scalePathFactorInput.value);
      if (Number.isFinite(n) && n > 0) factor = n;
    }
    try {
      const result = scaleSvgPathMarkup(raw, scalePathIntent, factor);
      applyMirroredEditorMarkup(result.markup, result.status);
    } catch (err) {
      setStatus("error", (err && err.message) || "Could not scale path");
    }
  });
}

function splitPathCommands(d) {
  const tokens = tokenizePathData(d);
  const cmds = [];
  let cur = null;
  tokens.forEach(function (tok) {
    if (tok.type === "cmd") {
      if (cur) cmds.push(cur);
      cur = { cmd: tok.value, nums: tok.value.toUpperCase() === "Z" ? [] : [] };
    } else if (cur) cur.nums.push(tok.value);
  });
  if (cur) cmds.push(cur);
  return cmds;
}

function serializePathCommands(cmds, formatFn) {
  formatFn = formatFn || formatPathNumber;
  return cmds
    .map(function (c) {
      const body = c.nums
        .map(function (n, i) {
          return (i ? " " : "") + formatFn(n);
        })
        .join("");
      return c.cmd + body;
    })
    .join("");
}

function pathCommandsToAbsolute(cmds) {
  let x = 0;
  let y = 0;
  let sx = 0;
  let sy = 0;
  return cmds.map(function (c) {
    const u = c.cmd.toUpperCase();
    const abs = c.cmd === u;
    const n = c.nums.slice();
    if (u === "Z") {
      x = sx;
      y = sy;
      return { cmd: "Z", nums: [] };
    }
    if (u === "M" || u === "L" || u === "T") {
      for (let i = 0; i + 1 < n.length; i += 2) {
        if (!abs) {
          n[i] += x;
          n[i + 1] += y;
        }
        x = n[i];
        y = n[i + 1];
        if (u === "M" && i === 0) {
          sx = x;
          sy = y;
        }
      }
    } else if (u === "H") {
      for (let i = 0; i < n.length; i++) {
        if (!abs) n[i] += x;
        x = n[i];
      }
    } else if (u === "V") {
      for (let i = 0; i < n.length; i++) {
        if (!abs) n[i] += y;
        y = n[i];
      }
    } else if (u === "C") {
      for (let i = 0; i + 5 < n.length; i += 6) {
        if (!abs) {
          n[i] += x;
          n[i + 1] += y;
          n[i + 2] += x;
          n[i + 3] += y;
          n[i + 4] += x;
          n[i + 5] += y;
        }
        x = n[i + 4];
        y = n[i + 5];
      }
    } else if (u === "S" || u === "Q") {
      for (let i = 0; i + 3 < n.length; i += 4) {
        if (!abs) {
          n[i] += x;
          n[i + 1] += y;
          n[i + 2] += x;
          n[i + 3] += y;
        }
        x = n[i + 2];
        y = n[i + 3];
      }
    } else if (u === "A") {
      for (let i = 0; i + 6 < n.length; i += 7) {
        if (!abs) {
          n[i + 5] += x;
          n[i + 6] += y;
        }
        x = n[i + 5];
        y = n[i + 6];
      }
    }
    return { cmd: u, nums: n };
  });
}

function pathCommandsToRelative(cmds) {
  const abs = pathCommandsToAbsolute(cmds);
  let x = 0;
  let y = 0;
  let sx = 0;
  let sy = 0;
  return abs.map(function (c, idx) {
    const u = c.cmd;
    const n = c.nums.slice();
    if (u === "Z") {
      x = sx;
      y = sy;
      return { cmd: "z", nums: [] };
    }
    const firstMove = u === "M" && idx === 0;
    if (u === "M" || u === "L" || u === "T") {
      for (let i = 0; i + 1 < n.length; i += 2) {
        const nx = n[i];
        const ny = n[i + 1];
        if (!(firstMove && i === 0)) {
          n[i] = nx - x;
          n[i + 1] = ny - y;
        }
        x = nx;
        y = ny;
        if (u === "M" && i === 0) {
          sx = x;
          sy = y;
        }
      }
    } else if (u === "H") {
      for (let i = 0; i < n.length; i++) {
        const nx = n[i];
        n[i] = nx - x;
        x = nx;
      }
    } else if (u === "V") {
      for (let i = 0; i < n.length; i++) {
        const ny = n[i];
        n[i] = ny - y;
        y = ny;
      }
    } else if (u === "C") {
      for (let i = 0; i + 5 < n.length; i += 6) {
        const nx = n[i + 4];
        const ny = n[i + 5];
        n[i] -= x;
        n[i + 1] -= y;
        n[i + 2] -= x;
        n[i + 3] -= y;
        n[i + 4] -= x;
        n[i + 5] -= y;
        x = nx;
        y = ny;
      }
    } else if (u === "S" || u === "Q") {
      for (let i = 0; i + 3 < n.length; i += 4) {
        const nx = n[i + 2];
        const ny = n[i + 3];
        n[i] -= x;
        n[i + 1] -= y;
        n[i + 2] -= x;
        n[i + 3] -= y;
        x = nx;
        y = ny;
      }
    } else if (u === "A") {
      for (let i = 0; i + 6 < n.length; i += 7) {
        const nx = n[i + 5];
        const ny = n[i + 6];
        n[i + 5] -= x;
        n[i + 6] -= y;
        x = nx;
        y = ny;
      }
    }
    const rel = firstMove ? "M" : u.toLowerCase();
    return { cmd: rel, nums: n };
  });
}

function reverseAbsolutePathCommands(cmds) {
  const abs = pathCommandsToAbsolute(cmds);
  const subpaths = [];
  let cur = [];
  abs.forEach(function (c) {
    if (c.cmd === "M" && cur.length) {
      subpaths.push(cur);
      cur = [c];
    } else cur.push(c);
  });
  if (cur.length) subpaths.push(cur);

  function lastPoint(seg) {
    const n = seg.nums;
    if (seg.cmd === "H") return { x: n[n.length - 1], y: null };
    if (seg.cmd === "V") return { x: null, y: n[n.length - 1] };
    if (!n.length) return { x: null, y: null };
    if (seg.cmd === "A") return { x: n[n.length - 2], y: n[n.length - 1] };
    return { x: n[n.length - 2], y: n[n.length - 1] };
  }

  const out = [];
  subpaths.forEach(function (sub) {
    let closed = false;
    const segs = sub.slice();
    if (segs.length && segs[segs.length - 1].cmd === "Z") {
      closed = true;
      segs.pop();
    }
    if (!segs.length) return;
    const pts = [];
    let cx = segs[0].nums[0];
    let cy = segs[0].nums[1];
    pts.push({ x: cx, y: cy, cmd: segs[0] });
    for (let i = 1; i < segs.length; i++) {
      const lp = lastPoint(segs[i]);
      if (lp.x != null) cx = lp.x;
      if (lp.y != null) cy = lp.y;
      pts.push({ x: cx, y: cy, cmd: segs[i] });
    }
    const end = pts[pts.length - 1];
    out.push({ cmd: "M", nums: [end.x, end.y] });
    for (let i = segs.length - 1; i >= 1; i--) {
      const prev = pts[i - 1];
      const seg = segs[i];
      if (seg.cmd === "L" || seg.cmd === "H" || seg.cmd === "V" || seg.cmd === "T") {
        out.push({ cmd: "L", nums: [prev.x, prev.y] });
      } else if (seg.cmd === "C") {
        const n = seg.nums;
        out.push({ cmd: "C", nums: [n[2], n[3], n[0], n[1], prev.x, prev.y] });
      } else if (seg.cmd === "Q" || seg.cmd === "S") {
        const n = seg.nums;
        out.push({ cmd: seg.cmd, nums: [n[0], n[1], prev.x, prev.y] });
      } else if (seg.cmd === "A") {
        const n = seg.nums.slice();
        n[4] = n[4] ? 0 : 1;
        n[5] = prev.x;
        n[6] = prev.y;
        out.push({ cmd: "A", nums: n });
      } else {
        out.push({ cmd: "L", nums: [prev.x, prev.y] });
      }
    }
    if (closed) out.push({ cmd: "Z", nums: [] });
  });
  return out;
}

function formatPathNumberDigits(n, digits) {
  if (!Number.isFinite(n)) return "0";
  const d = Math.max(0, Math.min(8, digits | 0));
  let s = n.toFixed(d);
  if (d > 0) s = s.replace(/\.?0+$/, "");
  if (s === "-0") s = "0";
  return s || "0";
}

function douglasPeucker(points, epsilon) {
  if (points.length < 3) return points.slice();
  let maxDist = 0;
  let idx = 0;
  const a = points[0];
  const b = points[points.length - 1];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i];
    const dist = Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / len;
    if (dist > maxDist) {
      maxDist = dist;
      idx = i;
    }
  }
  if (maxDist > epsilon) {
    const left = douglasPeucker(points.slice(0, idx + 1), epsilon);
    const right = douglasPeucker(points.slice(idx), epsilon);
    return left.slice(0, -1).concat(right);
  }
  return [a, b];
}

function simplifyPathDataInSvg(svg, tolerance) {
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:absolute;left:-99999px;top:0;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";
  const clone = svg.cloneNode(true);
  host.appendChild(clone);
  document.body.appendChild(host);
  Array.prototype.forEach.call(clone.querySelectorAll("path"), function (path, i) {
    try {
      const len = path.getTotalLength();
      if (!(len > 0)) return;
      const steps = Math.min(360, Math.max(24, Math.ceil(len / 2)));
      const pts = [];
      for (let s = 0; s <= steps; s++) {
        const p = path.getPointAtLength((len * s) / steps);
        pts.push([p.x, p.y]);
      }
      const simple = douglasPeucker(pts, tolerance);
      if (simple.length < 2) return;
      let d = "M" + formatPathNumber(simple[0][0]) + " " + formatPathNumber(simple[0][1]);
      for (let k = 1; k < simple.length; k++) {
        d += "L" + formatPathNumber(simple[k][0]) + " " + formatPathNumber(simple[k][1]);
      }
      const originals = svg.querySelectorAll("path");
      if (originals[i]) originals[i].setAttribute("d", d);
    } catch (err) {
      /* skip */
    }
  });
  document.body.removeChild(host);
}

function removeRedundantPathPoints(d, epsilon) {
  const abs = pathCommandsToAbsolute(splitPathCommands(d));
  const out = [];
  let x = null;
  let y = null;
  abs.forEach(function (c) {
    if (c.cmd === "L" && x != null) {
      const nx = c.nums[c.nums.length - 2];
      const ny = c.nums[c.nums.length - 1];
      if (Math.hypot(nx - x, ny - y) <= epsilon) return;
    }
    out.push(c);
    if (c.nums.length >= 2) {
      x = c.nums[c.nums.length - 2];
      y = c.nums[c.nums.length - 1];
    }
  });
  return serializePathCommands(out);
}

function applyPathEditMarkup(markup, intent, factorOverride) {
  const source = extractSvgMarkup(markup) || String(markup || "").trim();
  if (!source) throw new Error("Paste an SVG first");
  const svg = parseSvg(source);
  const paths = svg.querySelectorAll("path");
  if (!paths.length) throw new Error("No <path> elements found");
  stripRootSvgSizeAttrs(svg);

  let status = "Path updated";
  const simplifyIntents = {
    "simplify-svg-path-data-online": 1,
    "reduce-svg-path-nodes-online": 1,
    "compress-svg-path-data": 1,
    "remove-redundant-svg-path-points": 1,
  };
  const reverseIntents = {
    "reverse-svg-path-direction": 1,
    "change-svg-path-winding-order": 1,
  };
  const roundIntents = {
    "round-svg-path-decimals-online": 1,
    "truncate-svg-path-numbers-online": 1,
  };
  const toRel = {
    "convert-svg-absolute-to-relative-path-commands": 1,
    "change-svg-path-commands-to-lowercase-relative": 1,
  };
  const toAbs = {
    "convert-svg-relative-to-absolute-path-commands": 1,
  };

  if (simplifyIntents[intent]) {
    const tol = factorOverride != null && factorOverride > 0 ? factorOverride : 2;
    if (intent === "remove-redundant-svg-path-points") {
      forEachPathElement(svg, function (path, d) {
        path.setAttribute("d", removeRedundantPathPoints(d, tol));
      });
      status = "Redundant path points removed";
    } else {
      simplifyPathDataInSvg(svg, tol);
      status = "Path nodes reduced (tolerance " + formatPathNumber(tol) + ")";
    }
  } else if (reverseIntents[intent]) {
    forEachPathElement(svg, function (path, d) {
      path.setAttribute("d", serializePathCommands(reverseAbsolutePathCommands(splitPathCommands(d))));
    });
    status = "Path direction reversed";
  } else if (roundIntents[intent]) {
    let digits = 2;
    if (intent === "truncate-svg-path-numbers-online") digits = 1;
    if (factorOverride != null && Number.isFinite(factorOverride) && factorOverride >= 0) {
      digits = Math.round(factorOverride);
    }
    const fmt = function (n) {
      return formatPathNumberDigits(n, digits);
    };
    forEachPathElement(svg, function (path, d) {
      path.setAttribute("d", serializePathCommands(splitPathCommands(d), fmt));
    });
    status = "Path numbers rounded to " + digits + " decimal" + (digits === 1 ? "" : "s");
  } else if (toRel[intent]) {
    forEachPathElement(svg, function (path, d) {
      path.setAttribute("d", serializePathCommands(pathCommandsToRelative(splitPathCommands(d))));
    });
    status = "Path commands converted to relative";
  } else if (toAbs[intent]) {
    forEachPathElement(svg, function (path, d) {
      path.setAttribute("d", serializePathCommands(pathCommandsToAbsolute(splitPathCommands(d))));
    });
    status = "Path commands converted to absolute";
  } else {
    throw new Error("Unknown path tool");
  }

  return {
    markup: formatSvgReadableMarkup(prettySerializeSvg(svg)),
    status: status,
  };
}

const PATH_EDIT_DEFAULT_SVGS = {
  "simplify-svg-path-data-online": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" role="img" aria-label="Noisy polyline — click to simplify">
  <path d="M16 80 L24 78 L32 76 L40 74 L48 70 L56 62 L64 50 L72 44 L80 48 L88 60 L96 70 L104 74 L112 72 L120 66 L128 58 L136 52 L144 54 L152 62 L160 70 L168 74 L176 72 L184 68" fill="none" stroke="#0ea5e9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "reduce-svg-path-nodes-online": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" role="img" aria-label="Many nodes — click to reduce">
  <path d="M12 50 L20 48 L28 47 L36 46 L44 48 L52 54 L60 62 L68 66 L76 64 L84 58 L92 50 L100 46 L108 48 L116 54 L124 60 L132 62 L140 58 L148 50 L156 46 L164 48 L172 52 L180 54" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
</svg>`,
  "compress-svg-path-data": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 120" role="img" aria-label="Verbose path — click to compress">
  <path d="M20 90 L40 40 L70 70 L100 30 L140 80 L160 50" fill="none" stroke="#a855f7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "remove-redundant-svg-path-points": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" role="img" aria-label="Stacked points — click to drop extras">
  <path d="M28 88 L28 88 L60 36 L60.05 36.02 L100 36 L132 88 L132 88" fill="none" stroke="#22c55e" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "reverse-svg-path-direction": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" role="img" aria-label="Chevron — click to reverse direction">
  <path d="M40 28 L116 60 L40 92" fill="none" stroke="#22d3ee" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "change-svg-path-winding-order": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" role="img" aria-label="Closed diamond — click to change winding">
  <path d="M70 18 L122 70 L70 122 L18 70 Z" fill="#38bdf8" fill-rule="evenodd"/>
</svg>`,
  "round-svg-path-decimals-online": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" role="img" aria-label="Long decimals — click to round">
  <path d="M22.4187 88.9021 C40.1256 21.447 79.8801 19.0034 98.5512 61.7743 S141.229 108.6621 142.018 39.441" fill="none" stroke="#0ea5e9" stroke-width="6" stroke-linecap="round"/>
</svg>`,
  "truncate-svg-path-numbers-online": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" role="img" aria-label="Tiny fractions — click to truncate">
  <path d="M18.049 70.812 H70.441 L98.773 32.009 L142.618 84.227" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>
</svg>`,
  "convert-svg-absolute-to-relative-path-commands": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" role="img" aria-label="Absolute commands — click to convert to relative">
  <path d="M24 88 L60 32 L100 70 L136 28" fill="none" stroke="#0ea5e9" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "convert-svg-relative-to-absolute-path-commands": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" role="img" aria-label="Relative commands — click to convert to absolute">
  <path d="m24 88 l36-56 l40 38 l36-42" fill="none" stroke="#22d3ee" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "change-svg-path-commands-to-lowercase-relative": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" role="img" aria-label="Uppercase path — click for lowercase relative">
  <path d="M30 90 C50 20 90 20 110 70 S150 110 140 40" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>
</svg>`,
};

const pathEditActionBtn = document.getElementById("btn-path-edit-action");
const pathEditIntent =
  (document.body && document.body.getAttribute("data-path-edit-intent")) || "";
const pathEditFactorInput = document.getElementById("scale-path-factor-input");

if (pathEditActionBtn && pathEditIntent) {
  pathEditActionBtn.addEventListener("click", function () {
    const raw = extractSvgMarkup(editor.value) || editor.value.trim();
    if (!raw) {
      setStatus("empty", "Paste an SVG first");
      return;
    }
    let factor = null;
    if (pathEditFactorInput) {
      const n = parseFloat(pathEditFactorInput.value);
      if (Number.isFinite(n)) factor = n;
    }
    try {
      const result = applyPathEditMarkup(raw, pathEditIntent, factor);
      applyMirroredEditorMarkup(result.markup, result.status);
    } catch (err) {
      setStatus("error", (err && err.message) || "Could not edit path");
    }
  });
}

function translateSvgPathMarkup(markup, intent, dxOverride, dyOverride) {
  const source = extractSvgMarkup(markup) || String(markup || "").trim();
  if (!source) throw new Error("Paste an SVG first");
  const svg = parseSvg(source);
  const paths = svg.querySelectorAll("path");
  if (!paths.length) throw new Error("No <path> elements found to translate");

  let dx = dxOverride != null && Number.isFinite(dxOverride) ? dxOverride : 24;
  let dy = dyOverride != null && Number.isFinite(dyOverride) ? dyOverride : 16;
  let keepViewBox = false;
  let status = "Path translated";

  if (intent === "translate-svg-path-coordinates-horizontally") {
    dy = 0;
    if (dxOverride == null || !Number.isFinite(dxOverride)) dx = 28;
    status = "Path translated horizontally by " + formatPathNumber(dx);
  } else if (intent === "translate-svg-path-coordinates-vertically") {
    dx = 0;
    if (dyOverride == null || !Number.isFinite(dyOverride)) dy = 28;
    status = "Path translated vertically by " + formatPathNumber(dy);
  } else if (intent === "translate-svg-path-coordinates-without-transform") {
    status = "Path d rewritten (no translate transform)";
  } else if (intent === "translate-svg-path-coordinates-to-origin") {
    const bbox = measurePathsBBox(svg);
    if (!bbox) throw new Error("Could not measure path bounds");
    dx = -bbox.x;
    dy = -bbox.y;
    keepViewBox = false;
    status = "Path moved to origin (0, 0)";
  } else if (intent === "center-svg-path") {
    keepViewBox = true;
    const vb = getSvgViewBoxBox(svg) || { minX: 0, minY: 0, width: 100, height: 100 };
    const bbox = measurePathsBBox(svg);
    if (!bbox) throw new Error("Could not measure path bounds");
    dx = vb.minX + vb.width / 2 - (bbox.x + bbox.width / 2);
    dy = vb.minY + vb.height / 2 - (bbox.y + bbox.height / 2);
    status = "Path centered in viewBox";
  } else if (intent === "translate-svg-path-coordinates") {
    status =
      "Path translated by (" + formatPathNumber(dx) + ", " + formatPathNumber(dy) + ")";
  }

  forEachPathElement(svg, function (path, d) {
    path.setAttribute("d", translatePathData(d, dx, dy));
    if (intent === "translate-svg-path-coordinates-without-transform") {
      const tr = path.getAttribute("transform");
      if (tr && /translate\s*\(/i.test(tr)) {
        const cleaned = tr
          .replace(/translate\s*\([^)]*\)/gi, "")
          .replace(/\s{2,}/g, " ")
          .trim();
        if (cleaned) path.setAttribute("transform", cleaned);
        else path.removeAttribute("transform");
      }
    }
  });

  if (!keepViewBox) {
    try {
      applyContentViewBox(svg, { padRatio: 0.04, padPx: 0 });
    } catch (err) {
      stripRootSvgSizeAttrs(svg);
    }
  } else {
    stripRootSvgSizeAttrs(svg);
  }

  return {
    markup: formatSvgReadableMarkup(prettySerializeSvg(svg)),
    status: status,
    dx: dx,
    dy: dy,
  };
}

const TRANSLATE_PATH_DEFAULT_SVGS = {
  "translate-svg-path-coordinates": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" role="img" aria-label="Offset arrow — click to translate coordinates">
  <path d="M24 60 H88 L70 42 M88 60 L70 78" fill="none" stroke="#0ea5e9" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "translate-svg-path-coordinates-horizontally": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" role="img" aria-label="Left-biased path — click to shift horizontally">
  <path d="M18 50 H70 L54 34 M70 50 L54 66" fill="none" stroke="#22d3ee" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "translate-svg-path-coordinates-vertically": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" role="img" aria-label="Top-biased path — click to shift vertically">
  <path d="M50 22 V74 L34 58 M50 74 L66 58" fill="none" stroke="#a855f7" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "translate-svg-path-coordinates-without-transform": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Path with translate transform — click to bake into d">
  <path transform="translate(8 6)" d="M36 60 L60 36 L84 60 L60 84 Z" fill="none" stroke="#06b6d4" stroke-width="6" stroke-linejoin="round"/>
</svg>`,
  "translate-svg-path-coordinates-to-origin": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 140" role="img" aria-label="Path away from origin — click to move to 0,0">
  <path d="M72 54 H118 L102 38 M118 54 L102 70" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "center-svg-path": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-label="Off-center path — click to center in viewBox">
  <rect x="4" y="4" width="152" height="152" rx="14" fill="none" stroke="#334155" stroke-dasharray="5 6"/>
  <path d="M28 42 H64 L52 30 M64 42 L52 54" fill="none" stroke="#22c55e" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
};

const translatePathActionBtn = document.getElementById("btn-translate-path-action");
const translatePathIntent =
  (document.body && document.body.getAttribute("data-translate-path-intent")) || "";
const translatePathDxInput = document.getElementById("translate-path-dx-input");
const translatePathDyInput = document.getElementById("translate-path-dy-input");
const translatePathOffsetInput = document.getElementById("translate-path-offset-input");

if (translatePathActionBtn && translatePathIntent) {
  translatePathActionBtn.addEventListener("click", function () {
    const raw = extractSvgMarkup(editor.value) || editor.value.trim();
    if (!raw) {
      setStatus("empty", "Paste an SVG first");
      return;
    }
    let dx = null;
    let dy = null;
    if (translatePathOffsetInput) {
      const n = parseFloat(translatePathOffsetInput.value);
      if (Number.isFinite(n)) {
        if (translatePathIntent.indexOf("horizontally") !== -1) dx = n;
        else if (translatePathIntent.indexOf("vertically") !== -1) dy = n;
        else {
          dx = n;
          dy = n;
        }
      }
    }
    if (translatePathDxInput) {
      const n = parseFloat(translatePathDxInput.value);
      if (Number.isFinite(n)) dx = n;
    }
    if (translatePathDyInput) {
      const n = parseFloat(translatePathDyInput.value);
      if (Number.isFinite(n)) dy = n;
    }
    try {
      const result = translateSvgPathMarkup(raw, translatePathIntent, dx, dy);
      applyMirroredEditorMarkup(result.markup, result.status);
    } catch (err) {
      setStatus("error", (err && err.message) || "Could not translate path");
    }
  });
}

const GRADIENT_COLOR_SETS = [
  ["#0ea5e9", "#a855f7"],
  ["#f43f5e", "#f59e0b"],
  ["#22c55e", "#06b6d4", "#3b82f6"],
  ["#f97316", "#ec4899", "#8b5cf6", "#06b6d4"],
  ["#67e8f9", "#38bdf8", "#818cf8"],
  ["#fb7185", "#fda4af", "#fecdd3"],
];

let gradientPaletteIndex = 0;

function nextGradientColors(minStops) {
  minStops = minStops || 2;
  let set = GRADIENT_COLOR_SETS[gradientPaletteIndex % GRADIENT_COLOR_SETS.length];
  gradientPaletteIndex += 1;
  let guard = 0;
  while (set.length < minStops && guard < GRADIENT_COLOR_SETS.length) {
    set = GRADIENT_COLOR_SETS[gradientPaletteIndex % GRADIENT_COLOR_SETS.length];
    gradientPaletteIndex += 1;
    guard += 1;
  }
  if (set.length < minStops) {
    const out = set.slice();
    while (out.length < minStops) out.push(out[out.length - 1]);
    return out;
  }
  return set.slice();
}

function gradientAngleToVector(angleDeg) {
  const rad = ((angleDeg % 360) * Math.PI) / 180;
  const x = Math.cos(rad);
  const y = Math.sin(rad);
  return {
    x1: formatPathNumber(0.5 - x / 2),
    y1: formatPathNumber(0.5 - y / 2),
    x2: formatPathNumber(0.5 + x / 2),
    y2: formatPathNumber(0.5 + y / 2),
  };
}

function ensureSvgDefs(svg) {
  let defs = null;
  Array.prototype.forEach.call(svg.children || [], function (child) {
    if (String(child.tagName || "").toLowerCase() === "defs") defs = child;
  });
  if (!defs) {
    defs = document.createElementNS(SVG_NS, "defs");
    svg.insertBefore(defs, svg.firstChild);
  }
  return defs;
}

function removeGradientArtifacts(svg) {
  const kill = svg.querySelectorAll(
    "#svgeditor-grad, #svgeditor-grad-glow, linearGradient[data-svgeditor-grad], radialGradient[data-svgeditor-grad], filter[data-svgeditor-grad]"
  );
  Array.prototype.forEach.call(kill, function (el) {
    if (el.parentNode) el.parentNode.removeChild(el);
  });
}

function appendGradientStops(grad, colors, withOpacity) {
  colors.forEach(function (color, i) {
    const stop = document.createElementNS(SVG_NS, "stop");
    const offset = colors.length === 1 ? 0 : i / (colors.length - 1);
    stop.setAttribute("offset", formatPathNumber(offset * 100) + "%");
    stop.setAttribute("stop-color", color);
    if (withOpacity) {
      const op = i === 0 ? 1 : i === colors.length - 1 ? 0.15 : 0.55;
      stop.setAttribute("stop-opacity", String(op));
    }
    grad.appendChild(stop);
  });
}

function createEditorGradient(defs, options) {
  options = options || {};
  const id = options.id || "svgeditor-grad";
  const kind = options.kind || "linear";
  const colors = options.colors || ["#0ea5e9", "#a855f7"];
  const angle = options.angle != null ? options.angle : 90;
  const withOpacity = !!options.withOpacity;
  const animated = !!options.animated;

  let grad;
  if (kind === "radial") {
    grad = document.createElementNS(SVG_NS, "radialGradient");
    grad.setAttribute("cx", "50%");
    grad.setAttribute("cy", "50%");
    grad.setAttribute("r", "65%");
    grad.setAttribute("fx", "35%");
    grad.setAttribute("fy", "35%");
  } else {
    grad = document.createElementNS(SVG_NS, "linearGradient");
    const vec = gradientAngleToVector(angle);
    grad.setAttribute("x1", vec.x1);
    grad.setAttribute("y1", vec.y1);
    grad.setAttribute("x2", vec.x2);
    grad.setAttribute("y2", vec.y2);
  }
  grad.setAttribute("id", id);
  grad.setAttribute("data-svgeditor-grad", "1");
  appendGradientStops(grad, colors, withOpacity);

  if (animated) {
    const anim = document.createElementNS(SVG_NS, "animate");
    anim.setAttribute("attributeName", kind === "radial" ? "r" : "x2");
    anim.setAttribute("values", kind === "radial" ? "45%;75%;45%" : "0;1;0");
    anim.setAttribute("dur", "3s");
    anim.setAttribute("repeatCount", "indefinite");
    grad.appendChild(anim);
  }

  defs.appendChild(grad);
  return grad;
}

function paintShapesWithGradient(svg, paint) {
  const tags = "path,rect,circle,ellipse,polygon,polyline,text";
  Array.prototype.forEach.call(svg.querySelectorAll(tags), function (el) {
    const tag = String(el.tagName || "").toLowerCase();
    if (tag === "rect" && el.getAttribute("fill") === "none" && el.getAttribute("stroke")) {
      /* guide frame — leave stroke guides alone unless they are the only shape */
      return;
    }
    el.setAttribute("fill", paint);
    if (tag === "text") {
      el.setAttribute("stroke", "none");
    }
  });
}

function ensureTextSample(svg, options) {
  options = options || {};
  let text = svg.querySelector("text");
  if (!text) {
    Array.prototype.forEach.call(svg.querySelectorAll("path,rect,circle,ellipse,polygon,polyline"), function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    text = document.createElementNS(SVG_NS, "text");
    text.setAttribute("x", "50%");
    text.setAttribute("y", "54%");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-family", "Syne, Segoe UI, sans-serif");
    text.setAttribute("font-size", options.fontSize || "42");
    text.setAttribute("font-weight", "700");
    text.textContent = options.label || "Gradient";
    svg.appendChild(text);
  }
  if (options.neon) {
    text.setAttribute("filter", "url(#svgeditor-grad-glow)");
  } else {
    text.removeAttribute("filter");
  }
  return text;
}

function ensureBackgroundRect(svg) {
  let rect = svg.querySelector("rect[data-svgeditor-bg]");
  if (!rect) {
    const vb = getSvgViewBoxBox(svg) || { minX: 0, minY: 0, width: 320, height: 180 };
    rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("data-svgeditor-bg", "1");
    rect.setAttribute("x", String(vb.minX));
    rect.setAttribute("y", String(vb.minY));
    rect.setAttribute("width", String(vb.width));
    rect.setAttribute("height", String(vb.height));
    rect.setAttribute("rx", "16");
    const defs = svg.querySelector("defs");
    if (defs && defs.nextSibling) svg.insertBefore(rect, defs.nextSibling);
    else svg.insertBefore(rect, svg.firstChild);
  }
  return rect;
}

function ensureNeonFilter(defs) {
  let filter = defs.querySelector("#svgeditor-grad-glow");
  if (filter) return filter;
  filter = document.createElementNS(SVG_NS, "filter");
  filter.setAttribute("id", "svgeditor-grad-glow");
  filter.setAttribute("data-svgeditor-grad", "1");
  filter.setAttribute("x", "-40%");
  filter.setAttribute("y", "-40%");
  filter.setAttribute("width", "180%");
  filter.setAttribute("height", "180%");
  const blur = document.createElementNS(SVG_NS, "feGaussianBlur");
  blur.setAttribute("stdDeviation", "3.2");
  blur.setAttribute("result", "coloredBlur");
  const merge = document.createElementNS(SVG_NS, "feMerge");
  const n1 = document.createElementNS(SVG_NS, "feMergeNode");
  n1.setAttribute("in", "coloredBlur");
  const n2 = document.createElementNS(SVG_NS, "feMergeNode");
  n2.setAttribute("in", "SourceGraphic");
  merge.appendChild(n1);
  merge.appendChild(n2);
  filter.appendChild(blur);
  filter.appendChild(merge);
  defs.appendChild(filter);
  return filter;
}

function gradientCssSnippet(colors, angle, textMode) {
  const stops = colors.join(", ");
  if (textMode) {
    return (
      ".gradient-text {\n" +
      "  background: linear-gradient(" +
      angle +
      "deg, " +
      stops +
      ");\n" +
      "  -webkit-background-clip: text;\n" +
      "  background-clip: text;\n" +
      "  color: transparent;\n" +
      "}"
    );
  }
  return (
    ".gradient-bg {\n" +
    "  background: linear-gradient(" +
    angle +
    "deg, " +
    stops +
    ");\n" +
    "}"
  );
}

const GRADIENT_EDIT_INTENTS = {
  "invert-svg-gradient-colors": 1,
  "invert-svg-gradient-direction": 1,
  "reverse-svg-gradient-stops": 1,
  "extract-colors-from-svg-gradient": 1,
  "svg-gradient-color-picker-from-code": 1,
  "extract-svg-gradient-stops": 1,
  "svg-gradient-fill-transparent-to-color": 1,
  "svg-linear-gradient-fade-to-transparent": 1,
  "svg-gradient-transparent-edges": 1,
  "svg-fade-out-gradient-generator": 1,
  "transparent-to-color-gradient-svg-code": 1,
  "convert-css-linear-gradient-to-svg": 1,
  "transform-css-gradient-to-svg-code": 1,
  "css-to-svg-gradient-generator": 1,
  "export-css-gradient-as-svg": 1,
};

function collectGradientNodes(svg) {
  return svg.querySelectorAll("linearGradient, radialGradient");
}

function collectGradientStops(grad) {
  return Array.prototype.filter.call(grad.children || [], function (el) {
    return String(el.tagName || "").toLowerCase() === "stop";
  });
}

function stopColorOf(stop) {
  return stop.getAttribute("stop-color") || stop.style.stopColor || "#000000";
}

function invertGradientDirection(grad) {
  const tag = String(grad.tagName || "").toLowerCase();
  if (tag === "lineargradient") {
    const x1 = grad.getAttribute("x1") || "0";
    const y1 = grad.getAttribute("y1") || "0";
    const x2 = grad.getAttribute("x2") || "1";
    const y2 = grad.getAttribute("y2") || "0";
    grad.setAttribute("x1", x2);
    grad.setAttribute("y1", y2);
    grad.setAttribute("x2", x1);
    grad.setAttribute("y2", y1);
  } else {
    const fx = grad.getAttribute("fx") || grad.getAttribute("cx") || "50%";
    const fy = grad.getAttribute("fy") || grad.getAttribute("cy") || "50%";
    const cx = grad.getAttribute("cx") || "50%";
    const cy = grad.getAttribute("cy") || "50%";
    grad.setAttribute("fx", cx);
    grad.setAttribute("fy", cy);
    grad.setAttribute("cx", fx);
    grad.setAttribute("cy", fy);
  }
  const xf = grad.getAttribute("gradientTransform");
  if (xf && String(xf).trim()) {
    grad.setAttribute("gradientTransform", String(xf).trim() + " rotate(180)");
  }
}

function invertGradientColorOrder(grad) {
  const stops = collectGradientStops(grad);
  if (stops.length < 2) return;
  const colors = stops.map(stopColorOf);
  colors.reverse().forEach(function (color, i) {
    stops[i].setAttribute("stop-color", color);
  });
}

function reverseGradientStopElements(grad) {
  const stops = collectGradientStops(grad);
  if (stops.length < 2) return;
  const offsets = stops.map(function (stop) {
    return stop.getAttribute("offset");
  });
  stops
    .slice()
    .reverse()
    .forEach(function (stop, i) {
      if (offsets[i] != null) stop.setAttribute("offset", offsets[i]);
      else stop.removeAttribute("offset");
      grad.appendChild(stop);
    });
}

function listGradientPalette(svg) {
  const colors = [];
  const rows = [];
  Array.prototype.forEach.call(collectGradientNodes(svg), function (grad) {
    collectGradientStops(grad).forEach(function (stop) {
      const color = stopColorOf(stop);
      const opacity = stop.getAttribute("stop-opacity");
      const offset = stop.getAttribute("offset") || "";
      rows.push({ color: color, opacity: opacity, offset: offset, id: grad.getAttribute("id") || "" });
      if (colors.indexOf(color) === -1) colors.push(color);
    });
  });
  return { colors: colors, rows: rows };
}

function ensureGradientLegend(svg, colors) {
  let g = svg.querySelector("[data-svgeditor-swatches]");
  if (g && g.parentNode) g.parentNode.removeChild(g);
  if (!colors.length) return;
  const vb = getSvgViewBoxBox(svg) || { minX: 0, minY: 0, width: 220, height: 140 };
  g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("data-svgeditor-swatches", "1");
  colors.forEach(function (color, i) {
    const c = document.createElementNS(SVG_NS, "circle");
    c.setAttribute("cx", String(vb.minX + 16 + i * 22));
    c.setAttribute("cy", String(vb.minY + vb.height - 14));
    c.setAttribute("r", "8");
    c.setAttribute("fill", color);
    c.setAttribute("stroke", "#0f172a");
    c.setAttribute("stroke-width", "1");
    g.appendChild(c);
  });
  svg.appendChild(g);
}

function applyTransparentGradientPreset(svg, intent) {
  removeGradientArtifacts(svg);
  const defs = ensureSvgDefs(svg);
  const color = nextGradientColors(2)[0] || "#0ea5e9";
  const grad = document.createElementNS(SVG_NS, "linearGradient");
  grad.setAttribute("id", "svgeditor-grad");
  grad.setAttribute("data-svgeditor-grad", "1");
  grad.setAttribute("x1", "0");
  grad.setAttribute("y1", "0");
  grad.setAttribute("x2", "1");
  grad.setAttribute("y2", "0");
  function addStop(offset, col, op) {
    const stop = document.createElementNS(SVG_NS, "stop");
    stop.setAttribute("offset", offset);
    stop.setAttribute("stop-color", col);
    stop.setAttribute("stop-opacity", String(op));
    grad.appendChild(stop);
  }
  if (intent === "svg-gradient-transparent-edges") {
    addStop("0%", color, 0);
    addStop("50%", color, 1);
    addStop("100%", color, 0);
  } else if (
    intent === "svg-linear-gradient-fade-to-transparent" ||
    intent === "svg-fade-out-gradient-generator"
  ) {
    addStop("0%", color, 1);
    if (intent === "svg-fade-out-gradient-generator") addStop("55%", color, 0.45);
    addStop("100%", color, 0);
  } else {
    addStop("0%", color, 0);
    addStop("100%", color, 1);
  }
  defs.appendChild(grad);
  paintShapesWithGradient(svg, "url(#svgeditor-grad)");
  return color;
}

function parseCssLinearGradient(text) {
  const src = String(text || "");
  const m = src.match(/linear-gradient\s*\(([\s\S]*?)\)/i);
  if (!m) return null;
  const inner = m[1];
  const parts = [];
  let buf = "";
  let depth = 0;
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (ch === "(") depth += 1;
    if (ch === ")") depth -= 1;
    if (ch === "," && depth === 0) {
      parts.push(buf.trim());
      buf = "";
    } else buf += ch;
  }
  if (buf.trim()) parts.push(buf.trim());
  if (!parts.length) return null;
  let angle = 90;
  let start = 0;
  const first = parts[0];
  const deg = first.match(/^(-?[0-9.]+)\s*deg$/i);
  const toDir = first.match(/^to\s+(left|right|top|bottom)(?:\s+(left|right|top|bottom))?/i);
  if (deg) {
    angle = parseFloat(deg[1]);
    start = 1;
  } else if (toDir) {
    const a = toDir[1].toLowerCase();
    const b = (toDir[2] || "").toLowerCase();
    if (a === "right") angle = 90;
    else if (a === "left") angle = 270;
    else if (a === "bottom") angle = 180;
    else if (a === "top") angle = 0;
    if (b === "right") angle = a === "top" ? 45 : 135;
    if (b === "left") angle = a === "top" ? 315 : 225;
    start = 1;
  }
  const colors = [];
  for (let i = start; i < parts.length; i++) {
    const token = parts[i].replace(/\s+[0-9.]+%?\s*$/, "").trim();
    if (token) colors.push(token);
  }
  if (colors.length < 2) return null;
  return { angle: angle, colors: colors };
}

function svgFromCssGradient(parsed) {
  const vec = gradientAngleToVector(parsed.angle);
  const stops = parsed.colors
    .map(function (color, i) {
      const off = parsed.colors.length === 1 ? 0 : (i / (parsed.colors.length - 1)) * 100;
      return '    <stop offset="' + formatPathNumber(off) + '%" stop-color="' + color + '"/>';
    })
    .join("\n");
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="CSS linear gradient as SVG">\n' +
    "  <defs>\n" +
    '    <linearGradient id="svgeditor-grad" x1="' +
    vec.x1 +
    '" y1="' +
    vec.y1 +
    '" x2="' +
    vec.x2 +
    '" y2="' +
    vec.y2 +
    '">\n' +
    stops +
    "\n    </linearGradient>\n" +
    "  </defs>\n" +
    '  <rect x="12" y="18" width="216" height="84" rx="16" fill="url(#svgeditor-grad)"/>\n' +
    "</svg>"
  );
}

function convertCssGradientToSvg(markup, intent) {
  const text = String(markup || "");
  const extracted = extractSvgMarkup(text);
  let parsed = parseCssLinearGradient(text);
  if (!parsed && extracted) {
    try {
      const svg = parseSvg(extracted);
      const styleText = Array.prototype.map
        .call(svg.querySelectorAll("style"), function (el) {
          return el.textContent || "";
        })
        .join("\n");
      parsed = parseCssLinearGradient(styleText) || parseCssLinearGradient(extracted);
    } catch (err) {
      parsed = parseCssLinearGradient(text);
    }
  }
  if (!parsed) throw new Error("Paste a CSS linear-gradient() to convert");
  const out = formatSvgReadableMarkup(svgFromCssGradient(parsed));
  const snippet =
    intent === "transform-css-gradient-to-svg-code" || intent === "export-css-gradient-as-svg"
      ? out
      : gradientCssSnippet(parsed.colors, parsed.angle, false);
  return {
    markup: out,
    status: "CSS linear-gradient converted to SVG",
    snippet: snippet,
  };
}

function applyGradientEditMarkup(markup, intent) {
  if (
    intent === "convert-css-linear-gradient-to-svg" ||
    intent === "transform-css-gradient-to-svg-code" ||
    intent === "css-to-svg-gradient-generator" ||
    intent === "export-css-gradient-as-svg"
  ) {
    return convertCssGradientToSvg(markup, intent);
  }

  const source = extractSvgMarkup(markup) || String(markup || "").trim();
  if (!source) throw new Error("Paste an SVG first");
  const svg = parseSvg(source);
  stripRootSvgSizeAttrs(svg);

  if (
    intent === "svg-gradient-fill-transparent-to-color" ||
    intent === "svg-linear-gradient-fade-to-transparent" ||
    intent === "svg-gradient-transparent-edges" ||
    intent === "svg-fade-out-gradient-generator" ||
    intent === "transparent-to-color-gradient-svg-code"
  ) {
    const color = applyTransparentGradientPreset(svg, intent);
    const outFade = formatSvgReadableMarkup(prettySerializeSvg(svg));
    return {
      markup: outFade,
      status: "Transparent gradient applied",
      snippet:
        intent === "transparent-to-color-gradient-svg-code"
          ? gradientCssSnippet(["transparent", color], 90, false)
          : "",
    };
  }

  const grads = collectGradientNodes(svg);
  if (!grads.length) throw new Error("No SVG gradient found");

  if (intent === "invert-svg-gradient-colors") {
    Array.prototype.forEach.call(grads, invertGradientColorOrder);
  } else if (intent === "invert-svg-gradient-direction") {
    Array.prototype.forEach.call(grads, invertGradientDirection);
  } else if (intent === "reverse-svg-gradient-stops") {
    Array.prototype.forEach.call(grads, reverseGradientStopElements);
  }

  const palette = listGradientPalette(svg);
  if (
    intent === "extract-colors-from-svg-gradient" ||
    intent === "svg-gradient-color-picker-from-code" ||
    intent === "extract-svg-gradient-stops"
  ) {
    ensureGradientLegend(svg, palette.colors);
  }

  const out = formatSvgReadableMarkup(prettySerializeSvg(svg));
  let snippet = "";
  let status = "Gradient updated";
  if (intent === "invert-svg-gradient-colors") status = "Gradient color order inverted";
  if (intent === "invert-svg-gradient-direction") status = "Gradient direction inverted";
  if (intent === "reverse-svg-gradient-stops") status = "Gradient stop elements reversed";
  if (
    intent === "extract-colors-from-svg-gradient" ||
    intent === "svg-gradient-color-picker-from-code"
  ) {
    snippet = palette.colors.join("\n");
    status = "Extracted " + palette.colors.length + " gradient colors";
  }
  if (intent === "extract-svg-gradient-stops") {
    snippet = palette.rows
      .map(function (row) {
        return (
          (row.offset || "0") +
          " " +
          row.color +
          (row.opacity != null ? " / " + row.opacity : "") +
          (row.id ? " #" + row.id : "")
        );
      })
      .join("\n");
    status = "Parsed " + palette.rows.length + " gradient stops";
  }

  return { markup: out, status: status, snippet: snippet };
}

function applySvgGradientMarkup(markup, intent, angleOverride) {
  if (GRADIENT_EDIT_INTENTS[intent]) {
    return applyGradientEditMarkup(markup, intent);
  }
  const source = extractSvgMarkup(markup) || String(markup || "").trim();
  if (!source) throw new Error("Paste an SVG first");
  const svg = parseSvg(source);
  stripRootSvgSizeAttrs(svg);

  const isText =
    intent.indexOf("svg-text-") === 0 ||
    intent === "animated-svg-text-gradient" ||
    intent === "neon-svg-text-gradient" ||
    intent === "transparent-svg-text-gradient" ||
    intent === "custom-color-svg-text-gradient";
  const isRadial =
    intent.indexOf("radial") !== -1;
  const isMulti =
    intent.indexOf("multi-color") !== -1 || intent.indexOf("custom-multi-color") !== -1;
  const withOpacity =
    intent === "svg-gradient-with-opacity" || intent === "transparent-svg-text-gradient";
  const animated = intent === "animated-svg-text-gradient";
  const neon = intent === "neon-svg-text-gradient";
  const isBg = intent === "multi-color-svg-background-gradient-generator";
  const minStops = isMulti ? 3 : 2;
  const colors = nextGradientColors(minStops);
  let angle = angleOverride != null && Number.isFinite(angleOverride) ? angleOverride : 90;
  if (intent === "svg-gradient-angle-generator") {
    if (angleOverride == null || !Number.isFinite(angleOverride)) {
      angle = [0, 45, 90, 135, 180][gradientPaletteIndex % 5];
    }
  }

  removeGradientArtifacts(svg);
  const defs = ensureSvgDefs(svg);
  if (neon) ensureNeonFilter(defs);

  createEditorGradient(defs, {
    kind: isRadial ? "radial" : "linear",
    colors: colors,
    angle: angle,
    withOpacity: withOpacity,
    animated: animated,
  });

  if (isText) {
    ensureTextSample(svg, {
      neon: neon,
      label: neon ? "Neon" : animated ? "Motion" : "Gradient",
      fontSize: "48",
    });
    paintShapesWithGradient(svg, "url(#svgeditor-grad)");
  } else if (isBg) {
    const rect = ensureBackgroundRect(svg);
    rect.setAttribute("fill", "url(#svgeditor-grad)");
  } else {
    paintShapesWithGradient(svg, "url(#svgeditor-grad)");
  }

  const out = formatSvgReadableMarkup(prettySerializeSvg(svg));
  let status = isRadial
    ? "Radial gradient applied"
    : "Linear gradient applied (" + formatPathNumber(angle) + "°)";
  if (withOpacity) status = "Gradient with opacity applied";
  if (animated) status = "Animated text gradient applied";
  if (neon) status = "Neon text gradient applied";
  if (isMulti) status = "Multi-color gradient applied (" + colors.length + " stops)";

  let snippet = "";
  if (
    intent === "svg-linear-gradient-code-generator" ||
    intent === "svg-text-gradient-copy-css" ||
    intent === "svg-text-gradient-for-developers" ||
    intent === "svg-text-gradient-for-web-design"
  ) {
    snippet = gradientCssSnippet(colors, angle, isText || intent.indexOf("text") !== -1);
  }

  return {
    markup: out,
    status: status,
    colors: colors,
    angle: angle,
    snippet: snippet,
  };
}

const GRADIENT_DEFAULT_SVGS = {
  "svg-gradient-generator": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140" role="img" aria-label="Shape ready for SVG gradient">
  <path d="M24 110 V40 H70 C98 40 98 88 70 88 H48 V110 Z" fill="#0ea5e9"/>
  <circle cx="148" cy="70" r="42" fill="#38bdf8"/>
</svg>`,
  "svg-linear-gradient-generator": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120" role="img" aria-label="Rounded rect for linear gradient">
  <rect x="16" y="24" width="188" height="72" rx="18" fill="#0ea5e9"/>
</svg>`,
  "svg-linear-gradient-code-generator": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120" role="img" aria-label="Linear gradient code sample">
  <rect x="16" y="24" width="188" height="72" rx="18" fill="#22d3ee"/>
</svg>`,
  "svg-gradient-generator-from-colors": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140" role="img" aria-label="Cycle gradient colors">
  <polygon points="100,18 178,122 22,122" fill="#a855f7"/>
</svg>`,
  "svg-gradient-angle-generator": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120" role="img" aria-label="Rotate gradient angle">
  <rect x="20" y="28" width="180" height="64" rx="12" fill="#0ea5e9"/>
</svg>`,
  "svg-gradient-with-opacity": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140" role="img" aria-label="Gradient with opacity stops">
  <ellipse cx="100" cy="70" rx="78" ry="48" fill="#38bdf8"/>
</svg>`,
  "multi-color-svg-gradient-generator": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="Multi-color SVG gradient">
  <rect x="12" y="20" width="216" height="80" rx="16" fill="#0ea5e9"/>
</svg>`,
  "multi-color-svg-linear-gradient-generator": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="Multi-color linear gradient">
  <path d="M20 90 L70 30 H170 L220 90 Z" fill="#22c55e"/>
</svg>`,
  "multi-color-svg-radial-gradient-generator": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" role="img" aria-label="Multi-color radial gradient">
  <circle cx="90" cy="90" r="70" fill="#a855f7"/>
</svg>`,
  "custom-multi-color-svg-gradient-generator": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="Custom multi-color gradient">
  <rect x="16" y="24" width="208" height="72" rx="36" fill="#f59e0b"/>
</svg>`,
  "multi-color-svg-background-gradient-generator": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" role="img" aria-label="Background gradient frame">
  <rect data-svgeditor-bg="1" x="0" y="0" width="320" height="180" rx="20" fill="#0f172a"/>
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" fill="#e2e8f0" font-family="Syne, Segoe UI, sans-serif" font-size="28" font-weight="700">Background</text>
</svg>`,
  "svg-text-gradient-generator": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" role="img" aria-label="SVG text gradient sample">
  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-family="Syne, Segoe UI, sans-serif" font-size="48" font-weight="700" fill="#0ea5e9">Gradient</text>
</svg>`,
  "svg-text-gradient-for-developers": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" role="img" aria-label="Developer text gradient">
  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-family="IBM Plex Mono, monospace" font-size="40" font-weight="700" fill="#22d3ee">&lt;SVG/&gt;</text>
</svg>`,
  "svg-text-linear-gradient": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" role="img" aria-label="Text with linear gradient">
  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-family="Syne, Segoe UI, sans-serif" font-size="46" font-weight="700" fill="#38bdf8">Linear</text>
</svg>`,
  "svg-text-radial-gradient": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" role="img" aria-label="Text with radial gradient">
  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-family="Syne, Segoe UI, sans-serif" font-size="46" font-weight="700" fill="#a855f7">Radial</text>
</svg>`,
  "animated-svg-text-gradient": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" role="img" aria-label="Animated text gradient">
  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-family="Syne, Segoe UI, sans-serif" font-size="46" font-weight="700" fill="#f43f5e">Motion</text>
</svg>`,
  "neon-svg-text-gradient": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" role="img" aria-label="Neon text gradient">
  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-family="Syne, Segoe UI, sans-serif" font-size="52" font-weight="700" fill="#67e8f9">Neon</text>
</svg>`,
  "transparent-svg-text-gradient": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" role="img" aria-label="Transparent text gradient">
  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-family="Syne, Segoe UI, sans-serif" font-size="44" font-weight="700" fill="#94a3b8">Fade</text>
</svg>`,
  "custom-color-svg-text-gradient": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" role="img" aria-label="Custom color text gradient">
  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-family="Syne, Segoe UI, sans-serif" font-size="44" font-weight="700" fill="#f59e0b">Custom</text>
</svg>`,
  "svg-text-gradient-copy-css": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" role="img" aria-label="Copy CSS text gradient">
  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-family="Syne, Segoe UI, sans-serif" font-size="44" font-weight="700" fill="#0ea5e9">Copy CSS</text>
</svg>`,
  "svg-text-gradient-export-svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" role="img" aria-label="Export text gradient SVG">
  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-family="Syne, Segoe UI, sans-serif" font-size="42" font-weight="700" fill="#22c55e">Export</text>
</svg>`,
  "svg-text-gradient-for-web-design": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 120" role="img" aria-label="Web design text gradient">
  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-family="Syne, Segoe UI, sans-serif" font-size="40" font-weight="700" fill="#ec4899">Web Design</text>
</svg>`,
  "invert-svg-gradient-colors": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="Three-stop gradient — click to invert color order">
  <defs>
    <linearGradient id="warm" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect x="12" y="20" width="216" height="80" rx="16" fill="url(#warm)"/>
</svg>`,
  "invert-svg-gradient-direction": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120" role="img" aria-label="Left-to-right gradient — click to invert direction">
  <defs>
    <linearGradient id="ltr" x1="0" y1="0.5" x2="1" y2="0.5">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>
  <rect x="14" y="22" width="192" height="76" rx="18" fill="url(#ltr)"/>
</svg>`,
  "reverse-svg-gradient-stops": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="Uneven stops — click to reverse stop order">
  <defs>
    <linearGradient id="uneven" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="28%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#fb7185"/>
    </linearGradient>
  </defs>
  <rect x="12" y="20" width="216" height="80" rx="16" fill="url(#uneven)"/>
</svg>`,
  "extract-colors-from-svg-gradient": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="Gradient palette — click to extract colors">
  <defs>
    <linearGradient id="palette" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="50%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#f43f5e"/>
    </linearGradient>
  </defs>
  <rect x="12" y="20" width="216" height="80" rx="14" fill="url(#palette)"/>
</svg>`,
  "svg-gradient-color-picker-from-code": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="Gradient code — click to pick colors">
  <defs>
    <linearGradient id="pick" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#67e8f9"/>
      <stop offset="50%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <path d="M20 96 L70 28 H170 L220 96 Z" fill="url(#pick)"/>
</svg>`,
  "extract-svg-gradient-stops": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="Four stops — click to extract stop list">
  <defs>
    <linearGradient id="four" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="35%" stop-color="#eab308"/>
      <stop offset="68%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#0ea5e9"/>
    </linearGradient>
  </defs>
  <rect x="12" y="20" width="216" height="80" rx="10" fill="url(#four)"/>
</svg>`,
  "svg-gradient-fill-transparent-to-color": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120" role="img" aria-label="Solid bar — click for transparent-to-color fill">
  <rect x="16" y="24" width="188" height="72" rx="14" fill="#0ea5e9"/>
</svg>`,
  "svg-linear-gradient-fade-to-transparent": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120" role="img" aria-label="Solid bar — click to fade to transparent">
  <rect x="16" y="24" width="188" height="72" rx="14" fill="#a855f7"/>
</svg>`,
  "svg-gradient-transparent-edges": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120" role="img" aria-label="Solid bar — click for transparent edges">
  <rect x="16" y="24" width="188" height="72" rx="14" fill="#f43f5e"/>
</svg>`,
  "svg-fade-out-gradient-generator": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120" role="img" aria-label="Solid bar — click to generate a fade-out">
  <rect x="16" y="24" width="188" height="72" rx="14" fill="#22c55e"/>
</svg>`,
  "transparent-to-color-gradient-svg-code": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120" role="img" aria-label="Solid bar — click for transparent-to-color code">
  <rect x="16" y="24" width="188" height="72" rx="14" fill="#38bdf8"/>
</svg>`,
  "convert-css-linear-gradient-to-svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="CSS gradient in style — click to convert">
  <style>rect{fill:url(#css-src)}</style>
  <defs>
    <linearGradient id="css-src" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
  </defs>
  <rect x="12" y="18" width="216" height="84" rx="16" fill="#334155"/>
</svg>
<!-- linear-gradient(90deg, #f43f5e, #8b5cf6, #22d3ee) -->`,
  "transform-css-gradient-to-svg-code": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="Transform CSS gradient sample">
  <rect x="12" y="18" width="216" height="84" rx="16" fill="#0f172a"/>
</svg>
<!-- linear-gradient(to right, #f59e0b, #ec4899) -->`,
  "css-to-svg-gradient-generator": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="CSS to SVG generator sample">
  <rect x="12" y="18" width="216" height="84" rx="16" fill="#334155"/>
</svg>
<!-- linear-gradient(45deg, #22c55e, #0ea5e9, #a855f7) -->`,
  "export-css-gradient-as-svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="Export CSS gradient as SVG sample">
  <rect x="12" y="18" width="216" height="84" rx="16" fill="#1e3a5f"/>
</svg>
<!-- linear-gradient(180deg, #67e8f9, #0284c7) -->`,
};

const gradientActionBtn = document.getElementById("btn-gradient-action");
const gradientIntent =
  (document.body && document.body.getAttribute("data-gradient-intent")) || "";
const gradientAngleInput = document.getElementById("gradient-angle-input");

if (gradientActionBtn && gradientIntent) {
  gradientActionBtn.addEventListener("click", function () {
    const raw =
      GRADIENT_EDIT_INTENTS[gradientIntent] && /css/.test(gradientIntent)
        ? editor.value.trim()
        : extractSvgMarkup(editor.value) || editor.value.trim();
    if (!raw) {
      setStatus("empty", "Paste an SVG first");
      return;
    }
    let angle = null;
    if (gradientAngleInput) {
      const n = parseFloat(gradientAngleInput.value);
      if (Number.isFinite(n)) angle = n;
    }
    try {
      const result = applySvgGradientMarkup(raw, gradientIntent, angle);
      applyMirroredEditorMarkup(result.markup, result.status);
      if (result.snippet) {
        copyTextToClipboard(result.snippet)
          .then(function () {
            flashCopyButton(gradientActionBtn, "Copied");
            setStatus("ok", result.status + " — snippet copied");
          })
          .catch(function () {
            setStatus("ok", result.status);
          });
      }
    } catch (err) {
      setStatus("error", (err && err.message) || "Could not apply gradient");
    }
  });
}

function stripSvgCommentsFromMarkup(markup) {
  return String(markup || "").replace(/<!--[\s\S]*?-->/g, "");
}

function removeSvgCommentNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT);
  const dead = [];
  while (walker.nextNode()) dead.push(walker.currentNode);
  dead.forEach(function (node) {
    if (node.parentNode) node.parentNode.removeChild(node);
  });
}

function isEditorJunkAttrName(name) {
  const lower = String(name || "").toLowerCase();
  if (
    lower.indexOf("inkscape:") === 0 ||
    lower.indexOf("sodipodi:") === 0 ||
    lower.indexOf("sketch:") === 0 ||
    lower.indexOf("xmlns:inkscape") === 0 ||
    lower.indexOf("xmlns:sodipodi") === 0 ||
    lower.indexOf("xmlns:sketch") === 0 ||
    lower.indexOf("xmlns:i") === 0 ||
    lower.indexOf("xmlns:serif") === 0 ||
    lower.indexOf("serif:") === 0
  ) {
    return true;
  }
  return (
    lower === "data-name" ||
    lower === "enable-background" ||
    lower === "data-sketch-source"
  );
}

function stripSvgMetadataAndEditorJunk(svg) {
  const killTags = svg.querySelectorAll("metadata, namedview, generator");
  Array.from(killTags).forEach(function (el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  });
  // Namespaced editor nodes (Inkscape / Sodipodi) — match by localName.
  Array.from(svg.querySelectorAll("*")).forEach(function (el) {
    const local = String(el.localName || "").toLowerCase();
    if (local === "namedview" || local === "metadata" || local === "generator") {
      if (el.parentNode) el.parentNode.removeChild(el);
    }
  });

  const nodes = [svg].concat(Array.from(svg.querySelectorAll("*")));
  nodes.forEach(function (el) {
    if (!el || !el.attributes) return;
    Array.from(el.attributes).forEach(function (attr) {
      if (isEditorJunkAttrName(attr.name)) {
        el.removeAttribute(attr.name);
      }
    });
  });
}

function addSvgIdRefsFromValue(refs, value) {
  if (!value) return;
  const text = String(value);
  const urlRe = /url\(\s*['"]?#([^)'"\s]+)['"]?\s*\)/gi;
  let match;
  while ((match = urlRe.exec(text))) {
    refs.add(match[1]);
  }
  const hashRe = /#([A-Za-z_][\w:.-]*)/g;
  while ((match = hashRe.exec(text))) {
    // Avoid treating hex colors like #67e8f9 as ids (no letters-only short hex ambiguity —
    // SVG ids rarely look like 3/6/8 hex; skip pure hex tokens).
    const token = match[1];
    if (/^[0-9a-fA-F]{3,8}$/.test(token)) continue;
    refs.add(token);
  }
}

function collectSvgIdReferences(svg) {
  const refs = new Set();
  function addTokens(value) {
    String(value || "")
      .trim()
      .split(/\s+/)
      .forEach(function (part) {
        if (!part) return;
        if (part.charAt(0) === "#") refs.add(part.slice(1));
        else refs.add(part);
      });
  }

  Array.from(svg.querySelectorAll("*")).forEach(function (el) {
    Array.from(el.attributes || []).forEach(function (attr) {
      const key = String(attr.name || "").toLowerCase();
      const val = attr.value;
      addSvgIdRefsFromValue(refs, val);
      if (
        key === "href" ||
        key === "xlink:href" ||
        key.slice(-5) === ":href"
      ) {
        const trimmed = String(val || "").trim();
        if (trimmed.charAt(0) === "#") refs.add(trimmed.slice(1).split(/\s/)[0]);
      }
      if (
        key === "aria-labelledby" ||
        key === "aria-describedby" ||
        key === "aria-owns" ||
        key === "aria-controls"
      ) {
        addTokens(val);
      }
    });
  });

  Array.from(svg.querySelectorAll("style")).forEach(function (styleEl) {
    addSvgIdRefsFromValue(refs, styleEl.textContent || "");
  });

  return refs;
}

function removeUnusedSvgIds(svg, options) {
  options = options || {};
  const removeOrphanDefs = options.removeOrphanDefs === true;
  let guard = 0;
  while (guard < 8) {
    guard += 1;
    const refs = collectSvgIdReferences(svg);
    let changed = false;
    Array.from(svg.querySelectorAll("[id]")).forEach(function (el) {
      const id = el.getAttribute("id");
      if (!id || refs.has(id)) return;
      if (
        removeOrphanDefs &&
        el.parentNode &&
        String(el.parentNode.localName || "").toLowerCase() === "defs"
      ) {
        el.parentNode.removeChild(el);
      } else {
        el.removeAttribute("id");
      }
      changed = true;
    });
    if (!changed) break;
  }
}

function removeEmptySvgContainers(svg) {
  let guard = 0;
  while (guard < 8) {
    guard += 1;
    let changed = false;
    Array.from(svg.querySelectorAll("defs, g")).forEach(function (el) {
      if (!el.childNodes || el.childNodes.length) return;
      // Keep <g> that still carries meaningful attrs (transform/fill) — only drop empty shells.
      if (String(el.localName || "").toLowerCase() === "g") {
        const meaningful = Array.from(el.attributes || []).some(function (attr) {
          const n = String(attr.name || "").toLowerCase();
          return n !== "id" && n !== "class";
        });
        if (meaningful) return;
      }
      if (el.parentNode) {
        el.parentNode.removeChild(el);
        changed = true;
      }
    });
    if (!changed) break;
  }
}

function compactSvgMarkup(markup) {
  return String(markup || "")
    .replace(/>\s*</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Drop leftover blank lines from removed comments/metadata text nodes. */
function stripSvgWhitespaceTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const dead = [];
  while (walker.nextNode()) {
    if (!/\S/.test(walker.currentNode.nodeValue || "")) {
      dead.push(walker.currentNode);
    }
  }
  dead.forEach(function (node) {
    if (node.parentNode) node.parentNode.removeChild(node);
  });
}

/** One element per line, no blank lines — readable without export fluff. */
function formatSvgReadableMarkup(markup) {
  return String(markup || "")
    .replace(/\r\n/g, "\n")
    .replace(/>\s*</g, ">" + "\n" + "<")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function formatByteCount(n) {
  if (n < 1024) return n + " B";
  return Math.round((n / 1024) * 10) / 10 + " KB";
}

function updateCleanSizeStat(beforeLen, afterLen) {
  const el = document.getElementById("clean-size-stat");
  if (!el) return;
  const saved = Math.max(0, beforeLen - afterLen);
  const pct = beforeLen > 0 ? Math.round((saved / beforeLen) * 100) : 0;
  el.hidden = false;
  el.replaceChildren();
  const before = document.createElement("span");
  before.textContent = formatByteCount(beforeLen);
  const arrow = document.createElement("span");
  arrow.className = "clean-size-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "→";
  const after = document.createElement("span");
  after.textContent = formatByteCount(afterLen);
  const pctEl = document.createElement("span");
  pctEl.className = "clean-size-pct";
  pctEl.textContent = saved ? "(−" + pct + "%)" : "(0%)";
  el.append(before, arrow, after, pctEl);
  el.setAttribute(
    "title",
    "Size before → after cleaning" + (saved ? " (−" + pct + "%)" : "")
  );
}

function cleanSvgMarkup(markup, intent) {
  let source = extractSvgMarkup(markup) || String(markup || "").trim();
  if (!source) throw new Error("Paste an SVG first");

  const beforeLen = source.length;
  const stripComments =
    intent === "remove-comments-from-svg" ||
    intent === "clean-svg-file" ||
    intent === "reduce-svg-file-size" ||
    intent === "optimize-svg-file";
  const stripMeta =
    intent === "strip-svg-metadata" ||
    intent === "clean-svg-file" ||
    intent === "reduce-svg-file-size" ||
    intent === "optimize-svg-file";
  const stripIds =
    intent === "remove-unused-ids-from-svg" ||
    intent === "reduce-svg-file-size" ||
    intent === "optimize-svg-file";
  const deepClean =
    intent === "clean-svg-file" ||
    intent === "reduce-svg-file-size" ||
    intent === "optimize-svg-file";
  const reduceSize =
    intent === "reduce-svg-file-size" || intent === "optimize-svg-file";

  if (stripComments) {
    source = stripSvgCommentsFromMarkup(source);
  }

  const svg = parseSvg(source);
  if (stripComments) removeSvgCommentNodes(svg);
  if (stripMeta) stripSvgMetadataAndEditorJunk(svg);
  if (stripIds) {
    removeUnusedSvgIds(svg, {
      removeOrphanDefs: reduceSize || intent === "remove-unused-ids-from-svg",
    });
  }
  if (deepClean || reduceSize) removeEmptySvgContainers(svg);
  if (reduceSize && svg.getAttribute("viewBox")) {
    stripRootSvgSizeAttrs(svg);
  }

  stripSvgWhitespaceTextNodes(svg);

  let out = prettySerializeSvg(svg);
  if (reduceSize) out = compactSvgMarkup(out);
  else out = formatSvgReadableMarkup(out);

  const afterLen = out.length;
  const saved = Math.max(0, beforeLen - afterLen);
  const pct = beforeLen > 0 ? Math.round((saved / beforeLen) * 100) : 0;

  let status = "SVG cleaned";
  if (intent === "strip-svg-metadata") {
    status = "Metadata and editor attributes removed";
  } else if (intent === "remove-comments-from-svg") {
    status = "Comments removed from SVG";
  } else if (intent === "remove-unused-ids-from-svg") {
    status = "Unused ids removed";
  } else if (intent === "clean-svg-file") {
    status = "SVG file cleaned";
  } else if (intent === "reduce-svg-file-size") {
    status =
      "Size " +
      formatByteCount(beforeLen) +
      " → " +
      formatByteCount(afterLen) +
      (saved ? " (−" + pct + "%)" : "");
  } else if (intent === "optimize-svg-file") {
    status =
      "Optimized " +
      formatByteCount(beforeLen) +
      " → " +
      formatByteCount(afterLen) +
      (saved ? " (−" + pct + "%)" : "");
  }

  return {
    markup: out,
    status: status,
    beforeLen: beforeLen,
    afterLen: afterLen,
    saved: saved,
    pct: pct,
  };
}

const CLEAN_DEFAULT_SVGS = {
  "strip-svg-metadata": `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 120 120" width="120" height="120" role="img" aria-label="Badge with editor metadata — click Strip metadata" inkscape:version="1.3" data-name="Layer 1" enable-background="new 0 0 120 120">
  <metadata>Exported from a design tool — safe to strip</metadata>
  <circle cx="60" cy="60" r="40" fill="#0ea5e9"/>
  <path d="M42 62 L54 74 L80 46" fill="none" stroke="#031018" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "remove-comments-from-svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" width="160" height="100" role="img" aria-label="Graphic with XML comments — click Remove comments">
  <!-- Designer note: temporary brand mark -->
  <rect x="16" y="18" width="128" height="64" rx="14" fill="#0284c7"/>
  <!-- TODO: replace cyan with final token -->
  <circle cx="56" cy="50" r="16" fill="#67e8f9"/>
  <circle cx="104" cy="50" r="16" fill="#22d3ee"/>
  <!-- end sample -->
</svg>`,
  "remove-unused-ids-from-svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" width="140" height="140" role="img" aria-label="Shapes with unused ids — click Remove unused ids">
  <defs>
    <linearGradient id="used-grad" x1="20" y1="20" x2="120" y2="120" gradientUnits="userSpaceOnUse">
      <stop stop-color="#67e8f9"/>
      <stop offset="1" stop-color="#2563eb"/>
    </linearGradient>
    <linearGradient id="unused-grad" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#f43f5e"/>
      <stop offset="1" stop-color="#fb7185"/>
    </linearGradient>
  </defs>
  <rect id="unused-frame" x="18" y="18" width="104" height="104" rx="18" fill="none" stroke="#7dd3fc" stroke-opacity="0.25" stroke-width="2"/>
  <circle id="hero" cx="70" cy="70" r="36" fill="url(#used-grad)"/>
  <path id="unused-spark" d="M70 40 L74 58 L92 58 L78 70 L84 88 L70 76 L56 88 L62 70 L48 58 L66 58 Z" fill="#e0f2fe" opacity="0"/>
</svg>`,
  "clean-svg-file": `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 160 110" width="160" height="110" data-name="Artboard" role="img" aria-label="Messy SVG — click Clean SVG">
  <!-- leftover export comment -->
  <metadata>tool=demo;keep=false</metadata>
  <g inkscape:label="Layer 1" id="layer1">
    <rect x="20" y="22" width="120" height="66" rx="16" fill="#0ea5e9"/>
    <text x="80" y="62" text-anchor="middle" fill="#031018" font-family="Segoe UI,sans-serif" font-size="18" font-weight="700">clean me</text>
  </g>
  <g id="empty-layer"></g>
</svg>`,
  "reduce-svg-file-size": `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 200 140" width="200px" height="140px" inkscape:version="1.2" data-name="HeavyExport" role="img" aria-label="Heavy SVG — click Reduce size">
  <!-- bulky export -->
  <metadata>Creator: demo exporter</metadata>
  <defs>
    <linearGradient id="keep-fill" x1="30" y1="30" x2="170" y2="110" gradientUnits="userSpaceOnUse">
      <stop stop-color="#38bdf8"/>
      <stop offset="1" stop-color="#0284c7"/>
    </linearGradient>
    <radialGradient id="dead-glow" cx="50%" cy="50%" r="50%">
      <stop stop-color="#fff" offset="0"/>
      <stop stop-color="#000" offset="1"/>
    </radialGradient>
  </defs>
  <g id="unused-wrapper">
    <rect id="card" x="28" y="28" width="144" height="84" rx="18" fill="url(#keep-fill)"/>
    <circle id="unused-dot" cx="40" cy="40" r="4" fill="#fff" opacity="0"/>
  </g>
</svg>`,
  "optimize-svg-file": `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="180" height="180" viewBox="0 0 180 180" inkscape:version="1.3" data-name="mark.svg" role="img" aria-label="Unoptimized SVG — click Optimize SVG">
  <!-- optimize sample -->
  <metadata id="metadata1">Illustrator / Inkscape leftovers</metadata>
  <defs id="defs1">
    <linearGradient id="paint" x1="40" y1="40" x2="140" y2="140" gradientUnits="userSpaceOnUse">
      <stop stop-color="#22d3ee"/>
      <stop offset="1" stop-color="#2563eb"/>
    </linearGradient>
    <linearGradient id="unused-paint" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="#f43f5e"/>
    </linearGradient>
  </defs>
  <g inkscape:groupmode="layer" id="layer1" inkscape:label="Layer 1">
    <circle id="disc" cx="90" cy="90" r="52" fill="url(#paint)"/>
    <path id="check" d="M70 92 L84 106 L116 72" fill="none" stroke="#031018" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`,
};

const BASE64_DEFAULT_SVGS = {
  "svg-to-base64": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Star mark — click to copy a Base64 data URI">
  <circle cx="60" cy="60" r="52" fill="#0b1b33"/>
  <path d="M60 22 L70 48 L98 48 L76 66 L84 94 L60 78 L36 94 L44 66 L22 48 L50 48 Z" fill="#67e8f9"/>
</svg>`,
  "svg-to-base64-string": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 88" role="img" aria-label="Badge — click to copy a raw Base64 string">
  <rect x="8" y="14" width="124" height="60" rx="14" fill="#0284c7"/>
  <text x="70" y="52" text-anchor="middle" fill="#ecfeff" font-family="Segoe UI,sans-serif" font-size="18" font-weight="700">b64</text>
</svg>`,
  "svg-to-base64-data-uri": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Check mark — click to copy a Base64 data URI">
  <circle cx="60" cy="60" r="46" fill="#22d3ee"/>
  <path d="M40 62 L54 76 L84 42" fill="none" stroke="#031018" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "svg-to-base64-css": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Rounded CSS tile — click to copy a CSS rule">
  <rect x="8" y="8" width="80" height="80" rx="20" fill="#0ea5e9"/>
  <rect x="28" y="28" width="40" height="40" rx="8" fill="#ecfeff"/>
</svg>`,
  "svg-to-base64-html": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" role="img" aria-label="House mark — click to copy Base64 HTML">
  <path d="M16 48 L60 14 L104 48 V90 H16 Z" fill="#38bdf8"/>
  <rect x="48" y="58" width="24" height="32" fill="#031018"/>
</svg>`,
  "svg-to-base64-css-background-image": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Diamond — click to copy background-image">
  <rect width="100" height="100" rx="16" fill="#071526"/>
  <path d="M50 12 L88 50 L50 88 L12 50 Z" fill="#67e8f9"/>
</svg>`,
  "svg-to-base64-css-background": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" role="img" aria-label="Wave — click to copy CSS background shorthand">
  <rect width="160" height="80" rx="12" fill="#0b1b33"/>
  <path d="M0 48 C28 28 52 68 80 48 C108 28 132 68 160 48 V80 H0 Z" fill="#22d3ee"/>
</svg>`,
  "svg-to-base64-css-data-uri": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" role="img" aria-label="Plus mark — click to copy a CSS url() data URI">
  <rect width="72" height="72" rx="16" fill="#2563eb"/>
  <path d="M36 16 V56 M16 36 H56" stroke="#ecfeff" stroke-width="8" stroke-linecap="round"/>
</svg>`,
  "convert-svg-to-base64-css": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 90" role="img" aria-label="Folder — click Convert to CSS">
  <path d="M8 28 H42 L52 38 H102 V82 H8 Z" fill="#0ea5e9"/>
  <path d="M8 28 V22 H38 L46 30" fill="#38bdf8"/>
</svg>`,
  "convert-svg-to-base64-string": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 120" role="img" aria-label="Lightning — click Convert to string">
  <path d="M48 8 L18 68 H40 L32 112 L62 52 H40 Z" fill="#fbbf24"/>
</svg>`,
  "svg-image-to-base64-string": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 96" role="img" aria-label="Picture frame — click to copy image Base64">
  <rect x="8" y="8" width="112" height="80" rx="10" fill="#0b1b33" stroke="#67e8f9" stroke-width="4"/>
  <circle cx="40" cy="36" r="10" fill="#fbbf24"/>
  <path d="M16 76 L48 48 L72 66 L92 44 L112 76 Z" fill="#22d3ee"/>
</svg>`,
  "convert-svg-to-base64-data-uri": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 110" role="img" aria-label="Map pin — click Convert to data URI">
  <path d="M40 8 C22 8 10 22 10 40 C10 66 40 102 40 102 C40 102 70 66 70 40 C70 22 58 8 40 8 Z" fill="#fb7185"/>
  <circle cx="40" cy="40" r="12" fill="#fff"/>
</svg>`,
  "svg-base64-data-uri-image": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Photo mark — click to copy an image data URI">
  <rect x="12" y="20" width="76" height="60" rx="8" fill="#0284c7"/>
  <circle cx="50" cy="44" r="14" fill="#e0f2fe"/>
  <rect x="36" y="12" width="28" height="12" rx="3" fill="#67e8f9"/>
</svg>`,
  "convert-svg-to-base64-html": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" role="img" aria-label="Browser window — click Convert to HTML">
  <rect x="6" y="10" width="128" height="80" rx="10" fill="#071526" stroke="#7dd3fc" stroke-width="3"/>
  <circle cx="22" cy="26" r="4" fill="#fb7185"/>
  <circle cx="34" cy="26" r="4" fill="#fbbf24"/>
  <circle cx="46" cy="26" r="4" fill="#34d399"/>
  <rect x="18" y="42" width="104" height="36" rx="6" fill="#0ea5e9"/>
</svg>`,
  "svg-to-base64-html-img": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112" role="img" aria-label="Image tile — click to copy an HTML img tag">
  <rect x="10" y="10" width="92" height="92" rx="18" fill="#0c4a6e"/>
  <path d="M28 78 L48 52 L64 68 L80 46 L94 78 Z" fill="#67e8f9"/>
  <circle cx="40" cy="40" r="8" fill="#fde68a"/>
</svg>`,
};

const base64ActionBtn = document.getElementById("btn-base64-action");
const base64Intent =
  (document.body && document.body.getAttribute("data-base64-intent")) || "";

const cleanActionBtn = document.getElementById("btn-clean-action");
const cleanIntent =
  (document.body && document.body.getAttribute("data-clean-intent")) || "";

if (base64ActionBtn && base64Intent) {
  base64ActionBtn.addEventListener("click", function () {
    const raw = extractSvgMarkup(editor.value) || editor.value.trim();
    if (!raw) {
      setStatus("empty", "Paste an SVG first");
      return;
    }
    setDataUriFormat("base64");
    setActiveTab("data-uri");
    const text = formatBase64IntentOutput(raw, base64Intent);
    if (dataUriOutput) dataUriOutput.textContent = text;
    if (dataUriSize) dataUriSize.textContent = formatByteSize(byteLengthUtf8(text));
    copyTextToClipboard(text)
      .then(function () {
        flashCopyButton(base64ActionBtn, "Copied");
        setStatus("ok", "Copied Base64 output");
      })
      .catch(function () {
        flashCopyButton(base64ActionBtn, "Failed");
        setStatus("error", "Copy failed");
      });
  });
}

if (cleanActionBtn && cleanIntent) {
  cleanActionBtn.addEventListener("click", function () {
    const raw = extractSvgMarkup(editor.value) || editor.value.trim();
    if (!raw) {
      setStatus("empty", "Paste an SVG first");
      return;
    }
    try {
      const result = cleanSvgMarkup(raw, cleanIntent);
      applyMirroredEditorMarkup(result.markup, result.status);
      updateCleanSizeStat(result.beforeLen, result.afterLen);
    } catch (err) {
      setStatus("error", (err && err.message) || "Could not clean this SVG");
    }
  });
}

if (uploadBtn && fileUpload) {
  uploadBtn.addEventListener("click", function () {
    fileUpload.value = "";
    fileUpload.click();
  });

  fileUpload.addEventListener("change", function () {
    const file = fileUpload.files && fileUpload.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
      const text = typeof reader.result === "string" ? reader.result : "";
      let markup = extractSvgMarkup(text) || text.trim();
      try {
        markup = sanitizeSvgSource(markup) || markup;
      } catch (err) {
      setStatus("error", "Upload blocked — unsafe SVG content");
        return;
      }
      markUserEdited();
      flushHistory();
      editor.value = markup;
      editor.focus();
      editor.setSelectionRange(0, 0);
      commitHistory();
      scheduleRefreshEditorChrome();
      scheduleRender();
      clearHighlight();
      setStatus("ok", "Loaded " + file.name);
      maybeShowOutputOnMobile();
    };
    reader.onerror = function () {
      setStatus("error", "Couldn’t read that file");
    };
    reader.readAsText(file);
  });
}

if (downloadSvgBtn) {
  downloadSvgBtn.addEventListener("click", function () {
    let markup = extractSvgMarkup(editor.value) || editor.value.trim();
    if (!markup) {
      setStatus("empty", "Nothing to download yet");
      return;
    }

    try {
      markup = sanitizeSvgSource(markup) || markup;
    } catch (err) {
      setStatus("error", "Download blocked — unsafe SVG content");
      return;
    }

    const blob = new Blob([markup], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "svgeditor-export.svg";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("ok", "SVG downloaded");
  });
}

function getShareMarkup() {
  const raw = extractSvgMarkup(editor.value) || editor.value.trim();
  if (!raw) return "";
  try {
    // Encode with share rules so recipients never get outbound links / remote images
    return sanitizeSvgSource(raw, { share: true }) || "";
  } catch (err) {
    return "";
  }
}

function encodeSharePayload() {
  if (typeof ShareCodec === "undefined") {
    return { ok: false, error: "missing_codec" };
  }
  return ShareCodec.encodeSvg(getShareMarkup());
}

function shareErrorMessage(result) {
  if (!result || result.error === "empty") return "Nothing to share yet";
  if (result.error === "too_large") {
    return "That SVG is too large to share as a link — try a simpler file";
  }
  if (result.error === "missing_codec") return "Sharing is temporarily unavailable";
  return "Couldn’t create a share link";
}

function copyTextToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise(function (resolve, reject) {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-9999px";
    document.body.appendChild(area);
    area.select();
    try {
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      if (ok) resolve();
      else reject(new Error("copy failed"));
    } catch (err) {
      document.body.removeChild(area);
      reject(err);
    }
  });
}

const shareMenu = document.getElementById("share-menu");

function closeShareMenu() {
  if (shareMenu) shareMenu.open = false;
}

const toolFaq = document.querySelector(".tool-faq");

function closeToolFaq() {
  if (toolFaq) toolFaq.open = false;
}

if (toolFaq) {
  document.addEventListener("pointerdown", function (e) {
    if (!toolFaq.open) return;
    if (!toolFaq.contains(e.target)) closeToolFaq();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeToolFaq();
  });
}

function flashShareButton(btn, label) {
  if (!btn) return;
  const labelEl = btn.querySelector(".share-menu-item-label") || btn;
  const original = labelEl.textContent;
  const width = Math.ceil(btn.getBoundingClientRect().width);
  if (width > 0) btn.style.minWidth = width + "px";
  btn.classList.add("is-copied");
  labelEl.textContent = label;
  window.setTimeout(function () {
    btn.classList.remove("is-copied");
    labelEl.textContent = original;
    btn.style.minWidth = "";
  }, 1400);
}

if (copyLinkBtn) {
  copyLinkBtn.addEventListener("click", function () {
    const encoded = encodeSharePayload();
    if (!encoded.ok) {
      setStatus("empty", shareErrorMessage(encoded));
      closeShareMenu();
      return;
    }

    const url = ShareCodec.buildEditorUrl(encoded.payload);
    copyTextToClipboard(url)
      .then(function () {
        flashShareButton(copyLinkBtn, "Copied");
        setStatus("ok", "Link copied");
        window.setTimeout(closeShareMenu, 650);
      })
      .catch(function () {
        setStatus("error", "Copy failed");
      });
  });
}

if (copyIframeBtn) {
  copyIframeBtn.addEventListener("click", function () {
    const encoded = encodeSharePayload();
    if (!encoded.ok) {
      setStatus("empty", shareErrorMessage(encoded));
      closeShareMenu();
      return;
    }

    const embedUrl = ShareCodec.buildEmbedUrl(encoded.payload);
    const snippet = ShareCodec.buildIframeSnippet(embedUrl);
    copyTextToClipboard(snippet)
      .then(function () {
        flashShareButton(copyIframeBtn, "Copied");
        setStatus("ok", "Embed code copied");
        window.setTimeout(closeShareMenu, 650);
      })
      .catch(function () {
        setStatus("error", "Copy failed");
      });
  });
}

if (shareMenu) {
  document.addEventListener("pointerdown", function (event) {
    if (!shareMenu.open) return;
    if (shareMenu.contains(event.target)) return;
    closeShareMenu();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && shareMenu.open) {
      closeShareMenu();
    }
  });
}

/* Block navigation from SVG <a> in preview (phishing / drive-by links). */
previewStage.addEventListener(
  "click",
  function (event) {
    const path = typeof event.composedPath === "function" ? event.composedPath() : [];
    let el = event.target;
    if (path && path.length) {
      for (let i = 0; i < path.length; i++) {
        const n = path[i];
        if (n === previewStage || n === document || n === window) break;
        if (n && n.localName && String(n.localName).toLowerCase() === "a") {
          el = n;
          break;
        }
      }
    }
    while (el && el !== previewStage) {
      if (el.localName && String(el.localName).toLowerCase() === "a") {
        // Empty-state / UI links are trusted; only block anchors from SVG markup
        if (empty && empty.contains(el)) return;
        event.preventDefault();
        event.stopPropagation();
        setStatus("empty", "Links in preview are disabled");
        return;
      }
      el = el.parentElement || el.parentNode;
    }
  },
  true
);

canvas.addEventListener("click", function (event) {
  if (!previewSvg) return;
  // Drag just finished — don't treat as element pick
  if (previewPanMoved) {
    previewPanMoved = false;
    panDownTarget = null;
    return;
  }

  // Prefer the element under the original pointerdown (capture can retarget click to canvas)
  let node = panDownTarget || event.target;
  panDownTarget = null;

  // Free area / root <svg> → remove spotlight
  if (node === canvas || node === previewSvg) {
    clearHighlight();
    return;
  }

  while (node && node !== previewSvg && !(node instanceof Element && node.hasAttribute("data-el-index"))) {
    node = node.parentNode;
  }
  if (!(node instanceof Element) || node === previewSvg) {
    clearHighlight();
    return;
  }

  const index = Number(node.getAttribute("data-el-index"));
  if (Number.isNaN(index) || !elementRanges[index]) {
    clearHighlight();
    return;
  }

  if (!isSpotlightIndex(index)) {
    clearHighlight();
    return;
  }

  applySelection(index);
  const range = elementRanges[index];
  editor.focus();
  editor.setSelectionRange(range.start, Math.min(range.start + ("<" + range.name).length + 1, range.end));
});

/* ——— Preview pan (drag) + pinch zoom ——— */
const PAN_THRESHOLD = 4;
let previewPanDragging = false;
let previewPanMoved = false;
let panPointerId = null;
let panStartClientX = 0;
let panStartClientY = 0;
let panOriginX = 0;
let panOriginY = 0;
let panDownTarget = null;
let panHasCapture = false;

let pinchActive = false;
let pinchStartDist = 0;
let pinchStartZoom = 1;
let pinchStartPanX = 0;
let pinchStartPanY = 0;
let pinchMidX = 0;
let pinchMidY = 0;
let pinchCenterX = 0;
let pinchCenterY = 0;
let shiftHeld = false;
const activePointers = new Map();

window.addEventListener("keydown", function (event) {
  if (event.key === "Shift") shiftHeld = true;
});
window.addEventListener("keyup", function (event) {
  if (event.key === "Shift") shiftHeld = false;
});
window.addEventListener("blur", function () {
  shiftHeld = false;
});

function pointerPoint(event) {
  return { clientX: event.clientX, clientY: event.clientY };
}

function canvasCenterPoint() {
  const rect = canvas.getBoundingClientRect();
  return {
    clientX: rect.left + rect.width / 2,
    clientY: rect.top + rect.height / 2,
  };
}

function touchDistance(a, b) {
  const dx = a.clientX - b.clientX;
  const dy = a.clientY - b.clientY;
  return Math.hypot(dx, dy);
}

function touchMidpoint(a, b) {
  return {
    x: (a.clientX + b.clientX) / 2,
    y: (a.clientY + b.clientY) / 2,
  };
}

function pinchPointsFromPointers() {
  const pts = Array.from(activePointers.values());
  if (pts.length >= 2) return [pts[0], pts[1]];
  // Chrome Device Mode: Shift+drag often exposes only one touch
  if (pts.length === 1 && shiftHeld) return [pts[0], canvasCenterPoint()];
  return null;
}

function endPreviewPan(event) {
  if (!previewPanDragging) return;
  if (event && panPointerId != null && event.pointerId !== panPointerId) return;
  previewPanDragging = false;
  panPointerId = null;
  if (!pinchActive) {
    previewStage.classList.remove("is-panning");
    canvas.classList.remove("is-panning");
  }
  if (panHasCapture) {
    panHasCapture = false;
    try {
      if (event && event.pointerId != null) {
        canvas.releasePointerCapture(event.pointerId);
      }
    } catch (err) {
      /* ignore */
    }
  }
}

function endPreviewPinch() {
  if (!pinchActive) return;
  pinchActive = false;
  if (!previewPanDragging) {
    previewStage.classList.remove("is-panning");
    canvas.classList.remove("is-panning");
  }
}

function beginPreviewPinch(pointA, pointB) {
  endPreviewPan();
  previewPanDragging = false;
  previewPanMoved = true;
  pinchActive = true;
  pinchStartDist = Math.max(1, touchDistance(pointA, pointB));
  pinchStartZoom = previewZoom;
  pinchStartPanX = previewPanX;
  pinchStartPanY = previewPanY;
  const mid = touchMidpoint(pointA, pointB);
  pinchMidX = mid.x;
  pinchMidY = mid.y;
  if (previewSvg) {
    const rect = previewSvg.getBoundingClientRect();
    pinchCenterX = rect.left + rect.width / 2;
    pinchCenterY = rect.top + rect.height / 2;
  } else {
    pinchCenterX = mid.x;
    pinchCenterY = mid.y;
  }
  previewStage.classList.add("is-panning");
  canvas.classList.add("is-panning");
}

function updatePreviewPinch(pointA, pointB) {
  if (!pinchActive || !previewSvg) return;
  const dist = Math.max(1, touchDistance(pointA, pointB));
  const mid = touchMidpoint(pointA, pointB);
  const nextZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, pinchStartZoom * (dist / pinchStartDist)));
  const zoomRatio = nextZoom / pinchStartZoom;
  previewPanX =
    pinchStartPanX * zoomRatio +
    (mid.x - pinchMidX) +
    (pinchMidX - pinchCenterX) * (1 - zoomRatio);
  previewPanY =
    pinchStartPanY * zoomRatio +
    (mid.y - pinchMidY) +
    (pinchMidY - pinchCenterY) * (1 - zoomRatio);
  previewZoom = Math.round(nextZoom * 100) / 100;
  applyPreviewZoom();
}

canvas.addEventListener(
  "pointerdown",
  function (event) {
    if (!previewSvg || event.button !== 0) return;
    activePointers.set(event.pointerId, pointerPoint(event));

    const pinchPts = pinchPointsFromPointers();
    if (pinchPts) {
      event.preventDefault();
      beginPreviewPinch(pinchPts[0], pinchPts[1]);
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch (err) {
        /* ignore */
      }
      return;
    }

    if (pinchActive) return;
    previewPanDragging = true;
    previewPanMoved = false;
    panHasCapture = false;
    panPointerId = event.pointerId;
    panDownTarget = event.target;
    panStartClientX = event.clientX;
    panStartClientY = event.clientY;
    panOriginX = previewPanX;
    panOriginY = previewPanY;
  },
  { passive: false }
);

canvas.addEventListener(
  "pointermove",
  function (event) {
    if (activePointers.has(event.pointerId)) {
      activePointers.set(event.pointerId, pointerPoint(event));
    }

    const pinchPts = pinchPointsFromPointers();
    if (pinchPts && (pinchActive || shiftHeld || activePointers.size >= 2)) {
      if (!pinchActive) beginPreviewPinch(pinchPts[0], pinchPts[1]);
      event.preventDefault();
      updatePreviewPinch(pinchPts[0], pinchPts[1]);
      return;
    }

    if (pinchActive || !previewPanDragging || event.pointerId !== panPointerId) return;
    const dx = event.clientX - panStartClientX;
    const dy = event.clientY - panStartClientY;
    if (!previewPanMoved && dx * dx + dy * dy < PAN_THRESHOLD * PAN_THRESHOLD) return;

    if (!panHasCapture) {
      panHasCapture = true;
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch (err) {
        /* ignore */
      }
    }

    previewPanMoved = true;
    previewStage.classList.add("is-panning");
    canvas.classList.add("is-panning");
    previewPanX = panOriginX + dx;
    previewPanY = panOriginY + dy;
    applyPreviewZoom();
  },
  { passive: false }
);

function onPreviewPointerEnd(event) {
  activePointers.delete(event.pointerId);
  if (pinchActive && !pinchPointsFromPointers()) endPreviewPinch();
  endPreviewPan(event);
}

canvas.addEventListener("pointerup", onPreviewPointerEnd);
canvas.addEventListener("pointercancel", onPreviewPointerEnd);

window.addEventListener("resize", function () {
  invalidateEditorMetrics();
  scheduleUpdateLineNumbers();
  if (inspectActive) scheduleSelection();
  splitDragRect = null;
});

if (typeof ResizeObserver !== "undefined") {
  new ResizeObserver(function (entries) {
    const entry = entries && entries[0];
    if (entry && entry.contentRect && entry.contentRect.width > 0) {
      setEditorContentWidthFromBox(entry.contentRect.width);
    } else {
      invalidateEditorMetrics();
    }
    scheduleUpdateLineNumbers();
  }).observe(editor);
}
previewStage.addEventListener("scroll", function () {
  if (inspectActive) scheduleSelection();
});

previewStage.addEventListener(
  "wheel",
  function (event) {
    if (!(event.ctrlKey || event.metaKey)) return;
    event.preventDefault();
    const direction = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setPreviewZoom(previewZoom + direction);
  },
  { passive: false }
);

/* ——— Export tabs: React / RN / PNG / Data URI ——— */
const reactOutput = document.getElementById("react-output");
const rnOutput = document.getElementById("rn-output");
const dataUriOutput = document.getElementById("data-uri-output");
const dataUriSize = document.getElementById("data-uri-size");
const dataUriFormatBtns = document.querySelectorAll("[data-uri-format]");
const pngCanvas = document.getElementById("png-canvas");
const pngEmpty = document.getElementById("png-empty");
const downloadPngBtn = document.getElementById("btn-download-png");
const exportTabs = document.querySelectorAll(".export-tab");
const exportViews = document.querySelectorAll(".export-view");

let activeTab = "preview";
let latestMarkup = null;
let latestPngUrl = null;
let dataUriFormat = "css";

const ATTR_MAP = {
  class: "className",
  classname: "className",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-miterlimit": "strokeMiterlimit",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-opacity": "strokeOpacity",
  "fill-opacity": "fillOpacity",
  "fill-rule": "fillRule",
  "clip-path": "clipPath",
  "clip-rule": "clipRule",
  "font-family": "fontFamily",
  "font-size": "fontSize",
  "font-style": "fontStyle",
  "font-weight": "fontWeight",
  "letter-spacing": "letterSpacing",
  "text-anchor": "textAnchor",
  "text-decoration": "textDecoration",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
  "flood-color": "floodColor",
  "flood-opacity": "floodOpacity",
  "color-interpolation-filters": "colorInterpolationFilters",
  "gradienttransform": "gradientTransform",
  "gradientunits": "gradientUnits",
  "gradientTransform": "gradientTransform",
  "gradientUnits": "gradientUnits",
  "patternunits": "patternUnits",
  "patternUnits": "patternUnits",
  "patterntransform": "patternTransform",
  "patternTransform": "patternTransform",
  "stddeviation": "stdDeviation",
  "stdDeviation": "stdDeviation",
  "xlink:href": "href",
  "xml:space": "xmlSpace",
  "xmlns:xlink": "xmlnsXlink",
  tabindex: "tabIndex",
  readonly: "readOnly",
  crossorigin: "crossOrigin",
};

const RN_TAG_MAP = {
  svg: "Svg",
  g: "G",
  path: "Path",
  rect: "Rect",
  circle: "Circle",
  ellipse: "Ellipse",
  line: "Line",
  polyline: "Polyline",
  polygon: "Polygon",
  text: "Text",
  tspan: "TSpan",
  defs: "Defs",
  clippath: "ClipPath",
  lineargradient: "LinearGradient",
  radialgradient: "RadialGradient",
  stop: "Stop",
  mask: "Mask",
  pattern: "Pattern",
  image: "Image",
  use: "Use",
  symbol: "Symbol",
  foreignobject: "ForeignObject",
  marker: "Marker",
  filter: "Filter",
  fegaussianblur: "FeGaussianBlur",
  feoffset: "FeOffset",
  femerge: "FeMerge",
  femergenode: "FeMergeNode",
  feflood: "FeFlood",
  feblend: "FeBlend",
  fecomposite: "FeComposite",
  fecolormatrix: "FeColorMatrix",
};

function tabStatusLabel(tab) {
  if (tab === "preview") return "Live preview";
  if (tab === "react") return "React output";
  if (tab === "react-native") return "RN output";
  if (tab === "png") return "PNG export";
  if (tab === "data-uri") return base64Intent ? "Base64 output" : "Data URI";
  return "Ready";
}

function toCamelAttr(name) {
  const lower = name.toLowerCase();
  if (ATTR_MAP[name]) return ATTR_MAP[name];
  if (ATTR_MAP[lower]) return ATTR_MAP[lower];
  if (name.startsWith("aria-") || name.startsWith("data-")) return name;
  if (name.includes("-")) {
    return name.replace(/-([a-z])/g, function (_, c) {
      return c.toUpperCase();
    });
  }
  return name;
}

function serializeStyleObject(styleText) {
  const parts = styleText
    .split(";")
    .map(function (part) {
      return part.trim();
    })
    .filter(Boolean);
  if (!parts.length) return null;
  const entries = parts
    .map(function (part) {
      const idx = part.indexOf(":");
      if (idx < 0) return null;
      const key = toCamelAttr(part.slice(0, idx).trim());
      const value = part.slice(idx + 1).trim();
      return key + ": \"" + value.replace(/"/g, '\\"') + "\"";
    })
    .filter(Boolean);
  return "{ " + entries.join(", ") + " }";
}

function serializeJsxAttrs(el, forNative) {
  const chunks = [];
  Array.from(el.attributes).forEach(function (attr) {
    let name = attr.name;
    if (name === "xmlns" && el.localName.toLowerCase() === "svg" && !forNative) {
      // keep xmlns optional for DOM svg in react; skip for cleaner JSX
      return;
    }
    if (name === "xmlns" && forNative) return;

    let jsName = toCamelAttr(name);
    if (forNative && jsName === "className") jsName = "className";

    const raw = attr.value;
    if (jsName === "style") {
      const obj = serializeStyleObject(raw);
      if (obj) chunks.push("style={" + obj + "}");
      return;
    }

    if (raw === "") {
      chunks.push(jsName);
      return;
    }

    if (/^\d+(\.\d+)?$/.test(raw) && !["id"].includes(jsName)) {
      chunks.push(jsName + "={" + raw + "}");
      return;
    }

    chunks.push(jsName + "=\"" + raw.replace(/"/g, "&quot;") + "\"");
  });
  return chunks;
}

function nodeToJsx(node, indent, forNative, usedRnTags) {
  const pad = Array(indent + 1).join("  ");

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.replace(/\s+/g, " ").trim();
    if (!text) return "";
    return pad + text + "\n";
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return "";

  const local = node.localName.toLowerCase();
  let tag = local;
  if (forNative) {
    tag = RN_TAG_MAP[local] || local.replace(/(^|-)([a-z])/g, function (_, __, c) {
      return c.toUpperCase();
    });
    usedRnTags.add(tag);
  }

  const attrs = serializeJsxAttrs(node, forNative);
  const attrText = attrs.length ? " " + attrs.join(" ") : "";
  const children = Array.from(node.childNodes);
  const hasElementChildren = children.some(function (child) {
    return child.nodeType === Node.ELEMENT_NODE;
  });

  if (!children.length || (!hasElementChildren && !node.textContent.trim())) {
    return pad + "<" + tag + attrText + " />\n";
  }

  let out = pad + "<" + tag + attrText + ">\n";
  children.forEach(function (child) {
    out += nodeToJsx(child, indent + 1, forNative, usedRnTags);
  });
  out += pad + "</" + tag + ">\n";
  return out;
}

function svgToReactComponent(markup) {
  const svg = parseSvg(markup);
  const body = nodeToJsx(svg, 2, false, new Set()).trimEnd();
  return (
    "export default function Icon(props) {\n" +
    "  return (\n" +
    body.replace(/^(\s*)<svg\b/, "$1<svg {...props}") +
    "\n  );\n" +
    "}\n"
  );
}

function svgToReactNativeComponent(markup) {
  const svg = parseSvg(markup);
  const used = new Set();
  const body = nodeToJsx(svg, 2, true, used).trimEnd();
  const components = Array.from(used)
    .filter(function (tag) {
      return tag !== "Svg";
    })
    .sort();
  const importLine = components.length
    ? "import Svg, { " + components.join(", ") + " } from \"react-native-svg\";\n\n"
    : "import Svg from \"react-native-svg\";\n\n";

  return (
    importLine +
    "export default function Icon(props) {\n" +
    "  return (\n" +
    body.replace(/^(\s*)<Svg\b/, "$1<Svg {...props}") +
    "\n  );\n" +
    "}\n"
  );
}

function toUrlEncodedDataUri(svgString) {
  const minifiedSvg = svgString.replace(/\s+/g, " ").trim();
  const encoded = encodeURIComponent(minifiedSvg).replace(/'/g, "%27").replace(/"/g, "%22");
  return "data:image/svg+xml," + encoded;
}

function toBase64DataUri(svgString) {
  const base64 = window.btoa(unescape(encodeURIComponent(svgString)));
  return "data:image/svg+xml;base64," + base64;
}

function toRawBase64(svgString) {
  return window.btoa(unescape(encodeURIComponent(svgString)));
}

function formatBase64IntentOutput(markup, intent) {
  const uri = toBase64DataUri(markup);
  const raw = toRawBase64(markup);
  switch (intent) {
    case "svg-to-base64-string":
    case "convert-svg-to-base64-string":
    case "svg-image-to-base64-string":
      return raw;
    case "svg-to-base64-html":
    case "convert-svg-to-base64-html":
    case "svg-to-base64-html-img":
      return '<img src="' + uri + '" alt="" />';
    case "svg-to-base64-css":
    case "convert-svg-to-base64-css":
      return '.icon {\n  background-image: url("' + uri + '");\n}';
    case "svg-to-base64-css-background-image":
      return 'background-image: url("' + uri + '");';
    case "svg-to-base64-css-background":
      return 'background: url("' + uri + '") center / contain no-repeat;';
    case "svg-to-base64-css-data-uri":
      return 'url("' + uri + '")';
    default:
      return uri;
  }
}

function formatByteSize(bytes) {
  if (!bytes || bytes < 0) return "0 B";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " kB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function byteLengthUtf8(text) {
  return new TextEncoder().encode(text).length;
}

function buildDataUri(markup) {
  if (dataUriFormat === "base64") return toBase64DataUri(markup);
  return toUrlEncodedDataUri(markup);
}

function refreshDataUriOutput(markup) {
  if (!dataUriOutput) return;
  if (!markup) {
    dataUriOutput.textContent = "";
    if (dataUriSize) dataUriSize.textContent = "0 B";
    return;
  }
  try {
    const uri = base64Intent
      ? formatBase64IntentOutput(markup, base64Intent)
      : buildDataUri(markup);
    dataUriOutput.textContent = uri;
    if (dataUriSize) dataUriSize.textContent = formatByteSize(byteLengthUtf8(uri));
  } catch (err) {
    dataUriOutput.textContent = "";
    if (dataUriSize) dataUriSize.textContent = "0 B";
  }
}

function setDataUriFormat(format) {
  dataUriFormat = format === "base64" ? "base64" : "css";
  dataUriFormatBtns.forEach(function (btn) {
    const on = btn.getAttribute("data-uri-format") === dataUriFormat;
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
  refreshDataUriOutput(latestMarkup);
}

function clearPngPreview() {
  if (latestPngUrl) {
    URL.revokeObjectURL(latestPngUrl);
    latestPngUrl = null;
  }
  const ctx = pngCanvas.getContext("2d");
  ctx.clearRect(0, 0, pngCanvas.width, pngCanvas.height);
  pngCanvas.width = 1;
  pngCanvas.height = 1;
  pngEmpty.hidden = false;
  downloadPngBtn.disabled = true;
}

function renderPngPreview(markup) {
  clearPngPreview();
  const svg = parseSvg(markup);
  if (!svg.getAttribute("xmlns")) svg.setAttribute("xmlns", SVG_NS);

  let width = parseFloat(svg.getAttribute("width")) || 0;
  let height = parseFloat(svg.getAttribute("height")) || 0;
  const viewBox = svg.getAttribute("viewBox");
  if ((!width || !height) && viewBox) {
    const parts = viewBox.trim().split(/[\s,]+/);
    if (parts.length === 4) {
      width = width || parseFloat(parts[2]) || 512;
      height = height || parseFloat(parts[3]) || 512;
    }
  }
  width = width || 512;
  height = height || 512;

  const serialized = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  latestPngUrl = url;

  const img = new Image();
  img.onload = function () {
    const scale = 2;
    pngCanvas.width = Math.max(1, Math.round(width * scale));
    pngCanvas.height = Math.max(1, Math.round(height * scale));
    const ctx = pngCanvas.getContext("2d");
    ctx.clearRect(0, 0, pngCanvas.width, pngCanvas.height);
    ctx.drawImage(img, 0, 0, pngCanvas.width, pngCanvas.height);
    pngEmpty.hidden = true;
    downloadPngBtn.disabled = false;
    URL.revokeObjectURL(url);
    if (latestPngUrl === url) latestPngUrl = null;
  };
  img.onerror = function () {
    pngEmpty.hidden = false;
    pngEmpty.textContent = "Couldn’t rasterize this SVG to PNG.";
    downloadPngBtn.disabled = true;
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

function updateExports(markup) {
  latestMarkup = markup;
  if (!markup) {
    reactOutput.textContent = "// Paste valid SVG to generate a React component.";
    rnOutput.textContent = "// Paste valid SVG to generate a React Native component.";
    refreshDataUriOutput(null);
    clearPngPreview();
    return;
  }

  try {
    reactOutput.textContent = svgToReactComponent(markup);
  } catch (err) {
    reactOutput.textContent = "// Couldn’t convert SVG to React.\n// " + (err && err.message ? err.message : "Unknown error");
  }

  try {
    rnOutput.textContent = svgToReactNativeComponent(markup);
  } catch (err) {
    rnOutput.textContent = "// Couldn’t convert SVG to React Native.\n// " + (err && err.message ? err.message : "Unknown error");
  }

  refreshDataUriOutput(markup);

  try {
    renderPngPreview(markup);
  } catch (err) {
    clearPngPreview();
    pngEmpty.hidden = false;
    pngEmpty.textContent = "Couldn’t rasterize this SVG to PNG.";
  }
}

function setActiveTab(tab) {
  activeTab = tab;
  exportTabs.forEach(function (btn) {
    const on = btn.getAttribute("data-tab") === tab;
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-selected", on ? "true" : "false");
  });
  exportViews.forEach(function (view) {
    const on = view.getAttribute("data-view") === tab;
    view.classList.toggle("is-active", on);
    view.hidden = !on;
  });
  if (previewSvg || latestMarkup) {
    setStatus("ok", tabStatusLabel(tab));
  }
  if (tab !== "preview") {
    clearHighlight();
  } else if (inspectActive) {
    requestAnimationFrame(selectionFromCaret);
  }
}

exportTabs.forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    setActiveTab(btn.getAttribute("data-tab"));
  });
  btn.addEventListener("keydown", function (event) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") {
      return;
    }
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % exportTabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + exportTabs.length) % exportTabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = exportTabs.length - 1;
    const target = exportTabs[next];
    if (!target) return;
    setActiveTab(target.getAttribute("data-tab"));
    target.focus();
  });
});

dataUriFormatBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    setDataUriFormat(btn.getAttribute("data-uri-format"));
  });
});

function isPlaceholderExport(text) {
  const t = String(text || "").trim();
  return !t || /^\/\/\s*Paste valid SVG/i.test(t);
}

function flashCopyButton(btn, label) {
  if (!btn) return;
  const original = btn.dataset.flashOriginal || btn.textContent;
  btn.dataset.flashOriginal = original;
  // Keep long-tail action labels from shrinking to "Copied" and shifting the toolbar
  if (!btn.style.minWidth) {
    const width = Math.ceil(btn.getBoundingClientRect().width);
    if (width > 0) btn.style.minWidth = width + "px";
  }
  btn.classList.add("is-copied");
  btn.textContent = label;
  window.clearTimeout(Number(btn.dataset.flashTimer) || 0);
  btn.dataset.flashTimer = String(
    window.setTimeout(function () {
      btn.classList.remove("is-copied");
      btn.textContent = original;
      delete btn.dataset.flashOriginal;
      delete btn.dataset.flashTimer;
      btn.style.minWidth = "";
    }, 1200)
  );
}

document.querySelectorAll(".btn-copy[data-copy]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const targetId = btn.getAttribute("data-copy");
    const el = document.getElementById(targetId);
    if (!el) return;
    const text = el.textContent || "";
    if (isPlaceholderExport(text)) {
      setStatus("empty", "Nothing to copy yet — paste an SVG first");
      return;
    }
    copyTextToClipboard(text)
      .then(function () {
        flashCopyButton(btn, "Copied");
        setStatus("ok", "Copied to clipboard");
      })
      .catch(function () {
        flashCopyButton(btn, "Failed");
        setStatus("error", "Copy failed");
      });
  });
});

if (downloadPngBtn) {
  downloadPngBtn.disabled = true;
  downloadPngBtn.addEventListener("click", function () {
    if (!pngCanvas.width || !pngCanvas.height || (pngEmpty && !pngEmpty.hidden)) {
      setStatus("empty", "Nothing to download yet — paste an SVG first");
      return;
    }
    const link = document.createElement("a");
    link.download = "svgeditor-export.png";
    link.href = pngCanvas.toDataURL("image/png");
    link.click();
    setStatus("ok", "PNG downloaded");
    flashCopyButton(downloadPngBtn, "Downloaded");
  });
}

if (base64Intent) setDataUriFormat("base64");
setActiveTab(document.body.getAttribute("data-default-tab") || "preview");

/* ——— Mobile: Source | Output (single panel under 900px) ——— */
const mobileModeBtns = document.querySelectorAll(".mobile-mode-btn");
const mobileMq = window.matchMedia("(max-width: 900px)");

function setMobileMode(mode) {
  const next = mode === "preview" ? "preview" : "edit";
  document.body.setAttribute("data-mobile-mode", next);
  mobileModeBtns.forEach(function (btn) {
    const on = btn.getAttribute("data-mobile-mode") === next;
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-selected", on ? "true" : "false");
  });
  if (next === "preview") {
    window.requestAnimationFrame(function () {
      scheduleUpdateLineNumbers();
      if (latestMarkup) {
        if (activeTab === "png" || activeTab === "preview") {
          updateExports(latestMarkup);
        }
      }
      if (inspectActive) scheduleSelection();
    });
  } else {
    window.requestAnimationFrame(function () {
      scheduleUpdateLineNumbers();
      if (mobileMq.matches) editor.focus();
    });
  }
}

function maybeShowOutputOnMobile() {
  if (!mobileMq.matches) return;
  if (document.body.classList.contains("tool-page")) {
    setMobileMode("preview");
  }
}

mobileModeBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    setMobileMode(btn.getAttribute("data-mobile-mode"));
  });
});

function onMobileMqChange() {
  if (!mobileMq.matches) return;
  setMobileMode(document.body.getAttribute("data-mobile-mode") || "edit");
}

if (typeof mobileMq.addEventListener === "function") {
  mobileMq.addEventListener("change", onMobileMqChange);
} else if (typeof mobileMq.addListener === "function") {
  mobileMq.addListener(onMobileMqChange);
}

setMobileMode(document.body.getAttribute("data-mobile-mode") || "edit");

const shareNotice = document.getElementById("share-notice");

function applyStartupSvg(markup, statusMsg) {
  editor.value = markup;
  commitHistory();
  applyPreviewZoom();
  renderPreview(markup, { deferExports: true });
  scheduleRefreshEditorChrome();
  if (statusMsg) setStatus("ok", statusMsg);
}

const sharedRaw =
  typeof ShareCodec !== "undefined" ? ShareCodec.decodeFromLocation(window.location) : "";
let sharedSvg = "";
if (sharedRaw && extractSvgMarkup(sharedRaw)) {
  try {
    sharedSvg = sanitizeSvgSource(sharedRaw, { share: true }) || "";
  } catch (err) {
    sharedSvg = "";
  }
}

const animationMode =
  window.location.pathname === "/svg-animation-editor" ||
  new URLSearchParams(window.location.search).get("animation") === "1";
const flipPathVMode =
  document.body.classList.contains("flip-path-v-page") ||
  document.body.classList.contains("flip-svg-v-page") ||
  window.location.pathname === "/flip-svg-path-vertically" ||
  window.location.pathname === "/flip-svg-path-vertically.html" ||
  window.location.pathname === "/flip-svg-vertically" ||
  window.location.pathname === "/flip-svg-vertically.html";
const flipPathHMode =
  (!flipPathVMode &&
    (document.body.classList.contains("flip-path-page") ||
      document.body.classList.contains("flip-svg-page"))) ||
  window.location.pathname === "/flip-svg-path-horizontally" ||
  window.location.pathname === "/flip-svg-path-horizontally.html" ||
  window.location.pathname === "/flip-svg-horizontally" ||
  window.location.pathname === "/flip-svg-horizontally.html";
const mirrorPathVMode =
  flipPathVMode ||
  document.body.classList.contains("mirror-path-v-page") ||
  document.body.classList.contains("mirror-svg-v-page") ||
  window.location.pathname === "/mirror-svg-path-vertically" ||
  window.location.pathname === "/mirror-svg-path-vertically.html" ||
  window.location.pathname === "/mirror-svg-vertically" ||
  window.location.pathname === "/mirror-svg-vertically.html";
const mirrorPathHMode =
  (!mirrorPathVMode &&
    (flipPathHMode ||
      document.body.classList.contains("mirror-path-page") ||
      document.body.classList.contains("mirror-svg-page"))) ||
  window.location.pathname === "/mirror-svg-path-horizontally" ||
  window.location.pathname === "/mirror-svg-path-horizontally.html" ||
  window.location.pathname === "/mirror-svg-horizontally" ||
  window.location.pathname === "/mirror-svg-horizontally.html";
const flipWording = flipPathVMode || flipPathHMode;
const viewboxIntentStartup =
  (document.body && document.body.getAttribute("data-viewbox-intent")) || "";
const cleanIntentStartup =
  (document.body && document.body.getAttribute("data-clean-intent")) || "";
const rotateIntentStartup =
  (document.body && document.body.getAttribute("data-rotate-intent")) || "";
const rotateSampleStartup =
  (document.body && document.body.getAttribute("data-rotate-sample")) || "";
const rotateDegreesStartup =
  (document.body && document.body.getAttribute("data-rotate-degrees")) || "";
const base64IntentStartup =
  (document.body && document.body.getAttribute("data-base64-intent")) || "";
const bgRemoveIntentStartup =
  (document.body && document.body.getAttribute("data-bg-remove-intent")) || "";
const strokeIntentStartup =
  (document.body && document.body.getAttribute("data-stroke-intent")) || "";
const scalePathIntentStartup =
  (document.body && document.body.getAttribute("data-scale-path-intent")) || "";
const translatePathIntentStartup =
  (document.body && document.body.getAttribute("data-translate-path-intent")) || "";
const gradientIntentStartup =
  (document.body && document.body.getAttribute("data-gradient-intent")) || "";
const pathEditIntentStartup =
  (document.body && document.body.getAttribute("data-path-edit-intent")) || "";
const startupSvg =
  sharedSvg ||
  (rotateIntentStartup && ROTATE_DEFAULT_SVGS[rotateSampleStartup]
    ? ROTATE_DEFAULT_SVGS[rotateSampleStartup]
    : viewboxIntentStartup && VIEWBOX_DEFAULT_SVGS[viewboxIntentStartup]
      ? VIEWBOX_DEFAULT_SVGS[viewboxIntentStartup]
      : cleanIntentStartup && CLEAN_DEFAULT_SVGS[cleanIntentStartup]
        ? CLEAN_DEFAULT_SVGS[cleanIntentStartup]
        : base64IntentStartup && BASE64_DEFAULT_SVGS[base64IntentStartup]
          ? BASE64_DEFAULT_SVGS[base64IntentStartup]
          : bgRemoveIntentStartup && BG_REMOVE_DEFAULT_SVGS[bgRemoveIntentStartup]
            ? BG_REMOVE_DEFAULT_SVGS[bgRemoveIntentStartup]
            : strokeIntentStartup && STROKE_DEFAULT_SVGS[strokeIntentStartup]
              ? STROKE_DEFAULT_SVGS[strokeIntentStartup]
              : scalePathIntentStartup && SCALE_PATH_DEFAULT_SVGS[scalePathIntentStartup]
                ? SCALE_PATH_DEFAULT_SVGS[scalePathIntentStartup]
                : translatePathIntentStartup && TRANSLATE_PATH_DEFAULT_SVGS[translatePathIntentStartup]
                  ? TRANSLATE_PATH_DEFAULT_SVGS[translatePathIntentStartup]
                  : gradientIntentStartup && GRADIENT_DEFAULT_SVGS[gradientIntentStartup]
                    ? GRADIENT_DEFAULT_SVGS[gradientIntentStartup]
                    : pathEditIntentStartup && PATH_EDIT_DEFAULT_SVGS[pathEditIntentStartup]
                      ? PATH_EDIT_DEFAULT_SVGS[pathEditIntentStartup]
                    : animationMode
          ? ANIMATION_DEFAULT_SVG
          : mirrorPathVMode
            ? MIRROR_V_DEFAULT_SVG
            : mirrorPathHMode
              ? MIRROR_DEFAULT_SVG
              : document.body.classList.contains("icon-editor-page")
                ? ICON_DEFAULT_SVG
                : DEFAULT_SVG);
showingStartupSample = !sharedSvg;
applyStartupSvg(
  startupSvg,
  sharedSvg
    ? "Loaded from share link"
    : rotateIntentStartup
      ? "Sample SVG — click the action button to rotate around center" +
        (rotateDegreesStartup ? " by " + rotateDegreesStartup + "°" : "")
      : viewboxIntentStartup
        ? "Sample SVG — click the action button to fix the viewBox"
        : cleanIntentStartup
          ? "Sample SVG — click the action button to clean it"
          : base64IntentStartup
            ? "Sample SVG — click the action button to copy Base64"
            : bgRemoveIntentStartup
              ? "Sample SVG — click the action button to remove the background"
              : strokeIntentStartup
                ? "Sample SVG — click the action button to change stroke color"
                : scalePathIntentStartup
                  ? "Sample SVG — click the action button to scale the path"
                  : translatePathIntentStartup
                    ? translatePathIntentStartup === "center-svg-path"
                      ? "Sample SVG — click the action button to center the path"
                      : "Sample SVG — click the action button to translate the path"
                    : gradientIntentStartup
                      ? GRADIENT_EDIT_INTENTS[gradientIntentStartup]
                        ? "Sample SVG — click the action button for this gradient tool"
                        : "Sample SVG — click the action button to apply a gradient"
                      : pathEditIntentStartup
                        ? "Sample SVG — click the action button to rewrite the path"
                      : mirrorPathVMode
            ? flipPathVMode
              ? "Sample arrow path — click Flip vertically to reflect it"
              : "Sample arrow path — click Mirror vertically to flip it"
            : mirrorPathHMode
              ? flipWording
                ? "Sample arrow path — click Flip horizontally to reflect it"
                : "Sample arrow path — click Mirror horizontally to flip it"
              : "Sample SVG — paste your own SVG to edit"
);
refreshSampleChip();

const SHARE_NOTICE_KEY = "svgeditor-share-notice-dismissed";
if (shareNotice) {
  let dismissed = false;
  try {
    dismissed = sessionStorage.getItem(SHARE_NOTICE_KEY) === "1";
  } catch (err) {
    dismissed = false;
  }
  shareNotice.hidden = !sharedSvg || dismissed;
}

if (shareNoticeDismiss) {
  shareNoticeDismiss.addEventListener("click", function () {
    if (shareNotice) shareNotice.hidden = true;
    try {
      sessionStorage.setItem(SHARE_NOTICE_KEY, "1");
    } catch (err) {
      /* ignore */
    }
  });
}

if (sharedRaw && extractSvgMarkup(sharedRaw) && !sharedSvg) {
  setStatus("error", "Share blocked — unsafe SVG content");
}

function warmEditorChrome() {
  scheduleRefreshEditorChrome();
}

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(warmEditorChrome, { timeout: 900 });
} else {
  window.setTimeout(warmEditorChrome, 120);
}

/* ——— Resizable panels ——— */
const SPLIT_MIN = 20;
const SPLIT_MAX = 80;
let splitPercent = 52;
let splitDragging = false;
let splitDragRect = null;

function applySplit(percent) {
  splitPercent = Math.min(SPLIT_MAX, Math.max(SPLIT_MIN, percent));
  if (workspace) {
    workspace.style.setProperty("--editor-split", splitPercent + "%");
  }
  if (splitter) {
    splitter.setAttribute("aria-valuenow", String(Math.round(splitPercent)));
  }
  invalidateEditorMetrics();
  // Defer layout reads until after the split write paints.
  requestAnimationFrame(function () {
    scheduleUpdateLineNumbers();
    syncEditorChromeScroll();
  });
}

function splitFromPointer(clientX) {
  if (!workspace) return;
  const rect =
    splitDragRect ||
    (splitDragRect = workspace.getBoundingClientRect());
  if (rect.width <= 0) return;
  applySplit(((clientX - rect.left) / rect.width) * 100);
}

if (splitter && workspace) {
  applySplit(splitPercent);

  splitter.addEventListener("pointerdown", function (event) {
    if (window.matchMedia("(max-width: 900px)").matches) return;
    splitDragRect = workspace.getBoundingClientRect();
    splitDragging = true;
    splitter.classList.add("is-active");
    document.body.classList.add("is-resizing");
    try {
      splitter.setPointerCapture(event.pointerId);
    } catch (err) {
      /* ignore */
    }
    splitFromPointer(event.clientX);
    event.preventDefault();
  });

  splitter.addEventListener("pointermove", function (event) {
    if (!splitDragging) return;
    splitFromPointer(event.clientX);
  });

  function endSplitDrag(event) {
    if (!splitDragging) return;
    splitDragging = false;
    splitDragRect = null;
    splitter.classList.remove("is-active");
    document.body.classList.remove("is-resizing");
    if (event && event.pointerId != null) {
      try {
        splitter.releasePointerCapture(event.pointerId);
      } catch (err) {
        /* ignore */
      }
    }
  }

  splitter.addEventListener("pointerup", endSplitDrag);
  splitter.addEventListener("pointercancel", endSplitDrag);

  splitter.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      applySplit(splitPercent - 2);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      applySplit(splitPercent + 2);
    } else if (event.key === "Home") {
      event.preventDefault();
      applySplit(SPLIT_MIN);
    } else if (event.key === "End") {
      event.preventDefault();
      applySplit(SPLIT_MAX);
    }
  });
}

/* ——— Chrome shutter (hide header / enlarge workspace) ——— */
const appChrome = document.getElementById("app-chrome");
const chromeShutter = document.getElementById("chrome-shutter");
const CHROME_STORAGE_KEY = "svgeditor-chrome-collapse-pct";
let chromeCollapsePx = 0;
let chromeCollapsePctValue = 0;
let chromeDragging = false;
let chromeDragStartY = 0;
let chromeDragStartCollapse = 0;
let chromeDragMoved = false;
let cachedChromeNatural = 0;

function measureChromeNaturalHeight() {
  if (!appChrome) return 0;
  cachedChromeNatural = Math.max(0, Math.round(appChrome.offsetHeight));
  return cachedChromeNatural;
}

function chromeNaturalHeight() {
  if (cachedChromeNatural > 0) return cachedChromeNatural;
  return measureChromeNaturalHeight();
}

function toggleChromeCollapse() {
  const natural = chromeNaturalHeight();
  if (natural <= 0) return;
  if (chromeCollapsePx >= natural - 1) {
    applyChromeCollapse(0);
  } else {
    applyChromeCollapse(natural);
  }
}

function applyChromeCollapse(px, opts) {
  const options = opts || {};
  const natural =
    options.natural != null ? Math.max(0, options.natural) : chromeNaturalHeight();
  if (options.natural != null) cachedChromeNatural = natural;
  const max = Math.max(0, natural);
  const nextPx = Math.min(max, Math.max(0, Math.round(px)));
  const nextPct = max > 0 ? Math.round((nextPx / max) * 100) : 0;
  const nextMax = max > 0 && nextPx >= max - 1;
  if (
    nextPx === chromeCollapsePx &&
    nextPct === chromeCollapsePctValue &&
    document.body.classList.contains("is-chrome-max") === nextMax
  ) {
    return;
  }
  chromeCollapsePx = nextPx;
  chromeCollapsePctValue = nextPct;
  document.body.style.setProperty("--chrome-collapse", chromeCollapsePx + "px");
  document.body.classList.toggle("is-chrome-max", nextMax);
  if (!options.skipStore) {
    try {
      localStorage.setItem(CHROME_STORAGE_KEY, String(chromeCollapsePctValue));
    } catch (err) {
      /* ignore */
    }
  }
  invalidateEditorMetrics();
  requestAnimationFrame(function () {
    scheduleUpdateLineNumbers();
    syncEditorChromeScroll();
  });
}

function applyChromeCollapsePct(pct, opts) {
  const options = opts || {};
  const natural =
    options.natural != null ? Math.max(0, options.natural) : chromeNaturalHeight();
  const clamped = Math.min(100, Math.max(0, Number(pct) || 0));
  applyChromeCollapse((natural * clamped) / 100, options);
}

function restoreChromeCollapse() {
  let pct = 0;
  try {
    const raw = localStorage.getItem(CHROME_STORAGE_KEY);
    if (raw != null && raw !== "") pct = Number(raw);
  } catch (err) {
    pct = 0;
  }
  applyChromeCollapsePct(pct, { skipStore: true });
}

if (appChrome && chromeShutter) {
  requestAnimationFrame(function () {
    restoreChromeCollapse();
  });

  chromeShutter.addEventListener("pointerdown", function (event) {
    if (event.button != null && event.button !== 0) return;
    chromeDragging = true;
    chromeDragMoved = false;
    chromeDragStartY = event.clientY;
    chromeDragStartCollapse = chromeCollapsePx;
    chromeShutter.classList.add("is-active");
    document.body.classList.add("is-chrome-resizing");
    try {
      chromeShutter.setPointerCapture(event.pointerId);
    } catch (err) {
      /* ignore */
    }
    event.preventDefault();
  });

  chromeShutter.addEventListener("pointermove", function (event) {
    if (!chromeDragging) return;
    const delta = chromeDragStartY - event.clientY;
    if (Math.abs(delta) >= 4) chromeDragMoved = true;
    applyChromeCollapse(chromeDragStartCollapse + delta);
  });

  function endChromeDrag(event) {
    if (!chromeDragging) return;
    chromeDragging = false;
    chromeShutter.classList.remove("is-active");
    document.body.classList.remove("is-chrome-resizing");
    if (event && event.pointerId != null) {
      try {
        chromeShutter.releasePointerCapture(event.pointerId);
      } catch (err) {
        /* ignore */
      }
    }
  }

  chromeShutter.addEventListener("pointerup", endChromeDrag);
  chromeShutter.addEventListener("pointercancel", endChromeDrag);

  chromeShutter.addEventListener("click", function (event) {
    if (chromeDragMoved) {
      chromeDragMoved = false;
      event.preventDefault();
      return;
    }
    event.preventDefault();
    toggleChromeCollapse();
  });

  chromeShutter.addEventListener("dblclick", function (event) {
    event.preventDefault();
    toggleChromeCollapse();
  });

  window.addEventListener("resize", function () {
    cachedChromeNatural = 0;
    requestAnimationFrame(function () {
      const natural = measureChromeNaturalHeight();
      applyChromeCollapsePct(chromeCollapsePctValue, {
        skipStore: true,
        natural: natural,
      });
    });
  });

  if (typeof ResizeObserver !== "undefined") {
    const chromeRo = new ResizeObserver(function (entries) {
      if (chromeDragging) return;
      const entry = entries && entries[0];
      let natural = 0;
      if (entry && entry.borderBoxSize && entry.borderBoxSize[0]) {
        natural = Math.max(0, Math.round(entry.borderBoxSize[0].blockSize));
      } else if (entry && entry.contentRect) {
        natural = Math.max(0, Math.round(entry.contentRect.height));
      }
      if (natural > 0) cachedChromeNatural = natural;
      applyChromeCollapsePct(chromeCollapsePctValue, {
        skipStore: true,
        natural: natural || chromeNaturalHeight(),
      });
    });
    chromeRo.observe(appChrome);
  }
}
