/* global gsap, ScrollTrigger, Lenis */

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function initLenis() {
  if (prefersReducedMotion || typeof Lenis === "undefined") return null;
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

function runPreloader() {
  document.body.classList.add("is-loading");
  const root = document.querySelector(".preloader");
  if (!root) {
    document.body.classList.remove("is-loading");
    return;
  }

  if (prefersReducedMotion) {
    root.remove();
    document.body.classList.remove("is-loading");
    gsap.set(".hero .reveal-line", { opacity: 1, y: 0 });
    return;
  }

  gsap
    .timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        root.remove();
        document.body.classList.remove("is-loading");
        requestAnimationFrame(() => {
          fixHeroLines();
          ScrollTrigger.refresh();
        });
      },
    })
    .fromTo(".preloader__line span", { xPercent: -101 }, { xPercent: 101, duration: 1.15 }, 0)
    .fromTo(".preloader__word", { opacity: 1, y: 0 }, { opacity: 0, y: -18, duration: 0.45 }, 0.75)
    .fromTo(root, { yPercent: 0 }, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, 1.05);
}

function initHeroParallax() {
  if (prefersReducedMotion) return;
  const img = document.querySelector(".hero__media img");
  if (!img) return;
  gsap.fromTo(
    img,
    { scale: 1.12 },
    {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}

function initHorizontalGallery() {
  const section = document.querySelector(".horizontal");
  const rail = document.querySelector(".horizontal__rail");
  if (!section || !rail) return;

  const mm = gsap.matchMedia();
  mm.add("(min-width: 900px)", () => {
    const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth);
    const tween = gsap.to(rail, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        start: "top top",
        end: () => "+=" + (distance() + window.innerHeight * 0.35),
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  });
}

function initRevealGroups() {
  if (prefersReducedMotion) return;

  gsap.utils.toArray(".intro .reveal-up").forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: "power3.out",
        delay: i * 0.08,
        scrollTrigger: { trigger: ".intro", start: "top 82%" },
      }
    );
  });

  gsap.utils.toArray(".intro .reveal-mask > span").forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1.05,
        ease: "power4.out",
        scrollTrigger: { trigger: ".intro", start: "top 78%" },
      }
    );
  });

  gsap.fromTo(
    ".intro .reveal-scale",
    { opacity: 0, scale: 0.94 },
    {
      opacity: 1,
      scale: 1,
      duration: 1.15,
      ease: "power3.out",
      scrollTrigger: { trigger: ".intro__figure", start: "top 85%" },
    }
  );

  gsap.utils.toArray(".horizontal .reveal-up").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".horizontal", start: "top 70%" },
      }
    );
  });

  gsap.utils.toArray(".horizontal .reveal-mask > span").forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".horizontal", start: "top 72%" },
      }
    );
  });

  gsap.utils.toArray(".split .reveal-mask > span").forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".split", start: "top 78%" },
      }
    );
  });

  gsap.utils.toArray(".split .reveal-up").forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: i * 0.06,
        scrollTrigger: { trigger: ".split", start: "top 75%" },
      }
    );
  });

  gsap.utils.toArray(".prices .reveal-mask > span").forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".prices", start: "top 80%" },
      }
    );
  });

  gsap.utils.toArray(".prices .reveal-up").forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: i * 0.06,
        scrollTrigger: { trigger: ".prices", start: "top 76%" },
      }
    );
  });

  gsap.utils.toArray(".footer .reveal-up").forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: i * 0.08,
        scrollTrigger: { trigger: ".footer", start: "top 88%" },
      }
    );
  });

  const splitImg = document.querySelector(".split__media img");
  if (splitImg) {
    gsap.fromTo(
      splitImg,
      { yPercent: 6, scale: 1.06 },
      {
        yPercent: -6,
        scale: 1.02,
        ease: "none",
        scrollTrigger: {
          trigger: ".split__media",
          scrub: 1,
          start: "top bottom",
          end: "bottom top",
        },
      }
    );
  }

  gsap.utils.toArray(".stack-gallery figure").forEach((fig, i) => {
    gsap.fromTo(
      fig,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: i * 0.04,
        scrollTrigger: { trigger: fig, start: "top 92%" },
      }
    );
  });
}

function initCursor() {
  if (!finePointer || prefersReducedMotion) return;
  const dot = document.querySelector(".cursor");
  const ring = document.querySelector(".cursor-ring");
  if (!dot || !ring) return;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;
  const lerp = (a, b, n) => a + (b - a) * n;

  window.addEventListener(
    "pointermove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
    },
    { passive: true }
  );

  gsap.ticker.add(() => {
    rx = lerp(rx, mx, 0.22);
    ry = lerp(ry, my, 0.22);
    gsap.set(dot, { x: mx, y: my });
    gsap.set(ring, { x: rx, y: ry });
  });

  document.body.classList.add("cursor-ready");

  document.querySelectorAll("a, button, .h-card, .footer-legal__block summary").forEach((el) => {
    el.addEventListener("pointerenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("pointerleave", () => document.body.classList.remove("cursor-hover"));
  });
}

function initMobileMenu() {
  const btn = document.querySelector(".menu-btn");
  const panel = document.getElementById("mobile-menu");
  if (!btn || !panel) return;
  const links = panel.querySelectorAll("a");

  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
    document.body.style.overflow = open ? "" : "hidden";
  });

  links.forEach((a) => {
    a.addEventListener("click", () => {
      btn.setAttribute("aria-expanded", "false");
      panel.hidden = true;
      document.body.style.overflow = "";
    });
  });
}

function initMagnetic() {
  if (!finePointer || prefersReducedMotion) return;
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      gsap.to(btn, {
        x: dx * 0.18,
        y: dy * 0.18,
        duration: 0.35,
        ease: "power2.out",
      });
    });
    btn.addEventListener("pointerleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.35)" });
    });
  });
}

function fixHeroLines() {
  if (prefersReducedMotion) return;
  const lines = gsap.utils.toArray(".hero .reveal-line");
  gsap.set(lines, { clearProps: "opacity,transform" });
  gsap.fromTo(
    lines,
    { opacity: 0, y: 36 },
    {
      opacity: 1,
      y: 0,
      duration: 1.05,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.2,
    }
  );
}

runPreloader();
initLenis();
initMobileMenu();

window.addEventListener("load", () => {
  initHeroParallax();
  initHorizontalGallery();
  initRevealGroups();
  initCursor();
  initMagnetic();
  ScrollTrigger.refresh();
});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
