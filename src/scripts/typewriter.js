export function typewriter(element, text, options = {}) {
  const { delay = 28, completeClass = "is-typed" } = options;
  if (!element || !text) return Promise.resolve();
  if (document.documentElement.dataset.capture === "true" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    element.textContent = text;
    element.classList.add(completeClass);
    return Promise.resolve();
  }
  element.textContent = "";
  return new Promise((resolve) => {
    let index = 0;
    const tick = () => {
      element.textContent += text[index] || "";
      index += 1;
      if (index < text.length) {
        window.setTimeout(tick, delay);
      } else {
        element.classList.add(completeClass);
        resolve();
      }
    };
    tick();
  });
}
