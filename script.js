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
  "Paste or upload SVG on the left to preview live. Share a link, or export React JSX, " +
  "React Native, PNG, or Data URI — free, in your browser." +
  "</p>" +
  '<p class="preview-empty-links">' +
  '<a href="/blog/svg-to-react">SVG to React guide</a>' +
  ' · ' +
  '<a href="/blog/svg-to-png">SVG to PNG guide</a>' +
  "</p>" +
  "</div>";

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
const ZOOM_MAX = 4;
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

function invalidateEditorMetrics() {
  editorMetricsCache = null;
}

function getEditorMetrics() {
  if (editorMetricsCache) return editorMetricsCache;
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
  return editorMetricsCache;
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
    setStatus("ok", "No painted use of <" + tag + ">");
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

  positionHighlightTargets(paintTargets);

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
    positionHighlightTargets(selectedPaintTargets);
    return;
  }

  applySelection(best);
}

function renderPreview(source) {
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
        if (!DEF_TAGS.has(node.localName.toLowerCase())) {
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

    try {
      updateExports(exportMarkup);
    } catch (err) {
      console.error(err);
    }

    if (stripped > 0) {
      setStatus("ok", "Unsafe SVG parts stripped");
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
    showEmptyMessage("Couldn’t parse this SVG. Check for a missing tag or typo.");
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
  updateLineNumbers();
  updateSyntaxHighlight();
  syncEditorChromeScroll();
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
    positionHighlightTargets(selectedPaintTargets);
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
  refreshEditorChrome();
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

function markUserEdited() {
  userEdited = true;
}

function scheduleSelectionSafe() {
  if (suppressSelectionSync || applyingHistory) return;
  scheduleSelection();
}

editor.addEventListener("input", function () {
  markUserEdited();
  refreshEditorChrome();
  scheduleRender();
  scheduleCommitHistory();
});
editor.addEventListener("scroll", syncEditorChromeScroll);
editor.addEventListener("keyup", function (event) {
  updateLineNumbers();
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

  if (event.key === "Tab") {
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
    refreshEditorChrome();
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

clearBtn.addEventListener("click", function () {
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
  refreshEditorChrome();
});

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
        setStatus("error", "Upload blocked: unsafe SVG");
        return;
      }
      markUserEdited();
      flushHistory();
      editor.value = markup;
      editor.focus();
      editor.setSelectionRange(0, 0);
      commitHistory();
      refreshEditorChrome();
      scheduleRender();
      clearHighlight();
      setStatus("ok", "Uploaded " + file.name);
    };
    reader.onerror = function () {
      setStatus("error", "Upload failed");
    };
    reader.readAsText(file);
  });
}

if (downloadSvgBtn) {
  downloadSvgBtn.addEventListener("click", function () {
    let markup = extractSvgMarkup(editor.value) || editor.value.trim();
    if (!markup) {
      setStatus("empty", "Nothing to download");
      return;
    }

    try {
      markup = sanitizeSvgSource(markup) || markup;
    } catch (err) {
      setStatus("error", "Download blocked: unsafe SVG");
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
  if (!result || result.error === "empty") return "Nothing to share";
  if (result.error === "too_large") {
    return "SVG too large for a share link (try a simpler file)";
  }
  if (result.error === "missing_codec") return "Share is unavailable";
  return "Couldn’t create share link";
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
  btn.classList.add("is-copied");
  labelEl.textContent = label;
  window.setTimeout(function () {
    btn.classList.remove("is-copied");
    labelEl.textContent = original;
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
        setStatus("ok", "iframe code copied");
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
  updateLineNumbers();
  if (inspectActive) scheduleSelection();
});

if (typeof ResizeObserver !== "undefined") {
  new ResizeObserver(function () {
    invalidateEditorMetrics();
    updateLineNumbers();
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
  if (tab === "data-uri") return "Data URI";
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
    const uri = buildDataUri(markup);
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

exportTabs.forEach(function (btn) {
  btn.addEventListener("click", function () {
    setActiveTab(btn.getAttribute("data-tab"));
  });
});

dataUriFormatBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    setDataUriFormat(btn.getAttribute("data-uri-format"));
  });
});

document.querySelectorAll(".btn-copy[data-copy]").forEach(function (btn) {
  btn.addEventListener("click", async function () {
    const targetId = btn.getAttribute("data-copy");
    const el = document.getElementById(targetId);
    if (!el) return;
    const text = el.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      btn.classList.add("is-copied");
      btn.textContent = "Copied";
      setTimeout(function () {
        btn.classList.remove("is-copied");
        btn.textContent = "Copy";
      }, 1200);
    } catch (err) {
      btn.textContent = "Failed";
      setTimeout(function () {
        btn.textContent = "Copy";
      }, 1200);
    }
  });
});

if (downloadPngBtn) {
  downloadPngBtn.disabled = true;
  downloadPngBtn.addEventListener("click", function () {
    if (!pngCanvas.width || !pngCanvas.height || pngEmpty && !pngEmpty.hidden) return;
    const link = document.createElement("a");
    link.download = "svgeditor-export.png";
    link.href = pngCanvas.toDataURL("image/png");
    link.click();
  });
}

setActiveTab(document.body.getAttribute("data-default-tab") || "preview");

/* ——— Mobile: Edit | Preview (single panel under 900px) ——— */
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
      updateLineNumbers();
      if (latestMarkup) {
        if (activeTab === "png" || activeTab === "preview") {
          updateExports(latestMarkup);
        }
      }
      if (inspectActive) scheduleSelection();
    });
  } else {
    window.requestAnimationFrame(function () {
      updateLineNumbers();
      if (mobileMq.matches) editor.focus();
    });
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
  renderPreview(markup);
  refreshEditorChrome();
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

const startupSvg = sharedSvg || DEFAULT_SVG;
applyStartupSvg(startupSvg, sharedSvg ? "Loaded from share link" : null);

if (shareNotice) {
  shareNotice.hidden = !sharedSvg;
}

if (sharedRaw && extractSvgMarkup(sharedRaw) && !sharedSvg) {
  setStatus("error", "Share link blocked: unsafe SVG");
}

function warmEditorChrome() {
  refreshEditorChrome();
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
    updateLineNumbers();
    syncEditorChromeScroll();
  });
}

function splitFromPointer(clientX) {
  if (!workspace) return;
  const rect = workspace.getBoundingClientRect();
  if (rect.width <= 0) return;
  applySplit(((clientX - rect.left) / rect.width) * 100);
}

if (splitter && workspace) {
  applySplit(splitPercent);

  splitter.addEventListener("pointerdown", function (event) {
    if (window.matchMedia("(max-width: 900px)").matches) return;
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
