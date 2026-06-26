export function setupModal({ button, shell, content, sourceNotes }) {
  const panel = shell.querySelector(".source-modal");
  let previousFocus = null;
  content.innerHTML = `
    ${sourceNotes.paragraphs.map((item) => `<p>${item}</p>`).join("")}
    <h3>图片与许可入口</h3>
    <ul>${sourceNotes.attribution.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;

  const close = () => {
    shell.hidden = true;
    document.body.style.overflow = "";
    previousFocus?.focus();
  };

  const open = () => {
    previousFocus = document.activeElement;
    shell.hidden = false;
    document.body.style.overflow = "hidden";
    panel.focus();
  };

  button.addEventListener("click", open);
  shell.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !shell.hidden) close();
    if (event.key !== "Tab" || shell.hidden) return;
    const focusables = shell.querySelectorAll("button, [href], [tabindex]:not([tabindex='-1'])");
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

export function setupMobileNav(button, nav) {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    nav.hidden = expanded;
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      button.setAttribute("aria-expanded", "false");
      nav.hidden = true;
    }
  });
}
