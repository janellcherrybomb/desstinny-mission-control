"use client";

import React from "react";
import { Card } from "../ui/Card";
import { Check, X, MapPin, Mail, ExternalLink, AlertCircle } from "lucide-react";
import { StatusPill } from "../ui/StatusPill";
import { PixelProgressBar } from "../ui/PixelProgressBar";
import type { ParsedEvent } from "@/lib/event-parser";

interface EventDetailCardProps {
  event: ParsedEvent;
  onApprove?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export const EventDetailCard: React.FC<EventDetailCardProps> = ({
  event,
  onApprove,
  onDismiss,
}) => {
  const allFieldsExtracted = event.missingFields.length === 0;

  return (
    <Card className="border-l-4" /* accent color based on confidence */
      style={{
        borderLeftColor:
          event.confidence >= 85
            ? "#7DD3A7"
            : event.confidence >= 70
            ? "#F6C177"
            : "#E57373",
      }}
    >
      <div className="p-5 pb-3 border-b border-champagne/40 pixel-grid-header">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-oceanSlate">{event.name}</h3>
          {/* Confidence pill */}
          <div
            className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{
              backgroundColor:
                event.confidence >= 85
                  ? "#7DD3A725"
                  : event.confidence >= 70
                  ? "#F6C17725"
                  : "#E5737325",
              color:
                event.confidence >= 85
                  ? "#2F3E46"
                  : event.confidence >= 70
                  ? "#2F3E46"
                  : "#2F3E46",
            }}
          >
            <AlertCircle className="w-3 h-3" />
            {event.confidence}% confidence
          </div>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {/* Date & time */}
        <div className="grid grid-cols-2 gap-3">
          <DetailItem label="Date" value={event.date} />
          <DetailItem label="Time" value={`${event.startTime}${event.endTime ? ` – ${event.endTime}` : ""}`} />
        </div>

        {/* Venue & address */}
        <div className="space-y-1.5">
          {event.venue && <DetailItem label="Venue" value={event.venue} icon={<MapPin className="w-3 h-3" />} />}
          {event.address && <DetailItem label="Address" value={event.address} icon={<MapPin className="w-3 h-3" />} />}
        </div>

        {/* RSVP */}
        {(event.rsvpEmail || event.rsvpLink) && (
          <div className="space-y-1.5">
            {event.rsvpEmail && (
              <DetailItem
                label="RSVP"
                value={event.rsvpEmail}
                icon={<Mail className="w-3 h-3" />}
              />
            )}
            {event.rsvpLink && (
              <DetailItem
                label="RSVP Link"
                value="Open link"
                icon={<ExternalLink className="w-3 h-3" />}
                link={event.rsvpLink}
              />
            )}
          </div>
        )}

        {/* Draft / notes */}
        {event.dressCode && (
          <DetailItem label="Dress Code" value={event.dressCode} />
        )}
        {event.notes && (
          <DetailItem label="Notes" value={event.notes} />
        )}

        {/* Missing fields */}
        {!allFieldsExtracted && (
          <div className="pt-2 border-t border-champagne/40">
            <p className="text-[10px] font-mono text-mutedText uppercase tracking-wider mb-1.5">
              Missing fields
            </p>
            <div className="flex flex-wrap gap-1">
              {event.missingFields.map((field) => (
                <span
                  key={field}
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-warning/15 text-oceanSlate border border-champagne/30"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Source */}
        <div className="pt-2 border-t border-champagne/40 flex items-center justify-between">
          <span className="text-[10px] font-mono text-mutedText uppercase tracking-wider">
            Source: {event.source}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onApprove?.(event.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-softTeal/90 text-oceanSlate text-xs font-medium hover:bg-softTeal transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            Add to Calendar
          </button>
          {onDismiss && (
            <button
              onClick={() => onDismiss(event.id)}
              className="px-3 py-2 rounded-lg bg-champagne/30 text-mutedText text-xs hover:bg-champagne/50 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

/* Sub-component */

const DetailItem: React.FC<{
  label: string;
  value: string;
  icon?: React.ReactNode;
  link?: string;
}> = ({ label, value, icon, link }) => (
  <div>
    <p className="text-[10px] font-mono text-mutedText uppercase tracking-wider mb-0.5 flex items-center gap-1">
      {icon}
      {label}
    </p>
    {link ? (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-softTeal hover:underline font-medium"
      >
        {value}
      </a>
    ) : (
      <p className="text-xs text-oceanSlate font-medium">{value}</p>
    )}
  </div>
);
