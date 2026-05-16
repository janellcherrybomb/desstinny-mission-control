"use client";

import React from "react";

interface AgentAvatarProps {
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "busy" | "idle";
  className?: string;
}

const StarfishSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
  >
    {/* Pixel art starfish */}
    <rect x="7" y="0" width="2" height="2" fill="#8BC7C3" />
    <rect x="6" y="2" width="4" height="2" fill="#8BC7C3" />
    <rect x="5" y="4" width="6" height="2" fill="#8BC7C3" />
    <rect x="2" y="6" width="4" height="2" fill="#8BC7C3" />
    <rect x="6" y="6" width="4" height="2" fill="#B8E6E6" />
    <rect x="10" y="6" width="4" height="2" fill="#8BC7C3" />
    <rect x="3" y="8" width="10" height="2" fill="#8BC7C3" />
    <rect x="4" y="10" width="8" height="2" fill="#8BC7C3" />
    <rect x="5" y="12" width="6" height="2" fill="#8BC7C3" />
    <rect x="6" y="14" width="4" height="2" fill="#8BC7C3" />
  </svg>
);

const statusColors = {
  online: "#7DD3A7",
  offline: "#6B7280",
  busy: "#F6C177",
  idle: "#B8E6E6",
};

export const AgentAvatar: React.FC<AgentAvatarProps> = ({
  size = "md",
  status = "offline",
  className = "",
}) => {
  const sizeMap = { sm: 24, md: 32, lg: 40 };
  const px = sizeMap[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <div
        className="rounded-md bg-softIvory border border-champagne flex items-center justify-center"
        style={{ width: px + 8, height: px + 8 }}
      >
        <StarfishSVG size={px} />
      </div>
      {/* Status dot */}
      <div
        className="absolute bottom-0 right-0 rounded-full border border-softIvory animate-breathe"
        style={{
          width: size === "sm" ? 7 : size === "md" ? 8 : 10,
          height: size === "sm" ? 7 : size === "md" ? 8 : 10,
          backgroundColor: statusColors[status],
        }}
      />
    </div>
  );
};
