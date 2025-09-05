import { useState } from "react";
import type { RangeKey } from "@shared/api";

interface Props { value: RangeKey; onChange: (r: RangeKey) => void }

const options: { key: RangeKey; label: string }[] = [
  { key: "3d", label: "3 Days" },
  { key: "7d", label: "7 Days" },
  { key: "10d", label: "10 Days" },
  { key: "30d", label: "30 Days" },
];

export function FilterBar({ value, onChange }: Props) {
  const [current, setCurrent] = useState<RangeKey>(value);
  const click = (k: RangeKey) => { setCurrent(k); onChange(k); };
  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((o) => (
        <button key={o.key} onClick={() => click(o.key)} className={
          o.key === current
            ? "rounded-md bg-primary px-3 py-1.5 text-white shadow"
            : "rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-700 hover:bg-gray-50 dark:bg-card dark:text-foreground"
        }>
          {o.label}
        </button>
      ))}
    </div>
  );
}
