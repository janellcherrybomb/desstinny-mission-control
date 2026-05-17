"use client";

import React from "react";
import { Card } from "../ui/Card";
import { StatusPill } from "../ui/StatusPill";
import { PixelProgressBar } from "../ui/PixelProgressBar";
import type { ParsedEvent } from "@/lib/event-parser";
import { MapPin, AlertCircle, ChevronRight } from "lucide-react";

interface CalendarViewProps {
  events: ParsedEvent[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <Card>
        <div className="p-5 pb-3 border-b border-champagne/40 pixel-grid-header">
          <h2 className="text-sm font-semibold text-oceanSlate">Upcoming Events</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <MapPin className="w-6 h-6 text-mutedText/40 mb-3" />
          <p className="text-xs text-mutedText">No events yet</p>
          <p className="text-[11px] text-mutedText/70 mt-0.5">Upload a flyer or add manually</p>
        </div>
      </Card>
    );
  }

  // Group by date
  const grouped = events.reduce<Record<string, ParsedEvent[]>>((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort();

  return (
    <Card>
      <div className="p-5 pb-3 border-b border-champagne/40 pixel-grid-header">
        <h2 className="text-sm font-semibold text-oceanSlate">Upcoming Events</h2>
      </div>
      <div className="divide-y divide-champagne/30">
        {sortedDates.map((date) => (
          <div key={date}>
            {/* Date header */}
            <div className="px-5 py-2 bg-pearlWhite/50">
              <span className="text-[10px] font-mono text-mutedText uppercase tracking-wider">
                {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Events for this day */}
            {grouped[date]
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((ev) => (
                <div
                  key={ev.id}
                  className="px-5 py-3 hover:bg-pearlWhite/30 transition-colors duration-150"
                >
                  <div className="flex items-start gap-3">
                    {/* Time column */}
                    <div className="shrink-0 w-14 pt-0.5">
                      <span className="text-xs font-mono text-oceanSlate">
                        {ev.startTime}
                      </span>
                    </div>

                    {/* Event details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-xs font-semibold text-oceanSlate truncate">
                          {ev.name}
                        </h4>
                        <StatusPill
                          status={ev.status === "confirmed" ? "online" : ev.status === "rsvp_sent" ? "idle" : "busy"}
                          label={ev.status === "confirmed" ? "Confirmed" : ev.status === "rsvp_sent" ? "RSVP Sent" : "Pending"}
                        />
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-mutedText">
                        {ev.venue && (
                          <span className="truncate">{ev.venue}</span>
                        )}
                        <span>·</span>
                        {/* Route status */}
                        <span
                          className={`flex items-center gap-0.5 ${
                            ev.routeStatus === "planned"
                              ? "text-success"
                              : ev.routeStatus === "en_route"
                              ? "text-softTeal"
                              : "text-mutedText/60"
                          }`}
                        >
                          {ev.routeStatus === "not_planned" && (
                            <>
                              <MapPin className="w-3 h-3" />
                              <span className="hidden sm:inline">Route</span>
                            </>
                          )}
                          {ev.routeStatus === "planned" && (
                            <>
                              <ChevronRight className="w-3 h-3" />
                              <span>{ev.departureTime || "Ready"}</span>
                            </>
                          )}
                        </span>
                      </div>

                      {/* Departure alert placeholder */}
                      {ev.routeStatus !== "not_planned" && ev.departureTime && (
                        <div className="flex items-center gap-1 mt-1.5">
                          <AlertCircle className="w-3 h-3 text-softTeal" />
                          <span className="text-[10px] font-mono text-mutedText">
                            Departure: {ev.departureTime}
                          </span>
                        </div>
                      )}
                      {ev.routeStatus === "not_planned" && (
                        <div className="mt-1.5">
                          <PixelProgressBar progress={20} color="#B68A7A" size="sm" />
                          <span className="text-[10px] font-mono text-mutedText/60 mt-0.5 block">
                            Route not planned yet
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </Card>
  );
};
