import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Target, DollarSign, Clock } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: React.ElementType
  iconColor?: string
}

function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor = "text-primary",
}: StatCardProps) {
  const isPositive = change && change > 0

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {isPositive ? "+" : ""}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-sm text-text-secondary">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100",
            iconColor
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  )
}

interface StatsCardsProps {
  stats: {
    totalLeads: number
    newLeads: number
    qualifiedLeads: number
    wonDeals: number
    leadChange?: number
    qualifiedChange?: number
    wonChange?: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Leads"
        value={stats.totalLeads}
        change={stats.leadChange}
        changeLabel="vs last month"
        icon={Users}
        iconColor="text-primary"
      />
      <StatCard
        title="New This Week"
        value={stats.newLeads}
        icon={Target}
        iconColor="text-blue-500"
      />
      <StatCard
        title="Qualified"
        value={stats.qualifiedLeads}
        change={stats.qualifiedChange}
        changeLabel="vs last month"
        icon={Clock}
        iconColor="text-yellow-500"
      />
      <StatCard
        title="Won Deals"
        value={stats.wonDeals}
        change={stats.wonChange}
        changeLabel="vs last month"
        icon={DollarSign}
        iconColor="text-green-500"
      />
    </div>
  )
}
