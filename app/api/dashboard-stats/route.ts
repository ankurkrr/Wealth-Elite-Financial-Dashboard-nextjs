import { NextResponse } from "next/server";
import type { DashboardStats } from "@shared/api";
import { toRange, seededRandom } from "../../../lib/dashboard";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const range = toRange(searchParams.get("range") ?? undefined);
  const rnd = seededRandom(range.length * 97);
  const stats: DashboardStats = {
    purchases: Math.floor(rnd() * 5),
    redemptions: Math.floor(rnd() * 5),
    transactions: Math.floor(rnd() * 10),
    sipRejections: Math.floor(rnd() * 3),
    newSip: Math.floor(rnd() * 4),
  };
  return NextResponse.json(stats);
}
