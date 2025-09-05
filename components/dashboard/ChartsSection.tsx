import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BubbleChart } from "@/components/charts/BubbleChart";
import { BarLineChart } from "@/components/charts/BarLineChart";
import { AreaChart } from "@/components/charts/AreaChart";
import type { ClientsData, MonthlyMISPoint, SipBusinessPoint } from "@shared/api";

interface Props { clients?: ClientsData; sipBusiness?: SipBusinessPoint[]; monthlyMIS?: MonthlyMISPoint[] }

export function ChartsSection({ clients, sipBusiness, monthlyMIS }: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">CLIENTS</CardTitle></CardHeader>
        <CardContent>
          <BubbleChart data={clients} />
          <div className="mt-2 flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Online</span>
            <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500" /> Active</span>
            <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> InActive</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-2"><CardTitle className="text-sm">SIP BUSINESS CHART</CardTitle></CardHeader>
        <CardContent><BarLineChart data={sipBusiness} /></CardContent>
      </Card>
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-2"><CardTitle className="text-sm">MONTHLY MIS</CardTitle></CardHeader>
        <CardContent><AreaChart data={monthlyMIS} /></CardContent>
      </Card>
    </div>
  );
}
