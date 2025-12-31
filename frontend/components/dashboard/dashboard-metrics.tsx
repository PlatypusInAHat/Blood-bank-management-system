"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Users, ClipboardList, TrendingUp } from "lucide-react"

export default function DashboardMetrics() {
  const metrics = [
    {
      title: "Tổng người hiến máu",
      value: "1,248",
      change: "+12% so với tháng trước",
      icon: Users,
      href: "/donors",
      iconColor: "text-blue-500",
      hoverColor: "hover:border-blue-300 hover:shadow-blue-100",
    },
    {
      title: "Đơn vị máu hiện có",
      value: "583",
      change: "+4% so với tháng trước",
      icon: Droplet,
      href: "/inventory",
      iconColor: "text-red-500",
      hoverColor: "hover:border-red-300 hover:shadow-red-100",
    },
    {
      title: "Yêu cầu máu đang chờ",
      value: "24",
      change: "-8% so với tháng trước",
      icon: ClipboardList,
      href: "/approvals",
      iconColor: "text-orange-500",
      hoverColor: "hover:border-orange-300 hover:shadow-orange-100",
    },
    {
      title: "Hiến máu trong tháng",
      value: "127",
      change: "+18% so với tháng trước",
      icon: TrendingUp,
      href: "/reports",
      iconColor: "text-green-500",
      hoverColor: "hover:border-green-300 hover:shadow-green-100",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Link key={metric.title} href={metric.href}>
          <Card className={`cursor-pointer transition-all duration-200 ${metric.hoverColor} hover:shadow-md`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.change}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}


