// Color manipulation utilities

// Convert hex to rgba string with given alpha
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Add alpha to a hex color as an 8-char hex
export function withOpacity(hex: string, opacityPercent: number): string {
  const alpha = Math.round((opacityPercent / 100) * 255);
  return `${hex}${alpha.toString(16).padStart(2, '0').toUpperCase()}`;
}

// Create a CSS radial gradient for ambient backgrounds
export function radialGradient(
  innerColor: string,
  outerColor: string,
  centerX = '50%',
  centerY = '50%',
  radius = '60%',
): string {
  return `radial-gradient(ellipse ${radius} at ${centerX} ${centerY}, ${innerColor}, ${outerColor})`;
}

// Lerp between two hex colors — used for status/severity gradients
export function lerpColor(hex1: string, hex2: string, t: number): string {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);
  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
