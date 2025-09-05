type Props = { variant?: "bar" | "area" | "bubble"; height?: number };

export default function ChartSkeleton({ variant = "bar", height = 260 }: Props) {
  const base = "relative w-full overflow-hidden rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700";
  return (
    <div className="select-none">
      <div className={`${base} animate-pulse`} style={{ height }} aria-busy="true" aria-label="Loading chart">
        {variant === "bar" && (
          <div className="absolute inset-4 flex items-end gap-4">
            {[40, 80, 120, 90].map((h, i) => (
              <div key={i} className="w-10 rounded bg-white/40 dark:bg-black/20" style={{ height: h }} />
            ))}
          </div>
        )}
        {variant === "area" && (
          <div className="absolute inset-4">
            <div className="h-full w-full rounded bg-white/40 dark:bg-black/20" />
          </div>
        )}
        {variant === "bubble" && (
          <div className="absolute inset-0">
            <div className="absolute left-10 top-14 h-16 w-16 rounded-full bg-white/40 dark:bg-black/20" />
            <div className="absolute left-40 top-24 h-10 w-10 rounded-full bg-white/40 dark:bg-black/20" />
            <div className="absolute left-64 top-10 h-24 w-24 rounded-full bg-white/40 dark:bg-black/20" />
            <div className="absolute left-80 top-28 h-6 w-6 rounded-full bg-white/40 dark:bg-black/20" />
          </div>
        )}
      </div>
      <p className="mt-2 text-center text-xs text-gray-500">Loading chart...</p>
    </div>
  );
}
