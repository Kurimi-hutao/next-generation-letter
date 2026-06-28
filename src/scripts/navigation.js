import { ScrollTrigger } from "./gsap-setup.js";
import { refreshScrollScenes } from "./scroll-scenes.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function normalizeHash(hash) {
  return String(hash || "").replace(/^#/, "");
}

function getScrollMarginTop(target) {
  return Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
}

function correctChapterScroll(target) {
  refreshScrollScenes(true);
  const delta = target.getBoundingClientRect().top - getScrollMarginTop(target);
  if (Math.abs(delta) > 2) {
    window.scrollTo({
      top: Math.max(0, window.scrollY + delta),
      left: window.scrollX,
      behavior: "auto"
    });
  }
  ScrollTrigger.update();
}

function settleChapterScroll(target, behavior) {
  const settle = () => {
    requestAnimationFrame(() => {
      correctChapterScroll(target);
      requestAnimationFrame(() => correctChapterScroll(target));
    });
  };

  if (behavior === "smooth" && !reduceMotion.matches && "onscrollend" in window) {
    window.addEventListener("scrollend", settle, { once: true });
    return;
  }

  settle();
}

export function navigateToChapter(chapterId, {
  behavior = "smooth",
  updateHistory = true,
  focus = true
} = {}) {
  const id = normalizeHash(chapterId);
  const target = document.getElementById(id);
  if (!target) return false;

  refreshScrollScenes(true);
  window.scrollTo({
    top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - getScrollMarginTop(target)),
    left: window.scrollX,
    behavior: reduceMotion.matches ? "auto" : behavior
  });

  if (updateHistory && window.location.hash !== `#${id}`) {
    history.pushState(null, "", `#${id}`);
  }

  const heading = target.querySelector("h1, h2");
  if (focus && heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }

  ScrollTrigger.update();
  settleChapterScroll(target, behavior);
  return true;
}

export function setupChapterLinkNavigation(root = document) {
  const handleClick = (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || !root.contains(link)) return;
    const id = normalizeHash(link.getAttribute("href"));
    if (!id || !document.getElementById(id)) return;
    event.preventDefault();
    navigateToChapter(id);
  };

  root.addEventListener("click", handleClick);
  return () => root.removeEventListener("click", handleClick);
}

export function setupHashNavigation() {
  const navigateFromLocation = () => {
    const id = normalizeHash(window.location.hash);
    if (!id || !document.getElementById(id)) return;
    requestAnimationFrame(() => navigateToChapter(id, {
      behavior: "auto",
      updateHistory: false,
      focus: false
    }));
  };

  window.addEventListener("popstate", navigateFromLocation);
  window.addEventListener("hashchange", navigateFromLocation);
  navigateFromLocation();

  return () => {
    window.removeEventListener("popstate", navigateFromLocation);
    window.removeEventListener("hashchange", navigateFromLocation);
  };
}
