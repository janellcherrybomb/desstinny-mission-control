"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import type { EventItem } from "@/lib/mobility";
import {
  Clock,
  Navigation,
  Car,
  Thermometer,
  Cloud,
  AlertCircle,
  CheckCircle,
  MapPin,
  XCircle,
} from "lucide-react";

interface NextMoveCardProps {
  event: EventItem | undefined;
  countdown: string;
}

export const NextMoveCard: React.FC<NextMoveCardProps> = ({ event, countdown }) => {
  const urgency = event?.urgency || "low";
  const colors: Record<string, string> = {
    none: "#6B7280",
    low: "#8BC7C3",
    medium: "#F6C177",
    high: "#E8956F",
    critical: "#E57373",
  };
  const labels: Record<string, string> = {
    none: "On schedule",
    low: "On track",
    medium: "Start getting ready",
    high: "Get ready",
    critical: "Leaving soon",
  };
  const accentColor = colors[urgency];

  if (!event) {
    return (
      <Card>
        <div className="p-8 flex flex-col items-center justify-center text-center">
          <Navigation className="w-8 h-8 text-champagne mb-3" />
          <p className="text-sm font-semibold text-oceanSlate mb-1">All caught up</p>
          <p className="text-xs text-mutedText font-mono">No upcoming events</p>
        </div>
      </Card>
    );
  }

  const routeConfidence = event.routeStatus === "planned" ? 92 : event.routeStatus === "en_route" ? 60 : 20;

  return (
    <Card>
      <div className="h-1 rounded-t-xl" style={{ backgroundColor: accentColor }} />
      <div className="p-5 sm:p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <p className="text-[10px] font-mono text-mutedText uppercase tracking-widest mb-0.5">Next Move</p>
            <h2 className="text-lg font-semibold text-oceanSlate leading-tight">{event.name}</h2>
            {event.venue && (
              <div className="flex items-center gap-1 mt-1 text-xs text-mutedText">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{event.venue}</span>
              </div>
            )}
          </div>
          <div
            className="shrink-0 flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 rounded-full"
            style={{ backgroundColor: accentColor + "20" }}
          >
            <AlertCircle className="w-3 h-3" style={{ color: accentColor }} />
            <span style={{ color: accentColor }}>{labels[urgency]}</span>
          </div>
        </div>

        {/* 4-column info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <InfoBlock label="Leave in" value={countdown || "—"} icon={<Clock className="w-3.5 h-3.5" />} />
          <InfoBlock label="ETA" value={event.eta || "—"} icon={<Navigation className="w-3.5 h-3.5" />} />
          <InfoBlock
            label="Transport"
            value={
              event.transport === "uber"
                ? "Uber Black"
                : event.transport === "car"
                ? "Car"
                : event.transport === "walk"
                ? "Walk"
                : event.transport === "transit"
                ? "Transit"
                : "—"
            }
            icon={<Car className="w-3.5 h-3.5" />}
          />
          <InfoBlock
            label="Weather"
            value={event.weather ? `${event.weather.temp}°${event.weather.unit}` : "—"}
            icon={
              event.weather?.condition === "Clear" ? (
                <Thermometer className="w-3.5 h-3.5" />
              ) : (
                <Cloud className="w-3.5 h-3.5" />
              )
            }
          />
        </div>

        {/* Status bar */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-champagne/40">
          <div className="flex items-center gap-1.5">
            {event.rsvpStatus === "confirmed" ? (
              <CheckCircle className="w-3.5 h-3.5 text-success" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-warning" />
            )}
            <span className="text-[11px] font-medium text-oceanSlate">
              RSVP {event.rsvpStatus === "confirmed" ? "confirmed" : event.rsvpStatus}
            </span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-[10px] font-mono text-mutedText">Route</span>
            <div className="w-20">
              <div className="h-[6px] rounded-sm overflow-hidden bg-champagne/30">
                <div
                  className="h-full rounded-sm transition-all duration-500"
                  style={{
                    width: `${routeConfidence}%`,
                    backgroundColor:
                      routeConfidence > 75 ? "#7DD3A7" : routeConfidence > 40 ? "#F6C177" : "#E57373",
                  }}
                />
              </div>
            </div>
            <span className="text-[10px] font-mono text-mutedText">{routeConfidence}%</span>
          </div>
        </div>

        {/* Dress code / notes */}
        {(event.dressCode || event.notes) && (
          <div className="mt-3 flex items-start gap-2 text-[11px] text-mutedText">
            <span className="shrink-0 font-mono text-champagne">›</span>
            <span>
              {event.dressCode && (
                <span className="text-oceanSlate font-medium">{event.dressCode}</span>
              )}
              {event.dressCode && event.notes && <span className="mx-1.5">·</span>}
              {event.notes}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

const InfoBlock = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="flex items-start gap-2.5">
    <div className="shrink-0 mt-0.5 text-mutedText">{icon}</div>
    <div>
      <p className="text-[10px] font-mono text-mutedText uppercase tracking-wider">{label}</p>
      <p className="text-sm font-semibold text-oceanSlate mt-0.5">{value}</p>
    </div>
  </div>
);
