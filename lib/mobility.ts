/**
 * Mobility & event orchestration data model.
 * Replaces AI-observability metrics with real-world intelligence.
 */

export type Urgency = "none" | "low" | "medium" | "high" | "critical";
export type TransportMode = "walk" | "bike" | "car" | "uber" | "transit";
export type RSVPStatus = "pending" | "confirmed" | "declined" | "noreply";
export type RouteStatus = "not_planned" | "planned" | "en_route" | "complete";

export interface EventItem {
  id: string;
  name: string;
  type: string; // dinner, gallery, panel, gathering, etc.
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime?: string; // HH:MM
  venue: string;
  address: string;
  rsvpStatus: RSVPStatus;
  rsvpEmail?: string;
  rsvpLink?: string;
  dressCode?: string;
  notes?: string;
  transport?: TransportMode;
  routeStatus: RouteStatus;
  departureTime?: string;
  eta?: string;
  urgency?: Urgency;
  weather?: { condition: string; temp: number; unit: string };
  createdAt: string;
}

/** Compute urgency based on time proximity */
export function computeUrgency(event: EventItem): Urgency {
  const now = new Date();
  const eventTime = new Date(`${event.date}T${event.startTime}`);
  const diffMs = eventTime.getTime() - now.getTime();
  const diffMin = diffMs / 60000;

  if (diffMin < 0) return "none"; // past
  if (diffMin < 30) return "critical";
  if (diffMin < 120) return "high";
  if (diffMin < 360) return "medium";
  if (diffMin < 1440) return "low";
  return "none";
}

/** Count until departure */
export function countdownToDeparture(departureTime?: string): string {
  if (!departureTime) return "—";
  const now = new Date();
  const [h, m] = departureTime.split(":").map(Number);
  const dep = new Date();
  dep.setHours(h, m, 0, 0);
  if (dep <= now) return "now";
  const diffMin = Math.round((dep.getTime() - now.getTime()) / 60000);
  if (diffMin < 60) return `${diffMin} min`;
  const hr = Math.floor(diffMin / 60);
  const min = diffMin % 60;
  return `${hr}h ${min > 0 ? `${min}m` : ""}`;
}

/** Compute departure time from ETA and event start */
export function computeDepartureTime(startTime: string, etaMinutes: number): string {
  const [h, m] = startTime.split(":").map(Number);
  const eventMin = h * 60 + m;
  const departMin = eventMin - etaMinutes;
  const hour = Math.floor(departMin / 60);
  const minute = departMin % 60;
  return `${String(hour).padStart(2, "0")}:${String(Math.max(0, minute)).padStart(2, "0")}`;
}

/** Mock data — production will be real */
export const todayEvents: EventItem[] = [
  {
    id: "evt-001",
    name: "Dinner — Soho House",
    type: "dinner",
    date: "2026-05-17",
    startTime: "20:00",
    endTime: "23:00",
    venue: "Soho House New York",
    address: "293 5th Ave, New York, NY 10016",
    rsvpStatus: "confirmed",
    dressCode: "Smart casual",
    transport: "uber",
    routeStatus: "planned",
    departureTime: "19:20",
    eta: "22 min",
    weather: { condition: "Clear", temp: 72, unit: "F" },
    createdAt: new Date().toISOString(),
  },
  {
    id: "evt-002",
    name: "Gallery Opening — Pace",
    type: "exhibition",
    date: "2026-05-17",
    startTime: "17:30",
    endTime: "20:00",
    venue: "Pace Gallery",
    address: "540 W 25th St, New York, NY 10001",
    rsvpStatus: "confirmed",
    transport: "uber",
    routeStatus: "planned",
    departureTime: "16:50",
    eta: "18 min",
    weather: { condition: "Clear", temp: 72, unit: "F" },
    createdAt: new Date().toISOString(),
  },
  {
    id: "evt-003",
    name: "Qabbalah Study Circle",
    type: "study",
    date: "2026-05-18",
    startTime: "20:00",
    endTime: "22:00",
    venue: "SOL School",
    address: "—",
    rsvpStatus: "confirmed",
    notes: "Monthly gathering — bring journal",
    transport: "car",
    routeStatus: "not_planned",
    createdAt: new Date().toISOString(),
  },
];

/** Get the next upcoming event from today's list */
export function getNextEvent(): EventItem | undefined {
  const now = new Date();
  return todayEvents
    .filter((e) => {
      const t = new Date(`${e.date}T${e.startTime}`);
      return t > now;
    })
    .sort((a, b) => {
      const ta = new Date(`${a.date}T${a.startTime}`).getTime();
      const tb = new Date(`${b.date}T${b.startTime}`).getTime();
      return ta - tb;
    })[0];
}
