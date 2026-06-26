const assetModules = import.meta.glob("../assets/**/*", {
  eager: true,
  query: "?url",
  import: "default"
});

export function assetUrl(path) {
  return assetModules[`../assets/${path}`] || new URL(`../assets/${path}`, import.meta.url).href;
}

export function createImage(asset, eager = false) {
  const img = document.createElement("img");
  img.src = assetUrl(asset.src);
  img.alt = asset.decorative ? "" : asset.alt || "";
  img.decoding = "async";
  img.loading = eager ? "eager" : "lazy";
  img.style.setProperty("--asset-position", asset.position || "center");
  img.addEventListener("error", () => {
    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";
    placeholder.innerHTML = `<span>缺失素材：${asset.src}<br>建议画面：${asset.alt || "装饰叠加"}</span>`;
    img.replaceWith(placeholder);
  }, { once: true });
  return img;
}

export function preloadCaptureImages(root = document) {
  if (document.documentElement.dataset.capture !== "true") return;
  root.querySelectorAll("img[loading='lazy']").forEach((img) => {
    img.loading = "eager";
  });
}
