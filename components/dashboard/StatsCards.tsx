import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Undo2, ArrowLeftRight, BadgeAlert, Plus } from "lucide-react";
import type { DashboardStats } from "@shared/api";

interface Props { stats?: DashboardStats; loading?: boolean }

export function StatsCards({ stats, loading }: Props) {
  const items = [
    { label: "Purchases", value: stats?.purchases ?? 0, icon: <Briefcase className="h-5 w-5" /> },
    { label: "Redemptions", value: stats?.redemptions ?? 0, icon: <Undo2 className="h-5 w-5" /> },
    { label: "Rejected Transactions", value: stats?.transactions ?? 0, icon: <ArrowLeftRight className="h-5 w-5" /> },
    { label: "SIP Rejections", value: stats?.sipRejections ?? 0, icon: <BadgeAlert className="h-5 w-5" /> },
    { label: "New SIP", value: stats?.newSip ?? 0, icon: <Plus className="h-5 w-5" /> },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {items.map((it) => (
        <Card key={it.label}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="text-primary">{it.icon}</div>
            <div>
              <div className="text-sm text-muted-foreground">{it.label}</div>
              <div className="text-base font-semibold">{it.value}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
