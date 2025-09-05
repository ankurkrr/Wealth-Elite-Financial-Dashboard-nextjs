import { NextResponse } from "next/server";
import type { MonthlyMISPoint, SipBusinessPoint, TransactionsData } from "@shared/api";
import { toRange, seededRandom } from "../../../lib/dashboard";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const range = toRange(searchParams.get("range") ?? undefined);
  const rnd = seededRandom(range.length * 777);
  const months = ["Mar", "Apr", "May", "Jun"];
  const sipBusiness: SipBusinessPoint[] = months.map((m, i) => ({
    month: m,
    bar: Number((1 + rnd() * 2).toFixed(2)),
    line: Number((2 - i * 0.3 + rnd() * 1).toFixed(2)),
  }));

  const monthlyMIS: MonthlyMISPoint[] = months.map((m, i) => ({
    month: m,
    a: Number((rnd() * (0.6 - i * 0.05)).toFixed(2)),
    b: Number((rnd() * (0.6 - (3 - i) * 0.04)).toFixed(2)),
    c: Number((rnd() * 0.6 + 0.1 * (i % 2)).toFixed(2)),
  }));

  const data: TransactionsData = { sipBusiness, monthlyMIS };
  return NextResponse.json(data);
}
