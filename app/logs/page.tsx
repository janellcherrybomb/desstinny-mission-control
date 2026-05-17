import { LayoutShell } from "@/components/layout/LayoutShell";

export default function LogsPage() {
  return (
    <LayoutShell>
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-lg font-semibold text-oceanSlate">Logs</h1>
        <p className="text-xs text-mutedText mt-2 font-mono">Coming soon</p>
      </div>
    </LayoutShell>
  );
}
