import "../styles/layout.css";
import "../styles/components.css";
import "../styles/sections.css";
import "../styles/animations.css";
import "../styles/responsive.css";
import { chapters, sourceNotes } from "./content.js";
import { createImage, preloadCaptureImages } from "./asset-loader.js";
import { createRedThread } from "./red-thread.js";
import { setupScrollScenes, setupNavSpy } from "./scroll-scenes.js";
import { setupModal, setupMobileNav } from "./accessibility.js";

const params = new URLSearchParams(window.location.search);
if (params.get("capture") === "1") {
  document.documentElement.dataset.capture = "true";
}

const story = document.querySelector(".story");

function renderMedia(chapter, index) {
  const primary = chapter.assets[0];
  const support = chapter.assets.slice(1, 3);
  const media = document.createElement("div");
  media.className = "chapter-media visual-stack reveal";

  if (chapter.id === "too-light") {
    media.innerHTML = `
      <div class="letter-paper">
        <p data-typewriter="${chapter.letterDraft.join("\n")}"></p>
        <p>可“<span class="strike-word" style="--strike-progress:0">很好</span>”两个字，怎么能够回答一生？</p>
      </div>
    `;
    return media;
  }

  if (chapter.id === "ending") {
    media.className = "chapter-media final-letter reveal";
    const letter = document.createElement("div");
    letter.className = "letter-paper";
    letter.innerHTML = chapter.letter.map((line) => `<p>${line}</p>`).join("");
    const block = document.createElement("div");
    block.className = "source-block";
    block.innerHTML = `<strong>创作说明</strong><br>${sourceNotes.paragraphs.join("<br>")}`;
    letter.append(block);
    media.append(letter);
    return media;
  }

  if (primary) {
    const frame = document.createElement("figure");
    frame.className = "film-frame";
    frame.style.setProperty("--asset-position", primary.position || "center");
    frame.append(createImage(primary, index < 2));
    frame.insertAdjacentHTML("beforeend", `<figcaption class="sr-only">${primary.alt || ""}</figcaption>`);
    media.append(frame);
  }

  support.forEach((asset) => {
    if (asset.role === "overlay") return;
    const frame = document.createElement("figure");
    frame.className = asset.role === "paper" ? "note-card" : "film-frame";
    frame.style.setProperty("--asset-position", asset.position || "center");
    if (asset.role === "paper") {
      frame.innerHTML = `<small>情境画面</small><p>${asset.alt}</p>`;
    } else {
      frame.append(createImage(asset));
    }
    media.append(frame);
  });

  return media;
}

function renderChapter(chapter, index) {
  const section = document.createElement("section");
  section.id = chapter.id;
  section.className = `chapter-section ${chapter.theme}`;
  section.style.setProperty("--section-height", `${chapter.height}px`);
  section.setAttribute("aria-labelledby", `${chapter.id}-title`);

  const hero = chapter.assets.find((asset) => asset.role === "hero") || chapter.assets[0];
  if (hero) {
    const bg = document.createElement("div");
    bg.className = "asset-bg";
    bg.style.setProperty("--asset-position", hero.position || "center");
    bg.append(createImage(hero, index === 0));
    section.append(bg);
  }

  section.insertAdjacentHTML("beforeend", `<div class="grain" aria-hidden="true"></div>`);
  if (index === 0) {
    const dust = document.createElement("div");
    dust.className = "dust";
    dust.innerHTML = Array.from({ length: 18 }, (_, i) => `<span style="left:${8 + (i * 17) % 84}%;top:${10 + (i * 23) % 76}%"></span>`).join("");
    section.append(dust);
  }

  const inner = document.createElement("div");
  inner.className = "chapter-section__inner";
  const copy = document.createElement("div");
  copy.className = "chapter-copy reveal";
  const body = [
    `<span class="chapter-number">${chapter.number}</span>`,
    `<p class="eyebrow">${chapter.eyebrow}</p>`,
    index === 0
      ? `<h1 id="${chapter.id}-title" class="headline">${chapter.headline}</h1>`
      : `<h2 id="${chapter.id}-title" class="chapter-title">${chapter.title}</h2><p class="headline">${chapter.headline}</p>`,
    chapter.lead ? chapter.lead.map((line) => `<p>${line}</p>`).join("") : "",
    chapter.quote ? `<blockquote>${chapter.quote}</blockquote>` : "",
    chapter.id === "three-days" ? `<div class="date-mark">1949.11.27</div>` : "",
    chapter.paragraphs.map((text) => `<p>${text}</p>`).join(""),
    `<div class="archive-card"><small>说明</small>${chapter.archiveNotes.map((note) => `<p>${note}</p>`).join("")}<p>${chapter.aiDisclosure}</p></div>`
  ].join("");
  copy.innerHTML = body;

  inner.append(copy, renderMedia(chapter, index));
  section.append(inner);

  if (chapter.id === "city-answer") {
    section.insertAdjacentHTML("beforeend", `<div class="transition-lines" aria-hidden="true"></div>`);
  }

  return section;
}

story.innerHTML = createRedThread(chapters);
chapters.forEach((chapter, index) => story.append(renderChapter(chapter, index)));

const nav = document.querySelector(".chapter-nav");
const mobileNav = document.querySelector(".mobile-nav");
const links = chapters.map((chapter) => `<a href="#${chapter.id}" data-title="${chapter.title}">${chapter.number}</a>`).join("");
nav.innerHTML = links;
mobileNav.innerHTML = chapters.map((chapter) => `<a href="#${chapter.id}">${chapter.number} ${chapter.shortTitle}</a>`).join("");

setupMobileNav(document.querySelector(".mobile-progress"), mobileNav);
setupModal({
  button: document.querySelector(".source-button"),
  shell: document.querySelector(".modal-shell"),
  content: document.querySelector(".source-modal__content"),
  sourceNotes
});
preloadCaptureImages(story);
setupScrollScenes();
setupNavSpy(chapters);
