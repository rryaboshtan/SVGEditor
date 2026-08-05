/**
 * Client-side SVG ↔ URL hash codec (LZ-String).
 * Hash shape: #s=<compressToEncodedURIComponent(svg)>
 */
(function (global) {
  "use strict";

  var MAX_PAYLOAD = 7000;

  function requireLZ() {
    if (typeof global.LZString === "undefined") {
      throw new Error("LZString is not loaded");
    }
    return global.LZString;
  }

  function encodeSvg(svg) {
    var text = String(svg || "").trim();
    if (!text) {
      return { ok: false, error: "empty" };
    }

    var payload = requireLZ().compressToEncodedURIComponent(text);
    if (!payload) {
      return { ok: false, error: "encode_failed" };
    }
    if (payload.length > MAX_PAYLOAD) {
      return {
        ok: false,
        error: "too_large",
        length: payload.length,
        max: MAX_PAYLOAD,
      };
    }
    return { ok: true, payload: payload, length: payload.length };
  }

  function decodePayload(payload) {
    if (!payload) return "";
    try {
      return requireLZ().decompressFromEncodedURIComponent(String(payload)) || "";
    } catch (err) {
      return "";
    }
  }

  function readPayloadFromLocation(loc) {
    loc = loc || global.location;

    try {
      var params = new URLSearchParams(loc.search || "");
      var fromQuery = params.get("s");
      if (fromQuery) return fromQuery;
    } catch (err) {
      /* ignore */
    }

    var hash = String(loc.hash || "").replace(/^#/, "");
    if (hash.indexOf("s=") === 0) {
      return hash.slice(2);
    }
    return "";
  }

  function decodeFromLocation(loc) {
    return decodePayload(readPayloadFromLocation(loc));
  }

  function buildEditorUrl(payload, loc) {
    loc = loc || global.location;
    // Always point at the main app, never embed.html
    var url = new URL("./", loc.href);
    // If we are currently on embed.html, "./" resolves next to it (correct: index/dir root).
    // Normalize explicit embed path → site root / index.
    if (/embed\.html$/i.test(url.pathname)) {
      url.pathname = url.pathname.replace(/embed\.html$/i, "");
    }
    url.search = "";
    url.hash = "s=" + payload;
    return url.href;
  }

  function buildEmbedUrl(payload, loc) {
    loc = loc || global.location;
    // Query param (not hash): some hosts/previews break iframe URLs that rely on #fragment
    var url = new URL("embed.html", loc.href);
    url.hash = "";
    url.search = "";
    url.searchParams.set("s", payload);
    return url.href;
  }

  function buildIframeSnippet(embedUrl, height) {
    height = height || 320;
    return (
      '<div style="background:#061018;border-radius:12px;overflow:hidden;line-height:0;max-width:640px">\n' +
      '  <iframe\n' +
      '    src="' +
      embedUrl +
      '"\n' +
      '    width="100%"\n' +
      '    height="' +
      height +
      '"\n' +
      '    style="border:0;width:100%;height:' +
      height +
      "px;background:#061018;color-scheme:dark;display:block;opacity:1;pointer-events:auto\"\n" +
      '    allow="clipboard-write"\n' +
      '    loading="eager"\n' +
      '    referrerpolicy="no-referrer"\n' +
      '    title="SVGEditor embed"\n' +
      "  ></iframe>\n" +
      "</div>"
    );
  }

  global.ShareCodec = {
    MAX_PAYLOAD: MAX_PAYLOAD,
    encodeSvg: encodeSvg,
    decodePayload: decodePayload,
    readPayloadFromLocation: readPayloadFromLocation,
    decodeFromLocation: decodeFromLocation,
    buildEditorUrl: buildEditorUrl,
    buildEmbedUrl: buildEmbedUrl,
    buildIframeSnippet: buildIframeSnippet,
  };
})(typeof window !== "undefined" ? window : globalThis);
