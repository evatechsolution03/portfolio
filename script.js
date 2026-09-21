/* =========================================================
   Evatech Solutions — site interactions
   ========================================================= */

(function () {
  const CONTACT_EMAIL = "hiremahesh.01@gmail.com";
  const ENQUIRY_SUBJECT = "Project Inquiry — Evatech Solutions";

  const MOBILE_NAV_MAX = 960;
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  const navLinks = document.querySelectorAll(".nav-list a");
  const yearEls = document.querySelectorAll("#year, .year");
  const sections = document.querySelectorAll("main section[id]");
  const main = document.querySelector("#main");
  const footer = document.querySelector(".site-footer");
  const form = document.querySelector("#enquiry-form");
  const formStatus = document.querySelector("#form-status");

  yearEls.forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  function isMobileNav() {
    return window.innerWidth <= MOBILE_NAV_MAX;
  }

  function setMenu(open) {
    if (!header || !toggle) return;

    const shouldOpen = Boolean(open) && isMobileNav();

    header.classList.toggle("nav-open", shouldOpen);
    toggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    toggle.setAttribute("aria-label", shouldOpen ? "Close menu" : "Open menu");
    document.body.style.overflow = shouldOpen ? "hidden" : "";

    if (nav) nav.hidden = isMobileNav() && !shouldOpen;
    if (main) main.inert = shouldOpen;
    if (footer) footer.inert = shouldOpen;

    if (!shouldOpen && isMobileNav() && document.activeElement && nav && nav.contains(document.activeElement)) {
      toggle.focus();
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(!header.classList.contains("nav-open"));
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    if (!header || !header.classList.contains("nav-open")) return;
    setMenu(false);
    toggle.focus();
  });

  document.addEventListener("click", function (event) {
    if (!header || !header.classList.contains("nav-open")) return;
    if (!header.contains(event.target)) setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (!isMobileNav()) {
      setMenu(false);
    } else if (header && !header.classList.contains("nav-open") && nav) {
      nav.hidden = true;
    }
  });

  if (isMobileNav() && nav) nav.hidden = true;

  document.querySelectorAll("img").forEach(function (img) {
    function hideBrokenImage() {
      img.classList.add("is-hidden");
    }
    img.addEventListener("error", hideBrokenImage);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) {
      hideBrokenImage();
    }
  });

  function updateActiveNav() {
    if (!sections.length) return;
    const offset = (header ? header.offsetHeight : 72) + 20;
    const fromTop = window.scrollY + offset;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 6;
    let current = sections[0];

    sections.forEach(function (section) {
      if (section.offsetTop <= fromTop) current = section;
    });
    if (atBottom) current = sections[sections.length - 1];

    navLinks.forEach(function (link) {
      const href = link.getAttribute("href") || "";
      const id = href.indexOf("#") >= 0 ? href.slice(href.indexOf("#") + 1) : "";
      const match = current && current.id !== "hero" && id === current.id;
      link.classList.toggle("is-active", match);
      if (match) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        updateActiveNav();
        ticking = false;
      });
    },
    { passive: true }
  );
  updateActiveNav();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealItems = document.querySelectorAll(
      ".section-header, .project-card, .service-card, .why-grid, .process-grid, .capability-list, .enquiry-form, .case-body"
    );
    const revealObserver = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealItems.forEach(function (item) {
      item.classList.add("will-reveal");
      revealObserver.observe(item);
    });

    function revealVisible() {
      revealItems.forEach(function (item) {
        if (item.classList.contains("reveal")) return;
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          item.classList.add("reveal");
          revealObserver.unobserve(item);
        }
      });
    }

    window.addEventListener("scroll", revealVisible, { passive: true });
    window.setTimeout(revealVisible, 100);
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const body = [
        "Name: " + (data.get("name") || ""),
        "Business / Company: " + (data.get("company") || ""),
        "Email: " + (data.get("email") || ""),
        "Phone / WhatsApp: " + (data.get("phone") || ""),
        "Project Type: " + (data.get("type") || ""),
        "Budget Range: " + (data.get("budget") || ""),
        "",
        data.get("description") || ""
      ].join("\n");

      const mailto =
        "mailto:" +
        CONTACT_EMAIL +
        "?subject=" +
        encodeURIComponent(ENQUIRY_SUBJECT) +
        "&body=" +
        encodeURIComponent(body);
      window.location.href = mailto;

      if (formStatus) {
        formStatus.hidden = false;
        formStatus.textContent = "Opening your email app. If nothing happens, message us on WhatsApp at +91 93598 85640.";
      }
    });
  }
})();
