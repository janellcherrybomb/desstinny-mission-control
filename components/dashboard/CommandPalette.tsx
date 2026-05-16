"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  section?: string;
}

const commandItems: CommandItem[] = [
  { id: "launch", label: "Launch Mission", section: "Actions" },
  { id: "create", label: "Create Agent", section: "Actions" },
  { id: "search-logs", label: "Search Logs", shortcut: "⌘L", section: "Navigation" },
  { id: "deploy", label: "Deploy Workflow", section: "Actions" },
  { id: "analytics", label: "View Analytics", section: "Navigation" },
  { id: "settings", label: "Settings", shortcut: "⌘,", section: "Navigation" },
];

interface CommandPaletteProps {
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const filtered = commandItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  // Group by section
  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    const section = item.section || "General";
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {});

  const flatFiltered = Object.values(grouped).flat();

  useEffect(() => {
    inputRef.current?.focus();
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && flatFiltered[selectedIndex]) {
        // Execute command (placeholder)
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [flatFiltered, selectedIndex, onClose]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-oceanSlate/10 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="w-full max-w-[560px] bg-softIvory border border-champagne rounded-xl shadow-card-hover overflow-hidden animate-[breathe_0.15s_ease-out]">
        {/* Search input */}
        <div className="flex items-center px-4 border-b border-champagne/50">
          <svg className="w-4 h-4 text-mutedText/60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            className="w-full px-3 py-3.5 text-sm bg-transparent text-oceanSlate placeholder:text-mutedText/60 outline-none font-sans"
          />
        </div>

        {/* Results */}
        <div className="max-h-[320px] overflow-y-auto py-2">
          {Object.entries(grouped).map(([section, items]) => (
            <div key={section}>
              <div className="px-4 pt-2 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-mutedText">
                {section}
              </div>
              {items.map((item, idx) => {
                const globalIdx = flatFiltered.indexOf(item);
                const isSelected = globalIdx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onMouseEnter={() => setSelectedIndex(globalIdx)}
                    onClick={onClose}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors duration-100 ${
                      isSelected
                        ? "bg-seafoamMist/50 text-oceanSlate"
                        : "text-mutedText hover:bg-pearlWhite/60"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <kbd className="text-[10px] font-mono text-mutedText/60 bg-champagne/30 px-1.5 py-0.5 rounded">
                        {item.shortcut}
                      </kbd>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-xs text-mutedText">
              No results found
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-champagne/50 bg-pearlWhite/50">
          <div className="flex items-center gap-3 text-[10px] font-mono text-mutedText/60">
            <span className="flex items-center gap-1">
              <kbd className="bg-champagne/40 px-1 rounded">↑↓</kbd> navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-champagne/40 px-1 rounded">↵</kbd> select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-champagne/40 px-1 rounded">esc</kbd> close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
