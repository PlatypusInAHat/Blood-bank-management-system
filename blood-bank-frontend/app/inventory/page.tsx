import { Button } from "@/components/ui/button"
import { InventoryTable } from "@/components/inventory/inventory-table"
import { Plus } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Inventory | Blood Bank Management System",
  description: "Manage blood inventory",
}

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý kho máu</h1>
        <Link href="/inventory/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Thêm đơn vị máu
          </Button>
        </Link>
      </div>
      <InventoryTable />
    </div>
  )
}

