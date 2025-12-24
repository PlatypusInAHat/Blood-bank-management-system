import { Button } from "@/components/ui/button"
import { RequestsTable } from "@/components/requests/requests-table"
import { Plus } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Requests | Blood Bank Management System",
  description: "Manage blood requests",
}

export default function RequestsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý yêu cầu máu</h1>
        <Link href="/requests/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Thêm yêu cầu máu
          </Button>
        </Link>
      </div>
      <RequestsTable />
    </div>
  )
}

