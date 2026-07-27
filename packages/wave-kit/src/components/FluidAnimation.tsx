import { useState, useEffect, useRef, useCallback } from "react";
import { faceLetterGrid } from "./faceLetterGrid";

// Color palette for wave visualization (from low to high wave height).
// Index 0 is the "resting" color. It stays dim but visible so the face art is
// always discernible against the black canvas, even with no ripples active.
const WAVE_COLORS = [
  "#2a3550", // Dim slate-navy resting color that keeps the face faintly visible
  "#34507a", // Faded navy
  "#1e6aa0", // Mid blue
  "#2090c8", // Bright blue
  "#4dabd9", // Cyan-blue
  "#7dd3fc", // Light cyan (cool peak)
  "#b91c1c", // Deep red
  "#dc2626", // Bright red
  "#ea580c", // Red-orange
  "#f97316", // Orange
  "#fb923c", // Light orange
  "#fbbf24", // Golden yellow
  "#fde68a", // Pale yellow
  "#fef3c7", // Cream (warmest peak)
];
const CELL_COOL_COLORS = WAVE_COLORS.slice(0, 6);
const CELL_WARM_COLORS = [WAVE_COLORS[0], ...WAVE_COLORS.slice(6)];

const SOURCE_GRID_SIZE = 100; // Underlying face letter art (do not change)
const DAMPING = 0.97;
const DEFAULT_TARGET_FPS = 30;
const DEFAULT_MAX_DPR = 2;

export interface FluidAnimationProps {
  className?: string;
  /** Approximate cell size in CSS pixels. Larger = chunkier characters. */
  cellSize?: number;
  /** Character to use outside the face region (subtle background texture). */
  backgroundChar?: string;
  /** Render the wave as the site's ASCII portrait or as a pure cellular field. */
  renderMode?: "characters" | "cells";
  /**
   * How the face is sized within the canvas grid.
   * - "contain" (default): face fits the shorter dimension, background
   *   characters fill the longer one.
   * - "cover": face fills the longer dimension and gets cropped along the
   *   shorter one. This is useful for wide banners where you want the face to
   *   span edge-to-edge horizontally and only show a horizontal slice.
   */
  faceFit?: "contain" | "cover";
  /** Upper bound for canvas backing-store density. Caps raster work on retina screens. */
  maxDevicePixelRatio?: number;
  /** Animation refresh rate. 30fps preserves the look while halving text draws. */
  targetFps?: number;
  /**
   * When false, the component does not fire any ripples on its own (no
   * initial splashes and no idle auto-ripples). Useful when an external
   * caller wants full control over the wave state, such as the OG-image route
   * that seeds a fixed set of ripples before screenshotting.
   */
  autoRipple?: boolean;
}

export function FluidAnimation({
  className = "",
  cellSize = 9,
  backgroundChar = "·",
  renderMode = "characters",
  faceFit = "contain",
  maxDevicePixelRatio = DEFAULT_MAX_DPR,
  targetFps = DEFAULT_TARGET_FPS,
  autoRipple = true,
}: FluidAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isMouseDown = useRef(false);
  const isDocumentVisible = useRef(true);
  const isCanvasVisible = useRef(true);
  const lastInteractionTime = useRef<number>(Date.now());
  const autoRippleInterval = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastFrameTime = useRef<number>(0);

  // Grid + render dimensions, computed from canvas size at init/resize time.
  const dims = useRef({
    gridW: 80,
    gridH: 80,
    faceX0: 0,
    faceY0: 0,
    faceSize: 80,
    cellW: 1,
    cellH: 1,
    cssWidth: 0,
    cssHeight: 0,
    totalCells: 0,
  });

  const waveA = useRef<Float32Array>(new Float32Array(0));
  const waveB = useRef<Float32Array>(new Float32Array(0));
  const currentWave = useRef<Float32Array>(new Float32Array(0));
  const nextWave = useRef<Float32Array>(new Float32Array(0));
  const charGrid = useRef<string[]>([]);

  const allocateBuffers = useCallback(() => {
    const { totalCells } = dims.current;
    waveA.current = new Float32Array(totalCells);
    waveB.current = new Float32Array(totalCells);
    currentWave.current = waveA.current;
    nextWave.current = waveB.current;
  }, []);

  const buildCharGrid = useCallback(
    (
      gridW: number,
      gridH: number,
      faceX0: number,
      faceY0: number,
      faceSize: number,
    ) => {
      const chars = new Array<string>(gridW * gridH);

      for (let y = 0; y < gridH; y++) {
        const inFaceY = y >= faceY0 && y < faceY0 + faceSize;
        const sy = inFaceY
          ? Math.min(
              SOURCE_GRID_SIZE - 1,
              Math.floor(((y - faceY0) / faceSize) * SOURCE_GRID_SIZE),
            )
          : -1;

        for (let x = 0; x < gridW; x++) {
          const i = y * gridW + x;
          const inFaceX = x >= faceX0 && x < faceX0 + faceSize;
          if (inFaceY && inFaceX) {
            const sx = Math.min(
              SOURCE_GRID_SIZE - 1,
              Math.floor(((x - faceX0) / faceSize) * SOURCE_GRID_SIZE),
            );
            chars[i] = faceLetterGrid[sy][sx];
          } else {
            chars[i] = backgroundChar;
          }
        }
      }

      charGrid.current = chars;
    },
    [backgroundChar],
  );

  const initializeCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Render at the device's actual pixel density for crisp characters on
    // high-DPI displays. Internal coordinates remain in CSS pixels because
    // we set a DPR transform on the context.
    const dpr = Math.min(window.devicePixelRatio || 1, maxDevicePixelRatio);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctxRef.current = ctx;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const gridW = Math.max(8, Math.floor(rect.width / cellSize));
    const gridH = Math.max(8, Math.floor(rect.height / cellSize));
    const faceSize =
      faceFit === "cover"
        ? Math.max(gridW, gridH)
        : Math.min(gridW, gridH);
    const faceX0 = Math.floor((gridW - faceSize) / 2);
    const faceY0 = Math.floor((gridH - faceSize) / 2);

    dims.current = {
      gridW,
      gridH,
      faceX0,
      faceY0,
      faceSize,
      cellW: rect.width / gridW,
      cellH: rect.height / gridH,
      cssWidth: rect.width,
      cssHeight: rect.height,
      totalCells: gridW * gridH,
    };

    allocateBuffers();
    buildCharGrid(gridW, gridH, faceX0, faceY0, faceSize);
  }, [allocateBuffers, buildCharGrid, cellSize, faceFit, maxDevicePixelRatio]);

  const splashRipple = useCallback(
    (gx: number, gy: number, amplitude: number) => {
      const { gridW, gridH } = dims.current;
      const current = currentWave.current;
      if (current.length === 0) return;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx = gx + dx;
          const ny = gy + dy;
          if (nx >= 0 && nx < gridW && ny >= 0 && ny < gridH) {
            const distance = Math.sqrt(dx * dx + dy * dy);
            const intensity = Math.max(0, amplitude - distance * 2);
            current[ny * gridW + nx] += intensity;
          }
        }
      }
    },
    []
  );

  const addRandomRipple = useCallback(() => {
    const { gridW, gridH } = dims.current;
    const x = Math.floor(Math.random() * gridW);
    const y = Math.floor(Math.random() * gridH);
    splashRipple(x, y, 15);
  }, [splashRipple]);

  const simulateWave = useCallback(() => {
    const { gridW, gridH } = dims.current;
    const current = currentWave.current;
    const next = nextWave.current;

    for (let y = 1; y < gridH - 1; y++) {
      const row = y * gridW;
      for (let x = 1; x < gridW - 1; x++) {
        const i = row + x;
        const neighbors =
          current[i - gridW] +
          current[i + gridW] +
          current[i - 1] +
          current[i + 1];

        next[i] = (neighbors / 2 - next[i]) * DAMPING;
      }
    }

    if (currentWave.current === waveA.current) {
      currentWave.current = waveB.current;
      nextWave.current = waveA.current;
    } else {
      currentWave.current = waveA.current;
      nextWave.current = waveB.current;
    }
  }, []);

  const renderASCII = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const {
      gridW,
      gridH,
      cellW,
      cellH,
      cssWidth,
      cssHeight,
    } = dims.current;
    const current = currentWave.current;
    const chars = charGrid.current;
    const fontSize = Math.min(cellW, cellH);
    const pointWidth = Math.max(2, cellW * 0.46);
    const pointHeight = Math.max(2, cellH * 0.46);
    const pointOffsetX = (cellW - pointWidth) / 2;
    const pointOffsetY = (cellH - pointHeight) / 2;
    if (
      current.length === 0 ||
      (renderMode === "characters" && chars.length === 0)
    ) {
      return;
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    if (renderMode === "characters") {
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";
    }

    for (let y = 0; y < gridH; y++) {
      const row = y * gridW;
      for (let x = 0; x < gridW; x++) {
        const i = row + x;

        const signedValue = current[i];
        const value = Math.abs(signedValue);
        const normalizedValue = Math.min(Math.pow(value / 3, 0.8), 1);
        if (renderMode === "cells") {
          // The resting field is black. Only cells carrying meaningful wave
          // energy become visible, with generous black gutters between them.
          if (normalizedValue < 0.045) continue;
          const palette =
            signedValue >= 0 ? CELL_COOL_COLORS : CELL_WARM_COLORS;
          const colorIndex = Math.floor(
            normalizedValue * (palette.length - 1),
          );
          ctx.fillStyle = palette[colorIndex];
          ctx.fillRect(
            x * cellW + pointOffsetX,
            y * cellH + pointOffsetY,
            pointWidth,
            pointHeight,
          );
        } else {
          const colorIndex = Math.floor(
            normalizedValue * (WAVE_COLORS.length - 1),
          );
          ctx.fillStyle = WAVE_COLORS[colorIndex];
          ctx.fillText(chars[i], x * cellW, y * cellH);
        }
      }
    }
  }, [renderMode]);

  const animate = useCallback((time: number) => {
    const frameInterval = 1000 / targetFps;
    if (time - lastFrameTime.current >= frameInterval) {
      simulateWave();
      renderASCII();
      lastFrameTime.current =
        time - ((time - lastFrameTime.current) % frameInterval);
    }
    animationRef.current = requestAnimationFrame(animate);
  }, [renderASCII, simulateWave, targetFps]);

  const addRipple = useCallback(
    (clientX: number, clientY: number) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const { cellW, cellH, gridW, gridH } = dims.current;
      const x = Math.floor((clientX - rect.left) / cellW);
      const y = Math.floor((clientY - rect.top) / cellH);
      if (x >= 0 && x < gridW && y >= 0 && y < gridH) {
        splashRipple(x, y, 10);
      }
    },
    [splashRipple]
  );

  const resetInteractionTimer = useCallback(() => {
    lastInteractionTime.current = Date.now();
    if (autoRippleInterval.current) {
      clearInterval(autoRippleInterval.current);
      autoRippleInterval.current = undefined;
    }
  }, []);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      isMouseDown.current = true;
      addRipple(event.clientX, event.clientY);
      resetInteractionTimer();
    },
    [addRipple, resetInteractionTimer]
  );

  const handleMouseUp = useCallback(() => {
    isMouseDown.current = false;
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (isMouseDown.current) {
        addRipple(event.clientX, event.clientY);
        resetInteractionTimer();
      }
    },
    [addRipple, resetInteractionTimer]
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(media.matches);
    };

    updatePreference();
    media.addEventListener("change", updatePreference);

    return () => {
      media.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateVisibility = () => {
      setIsVisible(isDocumentVisible.current && isCanvasVisible.current);
    };

    const updateDocumentVisibility = () => {
      isDocumentVisible.current = !document.hidden;
      updateVisibility();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isCanvasVisible.current = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0.01 },
    );

    updateDocumentVisibility();
    observer.observe(canvas);
    document.addEventListener("visibilitychange", updateDocumentVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateDocumentVisibility);
    };
  }, []);

  useEffect(() => {
    initializeCanvas();

    if (prefersReducedMotion) {
      renderASCII();
    }

    const handleResize = () => {
      initializeCanvas();
      if (prefersReducedMotion) {
        renderASCII();
      }
    };
    window.addEventListener("resize", handleResize);

    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    const timeouts = autoRipple
      ? [0, 5000, 10000, 15000].map((delay) =>
          setTimeout(() => addRandomRipple(), delay)
        )
      : [];

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      window.removeEventListener("resize", handleResize);
      timeouts.forEach(clearTimeout);
    };
  }, [
    initializeCanvas,
    addRandomRipple,
    prefersReducedMotion,
    renderASCII,
    autoRipple,
  ]);

  useEffect(() => {
    if (isVisible && !prefersReducedMotion) {
      if (!animationRef.current) {
        lastFrameTime.current = 0;
        animationRef.current = requestAnimationFrame(animate);
      }
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
      renderASCII();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };
  }, [animate, isVisible, prefersReducedMotion, renderASCII]);

  useEffect(() => {
    if (prefersReducedMotion || !autoRipple || !isVisible) return;

    const checkInactivity = setInterval(() => {
      const timeSinceInteraction = Date.now() - lastInteractionTime.current;
      if (timeSinceInteraction >= 5000 && !autoRippleInterval.current) {
        autoRippleInterval.current = setInterval(() => {
          addRandomRipple();
        }, 5000);
      }
    }, 1000);

    return () => {
      clearInterval(checkInactivity);
      if (autoRippleInterval.current) {
        clearInterval(autoRippleInterval.current);
        autoRippleInterval.current = undefined;
      }
    };
  }, [addRandomRipple, prefersReducedMotion, autoRipple, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      className={`bg-black cursor-crosshair block ${className}`}
      style={{
        display: "block",
        margin: "0",
        padding: "0",
      }}
    />
  );
}
