"use client";

import React from "react";
import { Card } from "../ui/Card";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, icon }) => (
  <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
    <div className="flex items-center gap-1.5 text-mutedText text-[11px] font-mono uppercase tracking-wider">
      {icon}
      {label}
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-mono font-semibold text-oceanSlate tracking-tight">
        {value}
      </span>
      {unit && (
        <span className="text-[11px] font-mono text-mutedText">{unit}</span>
      )}
    </div>
  </div>
);

export const SystemStatus: React.FC = () => {
  return (
    <Card className="p-5 pixel-grid">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-oceanSlate">System Status</h2>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-breathe" />
          <span className="text-[11px] font-mono text-mutedText">Live</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <MetricCard label="Active Agents" value={5} />
        <MetricCard label="Missions Running" value={3} />
        <MetricCard label="Uptime" value="99.8" unit="%" />
        <MetricCard label="Memory" value={2.4} unit="GB" />
      </div>
    </Card>
  );
};
