"use client";

import React from "react";

interface PixelProgressBarProps {
  progress: number; // 0-100
  color?: string;
  size?: "sm" | "md";
  animated?: boolean;
}

export const PixelProgressBar: React.FC<PixelProgressBarProps> = ({
  progress,
  color = "#8BC7C3",
  size = "sm",
  animated = true,
}) => {
  const height = size === "sm" ? 6 : 10;
  const pixelSize = size === "sm" ? 2 : 3;

  return (
    <div className="relative" style={{ height }}>
      {/* Track */}
      <div className="absolute inset-0 rounded-sm bg-champagne/30" style={{ imageRendering: "pixelated" }} />
      {/* Fill - pixelated */}
      <div
        className="absolute top-0 left-0 rounded-sm transition-all duration-500 ease-out"
        style={{
          height: "100%",
          width: `${Math.min(100, Math.max(0, progress))}%`,
          backgroundColor: color,
          imageRendering: "pixelated",
          backgroundImage: `
            linear-gradient(90deg, transparent ${pixelSize}px, rgba(0,0,0,0.05) ${pixelSize}px),
            linear-gradient(0deg, transparent ${pixelSize}px, rgba(0,0,0,0.05) ${pixelSize}px)
          `,
          backgroundSize: `${pixelSize * 2}px ${pixelSize * 2}px`,
        }}
      />
    </div>
  );
};
