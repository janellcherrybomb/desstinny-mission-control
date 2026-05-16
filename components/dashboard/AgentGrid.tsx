"use client";

import React from "react";
import { Card } from "../ui/Card";
import { AgentAvatar } from "../ui/AgentAvatar";
import { StatusPill } from "../ui/StatusPill";
import { PixelProgressBar } from "../ui/PixelProgressBar";

interface Agent {
  id: string;
  name: string;
  status: "online" | "offline" | "busy" | "idle";
  activity: string;
  progress: number;
  latency: number;
  tokenUsage: string;
}

const mockAgents: Agent[] = [
  {
    id: "agent-001",
    name: "Navigator",
    status: "online",
    activity: "Researching market trends",
    progress: 72,
    latency: 124,
    tokenUsage: "14.2k",
  },
  {
    id: "agent-002",
    name: "Archivist",
    status: "busy",
    activity: "Indexing memories",
    progress: 45,
    latency: 89,
    tokenUsage: "8.7k",
  },
  {
    id: "agent-003",
    name: "Sentinel",
    status: "online",
    activity: "Monitoring workflows",
    progress: 100,
    latency: 56,
    tokenUsage: "3.1k",
  },
  {
    id: "agent-004",
    name: "Cartographer",
    status: "idle",
    activity: "Awaiting assignment",
    progress: 0,
    latency: 201,
    tokenUsage: "1.4k",
  },
];

export const AgentGrid: React.FC = () => {
  return (
    <Card>
      <div className="p-5 pb-3 border-b border-champagne/40 pixel-grid-header">
        <h2 className="text-sm font-semibold text-oceanSlate">Agents</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
        {mockAgents.map((agent) => (
          <div
            key={agent.id}
            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-pearlWhite/60 transition-all duration-200 cursor-pointer"
          >
            <AgentAvatar size="md" status={agent.status} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-oceanSlate truncate">
                  {agent.name}
                </span>
                <StatusPill status={agent.status} />
              </div>
              <p className="text-[11px] text-mutedText truncate mb-2">
                {agent.activity}
              </p>
              <PixelProgressBar progress={agent.progress} color="#8BC7C3" />
              <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-mutedText">
                <span>
                  <span className="text-oceanSlate">{agent.latency}ms</span> lat
                </span>
                <span>{agent.tokenUsage} tokens</span>
                <span className="ml-auto">{agent.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
