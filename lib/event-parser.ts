/**
 * Event data model and parsing utilities.
 * Prepares the pipeline: input → structured event → mission queue.
 * Mapbox routing hooks are placeholders until API is connected.
 */

export interface ParsedEvent {
  id: string;
  // Core fields
  name: string;
  date: string; // ISO date
  startTime: string; // HH:MM
  endTime?: string; // HH:MM
  venue?: string;
  address?: string;
  rsvpEmail?: string;
  rsvpLink?: string;
  dressCode?: string;
  notes?: string;
  // Pipeline fields
  status: "pending" | "confirmed" | "rsvp_sent";
  routeStatus: "not_planned" | "planned" | "en_route";
  departureTime?: string;
  // Metadata
  confidence: number; // 0-100
  missingFields: string[];
  source: "image" | "text" | "manual";
  createdAt: string;
}

/**
 * Simulated parser — replaces with actual OCR + NLP later.
 * For now: structured mock extraction to prove the pipeline.
 */
export function simulateImageParse(fileName: string): ParsedEvent {
  const mockEvents: ParsedEvent[] = [
    {
      id: `evt-${Date.now()}`,
      name: "Frieze Art Week — VIP Opening",
      date: "2026-06-12",
      startTime: "19:00",
      endTime: "23:00",
      venue: "Central Park",
      address: "Mid-Park at 68th St, New York, NY 10065",
      rsvpEmail: "rsvp@frieze.com",
      rsvpLink: "https://frieze.com/rsvp/vip",
      dressCode: "Black tie",
      notes: "VIP list — bring invitation card",
      status: "pending",
      routeStatus: "not_planned",
      confidence: 92,
      missingFields: [],
      source: "image",
      createdAt: new Date().toISOString(),
    },
    {
      id: `evt-${Date.now()}-1`,
      name: "Design Miami Panel — Future of Interiors",
      date: "2026-06-13",
      startTime: "14:00",
      endTime: "16:00",
      venue: "Miami Beach Convention Center",
      address: "1901 Convention Center Dr, Miami Beach, FL 33139",
      rsvpLink: "https://designmiami.com/register",
      dressCode: "Smart casual",
      status: "pending",
      routeStatus: "not_planned",
      confidence: 85,
      missingFields: ["endTime"],
      source: "image",
      createdAt: new Date().toISOString(),
    },
    {
      id: `evt-${Date.now()}-2`,
      name: "SOL Qabbalah Study Circle",
      date: "2026-06-14",
      startTime: "20:00",
      venue: "SOL School",
      notes: "Monthly gathering — bring journal",
      status: "confirmed",
      routeStatus: "planned",
      departureTime: "19:15",
      confidence: 78,
      missingFields: ["endTime", "address"],
      source: "image",
      createdAt: new Date().toISOString(),
    },
  ];

  return mockEvents[Math.floor(Math.random() * mockEvents.length)];
}

/**
 * Parses pasted text for event information.
 */
export function parseTextInvite(text: string): ParsedEvent {
  const lines = text.split("\n").filter(Boolean);

  // Simple heuristics for demo
  return {
    id: `evt-${Date.now()}`,
    name: lines[0] || "Unknown Event",
    date: new Date().toISOString().split("T")[0],
    startTime: "19:00",
    venue: lines[2] || undefined,
    address: lines[3] || undefined,
    rsvpEmail: lines.find((l) => l.includes("@") && l.toLowerCase().includes("rsvp"))?.split(/[:\s]+/)[1],
    status: "pending",
    routeStatus: "not_planned",
    confidence: 65,
    missingFields: ["endTime", "rsvpLink", "dressCode"],
    source: "text",
    createdAt: new Date().toISOString(),
  };
}
