"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "", width, height }) => {
  return (
    <div
      className={`
        rounded-md bg-gradient-to-r from-champagne/40 via-seafoamMist/40 to-champagne/40
        animate-pulse-slow
        ${className}
      `}
      style={{
        width,
        height,
        backgroundSize: "200% 100%",
      }}
    />
  );
};
