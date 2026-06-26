export function createRedThread(chapters) {
  const total = chapters.reduce((sum, chapter) => sum + chapter.height, 0);
  const points = [
    [1140, 120], [1180, 2100], [310, 2700], [260, 5000], [1180, 6200],
    [1230, 8300], [250, 9400], [220, 11100], [1160, 12400], [1210, 14500],
    [250, 16000], [1260, 17600], [1260, 19700], [1220, 21300], [250, 23100],
    [230, 24900], [1160, 26800], [1190, 28200], [1040, 30300], [980, total - 160]
  ];
  const d = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point[0]} ${point[1]}`).join(" ");
  const nodes = points
    .filter((_, index) => index % 3 === 1)
    .map(([x, y]) => `<circle class="thread-node" cx="${x}" cy="${y}" r="5" />`)
    .join("");

  return `
    <div class="red-thread" aria-hidden="true">
      <svg viewBox="0 0 1440 ${total}" preserveAspectRatio="none">
        <path class="thread-path" d="${d}" />
        ${nodes}
      </svg>
    </div>
  `;
}
