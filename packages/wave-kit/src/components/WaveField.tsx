"use client";

import { FluidAnimation, type FluidAnimationProps } from "./FluidAnimation";

export type WaveFieldProps = Omit<
  FluidAnimationProps,
  "renderMode" | "faceFit"
>;

export function WaveField({
  cellSize = 7,
  targetFps = 30,
  ...props
}: WaveFieldProps) {
  return (
    <FluidAnimation
      {...props}
      cellSize={cellSize}
      faceFit="cover"
      renderMode="cells"
      targetFps={targetFps}
    />
  );
}
