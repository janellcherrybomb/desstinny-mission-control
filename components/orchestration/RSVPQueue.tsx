"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import type { EventItem, RSVPStatus } from "@/lib/mobility";
import { Mail, CheckCircle, XCircle, AlertTriangle, ExternalLink, MapPin } from "lucide-react";

interface RSVPQueueProps {
  events: EventItem[];
  onRSVP?: (id: string, status: RSVPStatus) => void;
}

const statusCounts = (events: EventItem[]) => {
  const counts = { confirmed: 0, pending: 0, declined: 0, noreply: 0 };
  events.forEach((e) => {
    if (counts.hasOwnProperty(e.rsvpStatus)) counts[e.rsvpStatus as keyof typeof counts]++;
  });
  return counts;
};

export const RSVPQueue: React.FC<RSVPQueueProps> = ({ events, onRSVP }) => {
  const needsAttention = events.filter((e) => e.rsvpStatus === "pending" || e.rsvpStatus === "noreply");
  const confirmed = events.filter((e) => e.rsvpStatus === "confirmed");
  const counts = statusCounts(events);

  return (
    <Card>
      <div className="p-5 pb-3 border-b border-champagne/40 pixel-grid-header">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-oceanSlate">RSVP Status</h2>
          {needsAttention.length > 0 && (
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-warning" />
              <span className="text-[10px] font-mono text-warning">{needsAttention.length} need response</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary bar */}
      <div className="px-5 py-3 flex items-center gap-4 border-b border-champagne/20">
        <SummaryItem label="Confirmed" count={counts.confirmed} color="bg-success/20" textColor="text-oceanSlate" />
        <SummaryItem label="Pending" count={counts.pending} color="bg-warning/20" textColor="text-oceanSlate" />
        <SummaryItem label="Declined" count={counts.declined} color="bg-error/20" textColor="text-error" />
      </div>

      {/* Event list */}
      <div className="divide-y divide-champagne/10">
        {needsAttention.map((ev) => (
          <div key={ev.id} className="px-5 py-3 hover:bg-pearlWhite/30 transition-colors duration-150">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-oceanSlate truncate">{ev.name}</h4>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-mutedText">
                  {ev.venue && (
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {ev.venue}
                    </span>
                  )}
                  <span className="shrink-0">{ev.date} · {ev.startTime}</span>
                </div>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                {ev.rsvpEmail && (
                  <button className="p-1.5 rounded-lg hover:bg-pearlWhite text-mutedText hover:text-oceanSlate transition-colors" title="Send RSVP email">
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                )}
                {ev.rsvpLink && (
                  <button className="p-1.5 rounded-lg hover:bg-pearlWhite text-mutedText hover:text-oceanSlate transition-colors" title="Open RSVP link">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => onRSVP?.(ev.id, "confirmed")}
                  className="p-1.5 rounded-lg bg-success/15 text-success hover:bg-success/25 transition-colors"
                  title="Accept"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onRSVP?.(ev.id, "declined")}
                  className="p-1.5 rounded-lg bg-error/15 text-error hover:bg-error/25 transition-colors"
                  title="Decline"
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Confirmed events (compact) */}
        {confirmed.slice(0, 3).map((ev) => (
          <div key={ev.id} className="px-5 py-2.5 hover:bg-pearlWhite/30 transition-colors duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" />
                <span className="text-xs font-medium text-oceanSlate truncate">{ev.name}</span>
              </div>
              <span className="text-[10px] font-mono text-mutedText shrink-0 ml-2">{ev.date} · {ev.startTime}</span>
            </div>
          </div>
        ))}

        {confirmed.length > 3 && (
          <div className="px-5 py-2 text-center">
            <span className="text-[10px] font-mono text-mutedText">+{confirmed.length - 3} more</span>
          </div>
        )}

        {events.length === 0 && (
          <div className="px-5 py-8 text-center">
            <Mail className="w-5 h-5 text-mutedText/40 mx-auto mb-2" />
            <p className="text-xs text-mutedText">No RSVPs to manage</p>
          </div>
        )}
      </div>
    </Card>
  );
};

const SummaryItem: React.FC<{ label: string; count: number; color: string; textColor: string }> = ({ label, count, color, textColor }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full ${color}`} />
    <span className={`text-xs font-medium ${textColor}`}>{count}</span>
    <span className="text-[10px] font-mono text-mutedText">{label}</span>
  </div>
);
