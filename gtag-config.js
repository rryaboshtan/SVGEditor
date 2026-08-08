/* Load GA4 after first paint: window load → idle (keeps Lighthouse happier). */
(function () {
  var MEASUREMENT_ID = "G-4D9GCN9FTJ";
  var loaded = false;

  function injectGtag() {
    if (loaded) return;
    loaded = true;

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

  function scheduleInject() {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(injectGtag, { timeout: 3500 });
    } else {
      window.setTimeout(injectGtag, 2000);
    }
  }

  if (document.readyState === "complete") {
    scheduleInject();
  } else {
    window.addEventListener("load", scheduleInject, { once: true });
  }
})();
