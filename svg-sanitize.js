/**
 * SVG XSS sanitizer — strips executable / active content before DOM insert,
 * share encoding, data-URI export, and downloads.
 */
(function (global) {
  "use strict";

  var FORBIDDEN_TAGS = {
    script: true,
    foreignobject: true,
    iframe: true,
    embed: true,
    object: true,
    applet: true,
    link: true,
    meta: true,
    base: true,
    form: true,
    input: true,
    button: true,
    textarea: true,
    select: true,
    option: true,
    frame: true,
    frameset: true,
    handler: true,
    listener: true,
    noscript: true,
    template: true,
    video: true,
    audio: true,
    source: true,
    track: true,
  };

  var URL_ATTRS = {
    href: true,
    src: true,
    xlinkhref: true,
    "xlink:href": true,
    data: true,
    action: true,
    formaction: true,
    poster: true,
    srcset: true,
  };

  var ANIM_VALUE_ATTRS = {
    from: true,
    to: true,
    values: true,
    by: true,
  };

  function localName(node) {
    return String(node.localName || node.nodeName || "")
      .replace(/^.*:/, "")
      .toLowerCase();
  }

  function attrKey(name) {
    return String(name || "")
      .replace(/^.*:/, "")
      .toLowerCase();
  }

  function normalizeUrl(value) {
    return String(value || "")
      .replace(/[\u0000-\u001F\u007F\u200B-\u200D\uFEFF]/g, "")
      .trim();
  }

  function compactUrl(value) {
    return normalizeUrl(value).replace(/\s+/g, "").toLowerCase();
  }

  /**
   * @param {string} value
   * @param {"use"|"image"|"link"|"css"|"generic"} kind
   */
  function isSafeUrl(value, kind) {
    var raw = normalizeUrl(value);
    if (!raw) return kind === "use" || kind === "link";

    var lower = compactUrl(raw);

    if (lower.indexOf("javascript:") === 0) return false;
    if (lower.indexOf("vbscript:") === 0) return false;
    if (lower.indexOf("file:") === 0) return false;

    if (lower.indexOf("data:") === 0) {
      // Nested SVG / HTML in data: can carry scripts — block.
      // Allow only common raster image data URIs.
      return /^data:image\/(png|jpe?g|gif|webp|bmp|x-icon|vnd\.microsoft\.icon)[;,]/i.test(lower);
    }

    if (lower.charAt(0) === "#") return true;

    if (kind === "use") {
      // External <use> can pull remote SVG content — fragments only.
      return false;
    }

    if (/^https?:\/\//i.test(lower)) {
      return kind === "image" || kind === "link" || kind === "css";
    }

    // Protocol-relative //evil.com
    if (lower.indexOf("//") === 0) return false;

    // Relative path / same-folder asset
    if (/^[./A-Za-z0-9_@%+\-]+/.test(raw) && lower.indexOf(":") === -1) {
      return kind === "image" || kind === "link" || kind === "css";
    }

    return false;
  }

  function sanitizeCssText(css) {
    var text = String(css || "")
      .replace(/@import\b[^;]*/gi, "/* blocked import */")
      .replace(/expression\s*\(/gi, "blocked(")
      .replace(/-moz-binding\s*:/gi, "blocked:")
      .replace(/behavior\s*:/gi, "blocked:");
    return sanitizeCssUrls(text);
  }

  function sanitizeCssUrls(text) {
    var out = "";
    var i = 0;
    var lower = text.toLowerCase();
    while (i < text.length) {
      var idx = lower.indexOf("url(", i);
      if (idx === -1) {
        out += text.slice(i);
        break;
      }
      out += text.slice(i, idx);
      var start = idx + 4;
      var j = start;
      var depth = 1;
      var quote = null;
      for (; j < text.length; j++) {
        var ch = text.charAt(j);
        if (quote) {
          if (ch === "\\" && j + 1 < text.length) {
            j += 1;
            continue;
          }
          if (ch === quote) quote = null;
          continue;
        }
        if (ch === "\"" || ch === "'") {
          quote = ch;
          continue;
        }
        if (ch === "(") depth += 1;
        else if (ch === ")") {
          depth -= 1;
          if (depth === 0) break;
        }
      }
      var inner = text.slice(start, j).trim().replace(/^['"]|['"]$/g, "");
      if (isSafeUrl(inner, "css")) {
        out += "url(\"" + String(inner).replace(/"/g, "") + "\")";
      } else {
        out += "url(about:blank)";
      }
      i = depth === 0 ? j + 1 : text.length;
      lower = text.toLowerCase();
    }
    return out;
  }

  function urlKindForElement(tag, attr) {
    if (tag === "use") return "use";
    if (tag === "a") return "link";
    if (tag === "image" || tag === "feimage") return "image";
    if (attr === "href" || attr === "xlink:href" || attr === "xlinkhref") {
      if (tag === "image" || tag === "feimage") return "image";
      if (tag === "a") return "link";
      if (tag === "use") return "use";
    }
    if (attr === "src" || attr === "poster") return "image";
    return "generic";
  }

  function shouldDropUrlAttr(tag, attr, value) {
    var kind = urlKindForElement(tag, attr);
    if (kind === "generic") {
      // Unknown URL-bearing attr: only allow fragments / empty.
      var lower = compactUrl(value);
      return !(lower === "" || lower.charAt(0) === "#");
    }
    return !isSafeUrl(value, kind);
  }

  function sanitizeAttributes(el) {
    var tag = localName(el);
    var attrs = Array.prototype.slice.call(el.attributes || []);

    attrs.forEach(function (attr) {
      var name = attr.name;
      var key = attrKey(name);
      var value = attr.value;

      // Event handlers: onclick, onload, on* (incl. namespaced)
      if (/^on/i.test(key) || /^on/i.test(name.replace(/^.*:/, ""))) {
        el.removeAttribute(name);
        return;
      }

      if (key === "style") {
        var cleaned = sanitizeCssText(value);
        if (!cleaned.trim()) el.removeAttribute(name);
        else el.setAttribute(name, cleaned);
        return;
      }

      if (URL_ATTRS[key] || URL_ATTRS[name.toLowerCase()]) {
        if (shouldDropUrlAttr(tag, key, value)) {
          el.removeAttribute(name);
        }
        return;
      }

      // Animations that retarget href/src to javascript:
      if (ANIM_VALUE_ATTRS[key]) {
        var attrName = (el.getAttribute("attributeName") || el.getAttribute("attributeType") || "").toLowerCase();
        if (/href|src|xlink:href/.test(attrName) || /javascript:|vbscript:|data:/i.test(value)) {
          if (!isSafeUrl(value.split(";")[0], "generic") && /javascript:|vbscript:|data:/i.test(compactUrl(value))) {
            el.removeAttribute(name);
          } else if (/href|src/.test(attrName) && shouldDropUrlAttr(tag, "href", value.split(";")[0])) {
            el.removeAttribute(name);
          }
        }
      }
    });

    // If animate/set targets a URL attribute with no remaining safe values, drop element later via empty check — optional.
    if ((tag === "animate" || tag === "set" || tag === "animatetransform") && el.hasAttribute("attributeName")) {
      var target = String(el.getAttribute("attributeName") || "").toLowerCase();
      if (target === "href" || target === "xlink:href" || target === "src") {
        ["from", "to", "values", "by"].forEach(function (a) {
          if (!el.hasAttribute(a)) return;
          var parts = String(el.getAttribute(a)).split(";");
          var unsafe = parts.some(function (part) {
            return shouldDropUrlAttr("use", "href", part);
          });
          if (unsafe) el.removeAttribute(a);
        });
      }
    }
  }

  function sanitizeTree(root) {
    var removed = 0;
    var walker = [];
    var node = root;

    // Depth-first collect elements (snapshot) so removals are safe.
    function collect(el) {
      walker.push(el);
      var child = el.firstElementChild;
      while (child) {
        collect(child);
        child = child.nextElementSibling;
      }
    }
    collect(root);

    // Remove forbidden tags from deepest first
    for (var i = walker.length - 1; i >= 0; i--) {
      var el = walker[i];
      if (el === root) continue;
      var tag = localName(el);
      if (FORBIDDEN_TAGS[tag]) {
        if (el.parentNode) el.parentNode.removeChild(el);
        removed += 1;
        continue;
      }
      if (tag === "style") {
        el.textContent = sanitizeCssText(el.textContent || "");
      }
      sanitizeAttributes(el);
    }

    sanitizeAttributes(root);
    return removed;
  }

  function parseSvgDocument(markup) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(String(markup || ""), "image/svg+xml");
    if (doc.querySelector("parsererror")) {
      throw new Error("Invalid SVG markup");
    }
    var svg = doc.documentElement;
    if (!svg || localName(svg) !== "svg") {
      throw new Error("Root element must be <svg>");
    }
    return { doc: doc, svg: svg };
  }

  function sanitizeMarkup(markup) {
    var parsed = parseSvgDocument(markup);
    var removed = sanitizeTree(parsed.svg);
    var out = new XMLSerializer().serializeToString(parsed.svg);
    return { ok: true, markup: out, removed: removed };
  }

  function sanitizeMarkupOrThrow(markup) {
    var result = sanitizeMarkup(markup);
    return result.markup;
  }

  function sanitizeElement(svgEl) {
    if (!svgEl) return 0;
    return sanitizeTree(svgEl);
  }

  global.SvgSanitize = {
    sanitizeMarkup: sanitizeMarkup,
    sanitizeMarkupOrThrow: sanitizeMarkupOrThrow,
    sanitizeElement: sanitizeElement,
    isSafeUrl: isSafeUrl,
  };
})(typeof window !== "undefined" ? window : globalThis);
