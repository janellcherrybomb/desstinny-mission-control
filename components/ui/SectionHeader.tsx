"use client";

import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-sm font-semibold text-oceanSlate">{title}</h2>
        {subtitle && <p className="text-[11px] text-mutedText mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
