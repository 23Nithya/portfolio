(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  // Highlight the current section in the menu
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // Expand / collapse all project details
  var toggleAll = document.getElementById("toggleAll");
  if (toggleAll) {
    var details = Array.prototype.slice.call(document.querySelectorAll(".project details.more"));
    toggleAll.addEventListener("click", function () {
      var expand = toggleAll.getAttribute("aria-pressed") !== "true";
      details.forEach(function (d) { d.open = expand; });
      toggleAll.setAttribute("aria-pressed", String(expand));
      toggleAll.querySelector("span").textContent = expand ? "Collapse all details" : "Expand all details";
    });
  }

  // Count-up for the quick facts (final values are already in the HTML)
  var counters = document.querySelectorAll(".num[data-count]");
  function format(n) { return n >= 1000 ? n.toLocaleString("en-US") : String(n); }
  function run(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var start = null, duration = 1100;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = (target >= 1000 ? String(target) : format(target)) + suffix;
    }
    requestAnimationFrame(step);
  }
  if (!reduceMotion && "IntersectionObserver" in window && counters.length) {
    var seen = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { run(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { seen.observe(c); });
  }

  // Personal project link: becomes active once a real URL replaces "#" in index.html
  var study = document.getElementById("studyLink");
  if (study) {
    var href = study.getAttribute("href");
    if (href && href !== "#") {
      study.classList.remove("link-pending");
      study.removeAttribute("aria-disabled");
      study.setAttribute("target", "_blank");
      study.setAttribute("rel", "noopener noreferrer");
      study.querySelector("span").textContent = "Open project";
    } else {
      study.addEventListener("click", function (e) { e.preventDefault(); });
    }
  }
})();
