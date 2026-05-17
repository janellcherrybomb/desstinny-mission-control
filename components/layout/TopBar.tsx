"use client";

import { useState, useEffect } from "react";
import { Search, Command, Bell, User, Menu } from "lucide-react";
import { CommandPalette } from "@/components/dashboard/CommandPalette";

export const TopBar: React.FC<{ onMenuToggle: () => void }> = ({ onMenuToggle }) => {
  const [showPalette, setShowPalette] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowPalette((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 md:left-[260px] h-14 bg-softIvory/80 backdrop-blur-md border-b border-champagne/60 z-20 flex items-center px-4 md:px-6 gap-3 md:gap-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-pearlWhite text-mutedText hover:text-oceanSlate transition-colors"
        >
          <Menu className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={() => setShowPalette(true)}
          className="hidden sm:flex flex-1 max-w-lg items-center gap-2 px-3 py-1.5 rounded-lg bg-pearlWhite border border-champagne/80 text-mutedText text-sm hover:border-softTeal/40 hover:bg-seafoamMist/20 transition-all duration-200"
        >
          <Search className="w-4 h-4 text-mutedText/60" />
          <span className="text-sm">Search or command...</span>
          <kbd className="ml-auto flex items-center gap-0.5 text-[10px] font-mono text-mutedText/50 bg-champagne/30 px-1.5 py-0.5 rounded">
            <Command className="w-3 h-3" />K
          </kbd>
        </button>
        <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
          <button className="p-2 rounded-lg hover:bg-pearlWhite text-mutedText hover:text-oceanSlate transition-all duration-200 relative">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-softTeal animate-pulse" />
          </button>
          <button className="p-2 rounded-lg hover:bg-pearlWhite text-mutedText hover:text-oceanSlate transition-all duration-200">
            <User className="w-[18px] h-[18px]" />
          </button>
        </div>
      </header>
      {showPalette && <CommandPalette onClose={() => setShowPalette(false)} />}
    </>
  );
};
