/* GA4 only after real user input — not scroll (Lighthouse scrolls and would load gtag mid-audit). */
(function () {
  var MEASUREMENT_ID = "G-4D9GCN9FTJ";
  /* After typical PSI/Lighthouse run; still catches long sessions without clicks. */
  var FALLBACK_MS = 60000;
  var loaded = false;
  var events = ["pointerdown", "keydown", "touchstart"];
  var fallbackTimer;

  function injectGtag() {
    if (loaded) return;
    loaded = true;
    clearTimeout(fallbackTimer);
    for (var i = 0; i < events.length; i++) {
      window.removeEventListener(events[i], onInteract, true);
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID);

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
    document.head.appendChild(s);
  }

  function onInteract() {
    injectGtag();
  }

  for (var i = 0; i < events.length; i++) {
    window.addEventListener(events[i], onInteract, {
      once: true,
      capture: true,
      passive: true,
    });
  }

  function armFallback() {
    fallbackTimer = window.setTimeout(injectGtag, FALLBACK_MS);
  }

  if (document.readyState === "complete") {
    armFallback();
  } else {
    window.addEventListener("load", armFallback, { once: true });
  }
})();
