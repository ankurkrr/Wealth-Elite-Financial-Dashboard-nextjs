"use client";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { MainCards } from "@/components/dashboard/MainCards";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import type {
  AUMData,
  ClientsData,
  DashboardStats,
  RangeKey,
  SIPData,
  TransactionsData,
} from "@shared/api";
import { Skeleton } from "@/components/ui/Loading";
import ChartSkeleton from "@/components/ui/ChartSkeleton";

export default function Page() {
  const [range, setRange] = useState<RangeKey>("30d");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>();
  const [aum, setAum] = useState<AUMData>();
  const [sip, setSip] = useState<SIPData>();
  const [clients, setClients] = useState<ClientsData>();
  const [tx, setTx] = useState<TransactionsData>();

  function mockAll(r: RangeKey) {
    const seed = r.length * 97;
    const rnd = (() => {
      let s = seed % 2147483647;
      if (s <= 0) s += 2147483646;
      return () => (s = (s * 16807) % 2147483647) / 2147483647;
    })();
    return {
      stats: {
        purchases: Math.floor(rnd() * 5),
        redemptions: Math.floor(rnd() * 5),
        transactions: Math.floor(rnd() * 10),
        sipRejections: Math.floor(rnd() * 3),
        newSip: Math.floor(rnd() * 4),
      },
      aum: {
        valueCr: Number((11 + rnd() * 2).toFixed(2)),
        growthMoM: Number((5 + rnd() * 6).toFixed(2)),
      },
      sip: {
        valueLakh: Number((1 + rnd() * 0.8).toFixed(2)),
        growthMoM: Number((4 + rnd() * 6).toFixed(2)),
      },
      clients: {
        bubbles: [
          { label: "60", value: 60, color: "#F59E0B" },
          { label: "541", value: 541, color: "#EF4444" },
          { label: "3824", value: 3824, color: "#EF4444" },
          { label: "2", value: 2 + Math.floor(rnd() * 4), color: "#10B981" },
        ],
      },
      transactions: {
        sipBusiness: ["Mar", "Apr", "May", "Jun"].map((m, i) => ({
          month: m,
          bar: Number((1 + rnd() * 2).toFixed(2)),
          line: Number((2 - i * 0.3 + rnd() * 1).toFixed(2)),
        })),
        monthlyMIS: ["Mar", "Apr", "May", "Jun"].map((m, i) => ({
          month: m,
          a: Number((rnd() * (0.6 - i * 0.05)).toFixed(2)),
          b: Number((rnd() * (0.6 - (3 - i) * 0.04)).toFixed(2)),
          c: Number((rnd() * 0.6 + 0.1 * (i % 2)).toFixed(2)),
        })),
      },
    };
  }

  async function fetchJSON<T>(path: string, fallback: T, timeoutMs = 4000): Promise<T> {
    try {
      const ctrl = new AbortController();
      const to = setTimeout(() => ctrl.abort(), timeoutMs);
      const res = await fetch(path, { signal: ctrl.signal });
      clearTimeout(to);
      if (!res.ok) throw new Error(`${res.status}`);
      return (await res.json()) as T;
    } catch {
      return fallback;
    }
  }

  async function fetchAll(r: RangeKey) {
    setLoading(true);
    try {
      const qs = `?range=${r}`;
      const mocks = mockAll(r);
      const [s, a, sp, c, t] = await Promise.all([
        fetchJSON(`/api/dashboard-stats${qs}`, mocks.stats),
        fetchJSON(`/api/aum-data${qs}`, mocks.aum),
        fetchJSON(`/api/sip-data${qs}`, mocks.sip),
        fetchJSON(`/api/clients-data${qs}`, mocks.clients),
        fetchJSON(`/api/transactions-data${qs}`, mocks.transactions),
      ]);
      setStats(s);
      setAum(a);
      setSip(sp);
      setClients(c);
      setTx(t);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll(range);
  }, []);

  const bg = "bg-[linear-gradient(to_bottom,_rgba(220,38,38,0.06),_transparent_180px)]";

  return (
    <div className={`min-h-screen ${bg}`} id="dashboard-root">
      <Header />
      <main className="mx-auto max-w-7xl space-y-4 p-4">
        <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <FilterBar
            value={range}
            onChange={(r) => {
              setRange(r);
              fetchAll(r);
            }}
          />
        </section>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        ) : (
          <MainCards aum={aum} sip={sip} loading={loading} />
        )}

        {loading ? (
          <div className="grid gap-4 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        ) : (
          <StatsCards stats={stats} />
        )}

        {loading ? (
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <ChartSkeleton variant="bubble" />
            </div>
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <ChartSkeleton variant="bar" />
            </div>
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <ChartSkeleton variant="area" />
            </div>
          </div>
        ) : (
          <ChartsSection clients={clients} sipBusiness={tx?.sipBusiness} monthlyMIS={tx?.monthlyMIS} />
        )}
      </main>
    </div>
  );
}
