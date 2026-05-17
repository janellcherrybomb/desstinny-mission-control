"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { IngestionPanel } from "@/components/events/IngestionPanel";
import { EventDetailCard } from "@/components/events/EventDetailCard";
import { CalendarView } from "@/components/events/CalendarView";
import type { ParsedEvent } from "@/lib/event-parser";

export default function EventsPage() {
  const [events, setEvents] = useState<ParsedEvent[]>([]);
  const [latestExtracted, setLatestExtracted] = useState<ParsedEvent | null>(null);

  const handleEventExtracted = (event: ParsedEvent) => {
    setLatestExtracted(event);
  };

  const handleApprove = (id: string) => {
    setLatestExtracted(null);
    setEvents((prev) => [
      ...prev,
      { ...prev.find((e) => e.id === id)!, status: "confirmed" as const },
    ].filter((e, i, arr) => arr.findIndex((a) => a.id === e.id) === i));
  };

  const handleDismiss = (id: string) => {
    setLatestExtracted(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-4 sm:space-y-6">
      {/* Page title */}
      <div className="mb-1 sm:mb-2">
        <h1 className="text-base sm:text-lg font-semibold text-oceanSlate">Events</h1>
        <p className="text-[11px] sm:text-xs text-mutedText mt-0.5 font-mono">
          Upload · Parse · Schedule · Route
        </p>
      </div>

      {/* Two-column layout: ingestion + latest extraction */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Left: ingestion */}
        <IngestionPanel onEventExtracted={handleEventExtracted} />

        {/* Right: extraction result or recent event */}
        <div>
          {latestExtracted ? (
            <EventDetailCard
              event={latestExtracted}
              onApprove={handleApprove}
              onDismiss={handleDismiss}
            />
          ) : events.length > 0 ? (
            /* Show most recent event summary */
            <Card>
              <div className="p-5 pb-3 border-b border-champagne/40 pixel-grid-header">
                <h3 className="text-sm font-semibold text-oceanSlate">Last Parsed</h3>
              </div>
              <div className="p-5">
                <p className="text-xs font-medium text-oceanSlate">{events[events.length - 1].name}</p>
                <p className="text-[11px] font-mono text-mutedText mt-1">
                  {events[events.length - 1].date} · {events[events.length - 1].startTime}
                </p>
                <p className="text-[10px] font-mono text-mutedText/60 mt-2">
                  Upload another flyer to parse more events
                </p>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="p-5 pb-3 border-b border-champagne/40 pixel-grid-header">
                <h3 className="text-sm font-semibold text-oceanSlate">No events parsed yet</h3>
              </div>
              <div className="p-5 text-center">
                <p className="text-xs text-mutedText">Upload a flyer, paste text, or add manually</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Calendar / Mission Queue */}
      <CalendarView events={events.filter((e) => e.status === "confirmed")} />
    </div>
  );
}
