"use client";

import React from "react";

interface StatusPillProps {
  status: "online" | "offline" | "busy" | "idle";
  size?: "sm" | "md";
  label?: string;
}

const statusConfig = {
  online: { bg: "#7DD3A7", label: "Online", text: "#2F3E46" },
  offline: { bg: "#6B7280", label: "Offline", text: "#FFFFFF" },
  busy: { bg: "#F6C177", label: "Busy", text: "#2F3E46" },
  idle: { bg: "#B8E6E6", label: "Idle", text: "#2F3E46" },
};

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  size = "sm",
  label,
}) => {
  const config = statusConfig[status];
  const displayLabel = label || config.label;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono rounded-full transition-colors duration-200 ${
        size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-3 py-1"
      }`}
      style={{ backgroundColor: config.bg + "25", color: config.text }}
    >
      <span
        className={`rounded-full ${status === "online" ? "animate-breathe" : ""}`}
        style={{
          width: size === "sm" ? 5 : 7,
          height: size === "sm" ? 5 : 7,
          backgroundColor: config.bg,
        }}
      />
      {displayLabel}
    </span>
  );
};
