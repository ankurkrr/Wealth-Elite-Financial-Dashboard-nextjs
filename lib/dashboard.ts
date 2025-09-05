import type { RangeKey } from "@shared/api";

export function toRange(q?: string): RangeKey {
  switch (q) {
    case "3d":
    case "7d":
    case "10d":
    case "30d":
      return q;
    default:
      return "30d";
  }
}

export function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
