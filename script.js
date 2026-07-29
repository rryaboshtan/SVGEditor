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

const SVG_NS = "http://www.w3.org/2000/svg";

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

function renderPreview(source) {
  const markup = extractSvgMarkup(source);

  if (!markup) {
    canvas.replaceChildren();
    empty.hidden = false;
    setStatus("empty", "Waiting for SVG");
    return;
  }

  try {
    const svg = parseSvg(markup);

    if (!svg.hasAttribute("xmlns")) {
      svg.setAttribute("xmlns", SVG_NS);
    }

    canvas.replaceChildren(svg);
    empty.hidden = true;
    setStatus("ok", "Live preview");
  } catch {
    canvas.replaceChildren();
    empty.hidden = false;
    empty.textContent = "Couldn’t parse this SVG. Check for a missing tag or typo.";
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

editor.addEventListener("input", scheduleRender);

editor.addEventListener("keydown", function (event) {
  if (event.key !== "Tab") return;
  event.preventDefault();
  const selectionStart = editor.selectionStart;
  const selectionEnd = editor.selectionEnd;
  const value = editor.value;
  editor.value = value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);
  editor.selectionStart = editor.selectionEnd = selectionStart + 2;
  scheduleRender();
});

clearBtn.addEventListener("click", function () {
  editor.value = "";
  empty.textContent = "Your SVG preview will appear here.";
  editor.focus();
  scheduleRender();
});

editor.value = DEFAULT_SVG;
renderPreview(DEFAULT_SVG);
