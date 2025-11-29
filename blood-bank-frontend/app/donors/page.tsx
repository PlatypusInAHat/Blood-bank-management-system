import { Button } from "@/components/ui/button"
import { DonorsTable } from "@/components/donors/donors-table"
import { Plus } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Donors | Blood Bank Management System",
  description: "Manage blood donors",
}

export default function DonorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý người hiến máu</h1>
        <Link href="/donors/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Thêm người hiến máu
          </Button>
        </Link>
      </div>
      <div className="rounded-lg border bg-card shadow-sm">
        <DonorsTable />
      </div>
    </div>
  )
}

