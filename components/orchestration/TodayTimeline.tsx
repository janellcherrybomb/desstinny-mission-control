"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import type { EventItem } from "@/lib/mobility";

interface TodayTimelineProps {
  events: EventItem[];
}

export const TodayTimeline: React.FC<TodayTimelineProps> = ({ events }) => {
  const sorted = [...events].sort((a, b) => a.startTime.localeCompare(b.startTime));

  if (sorted.length === 0) {
    return (
      <Card>
        <div className="p-5 pb-3 border-b border-champagne/40 pixel-grid-header">
          <h2 className="text-sm font-semibold text-oceanSlate">Today</h2>
        </div>
        <div className="p-5 text-center">
          <p className="text-xs text-mutedText">No events today</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-5 pb-3 border-b border-champagne/40 pixel-grid-header">
        <h2 className="text-sm font-semibold text-oceanSlate">Timeline</h2>
      </div>
      <div className="divide-y divide-champagne/10">
        {sorted.map((ev, idx) => {
          const [h, m] = ev.startTime.split(":").map(Number);
          const displayTime = `${h > 12 ? h - 12 : h === 0 ? 12 : h}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
          const isNext = idx === 0;

          return (
            <div
              key={ev.id}
              className={`px-5 py-3 hover:bg-pearlWhite/30 transition-colors duration-150 ${
                isNext ? "bg-seafoamMist/10" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Time column */}
                <div className="shrink-0 w-14 pt-0.5">
                  <p className={`text-xs font-mono font-medium ${isNext ? "text-softTeal" : "text-mutedText"}`}>
                    {displayTime}
                  </p>
                  {isNext && (
                    <span className="text-[9px] font-mono text-softTeal/70 mt-0.5 block">next</span>
                  )}
                </div>

                {/* Event */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h4 className="text-sm font-semibold text-oceanSlate truncate">{ev.name}</h4>
                    <StatusPill
                      status={
                        ev.rsvpStatus === "confirmed"
                          ? "online"
                          : ev.rsvpStatus === "declined"
                            ? "offline"
                            : "busy"
                      }
                    />
                  </div>
                  <p className="text-[11px] text-mutedText truncate">{ev.venue}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-mutedText/60">
                    {ev.departureTime && (
                      <span>Leave {ev.departureTime}</span>
                    )}
                    {ev.eta && <span>eta {ev.eta}</span>}
                    {ev.routeStatus === "not_planned" && <span>no route</span>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
