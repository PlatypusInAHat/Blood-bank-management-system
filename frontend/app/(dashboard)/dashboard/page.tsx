import DashboardMetrics from "@/components/dashboard/dashboard-metrics"
import RecentDonations from "@/components/dashboard/recent-donations"
import RecentRequests from "@/components/dashboard/recent-requests"
import InventoryStatus from "@/components/dashboard/inventory-status"
import BloodProductsStatus from "@/components/dashboard/blood-products-status"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | Blood Bank Management System",
  description: "Blood Bank Management System Dashboard",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <DashboardMetrics />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <RecentDonations />
        <RecentRequests />
      </div>
      <InventoryStatus />
      <BloodProductsStatus />
    </div>
  )
}

