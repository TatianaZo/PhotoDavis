/* global gsap, ScrollTrigger, Lenis */

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const GALLERY_ITEMS = [
  {
    src: "./5f0511c3-7328-4f3b-b144-e10e17631ca1.png",
    alt: "Редакционный портрет",
    title: "Редакция",
    location: "Москва · студия",
    description: "Редакционный портрет с мягким рассеянным светом и минимальной сценографией.",
  },
  {
    src: "./6e8cad60-0265-40cf-b511-9b180956bcac.png",
    alt: "Путешествие в горах",
    title: "Путешествия",
    location: "Кавказ · высокогорье",
    description: "Путешествие и натуральный свет: характер места и масштаб пейзажа в одном кадре.",
  },
  {
    src: "./9b354cef-e2a5-4f2e-a7b7-4b30247fa970.png",
    alt: "Предложение руки и сердца",
    title: "История",
    location: "Прованс · закат",
    description: "Личная история на съёмке: эмоция, жест и атмосфера золотого часа.",
  },
  {
    src: "./69d3459a-00e3-43bc-8e2c-1003b7301eae.png",
    alt: "Ночной кемпинг",
    title: "Атмосфера",
    location: "Норвегия · фьорд",
    description: "Ночной кемпинг у воды — тёплый свет внутри кадра и холодная глубина снаружи.",
  },
  {
    src: "./79_____________________________-_____________________4pw8zc89r2tnlid70x2m_1.jpg",
    alt: "Кинематографический портрет",
    title: "Кино",
    location: "Лос-Анджелес · улица",
    description: "Кинематографический портрет: контраст, глубина и драматургия света.",
  },
  {
    src: "./c561a2ef-0079-414b-9f17-37246c6f0a28.png",
    alt: "Ювелирный портрет",
    title: "Бьюти",
    location: "Париж · студия",
    description: "Бьюти-съёмка с акцентом на детали, фактуру кожи и ювелирные акценты.",
  },
  {
    src: "./c4786779-029e-4bd1-ba1b-58aa14768074.png",
    alt: "Редакция в студии",
    title: "Студия",
    location: "Москва · циклорама",
    description: "Студийная редакционная серия: чистый фон, точный свет, сильный силуэт.",
  },
  {
    src: "./chatgpt-12-40-39.png",
    alt: "Автомобиль в лесу",
    title: "Авто",
    location: "Подмосковье · лес",
    description: "Автомобильная съёмка в окружении природы — бренд и среда в одном кадре.",
  },
  {
    src: "./chatgpt-12-40-52.png",
    alt: "Конная прогулка",
    title: "Конная прогулка",
    location: "Альпы · маршрут",
    description: "Конная прогулка в горах: движение, воздух и ощущение пути.",
  },
  {
    src: "./chatgpt-12-40-56.png",
    alt: "Ночное небо",
    title: "Ночь",
    location: "Исландия · полярная ночь",
    description: "Ночная съёмка: звёздное небо, долгая выдержка и тишина пейзажа.",
  },
  {
    src: "./d3138058-4d78-4587-ac06-cd93e6a53fb1.png",
    alt: "Внедорожник в лесу",
    title: "Золотой час",
    location: "Карелия · лесная дорога",
    description: "Золотой час в лесу — тёплые блики и объёмный контровой свет.",
  },
  {
    src: "./ea9f680f-915c-4e5e-9bf0-da6ee429ede7.png",
    alt: "Всадница в горах",
    title: "Приключение",
    location: "Патагония · нагорье",
    description: "Приключенческий кадр: масштаб гор, ветер и свобода движения.",
  },
  {
    src: "./generated-image-10.png",
    alt: "Ночное небо",
    title: "Животные",
    location: "Кения · саванна",
    description: "Репортажная съёмка дикой природы — терпение, свет и момент в кадре.",
  },
  {
    src: "./z-image_00213_.png",
    alt: "Горный закат",
    title: "Идеи",
    location: "Тоскана · холмы",
    description: "Горный закат: слои пейзажа, тёплая палитра и спокойный ритм кадра.",
  },
];

let lenisInstance = null;

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
  lenisInstance = lenis;
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

  document
    .querySelectorAll("a, button, .h-card, .gallery-trigger, .lightbox__close, .lightbox__peek, .footer-legal__block summary")
    .forEach((el) => {
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

function initLightbox() {
  const root = document.getElementById("lightbox");
  if (!root || !GALLERY_ITEMS.length) return;

  const imgEl = root.querySelector(".lightbox__img");
  const locationEl = root.querySelector("#lightbox-location");
  const titleEl = root.querySelector("#lightbox-title");
  const descEl = root.querySelector("#lightbox-desc");
  const counterEl = root.querySelector("#lightbox-counter");
  const prevBtn = root.querySelector("[data-lightbox-prev]");
  const nextBtn = root.querySelector("[data-lightbox-next]");
  const prevPeekImg = root.querySelector(".lightbox__peek-img--prev");
  const nextPeekImg = root.querySelector(".lightbox__peek-img--next");
  const prevPeekTitle = root.querySelector(".lightbox__peek-title--prev");
  const nextPeekTitle = root.querySelector(".lightbox__peek-title--next");
  const closeEls = root.querySelectorAll("[data-lightbox-close]");

  let currentIndex = 0;
  let lastFocus = null;

  const wrapIndex = (index) => (index + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;

  function getTriggers() {
    const desktop = window.matchMedia("(min-width: 900px)").matches;
    const nodes = desktop
      ? document.querySelectorAll(".horizontal .h-card")
      : document.querySelectorAll(".stack-gallery__grid figure");
    return Array.from(nodes);
  }

  function prepareTriggers() {
    getTriggers().forEach((el, index) => {
      el.classList.add("gallery-trigger");
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      const item = GALLERY_ITEMS[index];
      if (item) {
        el.setAttribute("aria-label", `Открыть: ${item.title}`);
      }
    });
  }

  function updatePeeks() {
    const prevItem = GALLERY_ITEMS[wrapIndex(currentIndex - 1)];
    const nextItem = GALLERY_ITEMS[wrapIndex(currentIndex + 1)];

    prevPeekImg.src = prevItem.src;
    prevPeekImg.alt = prevItem.alt;
    prevPeekTitle.textContent = prevItem.title;
    prevBtn.setAttribute("aria-label", `Предыдущее: ${prevItem.title}`);

    nextPeekImg.src = nextItem.src;
    nextPeekImg.alt = nextItem.alt;
    nextPeekTitle.textContent = nextItem.title;
    nextBtn.setAttribute("aria-label", `Следующее: ${nextItem.title}`);
  }

  function render(index) {
    const item = GALLERY_ITEMS[index];
    if (!item) return;

    currentIndex = index;
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    locationEl.textContent = item.location;
    titleEl.textContent = item.title;
    descEl.textContent = item.description;
    counterEl.textContent = `${index + 1} / ${GALLERY_ITEMS.length}`;
    updatePeeks();
  }

  function open(index) {
    const item = GALLERY_ITEMS[index];
    if (!item) return;

    lastFocus = document.activeElement;
    render(index);
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");
    root.classList.add("is-open");
    document.body.classList.add("lightbox-open");
    lenisInstance?.stop();

    if (!prefersReducedMotion && typeof gsap !== "undefined") {
      gsap.fromTo(
        root.querySelector(".lightbox__panel"),
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }

    root.querySelector(".lightbox__close")?.focus();
  }

  function close() {
    root.hidden = true;
    root.setAttribute("aria-hidden", "true");
    root.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    lenisInstance?.start();
    imgEl.removeAttribute("src");
    lastFocus?.focus?.();
    lastFocus = null;
  }

  function step(delta) {
    render(wrapIndex(currentIndex + delta));
  }

  function onTriggerActivate(el) {
    const triggers = getTriggers();
    const index = triggers.indexOf(el);
    if (index >= 0) open(index);
  }

  function bindTriggers() {
    getTriggers().forEach((el) => {
      el.onclick = () => onTriggerActivate(el);
      el.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onTriggerActivate(el);
        }
      };
    });
  }

  prepareTriggers();
  bindTriggers();

  prevBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    step(-1);
  });

  nextBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    step(1);
  });

  closeEls.forEach((el) => {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", (e) => {
    if (root.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  window.addEventListener("resize", () => {
    prepareTriggers();
    bindTriggers();
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
  initLightbox();
  ScrollTrigger.refresh();
});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
