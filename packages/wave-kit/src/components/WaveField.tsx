"use client";

import { useEffect, useRef, type HTMLAttributes, type PointerEvent } from "react";

export type WaveFieldProps = HTMLAttributes<HTMLDivElement> & {
  columns?: number;
  damping?: number;
  interactive?: boolean;
};

const palette = ["#000000", "#07111f", "#126aa0", "#2090c8", "#7dd3fc", "#5a1010", "#b91c1c", "#dc2626", "#f97316", "#fbbf24"];

export function WaveField({
  className = "",
  columns = 74,
  damping = 0.968,
  interactive = true,
  ...props
}: WaveFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const impulseRef = useRef<(x: number, y: number, strength?: number) => void>(() => undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    let frame = 0;
    let animation = 0;
    let width = 0;
    let height = 0;
    let rows = 0;
    let current = new Float32Array();
    let previous = new Float32Array();
    let next = new Float32Array();
    let lastAutoImpulse = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      rows = Math.max(18, Math.round((columns * height) / width));
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      current = new Float32Array(columns * rows);
      previous = new Float32Array(columns * rows);
      next = new Float32Array(columns * rows);
    };

    impulseRef.current = (x, y, strength = 1.35) => {
      const cx = Math.max(2, Math.min(columns - 3, Math.floor(x * columns)));
      const cy = Math.max(2, Math.min(rows - 3, Math.floor(y * rows)));
      for (let dy = -2; dy <= 2; dy += 1) {
        for (let dx = -2; dx <= 2; dx += 1) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= 2.25) current[(cy + dy) * columns + cx + dx] += strength * (1 - distance / 2.5);
        }
      }
    };

    const draw = (time: number) => {
      if (time - lastAutoImpulse > 1550) {
        impulseRef.current(0.18 + Math.random() * 0.64, 0.2 + Math.random() * 0.6, Math.random() > 0.45 ? 1.5 : -1.25);
        lastAutoImpulse = time;
      }

      for (let y = 1; y < rows - 1; y += 1) {
        for (let x = 1; x < columns - 1; x += 1) {
          const index = y * columns + x;
          const neighbors =
            current[index - 1] +
            current[index + 1] +
            current[index - columns] +
            current[index + columns];
          next[index] = (neighbors * 0.5 - previous[index]) * damping;
        }
      }
      const swap = previous;
      previous = current;
      current = next;
      next = swap;
      next.fill(0);

      context.fillStyle = "#000000";
      context.fillRect(0, 0, width, height);
      const cellWidth = width / columns;
      const cellHeight = height / rows;
      const gutter = Math.max(2.2, Math.min(cellWidth, cellHeight) * 0.36);

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const value = current[y * columns + x];
          const magnitude = Math.abs(value);
          if (magnitude < 0.035) continue;
          const level = Math.min(4, Math.max(1, Math.floor(magnitude * 5)));
          const colorIndex = value < 0 ? level : 4 + level;
          context.fillStyle = palette[colorIndex];
          context.fillRect(
            x * cellWidth + gutter / 2,
            y * cellHeight + gutter / 2,
            Math.max(1, cellWidth - gutter),
            Math.max(1, cellHeight - gutter),
          );
        }
      }

      frame += 1;
      if (!reducedMotion) animation = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    impulseRef.current(0.36, 0.54, 1.7);
    impulseRef.current(0.68, 0.42, -1.35);
    if (reducedMotion) {
      for (let step = 0; step < 18; step += 1) draw(step * 16);
    } else {
      animation = requestAnimationFrame(draw);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animation);
    };
  }, [columns, damping]);

  function disturb(event: PointerEvent<HTMLCanvasElement>) {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    impulseRef.current((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height);
  }

  return (
    <div className={`wk-wave-field ${className}`.trim()} {...props}>
      <canvas
        aria-label="Animated cellular wave field"
        onPointerDown={disturb}
        onPointerMove={(event) => {
          if (event.buttons) disturb(event);
        }}
        ref={canvasRef}
        role="img"
      />
    </div>
  );
}
