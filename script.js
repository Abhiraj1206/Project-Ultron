/* ================================================================
   ULTRON // SYSTEM OVERRIDE — SCRIPT
   Organized into clearly named functions. Each feature is set up
   inside its own init function, all called from initApp() at the
   bottom of this file.
   ================================================================ */

// ===== EDIT EVENT DETAILS HERE =====
// Changing these values updates the Event Introduction section
// automatically (see applyEventData below). The same details are
// also written directly in index.html inside #event-details for
// anyone reading the HTML by hand — keep both in sync if you edit.
const EVENT_DATA = {
  name: "ULTRON // SYSTEM OVERRIDE",
  date: "24 OCTOBER 2026",
  venue: "BENNETT UNIVERSITY",
  time: "10:00 AM — 5:00 PM"
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------------
   Apply editable event data into the DOM
--------------------------------------------------------------- */
function applyEventData() {
  document.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.getAttribute("data-field");
    if (EVENT_DATA[key]) el.textContent = EVENT_DATA[key];
  });
}

/* ---------------------------------------------------------------
   System boot / intro sequence
--------------------------------------------------------------- */
function initBootSequence() {
  const bootScreen = document.getElementById("boot-screen");
  const bootLines = document.getElementById("boot-lines");
  const bootWarning = document.getElementById("boot-warning");
  const bootFinal = document.getElementById("boot-final");
  const skipBtn = document.getElementById("skip-intro");

  const alreadyVisited = sessionStorage.getItem("ultronIntroSeen") === "true";

  function hideBoot() {
    bootScreen.classList.add("is-hidden");
    document.body.style.overflow = "";
    sessionStorage.setItem("ultronIntroSeen", "true");
  }

  // Skip entirely (no animation) if already seen this session, or reduced motion is on.
  if (alreadyVisited || prefersReducedMotion) {
    bootScreen.classList.add("is-hidden");
    document.body.style.overflow = "";
    return;
  }

  document.body.style.overflow = "hidden";

  const lines = [
    "SYSTEM INITIALIZING...",
    "&gt; Neural network online",
    "&gt; Security protocol active",
    "&gt; External connection detected",
    "&gt; System integrity: 37%"
  ];

  let delay = 200;
  lines.forEach((line, i) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.style.animationDelay = "0s";
      div.innerHTML = line.replace("37%", '<span>37%</span>');
      bootLines.appendChild(div);
    }, delay);
    delay += 320;
  });

  setTimeout(() => { bootWarning.hidden = false; }, delay + 200);
  delay += 900;

  setTimeout(() => { bootFinal.hidden = false; }, delay);
  delay += 1100;

  const autoHideTimer = setTimeout(hideBoot, delay);

  skipBtn.addEventListener("click", () => {
    clearTimeout(autoHideTimer);
    hideBoot();
  });
}

/* ---------------------------------------------------------------
   Compact navbar on scroll
--------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  function onScroll() {
    navbar.classList.toggle("is-compact", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------------------------------------------------------------
   Full-screen navigation menu
--------------------------------------------------------------- */
function initFullscreenMenu() {
  const menu = document.getElementById("fullscreen-menu");
  const openBtn = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("menu-close");
  const links = menu.querySelectorAll("[data-menu-link]");

  function openMenu() {
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    openBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  links.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) closeMenu();
  });
}

/* ---------------------------------------------------------------
   Hero + Ultron-section mouse parallax (2.5D effect)
--------------------------------------------------------------- */
function initParallax() {
  if (prefersReducedMotion || window.matchMedia("(hover: none)").matches) return;

  const heroVisual = document.querySelector(".hero-visual");
  const heroImage = document.querySelector(".hero-image");
  const heroGrid = document.querySelector(".hero-grid-layer");
  const heroSection = document.getElementById("hero");

  if (heroSection) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (heroVisual) heroVisual.style.transform = `translate3d(${x * -16}px, ${y * -10}px, 0)`;
      if (heroImage) heroImage.style.transform = `translate3d(${x * 18}px, ${y * 12}px, 0) rotateY(${x * 6}deg)`;
      if (heroGrid) heroGrid.style.transform = `perspective(600px) rotateX(55deg) translate(${x * 20}px, ${y * 10}px)`;
    });
  }

  const ultronVisual = document.querySelector(".ultron-visual");
  const ultronSection = document.getElementById("ultron");
  if (ultronSection && ultronVisual) {
    ultronSection.addEventListener("mousemove", (e) => {
      const rect = ultronSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      ultronVisual.style.transform = `translate3d(${x * 14}px, ${y * 10}px, 0)`;
    });
  }
}

/* ---------------------------------------------------------------
   Lightweight floating particles in the hero
--------------------------------------------------------------- */
function initParticles() {
  const container = document.getElementById("hero-particles");
  if (!container || prefersReducedMotion) return;

  const COUNT = window.innerWidth < 640 ? 12 : 26;

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement("span");
    p.className = "particle" + (Math.random() < 0.25 ? " is-red" : "");
    const size = 2 + Math.random() * 3;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `-${Math.random() * 20}px`;
    p.style.animationDuration = `${8 + Math.random() * 10}s`;
    p.style.animationDelay = `${Math.random() * 8}s`;
    container.appendChild(p);
  }
}

/* ---------------------------------------------------------------
   Scroll reveal for sections + timeline items
--------------------------------------------------------------- */
function initScrollReveal() {
  const revealTargets = document.querySelectorAll(".reveal");
  const timelineItems = document.querySelectorAll(".timeline-item");

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
    timelineItems.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach((el) => sectionObserver.observe(el));

  const progressBar = document.getElementById("timeline-progress");
  let visibleCount = 0;

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        timelineObserver.unobserve(entry.target);
        visibleCount++;
        if (progressBar) {
          const pct = (visibleCount / timelineItems.length) * 100;
          progressBar.style.width = `${pct}%`;
        }
      }
    });
  }, { threshold: 0.4 });
  timelineItems.forEach((el) => timelineObserver.observe(el));
}

/* ---------------------------------------------------------------
   Registration modal
--------------------------------------------------------------- */
function initRegistrationModal() {
  const overlay = document.getElementById("modal-overlay");
  const openBtn = document.getElementById("open-register");
  const closeBtn = document.getElementById("modal-close");
  const doneBtn = document.getElementById("modal-done");
  const form = document.getElementById("registration-form");
  const formView = document.getElementById("modal-form-view");
  const successView = document.getElementById("modal-success-view");
  const errorEl = document.getElementById("form-error");

  function openModal() {
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    const firstInput = document.getElementById("field-name");
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    // reset to form view for next time
    formView.hidden = false;
    successView.hidden = true;
    form.reset();
    errorEl.hidden = true;
    form.querySelectorAll(".field-invalid").forEach((el) => el.classList.remove("field-invalid"));
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  doneBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) closeModal();
  });

  form.addEventListener("submit", handleRegistrationSubmit);

  function handleRegistrationSubmit(e) {
    e.preventDefault();
    errorEl.hidden = true;

    const requiredFields = ["field-name", "field-email", "field-college", "field-phone"];
    let hasInvalid = false;

    requiredFields.forEach((id) => {
      const input = document.getElementById(id);
      const isInvalid = !input.value.trim() || !input.checkValidity();
      input.classList.toggle("field-invalid", isInvalid);
      if (isInvalid) hasInvalid = true;
    });

    if (hasInvalid) {
      errorEl.textContent = "All fields marked required must be completed correctly.";
      errorEl.hidden = false;
      return;
    }

    // ===== CONNECT A REAL BACKEND HERE =====
    // This is where you would send the data to a server, e.g.:
    //
    //   const data = new FormData(form);
    //   fetch("https://your-api-endpoint.com/register", {
    //     method: "POST",
    //     body: data
    //   });
    //
    // For now, registration is only simulated locally.

    formView.hidden = true;
    successView.hidden = false;
  }
}

/* ---------------------------------------------------------------
   Custom cursor (desktop only)
--------------------------------------------------------------- */
function initCustomCursor() {
  if (window.matchMedia("(hover: none)").matches) return;

  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;

  window.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.classList.add("is-active");
  });

  document.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));

  const interactiveSelector = "a, button, input, .capability-card, .social-photo";
  document.querySelectorAll(interactiveSelector).forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-pointer"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-pointer"));
  });
}

/* ---------------------------------------------------------------
   App bootstrap
--------------------------------------------------------------- */
function initApp() {
  applyEventData();
  initBootSequence();
  initNavbarScroll();
  initFullscreenMenu();
  initParallax();
  initParticles();
  initScrollReveal();
  initRegistrationModal();
  initCustomCursor();
}

document.addEventListener("DOMContentLoaded", initApp);
