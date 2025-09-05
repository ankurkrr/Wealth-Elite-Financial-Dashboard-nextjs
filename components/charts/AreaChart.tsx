import { ResponsiveContainer, AreaChart as RAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import type { MonthlyMISPoint } from "@shared/api";

export function AreaChart({ data }: { data?: MonthlyMISPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RAreaChart data={data ?? []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="a" stroke="#3B82F6" fill="url(#colorA)" />
        <Area type="monotone" dataKey="b" stroke="#EF4444" fill="url(#colorB)" />
        <Area type="monotone" dataKey="c" stroke="#10B981" fill="url(#colorC)" />
      </RAreaChart>
    </ResponsiveContainer>
  );
}
