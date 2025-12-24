import { ReportsOverview } from "@/components/reports/reports-overview"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reports | Blood Bank Management System",
  description: "Blood bank reports and analytics",
}

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Báo cáo & Thống kê</h1>
      </div>
      <ReportsOverview />
    </div>
  )
}

