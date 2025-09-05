import { NextResponse } from "next/server";
import type { ClientsData } from "@shared/api";
import { toRange, seededRandom } from "../../../lib/dashboard";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const range = toRange(searchParams.get("range") ?? undefined);
  const rnd = seededRandom(range.length * 555);
  const data: ClientsData = {
    bubbles: [
      { label: "60", value: 60, color: "#F59E0B" },
      { label: "541", value: 541, color: "#EF4444" },
      { label: "3824", value: 3824, color: "#EF4444" },
      { label: "2", value: 2 + Math.floor(rnd() * 4), color: "#10B981" },
    ],
  };
  return NextResponse.json(data);
}
