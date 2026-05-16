"use client";

import React from "react";
import { Card } from "../ui/Card";
import { StatusPill } from "../ui/StatusPill";
import { PixelProgressBar } from "../ui/PixelProgressBar";

interface Mission {
  id: string;
  name: string;
  status: "online" | "offline" | "busy" | "idle";
  agents: string[];
  progress: number;
  eta: string;
}

const mockMissions: Mission[] = [
  {
    id: "msn-001",
    name: "Daily Briefing Generation",
    status: "busy",
    agents: ["Navigator", "Archivist"],
    progress: 72,
    eta: "~3 min",
  },
  {
    id: "msn-002",
    name: "Event Route Optimization",
    status: "online",
    agents: ["Cartographer"],
    progress: 45,
    eta: "~12 min",
  },
  {
    id: "msn-003",
    name: "Knowledge Base Sync",
    status: "online",
    agents: ["Archivist", "Sentinel"],
    progress: 100,
    eta: "Done",
  },
];

export const MissionQueue: React.FC = () => {
  return (
    <Card>
      <div className="p-5 pb-3 border-b border-champagne/40 pixel-grid-header">
        <h2 className="text-sm font-semibold text-oceanSlate">Mission Queue</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-champagne/50">
              <th className="text-left text-[11px] font-mono text-mutedText uppercase tracking-wider px-5 py-2.5 font-medium">
                Mission
              </th>
              <th className="text-left text-[11px] font-mono text-mutedText uppercase tracking-wider px-5 py-2.5 font-medium">
                Status
              </th>
              <th className="text-left text-[11px] font-mono text-mutedText uppercase tracking-wider px-5 py-2.5 font-medium hidden md:table-cell">
                Agents
              </th>
              <th className="text-left text-[11px] font-mono text-mutedText uppercase tracking-wider px-5 py-2.5 font-medium hidden lg:table-cell">
                Progress
              </th>
              <th className="text-left text-[11px] font-mono text-mutedText uppercase tracking-wider px-5 py-2.5 font-medium">
                ETA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-champagne/30">
            {mockMissions.map((mission) => (
              <tr
                key={mission.id}
                className="hover:bg-pearlWhite/40 transition-colors duration-150"
              >
                <td className="px-5 py-3 font-medium text-oceanSlate text-xs">
                  {mission.name}
                </td>
                <td className="px-5 py-3">
                  <StatusPill status={mission.status} />
                </td>
                <td className="px-5 py-3 hidden md:table-cell">
                  <div className="flex items-center gap-1">
                    {mission.agents.map((a) => (
                      <span
                        key={a}
                        className="text-[10px] font-mono text-mutedText bg-champagne/20 px-1.5 py-0.5 rounded"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3 hidden lg:table-cell w-32">
                  <div className="flex items-center gap-2">
                    <PixelProgressBar progress={mission.progress} color="#8BC7C3" />
                    <span className="text-[10px] font-mono text-mutedText shrink-0">
                      {mission.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 font-mono text-xs text-mutedText">
                  {mission.eta}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
