"use client";

import React from "react";
import { Card } from "../ui/Card";

interface Activity {
  id: string;
  type: "agent_completed" | "workflow_triggered" | "memory_updated" | "error" | "warning";
  message: string;
  agent?: string;
  timestamp: string;
}

const mockActivities: Activity[] = [
  {
    id: "act-001",
    type: "agent_completed",
    message: "Navigator completed research task",
    agent: "Navigator",
    timestamp: "13:04:22",
  },
  {
    id: "act-002",
    type: "workflow_triggered",
    message: "Daily briefing workflow started",
    agent: "Sentinel",
    timestamp: "12:58:00",
  },
  {
    id: "act-003",
    type: "memory_updated",
    message: "Knowledge base updated — 3 entries",
    agent: "Archivist",
    timestamp: "12:45:11",
  },
  {
    id: "act-004",
    type: "warning",
    message: "High token usage on Cartographer",
    agent: "Cartographer",
    timestamp: "12:30:05",
  },
  {
    id: "act-005",
    type: "agent_completed",
    message: "Archivist completed indexing batch",
    agent: "Archivist",
    timestamp: "12:15:44",
  },
];

const typeColors = {
  agent_completed: "border-success",
  workflow_triggered: "border-softTeal",
  memory_updated: "border-opalAqua",
  error: "border-error",
  warning: "border-warning",
};

const typeLabels = {
  agent_completed: "COMPLETE",
  workflow_triggered: "TRIGGERED",
  memory_updated: "MEMORY",
  error: "ERROR",
  warning: "WARN",
};

export const ActivityFeed: React.FC = () => {
  return (
    <Card>
      <div className="p-5 pb-3 border-b border-champagne/40 pixel-grid-header">
        <h2 className="text-sm font-semibold text-oceanSlate">Activity Feed</h2>
      </div>
      <div className="divide-y divide-champagne/30 max-h-[320px] overflow-y-auto">
        {mockActivities.map((activity) => (
          <div
            key={activity.id}
            className={`px-5 py-3 hover:bg-pearlWhite/40 transition-colors duration-150 border-l-2 ${typeColors[activity.type]} border-l-transparent hover:border-l`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-oceanSlate truncate">{activity.message}</p>
                {activity.agent && (
                  <span className="text-[10px] font-mono text-mutedText mt-0.5 block">
                    via {activity.agent}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-champagne/30 text-mutedText uppercase"
                >
                  {typeLabels[activity.type]}
                </span>
                <span className="text-[10px] font-mono text-mutedText/70">
                  {activity.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
