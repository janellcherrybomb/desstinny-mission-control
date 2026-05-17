"use client";

import { useState, useMemo } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { NextMoveCard } from "@/components/orchestration/NextMoveCard";
import { TodayTimeline } from "@/components/orchestration/TodayTimeline";
import { RSVPQueue } from "@/components/orchestration/RSVPQueue";
import { RoutePreview } from "@/components/orchestration/RoutePreview";
import { todayEvents, computeUrgency, computeDepartureTime, countdownToDeparture } from "@/lib/mobility";

/* Add urgency and departure time to each event */
const enrichedEvents = todayEvents.map((ev) => {
  const urgency = computeUrgency(ev);
  const departureTime = ev.departureTime || (ev.eta ? computeDepartureTime(ev.startTime, parseInt(ev.eta)) : undefined);
  return { ...ev, urgency, departureTime };
});

const nextEvent = enrichedEvents.find((e) => {
  if (!e.departureTime) return false;
  const [h, m] = e.departureTime.split(":").map(Number);
  const now = new Date();
  const dep = new Date();
  dep.setHours(h, m, 0, 0);
  return dep >= now;
});

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const countdown = useMemo(() => {
    if (!nextEvent?.departureTime) return "—";
    const [h, m] = nextEvent.departureTime.split(":").map(Number);
    const now = new Date();
    const dep = new Date();
    dep.setHours(h, m, 0, 0);
    if (dep <= now) return "now";
    const diff = Math.round((dep.getTime() - now.getTime()) / 60000);
    if (diff < 60) return `${diff} min`;
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;
  }, []); // In production this would use a timer

  return (
    <div className="min-h-screen bg-pearlWhite">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <TopBar onMenuToggle={() => setSidebarOpen(true)} />

      <main className="ml-0 md:ml-[260px] pt-14">
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-4 sm:space-y-6">
          {/* Page title */}
          <div className="mb-1 sm:mb-2">
            <h1 className="text-base sm:text-lg font-semibold text-oceanSlate">Overview</h1>
            <p className="text-[11px] sm:text-xs text-mutedText mt-0.5 font-mono">
              {enrichedEvents.length} event{enrichedEvents.length !== 1 ? "s" : ""} · {nextEvent ? `Next: ${nextEvent.name}` : "No upcoming events"}
            </p>
          </div>

          {/* NEXT MOVE — primary hero */}
          <NextMoveCard event={nextEvent} countdown={countdown} />

          {/* Two-column grid: timeline + RSVP */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <TodayTimeline events={enrichedEvents} />
            <RSVPQueue events={enrichedEvents} onRSVP={(id, status) => {
              console.log("RSVP:", id, status);
            }} />
          </div>

          {/* Route preview */}
          <RoutePreview events={enrichedEvents} />
        </div>
      </main>
    </div>
  );
}
