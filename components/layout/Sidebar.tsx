"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Cpu,
  Target,
  Workflow,
  BarChart3,
  FileText,
  Settings,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/" },
  { id: "agents", label: "Agents", icon: Cpu, href: "/agents" },
  { id: "events", label: "Events", icon: Target, href: "/events" },
  { id: "missions", label: "Missions", icon: Workflow, href: "/missions" },
  { id: "automations", label: "Automations", icon: Target, href: "/automations" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics" },
  { id: "logs", label: "Logs", icon: FileText, href: "/logs" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

const PixelStarfish: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
  >
    <rect x="7" y="0" width="2" height="2" fill="#8BC7C3" />
    <rect x="6" y="2" width="4" height="2" fill="#8BC7C3" />
    <rect x="5" y="4" width="6" height="2" fill="#8BC7C3" />
    <rect x="2" y="6" width="4" height="2" fill="#8BC7C3" />
    <rect x="6" y="6" width="4" height="2" fill="#B8E6E6" />
    <rect x="10" y="6" width="4" height="2" fill="#8BC7C3" />
    <rect x="3" y="8" width="10" height="2" fill="#8BC7C3" />
    <rect x="4" y="10" width="8" height="2" fill="#8BC7C3" />
    <rect x="5" y="12" width="6" height="2" fill="#8BC7C3" />
    <rect x="6" y="14" width="4" height="2" fill="#8BC7C3" />
  </svg>
);

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();
  const online = true;
  const uptime = "4h 23m";
  const version = "0.1.0";

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-champagne/50">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <div className="relative">
              <PixelStarfish size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-success animate-breathe" />
            </div>
            <span className="text-sm font-semibold text-oceanSlate tracking-tight">
              Desstinny
            </span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-lg hover:bg-pearlWhite text-mutedText transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <span className="text-[10px] text-mutedText font-mono tracking-wider uppercase ml-[36px]">
          Mission Control
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon, href }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={id}
              href={href}
              onClick={onClose}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                transition-all duration-200 group block
                ${
                  isActive
                    ? "bg-seafoamMist/70 text-oceanSlate shadow-glow"
                    : "text-mutedText hover:bg-pearlWhite hover:text-oceanSlate"
                }
              `}
            >
              <Icon
                strokeWidth={isActive ? 2 : 1.5}
                className={`w-[18px] h-[18px] transition-colors duration-200 shrink-0 ${
                  isActive
                    ? "text-softTeal"
                    : "text-mutedText group-hover:text-oceanSlate"
                }`}
              />
              <span className="font-medium">{label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-softTeal animate-breathe" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom status */}
      <div className="px-5 py-4 border-t border-champagne/50 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-mutedText">
          <span>v{version}</span>
          <div className="flex items-center gap-1.5">
            {online ? (
              <Wifi className="w-3 h-3 text-success" />
            ) : (
              <WifiOff className="w-3 h-3 text-mutedText" />
            )}
            <span>{uptime}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-oceanSlate/20 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[260px] bg-softIvory border-r border-champagne/70 flex-col z-50
          md:flex
          ${isOpen ? "flex translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:z-30
          transition-transform duration-300 ease-out
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
