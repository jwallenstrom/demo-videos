import { canvas } from '../tokens/spacing';

export type LayoutZone = 'full' | 'content' | 'focal' | 'narrow' | 'lower-third';

export interface LayoutRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Get absolute pixel rect for a named layout zone
export function getLayoutZone(zone: LayoutZone): LayoutRect {
  switch (zone) {
    case 'full':
      return { x: 0, y: 0, width: canvas.width, height: canvas.height };

    case 'content':
      return {
        x: canvas.marginX,
        y: canvas.marginY,
        width: canvas.contentWidth,
        height: canvas.contentHeight,
      };

    // Center 8 of 12 columns ≈ 1174px wide
    case 'focal': {
      const w = 1174;
      return {
        x: (canvas.width - w) / 2,
        y: canvas.marginY,
        width: w,
        height: canvas.contentHeight,
      };
    }

    // Center 6 of 12 columns ≈ 870px wide
    case 'narrow': {
      const w = 870;
      return {
        x: (canvas.width - w) / 2,
        y: canvas.marginY,
        width: w,
        height: canvas.contentHeight,
      };
    }

    case 'lower-third':
      return {
        x: canvas.marginX,
        y: canvas.height * 0.8,
        width: canvas.contentWidth,
        height: canvas.height * 0.2 - canvas.marginY,
      };
  }
}

// Center a rect inside a container
export function centerIn(container: LayoutRect, itemWidth: number, itemHeight: number): LayoutRect {
  return {
    x: container.x + (container.width - itemWidth) / 2,
    y: container.y + (container.height - itemHeight) / 2,
    width: itemWidth,
    height: itemHeight,
  };
}

// Distribute rects horizontally with even spacing
export function distributeHorizontal(
  container: LayoutRect,
  count: number,
  itemWidth: number,
  itemHeight: number,
  centerY?: number,
): LayoutRect[] {
  const totalWidth = count * itemWidth;
  const totalGap = container.width - totalWidth;
  const gap = totalGap / (count + 1);
  const y = centerY !== undefined ? centerY - itemHeight / 2 : container.y + (container.height - itemHeight) / 2;

  return Array.from({ length: count }, (_, i) => ({
    x: container.x + gap + i * (itemWidth + gap),
    y,
    width: itemWidth,
    height: itemHeight,
  }));
}
