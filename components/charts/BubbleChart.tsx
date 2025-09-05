import { ResponsiveContainer, ScatterChart, Scatter, ZAxis, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";
import type { ClientsData } from "@shared/api";

export function BubbleChart({ data }: { data?: ClientsData }) {
  const bubbles = data?.bubbles ?? [];
  const chartData = bubbles.map((b, i) => ({ x: i * 50 + 50, y: 50, z: b.value, color: b.color, label: b.label }));
  return (
    <ResponsiveContainer width="100%" height={260}>
      <ScatterChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <XAxis dataKey="x" hide type="number" />
        <YAxis dataKey="y" hide type="number" />
        <ZAxis dataKey="z" range={[60, 200]} />
        <Tooltip formatter={(v: any, _n, p: any) => [p.payload.label, "Clients"]} />
        <Legend verticalAlign="bottom" payload={bubbles.map((b) => ({ value: b.label, id: b.label, color: b.color, type: "circle" }))} />
        <Scatter data={chartData}>
          {chartData.map((e, idx) => (<Cell key={idx} fill={e.color} />))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
