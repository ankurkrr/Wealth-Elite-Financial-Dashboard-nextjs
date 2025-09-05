import { NextResponse } from "next/server";
import type { AUMData } from "@shared/api";
import { toRange, seededRandom } from "../../../lib/dashboard";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const range = toRange(searchParams.get("range") ?? undefined);
  const rnd = seededRandom(range.length * 123);
  const data: AUMData = {
    valueCr: Number((11 + rnd() * 2).toFixed(2)),
    growthMoM: Number((5 + rnd() * 6).toFixed(2)),
  };
  return NextResponse.json(data);
}
