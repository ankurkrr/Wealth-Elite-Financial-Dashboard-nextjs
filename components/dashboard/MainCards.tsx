import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { AUMData, SIPData } from "@shared/api";

interface Props { aum?: AUMData; sip?: SIPData; loading?: boolean }

export function MainCards({ aum, sip, loading }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Current</div>
              <div className="mt-1 text-xl font-semibold">
                AUM <span className="font-bold">{aum ? aum.valueCr.toFixed(2) : "--"}</span> <span className="text-sm font-medium text-muted-foreground">Cr</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-emerald-500">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">{aum ? `+${aum.growthMoM}% MoM` : "--"}</span>
              </div>
            </div>
            <button className="rounded-md border border-primary/30 px-3 py-1 text-primary hover:bg-primary/10">View Report</button>
          </div>
        </CardContent>
      </Card>
      <Card className="overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Current</div>
              <div className="mt-1 text-xl font-semibold">
                SIP <span className="font-bold">{sip ? sip.valueLakh.toFixed(2) : "--"}</span> <span className="text-sm font-medium text-muted-foreground">Lakh</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-emerald-500">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">{sip ? `+${sip.growthMoM}% MoM` : "--"}</span>
              </div>
            </div>
            <button className="rounded-md border border-primary/30 px-3 py-1 text-primary hover:bg-primary/10">View Report</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
