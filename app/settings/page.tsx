import { LayoutShell } from "@/components/layout/LayoutShell";

export default function Page() {
  return (
    <LayoutShell>
      <div className="p-6 sm:p-8 max-w-[1400px] mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-lg font-semibold text-oceanSlate capitalize">
          {/* Section name */}
        </h1>
        <p className="text-xs text-mutedText mt-2 font-mono">Coming soon</p>
      </div>
    </LayoutShell>
  );
}
