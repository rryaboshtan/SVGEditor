const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="plate" x1="24" y1="12" x2="176" y2="188" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0B1B33"/>
      <stop offset="0.55" stop-color="#102A4A"/>
      <stop offset="1" stop-color="#0E3A5C"/>
    </linearGradient>
    <linearGradient id="ring" x1="48" y1="42" x2="152" y2="158" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7DD3FC"/>
      <stop offset="0.45" stop-color="#38BDF8"/>
      <stop offset="1" stop-color="#2563EB"/>
    </linearGradient>
    <linearGradient id="core" x1="74" y1="68" x2="132" y2="136" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F0F9FF"/>
      <stop offset="1" stop-color="#BAE6FD"/>
    </linearGradient>
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3.2" result="b"/>
      <feMerge>
        <feMergeNode in="b"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="200" height="200" rx="52" fill="url(#plate)"/>
  <rect x="5" y="5" width="190" height="190" rx="48" stroke="#67E8F9" stroke-opacity="0.22" fill="none"/>
  <circle cx="100" cy="100" r="64" stroke="url(#ring)" stroke-width="10" fill="none" filter="url(#glow)"/>
  <circle cx="100" cy="100" r="41" stroke="#E0F2FE" stroke-opacity="0.35" stroke-width="5" fill="none"/>
  <path d="M100 56c20 13.2 32 26.4 32 42.4S120 141.2 100 154.4C80 141.2 68 128 68 98.4S80 69.2 100 56Z" fill="url(#core)"/>
  <circle cx="100" cy="100" r="13.5" fill="#0284C7"/>
  <circle cx="100" cy="100" r="6" fill="#F0F9FF"/>
  <circle cx="143" cy="62" r="8.5" fill="#38BDF8" filter="url(#glow)"/>
  <circle cx="58" cy="130" r="6.5" fill="#7DD3FC" fill-opacity="0.85"/>
</svg>`;

const editor = document.getElementById("editor");
const canvas = document.getElementById("preview-canvas");
const empty = document.getElementById("preview-empty");
const status = document.getElementById("preview-status");
const clearBtn = document.getElementById("btn-clear");
const previewStage = document.getElementById("preview-stage");

const SVG_NS = "http://www.w3.org/2000/svg";

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
}

function extractSvgMarkup(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const match = trimmed.match(/<svg\b[\s\S]*<\/svg>/i);
  return match ? match[0] : trimmed;
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

  return document.importNode(svg, true);
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
          opened.end = end;
          break;
        }
      }
      continue;
    }

    const entry = {
      name: name,
      start: start,
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
    const insideCaret = caret >= range.start && caret <= range.end;
    const overlapsSelection = selEnd !== caret && range.start < selEnd && range.end > caret;
    if (insideCaret || overlapsSelection) {
      best = i;
    }
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
    empty.hidden = false;
    previewSvg = null;
    elementRanges = [];
    clearHighlight();
    setStatus("empty", "Waiting for SVG");
    return;
  }

  try {
    const svg = parseSvg(markup);

    if (!svg.hasAttribute("xmlns")) {
      svg.setAttribute("xmlns", SVG_NS);
    }

    const ranges = collectElementRanges(markup).map(function (range) {
      return {
        name: range.name,
        start: range.start + Math.max(sourceOffset, 0),
        end: range.end + Math.max(sourceOffset, 0),
        index: range.index,
      };
    });

    const nodes = listPreviewElements(svg);
    nodes.forEach(function (node, index) {
      node.setAttribute("data-el-index", String(index));
      if (!DEF_TAGS.has(node.localName.toLowerCase())) {
        node.style.cursor = "pointer";
      }
    });

    canvas.replaceChildren(svg);
    empty.hidden = true;
    previewSvg = svg;
    elementRanges = ranges;
    setStatus("ok", "Live preview");

    if (wasInspecting) {
      requestAnimationFrame(selectionFromCaret);
    } else {
      selectedIndex = -1;
      inspectActive = false;
      const box = ensureHighlightBox();
      box.hidden = true;
    }
  } catch {
    canvas.replaceChildren();
    empty.hidden = false;
    empty.textContent = "Couldn’t parse this SVG. Check for a missing tag or typo.";
    previewSvg = null;
    elementRanges = [];
    clearHighlight();
    setStatus("error", "Invalid SVG");
  }
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
  editor.focus();
  editor.setSelectionRange(start, end);
  empty.textContent = "Your SVG preview will appear here.";
  clearHighlight();
  scheduleRender();
}

function undoEdit() {
  flushHistory();
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
  if (historyIndex > 0) return true;
  const current = history[historyIndex];
  return Boolean(current && current.value !== editor.value);
}

function canRedo() {
  return historyIndex < history.length - 1;
}

editor.addEventListener("input", function () {
  scheduleRender();
  scheduleCommitHistory();
});
editor.addEventListener("click", scheduleSelection);
editor.addEventListener("keyup", scheduleSelection);
editor.addEventListener("select", scheduleSelection);
editor.addEventListener("mouseup", scheduleSelection);

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
    flushHistory();
    const selectionStart = editor.selectionStart;
    const selectionEnd = editor.selectionEnd;
    const value = editor.value;
    editor.value = value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);
    editor.selectionStart = editor.selectionEnd = selectionStart + 2;
    commitHistory();
    scheduleRender();
    return;
  }

  scheduleSelection();
});

clearBtn.addEventListener("click", function () {
  flushHistory();
  if (!editor.value.length) return;
  editor.value = "";
  empty.textContent = "Your SVG preview will appear here.";
  clearHighlight();
  editor.focus();
  editor.setSelectionRange(0, 0);
  commitHistory();
  scheduleRender();
});

canvas.addEventListener("click", function (event) {
  if (!previewSvg) return;
  let node = event.target;

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

window.addEventListener("resize", function () {
  if (inspectActive) scheduleSelection();
});
previewStage.addEventListener("scroll", function () {
  if (inspectActive) scheduleSelection();
});

editor.value = DEFAULT_SVG;
commitHistory();
renderPreview(DEFAULT_SVG);
