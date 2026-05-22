// Geometric utilities for SVG path construction and layout math

export interface Point {
  x: number;
  y: number;
}

// Cubic bezier point at parameter t (0–1)
export function bezierPoint(
  p0: Point, p1: Point, p2: Point, p3: Point,
  t: number,
): Point {
  const mt = 1 - t;
  return {
    x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
    y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
  };
}

// Approximate length of a straight line SVG path (between two points)
export function lineLength(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// SVG arc path string for a partial circle (for status rings, progress arcs)
export function svgArc(
  cx: number, cy: number, r: number,
  startAngle: number, endAngle: number,
): string {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number): Point {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// Distribute N items evenly across a width with padding
export function evenlySpaced(
  count: number,
  containerWidth: number,
  itemWidth: number,
  startX: number = 0,
): number[] {
  if (count === 1) return [startX + containerWidth / 2 - itemWidth / 2];
  const totalItemWidth = count * itemWidth;
  const totalGap = containerWidth - totalItemWidth;
  const gap = totalGap / (count - 1);
  return Array.from({ length: count }, (_, i) => startX + i * (itemWidth + gap));
}

// Smooth cubic bezier control points for a horizontal connector
export function horizontalConnectorPath(
  x1: number, y1: number,
  x2: number, y2: number,
): string {
  const dx = (x2 - x1) * 0.5;
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

// Arrow marker path for SVG <marker> definitions
export function arrowheadPath(size: number = 6): string {
  return `M 0 0 L ${size} ${size / 2} L 0 ${size} Z`;
}
