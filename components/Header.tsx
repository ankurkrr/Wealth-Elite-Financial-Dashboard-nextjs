"use client";
import Link from "next/link";
import { Bell, LogOut, Search, Filter, MapPin, Settings, Star, Link as LinkIcon, User, Lock, GraduationCap, Monitor } from "lucide-react";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { PDFGenerator } from "@/components/dashboard/PDFGenerator";

const NAV = [
  "CRM",
  "UTILITIES",
  "INSURANCE",
  "ASSETS",
  "MUTUAL",
  "RESEARCH",
  "TRANSACT ONLINE",
  "GOAL GPS",
  "FINANCIAL PLANNING",
  "WEALTH REPORT",
  "OTHER",
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 shadow">
      <div className="bg-white text-gray-700">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2">
          <Link href="/" className="shrink-0 text-base font-extrabold leading-none text-[#DC2626]">
            Wealth Elite
          </Link>
          <div className="relative hidden flex-1 items-center md:flex">
            <input
              aria-label="Search"
              placeholder="ex. live portfolio"
              className="w-full h-11 rounded-md border border-gray-300 bg-gray-50 px-3 pr-10 text-sm outline-none focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-gray-200 p-2 text-gray-600 hover:bg-gray-300" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
          </div>
          <div className="hidden items-center gap-1 text-gray-600 md:flex">
            {[Filter, MapPin, Settings, Bell, Star, LinkIcon, Search, User, Lock, GraduationCap, Monitor].map((Icon, i) => (
              <button key={i} className="rounded p-1 hover:bg-gray-100" aria-label="Quick action">
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1 text-gray-600">
            <button className="rounded p-2 hover:bg-gray-100" aria-label="Notifications">
              <Bell className="h-3.5 w-3.5" />
            </button>
            <ThemeToggle />
            <PDFGenerator targetId="dashboard-root" />
            <button className="ml-1 inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-700 hover:bg-gray-100">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#DC2626] text-white">
        <div className="mx-auto hidden max-w-7xl px-4 lg:block">
          <nav>
            <ul className="flex items-center gap-4 text-[13px] font-medium">
              {NAV.map((n) => (
                <li key={n}>
                  <Link className="inline-block rounded px-2 py-2 hover:bg-white/10" href={`/${n.toLowerCase().replace(/\s+/g, "-")}`}>
                    {n}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="lg:hidden">
          <nav className="overflow-x-auto px-2 py-1 text-xs">
            <ul className="flex min-w-max gap-2">
              {NAV.map((n) => (
                <li key={n}>
                  <Link className="rounded bg-white/10 px-2 py-1" href={`/${n.toLowerCase().replace(/\s+/g, "-")}`}>
                    {n}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
