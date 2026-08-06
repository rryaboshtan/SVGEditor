(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var ZOOM_MIN = 0.5;
  var ZOOM_MAX = 3;
  var ZOOM_STEP = 0.25;

  var stage = document.getElementById("embed-stage");
  var canvas = document.getElementById("embed-canvas");
  var empty = document.getElementById("embed-empty");
  var editLink = document.getElementById("embed-edit");
  var homeLink = document.getElementById("embed-home");
  var zoomInBtn = document.getElementById("embed-zoom-in");
  var zoomOutBtn = document.getElementById("embed-zoom-out");
  var zoomResetBtn = document.getElementById("embed-zoom-reset");
  var bgButtons = document.querySelectorAll(".embed-tool[data-bg]");
  var footerNote = document.querySelector(".embed-footer-note");

  var zoom = 1;
  var previewSvg = null;
  var editorUrl = new URL("./", window.location.href).href;

  function extractSvgMarkup(raw) {
    var text = String(raw || "");
    var match = text.match(/<svg\b[\s\S]*?<\/svg>/i);
    return match ? match[0] : "";
  }

  function sanitizeMarkup(markup) {
    if (!markup) return "";
    if (typeof SvgSanitize === "undefined") return markup;
    return SvgSanitize.sanitizeMarkupOrThrow(markup, { share: true });
  }

  function parseSvg(markup) {
    var cleaned = sanitizeMarkup(markup);
    var doc = new DOMParser().parseFromString(cleaned, "image/svg+xml");
    var svg = doc.documentElement;
    if (!svg || svg.nodeName.toLowerCase() !== "svg" || doc.querySelector("parsererror")) {
      throw new Error("Invalid SVG");
    }
    if (typeof SvgSanitize !== "undefined") {
      SvgSanitize.sanitizeElement(svg, { share: true });
    }
    return document.importNode(svg, true);
  }

  function applyZoom() {
    if (previewSvg) {
      previewSvg.style.transform = "scale(" + zoom + ")";
    }
    if (zoomResetBtn) {
      zoomResetBtn.textContent = Math.round(zoom * 100) + "%";
    }
  }

  function setZoom(next) {
    zoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next));
    applyZoom();
  }

  function setBackground(bg) {
    if (!stage) return;
    if (bg !== "dark" && bg !== "black" && bg !== "white" && bg !== "checker") return;
    if (bg === "black") bg = "dark";
    if (bg === "transparent") bg = "checker";
    stage.setAttribute("data-bg", bg);
    bgButtons.forEach(function (btn) {
      var active = btn.getAttribute("data-bg") === bg;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function setBackgroundFromQuery() {
    try {
      var bg = new URLSearchParams(window.location.search).get("bg");
      if (bg) setBackground(bg);
    } catch (err) {
      /* ignore */
    }
  }

  function render(source) {
    var markup = extractSvgMarkup(source) || String(source || "").trim();
    previewSvg = null;

    if (!markup) {
      canvas.replaceChildren();
      empty.hidden = false;
      empty.textContent = "No SVG in this embed link.";
      return false;
    }

    try {
      var svg = parseSvg(markup);
      if (!svg.hasAttribute("xmlns")) {
        svg.setAttribute("xmlns", SVG_NS);
      }
      canvas.replaceChildren(svg);
      previewSvg = svg;
      empty.hidden = true;
      applyZoom();
      return true;
    } catch (err) {
      canvas.replaceChildren();
      empty.hidden = false;
      empty.textContent = "Couldn’t display this SVG (invalid or blocked).";
      return false;
    }
  }

  function wireChrome() {
    if (typeof ShareCodec !== "undefined") {
      var payload = ShareCodec.readPayloadFromLocation(window.location) || "";
      if (payload) {
        editorUrl = ShareCodec.buildEditorUrl(payload, window.location);
      }
    }

    if (homeLink) homeLink.href = new URL("./", window.location.href).href;
    if (editLink) editLink.href = editorUrl;

    if (zoomInBtn) {
      zoomInBtn.addEventListener("click", function () {
        setZoom(zoom + ZOOM_STEP);
      });
    }
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener("click", function () {
        setZoom(zoom - ZOOM_STEP);
      });
    }
    if (zoomResetBtn) {
      zoomResetBtn.addEventListener("click", function () {
        setZoom(1);
      });
    }

    bgButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setBackground(btn.getAttribute("data-bg"));
      });
    });

    if (stage) {
      stage.addEventListener(
        "click",
        function (event) {
          var el = event.target;
          while (el && el !== stage) {
            if (el.localName && String(el.localName).toLowerCase() === "a") {
              event.preventDefault();
              event.stopPropagation();
              return;
            }
            el = el.parentElement || el.parentNode;
          }
        },
        true
      );

      // Ctrl/Cmd + wheel zooms when pointer is over the embed (works on host pages too)
      stage.addEventListener(
        "wheel",
        function (event) {
          if (!(event.ctrlKey || event.metaKey)) return;
          event.preventDefault();
          var direction = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
          setZoom(zoom + direction);
        },
        { passive: false }
      );

      // Pinch zoom on mobile
      var pinchActive = false;
      var pinchStartDist = 0;
      var pinchStartZoom = 1;

      function pinchDist(a, b) {
        var dx = a.clientX - b.clientX;
        var dy = a.clientY - b.clientY;
        return Math.sqrt(dx * dx + dy * dy);
      }

      var pinchTarget = canvas || stage;
      pinchTarget.addEventListener(
        "touchstart",
        function (event) {
          if (!previewSvg || event.touches.length !== 2) return;
          event.preventDefault();
          pinchActive = true;
          pinchStartDist = Math.max(1, pinchDist(event.touches[0], event.touches[1]));
          pinchStartZoom = zoom;
        },
        { passive: false }
      );
      pinchTarget.addEventListener(
        "touchmove",
        function (event) {
          if (!pinchActive || event.touches.length < 2) return;
          event.preventDefault();
          var dist = Math.max(1, pinchDist(event.touches[0], event.touches[1]));
          setZoom(pinchStartZoom * (dist / pinchStartDist));
        },
        { passive: false }
      );
      pinchTarget.addEventListener(
        "touchend",
        function (event) {
          if (event.touches.length < 2) pinchActive = false;
        },
        { passive: true }
      );
      pinchTarget.addEventListener(
        "touchcancel",
        function () {
          pinchActive = false;
        },
        { passive: true }
      );
    }
  }

  wireChrome();
  setBackgroundFromQuery();
  applyZoom();

  var svgText = typeof ShareCodec !== "undefined" ? ShareCodec.decodeFromLocation(window.location) : "";
  var ok = render(svgText);
  if (footerNote) {
    footerNote.textContent = ok ? "Share link · untrusted preview" : "Embed";
  }
})();
