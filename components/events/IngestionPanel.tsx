"use client";

import React, { useState, useRef, useCallback } from "react";
import { Upload, Type, Plus, Loader } from "lucide-react";
import { Card } from "../ui/Card";
import { ParsedEvent, simulateImageParse, parseTextInvite } from "@/lib/event-parser";

interface IngestionProps {
  onEventExtracted: (event: ParsedEvent) => void;
}

export const IngestionPanel: React.FC<IngestionProps> = ({ onEventExtracted }) => {
  const [mode, setMode] = useState<"upload" | "text" | "manual">("upload");
  const [processing, setProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [manualForm, setManualForm] = useState({
    name: "",
    date: "",
    startTime: "",
    venue: "",
    address: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      handleParse(file.name);
    }
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setPreview(URL.createObjectURL(file));
        handleParse(file.name);
      }
    },
    []
  );

  const handleParse = async (fileName: string) => {
    setProcessing(true);
    // Simulate OCR delay
    await new Promise((r) => setTimeout(r, 1800));
    const event = simulateImageParse(fileName);
    onEventExtracted(event);
    setProcessing(false);
  };

  const handleTextParse = async () => {
    if (!textInput.trim()) return;
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));
    const event = parseTextInvite(textInput);
    onEventExtracted(event);
    setProcessing(false);
    setTextInput("");
  };

  const handleManualAdd = async () => {
    if (!manualForm.name || !manualForm.date) return;
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 600));
    const event: ParsedEvent = {
      id: `evt-${Date.now()}`,
      ...manualForm,
      endTime: "",
      rsvpEmail: undefined,
      rsvpLink: undefined,
      dressCode: undefined,
      notes: undefined,
      status: "pending",
      routeStatus: "not_planned",
      confidence: 100,
      missingFields: ["endTime"],
      source: "manual",
      createdAt: new Date().toISOString(),
    };
    onEventExtracted(event);
    setProcessing(false);
    setManualForm({ name: "", date: "", startTime: "", venue: "", address: "" });
  };

  const tabs = [
    { id: "upload" as const, label: "Upload Flyer", icon: Upload },
    { id: "text" as const, label: "Paste Text", icon: Type },
    { id: "manual" as const, label: "Quick Add", icon: Plus },
  ];

  return (
    <Card>
      <div className="p-5 pb-3 border-b border-champagne/40 pixel-grid-header">
        <h2 className="text-sm font-semibold text-oceanSlate">Add Event</h2>
      </div>
      <div className="p-5">
        {/* Tab bar */}
        <div className="flex gap-1 mb-5 bg-pearlWhite/80 rounded-lg p-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md
                text-xs font-medium transition-all duration-200
                ${
                  mode === id
                    ? "bg-softIvory text-oceanSlate shadow-sm"
                    : "text-mutedText hover:text-oceanSlate"
                }
              `}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Upload area */}
        {mode === "upload" && (
          <div
            className={`
              relative flex flex-col items-center justify-center py-10 px-4
              rounded-xl border-2 border-dashed transition-all duration-200
              ${dragActive ? "border-softTeal bg-seafoamMist/30" : "border-champagne/50 hover:border-champagne"}
              ${processing ? "pointer-events-none opacity-60" : "cursor-pointer"}
            `}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            {processing ? (
              <div className="flex flex-col items-center gap-3">
                <Loader className="w-6 h-6 text-softTeal animate-spin" />
                <p className="text-sm text-oceanSlate">Extracting event details...</p>
              </div>
            ) : preview ? (
              <div className="flex flex-col items-center gap-3">
                <img src={preview} alt="Preview" className="max-h-48 rounded-lg shadow-card object-contain" />
                <button className="text-xs font-medium text-softTeal hover:text-softTeal/80">
                  Upload a different image
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-mutedText">
                <Upload className="w-8 h-8 opacity-40" />
                <p className="text-sm font-medium">Drop a flyer or screenshot</p>
                <p className="text-[11px]">PNG, JPG, HEIC — or click to browse</p>
              </div>
            )}
          </div>
        )}

        {/* Text paste */}
        {mode === "text" && (
          <div className="space-y-3">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste invitation text, email, or message..."
              className="w-full h-32 p-3 rounded-lg bg-pearlWhite border border-champagne text-sm text-oceanSlate placeholder:text-mutedText/60 resize-none outline-none focus:border-softTeal/40 transition-colors"
            />
            <button
              disabled={!textInput.trim() || processing}
              onClick={handleTextParse}
              className="w-full py-2 rounded-lg bg-softTeal text-oceanSlate text-sm font-medium hover:bg-softTeal/90 transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  Parsing...
                </span>
              ) : (
                "Extract Event"
              )}
            </button>
          </div>
        )}

        {/* Manual form */}
        {mode === "manual" && (
          <div className="space-y-3">
            <input
              type="text"
              value={manualForm.name}
              onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
              placeholder="Event name"
              className="w-full px-3 py-2 rounded-lg bg-pearlWhite border border-champagne text-sm text-oceanSlate placeholder:text-mutedText/60 outline-none focus:border-softTeal/40"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={manualForm.date}
                onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
                className="px-3 py-2 rounded-lg bg-pearlWhite border border-champagne text-sm text-oceanSlate outline-none focus:border-softTeal/40"
              />
              <input
                type="time"
                value={manualForm.startTime}
                onChange={(e) => setManualForm({ ...manualForm, startTime: e.target.value })}
                className="px-3 py-2 rounded-lg bg-pearlWhite border border-champagne text-sm text-oceanSlate outline-none focus:border-softTeal/40"
              />
            </div>
            <input
              type="text"
              value={manualForm.venue}
              onChange={(e) => setManualForm({ ...manualForm, venue: e.target.value })}
              placeholder="Venue (optional)"
              className="w-full px-3 py-2 rounded-lg bg-pearlWhite border border-champagne text-sm text-oceanSlate placeholder:text-mutedText/60 outline-none focus:border-softTeal/40"
            />
            <input
              type="text"
              value={manualForm.address}
              onChange={(e) => setManualForm({ ...manualForm, address: e.target.value })}
              placeholder="Address (optional)"
              className="w-full px-3 py-2 rounded-lg bg-pearlWhite border border-champagne text-sm text-oceanSlate placeholder:text-mutedText/60 outline-none focus:border-softTeal/40"
            />
            <button
              disabled={!manualForm.name || !manualForm.date || processing}
              onClick={handleManualAdd}
              className="w-full py-2 rounded-lg bg-softTeal text-oceanSlate text-sm font-medium hover:bg-softTeal/90 transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              Add Event
            </button>
          </div>
        )}

        {/* Hint */}
        <p className="mt-4 text-[10px] font-mono text-mutedText/60">
          {mode === "upload" && "OCR engine will extract event details automatically"}
          {mode === "text" && "Paste any format — email, WhatsApp, SMS, or DM"}
          {mode === "manual" && "For when you already have the details"}
        </p>
      </div>
    </Card>
  );
};
