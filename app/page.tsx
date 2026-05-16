"use client";

import { useState } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { TopBar } from "../components/layout/TopBar";
import { SystemStatus } from "../components/dashboard/SystemStatus";
import { AgentGrid } from "../components/dashboard/AgentGrid";
import { ActivityFeed } from "../components/dashboard/ActivityFeed";
import { MissionQueue } from "../components/dashboard/MissionQueue";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pearlWhite">
      {/* Sidebar */}
      <Sidebar
        activeItem="overview"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Top bar */}
      <TopBar onMenuToggle={() => setSidebarOpen(true)} />

      {/* Main content */}
      <main className="pt-14">
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-4 sm:space-y-6">
          {/* Page title */}
          <div className="mb-1 sm:mb-2">
            <h1 className="text-base sm:text-lg font-semibold text-oceanSlate">Overview</h1>
            <p className="text-[11px] sm:text-xs text-mutedText mt-0.5 font-mono">
              All systems operational
            </p>
          </div>

          {/* System status hero */}
          <SystemStatus />

          {/* Two-column layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <AgentGrid />
            <ActivityFeed />
          </div>

          {/* Mission queue - full width */}
          <MissionQueue />
        </div>
      </main>
    </div>
  );
}
