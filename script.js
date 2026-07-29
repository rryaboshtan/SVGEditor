const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bg" x1="24" y1="12" x2="176" y2="188" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1d4ed8"/>
      <stop offset="0.55" stop-color="#2563eb"/>
      <stop offset="1" stop-color="#38bdf8"/>
    </linearGradient>
    <linearGradient id="shine" x1="48" y1="24" x2="140" y2="120" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fff" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="44" fill="url(#bg)"/>
  <rect width="200" height="200" rx="44" fill="url(#shine)"/>
  <path d="M46 142 L82 82c4-8 16-8 20 0l22 36 14-22c4-7 15-7 19 0L166 142H46z" fill="#fff" fill-opacity="0.95"/>
  <circle cx="138" cy="64" r="16" fill="#e0f2fe"/>
  <circle cx="138" cy="64" r="7" fill="#1e3a8a" fill-opacity="0.35"/>
</svg>`;

const editor = document.getElementById("editor");
const canvas = document.getElementById("preview-canvas");
const empty = document.getElementById("preview-empty");
const status = document.getElementById("preview-status");
const clearBtn = document.getElementById("btn-clear");
const previewStage = document.getElementById("preview-stage");

const SVG_NS = "http://www.w3.org/2000/svg";

/** Tags that are not drawable shapes — still trackable, but outline is often empty. */
const NON_VISUAL = new Set([
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
]);

let elementRanges = [];
let selectedIndex = -1;
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

function positionHighlight(target) {
  const box = ensureHighlightBox();
  if (!target || !previewStage.contains(target)) {
    box.hidden = true;
    return;
  }

  let rect;
  try {
    rect = target.getBoundingClientRect();
  } catch {
    box.hidden = true;
    return;
  }

  if (!rect || (rect.width < 0.5 && rect.height < 0.5)) {
    box.hidden = true;
    return;
  }

  const stageRect = previewStage.getBoundingClientRect();
  const pad = 6;
  box.style.left = rect.left - stageRect.left - pad + "px";
  box.style.top = rect.top - stageRect.top - pad + "px";
  box.style.width = Math.max(rect.width + pad * 2, 8) + "px";
  box.style.height = Math.max(rect.height + pad * 2, 8) + "px";
  box.hidden = false;
}

function isSpotlightIndex(index) {
  if (index < 0 || index >= elementRanges.length) return false;
  const range = elementRanges[index];
  // Root <svg> or non-visual tags = no spotlight / clear dimming
  if (index === 0 && range.name === "svg") return false;
  if (NON_VISUAL.has(range.name)) return false;
  return true;
}

function applySelection(index) {
  if (!previewSvg || !isSpotlightIndex(index)) {
    clearHighlight();
    return;
  }

  const nodes = listPreviewElements(previewSvg);
  const target = nodes[index];
  if (!target) {
    clearHighlight();
    return;
  }

  selectedIndex = index;
  inspectActive = true;
  previewSvg.classList.add("is-inspecting");
  previewSvg.querySelectorAll(".is-selected").forEach(function (node) {
    node.classList.remove("is-selected");
  });
  target.classList.add("is-selected");

  positionHighlight(target);

  const tag = elementRanges[index].name;
  setStatus("ok", "Selected <" + tag + ">");
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
    const nodes = listPreviewElements(previewSvg);
    positionHighlight(nodes[best]);
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
      if (!NON_VISUAL.has(node.localName.toLowerCase())) {
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

editor.addEventListener("input", scheduleRender);
editor.addEventListener("click", scheduleSelection);
editor.addEventListener("keyup", scheduleSelection);
editor.addEventListener("select", scheduleSelection);
editor.addEventListener("mouseup", scheduleSelection);

editor.addEventListener("keydown", function (event) {
  if (event.key === "Tab") {
    event.preventDefault();
    const selectionStart = editor.selectionStart;
    const selectionEnd = editor.selectionEnd;
    const value = editor.value;
    editor.value = value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);
    editor.selectionStart = editor.selectionEnd = selectionStart + 2;
    scheduleRender();
    return;
  }
  // Arrow keys etc. update selection only if already inspecting or moving into a tag
  scheduleSelection();
});

clearBtn.addEventListener("click", function () {
  editor.value = "";
  empty.textContent = "Your SVG preview will appear here.";
  editor.focus();
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
renderPreview(DEFAULT_SVG);
