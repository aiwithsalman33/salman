export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-baseline gap-2 whitespace-nowrap">
      <span className="display text-[1.0625rem] tracking-[0.02em]">SALMAN</span>
      <span className={`telemetry text-steel ${compact ? "hidden" : "hidden sm:inline"}`}>/ AI WITH SALMAN</span>
    </span>
  );
}
