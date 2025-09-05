import { NextResponse } from "next/server";
import type { SIPData } from "@shared/api";
import { toRange, seededRandom } from "../../../lib/dashboard";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const range = toRange(searchParams.get("range") ?? undefined);
  const rnd = seededRandom(range.length * 321);
  const data: SIPData = {
    valueLakh: Number((1 + rnd() * 0.8).toFixed(2)),
    growthMoM: Number((4 + rnd() * 6).toFixed(2)),
  };
  return NextResponse.json(data);
}
