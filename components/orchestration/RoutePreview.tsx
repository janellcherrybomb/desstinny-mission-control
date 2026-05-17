"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { MapPin, Navigation, Compass } from "lucide-react";
import type { EventItem } from "@/lib/mobility";

interface RoutePreviewProps {
  events: EventItem[];
}

/**
 * Placeholder for Mapbox integration.
 * Visual stub: shows route chain with events as waypoints.
 * Phase 2: connects to Mapbox GL JS for real map rendering.
 */
export const RoutePreview: React.FC<RoutePreviewProps> = ({ events }) => {
  // Filter events that have route status "planned" or need planning
  const unplanned = events.filter((e) => e.routeStatus === "not_planned");
  const planned = events.filter((e) => e.routeStatus === "planned" || e.routeStatus === "en_route");

  if (events.length === 0) {
    return (
      <Card>
        <div className="p-5 pb-3 border-b border-champagne/40 pixel-grid-header">
          <h2 className="text-sm font-semibold text-oceanSlate">Routes</h2>
        </div>
        <div className="p-5 text-center text-xs text-mutedText">No routes to display yet</div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-5 pb-3 border-b border-champagne/40 pixel-grid-header">
        <h2 className="text-sm font-semibold text-oceanSlate">Routes</h2>
      </div>

      <div className="p-5">
        {/* Placeholder map area */}
        <div className="relative w-full h-48 rounded-lg bg-gradient-to-br from-seafoamMist/30 to-champagne/20 border border-champagne/30 overflow-hidden flex items-center justify-center mb-4">
          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(139, 199, 195, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(139, 199, 195, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Route chain visualization */}
          <div className="relative flex items-center gap-3 z-10">
            {/* Current location */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-softTeal animate-breathe border-2 border-softIvory" />
              <span className="text-[8px] font-mono text-mutedText">You</span>
            </div>

            {planned.map((ev, i) => (
              <React.Fragment key={ev.id}>
                {/* Connector line */}
                <div className="h-0.5 w-8 bg-softTeal/40" />

                {/* Destination dot */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-roseBronze/60 border border-softIvory" />
                  <span className="text-[8px] font-mono text-mutedText max-w-12 truncate text-center">
                    {ev.venue?.split(" ")[0] || "Event"}
                  </span>
                </div>
              </React.Fragment>
            ))}

            {unplanned.map((ev) => (
              <React.Fragment key={ev.id}>
                <div className="h-0.5 w-8 bg-champagne/40 border-dashed border-t" style={{ borderTopWidth: "1px" }} />
                <div className="flex flex-col items-center gap-1 opacity-50">
                  <div className="w-2.5 h-2.5 rounded-full border border-champagne" />
                  <span className="text-[8px] font-mono text-mutedText max-w-12 truncate text-center">
                    {ev.venue?.split(" ")[0] || "Plan"}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Mapbox badge */}
          <div className="absolute bottom-2 right-2 text-[9px] font-mono text-mutedText/40">
            Mapbox → Phase 2
          </div>
        </div>

        {/* Route summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 rounded-lg bg-pearlWhite/50">
            <p className="text-[10px] font-mono text-mutedText uppercase">Events routed</p>
            <p className="text-sm font-semibold text-oceanSlate">{planned.length}</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-pearlWhite/50">
            <p className="text-[10px] font-mono text-mutedText uppercase">Need routing</p>
            <p className="text-sm font-semibold text-roseBronze">{unplanned.length}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
