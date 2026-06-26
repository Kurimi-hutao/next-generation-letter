export function createRedThread(chapters) {
  const total = chapters.reduce((sum, chapter) => sum + chapter.height, 0);
  const points = [
    [704, 120], [690, 2400], [734, 3220], [680, 5750], [722, 7100],
    [694, 9200], [760, 11100], [710, 12200], [806, 13800], [724, 15000],
    [744, 17800], [674, 18800], [768, 21800], [730, 22600], [820, 25200],
    [760, 26400], [694, 28500], [724, 29200], [790, 30900], [920, total - 160]
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
