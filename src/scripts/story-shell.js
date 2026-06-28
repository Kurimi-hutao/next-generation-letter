import { createDialogController } from "./dialog-controller.js";
import { navigateToChapter } from "./navigation.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function setupMobileHeaderAutoHide({ shell, isDrawerOpen }) {
  const media = window.matchMedia("(max-width: 640px)");
  let active = false;
  let lastY = Math.max(0, window.scrollY);
  let downDistance = 0;
  let upDistance = 0;
  let ticking = false;

  const show = () => shell.classList.remove("is-hidden");
  const hide = () => {
    if (isDrawerOpen() || shell.matches(":focus-within")) return;
    shell.classList.add("is-hidden");
  };

  const update = () => {
    ticking = false;
    if (!active) return;

    const y = Math.max(0, window.scrollY);
    if (y <= 32 || isDrawerOpen() || shell.matches(":focus-within")) {
      show();
      downDistance = 0;
      upDistance = 0;
      lastY = y;
      return;
    }

    const delta = y - lastY;
    lastY = y;
    if (Math.abs(delta) < 1) return;

    if (delta > 0) {
      downDistance += delta;
      upDistance = 0;
      if (downDistance >= 18) hide();
    } else {
      upDistance += Math.abs(delta);
      downDistance = 0;
      if (upDistance >= 8) show();
    }
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  const enable = () => {
    if (active) return;
    active = true;
    lastY = Math.max(0, window.scrollY);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("orientationchange", show, { passive: true });
    shell.addEventListener("focusin", show);
  };

  const disable = () => {
    if (!active) return;
    active = false;
    shell.classList.remove("is-hidden");
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("orientationchange", show);
    shell.removeEventListener("focusin", show);
  };

  const sync = () => {
    if (media.matches) enable();
    else disable();
  };

  media.addEventListener?.("change", sync);
  sync();

  return () => {
    disable();
    media.removeEventListener?.("change", sync);
  };
}

export function setupStoryShell(chapters) {
  const shell = document.querySelector(".story-shell");
  const drawer = document.querySelector(".story-shell-drawer");
  const list = drawer?.querySelector("[data-story-drawer-list]");
  const menuButton = shell?.querySelector("[data-story-menu]");
  if (!shell || !drawer || !list || !menuButton) {
    return { setActiveChapter() {}, isDrawerOpen: () => false, cleanup() {} };
  }

  list.innerHTML = chapters.map((chapter) => `
    <a href="#${escapeHtml(chapter.id)}" data-story-chapter-link="${escapeHtml(chapter.id)}">
      <span>${escapeHtml(chapter.number)}</span>
      <strong>${escapeHtml(chapter.shortTitle || chapter.title)}</strong>
    </a>
  `).join("");

  let pendingChapterId = null;
  const controller = createDialogController({
    shell: drawer,
    panel: drawer.querySelector(".story-shell-drawer__panel"),
    openTriggers: [menuButton],
    closeTriggers: [...drawer.querySelectorAll("[data-story-drawer-close]")],
    mode: window.matchMedia("(max-width: 640px)").matches ? "drawer" : "dialog",
    onBeforeOpen: () => {
      shell.classList.remove("is-hidden");
      menuButton.setAttribute("aria-expanded", "true");
    },
    onAfterClose: () => {
      menuButton.setAttribute("aria-expanded", "false");
      if (!pendingChapterId) return;
      const chapterId = pendingChapterId;
      pendingChapterId = null;
      shell.classList.remove("is-hidden");
      navigateToChapter(chapterId);
    }
  });

  list.addEventListener("click", (event) => {
    const link = event.target.closest("[data-story-chapter-link]");
    if (!link) return;
    event.preventDefault();
    pendingChapterId = link.dataset.storyChapterLink;
    controller?.close(false);
  });

  const number = shell.querySelector(".story-shell__number");
  const title = shell.querySelector(".story-shell__title");
  const setActiveChapter = (chapter) => {
    if (!chapter) return;
    if (number) number.textContent = chapter.number;
    if (title) title.textContent = chapter.shortTitle || chapter.title;
    list.querySelectorAll("a").forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${chapter.id}`);
    });
  };

  const cleanupAutoHide = setupMobileHeaderAutoHide({
    shell,
    isDrawerOpen: () => controller?.isOpen() ?? false
  });

  setActiveChapter(chapters[0]);
  return {
    setActiveChapter,
    isDrawerOpen: () => controller?.isOpen() ?? false,
    cleanup: cleanupAutoHide
  };
}
